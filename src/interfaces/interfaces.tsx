import { ChangeEvent } from "react";

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
  timestamp: {
    date: string;
    time: string;
  };
  category: string;
  content: string;
  active: boolean;
  deadline: string;
  changeActive: any;
  id: string;
}
