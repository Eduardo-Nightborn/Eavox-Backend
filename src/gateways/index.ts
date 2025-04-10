import { Config } from '../libs/config';

export const initGateways = (config: Config) => {
  return {
    // example: initExampleGateway(config),
  };
};

export type Gateways = ReturnType<typeof initGateways>;
