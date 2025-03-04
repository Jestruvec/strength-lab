import { User } from "./";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (email: string, password: string) => void;
  recoverPassword: (email: string) => void;
  loading: boolean;
  error: string | null;
}
