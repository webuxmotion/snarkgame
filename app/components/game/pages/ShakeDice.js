import { Dice } from "../components/Dice";
import { generateInitialData } from "../generateInitialData";
import { getGameData, getRandomNumber, letters, modes, renderView, shakeDice, updateData } from "../utils";

export const ShakeDice = (data) => {
    
    const currentUserName = data.players[data.currentUserIndex].name;
    const statusMessage = `${currentUserName} кидає кості`;
    
    const view = `
        <div class="game__wrapper">
            <div class="game__row">
                <span class="game__new-game-link js-new-game">Грати нову гру</span>
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

            <div class="game__row">
                ${statusMessage}
            </div>

            <div class="game__row">
                <div class="game__dice-items">
                    <button class="game__dice-button js-shake-dice">КИНУТИ КОСТІ</button>
                    ${Dice('letter', 5)}
                    <div>
                        ${Dice('number', 1)}
                        ${Dice('number', 2)}
                    </div>
                </div>
            </div>
        </div>
    `;

    return view;
}

export const ShakeDiceEventListener = (event) => {
    if (event.target.classList.contains('js-shake-dice')) {
        const data = getGameData();
        const shakedResult = shakeDice(data);

        // const res = {};
        // for (let i = 0; i < 200000000; i++) {
        //     const shakedResult = shakeDice(data);
            
        //     if (!res?.[shakedResult[0]]) {
        //         res[shakedResult[0]] = 1;
        //     } else {
        //         res[shakedResult[0]] = res[shakedResult[0]] + 1;
        //     }
        // }
        // console.log(res);

        if (!shakedResult) {
            alert('Ви відповіли на всі запитання! Нічия');
            const newData = generateInitialData();

            updateData(newData);
            renderView(newData);
        } else {
            data.combination = shakedResult;
            data.mode = modes.CHOOSE_ANSWER;
    
            updateData(data);
            renderView(data);
        }
    }

    if (event.target.classList.contains('js-new-game')) {
        const data = getGameData();
        data.mode = modes.CHOOSE_PLAYERS_COUNT;
        
        updateData(data);
        renderView(data);
    }
}