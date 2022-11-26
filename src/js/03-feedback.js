import throttle from 'lodash.throttle';

// var throttle = require('lodash.throttle');

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    emailInput: document.querySelector('.feedback-form input'),
};

const STORAGE_KEY = "feedback-form-state";

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput(evt) {
    const emailValue = refs.emailInput.value;
    const messageValue = refs.textarea.value;

    const formData = { 
        email: emailValue,
        message: messageValue, 
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function formOutput() {
    const savedDataStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (savedDataStorage) {
        refs.textarea.value = savedDataStorage.message;
        refs.emailInput.value = savedDataStorage.email;
    }

};

function onFormSubmit(evt) {
    evt.preventDefault();

    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
       
};

formOutput();