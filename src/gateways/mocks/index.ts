import { Gateways } from '..';
import { initIAMGatewayMock } from './iam';

export const initGatewaysMock = (): Gateways => {
  return {
    iam: initIAMGatewayMock(),
  };
};
