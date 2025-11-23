import React, { use } from "react";
import { useState, useEffect } from "react";
import DBservice from "../appwrite/database";
import { PostCard, Container } from "../components";
import { set } from "react-hook-form";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const postsData = await DBservice.getAllPosts();
            setPosts(postsData);
        };
        fetchPosts();
    }, []);

    return (
        <Container>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="w-full max-w-4xl bg-white p-8 rounded shadow">
                    <h1 className="text-2xl font-bold mb-6 text-center">All Posts</h1>
                    {posts.length === 0 ? (
                        <p className="text-center text-gray-500">No posts available.</p>
                    ) : (
                        posts.map((post) => <PostCard key={post.$id} post={post} />)
                    )}
                </div>
            </div>
        </Container>
    );
}
export default AllPosts;