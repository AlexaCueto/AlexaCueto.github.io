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
    changeBackgroundGradient();
}

function changeBackgroundGradient() {
    if (toggleGradient) {
        body.style.background = "linear-gradient(to right,rgb(208, 120, 191),rgb(157, 64, 211))";
    } else {
        body.style.background = "linear-gradient(to right, #a06be0, #e78bd2)";
    }
    toggleGradient = !toggleGradient; 
}