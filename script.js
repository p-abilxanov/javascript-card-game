import IMAGE from "./info.js";

class Game {
    constructor() {
        this.structure = [];
    };

    setItem() {
        const MAIN = document.querySelector('.main');
        var myScore = 0;
        var oldValue, newValue;

        this.structure = this.random(IMAGE);
        var maxScore = this.structure.length / 2;

        this.structure.forEach((value, index) => {
            const LABEL = document.createElement('LABEL');
            LABEL.classList = 'main__item';
            LABEL.setAttribute('for', `main-item${index}`)
            MAIN.appendChild(LABEL);

            const RADIO = document.createElement('INPUT');
            RADIO.setAttribute('type', 'radio');
            RADIO.id = `main-item${index}`;
            LABEL.appendChild(RADIO);

            // 'IMAGE' DIN SIRTINA OBERTKASI  
            const DIVINNER = document.createElement('DIV');
            DIVINNER.classList = 'main__inner';
            LABEL.appendChild(DIVINNER);

            //BACKGROUND IMAGE
            const BACKIMG = document.createElement('IMG');
            BACKIMG.classList = 'back-img';
            BACKIMG.setAttribute('src', './img/background.PNG');
            DIVINNER.appendChild(BACKIMG);

            // CARD IMAGE
            const IMG = document.createElement('IMG');
            IMG.setAttribute('src', value.src);
            DIVINNER.appendChild(IMG);

            RADIO.addEventListener('change', function (element) {
                newValue = element.srcElement.parentElement.children[1].children[1];

                setTimeout(() => {
                    newValue.parentElement.classList.add('rotate');
                }, 0);

                setTimeout(() => {

                    // EKI O'ZGERIWSHI DA KIRITILSE
                    if (oldValue != undefined && newValue != undefined) {

                        // EKI O'ZGERIWSHI BIR-BIRINE TEN' BOLSA
                        if (oldValue.getAttribute('src') == newValue.getAttribute('src')) {
                            
                            // ADD CLASS 'DONE'
                            newValue.parentElement.classList.add('done');
                            oldValue.parentElement.classList.add('done');

                            // ADD ANIMATION
                            newValue.parentElement.querySelectorAll('img')[1].style = 'animation: done 1s cubic-bezier(0.77, 0, 0.175, 1)';
                            oldValue.parentElement.querySelectorAll('img')[1].style = 'animation: done 1s cubic-bezier(0.77, 0, 0.175, 1)';

                            // BASILG'AN 'CARD'LARDI QAYTIP BASILMAYTIN QILIW USHIN
                            newValue.parentElement.parentElement.children[0].setAttribute('disabled', 'disabled')
                            oldValue.parentElement.parentElement.children[0].setAttribute('disabled', 'disabled')

                            // COUNT MY SCORE
                            myScore++;
                            document.querySelector('.my-point span').innerHTML = myScore;
                        } else {
                            // ASHILIP QALGAN 'CARD'LARDI OBRATNO QAYTARIW USHIN
                            newValue.parentElement.parentElement.children[0].checked = false;
                            oldValue.parentElement.parentElement.children[0].checked = false;
                            oldValue.parentElement.classList.remove('rotate');
                            newValue.parentElement.classList.remove('rotate');
                        }

                        newValue = undefined;
                        oldValue = undefined;
                    }

                    if (maxScore == myScore) {
                        MAIN.innerHTML = '<div class = "winner-block">You WIN!</div>'
                    }

                    oldValue = newValue;
                }, 700);
            });

            MAIN.appendChild(LABEL);
        });
    };

    random(arr) {
        var arrayLength = arr.length;
        var result = [];
        var randomNumber;

        for (let i = 0; i < arrayLength; i++) {
            randomNumber = Math.floor(Math.random() * arr.length);
            result.push({
                src: arr[randomNumber],
                rotate: false
            });
            arr.splice(randomNumber, 1);
        }

        return result;
    }
}

let game = new Game();
game.setItem();