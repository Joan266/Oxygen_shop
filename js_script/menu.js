// MENU ELEMENTS
const navMenu = document.querySelector('.nav__menu');
const navMenuImg = document.querySelector('.nav__menu__img');
const nav = document.querySelector('.nav');
const sectionList = document.querySelector('.nav__oxygenshop__section-list');
const sectionOptions = document.querySelectorAll('.nav__oxygenshop__section-list__option');

// MAIN SECTIONS
const whyUsSection = document.getElementById('why-us');
const benefits = document.getElementById('benefits');
const prices = document.getElementById('prices');
const contact = document.getElementById('contact');

// MEDIA QUERY
const tabletMediaQuery = window.matchMedia("(min-width: 1150px)");

function handleScreenTypeChange(event) {
  if (event.matches) {
    sectionList.classList.remove("disabled");
  } else {
    sectionList.classList.add("disabled");
    closeNavMenu();
  }
}

document.addEventListener('click', handleClickOutsideMenu);

tabletMediaQuery.addEventListener('change', handleScreenTypeChange);

// INITIAL CHECK
handleScreenTypeChange(tabletMediaQuery);

// MENU EVENT LISTENERS
navMenu.addEventListener('click', function(event) {
  event.preventDefault();
  toggleNavMenu();
});

function toggleNavMenu() {
  if (navMenuImg.src.includes('menu')) {
    openNavMenu();
  } else {
    closeNavMenu();
  }
}

function openNavMenu() {
  navMenuImg.src = './public/svg/x.svg';
  navMenuImg.alt = 'x icon';
  sectionList.classList.remove("disabled");
}

function closeNavMenu() {
  navMenuImg.src = './public/svg/menu.svg';
  navMenuImg.alt = 'menu icon';
  sectionList.classList.add("disabled");
}

function handleClickOutsideMenu(event) {
  if (!nav.contains(event.target) && !tabletMediaQuery.matches) {
    closeNavMenu();
  }
}

// SMOOTH SCROLLING TO SECTION

sectionOptions.forEach(option => {
  option.addEventListener('click', function(event) {
    event.preventDefault();
    const sectionId = option.dataset.value;
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      const viewportHeight = window.innerHeight;
      const offsetTop = targetSection.offsetTop - (viewportHeight * 0.13); 
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      if(!tabletMediaQuery.matches){
        closeNavMenu();
      }
    }
  });
});

// SECTION OBSERVER
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.4, 
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id;
      sectionOptions.forEach((option) => {
        if (option.dataset.value === sectionId) {
          option.classList.add("nav__oxygenshop__section-list__option--active");
        } else {
          option.classList.remove("nav__oxygenshop__section-list__option--active");
        }
      });
    }
  });
}, observerOptions);

sectionObserver.observe(whyUsSection);
sectionObserver.observe(benefits);
sectionObserver.observe(prices);
sectionObserver.observe(contact);