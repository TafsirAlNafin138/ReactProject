import React, { act } from "react";
import {Container, Logo, LogoutBtn} from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'


function Header() {
    const auth = useSelector((state) => state.isAuthenticated);
    const navigate = useNavigate()

    const navItems = [
      {
        name: "Home",
        slug: "/", // where is URL going
        active: true,
      },
      {
        name: "Login",
        slug: "/login",
        active: !auth,
      },
      {
        name: "Signup",
        slug: "/signup",
        active: !auth,
      },
      {
        name: "All Posts",
        slug: "/all-posts",
        active: auth,
      },
      {
        name: "Add Post",
        slug: "/add-post",
        active: auth,
      },
    ];


    return (
        <header className="bg-blue-600 text-white p-4">
           <Container>
            <nav className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link to="/">
                    <Logo width="70px" />
                    </Link>
                </div>
                <ul className="flex items-center space-x-6">
                    {navItems.map((item) =>
                        item.active ? (
                            // This thing is being repeated here that's why we are using key here
                            <li key={item.name}>    
                                {/* <Link to={item.slug}>{item.name}</Link> */}
                                <button
                                    onClick={() => navigate(item.slug)}
                                    className="text-white hover:text-gray-200 font-medium"  
                                >
                                    {item.name}
                                </button>
                            </li>
                        ) : null
                    )}
                    {auth && (
                        <li>
                            <LogoutBtn />
                        </li>
                    )}
                </ul>
            </nav>
           </Container>
        </header>
    );
}
export default Header;