//CURRENCY ELEMENTS
const princingCurrencySelector = document.querySelector('.pricing__currency-selector');
const basicPriceElement = document.getElementById('basic-price');
const professionalPriceElement = document.getElementById('professional-price');
const premiumPriceElement = document.getElementById('premium-price');

let subcriptions = JSON.parse(localStorage.getItem('subcriptions'));

//CURRENCY EVENT LISTENERS
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