document.addEventListener('DOMContentLoaded', function () {
  const imageCaption = document.querySelector('.image-caption');
  const imgElement = document.querySelector('img.bg-img');

  const imageInfo = {
    'assets/alex.jpg': {
      caption: `Photo by
      <a
        href="https://unsplash.com/@argtone?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >Alex Dukhanov</a
      >
      on
      <a
        href="https://unsplash.com/photos/uhRgPO215cE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >Unsplash</a
      >`,
    },
    'assets/giga.jpg': {
      caption: `Photo by
      <a
        href="https://unsplash.com/@gigakhurtsilava?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >Giga Khurtsilava</a
      >
      on
      <a
        href="https://unsplash.com/photos/5kwVYW8ZIHo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >Unsplash</a
      >`,
    },
    'assets/julia.jpg': {
      caption: `Photo by
      <a
        href="https://unsplash.com/@shots_of_aspartame?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >Julia Joppien</a
      >
      on
      <a
        href="https://unsplash.com/photos/G51K-d_klTE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >Unsplash</a
      >`,
    },
  };

  function updateImageCaption() {
    const imageSrc = imgElement.getAttribute('src');
    const info = imageInfo[imageSrc];
    if (info) {
      imageCaption.innerHTML = info.caption;
    } else {
      imageCaption.innerHTML = '';
    }
  }

  function changeImage() {
    const currentImageSrc = imgElement.getAttribute('src');
    const imageArray = ['assets/alex.jpg', 'assets/giga.jpg', 'assets/julia.jpg'];
    const currentIndex = imageArray.indexOf(currentImageSrc);
    const nextIndex = (currentIndex + 1) % imageArray.length;
    imgElement.setAttribute('src', imageArray[nextIndex]);
    updateImageCaption();
  }

  window.addEventListener('load', updateImageCaption);

  const logoElement = document.querySelector('.logo');
  logoElement.addEventListener('click', changeImage);

  const inputSelected = {};

  const inputElements = document.querySelectorAll('input');

  function validateInput(inputElement) {
    const value = inputElement.value;
    const validationType = inputElement.getAttribute('data-validate');
    const errorElement = inputElement.nextElementSibling;

    switch (validationType) {
      case 'password':
        if (value.length >= 8) {
          inputElement.classList.remove('error');
          errorElement.textContent = '';
        } else {
          inputElement.classList.add('error');
          errorElement.textContent = 'Password must be at least 8 characters long.';
        }
        break;

      // Add more cases for other input fields

      default:
        break;
    }
  }

  function liveCheckPasswordConfirmation() {
    const password = passwordElement.value;
    const passwordConfirmation = passwordConfirmationElement.value;

    if (password === passwordConfirmation) {
      passwordConfirmationElement.classList.remove('error');
      passwordConfirmationError.textContent = '';
    } else {
      passwordConfirmationElement.classList.add('error');
      passwordConfirmationError.textContent = 'Passwords do not match.';
    }
  }

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('focus', () => {
      inputSelected[inputElement.id] = true;
    });

    inputElement.addEventListener('blur', () => {
      if (inputSelected[inputElement.id]) {
        validateInput(inputElement);
      }
    });
  });

  const passwordElement = document.getElementById('password');
  const passwordConfirmationElement = document.getElementById('password-confirmation');
  const passwordConfirmationError = document.getElementById('password-confirmation-error');

  passwordElement.addEventListener('input', () => {
    inputSelected['password-confirmation'] = true;
    validateInput(passwordElement);
  });

  passwordConfirmationElement.addEventListener('input', liveCheckPasswordConfirmation);

  function validateForm(event) {
    const valid = inputElements.every((inputElement) => {
      validateInput(inputElement);
      return !inputElement.classList.contains('error');
    });

    if (!valid) {
      event.preventDefault(); // Prevent form submission if there are validation errors
    }
  }

  const formElement = document.getElementById('survey-form');
  formElement.addEventListener('submit', validateForm);
});
