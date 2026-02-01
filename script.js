// script.js
// Address data object with EXACT coordinates
const addressData = {
    house: "Nitin Home, Plot No. 41",
    street: "Ghuru Ka Purwa, Juggaur",
    city: "Lucknow, Uttar Pradesh 226028",
    landmark: "V3HC+VQ Juggaur, Uttar Pradesh",
    coordinates: {
        lat: 26.879797764976423,
        lng: 81.07194023493491
    },
    plusCode: "V3HC+VQ",
    owner: {
        name: "Shambhu Nath Mishra",
        phone: "+919839417057"
    },
    emergency: {
        name: "Hari Om Mishra",
        phone: "+918601017500"
    },
    notes: "Welcome to Nitin Home! Located at Plot No. 41 in Ghuru Ka Purwa area of Juggaur. The house is easily accessible from the main road. For delivery, please use the exact coordinates provided above for precise navigation."
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

// Copy Address function
document.getElementById('copyAddressBtn').addEventListener('click', function () {
    const fullAddress = `Nitin Home, Plot No. 41, Ghuru Ka Purwa, Juggaur, Uttar Pradesh 226028`;

    copyToClipboard(fullAddress, 'copyNotification', 'Address copied to clipboard!');
});

// Copy Coordinates function
document.getElementById('copyCoordinatesBtn').addEventListener('click', function () {
    const coordinates = `${addressData.coordinates.lat}, ${addressData.coordinates.lng}`;

    copyToClipboard(coordinates, 'coordinatesNotification', 'Coordinates copied to clipboard!');
});

// Google Maps Button - Using EXACT coordinates
document.getElementById('googleMapsBtn').addEventListener('click', function () {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressData.coordinates.lat},${addressData.coordinates.lng}`;

    showNavigationNotification('Opening Google Maps with exact coordinates...');
    setTimeout(() => {
        window.open(mapsUrl, '_blank');
    }, 300);
});

// WhatsApp Share Button
document.getElementById('whatsappBtn').addEventListener('click', function () {
    const message = encodeURIComponent(`Nitin Home Location\nPlot No. 41, Ghuru Ka Purwa, Juggaur, Uttar Pradesh 226028\n\nGoogle Maps: https://www.google.com/maps/search/?api=1&query=${addressData.coordinates.lat},${addressData.coordinates.lng}\n\nCoordinates: ${addressData.coordinates.lat}, ${addressData.coordinates.lng}`);
    const whatsappUrl = `https://wa.me/?text=${message}`;

    showNavigationNotification('Opening WhatsApp to share location...');
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 300);
});

// Waze Navigation Button
document.getElementById('wazeBtn').addEventListener('click', function () {
    // Waze uses lat,lng format without spaces
    const wazeUrl = `https://waze.com/ul?ll=${addressData.coordinates.lat},${addressData.coordinates.lng}&navigate=yes`;

    showNavigationNotification('Opening Waze for navigation...');
    setTimeout(() => {
        window.open(wazeUrl, '_blank');
    }, 300);
});

// Universal copy function
function copyToClipboard(text, notificationId, message) {
    // Use the Clipboard API if available
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification(notificationId, message);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            copyFallback(text, notificationId, message);
        });
    } else {
        // Fallback for older browsers
        copyFallback(text, notificationId, message);
    }
}

// Fallback copy method
function copyFallback(text, notificationId, message) {
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
            showNotification(notificationId, message);
        }
    } catch (err) {
        console.error('Fallback copy failed: ', err);
        alert("Failed to copy. Please select and copy manually.");
    }

    document.body.removeChild(textArea);
}

// Show notification with custom message
function showNotification(notificationId, message) {
    const notification = document.getElementById(notificationId);
    if (message) {
        notification.querySelector('span').textContent = message;
    }
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Show navigation notification
function showNavigationNotification(message) {
    const notification = document.getElementById('navNotification');
    document.getElementById('navMessage').textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
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
    console.log(`QR Code for: ${currentUrl}`);
    console.log(`Exact Location: ${addressData.coordinates.lat}, ${addressData.coordinates.lng}`);
}

// Simulate QR code generation on page load
window.addEventListener('load', generateQRCode);

// Check if we're on a mobile device for better navigation
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Display coordinates in footer
function displayCoordinates() {
    const coordElement = document.querySelector('.coordinate-display span');
    if (coordElement) {
        coordElement.textContent = `${addressData.coordinates.lat.toFixed(7)}° N, ${addressData.coordinates.lng.toFixed(7)}° E`;
    }
}

// Call on page load
displayCoordinates();

// Create a static map image URL (optional - if you want to add an actual map image)
function getStaticMapUrl() {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${addressData.coordinates.lat},${addressData.coordinates.lng}&zoom=17&size=400x200&markers=color:red%7C${addressData.coordinates.lat},${addressData.coordinates.lng}&key=YOUR_API_KEY`;
    // Note: You would need a Google Maps API key for this
}