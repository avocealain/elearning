import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import CourseCurriculum from '@/Components/Course/CourseCurriculum';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Show({ course, isEnrolled }) {
    const { flash } = usePage().props;
    const [enrolling, setEnrolling] = useState(false);

    const handleEnroll = () => {
        setEnrolling(true);
        router.post(route('courses.enroll', course.id), {}, {
            preserveScroll: true,
            onFinish: () => setEnrolling(false),
        });
    };

    return (
        <PublicLayout>
            <Head title={course.title} />

            <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     {/* Flash Messages */}
                     {flash.success && (
                        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow-sm" role="alert">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">{flash.success}</p>
                                </div>
                            </div>
                        </div>
                    )}
                     {flash.error && (
                        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm" role="alert">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-red-800">{flash.error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                             {/* Media & Description */}
                             <div className="bg-white dark:bg-gray-800 shadow rounded-2xl overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700">
                                 <div className="w-full aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 relative">
                                      {course.thumbnail ? (
                                          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                      ) : (
                                        <div className="w-full h-64 sm:h-96 flex items-center justify-center text-gray-400">
                                            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        </div>
                                      )}
                                 </div>
                                 
                                 <div className="p-8">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                                            Course
                                        </span>
                                    </div>
                                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-4">
                                        {course.title}
                                    </h1>
                                    <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                                        <p>{course.description}</p>
                                    </div>
                                 </div>
                             </div>
                             
                             {/* Curriculum */}
                             <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-8 ring-1 ring-gray-200 dark:ring-gray-700">
                                <CourseCurriculum modules={course.modules} isEnrolled={isEnrolled} />
                             </div>
                        </div>

                        {/* Sidebar */}
                        <div className="mt-8 lg:mt-0 lg:col-span-1">
                            <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 sticky top-24 ring-1 ring-gray-200 dark:ring-gray-700">
                                <div className="text-center pb-6 border-b border-gray-100 dark:border-gray-700">
                                    <span className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                         {parseFloat(course.price) === 0 ? 'Free' : `$${course.price}`}
                                    </span>
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Lifetime access</p>
                                </div>
                                
                                <div className="mt-6 space-y-4">
                                    {isEnrolled ? (
                                        <>
                                            <Link 
                                                href={route('student.courses.learn', course.slug)} 
                                                className="flex justify-center items-center w-full bg-green-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-green-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                            >
                                                Continue Learning
                                            </Link>
                                            
                                            <div className="text-center">
                                                <button 
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to unenroll? You will lose your progress.')) {
                                                            router.delete(route('courses.unenroll', course.id));
                                                        }
                                                    }}
                                                    className="text-sm text-gray-500 hover:text-red-500 hover:underline transition-colors"
                                                >
                                                    Unenroll from Course
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <button
                                            onClick={handleEnroll}
                                            disabled={enrolling}
                                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-0.5 transition-all
                                                ${enrolling ? 'opacity-75 cursor-wait' : ''}
                                            `}
                                        >
                                            {enrolling ? (
                                                <span className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </span>
                                            ) : 'Enroll Now'}
                                        </button>
                                    )}
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Instructor</h4>
                                    <div className="mt-4 flex items-center">
                                         <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-500 overflow-hidden">
                                            {/* Could add instructor generic avatar here if no image */}
                                            {course.instructor.name.charAt(0)}
                                         </div>
                                         <div className="ml-3">
                                             <p className="text-sm font-medium text-gray-900 dark:text-white">{course.instructor.name}</p>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
