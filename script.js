function calculate() {
    const harvesterName = document.getElementById('harvesterName').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const hourRate = parseFloat(document.getElementById('hourRate').value);
    const farmerName = document.getElementById('farmerName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const village = document.getElementById('village').value;

    // Calculate total time
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    let timeDiff = (end - start) / (1000 * 60 ); // convert milliseconds to minutes
    if (timeDiff < 0) {
        end.setDate(end.getDate() + 1);
        timeDiff = (end - start) / (1000 * 60);
    }
    const rateperminute=hourRate/60;

    // Calculate total amount
    const totalAmount = (timeDiff * rateperminute).toFixed(2);
        // Display output
    document.getElementById('outputName').textContent = `Farmer Name: ${farmerName}`;
    document.getElementById('outputPhone').textContent = `Phone Number: ${phoneNumber}`;
    document.getElementById('outputAmount').textContent = `Total Amount: ₹${totalAmount}`;
    document.getElementById('outputTime').textContent = `Total Time: ${timeDiff.toFixed(2)} minutes`;
    

    // Show the bill
    document.getElementById('bill').style.display = 'block';
}

// Function to save as image (using html2canvas library)
function saveAsImage() {
    html2canvas(document.querySelector('#bill')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'bill.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

// Function to share on WhatsApp
function shareToWhatsApp() {
    const farmerName = document.getElementById('outputName').textContent;
    const phoneNumber = document.getElementById('outputPhone').textContent;
    const totalAmount = document.getElementById('outputAmount').textContent;
    const totalTime = document.getElementById('outputTime').textContent;
    
    const message = `${farmerName}\n${phoneNumber}\n${totalAmount}\n${totalTime}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
}
