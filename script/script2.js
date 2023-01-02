const $form = $("form");

const updateMeter = (meterCard, endValue, color, maxValue = 1000) => {
    let textValue = meterCard.querySelector(".value");
    let meter = meterCard.querySelector(".meter");
    let currentValue = 0;

    let updateValue = setInterval(() => {
        let scalledValue = (currentValue * 100 / maxValue);
        textValue.textContent = `${scalledValue.toFixed(1)}%`;

        meter.style.background = `conic-gradient(${color} ${scalledValue*360/100}deg, #ffffff ${scalledValue*360/100}deg)`;

        if(currentValue >= endValue) clearInterval(updateValue);
        currentValue++;
    });
    
}

let meters = document.querySelectorAll(".card");
let colors = Array.from(meters).map(element => {
    return getComputedStyle(element.querySelector(".meter")).backgroundColor;
});

let cards = [];

for(i = 0; i < meters.length; i++){
    cards.push([meters[i], colors[i]]);
}

cards.forEach(array => {
    console.log(array);
    updateMeter(array[0], 800, array[1]);
});

const isNegative = number => {
    return number < 0;
}


document.querySelectorAll("select").forEach(element => {
    var tag = document.createElement("option");
    tag.setAttribute("value", "");
    tag.setAttribute("disabled", "");
    tag.setAttribute("selected", "");
    tag.innerHTML = "Select your option";
    element.appendChild(tag);
})



const validateQuestion = () => {
    document.querySelectorAll(".warning").forEach(element => element.remove());
    let noWarning = true;
    let questions = document.querySelectorAll(".question");

    questions.forEach(element => {
        
        var input = element.querySelector(".question>*:not(label)");

        if(input == null) return;

        console.log(input);

        var warning = document.createElement("span");
        warning.setAttribute("class", "warning")
        warning.style.padding = 0;

        if(input.value === ""){
            warning.innerHTML = "Please enter a value";
            element.appendChild(warning);
            noWarning = false;
        }

        else if(isNegative(parseFloat(input.value))){
            warning.innerHTML = "Value cannot be negative!";
            element.appendChild(warning);
            noWarning = false;
        }
    })

    console.log(noWarning)
    return noWarning;
}

document.querySelector(".submit-button").addEventListener("click", () => {
    if (validateQuestion()) {
        saveData();
        $form.slideUp(800);
    }
});
