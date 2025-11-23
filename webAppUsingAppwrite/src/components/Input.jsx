import React, {useId} from "react";

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    placeholder = "",
    className = "",
    ...props
}, ref) {
    const inputId = useId();

    return (
        <div className={`w-full flex flex-col mb-4 ${className}`}>
            {label && (
                <label htmlFor={inputId} className="mb-2 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                ref={ref}
                type={type}
                placeholder={placeholder}
                className="border border-gray-300 rounded py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...props}
            />
        </div>
    );

});
export default Input;