// Get the current date and time
function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString();
}

function addSubtopic(parentContainer) {
    // Create a container for the subtopic
    const subtopicContainer = document.createElement('div');
    
    // Input for the subtopic
    const subtopicInput = document.createElement('input');
    subtopicInput.type = "text";
    subtopicInput.placeholder = "Enter subtopic here...";
    subtopicContainer.appendChild(subtopicInput);
    
    parentContainer.appendChild(subtopicContainer);

    // Focus on the subtopic input
    subtopicInput.focus();
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
    
    // Add keydown event listener for the "Enter" key
    minuteInput.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();  // Prevent adding a new line
            addMinute();  // Add a new minute input box
        }
    });
    minuteContainer.appendChild(minuteInput);

    // Button to add subtopic
    const addSubtopicButton = document.createElement('button');
    addSubtopicButton.innerText = "Add Subtopic";
    addSubtopicButton.addEventListener('click', function() {
        addSubtopic(minuteContainer);
    });
    minuteContainer.appendChild(addSubtopicButton);

    minutesSection.appendChild(minuteContainer);

    // Automatically focus on the new text area
    minuteInput.focus();
}

function downloadMinutes() {
    const title = document.getElementById('meeting-title').value;
    const minutesSection = document.getElementById('minutes-section').children;
    let content = `Title: ${title}\n\nMinutes:\n`;

    for (let i = 0; i < minutesSection.length; i++) {
        const timeLabel = minutesSection[i].querySelector('label').innerText;
        const minuteText = minutesSection[i].querySelector('textarea').value;
        content += `${timeLabel}\nMinute: ${minuteText}\n`;

        // Gather all subtopics
        const subtopics = minutesSection[i].querySelectorAll('input[type="text"]');
        subtopics.forEach(subtopic => {
            content += `Subtopic: ${subtopic.value}\n`;
        });
        content += '\n';
    }

    // Convert content to a Blob and download as a Word document
    const blob = new Blob([content], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title || 'MeetingMinutes'}.doc`;
    link.click();
}

// Automatically add the first minute input field when the page loads
document.addEventListener('DOMContentLoaded', () => {
    addMinute();  // Add the initial minute field
});
