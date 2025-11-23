import React from "react";
import { Login } from "../components";

function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded shadow">
                <Login />
            </div>
        </div>
    );
}

export default LoginPage;