import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

function LogoutBtn() {

    const dispatch = useDispatch();

    const handleLogout = () => {
        authService.logout().then(() => {
            // Successfully logged out
            dispatch(logout());
        }).catch((error) => {
            console.log("Logout error:", error);
        }).finally(() => {
            // Any final actions if needed
        });
    };
    return (
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
        </button>
    );
}
export default LogoutBtn;