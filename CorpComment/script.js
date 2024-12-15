// -- COUNTER COMPONENT --

const textAreaEL = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');

const inputHandler = () => {
    const maxNrChars = 150;

    const nrCharsTyped = textAreaEL.value.length;
    const charsLeft = maxNrChars - nrCharsTyped;
    counterEl.textContent = charsLeft;

};

textAreaEL.addEventListener('input', inputHandler);