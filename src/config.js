const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const API_BASE = isLocalhost 
  ? 'http://localhost:3043' 
  : 'https://apisurprise.dodunsoftsolutions.com';

export const USER_API_BASE = `${API_BASE}/api/user`;
export const PRODUCT_API_BASE = `${API_BASE}/api/products`;
