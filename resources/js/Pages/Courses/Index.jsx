import React, { useState, useEffect, useMemo } from 'react';
import { Head } from '@inertiajs/react'; // Link removed if not used
import PropTypes from 'prop-types';
import CourseCard from '@/Components/Course/CourseCard';
import LoadingSpinner from '@/Components/LoadingSpinner';
import PublicLayout from '@/Layouts/PublicLayout';
import useDebounce from '@/Hooks/useDebounce';

export default function Index({ courses }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    
    // Use the custom debounce hook
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Filter logic memoized
    const filteredCourses = useMemo(() => {
        if (!debouncedSearchTerm) return courses;
        
        const lower = debouncedSearchTerm.toLowerCase();
        return courses.filter(course =>
            course.title.toLowerCase().includes(lower) ||
            course.description.toLowerCase().includes(lower)
        );
    }, [debouncedSearchTerm, courses]);

    // Handle search loading state for UI feedback
    useEffect(() => {
        setIsSearching(searchTerm !== debouncedSearchTerm);
    }, [searchTerm, debouncedSearchTerm]);

    return (
        <PublicLayout>
            <Head title="Courses" />

            <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="text-center mb-12 px-4">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
                            Explore Our Courses
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
                            Enhance your skills with our comprehensive curriculum designed by industry experts.
                        </p>
                        
                        {/* Search Bar */}
                        <div className="mt-8 max-w-xl mx-auto relative">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-all duration-300"
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                {isSearching ? (
                                    <LoadingSpinner className="h-5 w-5 text-indigo-500" />
                                ) : (
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>

                    {filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8 px-4 sm:px-0">
                            {filteredCourses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-sm mx-4 sm:mx-0">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No courses found</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Try adjusting your search or check back later for new content.
                            </p>
                            {searchTerm && (
                                <div className="mt-6">
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Clear Search
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}

Index.propTypes = {
    courses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

