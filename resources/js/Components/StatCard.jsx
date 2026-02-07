import React from 'react';
import Card from '@/Components/Card';

export default function StatCard({ title, value, icon, trend, trendUp = true, className = '' }) {
    return (
        <Card className={`relative overflow-hidden ${className}`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-secondary-500 mb-1">{title}</p>
                    <h4 className="text-2xl sm:text-3xl font-bold text-secondary-900 tracking-tight">
                        {value}
                    </h4>
                </div>
                
                {icon && (
                    <div className="p-3 bg-primary-50 rounded-lg text-primary-600">
                        {icon}
                    </div>
                )}
            </div>

            {/* Trend Indicator */}
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span 
                        className={`font-medium flex items-center ${
                            trendUp ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                        {trendUp ? (
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        ) : (
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                        )}
                        {trend}
                    </span>
                    <span className="text-secondary-400 ml-2">vs last month</span>
                </div>
            )}
        </Card>
    );
}
