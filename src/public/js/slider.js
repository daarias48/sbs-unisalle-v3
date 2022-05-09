const slider = document.querySelector("#slider")
let sliderSection = document.querySelectorAll(".slider__section")
let sliderSectionLast = sliderSection[sliderSection.length -1]

const btnLeft = document.querySelector("#btn-left")
const btnRight = document.querySelector("#btn-right")

slider.insertAdjacentElement("afterbegin", sliderSectionLast)

function Next(){
    let sliderSectionFirst = document.querySelectorAll(".slider__section")[0];
    slider.style.marginLeft ="-200%";
    slider.style.transition = "all 0.5s";
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement("beforeend", sliderSectionFirst);
        slider.style.marginLeft="-100%";
    },500);
}

function Prev(){
    let sliderSection = document.querySelectorAll(".slider__section")
let sliderSectionLast = sliderSection[sliderSection.length -1]
    slider.style.marginLeft ="0";
    slider.style.transition = "all 0.5s";
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement("afterbegin", sliderSectionLast);
        slider.style.marginLeft="-100%";
    },500);
}

btnRight.addEventListener('click',function(){
    Next();
});

btnLeft.addEventListener('click',function(){
    Prev();
});

const slider1 = document.querySelector("#slider1")
let sliderSection1 = document.querySelectorAll(".slider__section1")
let sliderSectionLast1 = sliderSection1[sliderSection1.length -1]

const btnLeft1 = document.querySelector("#btn-left1")
const btnRight1 = document.querySelector("#btn-right1")

slider1.insertAdjacentElement("afterbegin", sliderSectionLast1)

function Next1(){
    let sliderSectionFirst1 = document.querySelectorAll(".slider__section1")[0];
    slider1.style.marginLeft ="-200%";
    slider1.style.transition = "all 0.5s";
    setTimeout(function(){
        slider1.style.transition = "none";
        slider1.insertAdjacentElement("beforeend", sliderSectionFirst1);
        slider1.style.marginLeft="-100%";
    },500);
}

function Prev1(){
    let sliderSection1 = document.querySelectorAll(".slider__section1")
    let sliderSectionLast1 = sliderSection1[sliderSection1.length -1]
    slider1.style.marginLeft ="0";
    slider1.style.transition = "all 0.5s";
    setTimeout(function(){
        slider1.style.transition = "none";
        slider1.insertAdjacentElement("afterbegin", sliderSectionLast1);
        slider1.style.marginLeft="-100%";
    },500);
}

btnRight1.addEventListener('click',function(){
    Next1();
});

btnLeft1.addEventListener('click',function(){
    Prev1();
});