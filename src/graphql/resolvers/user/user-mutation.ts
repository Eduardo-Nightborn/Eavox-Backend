import { AppContext } from '../../../libs/context';
import { UserEntity } from '../../../entities/user/user';
import { Usecases } from '../../../usecases';
import {
  MutationCreateUserArgs,
  MutationResolvers,
  ResolverTypeWrapper,
} from '../../__generated__/resolvers-types';
import { AuthPayload } from '../../__generated__/resolvers-types';

export const initUserMutationResolvers = (
  usecases: Usecases,
): Pick<MutationResolvers, 'createUser'> => {
  return {
    createUser: async (
      _,
      args: MutationCreateUserArgs,
      context: AppContext,
    ): Promise<
      Omit<AuthPayload, 'user'> & { user: ResolverTypeWrapper<UserEntity> }
    > => {
      return await usecases.user.create(context, {
        email: args.email,
        displayName: args.displayName,
        password: args.password,
      });
    },
  };
};
