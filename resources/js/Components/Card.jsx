import React from 'react';

export default function Card({ 
    children, 
    className = '', 
    title, 
    action, 
    footer,
    noPadding = false 
}) {
    return (
        <div className={`card flex flex-col ${className}`}>
            {/* Header */}
            {(title || action) && (
                <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-100 flex justify-between items-center bg-white/50 backdrop-blur-sm">
                    {title && <h3 className="font-semibold text-lg text-secondary-900">{title}</h3>}
                    {action && <div className="ml-4">{action}</div>}
                </div>
            )}
            
            {/* Body */}
            <div className={`flex-1 ${noPadding ? '' : 'p-4 sm:p-6'}`}>
                {children}
            </div>

            {/* Footer */}
            {footer && (
                <div className="px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 border-t border-gray-100 rounded-b-xl">
                    {footer}
                </div>
            )}
        </div>
    );
}
