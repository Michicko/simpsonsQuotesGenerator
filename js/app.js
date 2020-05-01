const loader = document.querySelector('#loader');
const errorContainer = document.querySelector('.error-div');
const display = document.querySelector('.display');
const getQuote = document.querySelector('#get-quote');
const btnDiv = document.querySelector('.btn-div');

getQuote.addEventListener('click', getNewQuote);
document.addEventListener('DOMContentLoaded', getNewQuote);

function getNewQuote() {
    display.style.display = 'none';
    errorContainer.style.display = 'none';
    btnDiv.style.display = 'none';
    loader.style.display = 'block';

    const xhr = new XMLHttpRequest();
    xhr.timeout = 5000;

    xhr.open('GET', 'https://thesimpsonsquoteapi.glitch.me/quotes', true);

    xhr.onload = function (err) {
        if (this.status === 200) {
            setTimeout(() => {
                // loader
                loader.style.display = 'none';
                btnDiv.style.display = 'block';
                const item = JSON.parse(this.responseText);
                displayQuote(item[0]);
            }, 500);
            
        } else {
            errorContainer.style.display = 'block';
        }
    }

    // on timeout
    xhr.ontimeout = function () {
        // console.log('Timeout...');
        loader.style.display = 'none';
        btnDiv.style.display = 'block';
        errorContainer.style.display = 'block';
    }

    xhr.send();
}

function displayQuote(item) {
    let html = `
    <div class="img-div">
    <img src="${item.image}">
    </div>
    <div class="text-div">
        <p class="quote">${item.quote}</p>
        <span class="info">--${item.character}</span>
    </div>
    `;
    
    display.innerHTML = html;
    displ(item.characterDirection);
}

function displ(item) {
    const imgDiv = document.querySelector('.img-div');
    const textDiv = document.querySelector('.text-div');
    dir = item === "Right" ? { img: 2, text: 1 , display: 'grid'} : "Left" ? { img: 1, text: 2, display:'grid'} : {img: 'none', text: 'none', display: 'block'}
    imgDiv.style.order = dir.img;
    textDiv.style.order = dir.text;
    display.style.display = dir.display;
}

