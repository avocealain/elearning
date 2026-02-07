import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import useTranslation from '@/Hooks/useTranslation';
import LanguageSwitcher from '@/Components/LanguageSwitcher';

export default function PublicLayout({ children }) {
    const { t } = useTranslation();
    const page = usePage();
    const { auth } = page.props;
    const currentUrl = page.url ?? '';
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        {
            label: t('Courses'),
            href: '/courses',
            isActive: currentUrl.startsWith('/courses'),
        },
    ];

    const primaryButtonClass =
        'inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 transition ease-in-out duration-150 shadow-md hover:shadow-lg';
    
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 flex flex-col">
            <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300 relative" aria-label="Primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/" className="group flex flex-col items-start justify-center">
                                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                                        E-Learning
                                    </span>
                                    <span className="text-xs text-indigo-600 dark:text-indigo-400 -mt-0.5 font-serif italic tracking-wide">
                                        "{t('Motto')}"
                                    </span>
                                </Link>
                            </div>
                           <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex items-center">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        aria-current={link.isActive ? 'page' : undefined}
                                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out ${
                                            link.isActive
                                                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 font-bold shadow-sm ring-1 ring-indigo-500/30'
                                                : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:text-indigo-300 dark:hover:bg-gray-700/50 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Hamburger */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!mobileMenuOpen ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={mobileMenuOpen ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6 space-x-4">
                            <LanguageSwitcher />
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className={primaryButtonClass}
                                >
                                    {t('Dashboard')}
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                        {t('Log in')}
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className={`ml-4 ${primaryButtonClass}`}
                                    >
                                        {t('Register')}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shadow-lg`}>
                    <div className="pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                                    link.isActive
                                        ? 'border-indigo-500 text-indigo-700 bg-indigo-50 dark:bg-indigo-900/50 dark:text-indigo-300'
                                        : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="px-4 mb-3 flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400 text-sm">{t('Language')}:</span>
                            <LanguageSwitcher />
                        </div>
                        {auth?.user ? (
                            <div className="mt-3 space-y-1">
                                <Link href="/dashboard" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 dark:text-gray-400 dark:hover:bg-gray-700">
                                    {t('Dashboard')}
                                </Link>
                            </div>
                        ) : (
                            <div className="mt-3 space-y-1 px-4">
                                <Link href={route('login')} className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 mb-2">
                                    {t('Log in')}
                                </Link>
                                <Link href={route('register')} className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                    {t('Register')}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto w-full">
                    {page.props.flash && page.props.flash.success && (
                        <div className="mx-4 sm:mx-6 lg:mx-8 mt-4 p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                            <span className="font-medium">Success!</span> {page.props.flash.success}
                        </div>
                    )}
                    {page.props.flash && page.props.flash.error && (
                        <div className="mx-4 sm:mx-6 lg:mx-8 mt-4 p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            <span className="font-medium">Error!</span> {page.props.flash.error}
                        </div>
                    )}
                </div>
                {children}
            </main>
            
            <footer className="bg-slate-800 text-white border-t border-slate-700 mt-auto">
                {/* Main Footer Content */}
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: Identity */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                             {/* Reduced Logo/Icon */}
                            <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                            <span className="text-xl font-bold tracking-wider">E-LEARNING</span>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            {t('Footer Description')}
                        </p>
                    </div>

                    {/* Column 2: About */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-indigo-400">{t('About Us')}</h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li>
                                <Link href="/" className="hover:text-white transition-colors flex items-center">
                                    <span className="mr-2">›</span> {t('Discover E-Learning')}
                                </Link>
                            </li>
                             <li>
                                <Link href={route('help.show')} className="hover:text-white transition-colors flex items-center">
                                    <span className="mr-2">›</span> {t('Help Center')}
                                </Link>
                            </li>
                            <li>
                                <Link href={route('terms.show')} className="hover:text-white transition-colors flex items-center">
                                    <span className="mr-2">›</span> {t('Legal Mentions')}
                                </Link>
                            </li>
                            <li>
                                <Link href={route('policy.show')} className="hover:text-white transition-colors flex items-center">
                                    <span className="mr-2">›</span> {t('Usage Policies')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Follow us */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-indigo-400">{t('Follow Us')}</h3>
                        <div className="flex flex-col space-y-3">
                            <a href="https://www.facebook.com/alain.avoce.gounou/" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-300 hover:text-white transition-colors group">
                                <span className="bg-blue-600 p-2 rounded-full mr-3 group-hover:bg-blue-500 transition-colors">
                                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                                </span>
                                Facebook
                            </a>
                            <a href="https://www.linkedin.com/in/alain-avoce/" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-300 hover:text-white transition-colors group">
                                <span className="bg-blue-700 p-2 rounded-full mr-3 group-hover:bg-blue-600 transition-colors">
                                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                </span>
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-indigo-400">{t('e-Services')}</h3>
                        <p className="text-sm text-slate-300 mb-4">{t('Contact Support')}</p>
                        <div className="flex flex-col space-y-3">
                            <a href="mailto:digitobenin@gmail.com" className="inline-flex items-center text-sm text-slate-300 hover:text-white transition-colors">
                                <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                {t('Email Label')}
                            </a>
                            <a href="https://wa.me/2290152544387" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-slate-300 hover:text-white transition-colors">
                                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                {t('WhatsApp Label')}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className="bg-slate-900 py-6 border-t border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-sm text-slate-400 mb-4 md:mb-0">
                            COPYRIGHT © E-LEARNING {currentYear}
                        </div>
                        <div className="flex space-x-6 text-sm text-slate-400">
                             {/* Optional bottom links if needed */}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
