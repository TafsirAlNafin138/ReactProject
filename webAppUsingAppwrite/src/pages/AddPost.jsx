import React from "react";
import { Container } from "../components";
import PostForm from "../components/postForm/PostForm";

function AddPost() {
    return (
        <Container>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-2xl bg-white p-8 rounded shadow">
                    <PostForm />
                </div>
            </div>
        </Container>
    );
}

export default AddPost;