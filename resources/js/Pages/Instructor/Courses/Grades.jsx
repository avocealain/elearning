import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Grades({ course, assignments, students }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Gradebook: {course.title}
                    </h2>
                    <Link
                        href={route('instructor.courses.index')}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                    >
                        Back to Courses
                    </Link>
                </div>
            }
        >
            <Head title={`Grades - ${course.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-x-auto">
                            
                            {assignments.length === 0 ? (
                                <div className="text-center py-10">
                                    <p className="text-gray-500">No assignments found for this course.</p>
                                </div>
                            ) : (
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider sticky left-0 bg-gray-50 dark:bg-gray-700 z-10 border-r dark:border-gray-600">
                                                Student
                                            </th>
                                            {assignments.map(assignment => (
                                                <th key={assignment.id} className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-[100px]">
                                                    <div className="flex flex-col">
                                                        <span className="truncate max-w-[150px]" title={assignment.lesson.title}>
                                                            {assignment.lesson.title}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400">
                                                            (Max: {assignment.total_points})
                                                        </span>
                                                    </div>
                                                </th>
                                            ))}
                                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Average
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {students.length === 0 ? (
                                            <tr>
                                                <td colSpan={assignments.length + 2} className="px-6 py-4 text-center text-gray-500">
                                                    No students enrolled.
                                                </td>
                                            </tr>
                                        ) : (
                                            students.map((entry) => {
                                                // Calculate average
                                                let totalScore = 0;
                                                let maxTotal = 0;
                                                assignments.forEach(a => {
                                                    if (entry.grades[a.id] && entry.grades[a.id].grade !== null) {
                                                        totalScore += parseFloat(entry.grades[a.id].grade);
                                                        maxTotal += parseFloat(a.total_points);
                                                    }
                                                });
                                                const average = maxTotal > 0 ? Math.round((totalScore / maxTotal) * 100) : 0;

                                                return (
                                                    <tr key={entry.user.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 sticky left-0 bg-white dark:bg-gray-800 z-10 border-r dark:border-gray-600">
                                                            <div className="flex flex-col">
                                                                <span>{entry.user.name}</span>
                                                                <span className="text-xs text-gray-500 font-normal">{entry.user.email}</span>
                                                            </div>
                                                        </td>
                                                        {assignments.map(assignment => {
                                                            const gradeInfo = entry.grades[assignment.id];
                                                            return (
                                                                <td key={assignment.id} className="px-4 py-4 whitespace-nowrap text-center text-sm">
                                                                    {gradeInfo ? (
                                                                        gradeInfo.is_graded ? (
                                                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                                                                ${gradeInfo.grade >= assignment.total_points * 0.7 ? 'bg-green-100 text-green-800' : 
                                                                                  gradeInfo.grade >= assignment.total_points * 0.5 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}
                                                                            `}>
                                                                                {gradeInfo.grade}
                                                                            </span>
                                                                        ) : (
                                                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                                                                                Pending
                                                                            </span>
                                                                        )
                                                                    ) : (
                                                                        <span className="text-gray-300">-</span>
                                                                    )}
                                                                </td>
                                                            );
                                                        })}
                                                        <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-bold text-gray-700 dark:text-gray-300">
                                                            {average}%
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
