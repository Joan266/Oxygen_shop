const slider = document.getElementById("slider");
const sliderImg = document.querySelector(".slider__img");
const leftButton = document.querySelector(".slider__button--left");
const rightButton = document.querySelector(".slider__button--right");
const imgSelector = document.querySelector(".slider__img-selector");
const imgSelectorOptions = document.querySelectorAll(".slider__img-selector__option");

class ImageSlider {
  constructor(slider, sliderImg, leftButton, rightButton, imgSelector, imgSelectorOptions) {
    this.slider = slider;
    this.sliderImg = sliderImg;
    this.leftButton = leftButton;
    this.rightButton = rightButton;
    this.imgSelector = imgSelector;
    this.imgSelectorOptions = imgSelectorOptions;
    this.pause = false;
    this.setEventListeners();
    this.clock()
  }

  setActiveOptionSelector(index) {
    this.imgSelectorOptions.forEach((option, i) => {
      if (i === index) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }
  
  clock() {
    setTimeout(() => {
      if (!this.pause) {
        this.calculatedImgSelectedValue(1);
      } else {
        this.pause = false;
      }
      this.clock();
      console.log(`clock, pause: ${this.pause}`);
    }, 8000);
  };
  
  setEventListeners() {
    this.imgSelectorOptions.forEach((option, index) => {
      option.addEventListener('click', (event) => {
        event.preventDefault();
        const value = event.currentTarget.dataset.value;
        this.changeImgSrcPath(value);
        this.setActiveOptionSelector(index);
        this.pause = true;
      });
    });

    this.leftButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.calculatedImgSelectedValue(-1);
      this.pause = true;
    });

    this.rightButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.calculatedImgSelectedValue(1);
      this.pause = true;
    });
  }

  calculatedImgSelectedValue(indexOffset) {
    let currentIndex = -1;
    this.imgSelectorOptions.forEach((option, index) => {
      if (option.classList.contains('active')) {
        currentIndex = index;
      }
    });

    if (currentIndex !== -1) {
      const newIndex = (currentIndex + indexOffset + this.imgSelectorOptions.length) % this.imgSelectorOptions.length;
      const value = this.imgSelectorOptions[newIndex].dataset.value;
      this.changeImgSrcPath(value);
      this.setActiveOptionSelector(newIndex);
    }
  }
  
  changeImgSrcPath(value) {
    const srcString = `./public/picsum-img/${value}.webp`;
    this.sliderImg.src = srcString;
  }
}

const imageSlider = new ImageSlider(
  slider,
  sliderImg,
  leftButton,
  rightButton,
  imgSelector,
  imgSelectorOptions,
);
