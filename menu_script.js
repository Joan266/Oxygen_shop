//MENU ELEMENTS
const headerMenu = document.querySelector('.header__menu');
const headerMenuImg = document.querySelector('.header__menu__img');
const headerDropdown = document.querySelector('.header__dropdown');
const header = document.querySelector('.header');

//MENU EVENT LISTENERS
headerMenu.addEventListener('click', function(event) {
  event.preventDefault();
  toggleDropdown(headerDropdown, header);
  switchMenuIcon(headerMenuImg);
});

//MENU FUNCTIONS
function toggleDropdown(headerDropdown, header) {
  headerDropdown.classList.toggle('disabled');
  header.classList.toggle('boxshadow-disabled');
}

function switchMenuIcon(headerMenuImg) {
  if (headerMenuImg.src.includes('menu')) {
    headerMenuImg.src = './public/svg/x.svg';
    headerMenuImg.alt = 'x icon';
  } else {
    headerMenuImg.src = './public/svg/menu.svg';
    headerMenuImg.alt = 'menu icon';
  }
}