import { Environment } from './global.types';

/**
 * NOTE: this global interface allows
 * to type and use "virtual" ASCENTPORTAL parameter of the standard Window interface
 */
declare global {
    interface Window {
        ASCENTPORTAL: Environment;
    }
}
