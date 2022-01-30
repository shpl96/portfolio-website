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
// navbar active
// 1.모든 섹션 요소들과 메뉴 아이템을 가지고 온다. 
// 2. Intersection Observer을 이용해서 모든 섹션들을 관찰한다. 
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화한다. 

const sectionIds= [
    '#home', 
    '#about', 
    '#skills', 
    '#work', 
    '#testimonials', 
    '#contact',
];

const sections= sectionIds.map((id) => document.querySelector (id));
const navItems= sectionIds.map((id) => 
    document.querySelector(`[data-link= "${id}"]`)
    );

let selectedNavIndex = 0; 
let selectedNavItem = navItems[0]; 

function selectNavItem (selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem= selected;
    selectedNavItem.classList.add('active');
};

const observerOptions = {
    root: null, 
    rootMargin: '0px',
    threshold: 0.3,
};


const callback= (entries, observer) => {
    entries.forEach((entry) => {
        if( !entry.isIntersecting && entry.intersectionRatio > 0) {
            const index= sectionIds.indexOf(`#${entry.target.id}`);
            // 스크롤링이 아래로 되어 페이지가 위로 올라옴-> 그 다음 인덱스를 선택해야
            if(entry.boundingClientRect.y < 0) {
                selectedNavIndex = index  + 1;
            } else {
                selectedNavIndex = index  - 1;
            }
        }
    });
};


const observer= new IntersectionObserver(callback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', ()=> { //사용자가 마우스 휠을 움직여 스크롤: wheel
    if (window.scrollY === 0){
        selectedNavIndex =0;
    } else if (
        Math.round(window.scrollY + window.innerHeight >= 
        document.body.clientHeight
        )) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
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
    selectNavItem(target);

});

//navbar_toggle-button for small screen
const navbarToggleBtn = document.querySelector('.navbar_toggle-button');


navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});
window.addEventListener('wheel', () => {
    navbarMenu.classList.remove('open');
});


// contact me button

const homeContactBtn= document.querySelector(".home_button");
homeContactBtn.addEventListener('click', ()=> {

    scrollIntoView('#contact');
});

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

// Remove selection from the previous item and select the new clicked

    const active= document.querySelector(".category_btn.selected");
    active.classList.remove('selected');
    const target = 
        e.target.nodeName === 'BUTTON' ?  e.target : e.target.parentNode;
    target.classList.add('selected');

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

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
};