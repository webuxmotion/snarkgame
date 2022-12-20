import top60 from './top60';
import countries from './countries.json';
import { generateInitialData } from './generateInitialData';
import { ChoosePlayersCount } from './pages/ChoosePlayersCount';
import { ChoosePlayersNames } from './pages/ChoosePlayersNames';
import { ShakeDice } from './pages/ShakeDice';
import { ChooseAnswer } from './pages/ChooseAnswer';

export const gameElement = document.getElementById('game');
export const localStorageKey = 'gameData';
export const modes = {
    CHOOSE_PLAYERS_COUNT: "CHOOSE_PLAYERS_COUNT",
    CHOOSE_PLAYERS_NAMES: "CHOOSE_PLAYERS_NAMES",
    SHAKE_DICE: "SHAKE_DICE",
    CHOOSE_ANSWER: "CHOOSE_ANSWER",
    CHECK_ANSWER: "CHECK_ANSWER"
};
export const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

export const getVariants = (countries, id) => {
    const idNum = parseInt(id);

    const randomNumbers = getRandomNumbers(countries.length - 1, 3, parseInt(idNum));
    randomNumbers.push(idNum);

    const shuffledArray = shuffleArray(randomNumbers);

    const variants = [];

    shuffledArray.forEach(item => {
        const variantName = countries[item].name;

        variants.push(variantName);
    });

    return variants;
}

export const getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
}

export const getRandomNumbers = (max, count, exclude) => {
    const nums = [];

    while (nums.length < count) {
        const candidate = getRandomNumber(max);
        const finded = nums.find(el => el == candidate);
        if (
            candidate !== exclude && (!finded && finded !== 0)
        ) {
            nums.push(candidate);
        }
    }

    return nums;
}

export const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

export const generateData = (names, source) => {
    const data = [];

    names.forEach((item) => {
        const finded = source.find(el => el.name == item);

        const parts = finded.flag.split('/');
        const flagAttr = parts?.[parts.length - 1].split('.')[0].toUpperCase();

        finded.flagAttr = flagAttr;

        data.push(finded);
    });

    return data;
}

export const generateFieldsMapping = () => {
    const colsCount = 10;
    const mapping = {};
    let count = 0;

    letters.forEach((rowKey) => {
        let rowCount = 0;
        for (let i = 0; i < colsCount; i++) {
            rowCount++;
            const key = rowKey + rowCount;
            mapping[key] = count;
            count++;

        }
    });

    return mapping;
}

export const generateMap = (source) => {
    const map = {};
    const mapping = generateFieldsMapping();

    Object.keys(mapping).forEach(el => {
        const countryKey = mapping[el];

        const country = source[countryKey];

        const item = {};
        const questions = [];
        questions.push(['Яка назва країни?', country.name]);
        questions.push(['Яка столиця країни?', country.capital]);

        item.questions = questions;
        item.meta = {
            ...country
        };

        map[el] = item;
    });

    return map;
}

export const getCountriesMap = () => {
    const source = generateData(top60, countries);
    const map = generateMap(source);

    return map;
}

export const generateVariants = (mapData) => {
    const variants = {};
    const keys = Object.keys(mapData);

    keys.forEach((key, keyIndex) => {
        const item = mapData[key];

        const questions = [];

        item.questions.forEach((_) => {
            const sourceArray = [...getRandomNumbers(keys.length - 1, 3, keyIndex), keyIndex];
            const numbers = shuffleArray(sourceArray);

            questions.push(numbers);
        });

        const variantsArray = [];

        questions.forEach((numbers, questionIndex) => {
            const names = [];

            numbers.forEach((number) => {
                const mapDataItem = mapData[keys[number]];
                names.push(mapDataItem.questions[questionIndex][1]);
            });

            variantsArray.push(names);
        });

        variants[key] = variantsArray;
    });

    return variants;
}

export const generatePassedQuestions = (variants) => {
    const data = {};

    Object.keys(variants).forEach((variantKey) => {
        data[variantKey] = 0;
    });

    return data;
}

export const updateData = (data) => localStorage.setItem(localStorageKey, JSON.stringify(data));
export const getData = () => JSON.parse(localStorage.getItem(localStorageKey));

export const getGameData = (reset = false) => {
    let game;
    const gameDataFromStorage = getData();

    if (gameDataFromStorage && !reset) {
        game = gameDataFromStorage;
    } else {
        const newData = generateInitialData();
        updateData(newData);
        game = newData;
    }

    return game;
}

export const renderView = (data) => {
    let view;

    switch (data.mode) {
        case modes.CHOOSE_PLAYERS_COUNT: {
            view = ChoosePlayersCount(data);
            break;
        }

        case modes.CHOOSE_PLAYERS_NAMES: {
            view = ChoosePlayersNames(data);
            break;
        }

        case modes.SHAKE_DICE: {
            view = ShakeDice(data);
            break;
        }

        case modes.CHOOSE_ANSWER:
        case modes.CHECK_ANSWER: {
            view = ChooseAnswer(data);
            break;
        }

        default: {
            view = data.mode;
        }
    }

    gameElement.innerHTML = view;
}

export const shakeDice = (data, count = 0) => {
    const num1 = getRandomNumber(5);
    let num2 = getRandomNumber(5);
    let num3 = getRandomNumber(5);

    if (num2 == 0 && num3 == 0) {
        num2 = getRandomNumber(4) + 1;
    } else if (num2 == 0) {
        num3 = getRandomNumber(4) + 1;
    } else if (num3 == 0) {
        num2 = getRandomNumber(4) + 1;
    }
    
    const stringKey = letters[num1] + (num2 + num3);
    const numsInArrayKey = [num1, num2, num3];

    const passedQuestionsCount = data.passedQuestions[stringKey];
    const variants = data.variants[stringKey];
    
    if (passedQuestionsCount >= variants.length) {
        if (count < 200) {
            return shakeDice(data, count + 1);
        } else {
            return false;
        }
    };

    return [stringKey, numsInArrayKey];
}

export const getNextPlayerIndex = (data) => {
    const { currentUserIndex, players } = data;
    let nextIndexCandidate = currentUserIndex + 1;

    if (!players?.[nextIndexCandidate]) {
        nextIndexCandidate = 0;
    }

    return nextIndexCandidate;
}