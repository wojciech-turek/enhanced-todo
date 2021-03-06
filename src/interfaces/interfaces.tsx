export interface StateProps {
  auth: {
    authenticated: boolean;
    loading: boolean;
    regError: string;
    authError: string;
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

export interface TaskProps {
  timestamp: number;
  category: string;
  content: string;
  active: boolean;
  deadline: number;
  changeActive: any;
  id: string;
}
