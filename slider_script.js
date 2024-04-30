const slider = document.getElementById("slider");
const sliderImg = document.querySelector(".slider__img");
const leftButton = document.querySelector(".slider__button--left");
const rightButton = document.querySelector(".slider__button--right");
const imgSelector = document.querySelector(".slider__img-selector");
const imgSelectorOptions = document.querySelectorAll(".slider__img-selector__option");

function setActiveImage(index) {
  imgSelectorOptions.forEach((option, i) => {
    if (i === index) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });
}

imgSelectorOptions.forEach((option, index) => {
  option.addEventListener('click', (event) => {
    event.preventDefault()
    const value = event.currentTarget.dataset.value;
    const srcString = `./public/picsum-img/${value}.webp`
    sliderImg.src = srcString;
    setActiveImage(index);
  });
});

function changeImage(indexOffset) {
  let currentIndex = -1;
  imgSelectorOptions.forEach((option, index) => {
    if (option.classList.contains('active')) {
      currentIndex = index;
    }
  });
  
  if (currentIndex !== -1) {
    const newIndex = (currentIndex + indexOffset + imgSelectorOptions.length) % imgSelectorOptions.length;
    const value = imgSelectorOptions[newIndex].dataset.value;
    const srcString = `./public/picsum-img/${value}.webp`;
    sliderImg.src = srcString;
    setActiveImage(newIndex);
  }
}

leftButton.addEventListener('click', (event) => {
  event.preventDefault();
  changeImage(-1);
});

rightButton.addEventListener('click', (event) => {
  event.preventDefault();
  changeImage(1);
});