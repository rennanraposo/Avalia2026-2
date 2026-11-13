import { logout } from '../../lib/auth.js';
import { endpoint } from '../../lib/secure.js';
export const onRequestPost = endpoint(logout);
