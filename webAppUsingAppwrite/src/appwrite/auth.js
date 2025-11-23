import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.api) // Appwrite Endpoint
      .setProject(config.projectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAcc = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAcc) {
        //Call login function here
        return this.login({ email, password });
      } else {
        return userAcc;
      }
    } catch (error) {
      console.log("Error creating account:", error);
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailSession(email, password);
      return session;
    } catch (error) {
      console.log("Error logging in:", error);
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log("Error getting current user:", error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Error logging out:", error);
    }
  }
}

const authService = new AuthService();

export default authService;