import { Usecases } from '../../usecases';
import { Resolvers } from '../__generated__/resolvers-types';
import { initScalars } from './scalars';
import { initUserModuleResolvers } from './user';

export const initResolvers = (usecases: Usecases): Resolvers => {
  const {
    Query: userQueries,
    Mutation: userMutations,
    ...userResolvers
  } = initUserModuleResolvers(usecases);

  return {
    ...initScalars(),
    Query: {
      ...userQueries,
    },
    Mutation: {
      ...userMutations,
    },
    ...userResolvers,
  };
};
