import React from "react";
import { Container, PostForm } from "../components";
import DBservice from "../appwrite/database";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditPost() {
    const { slug } = useParams();
    const [post, setPost] = React.useState(null);
    const navigate = useNavigate();
    React.useEffect(() => {
        if(slug){
            const fetchPost = async () => {
                const postData = await DBservice.getPostBySlug(slug);
                if(postData){
                  setPost(postData);
                }
            };
            fetchPost();
        }else{
            navigate('/');
        }
    }, [slug, navigate]);

    return post ? (
        <Container>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="w-full max-w-2xl bg-white p-8 rounded shadow">
                    <PostForm post={post} />
                </div>
            </div>
        </Container>
    ) : null;
}
export default EditPost;