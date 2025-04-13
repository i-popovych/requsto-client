import { Comapny } from "@/entities/Company";

export type User = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  avatar: string;
  company: Comapny;
};
