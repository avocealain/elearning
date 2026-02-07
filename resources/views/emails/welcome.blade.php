<x-mail::message>
# Welcome to E-Learning, {{ $user->name }}!

We are excited to have you on board. Your email has been verified, and you now have full access to our courses.

<x-mail::button :url="route('dashboard')">
Go to Dashboard
</x-mail::button>

Happy Learning!<br>
{{ config('app.name') }}
</x-mail::message>
