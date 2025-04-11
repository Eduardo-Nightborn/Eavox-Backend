import { Config } from '../libs/config';
import { initIAMGateway } from './iam';

export const initGateways = (config: Config) => {
  return {
    iam: initIAMGateway(config),
  };
};

export type Gateways = ReturnType<typeof initGateways>;