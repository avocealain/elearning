import React, { forwardRef, useImperativeHandle, useRef } from 'react';

export default forwardRef(function FormInput({ 
    type = 'text', 
    name, 
    id, 
    value, 
    label, 
    error, 
    className = '', 
    placeholder = ' ', // Required for floating label trick
    ...props 
}, ref) {
    const localRef = useRef(null);
    const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    return (
        <div className={`relative ${className}`}>
            <input
                {...props}
                type={type}
                name={name}
                id={inputId}
                value={value}
                ref={localRef}
                placeholder={placeholder}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${inputId}-error` : undefined}
                className={`
                    peer block w-full px-4 py-3 
                    bg-surface border-2 rounded-lg 
                    text-secondary-900 placeholder-transparent
                    focus:outline-none focus:ring-0 transition-colors
                    ${error 
                        ? 'border-red-300 focus:border-red-500 text-red-900' 
                        : 'border-gray-200 focus:border-primary-500 hover:border-gray-300'
                    }
                `}
            />
            
            <label
                htmlFor={inputId}
                className={`
                    absolute left-4 top-3 px-1 bg-surface
                    text-secondary-500 text-base transition-all duration-200 ease-out origin-[0]
                    peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75 
                    peer-focus:-translate-y-5
                    peer-focus:text-primary-500 font-medium
                    peer-[:not(:placeholder-shown)]:scale-75 
                    peer-[:not(:placeholder-shown)]:-translate-y-5
                    pointer-events-none z-10
                    ${error ? 'text-red-500 peer-focus:text-red-500' : ''}
                `}
            >
                {label}
            </label>

            {error && (
                <p 
                    id={`${inputId}-error`} 
                    className="mt-1.5 text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1 fade-in duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
});
