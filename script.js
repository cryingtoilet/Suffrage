// Sample data for the timeline
const timelineData = [
    { date: '1903', event: 'Women\'s Social and Political Union (WSPU)<br> founded by Emmeline Pankhurst.', image: 'Images/1903.png' },
    { date: '1905', event: 'The WSPU organized its first public protest<br> in London.', image: 'Images/1905.png' },
    { date: '1906', event: 'The first bill that granted women the<br> right to vote was introduced by<br> John Bamford Slack.', image: 'Images/1906.png' },
    { date: '1909', event: 'Suffragettes imprisoned engaged in<br> hunger strikes which drawed attention to<br> the suffragettes.', image: 'Images/1909.png' },
    { date: '1913', event: 'Emily Wilding Davison died after being<br> struck by King George V\'s horse', image: 'Images/1913.png' },
    { date: '1913', event: 'The government passed the Prisoners<br> (Temporary Discharge for Ill Health) Act', image: 'Images/1913two.png' },
    { date: '1917', event: 'The Women\'s Party was made by Christabel Pankhurst<br> and Emmeline Pethick-Lawrence as a political party<br> dedicated to women\'s suffrage.', image: 'Images/1917.png' },
    { date: '1918', event: 'Representation of the People Act 1918 granted<br> some women the right to vote.', image: 'Images/1918.png' },
    { date: '1928', event: 'Equal Franchise Act 1928 grants all women<br> over 21 the right to vote.', image: 'Images/1928.png' },
    // Add more events as needed
];

// Function to populate the timeline
function populateTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    timelineData.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${item.date}</h3><p>${item.event}</p>`;
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.backgroundImage = `url(${item.image})`; // Set background image
        div.prepend(dot); // Add dot before text
        timelineContainer.appendChild(div);
    });
}

// Function to prevent text selection
function preventTextSelection(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
}

// Initialize the site content
document.addEventListener('DOMContentLoaded', () => {
    populateTimeline();

    // Enable smooth scrolling by dragging anywhere on the screen
    const body = document.querySelector('body');
    const timeline = document.querySelector('#timeline');
    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let lastX = 0;
    let frame;

    body.addEventListener('mousedown', (e) => {
        isDown = true;
        body.classList.add('dragging');
        startX = e.pageX;
        scrollLeft = timeline.scrollLeft;
        lastX = e.pageX;
        velocity = 0;
        cancelAnimationFrame(frame);
        body.addEventListener('selectstart', preventTextSelection);
    });

    body.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false;
            body.classList.remove('dragging');
            body.removeEventListener('selectstart', preventTextSelection);
            applyInertia();
        }
    });

    body.addEventListener('mouseup', () => {
        if (isDown) {
            isDown = false;
            body.classList.remove('dragging');
            body.removeEventListener('selectstart', preventTextSelection);
            applyInertia();
        }
    });

    body.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startX) * 0.5; // Adjust the scroll speed
        timeline.scrollLeft = scrollLeft - walk;
        velocity = x - lastX;
        lastX = x;
    });

    function applyInertia() {
        if (Math.abs(velocity) > 0.5) {
            timeline.scrollLeft -= velocity;
            velocity *= 0.95; // Adjust friction for deceleration
            frame = requestAnimationFrame(applyInertia);
        } else {
            cancelAnimationFrame(frame);
        }
    }
});