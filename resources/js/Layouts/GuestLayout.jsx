import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import useTranslation from '@/Hooks/useTranslation';
import LanguageSwitcher from '@/Components/LanguageSwitcher';

export default function GuestLayout({ children }) {
    const { t } = useTranslation();

    return (
        <div className="flex min-h-screen flex-col items-center bg-background pt-6 sm:justify-center sm:pt-0 relative">
             <div className="absolute top-4 right-4">
                <LanguageSwitcher />
            </div>
            <div className="mb-6 text-center">
                <Link href="/" className="flex flex-col items-center">
                    <ApplicationLogo className="h-20 w-20 fill-current text-primary" />
                    <span className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">E-Learning</span>
                    <span className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 font-serif italic text-center max-w-xs">
                        "{t('Motto')}"
                    </span>
                </Link>
            </div>

            <div className="w-full overflow-hidden bg-surface px-6 py-8 shadow-sm border border-gray-100 sm:max-w-md sm:rounded-xl">
                {children}
            </div>
        </div>
    );
}
