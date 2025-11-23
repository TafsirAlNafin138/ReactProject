import { useId } from "react";
import React from "react";

const Select = React.forwardRef(function Select({
    options,
    label,
    className = "",
    ...props
}, ref){
    const selectId = useId();

    return (
        <div className={`w-full flex flex-col mb-4 ${className}`}>
            {label && (
                <label htmlFor={selectId} className="mb-2 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <select
                id={selectId}
                ref={ref}
                className="border border-gray-300 rounded-md p-2"
                {...props}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;
// export default React.forwardRef(Select);  ------ Alternate export style