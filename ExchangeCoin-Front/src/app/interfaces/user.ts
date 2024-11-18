import { Subscription } from './subscription';

export interface RegisterData {
  Username: string;
  Email: string;
  Password: string;
}

export interface UserForExchange {
  Username: string;
  Trys: number;
  Role: string;
}

export interface UserAdmin {
  username: string;
  email: string;
  role: string;
  SubsId: number;
}

export interface User {
  UserName: string;
  Email: string;
  Password: string;
  Trys: number;
  Role: number;
  SubsId: number;
  Suscripcion: Subscription;
}

export interface LoginData {
  name: string;
  password: string;
}

export interface Admin {
  admin: boolean;
}
