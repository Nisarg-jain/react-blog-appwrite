import React, { useId } from 'react'

const Select = React.forwardRef(function Select({
    options = [],
    label,
    className = '',
    ...props
}, ref) {
    const id = useId()

    return (
        <div className='w-full'>
            {/* 1. Corrected `label` prop usage */}
            {label && (
                <label htmlFor={id} className="inline-block mb-1 pl-1">
                    {label}
                </label>
            )}

            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {/* 2. Handles both simple strings ['active', 'inactive'] and objects [{label, value}] */}
                {options?.map((option) => {
                    const value = typeof option === 'object' ? option.value : option
                    const labelText = typeof option === 'object' ? option.label : option

                    return (
                        <option key={value} value={value}>
                            {labelText}
                        </option>
                    )
                })}
            </select>
        </div>
    )
})

export default Select