import { initUserUsecases } from './user';

export const initUsecases = () => {
  return {
    user: initUserUsecases(),
  };
};

export type Usecases = ReturnType<typeof initUsecases>;
