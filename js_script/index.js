import setupCurrencyExchangeElements from "./setupCurrencyExchangeElements.js";
import setupFormElements from "./setupFormElements.js";
import setupMenuElements from "./setupMenuElements.js";
import setupScrollElements from "./setupScrollElements.js"
import sliderClass from "./sliderClass.js"

//create Slider
new sliderClass('slider');

setupScrollElements();

setupMenuElements();

setupFormElements();

setupCurrencyExchangeElements();