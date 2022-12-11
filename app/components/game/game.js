import top60 from './top60';
import countries from './countries.json';
import { getVariants } from './utils';

const gameElement = document.getElementById('game');

if (gameElement) {
    const initialValues = {
        lives: 3,
        currentStep: 0,
        maxSteps: 5,
    };

    const data = [];
    let game = { ...initialValues };

    const clearOtherVariants = () => {
        const variantsWrappers = document.querySelectorAll('.js-card-variants');
        variantsWrappers.forEach(el => el.innerHTML = '');
    }

    const drawStatus = () => {
        const statusElement = document.querySelector('.js-status');
        
        const statusContent = `
            <p>Залишилось життів: ${game.lives}</p>
            <p>Питань пройдено: ${game.currentStep} з ${game.maxSteps}</p>
        `;

        statusElement.innerHTML = statusContent;
    }

    const clearSuccessOrFailureStates = () => {
        const cardElements = document.querySelectorAll('.js-card');
        cardElements.forEach(el => {
            el.classList.remove('is-success');
            el.classList.remove('is-error');
        })
    }

    const generateData = () => {
        top60.forEach((item) => {
            const finded = countries.find(el => el.name == item);
        
            const parts = finded.flag.split('/');
            const flagAttr = parts?.[parts.length - 1].split('.')[0].toUpperCase();
        
            finded.flagAttr = flagAttr;
        
            data.push(finded);
        });
    }

    const drawField = () => {
        const items = `
            <div class="status js-status"></div>
            <div class="game">
            ${data.map((el, idx) => {
                return `
                    <div class="game__card js-card" data-id="${idx}">
                        <div class="game__card-inner">
                            <img 
                                class="game__image"
                                src="https://www.prosperity.com/application/js/rank_table/assets/images/flags/${el.flagAttr}_FLAG.png"
                            >
                        </div>
                        <div class="js-card-variants"></div>
                    </div>
                `;
            }).join('')}
            </div>
        `;

        gameElement.innerHTML = items;
    }
    
    const addEventListener = () => {
        gameElement.addEventListener('click', (event) => {
            const cardElement = event.target.closest('.js-card');
    
            if (cardElement) {
                const id = cardElement.dataset.id;
                const country = data[id];
                const variantsWrapperElement = cardElement.querySelector('.js-card-variants');
    
                const variantElement = event.target.closest('.js-variant-item');
    
                if (variantElement) {
                    const name = variantElement.dataset.name;
                    const countryName = country.name;
                    cardElement.classList.remove('is-success');
                    cardElement.classList.remove('is-error');
    
                    if (name == countryName) {
                        cardElement.classList.add('is-success');
                    } else {
                        cardElement.classList.add('is-error');
                        game.lives--;
                    }
    
                    variantsWrapperElement.innerHTML = '';

                    game.currentStep++;

                    drawStatus();

                    if (game.currentStep == game.maxSteps || game.lives <= 0) {
                        setTimeout(() => {
                            if (game.lives <= 0) {
                                alert("Ви програли :(");
                                reset();
                            } else {
                                alert("Ви виграли :)");
                                reset();
                            }
                        }, 30);
                    }
                } else {
                    
                    if (
                        (!cardElement.classList.contains('is-error') && !cardElement.classList.contains('is-success'))
                        &&
                        (!variantsWrapperElement.innerHTML)
                    ) {
                        clearOtherVariants();
                        const variants = getVariants(data, id);
    
                        const items = `
                            <div class="variants">
                                ${variants.map((el, idx) => {
                                    return `
                                        <div class="variants__item js-variant-item" data-name="${el}">
                                            ${el}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        `;
            
                        variantsWrapperElement.innerHTML = items;
                    }
                }
    
            }
        });
    }

    const reset = () => {
        game = { ...initialValues };

        clearOtherVariants();
        clearSuccessOrFailureStates();
        drawStatus();
    }

    generateData();
    drawField();
    drawStatus();
    addEventListener();
}
