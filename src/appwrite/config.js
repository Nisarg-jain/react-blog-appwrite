import conf from "../conf/conf";
import { Client, Account, ID ,Database, Query} from "appwrite";

export class AuthService {
  client = new Client();
  account;
  Database;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    this.Database = new Database(this.client);
  }
}