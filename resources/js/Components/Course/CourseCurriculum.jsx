import React from 'react';

export default function CourseCurriculum({ modules, isEnrolled }) {
    if (!modules || modules.length === 0) {
        return (
            <div className="text-center py-10 bg-gray-50 dark:bg-gray-700/50 rounded-lg dashed border border-gray-200 dark:border-gray-600">
                <p className="text-gray-500 dark:text-gray-400 font-medium">No curriculum content available yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Curriculum</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {modules.reduce((acc, m) => acc + (m.lessons ? m.lessons.length : 0), 0)} Lessons
                </span>
            </div>
            
            {modules.map((module) => (
                <div key={module.id} className="bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{module.title}</h3>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                           {module.lessons ? module.lessons.length : 0} Lessons
                        </span>
                    </div>
                    <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                        {module.lessons && module.lessons.map((lesson) => (
                            <li key={lesson.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition flex items-center justify-between group">
                                <div className="flex items-center min-w-0">
                                    <span className="flex-shrink-0 mr-4 text-gray-400 group-hover:text-indigo-500 transition-colors">
                                        {lesson.type === 'video' ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                        )}
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                            {lesson.title}
                                        </span>
                                        {lesson.is_free_preview && !isEnrolled && (
                                            <span className="text-xs text-green-600 font-semibold mt-0.5">Free Preview</span>
                                        )}
                                    </div>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                    {lesson.is_free_preview || isEnrolled ? (
                                        <span className="text-indigo-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                            View
                                        </span>
                                    ) : (
                                        <svg className="w-4 h-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
