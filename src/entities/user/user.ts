export type UserEntity = {
  id: string;
  displayName: string;
  email: string;
  externalId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  teamId: string | null;
};

export type UserInput = {
  displayName: string;
  email: string;
  password: string;
};

export type AuthPayload = {
  user: UserEntity;
  refreshToken: string;
  accessToken: string;
};