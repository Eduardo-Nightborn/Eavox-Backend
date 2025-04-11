import { AppContext } from '../../libs/context';
import Joi from 'joi';

export const validateUserEmail = async (
  ctx: AppContext,
  email: string,
): Promise<boolean> => {
  try {
    if (!isEmailValid(email)) {
      return false;
    }

    const existingUser = await ctx.repositories.user.getByEmail(email);
    return !!existingUser;
  } catch (error) {
    console.error('Error validating user by email:', error);
    return false;
  }
};

function isEmailValid(email: string): boolean {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .trim()
      .messages({
        'string.email': "L'adresse email fournie n'est pas valide",
        'string.empty': "L'adresse email ne peut pas être vide",
        'any.required': "L'adresse email est requise",
      }),
  });

  const { error } = schema.validate({ email }, { abortEarly: true });
  return !error;
}
