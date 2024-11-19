import { Subscription } from './subscription';

export interface RegisterData {
  Username: string;
  Email: string;
  Password: string;
}

export interface UserForExchange {
  username: string;
  trys: number;
  role: string;
}

export interface UserAdmin {
  username: string;
  email: string;
  role: string;
  subsId: number;
}

export interface User {
  username: string;
  Email: string;
  Password: string;
  trys: number;
  role: number;
  SubsId: number;
  Subscription: Subscription;
}

export interface LoginData {
  name: string;
  password: string;
}

export interface Admin {
  admin: boolean;
}
