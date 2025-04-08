
import { DB } from './database/models';
import { Kysely } from 'kysely';

export const initRepositories = (db: Kysely<DB>) => {
  return {
      //init repositories here
  };
};

export type Repositories = ReturnType<typeof initRepositories>;
