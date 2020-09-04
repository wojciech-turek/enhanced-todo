export interface StateProps {
  auth: {
    authenticated: boolean;
    loading: boolean;
    error: string;
  };
}
export interface AuthProps {
  auth: boolean;
  onLogInRequest: Function;
  loading: boolean;
  error: string;
}
export interface RegisterProps {
  auth: boolean;
  onRegisterRequest: Function;
  loading: boolean;
  error: string;
}
