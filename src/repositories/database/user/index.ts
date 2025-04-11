import { Kysely } from 'kysely';
import DataLoader from 'dataloader';
import { DB } from '../models';
import { initCreateUserRepository } from './create-user';
import { initGetUserByEmailRepository } from './get-user-by-email';

export const initUserRepositories = (db: Kysely<DB>) => {
  return {
    create: initCreateUserRepository(db),
    getByEmail: initGetUserByEmailRepository(db),
  };
};

export type userRepositories = ReturnType<typeof initUserRepositories>;
