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
   async getPosts( queries = [Query.equal("status", "active")] ) {
    try {
      return await this.Database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite service :: getPosts :: error", error);
      throw error;
      return false;
    }

  }

  async getPost(slug) {
    try {
      return await this.Database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostsCollectionId,
        slug
      );
    } catch (error) {
      console.error("Appwrite service :: getPost :: error", error);
      throw error;
    }
  }
          // File upload services//
    async uploadFile(file) {
        try {
            const response = await this.Storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return response;
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error", error);
            throw error;
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.Storage.deleteFile(conf.appwriteBucketId, fileId);
            return true; 
        } catch (error) {
            console.error("Appwrite service :: deleteFile :: error", error);
            throw error;
        }
    }    

     get FilePreview(fileId) {
        return this.Storage.getFilePreview(conf.appwriteBucketId, fileId);
    }

}

const authService = new AuthService();
export default authService;