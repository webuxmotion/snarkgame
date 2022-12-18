import map_1 from './map_1.json';
import { generatePassedQuestions, generateVariants, modes } from './utils';

export const generateInitialData = (rewriteData = {}) => {
    const variants = generateVariants(map_1);
    const passedQuestions = generatePassedQuestions(variants);

    return {
        mode: modes.CHOOSE_PLAYERS_COUNT,
        variants,
        passedQuestions,
        playersCount: 2,
        maxHealth: 3,
        ...rewriteData,
    }
}