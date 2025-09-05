document.addEventListener('DOMContentLoaded', function() {
    // This function runs when the page is fully loaded.

    // Check if we are on the signup page by looking for the signup form.
    const signupForm = document.getElementById('signupForm');

    if (signupForm) {
        // If the signup form exists, add an event listener for submission.
        signupForm.addEventListener('submit', function(event) {
            // Prevent the form from submitting the default way.
            event.preventDefault();

            // Get the values from the password fields.
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const passwordError = document.getElementById('password-error');

            // --- Validation Logic ---

            // 1. Check if the password is long enough.
            if (password.length < 6) {
                passwordError.textContent = 'Password must be at least 6 characters long.';
                return; // Stop the function if it's too short.
            }

            // 2. Check if passwords match.
            if (password !== confirmPassword) {
                passwordError.textContent = 'Passwords do not match.';
                return; // Stop the function if they don't match.
            }


            // If all checks pass, clear any previous error messages.
            passwordError.textContent = '';

            // Here you would typically send the form data to a server.
            // For this example, we'll just log it to the console.
            console.log('Form is valid and ready to be submitted!');
            console.log('Full Name:', document.getElementById('fullname').value);
            console.log('Email:', document.getElementById('email').value);

            // You could optionally redirect the user or show a success message.
            alert('Sign up successful! (Check the console for details)');
            // window.location.href = 'login.html'; // Example of redirecting
        });
    }

});
