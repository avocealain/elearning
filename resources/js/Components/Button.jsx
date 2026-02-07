import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function Button({ 
    className = '', 
    disabled, 
    children, 
    variant = 'primary', 
    size = 'md',
    type = 'button',
    isLoading = false,
    ...props 
}) {
    const baseClass = 'btn inline-flex items-center justify-center gap-2 transition-all duration-200';
    
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'btn-danger',
        ghost: 'btn-ghost',
        accent: 'btn-accent',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: '', // Default handled by .btn
        lg: 'px-6 py-3 text-base',
    };

    return (
        <button
            {...props}
            type={type}
            className={`
                ${baseClass} 
                ${variants[variant] || variants.primary} 
                ${sizes[size] || sizes.md} 
                ${(disabled || isLoading) ? 'opacity-70 cursor-not-allowed transform-none' : ''} 
                ${className}
            `}
            disabled={disabled || isLoading}
        >
            {isLoading && (
                <LoadingSpinner size={size === 'sm' ? 'sm' : 'md'} />
            )}
            {children}
        </button>
    );
}
