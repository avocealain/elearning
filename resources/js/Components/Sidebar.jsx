import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import useTranslation from '@/Hooks/useTranslation';

const NavItem = ({ href, active, children, icon, expanded }) => (
    <Link
        href={href}
        className={`
            group flex items-center px-3 py-2.5 rounded-lg transition-all duration-200
            ${active 
                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }
            ${expanded ? 'justify-start' : 'justify-center'}
        `}
    >
        <span className={`${active ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
            {icon}
        </span>
        
        {expanded && (
            <span className="ml-3 font-medium text-sm whitespace-nowrap overflow-hidden transition-opacity duration-200">
                {children}
            </span>
        )}
        
        {/* Tooltip for collapsed state */}
        {!expanded && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                {children}
            </div>
        )}
    </Link>
);

export default function Sidebar({ user, open, setOpen }) {
    const { t } = useTranslation();
    const { locale } = usePage().props;
    // Icons
    const Icons = {
        Dashboard: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
        ),
        Course: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        ),
        Beaker: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
        ),
        Admin: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        ),
        User: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        ),
        Users: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        ),
        ChevronLeft: (
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        ),
        ChevronRight: (
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        )
    };

    return (
        <aside 
            className={`
                fixed inset-y-0 left-0 z-30 flex flex-col bg-secondary-900 border-r border-gray-800 transition-all duration-300 ease-in-out
                ${open ? 'w-64' : 'w-20'}
                hidden md:flex
            `}
        >
            {/* Header / Logo */}
            <div className={`flex items-center min-h-[4rem] px-4 bg-secondary-950/50 ${open ? 'justify-between py-2' : 'justify-center h-16'}`}>
                <Link href="/" className="flex items-center gap-2 overflow-hidden">
                    <ApplicationLogo className="w-8 h-8 text-primary fill-current shrink-0" />
                    {open && (
                        <div className="flex flex-col min-w-0">
                            <span className="text-white font-bold text-lg tracking-tight leading-none">E-Learning</span>
                            <span className="text-[0.65rem] text-indigo-300 leading-tight mt-1 truncate w-40 font-serif italic" title={t('Motto')}>
                                "{t('Motto')}"
                            </span>
                        </div>
                    )}
                </Link>
                
                {/* Collapse Toggle */}
                {open && (
                    <button 
                        onClick={() => setOpen(false)}
                        className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                        {Icons.ChevronLeft}
                    </button>
                )}
            </div>

            {!open && (
                <div className="flex justify-center py-2">
                     <button 
                        onClick={() => setOpen(true)}
                        className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                        {Icons.ChevronRight}
                    </button>
                </div>
            )}

            {/* Navigation */}
            <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
                <NavItem href={route('dashboard')} active={route().current('dashboard')} icon={Icons.Dashboard} expanded={open}>
                    {t('Dashboard')}
                </NavItem>
                
                <NavItem href={route('courses.index')} active={route().current('courses.index')} icon={Icons.Course} expanded={open}>
                    {t('Courses')}
                </NavItem>

                {/* Role Based Links */}
                {(user.role === 'admin' || user.role === 'instructor') && (
                    <>
                        <div className={`mt-6 mb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${!open && 'hidden'}`}>
                            {t('Management')}
                        </div>
                        {user.role === 'admin' && (
                            <>
                                <NavItem href={route('admin.dashboard')} active={route().current('admin.dashboard')} icon={Icons.Admin} expanded={open}>
                                    {t('Admin Area')}
                                </NavItem>
                                <NavItem href={route('admin.users.index')} active={route().current('admin.users.index')} icon={Icons.Users} expanded={open}>
                                    {t('Manage Users')}
                                </NavItem>
                            </>
                        )}
                        <NavItem href={route('instructor.dashboard')} active={route().current('instructor.dashboard')} icon={Icons.User} expanded={open}>
                            {t('Instructor Hub')}
                        </NavItem>
                        <NavItem href={route('instructor.submissions.index')} active={route().current('instructor.submissions.index')} icon={Icons.Beaker} expanded={open}>
                            {t('Submissions')}
                        </NavItem>
                    </>
                )}
            </div>

            {/* User Profile / Footer */}
            <div className="border-t border-gray-800 bg-secondary-950/30">
                {/* Language Switcher */}
                <div className={`flex items-center py-2 ${open ? 'justify-end px-4 gap-2' : 'justify-center flex-col gap-1'}`}>
                     <Link href={route('language', 'en')} className={`text-[0.65rem] font-bold transition-colors ${locale === 'en' ? 'text-indigo-400' : 'text-gray-600 hover:text-gray-400'}`}>EN</Link>
                     <span className={`text-gray-700 text-[0.65rem] ${!open && 'hidden'}`}>|</span>
                     <Link href={route('language', 'fr')} className={`text-[0.65rem] font-bold transition-colors ${locale === 'fr' ? 'text-indigo-400' : 'text-gray-600 hover:text-gray-400'}`}>FR</Link>
                </div>
                <div className={`p-4 pt-2 flex items-center ${open ? 'gap-3' : 'justify-center'}`}>
                    <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm shrink-0">
                        {user.name.charAt(0)}
                    </div>
                    
                    {open && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {user.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {user.email}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
