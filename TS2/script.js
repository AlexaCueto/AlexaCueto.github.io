const boxes = [
    document.getElementById("box1"),
    document.getElementById("box2")
];

let activeBoxIndex = 0;
let previousButton = null;
let lastClickTime = 0; // Track last click time

const colors = {
    "Monday": { bg: "#88c1d3", border: "#296475" },
    "Tuesday": { bg: "#e3a9af", border: "#84454b" },
    "Wednesday": { bg: "#faeab6", border: "#ae943d" },
    "Thursday": { bg: "#abfae2", border: "#1f926f" },
    "Friday": { bg: "#a8acd8", border: "#3a3f79" },
    "Saturday": { bg: "#d7eacb", border: "#3a671f" },
    "Sunday": { bg: "#c7696c", border: "#6d2a2d" }
};

function colorBox(day) {
    const now = performance.now();
    let timeDiff = now - lastClickTime;
    lastClickTime = now; // Update last click time

    let animationSpeed = Math.max(300, Math.min(1000, timeDiff)); // Control speed

    const container = document.querySelector(".calendar-container");
    const containerRect = container.getBoundingClientRect();

    // Calculate stopping position (middle of container)
    const boxFinalY = containerRect.top + (containerRect.height / 2) - 100; // Middle, slightly adjusted
    const boxStartY = containerRect.top + 20; // Start near the top

    let movingUpBox = boxes[activeBoxIndex]; // Box that moves up
    activeBoxIndex = (activeBoxIndex + 1) % 2;
    let movingDownBox = boxes[activeBoxIndex]; // Box that moves down

    if (previousButton === null) {
        moveBox(movingDownBox, boxStartY, boxFinalY, colors[day].bg, colors[day].border, animationSpeed);
    } else {
        moveBox(movingUpBox, boxFinalY, boxStartY, colors[previousButton].bg, colors[previousButton].border, animationSpeed, true);
        moveBox(movingDownBox, boxStartY, boxFinalY, colors[day].bg, colors[day].border, animationSpeed);
    }

    previousButton = day; 
}

function moveBox(box, start, end, bgColor, borderColor, speed, hideAfter = false) {
    box.style.display = "block";
    box.style.backgroundColor = bgColor;
    box.style.border = `3px solid ${borderColor}`;
    
    // **Move box to the right corner**
    box.style.left = "calc(100% - 450px)"; // 20px from the right (450px box width + margin)
    box.style.transform = "translateX(0%)"; // No centering needed
    box.style.top = `${start}px`;

    let startTime = null;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = (timestamp - startTime) / speed;

        if (progress > 1) progress = 1;
        let newY = start + (end - start) * progress;
        box.style.top = `${newY}px`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else if (hideAfter) {
            box.style.display = "none"; 
        }
    }

    requestAnimationFrame(animate);
}
