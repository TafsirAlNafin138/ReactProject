import React from "react";

import DBservice from "../appwrite/database";
import { Link } from "react-router";

function PostCard({
    $id = "",
    title = "Untitled",
    featuredImage = null,
    content = "",
    status = "draft",
    userId = "anonymous",
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
    views = 0,
    ...props
}) {
    const created = createdAt ? new Date(createdAt).toLocaleString() : "";
    const updated = updatedAt ? new Date(updatedAt).toLocaleString() : "";

    return (
        <Link
            to={`/post/${$id}`}
            className="block border border-gray-300 rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-200"
            {...props}
        >
            {featuredImage && featuredImage.$id && (
                <img
                    src={DBservice.getFilePreviewURL(featuredImage.$id)}
                    alt={title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                />
            )}

            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{title}</h2>
                <span className="text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                    {status}
                </span>
            </div>

            <p className="text-gray-700 mb-3">{content}</p>

            <div className="text-sm text-gray-500 flex items-center justify-between">
                <div>
                    <span className="mr-2">By: {userId}</span>
                    <span className="mr-2">· Views: {views}</span>
                </div>
                <div className="text-right">
                    <div>Created: {created}</div>
                    <div>Updated: {updated}</div>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;