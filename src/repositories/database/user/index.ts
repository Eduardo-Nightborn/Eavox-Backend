import { Kysely } from 'kysely';
import { DB } from '../models';
import { initGetUserByEmailRepository } from './get-user-by-email';
import { initCreateUserRepository } from './create-user';

export const initUserRepositories = (db: Kysely<DB>) => {
  return {
    create: initCreateUserRepository(db),
    getByEmail: initGetUserByEmailRepository(db),
  };
};

export type userRepositories = ReturnType<typeof initUserRepositories>;
