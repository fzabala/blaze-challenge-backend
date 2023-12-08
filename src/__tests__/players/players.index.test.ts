import { app } from "../../index";
import { revertMigrations, runMigrations, connect, disconnect } from "../utils";
import request from "supertest";
import { queryDatabase } from "../utils";
import { TEAM_KEYS } from "../../crons";
import axios from "axios";
import * as teams from '../mocks/teams.json';
import * as matches from '../mocks/matches.json';
import MockAdapter from "axios-mock-adapter";
import { API_KEY_FOOTBALL_ENDPOINT } from "../../api";

jest.mock('../../database', () => ({
    query: jest.fn(async (sql: string, params: any[] = []) => await queryDatabase(sql, params))
}));

const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

// Mock the database query function

describe("Players index", () => {
  beforeAll(async () => {
    connect();
    await runMigrations();
});

  afterAll(async () => {
    await revertMigrations();
    await disconnect();
    jest.resetAllMocks();
  });

  it("Fetch all Players for a team", async () => {
    mock.onGet(API_KEY_FOOTBALL_ENDPOINT, { params: { action: "get_events" } }).reply(200, matches);
    mock.onGet(API_KEY_FOOTBALL_ENDPOINT, { params: { action: "get_teams" } }).reply(200, teams);
    const res = await request(app)
      .get(`/api/v1/teams/${TEAM_KEYS[0]}/players`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});
