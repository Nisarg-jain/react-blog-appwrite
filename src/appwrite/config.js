import conf from "../conf/conf";
// Added Storage to the imports list
import { Client, Account, ID, Query, Databases, Storage } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  Database;
  Storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId); 
    
    this.account = new Account(this.client);
    this.Database = new Databases(this.client);
    this.Storage = new Storage(this.client);
  }

  // --- DATABASE METHODS (Now correctly placed INSIDE the class) ---

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.Database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        slug, // 💡 Use the slug as the Document ID so update/delete can find it!
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: createPost :: error", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.Database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        slug, // Find the document using its slug ID
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: updatePost :: error", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.Database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        slug
      );
      return true; // Return true to indicate successful deletion
    } catch (error) {
      console.error("Appwrite service :: deletePost :: error", error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;