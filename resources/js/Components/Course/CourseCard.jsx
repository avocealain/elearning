import React, { useMemo } from 'react';
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';

export default function CourseCard({ course }) {
    const isFree = useMemo(() => parseFloat(course.price) === 0, [course.price]);
    
    // Fallback for instructor name
    const instructorName = course.instructor?.name || 'Unknown Instructor';
    const instructorInitial = instructorName.charAt(0).toUpperCase();

    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            {/* Thumbnail */}
            <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                {course.thumbnail ? (
                    <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-baseline mb-2">
                    <span className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs px-2.5 py-0.5 rounded-full uppercase font-semibold tracking-wide">
                        Course
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {isFree ? 'Free' : `$${course.price}`}
                    </span>
                </div>

                <h3 className="mt-2 text-xl font-semibold leading-tight text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <Link href={`/courses/${course.slug}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {course.title}
                    </Link>
                </h3>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">
                    {course.description}
                </p>

                {/* Footer / Instructor */}
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center">
                    <div className="flex-shrink-0">
                         <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-bold text-white dark:text-gray-200">
                            {instructorInitial}
                         </div>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                             {instructorName}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

CourseCard.propTypes = {
    course: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        thumbnail: PropTypes.string,
        instructor: PropTypes.shape({
            name: PropTypes.string,
        }),
    }).isRequired,
};
