'use strict';
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
