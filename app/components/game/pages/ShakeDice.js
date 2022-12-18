import { Dice } from "../components/Dice";
import { getGameData, modes, renderView, updateData } from "../utils";

export const ShakeDice = (data) => {
    
    const currentUserName = data.players[data.currentUserIndex].name;
    const statusMessage = `${currentUserName} кидає кості`;
    
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

            <div class="game__row">
                <div class="game__dice-items">
                    ${Dice('letter', 6)}
                    <div>
                        ${Dice('number', 1)}
                        ${Dice('number', 2)}
                    </div>
                </div>
            </div>
            
            <div class="game__row">
                <button class="js-shake-dice">КИНУТИ КОСТІ</button>
            </div>

            <div class="game__row">
                ${statusMessage}
            </div>
        </div>
    `;

    return view;
}

export const ShakeDiceEventListener = (event) => {
    if (event.target.classList.contains('js-shake-dice')) {
        console.log('shake');
    }

    if (event.target.classList.contains('js-new-game')) {
        const data = getGameData();
        data.mode = modes.CHOOSE_PLAYERS_COUNT;
        
        updateData(data);
        renderView(data);
    }
}