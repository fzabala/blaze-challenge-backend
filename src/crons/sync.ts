import cron from 'node-cron';
import { syncTeamService, syncMatchesService } from '../api';
import { logger } from '../utils';

// update this to make fetch more teams
export const TEAM_KEYS = [73, 75];

if(process.env.NODE_ENV !== 'test'){
  cron.schedule('0 0 * * *', async () => {
    await sync()
  });
}

export const sync = async () => {
  for(const TEAM_KEY of TEAM_KEYS){
    logger.info('sync teams');
    await syncTeamService(TEAM_KEY);
    logger.info('sync teams OK');
    logger.info('sync matches');
    await syncMatchesService(TEAM_KEY);
    logger.info('sync matches OK');
  }
}

// for purposing testing, you can uncomment this to run the sync at startup
// sync();
