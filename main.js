'use strict';

// navbar transparent
const navbar= document.querySelector('#navbar');
const navbar_Height= navbar.getBoundingClientRect().height;

document.addEventListener('scroll', ()=> {
    console.log(window.scrollY)
    console.log(`narvar_Height: ${navbar_Height}`);

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