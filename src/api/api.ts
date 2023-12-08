import axios from "axios";
import { logger } from "../utils";

export const API_KEY_FOOTBALL_ENDPOINT = 'https://apiv3.apifootball.com';

export const apiKeyFootbalRequest: <T>(params: Record<string, string>, method?: string) => Promise<T> =
 async <T>(params: Record<string, string>, method = 'get')  => {
  const searchParams = new URLSearchParams();
  searchParams.append('APIkey', process.env.API_FOOTBALL_KEY);
  Object.entries(params).forEach(([key, value]) => searchParams.append(key, value))
  searchParams.toString();
  const response = (await axios[method]<T>(`${API_KEY_FOOTBALL_ENDPOINT}?${searchParams.toString()}`));
  return response.data;
}