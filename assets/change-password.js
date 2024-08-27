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
    
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match.');
            return;
        }

        // Use Fetch API to send a POST request to change the password

     var ajaxMessage = document.getElementsByClassName('edit-form-ajax-validation')[0];
      var errorMessage = document.getElementById('error-message');
  
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
          ajaxMessage.textContent = "The Profile has been updated";
          ajaxMessage.style.display = "block";
        })
        .catch((error) => {
          errorMessage.textContent = error;
          errorMessage.style.display = "block";
          console.log('Error:', error);
        });
    });