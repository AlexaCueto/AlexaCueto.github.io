// Colors for each day
const colors = {
    "Monday": { bg: "#88c1d3", border: "#296475" },
    "Tuesday": { bg: "#ba6870", border: "#84454b" },
    "Wednesday": { bg: "#faeab6", border: "#ae943d" },
    "Thursday": { bg: "#abfae2", border: "#1f926f" },
    "Friday": { bg: "#a8acd8", border: "#3a3f79" },
    "Saturday": { bg: "#d7eacb", border: "#3a671f" },
    "Sunday": { bg: "#e989b7", border: "#c84fa4" }
};

// Attach event listeners to buttons
document.querySelectorAll(".Weekday").forEach(button => {
    button.addEventListener("click", function () {
        colorBox(button.getAttribute("data-day")); 
    });
});

function colorBox(day) {
    let container = document.querySelector(".calendar-container");

    // Purpose: Remove all boxes 
    document.querySelectorAll(".box").forEach(box => {
        box.style.top = "-10px";
        setTimeout(() => box.remove(), 1000);
    });

    // Purpose: Create new element na "box", then ilalagay sa container
    let box = document.createElement("div");
    box.className = "box moving-box";
    box.style.backgroundColor = "transparent";
    box.style.border = `10px solid ${colors[day].border}`;
    box.style.top = "-10px";
    box.dataset.bgColor = colors[day].bg;

    // Append box
    container.appendChild(box);

    // Animate box
    setTimeout(() => {
        box.style.top = "60%";
    }, 500);

    // Check for overlapping boxes
    setTimeout(overlaps, 100);
}

// Overlapping baxes
function overlaps() {
    let boxes = document.querySelectorAll(".box");

    // Loop through each box
    boxes.forEach(box1 => {
        let isOverlapping = false;

        // Check if box1 is overlapping with any other box
        boxes.forEach(box2 => {
            if (box1 !== box2 && isOverlappingBoxes(box1, box2)) {
                isOverlapping = true;
            }
        });

        // Apply background color when overlapping
        if (isOverlapping) {
            box1.style.backgroundColor = box1.dataset.bgColor;
            box1.style.opacity = "0.9";
        } else {
            box1.style.backgroundColor = "transparent";
            box1.style.opacity = "1";
        }
    });

    // Request animation frame to keep checking for overlaps
    requestAnimationFrame(overlaps);
}

// Check if two boxes are overlapping
function isOverlappingBoxes(box1, box2) {
    // Get the bounding rectangle of each box
    let rect1 = box1.getBoundingClientRect();
    let rect2 = box2.getBoundingClientRect();
    
    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
}