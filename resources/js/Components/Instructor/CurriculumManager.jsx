import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';
import Modal from '@/Components/Modal';

export default function CurriculumManager({ course }) {
    const [addingModule, setAddingModule] = useState(false);
    const [editingModule, setEditingModule] = useState(null);
    const [addingLessonToModule, setAddingLessonToModule] = useState(null);
    const [editingLesson, setEditingLesson] = useState(null);

    // Module Forms
    const { data: moduleData, setData: setModuleData, post: postModule, put: putModule, processing: moduleProcessing, errors: moduleErrors, reset: resetModule } = useForm({
        title: '',
    });

    // Lesson Forms
    const { data: lessonData, setData: setLessonData, post: postLesson, put: putLesson, processing: lessonProcessing, errors: lessonErrors, reset: resetLesson } = useForm({
        title: '',
        type: 'video',
        content: '',
        video_url: '',
        is_free_preview: false,
        attachment: null,
        source_file: null,
        total_points: 100,
        due_date: '',
    });

    const createModule = (e) => {
        e.preventDefault();
        postModule(route('instructor.courses.modules.store', course.id), {
            onSuccess: () => {
                setAddingModule(false);
                resetModule();
            }
        });
    };

    const updateModule = (e) => {
        e.preventDefault();
        putModule(route('instructor.courses.modules.update', [course.id, editingModule.id]), {
            onSuccess: () => {
                setEditingModule(null);
                resetModule();
            }
        });
    };

    const deleteModule = (moduleId) => {
        if(confirm('Are you sure? This will delete all lessons in this module.')) {
            // Can't use useForm delete directly here easily dynamically, so use Inertia.delete or a dedicated form
            // Easier to use useForm if we had one ready, but helper form works
             // Workaround: create a separate Inertia request
             // In a perfect world, we'd use useForm for everything but for quick actions:
             // We can use the route() helper directly in a dedicated method or import {router} from @inertiajs/react
             // Let's import router
             import('@inertiajs/react').then(({ router }) => {
                 router.delete(route('instructor.courses.modules.destroy', [course.id, moduleId]));
             });
        }
    };

    const openCreateLesson = (moduleId) => {
        setAddingLessonToModule(moduleId);
        resetLesson();
    };

    const openEditLesson = (lesson) => {
        setEditingLesson(lesson);
        // Format date string safely for input type="datetime-local" if exists
        const formattedDate = lesson.assignment && lesson.assignment.due_date 
            ? new Date(lesson.assignment.due_date).toISOString().slice(0, 16) 
            : '';

        setLessonData({
            title: lesson.title,
            type: lesson.type,
            content: lesson.content || '',
            video_url: lesson.video_url || '',
            is_free_preview: !!lesson.is_free_preview,
            attachment: null,
            source_file: null,
            total_points: lesson.assignment ? lesson.assignment.total_points : 100,
            due_date: formattedDate,
        });
    };

    const createLesson = (e) => {
        e.preventDefault();
        postLesson(route('instructor.courses.modules.lessons.store', [course.id, addingLessonToModule]), {
            onSuccess: () => {
                setAddingLessonToModule(null);
                resetLesson();
            }
        });
    };

    const updateLesson = (e) => {
        e.preventDefault();
        
        if (lessonData.attachment || lessonData.source_file) {
            postLesson(route('instructor.courses.modules.lessons.update', [course.id, editingLesson.module_id, editingLesson.id]), {
                 transform: (data) => ({ ...data, _method: 'PUT' }),
                 onSuccess: () => {
                    setEditingLesson(null);
                    resetLesson();
                }
            })
        } else {
             putLesson(route('instructor.courses.modules.lessons.update', [course.id, editingLesson.module_id, editingLesson.id]), {
                onSuccess: () => {
                    setEditingLesson(null);
                    resetLesson();
                }
            });
        }
    };
    
    // Helper to delete lesson
    const deleteLesson = (moduleId, lessonId) => {
         if(confirm('Delete this lesson?')) {
             import('@inertiajs/react').then(({ router }) => {
                 router.delete(route('instructor.courses.modules.lessons.destroy', [course.id, moduleId, lessonId]));
             });
         }
    };

    return (
        <div className="mt-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Curriculum</h3>
                <PrimaryButton onClick={() => setAddingModule(true)}>
                    + Add Content Module
                </PrimaryButton>
            </div>

            <div className="space-y-6">
                {course.modules && course.modules.map((module) => (
                    <div key={module.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex justify-between items-center group">
                            <h4 className="font-medium text-gray-900 dark:text-gray-200">
                                {module.title}
                            </h4>
                            <div className="flex space-x-2">
                                <button 
                                    onClick={() => { setEditingModule(module); setModuleData({ title: module.title }); }}
                                    className="text-sm text-gray-500 hover:text-indigo-600"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => deleteModule(module.id)}
                                    className="text-sm text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className="p-4 bg-white dark:bg-gray-800 space-y-2">
                             {module.lessons && module.lessons.map((lesson) => (
                                 <div key={lesson.id} className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-750 rounded">
                                     <div className="flex items-center space-x-3">
                                         <span className="text-gray-400">
                                            {lesson.type === 'video' ? '🎥' : '📄'}
                                         </span>
                                         <span className="text-sm text-gray-700 dark:text-gray-300">{lesson.title}</span>
                                         {lesson.is_free_preview && <span className="text-xs bg-green-100 text-green-800 px-1.5 rounded">Free</span>}
                                     </div>
                                     <div className="flex space-x-2">
                                        <button 
                                            onClick={() => openEditLesson(lesson)}
                                            className="text-xs text-indigo-600 hover:text-indigo-800"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => deleteLesson(module.id, lesson.id)}
                                            className="text-xs text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                     </div>
                                 </div>
                             ))}
                             
                             <button 
                                onClick={() => openCreateLesson(module.id)}
                                className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600 dark:hover:text-gray-400 mt-2"
                             >
                                 + Add Lesson
                             </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create/Edit Module Modal */}
            <Modal show={addingModule || !!editingModule} onClose={() => { setAddingModule(false); setEditingModule(null); }}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {addingModule ? 'Add New Module' : 'Edit Module'}
                    </h2>
                    <form onSubmit={addingModule ? createModule : updateModule} className="mt-6">
                        <div>
                            <InputLabel htmlFor="module_title" value="Module Title" />
                            <TextInput
                                id="module_title"
                                className="mt-1 block w-full"
                                value={moduleData.title}
                                onChange={(e) => setModuleData('title', e.target.value)}
                                required
                                isFocused
                            />
                            <InputError message={moduleErrors.title} className="mt-2" />
                        </div>
                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={() => { setAddingModule(false); setEditingModule(null); }}>Cancel</SecondaryButton>
                            <PrimaryButton className="ms-3" disabled={moduleProcessing}>
                                {addingModule ? 'Create' : 'Save'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Create/Edit Lesson Modal */}
            <Modal show={addingLessonToModule !== null || !!editingLesson} onClose={() => { setAddingLessonToModule(null); setEditingLesson(null); }}>
                <div className="p-6 max-h-[90vh] overflow-y-auto">
                     <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {addingLessonToModule ? 'Add New Lesson' : 'Edit Lesson'}
                    </h2>
                    <form onSubmit={addingLessonToModule ? createLesson : updateLesson} className="mt-6 space-y-4">
                        <div>
                            <InputLabel htmlFor="lesson_title" value="Lesson Title" />
                            <TextInput
                                id="lesson_title"
                                className="mt-1 block w-full"
                                value={lessonData.title}
                                onChange={(e) => setLessonData('title', e.target.value)}
                                required
                            />
                            <InputError message={lessonErrors.title} className="mt-2" />
                        </div>

                         <div>
                            <InputLabel htmlFor="lesson_type" value="Lesson Type" />
                            <select
                                id="lesson_type"
                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={lessonData.type}
                                onChange={(e) => setLessonData('type', e.target.value)}
                            >
                                <option value="video">Video</option>
                                <option value="text">Article/Text</option>
                                <option value="assignment">Assignment / Quiz</option>
                            </select>
                            <InputError message={lessonErrors.type} className="mt-2" />
                        </div>

                        {lessonData.type === 'video' && (
                             <div>
                                <InputLabel htmlFor="video_url" value="Video URL (YouTube/Vimeo)" />
                                <TextInput
                                    id="video_url"
                                    className="mt-1 block w-full"
                                    value={lessonData.video_url}
                                    onChange={(e) => setLessonData('video_url', e.target.value)}
                                />
                                <InputError message={lessonErrors.video_url} className="mt-2" />
                            </div>
                        )}

                        {lessonData.type === 'assignment' && (
                            <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="total_points" value="Total Points" />
                                    <TextInput
                                        id="total_points"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={lessonData.total_points}
                                        onChange={(e) => setLessonData('total_points', e.target.value)}
                                        min="0"
                                    />
                                    <InputError message={lessonErrors.total_points} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="due_date" value="Due Date (Optional)" />
                                    <TextInput
                                        id="due_date"
                                        type="datetime-local"
                                        className="mt-1 block w-full"
                                        value={lessonData.due_date}
                                        onChange={(e) => setLessonData('due_date', e.target.value)}
                                    />
                                    <InputError message={lessonErrors.due_date} className="mt-2" />
                                </div>
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="source_file" value="Assignment Source PDF (Optional)" />
                                <input
                                    type="file"
                                    id="source_file"
                                    accept=".pdf"
                                    className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300"
                                    onChange={(e) => setLessonData('source_file', e.target.files[0])}
                                />
                                {editingLesson && editingLesson.assignment && editingLesson.assignment.source_file_path && (
                                    <p className="text-xs text-green-600 mt-1">Has existing PDF</p>
                                )}
                                <p className="text-xs text-gray-500">Upload a PDF for students to download.</p>
                                <InputError message={lessonErrors.source_file} className="mt-2" />
                            </div>
                            </div>
                        )}

                        <div>
                            <InputLabel htmlFor="content" value="Description / Text Content" />
                            <textarea
                                id="content"
                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                rows="4"
                                value={lessonData.content}
                                onChange={(e) => setLessonData('content', e.target.value)}
                            />
                            <InputError message={lessonErrors.content} className="mt-2" />
                        </div>

                        <div>
                             <InputLabel htmlFor="attachment" value="Downloadable Attachment (Optional)" />
                             <input
                                type="file"
                                id="attachment"
                                className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300"
                                onChange={(e) => setLessonData('attachment', e.target.files[0])}
                            />
                            {editingLesson && editingLesson.attachments && editingLesson.attachments.length > 0 && (
                                <p className="text-xs text-green-600 mt-1">Has attachment: {editingLesson.attachments[0].name}</p>
                            )}
                             <InputError message={lessonErrors.attachment} className="mt-2" />
                        </div>

                         <div className="block">
                            <label className="flex items-center">
                                <Checkbox
                                    name="is_free_preview"
                                    checked={lessonData.is_free_preview}
                                    onChange={(e) => setLessonData('is_free_preview', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Free Preview (Publicly accessible)</span>
                            </label>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={() => { setAddingLessonToModule(null); setEditingLesson(null); }}>Cancel</SecondaryButton>
                            <PrimaryButton className="ms-3" disabled={lessonProcessing}>
                                {addingLessonToModule ? 'Create Lesson' : 'Save Lesson'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
