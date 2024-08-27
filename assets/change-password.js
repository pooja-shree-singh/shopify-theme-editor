// Get the modal
var modal = document.getElementById("changePasswordModal");


// Get the button that opens the modal
var openModalLink = document.getElementById("resetPassword");
// Get the <span> element that closes the modal
var closeButton = document.getElementsByClassName("close")[0];

// When the user clicks the link, open the modal
openModalLink.onclick = function(event) {
    event.preventDefault(); // Prevent default link behavior
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
    closeButton.onclick = function() {
        modal.style.display = "none";
    }

// When the user clicks on <span> (x), close the modal
var spanClick = document.querySelectorAll('span.close');

// Add click event listener to each button
  spanClick.forEach(function(item) {
    item.addEventListener('click', function(event) {
      modal.style.display = "none";
    });
  });

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
       modal.style.display = "none";
  }
}


document.getElementById('change-password-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const customerEmail = document.getElementById('customerEmail').value;
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

       // Validate form fields
          let isValid = true;
          let errorMessage = '';
      
        // Validate FirstName
        if (currentPassword.trim() === '') {
          errorMessage += 'Current Password is required.<br>';
          isValid = false;
        }
        // Validate LastName
        if (newPassword.trim() === '') {
          errorMessage += 'New Password is required.<br>';
          isValid = false;
        }
      
        // Validate Phone
        if (confirmPassword.trim() === '') {
          errorMessage += 'Confirm Password is required.<br>';
          isValid = false;
        }
    
        if (newPassword !== confirmPassword) {
            errorMessage += 'New Passwords do not match.<br>';
            isValid = false;
        }

        // Use Fetch API to send a POST request to change the password

     var ajaxMessage = document.getElementsByClassName('password-form-ajax-validation')[0];
      ajaxMessage.style.display = "none";
  
      if(isValid) {
        fetch('http://localhost:3000/change-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                  customerEmail: customerEmail,
                  current_password: currentPassword,
                  new_password: newPassword,
                  confirm_password: confirmPassword,
              }),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            ajaxMessage.textContent = "Password has been updated.";
            ajaxMessage.style.display = "block";
          })
          .catch((error) => {
            $('#password-form-error-message').html(error);
            console.log('Error:', error);
          });
      }else{
        $('#password-form-error-message').html(errorMessage); // Display validation errors
      }
    });