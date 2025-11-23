import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
        const navigate = useNavigate();
        const [loading, setLoading] = useState(true);
        const authStatus = useSelector((state) => state.auth.isAuthenticated);

        useEffect(() => {
            if(authentication && authStatus !== authentication){
                navigate("/login");
            } else if(!authentication && authStatus !== authentication){
                navigate("/");
            } 
            setLoading(false);

        }, [authStatus, navigate, authentication]);
    return (
        loading ? (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">Loading...</p>
                </div>
            </div>
        ) : (
            <div className="min-h-screen bg-white">
                {children}
            </div>
        )
    );
}