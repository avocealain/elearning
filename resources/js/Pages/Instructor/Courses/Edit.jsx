import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import DangerButton from '@/Components/DangerButton';
import CurriculumManager from '@/Components/Instructor/CurriculumManager';

export default function Edit({ course }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: course.title || '',
        description: course.description || '',
        price: course.price || '',
        thumbnail: null,
        is_published: !!course.is_published,
    });

    const submit = (e) => {
        e.preventDefault();
        // Use post with _method: PUT for file upload support
        post(route('instructor.courses.update', course.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Course: {course.title}
                </h2>
            }
        >
            <Head title={`Edit ${course.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Course Details</h2>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Update your course information.
                            </p>
                        </header>

                        <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
                             <div>
                                <InputLabel htmlFor="title" value="Title" />
                                <TextInput
                                    id="title"
                                    className="mt-1 block w-full"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                    isFocused
                                    autoComplete="title"
                                />
                                <InputError className="mt-2" message={errors.title} />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea
                                    id="description"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="4"
                                />
                                <InputError className="mt-2" message={errors.description} />
                            </div>

                            <div>
                                <InputLabel htmlFor="price" value="Price ($)" />
                                <TextInput
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className="mt-1 block w-full"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.price} />
                            </div>

                            <div>
                                <InputLabel htmlFor="thumbnail" value="Cover Image" />
                                {course.thumbnail && (
                                    <div className="mb-2">
                                        <img src={course.thumbnail} alt="Current Cover" className="h-20 w-32 object-cover rounded" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    id="thumbnail"
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:text-gray-300"
                                    onChange={(e) => setData('thumbnail', e.target.files[0])}
                                />
                                <InputError className="mt-2" message={errors.thumbnail} />
                            </div>

                            <div className="block">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="is_published"
                                        checked={data.is_published}
                                        onChange={(e) => setData('is_published', e.target.checked)}
                                    />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Published</span>
                                </label>
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Save Changes</PrimaryButton>
                                <Link href={route('instructor.courses.index')} className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>

                    <CurriculumManager course={course} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
