import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react'; // Link maybe not needed if avoiding reload
import ApplicationLogo from '@/Components/ApplicationLogo';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Dropdown from '@/Components/Dropdown';

export default function Learn({ course, auth }) {
    // Find first uncompleted lesson or just first lesson
    const getInitialLesson = () => {
         for (const module of course.modules) {
             for (const lesson of module.lessons) {
                 // Check if NOT completed (no progress entry or is_completed is false)
                 const progress = lesson.progress && lesson.progress.length > 0 ? lesson.progress[0] : null;
                 if (!progress || !progress.is_completed) {
                     return lesson;
                 }
             }
         }
         // If all completed, return first
         return course.modules[0]?.lessons[0] || null;
    };

    const [activeLesson, setActiveLesson] = useState(getInitialLesson());
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Track local completion state for immediate UI feedback before/while request validates
    // We can rely on router reload, but optimistic UI is nice. 
    // Since Inertia reloads props on success, let's rely on props.
    
    const { post, processing } = useForm();
    
    // Helper to check completion
    const isLessonCompleted = (lesson) => {
        const progress = lesson.progress && lesson.progress.find(p => p.user_id === auth.user.id);
        return progress ? !!progress.is_completed : false;
    };

    const toggleCompletion = () => {
        if (!activeLesson) return;
        const currentlyCompleted = isLessonCompleted(activeLesson);
        
        post(route('student.lessons.progress', activeLesson.id), {
            data: { is_completed: !currentlyCompleted },
            preserveScroll: true,
            // onSuccess: () => {
                // Determine next lesson if we just completed one?
                // Probably better to let user choose or have a "Next" button separate
            // }
        });
    };
    
    const moveToNextLesson = () => {
         // Logic to find next lesson
         let foundCurrent = false;
         for (const module of course.modules) {
             for (const lesson of module.lessons) {
                 if (foundCurrent) {
                     setActiveLesson(lesson);
                     return;
                 }
                 if (lesson.id === activeLesson.id) {
                     foundCurrent = true;
                 }
             }
         }
    };
    
    const moveToPrevLesson = () => {
         // Logic to find prev lesson
         let previous = null;
          for (const module of course.modules) {
             for (const lesson of module.lessons) {
                 if (lesson.id === activeLesson.id) {
                     if (previous) setActiveLesson(previous);
                     return;
                 }
                 previous = lesson;
             }
         }
    };

    const { post: postSubmission, data: submissionData, setData: setSubmissionData, processing: submissionProcessing, errors: submissionErrors, reset: resetSubmission } = useForm({
        content: '',
        file: null,
    });

    const submitAssignment = (e) => {
        e.preventDefault();
        if (!activeLesson.assignment) return;
        
        postSubmission(route('student.assignments.submit', activeLesson.assignment.id), {
            onSuccess: () => {
                resetSubmission();
                // Optionally refresh or show success explicitly if not handled by flash
            }
        });
    };

    const getGradeInfo = (assignment) => {
        if (!assignment || !assignment.submissions || assignment.submissions.length === 0) return null;
        // Assuming the backend returns only the current user's submissions nested, or we filter it.
        // The structure usually is assignment.submissions which might be ALL if not filtered, but standard setup filters or we do it here.
        // IMPORTANT: In DashboardService/Student/CourseController, we must ensure sensitive data isn't leaked.
        // Checking current code structure...
        const mySubmission = assignment.submissions.find(s => s.user_id === auth.user.id);
        return mySubmission;
    };

    // Video renderer helper
    const renderVideo = (url) => {
        if (!url) return null;
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
             let videoId = '';
             if (url.includes('youtu.be')) {
                 videoId = url.split('/').pop();
             } else {
                 videoId = new URLSearchParams(new URL(url).search).get('v');
             }
             return (
                 <div className="aspect-video w-full mb-6 rounded-lg overflow-hidden shadow-lg bg-black">
                     <iframe 
                         width="100%" 
                         height="100%" 
                         src={`https://www.youtube.com/embed/${videoId}`} 
                         title="YouTube video player" 
                         frameBorder="0" 
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                         allowFullScreen
                     ></iframe>
                 </div>
             );
        }
        // Fallback for simple video files (mp4)
        return (
            <div className="aspect-video w-full mb-6 rounded-lg overflow-hidden shadow-lg bg-black">
                <video controls className="w-full h-full">
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <Head title={`Learning: ${activeLesson?.title || 'Course'}`} />

            {/* Sidebar */}
            <div 
                className={`
                    fixed inset-y-0 left-0 index-20 z-20 w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <div className="h-full flex flex-col">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                         <Link href={route('dashboard')} className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Back to Dashboard
                         </Link>
                         <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                         </button>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="font-bold text-gray-900 dark:text-gray-100 text-lg leading-tight line-clamp-2">
                            {course.title}
                        </h2>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${course.progress || 0}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{course.progress || 0}% Complete</p>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {course.modules.map((module) => (
                            <div key={module.id} className="border-b border-gray-100 dark:border-gray-700">
                                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 font-medium text-sm text-gray-700 dark:text-gray-300">
                                    {module.title}
                                </div>
                                <div>
                                    {module.lessons.map((lesson) => (
                                        <button
                                            key={lesson.id}
                                            onClick={() => { setActiveLesson(lesson); if(window.innerWidth < 1024) setSidebarOpen(false); }}
                                            className={`w-full flex items-center px-4 py-3 text-sm text-left transition-colors border-l-4
                                                ${activeLesson && activeLesson.id === lesson.id 
                                                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-700 dark:text-indigo-300' 
                                                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750'}
                                            `}
                                        >
                                            <div className="flex-shrink-0 mr-3">
                                                {isLessonCompleted(lesson) ? (
                                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                ) : (
                                                    <svg className="w-5 h-5 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                )}
                                            </div>
                                            <span className="line-clamp-2">{lesson.title}</span>
                                            {lesson.type === 'assignment' && (
                                                <span className="ml-auto text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 px-1.5 py-0.5 rounded">Task</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Mobile Toggle */}
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="absolute top-4 left-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-md shadow lg:hidden"
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>

                <div className="flex-1 overflow-y-auto p-4 lg:p-10">
                    <div className="max-w-4xl mx-auto">
                        {!activeLesson ? (
                            <div className="text-center py-20">
                                <h3 className="text-xl text-gray-500">Select a lesson to start learning</h3>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                    {activeLesson.title}
                                </h1>

                                {renderVideo(activeLesson.video_url)}

                                {activeLesson.content && (
                                    <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
                                         {/* Note: In a real app, use a safe HTML renderer */}
                                         <div dangerouslySetInnerHTML={{ __html: activeLesson.content }} style={{ whiteSpace: 'pre-line' }} />
                                    </div>
                                
                                )}
                                
                                {activeLesson.type === 'assignment' && activeLesson.assignment && (
                                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6 border-l-4 border-indigo-500">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                            Assignment Task {activeLesson.assignment.total_points ? `(${activeLesson.assignment.total_points} Points)` : ''}
                                        </h3>
                                        {activeLesson.assignment.due_date && (
                                            <p className="text-sm text-red-500 mb-4">
                                                Due: {new Date(activeLesson.assignment.due_date).toLocaleString()}
                                            </p>
                                        )}

                                        {activeLesson.assignment.source_file_path && (
                                            <div className="mb-6">
                                                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Assignment Details (PDF):</h4>
                                                <a 
                                                    href={route('assignments.download', activeLesson.assignment.id)} 
                                                    className="inline-flex items-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 rounded-md font-semibold text-xs text-indigo-700 dark:text-indigo-300 uppercase tracking-widest hover:bg-indigo-100 dark:hover:bg-indigo-900 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                                    Download Instructions Provided by Instructor
                                                </a>
                                            </div>
                                        )}
                                        
                                        {!getGradeInfo(activeLesson.assignment) ? (
                                            <form onSubmit={submitAssignment} className="mt-4 space-y-4">
                                                <div>
                                                    <InputLabel htmlFor="submission_content" value="Your Answer" />
                                                    <textarea 
                                                        id="submission_content"
                                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                        rows="4"
                                                        value={submissionData.content}
                                                        onChange={(e) => setSubmissionData('content', e.target.value)}
                                                        placeholder="Type your answer here..."
                                                    />
                                                    <InputError message={submissionErrors.content} className="mt-2" />
                                                </div>
                                                
                                                <div>
                                                    <InputLabel htmlFor="submission_file" value="Upload File (Optional)" />
                                                    <input 
                                                        type="file" 
                                                        id="submission_file"
                                                        className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300"
                                                        onChange={(e) => setSubmissionData('file', e.target.files[0])}
                                                    />
                                                    <InputError message={submissionErrors.file} className="mt-2" />
                                                </div>

                                                <div className="flex justify-end">
                                                    <PrimaryButton disabled={submissionProcessing}>
                                                        Submit Assignment
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        ) : (
                                            <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-4">
                                                <h4 className="font-medium text-green-800 dark:text-green-300">Assignment Submitted</h4>
                                                <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                                                    Submitted on: {new Date(getGradeInfo(activeLesson.assignment).submitted_at).toLocaleString()}
                                                </p>
                                                {getGradeInfo(activeLesson.assignment).graded_at ? (
                                                     <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-800">
                                                        <p className="font-bold text-gray-900 dark:text-gray-100">
                                                            Grade: {getGradeInfo(activeLesson.assignment).grade} / {activeLesson.assignment.total_points}
                                                        </p>
                                                        {getGradeInfo(activeLesson.assignment).feedback && (
                                                            <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                                                <strong>Feedback from Instructor:</strong> {getGradeInfo(activeLesson.assignment).feedback}
                                                            </div>
                                                        )}
                                                     </div>
                                                ) : (
                                                     <p className="text-xs text-gray-500 mt-2 italic">Awaiting grading...</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Bottom Navigation */}
                                <div className="mt-8 flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                    <SecondaryButton onClick={moveToPrevLesson} disabled={!activeLesson || activeLesson === course.modules[0]?.lessons[0]}>
                                        Previous
                                    </SecondaryButton>
                                    
                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center cursor-pointer">
                                            <div className="relative">
                                                <input 
                                                    type="checkbox" 
                                                    className="sr-only" 
                                                    checked={isLessonCompleted(activeLesson)}
                                                    onChange={toggleCompletion}
                                                    disabled={processing}
                                                />
                                                <div className={`w-10 h-6 rounded-full shadow-inner transition-colors ${isLessonCompleted(activeLesson) ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                                <div className={`absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 left-1 transition-transform ${isLessonCompleted(activeLesson) ? 'translate-x-full bg-white' : ''}`}></div>
                                            </div>
                                            <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {isLessonCompleted(activeLesson) ? 'Completed' : 'Mark Complete'}
                                            </span>
                                        </label>
                                    </div>
                                    
                                    <PrimaryButton onClick={moveToNextLesson}>
                                        Next Lesson
                                    </PrimaryButton>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

