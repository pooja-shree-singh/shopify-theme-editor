 document.getElementById('change-password-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert('New passwords do not match.');
            return;
        }

        // Use Fetch API to send a POST request to change the password
        fetch('/account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword,
                confirm_password: confirmPassword,
            }),
        })
        .then(response => {
            if (response.ok) {
                alert('Password changed successfully.');
            } else {
                alert('Failed to change password. Please try again.');
            }
        })
        .catch(error => console.error('Error:', error));
    });