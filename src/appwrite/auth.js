import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // Primary account creation method
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // Automatically log them in after a successful registration
        return await this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: createAccount :: error", error);
      throw error;
    }
  }

  // Alias so calling authService.register() works identically
  async register(data) {
    return this.createAccount(data);
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite service :: login :: error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // Return null quietly when no session exists
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSession("current");
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;