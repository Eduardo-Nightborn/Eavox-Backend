import { UserEntity } from '../../entities/user/user';
import { AuthPayload } from '../../entities/user/auth-payload';
import { UserInput } from '../../entities/user/user-input';
import { AppContext } from '../../libs/context';
import Joi from 'joi';
import { BadUserInputError } from '../../entities/errors/bad-user-input-error';
import { BadRequestError } from '../../entities/errors/bad-request-error';

export const createUser = async (
  ctx: AppContext,
  input: UserInput,
): Promise<AuthPayload> => {
  validateInput(input);

  const userExist = await ctx.repositories.user.getByEmail(input.email);

  if (userExist)
    throw new BadRequestError('User with this email address already exists.');

  const external_id = await ctx.gateways.iam.createUser(
    input.email,
    input.password,
    input.displayName,
  );
  const tokens = await ctx.gateways.iam.signIn(
    input.email,
    input.password,
  );

  const newUser = await ctx.repositories.user.create(
    input.email,
    input.displayName,
    external_id,
  );

  return {
    user: newUser,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
};

function validateInput(input: UserInput) {
  const schema = Joi.object<UserInput>({
    displayName: Joi.string().required().not().empty(),
    email: Joi.string().email().required().not().empty(),
    password: Joi.string().required().not().empty().min(6),
  });
  const { error } = schema.validate(input);
  if (error) {
    throw new BadUserInputError(error.message);
  }
}
