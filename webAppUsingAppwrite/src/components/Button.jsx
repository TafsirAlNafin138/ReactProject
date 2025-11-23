import React from "react";

function Button({
    children,
    type = "button",
    bgColor = "bg-blue-500",
    hoverColor = "hover:bg-blue-700",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`${bgColor} ${hoverColor} ${textColor} font-bold py-2 px-4 rounded ${className}`} {...props}
        >
            {children}
        </button>
    );
}

export default Button;