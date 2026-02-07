import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card from '@/Components/Card';
import StatCard from '@/Components/StatCard';
import Button from '@/Components/Button';
import useTranslation from '@/Hooks/useTranslation';

export default function Dashboard({ enrolledCourses, recentGrades, auth }) {
    const { t } = useTranslation();
    // Calculate simple stats from enrolledCourses
    const totalEnrolled = enrolledCourses ? enrolledCourses.length : 0;
    const completedCourses = enrolledCourses ? enrolledCourses.filter(c => c.progress === 100).length : 0;
    const avgProgress = totalEnrolled > 0 
        ? Math.round(enrolledCourses.reduce((acc, curr) => acc + (curr.progress || 0), 0) / totalEnrolled) 
        : 0;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-secondary-900">
                    {t('My Learning')}
                </h2>
            }
        >
            <Head title={t('Dashboard')} />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Student Stats Row */}
                    {totalEnrolled > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard 
                                title={t("Enrolled Courses")} 
                                value={totalEnrolled} 
                                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                            />
                            <StatCard 
                                title={t("Average Progress")} 
                                value={`${avgProgress}%`} 
                                trend={avgProgress > 50 ? t("On Track") : t("Keep Going")}
                                trendUp={avgProgress > 50}
                                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                            />
                            <StatCard 
                                title={t("Recent Grades")} 
                                value={recentGrades ? recentGrades.length : 0} 
                                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            />
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Course List (2/3 width) */}
                         <div className="lg:col-span-2 space-y-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{t("Continue Learning")}</h3>
                            {(!enrolledCourses || enrolledCourses.length === 0) ? (
                                <Card className="text-center py-12">
                                    <h3 className="text-lg font-medium mb-2 text-secondary-900">{t("You aren't enrolled in any courses yet.")}</h3>
                                    <p className="mb-6 text-secondary-500 max-w-md mx-auto">{t("Explore catalog desc")}</p>
                                    <div>
                                        <Link href="/courses">
                                            <Button variant="primary">{t("Browse Courses")}</Button>
                                        </Link>
                                    </div>
                                </Card>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {enrolledCourses.map((course) => (
                                        <Link key={course.id} href={route('student.courses.learn', course.slug)} className="block group h-full">
                                            <Card className="h-full transition-shadow duration-200 hover:shadow-md" noPadding>
                                                <div className="aspect-video w-full bg-secondary-100 border-b border-gray-100 flex items-center justify-center text-secondary-300">
                                                    {/* Logic for thumbnail would go here */}
                                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="text-lg font-bold text-secondary-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                                                        {course.title}
                                                    </h3>
                                                    <p className="text-sm text-secondary-500 mb-4">
                                                        {course.modules_count || 0} {t("Modules")} • {course.lessons_count || 0} {t("Lessons")}
                                                    </p>

                                                    {/* Progress Bar */}
                                                    <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                                                        <div 
                                                            className="bg-accent h-2 rounded-full transition-all duration-500" 
                                                            style={{ width: `${course.progress || 0}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="flex justify-between text-xs text-secondary-400">
                                                        <span>{course.progress || 0}% {t("Complete")}</span>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            )}
                         </div>

                        {/* Recent Feedback Sidebar (1/3 width) */}
                        <div className="space-y-6">
                             <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{t("Recent Grades")}</h3>
                             <div className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                                {recentGrades && recentGrades.length > 0 ? (
                                    recentGrades.map((grade) => (
                                        <div key={grade.id} className="p-4">
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{grade.assignment_title}</p>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                    {grade.grade}/{grade.total_points}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{grade.course_title}</p>
                                            {grade.feedback_preview && (
                                                <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{grade.feedback_preview}..."</p>
                                            )}
                                            <div className="mt-2 text-right">
                                                 {/* We don't have a direct link to the assignment anchor yet, but could serve the learn page */}
                                                 {/* <Link href="#" className="text-xs text-indigo-600 hover:text-indigo-900">View Details</Link> */}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                                        {t("No recent graded assignments.")}
                                    </div>
                                )}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    ); // end
}
