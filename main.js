'use strict';

// navbar transparent
const navbar= document.querySelector('#navbar');
const navbar_Height= navbar.getBoundingClientRect().height;

document.addEventListener('scroll', ()=> {
    console.log(window.scrollY);
    console.log(`navbar_Height: ${navbar_Height}`);

    if (window.scrollY > navbar_Height){
        navbar.classList.add('navbar--dark');
    } else{
        navbar.classList.remove('navbar--dark');
    }
});


// scroll to section

const navbarMenu= document.querySelector('.navbar_menu');
navbarMenu.addEventListener('click', (event) => {
    
    const target = event.target;
    const link = target.dataset.link;
    if (link == null){
        return;
    }

    console.log(event.target.dataset.link);
    scrollIntoView(link);

});

// contact me button

const homeContactBtn= document.querySelector(".home_button");
homeContactBtn.addEventListener('click', ()=> {

    scrollIntoView('#contact');
});

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
}

// home fade to transparent
const home= document.querySelector('.home_container');
const homeHeight = home.getBoundingClientRect().height;


document.addEventListener('scroll', () => {
    home.style.opacity = 1- window.scrollY / homeHeight
});

// arrow button

const arrowbtn= document.querySelector(".arrowbtn");

document.addEventListener("scroll", ()=> {
    if (homeHeight/2 < window.scrollY) {
        arrowbtn.classList.add('visible');
    } else {
        arrowbtn.classList.remove('visible');
    }
});

arrowbtn.addEventListener("click", () => {
    scrollIntoView('#home');
});


