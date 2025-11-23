import React from "react";

function Container({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <div className='w-full block'>
                   {children}
                    </div>
        </div>
    );
}

export default Container;