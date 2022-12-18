import { eventListener, changeEventListener } from './eventListener';
import { gameElement, getGameData, renderView } from './utils';

if (gameElement) {
    gameElement.addEventListener('click', eventListener);
    gameElement.addEventListener('change', changeEventListener);
    const game = getGameData();

    renderView(game);
}
