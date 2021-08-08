'use strict';

//-----------------------------------------------DOM Elements
const learBtn = document.querySelector('.learnBtn');
const section1 = document.querySelector('#section1');
const buttons = document.querySelector('.buttons');
const infos = document.querySelectorAll('.info');
const nav = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const logo = document.querySelector('.logo');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');
const lazyImages = document.querySelectorAll('.lazyImage');
const slides = document.querySelectorAll('.quote');
const btnLeft = document.querySelector('.btnLeft');
const btnRight = document.querySelector('.btnRight');
const dotCont = document.querySelector('.dots');
const dots = document.querySelectorAll('.dot');





//-----------------------------------------------Function

const setNavEffect = function (event) {
    const link = event.target;
    if (link.classList.contains('nav-link')) {
        navLinks.forEach(l => l.style.opacity = this);
        logo.style.opacity = this;
        link.style.opacity = 1;
    }
};
const addSticky = function (entries, o) {
    entries.forEach(function (e) {
        if (e.isIntersecting) {
            nav.classList.remove('sticky');
        }
        else {
            nav.classList.add('sticky');
        }
    })
}

sections.forEach(sec => sec.classList.add('hide'));
const revealSect = function (enteries, o) {
    const entry = enteries[0];
    if (entry.isIntersecting) {
        entry.target.classList.remove('hide');
        o.unobserve(entry.target);
    }
}


lazyImages.forEach(sec => sec.classList.add('blur'));
const loadImg = function (enteries, o) {
    const entry = enteries[0];
    const img = entry.target;
    if (entry.isIntersecting) {
        img.classList.remove('blur');
        let src = img.getAttribute('src');
        console.log(src.replace('-lazy', ''));
        img.setAttribute('src', src.replace('-lazy', ''));
        o.unobserve(entry.target);
    }
}




const removeDot = () => dots.forEach(dot => dot.classList.remove('dotActive'));

const updateDot = function () {
    removeDot();
    document.querySelector(`.dot${slideNo + 1}`).classList.add('dotActive');
}

const setSlide = function (no) {
    slides.forEach(function (slide, index) {
        slide.style.transform = `translateX(${((index - no) * 100)}%)`;
    });
    updateDot();
}

const movBtnRight = function () {
    if (slideNo == 2)
        slideNo = 0;
    else
        slideNo++;
    setSlide(slideNo);
}
const movBtnLeft = function () {
    if (slideNo == 0)
        slideNo = 2;
    else
        slideNo--;
    setSlide(slideNo);
}






//-----------------------------------------------EventListners
// learn button
learBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const scetion1Corr = section1.getBoundingClientRect();
    // window.scrollBy({
    //     top: scetion1Corr.top,
    //     left: 0,
    //     behavior: "smooth",
    // })
    section1.scrollIntoView({ behavior: 'smooth' });
});

//Tabbed Containers
buttons.addEventListener('click', function (event) {
    event.preventDefault();
    const btn = event.target;
    if (btn.classList.contains('btns')) {
        btn.parentElement.children.forEach(element => element.classList.remove('activeBtn'));
        btn.classList.add('activeBtn')
        infos.forEach(i => i.classList.remove('activeInfo'));
        document.querySelector(`.info${btn.getAttribute('num')}`).classList.add('activeInfo');
    }

});

//Navigation Links
nav.addEventListener('click', function (event) {
    event.preventDefault();
    const link = event.target;
    if (link.classList.contains('nav-link') && link.getAttribute('href') != "#") {
        const dest = document.querySelector(link.getAttribute('href'));
        dest.scrollIntoView({ behavior: 'smooth' });
    }
    // if (link.getAttribute('href') == "#") {
    //     link.addEventListener('click', openModal);
    // }
})

//Making on the hovred link prominent in the navbar (Using Event Delegation )
nav.addEventListener('mouseover', setNavEffect.bind(0.5));
nav.addEventListener('mouseout', setNavEffect.bind(1));


//Sticky Navbar
const navheight = nav.getBoundingClientRect().height;
const navObs = new IntersectionObserver(addSticky, {
    root: null,
    threshold: 0,
});
navObs.observe(header);



//Revealing Sections
const secObs = new IntersectionObserver(revealSect, {
    root: null,
    threshold: 0.15,
});

sections.forEach(function (sec) {
    secObs.observe(sec);
});



//Lazy Loading Images
const imgObs = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 1,
});
lazyImages.forEach(function (img) {
    imgObs.observe(img);
});




//Slider
let slideNo = 0;
setSlide(0);
//Slider Arrows Buttons
btnRight.addEventListener('click', movBtnRight);
btnLeft.addEventListener('click', movBtnLeft);
//Slider Arrows Keys
document.addEventListener('keydown', function (e) {
    if (e.key == 'ArrowRight')
        movBtnRight();
    if (e.key == 'ArrowLeft')
        movBtnLeft();
})


//Slider Dots
dotCont.addEventListener('click', function (e) {
    e.preventDefault();
    let actDot = e.target;
    if (actDot.classList.contains('dot')) {
        slideNo = +actDot.getAttribute('num');
        setSlide(slideNo);
    }
});