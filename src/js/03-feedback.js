import throttle from 'lodash.throttle';
// Импортируем функцию throttle из 'lodash.throttle'.

const feedbackFormRef = document.querySelector('.feedback-form');
const FORM_DATA_STORAGE_KEY = 'formData';
const restoredFormData = JSON.parse(
  localStorage.getItem(FORM_DATA_STORAGE_KEY)
);
let formData = {};

function restoreUnsubmittedInputs() {
  if (restoredFormData) {
    Object.keys(restoredFormData).forEach(key => {
      document.querySelector(`[name=${key}]`).value = restoredFormData[key];
    });
    formData = JSON.parse(localStorage.getItem(FORM_DATA_STORAGE_KEY));
  }
}

restoreUnsubmittedInputs();

function onFeedbackFormInput(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem(FORM_DATA_STORAGE_KEY, JSON.stringify(formData));
}

feedbackFormRef.addEventListener('input', onFeedbackFormInput);

feedbackFormRef.addEventListener('submit', evt => {
  evt.preventDefault();

  let formDataValues = new FormData(feedbackFormRef);
  for (let inputElement of formDataValues) {
    if (inputElement.includes('')) {
      alert('Не все поля заполненны');
      return;
    }
  }

  for (let [name, value] of formDataValues) {
    console.log(`Вы внесли следующее значение в поле ${name}: ${value}`);
  }
  localStorage.removeItem(FORM_DATA_STORAGE_KEY);
  evt.currentTarget.reset();
  formData = {};
});
