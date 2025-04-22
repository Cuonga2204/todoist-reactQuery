export interface User {
  id: string;
  username: string;
  gmail: string;
  password: string;
}

export interface DataSignupForm {
  username: string;
  gmail: string;
  password: string;
  confirmPassword: string;
}
export interface DataLoginForm {
  gmail: string;
  password: string;
}
