export function setupFormElements() {
  //MODAL ELEMENTS
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseButton = document.querySelector('.modal__close-button__img');
  const modalForm = document.getElementById('modalForm');
  const modalFormNameInput = document.getElementById("modalFormName");
  const modalFormEmailInput = document.getElementById("modalFormEmail");
  const modalFormCheckbox = document.getElementById("modalFormCheckbox");

  //CONTACT FORM ELEMENTS
  const contactForm = document.getElementById('contactForm');
  const contactFormNameInput = document.getElementById("contactFormName");
  const contactFormEmailInput = document.getElementById("contactFormEmail");
  const contactFormCheckbox = document.getElementById("contactFormCheckbox");

  let isModalClosed = localStorage.getItem('modalClosed') ? true : false ;

  //MODAL FORM EVENT LISTENERS
  document.addEventListener('keydown', handleEscapeKey);
  modalCloseButton.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', handleClickOutside);
  modalForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const response = await subscribe(modalForm, modalFormNameInput, modalFormEmailInput, modalFormCheckbox);
    if(response) {
      closeModal()
    };
  });


  document.addEventListener('scroll', function scrollPopupHandler() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = document.documentElement.scrollTop;
    const scrollPercentage = Math.floor((scrollPosition / maxScroll) * 100);
    if (scrollPercentage > 25) {
      showModal();
      document.removeEventListener('scroll', scrollPopupHandler);
    }
  });

      
  //CONTACT FORM EVENT LISTENER
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    subscribe(contactForm, contactFormNameInput, contactFormEmailInput, contactFormCheckbox);
  });

  // FORM FUNCTIONS
  let isSubmitting = false;

  async function subscribe(form, nameInput, emailInput, checkbox) {
    if (isSubmitting) {
      return;
    }

    isSubmitting = true;

    try {
      const isContentFormValid = validateForm(nameInput, emailInput, checkbox);
      if (isContentFormValid) {
        const validFormContent = {
          name: nameInput.value,
          email: emailInput.value,
        };
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify(validFormContent),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const json = await response.json();
        console.log(json);
        if (json) {
          alert("Form submitted successfully!");
        }
        resetFormInputClasses(nameInput, emailInput, checkbox);
        form.reset();
        return true;
      } else {
        return false;
      }
    } finally {
      isSubmitting = false;
    }
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
  //MODAL FORM FUNCTIONS

  function showModal() {
    console.log(isModalClosed)
    if(!isModalClosed) {
      console.log(!isModalClosed)
      modalOverlay.classList.remove('disabled');
    }
  }

  function hideModal() {
    modalOverlay.classList.add('disabled');
  }

  function closeModal() {
    hideModal();
    localStorage.setItem('modalClosed', 'true');
    isModalClosed = true;
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

  setTimeout(showModal, 5000);
}