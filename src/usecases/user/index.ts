import { createUser } from './create-user';
import { validateUserEmail } from './validate-user-email';

export const initUserUsecases = () => {
  return {
    create: createUser,
    validateUserEmail: validateUserEmail,
  };
};

export type UserUsecases = ReturnType<typeof initUserUsecases>;
