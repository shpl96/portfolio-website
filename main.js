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
    navbarMenu.classList.remove('open');

    console.log(event.target.dataset.link);
    scrollIntoView(link);

});

//navbar_toggle-button
const navbarToggleBtn = document.querySelector('.navbar_toggle-button');

navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
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
})

arrowbtn.addEventListener("click", () => {
    scrollIntoView('#home');
});

// my work animation

const workBtnContainer = document.querySelector(".work_category");
const projectContainer = document.querySelector(".work_project");
const projects= document.querySelectorAll(".project");

workBtnContainer.addEventListener( 'click', (e) => {
    const filter= e.target.dataset.filter || e.target.parentNode.dataset.filter ;
    if (filter == null){
        return;
    }

    projectContainer.classList.add('anim-out');

    setTimeout(() => {
    projects.forEach ((project) => {
        console.log(project.dataset.type);
        if( filter === '*' || filter === project.dataset.type ){
            project.classList.remove('invisible');
        } else {
            project.classList.add('invisible');
        }
    });
    
        projectContainer.classList.remove('anim-out');
    }, 300);

});

// Remove selection from the previous item and select the new clicked

const active= document.querySelector(".category_btn selected");
active.classList.remove('selected');
const target = e.target.nodeName === 'BUTTON' ?  e.target : e.target.parentNode;
target.classList.add('selected');
