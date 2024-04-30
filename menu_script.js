// MENU ELEMENTS
const headerMenu = document.querySelector('.header__menu');
const headerMenuImg = document.querySelector('.header__menu__img');
const header = document.querySelector('.header');
const sectionList = document.querySelector('.header__oxygenshop__section-list');

// MEDIA QUERY
const tabletMediaQuery = window.matchMedia("(min-width: 1000px)");

function handleTabletChange(event) {
  if (event.matches) {
    sectionList.classList.remove("disabled");
  } else {
    sectionList.classList.add("disabled");
    closeNavMenu();
  }
}

document.addEventListener('click', handleClickOutside);

tabletMediaQuery.addEventListener('change', handleTabletChange);

// INITIAL CHECK
handleTabletChange(tabletMediaQuery);

// MENU EVENT LISTENERS
headerMenu.addEventListener('click', function(event) {
  event.preventDefault();
  toggleNavMenu();
});

function toggleNavMenu() {
  if (headerMenuImg.src.includes('menu')) {
    openNavMenu();
  } else {
    closeNavMenu();
  }
}

function openNavMenu() {
  headerMenuImg.src = './public/svg/x.svg';
  headerMenuImg.alt = 'x icon';
  sectionList.classList.remove("disabled");
}

function closeNavMenu() {
  headerMenuImg.src = './public/svg/menu.svg';
  headerMenuImg.alt = 'menu icon';
  sectionList.classList.add("disabled");
}

function handleClickOutside(event) {
  event.preventDefault();
  if (!header.contains(event.target) && !tabletMediaQuery.matches) {
    closeNavMenu();
  }
}