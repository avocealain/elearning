<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSubmissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Check if user is enrolled in the course that contains this assignment
        $assignment = $this->route('assignment');
        // Assuming assignment -> lesson -> module -> course relationship
        // We need to load these relations if not loaded, or use a query.
        
        // Better to use a Policy, but here:
        $courseId = $assignment->lesson->module->course_id;
        
        return $this->user()->enrollments()->where('course_id', $courseId)->exists();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'content' => ['nullable', 'string'],
            'file' => ['nullable', 'file', 'max:10240', 'mimes:pdf,doc,docx,zip,txt'], // 10MB, restricted types
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (empty($this->content) && empty($this->file) && !$this->hasFile('file')) {
                $validator->errors()->add('content', 'Please provide text content or upload a file.');
            }
        });
    }
}
