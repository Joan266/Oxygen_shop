const headerMenu = document.querySelector('.header__menu');
const headerMenuImg = document.querySelector('.header__menu__img');
const headerDropdown = document.querySelector('.header__dropdown');
const header = document.querySelector('.header');

const percentageScroller = document.querySelector('.percentage-scroller');
const scrollTopButton = document.querySelector('.scroll-top__button');

const form = document.getElementById('contactForm');
const nameInput = document.getElementById("contactFormName");
const emailInput = document.getElementById("contactFormEmail");
const checkbox = document.getElementById("contactFormCheckbox");

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

function setPercentageScrollBar(scrollPercentage, percentageScroller) {
  percentageScroller.style.width = scrollPercentage + '%';
}

function handleScrollTopButtonOpacity(scrollPercentage, scrollTopButton) {
  if(scrollPercentage < 95){
    scrollTopButton.style.opacity = 0;
  }else {
    scrollTopButton.style.opacity = 1;
  }
}

function handleScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function resetFormInputClasses() {
  nameInput.classList.remove("feedback", "feedback--error", "feedback--success");
  emailInput.classList.remove("feedback", "feedback--error", "feedback--success");
  checkbox.classList.remove("feedback", "feedback--error", "feedback--success");
}

function validateForm() {
  let isValid = true;
  const nameLength = nameInput.value.trim().length;
  if (nameLength < 2 || nameLength > 100) {
    isValid = false;
    setErrorInputClass(nameInput);
  } else {
    setSuccessInputClass(nameInput);
  }

  if (!isEmail(emailInput.value.trim())) {
    isValid = false;
    setErrorInputClass(emailInput);
  } else {
    setSuccessInputClass(emailInput);
  }

  if (!checkbox.checked) {
    isValid = false;
    setErrorInputClass(checkbox);
  } else {
    setSuccessInputClass(checkbox);
  }
  return isValid;
}

function setErrorInputClass(input) {
  input.classList.add("feedback", "feedback--error");
  input.classList.remove("feedback--success");
}

function setSuccessInputClass(input) {
  input.classList.add("feedback", "feedback--success");
  input.classList.remove("feedback--error");
}

function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validateForm()) {
    resetFormInputClasses();
    alert("Form submitted successfully!");
    form.reset();
  }
});

headerMenu.addEventListener('click', function() {
  toggleDropdown(headerDropdown, header);
  switchMenuIcon(headerMenuImg);
});

scrollTopButton.addEventListener('click', function() {
  handleScrollToTop();
});

document.addEventListener('scroll', function() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPosition = document.documentElement.scrollTop;
  const scrollPercentage = Math.floor((scrollPosition/maxScroll) * 100);
  handleScrollTopButtonOpacity(scrollPercentage, scrollTopButton)
  setPercentageScrollBar(scrollPercentage, percentageScroller)
});
