import conf from '../conf/conf.js';
import { Client, Databases, Storage, Query } from 'appwrite';

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Make sure collectionId defaults to conf.appwriteCollectionId!
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId, // 👈 MUST USE conf.appwriteCollectionId HERE
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }
}

const service = new Service();
export default service;