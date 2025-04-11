import { DB } from './database/models';
import { Kysely } from 'kysely';
import { initUserRepositories } from './database/user';

export const initRepositories = (db: Kysely<DB>) => {
  return {
    user: initUserRepositories(db),
  };
};

export type Repositories = ReturnType<typeof initRepositories>;
