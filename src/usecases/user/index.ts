import { createUser } from './create-user';

export const initUserUsecases = () => {
  return {
    create: createUser,
  };
};

export type UserUsecases = ReturnType<typeof initUserUsecases>;
