import { Dice } from "../components/Dice";
import map_1 from '../map_1.json';
import { getGameData, getRandomNumber, letters, modes, renderView, updateData } from "../utils";

export const ChooseAnswer = (data) => {
    
    const currentUserName = data.players[data.currentUserIndex].name;
    const statusMessage = `${currentUserName} відповідає`;

    const combinationKey = data.combination[0];
    const passedQuestions = data.mode == modes.CHECK_ANSWER ? data.passedQuestions[combinationKey] - 1 : data.passedQuestions[combinationKey];
    const variants = data.variants[combinationKey];

    const currentVariants = variants[passedQuestions];
    const currentQuestion = map_1[combinationKey].questions[passedQuestions][0];

    const getModal = () => {
        const selectedAnswer = data?.selectedAnswer;
        const rightAnswer = map_1[combinationKey].questions?.[passedQuestions][1];
        let isRightAnswer = selectedAnswer == rightAnswer;
        
        return `
            <div class="game__modal">
                <img src="${`/images/maps/map_1/${combinationKey}.png`}" alt="flag">
                <div>${currentQuestion}</div>
                <div>${data?.selectedAnswer}</div>
                ${isRightAnswer}
            </div>
            <div class="game__modal-backdrop"></div>
        `;
    }
    
    const view = `
        <div class="game__wrapper">
            <div class="game__row">
                <button class="js-new-game">Грати нову гру</button>
            </div>
            <div class="game__row">
                ${data.players.map((player, playerIndex) => {
                    const health = [];

                    for (let i = 1; i <= data.maxHealth; i++) {
                        if (i <= player.health) {
                            health.push(1);
                        } else {
                            health.push(0);
                        }
                    }

                    const isActive = data.currentUserIndex == playerIndex;

                    return `
                        <div>
                            <label for="player_${playerIndex + 1}">ГРАВЕЦЬ ${playerIndex + 1}</label>
                            <input
                                id="player_${playerIndex + 1}" 
                                value="${player.name}"
                                data-player-index="${playerIndex}"
                                type="text"
                                class="js-player-name-input"
                            >
                            ${health.map((item) => {
                                return `
                                    ${item}
                                `;
                            }).join('')}
                            ${isActive ? 'Active' : ''}
                        </div>
                    `;
                }).join('')}
            </div>
            <img src="${`/images/maps/map_1/${combinationKey}.png`}" alt="flag">

            <div class="game__row">
                <div class="game__dice-items-row">
                    ${Dice('letter', data.combination[1][0])}
                    ${Dice('number', data.combination[1][1])}
                    ${Dice('number', data.combination[1][2])}
                </div>
            </div>

            <div class="game__row">
                ${data.combination[0]} Знайти на карті
            </div>

            <div class="game__row">
                <h1>${currentQuestion}</h1>
            </div>

            <div class="game__row">
                ${currentVariants.map((item, itemIndex) => {
                    return `
                        <div>
                            <input 
                                type="radio" 
                                id="variant_${itemIndex}" 
                                name="answer" 
                                value="${item}"
                                ${item == data?.selectedAnswer ? 'checked' : ''}
                            >
                            <label for="variant_${itemIndex}">${item}</label>
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="game__row js-error-wrapper">
                
            </div>
            
            <div class="game__row">
                <button class="js-confirm-answer">ПІДТВЕРДИТИ</button>
            </div>

            <div class="game__row">
                ${statusMessage}
            </div>

            ${data.mode == modes.CHECK_ANSWER ? getModal() : ''}
        </div>
    `;

    return view;
}

export const ChooseAnswerEventListener = (event) => {
    if (event.target.classList.contains('js-confirm-answer')) {
        const data = getGameData();
        
        if (data.mode !== modes.CHECK_ANSWER) {

            const selectedAnswerValue = document.querySelector('input[name="answer"]:checked')?.value;
            const errorWrapper = document.querySelector('.js-error-wrapper');
    
            if (selectedAnswerValue) {
                errorWrapper.innerHTML = '';
    
                data.selectedAnswer = selectedAnswerValue;
    
                const combinationKey = data.combination[0];
                const passedQuestions = data.passedQuestions[combinationKey];
                data.passedQuestions[combinationKey] = passedQuestions + 1;
                data.mode = modes.CHECK_ANSWER;
    
                updateData(data);
                renderView(data);
            } else {
                const errorMessageView = `
                    <p class="game__error-message">Виберіть варіант</p>
                `;
    
                errorWrapper.innerHTML = errorMessageView;
            }

        }
    }
}