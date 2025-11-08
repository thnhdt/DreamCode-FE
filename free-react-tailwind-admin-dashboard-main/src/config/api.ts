// API Configuration
// In development, use relative path to leverage Vite proxy
// In production, use full URL or environment variable
const isDevelopment = import.meta.env.DEV;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (isDevelopment ? "" : "http://localhost:8080");

// Admin API base URL
export const ADMIN_API_BASE_URL = `${API_BASE_URL}/api/admin`;

