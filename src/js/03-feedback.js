import throttle from 'lodash.throttle';
// Импортируем функцию throttle из 'lodash.throttle'.

const feedbackFormRef = document.querySelector('.feedback-form');
const FORM_DATA_STORAGE_KEY = 'formData';
const unsubmittedFormData = {};
const restoredFormData = JSON.parse(
  localStorage.getItem(FORM_DATA_STORAGE_KEY)
);

function restoreUnsubmittedInputs() {
  if (restoredFormData) {
    Object.keys(restoredFormData).forEach(key => {
      document.querySelector(`[name=${key}]`).value = restoredFormData[key];
    });
  }
}

restoreUnsubmittedInputs();

function onFeedbackFormInput(evt) {
  unsubmittedFormData[evt.target.name] = evt.target.value;

  localStorage.setItem(
    FORM_DATA_STORAGE_KEY,
    JSON.stringify(unsubmittedFormData)
  );
}

feedbackFormRef.addEventListener('input', throttle(onFeedbackFormInput, 500));

feedbackFormRef.addEventListener('submit', evt => {
  evt.preventDefault();
  localStorage.removeItem(FORM_DATA_STORAGE_KEY);
  evt.currentTarget.reset();
});
