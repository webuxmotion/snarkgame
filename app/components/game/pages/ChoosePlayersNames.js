import { getGameData, modes, renderView, updateData } from "../utils";

export const ChoosePlayersNames = (data) => {
    
    const view = `
        <div class="game__wrapper">
            <div class="game__row">
                <button class="js-go-to-players-count-page">Go back</button>
                <div class="game__logo">
                    <h2 class="game__logo-big-text">Snark</h2>
                    <p class="game__logo-small-text">game</p>
                </div>
            </div>
            <div class="game__row">
            
                ${data.players.map((player, playerIndex) => {
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
                        </div>
                    `;
                }).join('')}
        
            </div>
            <div class="game__row">
                <button class="js-set-players-names">ГРАТИ</button>
            </div>
        </div>
    `;

    return view;
}

export const ChoosePlayersNamesEventListener = (event) => {
    if (event.target.classList.contains('js-set-players-names')) {
        const data = getGameData();

        data.currentUserIndex = 0;

        data.mode = modes.SHAKE_DICE;

        updateData(data);
        renderView(data);
    }
    
    if (event.target.classList.contains('js-go-to-players-count-page')) {
        const data = getGameData();

        data.mode = modes.CHOOSE_PLAYERS_COUNT;

        updateData(data);
        renderView(data);
    }
}

export const ChoosePlayersNamesChangeEventListener = (event) => {
   
    if (event.target.classList.contains('js-player-name-input')) {
        const playerIndex = event.target.dataset?.playerIndex;
        const inputValue = event.target.value;

        const data = getGameData();
        data.players[playerIndex].name = inputValue ? inputValue : `Player_${parseInt(playerIndex) + 1}`;
        
        updateData(data);
        renderView(data);
    }
}