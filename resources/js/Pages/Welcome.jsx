import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import useTranslation from '@/Hooks/useTranslation';

export default function Welcome({ auth, laravelVersion, phpVersion, featuredCourses }) {
    const { t } = useTranslation();
    
    // Features focusing on utility
    const features = [
        {
            title: t("Structured Learning Title"),
            description: t("Structured Learning Desc"),
            color: "bg-blue-100 text-blue-600",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            )
        },
        {
            title: t("Accessible Everywhere Title"),
            description: t("Accessible Everywhere Desc"),
            color: "bg-green-100 text-green-600",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: t("Progress Tracking Title"),
            description: t("Progress Tracking Desc"),
            color: "bg-purple-100 text-purple-600",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        }
    ];

    return (
        <PublicLayout>
            <Head title="Accueil" />

            {/* HERO SECTION */}
            <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        {/* Decorative Shape */}
                        <svg
                            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white dark:text-gray-900 transform translate-x-1/2"
                            fill="currentColor"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <polygon points="50,0 100,0 50,100 0,100" />
                        </svg>

                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">{t("Welcome to")}</span>{' '}
                                    <span className="block text-indigo-600 xl:inline">{t("Digital Professions")}</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    {t("Hero Subtitle")}
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                                    <div className="rounded-md shadow">
                                        <Link
                                            href={route('courses.index')}
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-transform transform hover:scale-105 duration-200 shadow-lg"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {t("Start Learning")}
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0">
                                        <Link
                                            href={route('courses.index')}
                                            className="w-full flex items-center justify-center px-8 py-3 border-2 border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-transparent hover:bg-indigo-50 dark:hover:bg-gray-800 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                                        >
                                            {t("View Courses")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img
                        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                        src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                        alt="Étudiants africains apprenant le numérique"
                    />
                    <div className="absolute inset-0 bg-indigo-600 mix-blend-multiply opacity-20 hover:opacity-10 transition-opacity duration-300"></div>
                </div>
            </div>

            {/* FEATURED COURSES SECTION */}
            {featuredCourses && featuredCourses.length > 0 && (
                <div className="py-12 bg-gray-50 dark:bg-gray-800/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                                {t("Featured Courses")}
                            </h2>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
                                {t("Featured Courses Desc")}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredCourses.map((course) => (
                                <Link key={course.id} href={route('courses.show', course.slug)} className="flex flex-col rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 group">
                                    <div className="flex-shrink-0 h-48 w-full bg-gray-200 relative overflow-hidden">
                                        {/* Placeholder or Image */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 group-hover:scale-105 transition-transform duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center text-white opacity-20">
                                           <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z"/></svg> 
                                        </div>
                                    </div>
                                    <div className="flex-1 p-6 flex flex-col justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                                {t("Modules")}: {course.modules_count || 0}
                                            </p>
                                            <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                                                {course.title}
                                            </h3>
                                            <p className="mt-3 text-base text-gray-500 dark:text-gray-400 line-clamp-3">
                                               {course.description || "No description available."}
                                            </p>
                                        </div>
                                        <div className="mt-6 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <span className="sr-only">{course.instructor?.name}</span>
                                                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                                                        {course.instructor?.name?.charAt(0) || 'I'}
                                                    </div>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {course.instructor?.name || 'Instructor'}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-indigo-600 font-medium text-sm group-hover:translate-x-1 transition-transform inline-flex items-center">
                                                {t("Enroll Now")} &rarr;
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                         <div className="mt-10 text-center">
                            <Link
                                href={route('courses.index')}
                                className="text-base font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                                {t("Browse Courses")} <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* FEATURES SECTION */}
            <div className="py-24 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">{t("Why choose us")}</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            {t("A better way to learn")}
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
                            {t("Discover desc")}
                        </p>
                    </div>

                    <div className="mt-20">
                        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature) => (
                                <div key={feature.title} className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className={`absolute top-0 right-0 -mt-6 -mr-6 w-20 h-20 rounded-full opacity-20 ${feature.color.split(' ')[0]} blur-xl group-hover:blur-2xl transition-all`}></div>
                                    <div className={`inline-flex items-center justify-center p-3 rounded-xl shadow-md ${feature.color}`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                                    <p className="mt-4 text-base text-gray-500 dark:text-gray-400">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA SECTION */}
            <div className="bg-indigo-700 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Prêt à commencer votre apprentissage ?
                    </h2>
                    <p className="mt-4 text-xl text-indigo-100">
                        Créez votre compte gratuitement et accédez à nos premiers contenus dès aujourd'hui.
                    </p>
                    <div className="mt-8 flex justify-center">
                         <Link
                            href={route('register')}
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 shadow-md"
                        >
                            S'inscrire maintenant
                        </Link>
                    </div>
                </div>
            </div>

{/* FOOTER REMOVED */}
        </PublicLayout>
    );
}
