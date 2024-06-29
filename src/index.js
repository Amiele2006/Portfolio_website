    // 
    document.getElementById('button-1').addEventListener('click',function(){
        const url= "https://github.com/Amiele2006";

        try {
            window.location.href=url;
        } catch (error) {
            alert('Cannot connect due to:' + error.message)
        }
    })

    document.getElementById('button-2').addEventListener('click',function(){
        const url= "https://github.com/Amiele2006";

        try {
            window.location.href=url;
        } catch (error) {
            alert('Cannot connect due to:' + error.message)
        }
    })

    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting
    
        // Gather form data
        const formData = {
            name: document.getElementById('input-1').value,
            email: document.getElementById('input-2').value,
            message: document.getElementById('input-3').value
        };
    
        
        // Send POST request to backend
        fetch('http://localhost:3000/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Message sent successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error sending your message.');
        });
    });
    