import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {
    const id = useId(); 

    return (
        <div className="w-full">
            {/* Show label if passed into the component */}
            {label && (
                <label 
                    className="inline-block mb-1 pl-1 font-semibold text-gray-700" 
                    htmlFor={id} 
                >
                    {label}
                </label>
            )}
            <input
                {...props}
                type={type}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            />
        </div>
    );
});


export default Input;