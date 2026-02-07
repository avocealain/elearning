import React from 'react';

export default function SuccessCheck({ className = '', size = 'md' }) {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24',
    };

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <svg 
                className={`text-green-500 animate-[bounce_1s_ease-in-out_1] ${sizeClasses[size] || sizeClasses.md}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
            </svg>
        </div>
    );
}