window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// booking js

document.getElementById('room-booking-form').addEventListener('submit', function(event) {
    if (!document.getElementById('check-in').value || !document.getElementById('nights').value) {
        alert('Please fill in all fields.');
        event.preventDefault(); // Prevent form from submitting
    }
});

const roomType = document.getElementById('room-type').value;
const checkInDate = document.getElementById('check-in').value;
const nights = document.getElementById('nights').value;

const roomId = getRoomIdByType(roomType); // You need to implement this function based on your logic to get room ID by type

hotelContract.methods.bookRoom(roomId, nights, roomType).send({
    from: web3.eth.defaultAccount,
    value: web3.utils.toWei((roomPrice * nights).toString(), 'ether')
}).then(receipt => {
    console.log('Room booked', receipt);
}).catch(error => {
    console.error('Error booking room', error);
});


document.getElementById('hall-booking-form').addEventListener('submit', function(event) {
    if (!document.getElementById('date').value || !document.getElementById('duration').value) {
        alert('Please fill in all fields.');
        event.preventDefault();
    }
});

document.getElementById('buffet-booking-form').addEventListener('submit', function(event) {
    if (!document.getElementById('buffet-date').value || !document.getElementById('attendees').value) {
        alert('Please fill in all fields.');
        event.preventDefault();
    }
});

// dashboard js

function requestRoomService() {
    alert('Room service requested successfully!');
}

function requestMaintenance() {
    alert('Maintenance request submitted successfully!');
}




// admin js

function cancelBooking(id) {
    alert('Canceling booking ID: ' + id);
    // Implement actual cancellation logic here
}

function resolveMaintenance(requestId) {
    alert('Resolving maintenance request ID: ' + requestId);
    // Implement actual resolve logic here
}

// contact js

function validateContactForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return false; // Prevent form from submitting
    }
    alert('Thank you for your message. We will get back to you soon!');
    return true; // Proceed with form submission
}
