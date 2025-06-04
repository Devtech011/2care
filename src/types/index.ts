// API Types
export interface ApiErrorResponse {
  message: string;
  [key: string]: any;
}

// Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Component Props Types
export interface HeaderProps {
  token: string | null;
}

export interface FileUploaderProps {
  setSummary: (summary: string) => void;
  token: string | null;
}

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

export interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SampleSummaryProps {
  summary: string | null;
}

// API Service Types
export interface AuthAPI {
  login: (email: string, password: string) => Promise<User>;
  signup: (userData: SignUpData) => Promise<User>;
  logout: () => Promise<void>;
}

export interface FileAPI {
  uploadFile: (file: File) => Promise<{ summary: string }>;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
} 