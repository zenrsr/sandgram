import { INewUser } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, database } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.name,
      user.email,
      user.password
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);
    const newUser = await saveUserToDb({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl
    });
    console.log("the new User: ", newUser);
    return newAccount;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function saveUserToDb(user: {
  accountId: string;
  name: string;
  email: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    console.log("created new user", newUser);
    return newUser;
  } catch (error) {
    console.error(error);
  }
  console.log("Saving user to db", user);
}

export async function loginAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    console.log("from api.ts file currentUser: ", currentUser);

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}
