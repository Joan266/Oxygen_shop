//SCROLL ELEMENTS
const percentageScroller = document.querySelector('.percentage-scroller');
const scrollTopButton = document.querySelector('.scroll-top-button');

//SCROLL EVENT LISTENERS
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

//SCROLL FUNCTIONS
function setPercentageScrollBar(scrollPercentage, percentageScroller) {
  percentageScroller.style.width = scrollPercentage + '%';
}

function handleScrollTopButtonOpacity(scrollPercentage, scrollTopButton) {
  if (scrollPercentage < 24) {
    scrollTopButton.classList.add('disabled');
  } else {
    scrollTopButton.classList.remove('disabled');
  }
  if (scrollPercentage < 25) {
    scrollTopButton.style.opacity = 0;
  } else {
    scrollTopButton.style.opacity = 1;
  }
}

function handleScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}