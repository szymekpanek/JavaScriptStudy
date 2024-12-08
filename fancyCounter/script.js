// addEventListener('click')

const increaseButtonL = document.querySelector('.counter__button--increase');
const decreaseButtonL = document.querySelector('.counter__button--decrease');
const refreshButtonL = document.querySelector('.counter__reset-button')
const counterValueEL = document.querySelector('.counter__value');
const counterEL = document.querySelector('.counter');
const counterTitleEL = document.querySelector('.counter__title');

increaseButtonL.addEventListener('click', incrementCounter);

document.addEventListener('keydown', incrementCounter)

decreaseButtonL.addEventListener('click', decrementCounter);

refreshButtonL.addEventListener('click', function(){
    counterValueEL.textContent = 0;
    increaseButtonL.disabled = false;
    decreaseButtonL.disabled = false;
    counterEL.classList.remove('counter--limit');
    counterTitleEL.textContent = 'Fancy Counter';

    refreshButtonL.blur();
})


function incrementCounter(){
    //get current value
    const currentValue = counterValueEL.textContent;
    
    // convert value to number
    const currentValueAsNumber = +currentValue;

    //inc by 1 
    let newValue = currentValueAsNumber + 1;

    if(newValue > 5){
        newValue = 5;
        counterEL.classList.add('counter--limit');
        counterTitleEL.innerHTML = 'Limit! Buy <b>Pro<b> For > 5';
        increaseButtonL.disabled = true;
        decreaseButtonL.disabled = true;
    }

    //set value
    counterValueEL.textContent = newValue;
    increaseButtonL.blur();

}

function decrementCounter(){
    const currentValue = counterValueEL.textContent;
    const currentValueAsNumber = +currentValue;

    if(currentValue > 0){
        const newValue = currentValueAsNumber - 1;
        counterValueEL.textContent = newValue;
    }

    decreaseButtonL.blur();
}

