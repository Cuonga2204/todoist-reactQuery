export interface User {
  id: number;
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
