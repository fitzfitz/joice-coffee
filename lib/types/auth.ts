import { Models } from "react-native-appwrite";

export type SignInTypes = {
  email: string;
  password: string;
};

export type UserRegistrationTypes = {
  password: string;
  confirmPassword?: string;
} & Omit<UserTypes, "accountId">;

export type UserTypes = {
  username: string;
  fullName: string;
  email: string;
  avatar?: string;
  dateOfBirth?: string;
  phone?: string;
  accountId: number;
};

export type AppwriteUser = Models.Document & UserTypes;
