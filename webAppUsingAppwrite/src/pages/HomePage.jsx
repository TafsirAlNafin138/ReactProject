import React, {useState, useEffect} from "react";
import DBservice from "../appwrite/database";
import { PostCard, Container } from "../components";

function HomePage() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const postsData = await DBservice.listPosts();
            if(postsData){
                setPosts(postsData);
            }
        };
        fetchPosts();
    }, []);
    return (
        <Container>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="w-full max-w-4xl bg-white p-8 rounded shadow">
                    <h1 className="text-2xl font-bold mb-6 text-center">Home Page</h1>
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

export default HomePage;