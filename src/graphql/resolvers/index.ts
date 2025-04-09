import { Usecases } from '../../usecases';
import { Resolvers } from '../__generated__/resolvers-types';
import { initScalars } from './scalars';

export const initResolvers = (usecases: Usecases): Resolvers => {
  /* ... Example
  const {
    Query: ExampleQueries,
    Mutation: ExampleMutations,
    ...ExampleResolvers
  } = initExampleModuleResolvers(usecases);

  return {
    ...initScalars(),
    Query: {
      ...exampleQueries,
    },
    Mutation: {
      ...exampleMutations,
    },
    ...exampleResolvers,
  };
  */
  return {};
};
