import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.api) // Appwrite Endpoint
            .setProject(config.projectId);
        // this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, feathuredImageId, status, userId}) {
        try {
            const post = await this.databases.createDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                    title,
                    content,
                    feathuredImageId,
                    status,
                    userId
                }
            );
            return post;
        } catch (error) {
            console.log("Error creating post:", error);
        }    
    }

    async updatePost( slug, {title, content, feathuredImageId, status}) {
        try{
            const post = await this.databases.updateDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                    title,
                    content,
                    feathuredImageId,
                    status
                }
            );
            return post;
        }catch (error) {
            console.log("Error updating post:", error);
        }
    }

    async deletePost(slug) {
        try{
            await this.databases.deleteDocument(
                config.databaseId,
                config.collectionId,
                slug
            );
            return true;
        }catch (error) {
            console.log("Error deleting post:", error);
        }
        return false;
    }

    async getPost(slug) {
        try{
            const post = await this.databases.getDocument(
                config.databaseId,
                config.collectionId,
                slug
            );
            return post;
        }catch (error) {
            console.log("Error getting post:", error);
        }
        return null;
    }
    async listPosts(queries = [Query.equal("status", "active")]) {
        try{
            const posts = await this.databases.listDocuments(
                config.databaseId,
                config.collectionId,
                queries
            );
            return posts.documents;
        }catch (error) {
            console.log("Error listing posts:", error);
        }
    }

    // File upload method
    async uploadFile(file) {
        try{
            const response = await this.storage.createFile(
                config.bucketId,
                ID.unique(),
                file
            );
            return response;
        }catch (error) {
            console.log("Error uploading file:", error);
        }
    }

    async deleteFile(fileId) {
        try{
            await this.storage.deleteFile(
                config.bucketId,
                fileId
            );
            return true;
        }catch (error) {
            console.log("Error deleting file:", error);
        }
    }

    getFilePreviewURL(fileId) {
        return this.storage.getFilePreview(
            config.bucketId,
            fileId
        );
    }
}

const DBservice = new Service();
export default DBservice