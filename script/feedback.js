function openMessageBox() {
    document.getElementById('messageBox').style.display = 'block';
    document.getElementById('thanksMessage').style.display = 'none';
}

function sendMessage() {
    const userEmail = document.getElementById('userEmail').value;
    const userContact = document.getElementById('userContact').value;
    const userMessage = document.getElementById('userMessage').value;
    const formData = {
        email: userEmail,
        contact: userContact,
        message: userMessage
    };

    fetch('https://feedback-production-76e1.up.railway.app/api/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if required
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Do something after successful post, like displaying a success message
             console.log(response.status);
             document.getElementById('messageBox').style.display = 'none';
             document.getElementById('thanksMessage').style.display = 'block';
        })
        .catch(error => {
            // Handle errors
            console.error('There was an error with the POST request:', error);
            // Display an error message to the user, or retry the request, etc.
        });
}
