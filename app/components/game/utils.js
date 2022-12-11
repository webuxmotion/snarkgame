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

export const getRandomNumbers = (max, count, exclude) => {
    const nums = [];
    
    while (nums.length < count) {
        const candidate = Math.floor(Math.random() * (max + 1));
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