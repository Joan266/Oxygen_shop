const headerMenu = document.querySelector('.header__menu');
const headerMenuImg = document.querySelector('.header__menu__img');
const headerDropdown = document.querySelector('.header__dropdown');
const header = document.querySelector('.header');
const menuFilePath = "./public/svg/menu.svg";
const xFilePath = "./public/svg/x.svg";
const menuAltString = "menu icon";
const xAltString = "x icon";
headerMenu.addEventListener('click', function() {
  headerDropdown.classList.toggle('disabled');
  header.classList.toggle('boxshadow-disabled');

  if (headerMenuImg.getAttribute('src') === menuFilePath) {
    headerMenuImg.setAttribute('src', xFilePath);
    headerMenuImg.setAttribute('alt', xAltString);
  } else {
    headerMenuImg.setAttribute('src', menuFilePath);
    headerMenuImg.setAttribute('alt', menuAltString);
  }
  console.log("Header Dropdown Classes: ", headerDropdown.classList);
  console.log("Header Classes: ", header.classList);
  console.log("Header Menu Classes: ", headerMenu.classList);
});