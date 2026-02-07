import { Link, usePage } from '@inertiajs/react';

export default function LanguageSwitcher() {
    const { locale } = usePage().props;

    return (
        <div className="flex items-center space-x-2 text-sm">
            <Link
                href={route('language', 'en')}
                className={`transition-colors duration-200 ${
                    locale === 'en' 
                        ? 'font-bold text-indigo-600 dark:text-indigo-400' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
            >
                EN
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link
                href={route('language', 'fr')}
                className={`transition-colors duration-200 ${
                    locale === 'fr' 
                        ? 'font-bold text-indigo-600 dark:text-indigo-400' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
            >
                FR
            </Link>
        </div>
    );
}
