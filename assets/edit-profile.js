// Get the modal
var modal = document.getElementById("editProfileModal");


// Get the button that opens the modal
var buttons = document.querySelectorAll('.editProfileButton');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
var spanClick = document.querySelectorAll('span.close');

// Add click event listener to each button
  spanClick.forEach(function(item) {
    item.addEventListener('click', function(event) {
      //Close all the modals
      closeModal();
      QRmodal.style.display = "none";
    });
  });


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

// Handle form submission
document.getElementById('custom-account-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Clear previous messages
    $('#error-message').html('');
    $('#success-message').hide();

  // Collect form data
    let formData = {
      customerID: $('#customerID').val().trim(),
      FirstName: $('#FirstName').val().trim(),
      LastName: $('#LastName').val().trim(),
      phone: $('#Phone').val().trim()
    };
  
  // Validate form fields
    let isValid = true;
    let errorMessage = '';

  // Validate FirstName
  if ($('#FirstName').val().trim() === '') {
    errorMessage += 'FirstName is required.<br>';
    isValid = false;
  }
  // Validate LastName
  if ($('#LastName').val().trim() === '') {
    errorMessage += 'LastName is required.<br>';
    isValid = false;
  }

  // Validate Phone
  if ($('#Phone').val().trim() === '') {
    errorMessage += 'Phone is required.<br>';
    isValid = false;
  }

  var ajaxMessage = document.getElementsByClassName('edit-form-ajax-validation')[0];

  console.log(errorMessage);
  console.log(ajaxMessage);
  
  if(isValid) {
    // Make an AJAX request to update the order metafield
    fetch('http://localhost:3000/edit-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
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
  }else{
    $('#error-message').html(errorMessage); // Display validation errors
  }
});