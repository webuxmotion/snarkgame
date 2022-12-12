(() => {
  const rollButton = document.getElementById("roll-button");

  if (rollButton) {
    function rollDice() {
      const dice = [...document.querySelectorAll(".die-list")];
      dice.forEach(die => {
        toggleClasses(die);
        die.dataset.roll = getRandomNumber(1, 6);
      });
    }
    
    function toggleClasses(die) {
      die.classList.toggle("odd-roll");
      die.classList.toggle("even-roll");
    }
    
    function getRandomNumber(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    rollButton.addEventListener("click", rollDice);
  }
  
 
})();
  