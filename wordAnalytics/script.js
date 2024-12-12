const textareaEL = document.querySelector('.textarea');

const charactersNumberEl = document.querySelector('.stat__number--characters');
const twitterNumberEl = document.querySelector('.stat__number--twitter');
const facebookNumberEl = document.querySelector('.stat__number--facebook');
const wordsNumberEl = document.querySelector('.stat__number--words');

const turnRed = (number, type) => {
    if (number < 0) {
        type.classList.add('stat__number--limit');
    } else {
        type.classList.remove('stat__number--limit');
    }
};

const wordCounter = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

const eventHandler = () => {
    const text = textareaEL.value;
    const numberOfCharacters = text.length;
    const twitterCharactersLeft = 280 - numberOfCharacters;
    const facebookCharactersLeft = 2200 - numberOfCharacters;


    if(textareaEL.value.includes('<script>')) {
        alert('You can\'t use <script> in your text')
        textareaEL.value = textareaEL.value.replace('<script>', '');
    }

    turnRed(twitterCharactersLeft, twitterNumberEl);
    turnRed(facebookCharactersLeft, facebookNumberEl);

    const numberOfWords = wordCounter(text);

    wordsNumberEl.textContent = numberOfWords;
    charactersNumberEl.textContent = numberOfCharacters;
    twitterNumberEl.textContent = twitterCharactersLeft;
    facebookNumberEl.textContent = facebookCharactersLeft;
};
textareaEL.addEventListener('input',eventHandler);
  
