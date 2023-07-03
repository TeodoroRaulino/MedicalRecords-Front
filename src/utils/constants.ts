export const API_URL =
  process.env.BACKEND_API_URL || "https://localhost:44354/api";

export const TOKEN_STORAGE_KEY = "token";

export const DASHBOARD_URL = "/dashboard";

export const USER_URL = `${DASHBOARD_URL}/user`;
export const CREATE_USER_URL = `${USER_URL}/create`;
export const EDIT_USER_URL = `${USER_URL}/edit`;

export const ADMIN_ROLE = "admin";
export const DOCTOR_ROLE = "doctor";
export const PATIENT_ROLE = "patient";
