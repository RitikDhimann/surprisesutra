const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Get base URL from env or fallback to production domain
const PROD_BASE_URL = 'https://backendsutra.onrender.com';

export const API_BASE = isLocalhost
  ? 'http://localhost:5000'
  : (process.env.REACT_APP_API_BASE ? process.env.REACT_APP_API_BASE.replace('/api', '').replace(/\/$/, '') : PROD_BASE_URL);

export const BASE_URL = API_BASE;

export const USER_API_BASE = `${API_BASE}/api/user`;
export const PRODUCT_API_BASE = `${API_BASE}/api/products`;
