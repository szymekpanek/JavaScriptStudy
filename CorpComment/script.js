// -- GLOBAL -- //
const MAX_CHARS = 150;
const URL = 'https://bytegrad.com/course-assets/js/1/api';

const textAreaEL = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedBackListEL = document.querySelector('.feedbacks');
const submitBtnEL = document.querySelector('.submit-btn');
const spinnerEl = document.querySelector('.spinner');
const HashTagListEL = document.querySelector('.hashtags');

const renderFeedbackItem = feedbackItem => {
    const feedbackItemHTML = `
    <li class="feedback">
    <button class="upvote">
        <i class="fa-solid fa-caret-up upvote__icon"></i>
        <span class="upvote__count">${feedbackItem.upvoteCount}</span>
    </button>
    <section class="feedback__badge">
        <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
    </section>
    <div class="feedback__content">
        <p class="feedback__company">${feedbackItem.company}</p>
        <p class="feedback__text">${feedbackItem.text}</p>
    </div>
        <p class="feedback__date">${feedbackItem.daysAgo === 0 ? 'NEW' :  '${feedbackItem.daysAgo}d'}</p>
    </li>`

    feedBackListEL.insertAdjacentHTML('beforeend', feedbackItemHTML);
}

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

    const feedbackItem = {
        upvoteCount,
        company,
        daysAgo,
        badgeLetter,
        text
    };
    renderFeedbackItem(feedbackItem);

    fetch(`${URL}/feedbacks`, {
        method: 'POST', 
        body: JSON.stringify(feedbackItem),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(!response.ok){return console.log('sth went wrong')}
        console.log('OK');
        }).catch(e => console.log(e));


    textAreaEL.value = '';
    submitBtnEL.blur();
    counterEl.textContent = MAX_CHARS;
        
};
formEl.addEventListener('submit', submitHandler);

// -- FEEDBACK LIST COMPONENT -- //

const clickHandler = () => {
    const clickedEl = event.target;

    const upvoteIntention = clickedEl.className.includes('upvote');
    
    if(upvoteIntention){
        const upvoteBtnEl = clickedEl.closest('.upvote');
        upvoteBtnEl.disabled = true;

        const upvoteCountEl = upvoteBtnEl.querySelector('.upvote__count'); //important
        let upvoteCount = +upvoteCountEl.textContent;

        upvoteCountEl.textContent = ++upvoteCount;

    }else clickedEl.closest('.feedback').classList.toggle('feedback--expand');
};

feedBackListEL.addEventListener('click', clickHandler);

fetch(`${URL}/feedbacks`)
    .then(response => response.json())
    .then(data => {
        spinnerEl.remove();
        data.feedbacks.forEach(feedbackItem => renderFeedbackItem(feedbackItem));
    })
    .catch(error => {
        feedBackListEL.textContent = `Failed to fetch. Error message: ${error.message}`;
    });
    

// -- HASHTAG LIST COMPONENT -- 
const HashTagClickHandler = event => {
    const clickedEl = event.target;

    if(clickedEl.className === 'hashtags') return; 

    const companyNameFromHashtag = clickedEl.textContent.substring(1).toLowerCase().trim();

    feedBackListEL.childNodes.forEach(childNode => {
        if(childNode.nodeType === 3) return; 

        const companyNameFromFeedbackItem = childNode.querySelector('.feedback__company').textContent.toLowerCase().trim();

        if(companyNameFromHashtag !== companyNameFromFeedbackItem){
            childNode.remove();
        }
    });

    
};

HashTagListEL.addEventListener('click', HashTagClickHandler);