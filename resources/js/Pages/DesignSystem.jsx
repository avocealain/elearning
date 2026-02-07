import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import FormInput from '@/Components/FormInput';
import LoadingSpinner from '@/Components/LoadingSpinner';
import SuccessCheck from '@/Components/SuccessCheck';

export default function DesignSystem({ auth }) {
    const [isLoading, setIsLoading] = useState(false);

    const toggleLoading = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Design System</h2>}
        >
            <Head title="Design System" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Components Section */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Components & Utilities</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Example Card from Snippet */}
                            <Card 
                                title="Course Progress"
                                action={<span className="text-xs text-secondary-500">Updated 5 min ago</span>}
                            >
                                <p className="text-secondary-500">You are doing great!</p>
                                
                                {/* Badges */}
                                <div className="mt-4 flex gap-2">
                                    <span className="badge badge-primary">In Progress</span>
                                    <span className="badge badge-accent">New</span>
                                </div>

                                {/* Buttons */}
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Button variant="primary">Continue Learning</Button>
                                    <Button variant="ghost">View Details</Button>
                                </div>
                            </Card>

                            {/* Input Examples */}
                            <Card title="Form Elements" footer={<Button variant="primary" className="w-full justify-center">Submit</Button>}>
                                <div className="space-y-6"> {/* Increased space-y for floating labels */}
                                    <FormInput 
                                        label="Email Address" 
                                        type="email" 
                                        placeholder="john@example.com"
                                    />
                                    
                                    <FormInput 
                                        label="Password" 
                                        type="password" 
                                        error="Password must be at least 8 characters"
                                    />

                                    <div className="flex gap-2 pt-2">
                                        <Button variant="secondary">Secondary</Button>
                                        <Button variant="accent">Accent</Button>
                                    </div>
                                </div>
                            </Card>
                            
                            {/* Button Variants Card */}
                            <Card title="Button Variants" className="md:col-span-2">
                                <div className="flex flex-wrap gap-3 mb-4">
                                    <Button variant="primary">Primary</Button>
                                    <Button variant="secondary">Secondary</Button>
                                    <Button variant="accent">Accent</Button>
                                    <Button variant="danger">Danger</Button>
                                    <Button variant="ghost">Ghost</Button>
                                </div>
                                <div className="flex flex-wrap gap-3 items-center">
                                    <Button size="sm">Small</Button>
                                    <Button size="md">Medium</Button>
                                    <Button size="lg">Large</Button>
                                </div>
                            </Card>
                            
                            {/* Micro-interactions Card */}
                            <Card title="Micro-interactions & Animations" className="md:col-span-2">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Loading States</h4>
                                        <div className="flex flex-wrap gap-3">
                                            <Button 
                                                variant="primary" 
                                                isLoading={isLoading} 
                                                onClick={toggleLoading}
                                            >
                                                Click to Load
                                            </Button>
                                            <Button variant="secondary" isLoading={true}>Loading...</Button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Spinners</h4>
                                        <div className="flex items-center gap-4">
                                            <LoadingSpinner size="sm" className="text-primary-600" />
                                            <LoadingSpinner size="md" className="text-secondary-600" />
                                            <LoadingSpinner size="lg" className="text-accent-500" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Success Animation</h4>
                                        <div className="flex items-center gap-4">
                                            <SuccessCheck size="md" />
                                        </div>
                                    </div>
                                </div>
                            </Card>

                        </div>
                    </div>

                    {/* Color Palette Preview */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Color Palette</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-lg bg-primary text-white text-center">Primary</div>
                            <div className="p-4 rounded-lg bg-secondary text-white text-center">Secondary</div>
                            <div className="p-4 rounded-lg bg-accent text-white text-center">Accent</div>
                            <div className="p-4 rounded-lg bg-background border border-gray-200 text-secondary text-center">Background</div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
