// -- GLOBAL -- //
const MAX_CHARS = 150;
const textAreaEL = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedBackListEL = document.querySelector('.feedbacks');
const submitBtnEL = document.querySelector('.submit-btn');
const spinnerEl = document.querySelector('.spinner');
// -- COUNTER COMPONENT -- //

const inputHandler = () => {
    const maxNrChars = MAX_CHARS;
    const nrCharsTyped = textAreaEL.value.length;
    const charsLeft = maxNrChars - nrCharsTyped;
    counterEl.textContent = charsLeft;
};

textAreaEL.addEventListener('input', inputHandler);

// --  FORM COMPONENT -- // 

const showVisualIndicator = textCheck => {
    const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid';
    formEl.classList.add(className);
        
    setTimeout(() => {
        formEl.classList.remove(className)
    }, 2000);
}

const submitHandler = event => {
    event.preventDefault();

    const text = textAreaEL.value;

    if(text.includes('#') && text.length >= 5){
        showVisualIndicator('valid');

    } else {
        showVisualIndicator('invalid');
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

// -- FEEDBACK LIST COMPONENT -- //

fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
    .then(response => response.json())
    .then(data => {
        spinnerEl.remove();
    
        data.feedbacks.forEach(element => {
            const feedbackItemHTML = `
            <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${element.upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${element.badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${element.company}</p>
                <p class="feedback__text">${element.text}</p>
            </div>
                <p class="feedback__date">${element.daysAgo === 0 ? 'NEW' :  `${element.daysAgo}d`}</p>
            </li>`;
        
            feedBackListEL.insertAdjacentHTML('beforeend', feedbackItemHTML);
        });
    })
    .catch(error => {
        feedBackListEL.textContent = `Failed to fetch. Error message: ${error.message}`;
    });
    