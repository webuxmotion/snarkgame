import { getGameData, modes, renderView, updateData } from "../utils";

export const ChoosePlayersCount = (data) => {
    
    const view = `
        <div class="game__wrapper">
            <div class="game__row">
                <div class="game__logo">
                    <h2 class="game__logo-big-text">Snark</h2>
                    <p class="game__logo-small-text">game</p>
                </div>
            </div>
            <div class="game__row">
            
                <div>
                    <input type="radio" id="one_player" name="playerCount" value="1" ${data.playersCount == 1 ? 'checked' : ''}>
                    <label for="one_player">ОДИН ГРАВЕЦЬ</label>
                </div>

                <div>
                    <input type="radio" id="two_players" name="playerCount" value="2" ${data.playersCount == 2 ? 'checked' : ''}>
                    <label for="two_players">ДВА ГРАВЦІ</label>
                </div>
        
            </div>
            <div class="game__row">
                <button class="js-set-players-count">ДАЛІ</button>
            </div>
        </div>
    `;

    return view;
}

export const ChoosePlayersCountEventListener = (event) => {
    if (event.target.classList.contains('js-set-players-count')) {
        const selectedRadioButtonValue = document.querySelector('input[name="playerCount"]:checked').value;

        const data = getGameData();

        data.playersCount = selectedRadioButtonValue;
        data.mode = modes.CHOOSE_PLAYERS_NAMES;

        const tmpPlayers = data.players && [...data.players];

        data.players = [];

        for (let i = 1; i <= data.playersCount; i++) {
            data.players.push({
                name: tmpPlayers?.[i - 1]?.name ? tmpPlayers?.[i - 1]?.name : `Player_${i}`,
                health: data.maxHealth,
            });
        }

        updateData(data);

        renderView(data);
    }
}