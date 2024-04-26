//MENU ELEMENTS
const headerMenu = document.querySelector('.header__menu');
const headerMenuImg = document.querySelector('.header__menu__img');
const headerDropdown = document.querySelector('.header__dropdown');
const header = document.querySelector('.header');

//SCROLL ELEMENTS
const percentageScroller = document.querySelector('.percentage-scroller');
const scrollTopButton = document.querySelector('.scroll-top-button');

//FORM ELEMENTS
const form = document.getElementById('contactForm');
const nameInput = document.getElementById("contactFormName");
const emailInput = document.getElementById("contactFormEmail");
const checkbox = document.getElementById("contactFormCheckbox");

//CURRENCY ELEMENTS
const princingCurrencySelector = document.querySelector('.pricing__currency-selector');
const basicPriceElement = document.getElementById('basic-price');
const professionalPriceElement = document.getElementById('professional-price');
const premiumPriceElement = document.getElementById('premium-price');

let subcriptions = JSON.parse(localStorage.getItem('subcriptions'));

//MODAL ELEMENTS
const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('modal__close-button');
const modalEmailInput = document.getElementById('email-input');
const subscribeForm = document.getElementById('subscribe-form');

//EVENT LISTENERS
princingCurrencySelector.addEventListener("change", async (event) => {
  const selectedCurrency = event.target.value;
  if (!subcriptions) {
    console.log('Subscription prices not available.');
    await calculateCurrency();
  }
  const convertPrice = (price) => {
    switch (selectedCurrency) {
      case 'eur':
        return price.eur;
      case 'usd':
        return price.usd;
      case 'gbp':
        return price.gbp;
      default:
        return price.usd; 
    }
  };

  basicPriceElement.textContent = convertPrice(subcriptions.basic);
  professionalPriceElement.textContent = convertPrice(subcriptions.professional);
  premiumPriceElement.textContent = convertPrice(subcriptions.premium);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const isContentFormValid = validateForm(nameInput, emailInput, checkbox)
  if (isContentFormValid) {
    const validFormContent = {
      name: nameInput.value,
      email: emailInput.value,
    }
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(validFormContent),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if(json){
        alert("Form submitted successfully!");
      }
    });
    resetFormInputClasses(nameInput, emailInput, checkbox);
    form.reset();
  }
});

headerMenu.addEventListener('click', function(event) {
  event.preventDefault();
  toggleDropdown(headerDropdown, header);
  switchMenuIcon(headerMenuImg);
});

scrollTopButton.addEventListener('click', function(event) {
  event.preventDefault();
  handleScrollToTop();
});

document.addEventListener('scroll', function() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPosition = document.documentElement.scrollTop;
  const scrollPercentage = Math.floor((scrollPosition/maxScroll) * 100);
  handleScrollTopButtonOpacity(scrollPercentage, scrollTopButton)
  setPercentageScrollBar(scrollPercentage, percentageScroller)
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

//SCROLL FUNCTIONS
function setPercentageScrollBar(scrollPercentage, percentageScroller) {
  percentageScroller.style.width = scrollPercentage + '%';
}

function handleScrollTopButtonOpacity(scrollPercentage, scrollTopButton) {
  if(scrollPercentage < 24){
    scrollTopButton.classList.add('disabled');
  }else {
    scrollTopButton.classList.remove('disabled');
  }
  if(scrollPercentage < 25){
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

//FORM FUNCTIONS
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

function resetFormInputClasses(nameInput, emailInput, checkbox) {
  nameInput.classList.remove("feedback", "feedback--error", "feedback--success");
  emailInput.classList.remove("feedback", "feedback--error", "feedback--success");
  checkbox.classList.remove("feedback", "feedback--error", "feedback--success");
}

function validateForm(nameInput, emailInput, checkbox) {
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

//CURRENCY FUNCTIONS 
async function fetchCurrency() {
  try {
    const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json');
    if(response.ok) {
      const json = await response.json();
      
      return {
        usd: json.eur.usd,
        gbp: json.eur.gbp
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}



function convertAmount(amount, currencyRates) {
  return {
    eur: "€" + Math.floor(amount / currencyRates.usd),
    usd: "$" + amount,
    gbp: "£" + Math.floor((amount / currencyRates.usd) * currencyRates.gbp),
  };
}

async function calculateCurrency() {
  let currencyRates;

  if (!subcriptions) {
    currencyRates = await fetchCurrency();
    if (!currencyRates) {
      console.log('Failed to fetch currency rates.');
      return;
    }
    subcriptions = {
      basic: convertAmount(0, currencyRates),
      professional: convertAmount(25, currencyRates),
      premium: convertAmount(60, currencyRates),
    }
    localStorage.setItem('subcriptions', JSON.stringify(subcriptions));
  }
  
  console.log('Subcriptions:', subcriptions);
}


calculateCurrency();

function showModal() {
  modalOverlay.classList.remove('modal-overlay--hidden');
}

function hideModal() {
  modalOverlay.classList.add('modal-overlay--hidden');
}

function closeModal() {
  hideModal();
  localStorage.setItem('modalClosed', 'true');
}

function subscribe(event) {
  event.preventDefault();
  const email = emailInput.value;
  // Validar el email aquí antes de enviarlo al servidor
  console.log('Email:', email);
  closeModal();
}

function checkModalClosed() {
  if (localStorage.getItem('modalClosed')) {
    hideModal();
  } else {
    setTimeout(showModal, 5000); // Aparece después de 5 segundos
  }
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function handleClickOutside(event) {
  if (event.target === modalOverlay) {
    closeModal();
  }
}

closeButton.addEventListener('click', closeModal);
subscribeForm.addEventListener('submit', subscribe);
modalOverlay.addEventListener('click', handleClickOutside);
document.addEventListener('keydown', handleEscapeKey);

window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.clientHeight;
  if ((scrollPosition / (documentHeight - windowHeight)) > 0.25) {
    showModal();
    window.removeEventListener('scroll', arguments.callee);
  }
});

checkModalClosed();