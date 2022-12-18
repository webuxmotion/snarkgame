import { letters } from "../utils";

export const Dice = (type, number) => {
    let content;

    if (type == 'letter') {
        content = letters?.[number];
    } else if (type == 'number') {
        content = `
            <div class="game-dice__dots ${`show-${number}-dots`}">
                <div class="game-dice__dot"></div>
                <div class="game-dice__dot"></div>
                <div class="game-dice__dot"></div>
                <div class="game-dice__dot"></div>
                <div class="game-dice__dot"></div>
            </div>
        `;
    }

    let view = `
        <div class="game-dice">
            ${content}
        </div>
    `;

    return view;
}