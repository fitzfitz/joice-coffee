import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Models,
  Query,
} from "react-native-appwrite";
import toast from "./toast";
import { UserRegistrationTypes, UserTypes } from "./types/auth";
import config from "@/config/appwrite";

export const configLocal = {
  endpoint: config.endpoint,
  platform: config.platform,
  projectId: config.projectId,
  databaseId: config.databaseId,
  userCollectionId: config.userCollectionId,
  shopCollectionId: config.shopCollectionId,
  productCollectionId: config.productCollectionId,
};

const client = new Client();

client
  .setEndpoint(configLocal.endpoint)
  .setProject(configLocal.projectId)
  .setPlatform(configLocal.platform);

const account = new Account(client);
const database = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async (userData: UserRegistrationTypes) => {
  console.log(userData);
  delete userData.confirmPassword;

  try {
    const newAccount = await account.create(
      ID.unique(),
      userData.email,
      userData.password,
      userData.username
    );

    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(userData.username);
    await signIn(userData.email, userData.password);
    const newUser = await database.createDocument(
      configLocal.databaseId,
      configLocal.userCollectionId,
      ID.unique(),
      { ...userData, accountId: newAccount.$id, avatar: avatarUrl }
    );

    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log(session);
    return session;
  } catch (error: any) {
    console.log(error);
    toast.error(error?.response?.message);

    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error("No Account Found!");

    const currentUser = await database.listDocuments(
      configLocal.databaseId,
      configLocal.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error("No User Found!");

    return currentUser.documents[0] as Models.Document & UserTypes;
  } catch (error) {
    console.log(error);
  }
};
