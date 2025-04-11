import { Kysely } from 'kysely';
import { UserEntity } from '../../../entities/user/user';
import { DB } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { toUserEntity } from './mapper/user';
import { UnknownError } from '../../../entities/errors/unknown-error';

export function initCreateUserRepository(db: Kysely<DB>) {
  return async (
    email: string,
    display_name: string,
    externalId: string,
  ): Promise<UserEntity> => {
    try {
      const createUser = await db
        .insertInto('users')
        .values({
          id: uuidv4(),
          email: email,
          display_name: display_name,
          external_id: externalId,
          team_id: null,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
      return toUserEntity(createUser);
    } catch (err: any) {
      throw new UnknownError(err.message);
    }
  };
}
