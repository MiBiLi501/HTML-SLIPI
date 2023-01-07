// let sleep, nutrition, fit, overall, meters = document.querySelectorAll(".card");;
const $form = $(".form");
let $retake = $(".retake-button");
$retake.hide(200);

const calculateResult = () => {
    sleep = 1 - Math.abs((parseFloat(localStorage.getItem("sleep")) + 9 - parseFloat(localStorage.getItem("age"))) / (24 + 9 - parseFloat(localStorage.getItem("age"))));
    nutrition = Math.max(0, parseFloat(localStorage.getItem("vegetable")) + parseFloat(localStorage.getItem("fruit")) + Math.min(parseFloat(localStorage.getItem("water")) , 7)/7 - parseFloat(localStorage.getItem("snack"))/3)/3;
    fit = 1 - Math.abs((21 - parseFloat(localStorage.getItem("weight")) / parseFloat(localStorage.getItem("height")/100)**2) / 21);
    overall = (sleep + nutrition + fit)/3;

    localStorage.setItem("sleep", sleep);
    localStorage.setItem("nutrition", nutrition);
    localStorage.setItem("fit", fit);
    localStorage.setItem("overall", overall);
}

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

const saveData = () => {
    let datas = document.querySelectorAll(".question>*:not(label)");
    datas.forEach(element => {
        localStorage.setItem(`${element.id}`, parseFloat(element.value));
    });
    
}

const validateQuestion = () => {
    document.querySelectorAll(".warning").forEach(element => element.remove());
    let noWarning = true;
    let questions = document.querySelectorAll(".question");

    questions.forEach(element => {
        
        let input = element.querySelector("*:not(label)");

        if(input == null) return;


        let warning = document.createElement("span");
        warning.setAttribute("class", "warning")
        warning.style.padding = 0;
        warning.style.border = 0;
        warning.style.color = "rgb(255, 0, 0)";

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

        else if(input.getAttribute("data-type") === "time" && parseFloat(input.value) > 24){
            warning.innerHTML = "Value cannot be more than 24!";
            element.appendChild(warning);
            noWarning = false;
        }
    });

    console.log(noWarning);
    return noWarning;
}

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

const removeCardOverlay = () => {
    $(".card-overlay").hide(200);
}

const restoreCardOverlay = () => {
    $(".card-overlay").show(200);
}

let meters = document.querySelectorAll(".card");
    let colors = Array.from(meters).map(element => {
        return getComputedStyle(element.querySelector(".meter")).backgroundColor;
    });

const prepareUpdate = () => {

    sleep = parseFloat(localStorage.getItem("sleep"));
    nutrition = parseFloat(localStorage.getItem("nutrition"));
    fit = parseFloat(localStorage.getItem("fit"));
    overall = parseFloat(localStorage.getItem("overall"));

    datas = [parseFloat(localStorage.getItem("sleep")), parseFloat(localStorage.getItem("nutrition")), 
                parseFloat(localStorage.getItem("fit")), parseFloat(localStorage.getItem("overall"))];

    let cards = [];

    for(i = 0; i < meters.length; i++){
        cards.push([meters[i], datas[i], colors[i]]);
    }

    cards.forEach(array => {

        updateMeter(array[0], array[1] * 1000, array[2]);
    });
}

document.querySelector(".submit-button").addEventListener("click", () => {
    if (validateQuestion()) {
        removeCardOverlay();
        saveData();
        calculateResult();
        $form.slideUp(800);
        prepareUpdate();
        $retake.show(200);
    }
});

$retake.click(function(){
    localStorage.clear();
    restoreCardOverlay();
    $form.slideDown(800);
    $retake.hide(200)
});

