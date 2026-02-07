import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react'; // Add router import
import { useState } from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Index({ submissions, filters }) {
    const [gradingSubmission, setGradingSubmission] = useState(null);
    const { data, setData, patch, processing, reset, errors } = useForm({
        grade: '',
        feedback: '',
    });

    const openGradingModal = (submission) => {
        setGradingSubmission(submission);
        setData({
            grade: submission.grade || '',
            feedback: submission.feedback || '',
        });
    };

    const closeGradingModal = () => {
        setGradingSubmission(null);
        reset();
    };

    const submitGrade = (e) => {
        e.preventDefault();
        patch(route('instructor.submissions.update', gradingSubmission.id), {
            onSuccess: () => closeGradingModal(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Assignment Submissions
                </h2>
            }
        >
            <Head title="Submissions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                            <Link
                                href={route('instructor.submissions.index')}
                                className={`px-4 py-2 border-b-2 font-medium text-sm ${
                                    !filters.filter 
                                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                            >
                                Pending Grading
                            </Link>
                            <Link
                                href={route('instructor.submissions.index', { filter: 'graded' })}
                                className={`px-4 py-2 border-b-2 font-medium text-sm ${
                                    filters.filter === 'graded' 
                                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                            >
                                Graded History
                            </Link>
                        </div>

                        {/* Mobile Responsive Table Wrapper */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Course / Lesson</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Submitted</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Score</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {submissions.data.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                                No submissions found.
                                            </td>
                                        </tr>
                                    ) : (
                                        submissions.data.map((submission) => (
                                            <tr key={submission.id}>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        {submission.assignment.lesson.module.course.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {submission.assignment.lesson.title}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 dark:text-gray-100">{submission.user.name}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">{submission.user.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(submission.submitted_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {submission.graded_at ? (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {submission.grade} / {submission.assignment.total_points}
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                            Pending
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => openGradingModal(submission)}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                    >
                                                        {submission.graded_at ? 'Edit Grade' : 'Grade'}
                                                    </button>
                                                    {submission.file_path && (
                                                         <a 
                                                            href={route('submissions.download', submission.id)} 
                                                            className="ml-4 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Download File
                                                        </a>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                         {submissions.links && submissions.links.length > 3 && (
                            <div className="mt-6 flex flex-wrap">
                                {submissions.links.map((link, k) => (
                                    link.url ? (
                                        <Link
                                            key={k}
                                            href={link.url}
                                            className={`px-4 py-2 border rounded-md mr-1 ${
                                                link.active 
                                                    ? 'bg-indigo-600 text-white border-indigo-600' 
                                                    : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            key={k}
                                            className="px-4 py-2 border border-gray-300 rounded-md mr-1 bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        ></span>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Grading Modal */}
            <Modal show={gradingSubmission !== null} onClose={closeGradingModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Grade Submission
                    </h2>

                    {gradingSubmission && (
                        <div className="mt-4 space-y-4">
                            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md text-sm">
                                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Student Response:</p>
                                {gradingSubmission.content ? (
                                    <p className="whitespace-pre-wrap dark:text-gray-400">{gradingSubmission.content}</p>
                                ) : (
                                    <p className="italic text-gray-500">No text content submitted.</p>
                                )}
                                {gradingSubmission.file_path && (
                                    <div className="mt-2 text-indigo-600">
                                         Attachment: <a href={route('submissions.download', gradingSubmission.id)} target="_blank" className="underline">Download File</a>
                                    </div>
                                )}
                            </div>
                            
                            <form onSubmit={submitGrade}>
                                <div>
                                    <InputLabel htmlFor="grade" value={`Score (Max: ${gradingSubmission.assignment.total_points})`} />
                                    <TextInput
                                        id="grade"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.grade}
                                        onChange={(e) => setData('grade', e.target.value)}
                                        max={gradingSubmission.assignment.total_points}
                                        required
                                    />
                                    {errors.grade && <div className="text-red-500 text-sm mt-1">{errors.grade}</div>}
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="feedback" value="Feedback (Optional)" />
                                    <textarea
                                        id="feedback"
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="4"
                                        value={data.feedback}
                                        onChange={(e) => setData('feedback', e.target.value)}
                                    ></textarea>
                                    {errors.feedback && <div className="text-red-500 text-sm mt-1">{errors.feedback}</div>}
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <SecondaryButton onClick={closeGradingModal}>
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton className="ml-3" disabled={processing}>
                                        Save Grade
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
