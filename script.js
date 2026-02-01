// script.js
// Address data object (easy to edit later)
const addressData = {
    house: "Nitin Home, Plot No. 41",
    street: "Ghuru Ka Purwa, Juggaur",
    city: "Lucknow, Uttar Pradesh 226028",
    landmark: "V3HC+VQ Juggaur, Uttar Pradesh",
    coordinates: {
        lat: 26.8549,
        lng: 80.9441
    },
    plusCode: "V3HC+VQ Juggaur, Uttar Pradesh",
    owner: {
        name: "Shambhu Nath Mishra",
        phone: "+919839417057"
    },
    emergency: {
        name: "Hari Om Mishra",
        phone: "+918601017500"
    },
    notes: "Located in Ghuru Ka Purwa area of Juggaur. Look for Plot No. 41. Near local landmarks and accessible from main road."
};

// Initialize page with address data
document.addEventListener('DOMContentLoaded', function () {
    // Set address details
    document.getElementById('house').textContent = addressData.house;
    document.getElementById('street').textContent = addressData.street;
    document.getElementById('city').textContent = addressData.city;
    document.getElementById('landmark').textContent = addressData.landmark;

    // Set contact details
    document.getElementById('ownerName').textContent = addressData.owner.name;
    document.getElementById('emergencyName').textContent = addressData.emergency.name;

    // Set notes
    document.getElementById('notesText').textContent = addressData.notes;

    // Set up phone links
    document.querySelector('.call-btn').href = `tel:${addressData.owner.phone}`;
    document.querySelector('.sms-btn').href = `sms:${addressData.owner.phone}`;
    document.querySelector('.emergency-btn').href = `tel:${addressData.emergency.phone}`;
});

// Open Google Maps function
document.getElementById('openMapBtn').addEventListener('click', function () {
    // Using the exact coordinates for Juggaur, Lucknow
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressData.coordinates.lat},${addressData.coordinates.lng}`;
    window.open(mapsUrl, '_blank');
});

// Copy Address function
document.getElementById('copyAddressBtn').addEventListener('click', function () {
    const fullAddress = `Nitin Home, Plot No. 41, Ghuru Ka Purwa, Juggaur, Uttar Pradesh 226028. Plus Code: ${addressData.plusCode}`;

    // Use the Clipboard API if available
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullAddress).then(() => {
            showNotification('copyNotification');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            copyFallback(fullAddress, 'copyNotification');
        });
    } else {
        // Fallback for older browsers
        copyFallback(fullAddress, 'copyNotification');
    }
});

// Copy Plus Code function
document.getElementById('plusCodeBtn').addEventListener('click', function () {
    const plusCode = addressData.plusCode;

    // Use the Clipboard API if available
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(plusCode).then(() => {
            showNotification('plusCodeNotification');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            copyFallback(plusCode, 'plusCodeNotification');
        });
    } else {
        // Fallback for older browsers
        copyFallback(plusCode, 'plusCodeNotification');
    }
});

// Fallback copy method
function copyFallback(text, notificationId) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = 0;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification(notificationId);
        }
    } catch (err) {
        console.error('Fallback copy failed: ', err);
        alert("Failed to copy. Please select and copy manually.");
    }

    document.body.removeChild(textArea);
}

// Show notification
function showNotification(notificationId) {
    const notification = document.getElementById(notificationId);
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Future extensions placeholder functions
document.getElementById('adminLink').addEventListener('click', function (e) {
    e.preventDefault();
    alert("Admin panel for editing address will be available in future updates.");
});

document.getElementById('languageLink').addEventListener('click', function (e) {
    e.preventDefault();
    alert("Hindi language support will be added in future updates.");
});

// Generate QR code simulation
function generateQRCode() {
    const currentUrl = window.location.href;
    console.log(`QR Code would be generated for: ${currentUrl}`);
    console.log(`Address: ${addressData.house}, ${addressData.street}, ${addressData.city}`);
}

// Simulate QR code generation on page load
window.addEventListener('load', generateQRCode);

// Add geolocation feature for better accuracy
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log("User's location:", position.coords.latitude, position.coords.longitude);
    });
}