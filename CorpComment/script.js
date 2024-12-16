// -- GLOBAL -- //
const MAX_CHARS = 150;
const textAreaEL = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedBackListEL = document.querySelector('.feedbacks');
const submitBtnEL = document.querySelector('.submit-btn');

// -- COUNTER COMPONENT -- //

const inputHandler = () => {
    const maxNrChars = MAX_CHARS;
    const nrCharsTyped = textAreaEL.value.length;
    const charsLeft = maxNrChars - nrCharsTyped;
    counterEl.textContent = charsLeft;
};

textAreaEL.addEventListener('input', inputHandler);

// --  FORM COMPONENT -- // 

const submitHandler = event => {
    event.preventDefault();

    const text = textAreaEL.value;

    if(text.includes('#') && text.length >= 5){
        formEl.classList.add('form--valid');
        
        setTimeout(() => {
            formEl.classList.remove('form--valid')
        }, 2000);

    } else {
        formEl.classList.add('form--invalid');

        setTimeout(() => {
            formEl.classList.remove('form--invalid')
        }, 2000);

        textAreaEL.focus();
        return;
    }

    const hashtag = text.split(' ').find(word => word.includes('#'));
    const company = hashtag.substring(1);
    const badgeLetter = company.substring(0 , 1).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;
    
    const feedbackItemHTML = `
    <li class="feedback">
    <button class="upvote">
        <i class="fa-solid fa-caret-up upvote__icon"></i>
        <span class="upvote__count">${upvoteCount}</span>
    </button>
    <section class="feedback__badge">
        <p class="feedback__letter">${badgeLetter}</p>
    </section>
    <div class="feedback__content">
        <p class="feedback__company">${company}</p>
        <p class="feedback__text">${text}</p>
    </div>
        <p class="feedback__date">${daysAgo === 0 ? 'NEW' :  '${daysAgo}d'}</p>
    </li>`

    feedBackListEL.insertAdjacentHTML('beforeend', feedbackItemHTML);

    textAreaEL.value = '';
    submitBtnEL.blur();
    counterEl.textContent = MAX_CHARS;

        
};
formEl.addEventListener('submit', submitHandler);