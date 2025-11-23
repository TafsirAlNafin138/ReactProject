import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import {Button, Input, Logo} from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { set, useForm } from "react-hook-form";
import { useState } from "react";


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit} = useForm();
    const [error, setError] = useState("");

     const login = async (data) => {
        setError("");
        try {
            const session = await authService.login({
                email: data.email,
                password: data.password
            });
            if (session) {
                const user = await authService.getCurrentUser();
                if(user)dispatch(authLogin(user));
                navigate("/");
            }
        } catch (err) {
            setError("Invalid email or password");
        }
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <div className="flex justify-center mb-6">
                <Logo width="150px" />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit(login)}>
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", { 
                        required: true,
                        validate: {
                            matchPattern: (value) => {
                                const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                return pattern.test(value) || "Invalid email address";
                            }
                        }
                     })}
                    className="mb-4"
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", { 
                        required: true,
                    })}
                    className="mb-6"
                />
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                    Register here
                </Link>
            </p>
        </div>
    </div>
    );
}
export default Login;