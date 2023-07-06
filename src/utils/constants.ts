export const API_URL =
  process.env.BACKEND_API_URL || "https://localhost:44354/api";

export const TOKEN_STORAGE_KEY = "token";

export const LOGIN_URL = "/auth/login";

export const DASHBOARD_URL = "/dashboard";
export const LOGOUT_URL = "/dashboard/logout";

export const USER_URL = `${DASHBOARD_URL}/users`;
export const CREATE_USER_URL = `${USER_URL}/create`;
export const EDIT_USER_URL = `${USER_URL}/edit`;

export const MEDICAL_RECORD_URL = `${DASHBOARD_URL}/medical-records`;
export const CREATE_MEDICAL_RECORD_URL = `${MEDICAL_RECORD_URL}/create`;
export const EDIT_MEDICAL_RECORD_URL = `${MEDICAL_RECORD_URL}/edit`;

export const ADMIN_ROLE = "admin";
export const DOCTOR_ROLE = "doctor";
export const PATIENT_ROLE = "patient";

export const NAME_VALIDATION_REGEX = /^.{4,200}$/;
export const CPF_VALIDATION_REGEX = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
export const EMAIL_VALIDATION_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const CEP_VALIDATION_REGEX = /^\d{5}\-\d{3}$/;
export const PHONE_VALIDATION_REGEX = /^\+[1-9]\d{1,14}$/;
