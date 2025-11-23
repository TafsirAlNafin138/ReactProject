import React from "react";
import { Register } from "../components";

function Signup() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded shadow">
                <Register />
            </div>
        </div>
    );
}

export default Signup;