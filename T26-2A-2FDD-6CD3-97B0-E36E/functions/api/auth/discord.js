import { startDiscord } from '../../../lib/auth.js';
import { endpoint } from '../../../lib/secure.js';
export const onRequestGet = endpoint(startDiscord);
