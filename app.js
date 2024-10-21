// Get the current date and time
function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString();
}

function addMinute() {
    const minutesSection = document.getElementById('minutes-section');

    // Create a container for each minute
    const minuteContainer = document.createElement('div');
    const timestamp = getCurrentDateTime();
    
    // Time display
    const timeLabel = document.createElement('label');
    timeLabel.innerText = `Time: ${timestamp}`;
    minuteContainer.appendChild(timeLabel);

    // Textbox for entering minute
    const minuteInput = document.createElement('textarea');
    minuteInput.placeholder = "Enter minutes here...";
    minuteContainer.appendChild(minuteInput);

    minutesSection.appendChild(minuteContainer);
}

function downloadMinutes() {
    const title = document.getElementById('meeting-title').value;
    const minutesSection = document.getElementById('minutes-section').children;
    let content = `Title: ${title}\n\nMinutes:\n`;

    for (let i = 0; i < minutesSection.length; i++) {
        const timeLabel = minutesSection[i].querySelector('label').innerText;
        const minuteText = minutesSection[i].querySelector('textarea').value;
        content += `${timeLabel}\nMinute: ${minuteText}\n\n`;
    }

    // Convert content to a Blob and download as a Word document
    const blob = new Blob([content], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title || 'MeetingMinutes'}.doc`;
    link.click();
}