import { User } from "./";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => promise<void>;
  logout: () => promise<void>;
  register: (email: string, password: string) => promise<void>;
  recoverPassword: (email: string) => promise<void>;
  loading: boolean;
  error: string | null;
}
