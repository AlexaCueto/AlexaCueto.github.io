const display = document.getElementById("display");
const body = document.body;

let toggleGradient = true;

function appendToDisplay(char, button) {
    display.value += char;
}

function calculation(button) {
    try {
        display.value = eval(display.value); 
        changeBackgroundGradient();
    } catch (error) {
        display.value = "Error";
    }
}

function deleteLastNumber(button) {
    display.value = display.value.slice(0, -1);
}

function clearDisplay(button) {
    display.value = "";
}

function changeBackgroundGradient() {
    if (toggleGradient) {
        body.style.background = "linear-gradient(to right,rgb(107, 169, 224),rgb(221, 207, 134))";
    } else {
        body.style.background = "linear-gradient(to right, #a06be0, #e78bd2)";
    }
    toggleGradient = !toggleGradient; 
}