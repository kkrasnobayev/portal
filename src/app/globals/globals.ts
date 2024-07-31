import { Environment } from './global.types';

declare global {
    interface Window {
        ASCENTPORTAL: Environment;
    }
}
