import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import Sidebar from '@/Components/Sidebar';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { props } = usePage();
    const { auth, flash } = props;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Close mobile menu on resize and auto-collapse sidebar on tablet
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
            // Auto collapse on tablet (md to lg)
            if (window.innerWidth >= 768 && window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else if (window.innerWidth >= 1024) {
                 // Optional: Auto expand on larger screens if desired, or leave user preference
                 // setSidebarOpen(true);
            }
        };
        
        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar (Desktop) */}
            <Sidebar user={user} open={sidebarOpen} setOpen={setSidebarOpen} />

            {/* Main Content Area */}
            <div className={`transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
                
                {/* Top Header */}
                <nav className="sticky top-0 z-20 w-full border-b border-gray-200 bg-surface/80 backdrop-blur-md">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            
                            {/* Mobile Menu Button */}
                            <div className="flex items-center md:hidden">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="inline-flex items-center justify-center rounded-md p-2 text-secondary-500 hover:bg-secondary-100 focus:outline-none"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!mobileMenuOpen ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={mobileMenuOpen ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                                <Link href="/" className="ml-2">
                                    <ApplicationLogo className="block h-8 w-auto fill-current text-primary" />
                                </Link>
                            </div>

                            <div className="hidden md:flex items-center text-sm font-medium text-secondary-500">
                                Welcome back, {user.name.split(' ')[0]}
                            </div>

                            <div className="flex items-center">
                                {/* Profile Dropdown */}
                                <div className="relative ms-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-full border border-gray-200 bg-white p-1 text-sm font-medium leading-4 text-secondary-700 transition duration-150 ease-in-out hover:text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                                >
                                                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')}>
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="md:hidden fixed inset-0 z-40 bg-gray-600 bg-opacity-75" onClick={() => setMobileMenuOpen(false)}></div>
                )}
                
                {/* Mobile Menu Drawer */}
                <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-secondary-900 overflow-y-auto transition-transform duration-300 transform md:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex items-center h-16 px-4 bg-secondary-950">
                         <ApplicationLogo className="w-8 h-8 text-primary fill-current" />
                         <span className="ml-2 text-lg font-bold text-white">LMS Mobile</span>
                         <button onClick={() => setMobileMenuOpen(false)} className="ml-auto text-gray-400">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                         </button>
                    </div>
                    {/* Re-use Sidebar content logic or simple links for mobile */}
                    <div className="py-4 space-y-1">
                        <Link href={route('dashboard')} className="block py-2 px-4 text-gray-300 hover:bg-gray-800 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                        <Link href={route('courses.index')} className="block py-2 px-4 text-gray-300 hover:bg-gray-800 hover:text-white" onClick={() => setMobileMenuOpen(false)}>All Courses</Link>
                         {(user.role === 'admin' || user.role === 'instructor') && (
                            <>
                                <div className="mt-4 px-4 text-xs font-semibold text-gray-500 uppercase">Management</div>
                                {user.role === 'admin' && (
                                    <>
                                        <Link href={route('admin.dashboard')} className="block py-2 px-4 text-gray-300 hover:bg-gray-800 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</Link>
                                        <Link href={route('admin.users.index')} className="block py-2 px-4 text-gray-300 hover:bg-gray-800 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Manage Users</Link>
                                    </>
                                )}
                                <Link href={route('instructor.dashboard')} className="block py-2 px-4 text-gray-300 hover:bg-gray-800 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Instructor</Link>
                            </>
                         )}
                         <div className="border-t border-gray-800 mt-4 pt-4">
                            <Link href={route('profile.edit')} className="block py-2 px-4 text-gray-300 hover:bg-gray-800 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                            <Link href={route('logout')} method="post" as="button" className="block w-full text-left py-2 px-4 text-gray-300 hover:bg-gray-800 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Log Out</Link>
                         </div>
                    </div>
                </div>

                {header && (
                    <header className="bg-surface shadow-sm">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main>
                    <div className="max-w-7xl mx-auto">
                        {flash && flash.success && (
                            <div className="mx-4 sm:mx-6 lg:mx-8 mt-4 p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                                <span className="font-medium">Success!</span> {flash.success}
                            </div>
                        )}
                        {flash && flash.error && (
                            <div className="mx-4 sm:mx-6 lg:mx-8 mt-4 p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                <span className="font-medium">Error!</span> {flash.error}
                            </div>
                        )}
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
}
