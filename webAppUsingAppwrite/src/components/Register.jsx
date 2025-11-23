import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import {Button, Input, Logo} from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
        const registerUser = async (data) => {
        setError("");
        try {
            const session = await authService.createAccount({
                email: data.email,
                password: data.password,
                name: data.name
            });
            if (session) {
                const user = await authService.getCurrentUser();
                if(user)dispatch(authLogin(user));
                navigate("/");
            }
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    };
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <div className="flex justify-center mb-6">
                <Logo width="150px" />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">Create a New Account</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit(registerUser)}>
                <Input
                    label="Name"
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", { required: true })}
                    className="mb-4"
                />
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
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long"
                        }
                    })}
                    className="mb-6"
                />
                <Button type="submit" className="w-full">
                    Register
                </Button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                    Login here
                </Link>
            </p>
        </div>
    </div>
    );
}

export default Register;