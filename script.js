const effectivenessContainer = document.querySelector('.effectiveness-container');
const attackType = document.getElementById('attack-type');
const defenseType1 = document.getElementById('defense-type-1');
const defenseType2 = document.getElementById('defense-type-2');

const effectivenessObj = {
  normal: {
    super: [],
    not: ['rock', 'steel'],
    no: ['ghost']
  },
  fire: {
    super: ['grass', 'ice', 'bug', 'steel'],
    not: ['fire', 'water', 'rock', 'dragon'],
    no: [],
  },
  water: {
    super: ['fire', 'ground', 'rock'],
    not: ['water', 'grass', 'dragon'],
    no: []
  },
  electric: {
    super: ['water', 'flying'],
    not: ['electric', 'grass', 'dragon'],
    no: ['ground']
  },
  grass: {
    super: ['water', 'ground', 'rock'],
    not: ['fire', 'grass', 'poison', 'flying', 'bug', 'dragon', 'steel'],
    no: []
  },
  ice: {
    super: ['grass', 'ground', 'flying', 'dragon'],
    not: ['fire', 'water', 'ice', 'steel'],
    no: []
  },
  fighting: {
    super: ['normal', 'ice', 'rock', 'dark', 'steel'],
    not: ['poison', 'flying', 'psychic', 'bug'],
    no: ['ghost']
  },
  poison: {
    super: ['grass'],
    not: ['poison', 'ground', 'rock', 'ghost'],
    no: ['steel']
  },
  ground: {
    super: ['fire', 'electric', 'poison', 'rock', 'steel'],
    not: ['grass', 'bug'],
    no: ['flying']
  },
  flying: {
    super: ['grass', 'fighting', 'bug'],
    not: ['electric', 'rock', 'steel'],
    no: []
  },
  psychic: {
    super: ['fighting', 'poison'],
    not: ['psychic', 'steel'],
    no: ['dark']
  },
  bug: {
    super: ['grass', 'psychic', 'dark'],
    not: ['fire', 'fighting', 'poison', 'flying', 'ghost', 'steel'],
    no: []
  },
  rock: {
    super: ['fire', 'ice', 'flying', 'bug'],
    not: ['fighting', 'ground', 'steel'],
    no: []
  },
  ghost: {
    super: ['psychic', 'ghost'],
    not: ['dark', 'steel'],
    no: ['normal']
  },
  dragon: {
    super: ['dragon'],
    not: ['steel'],
    no: []
  },
  dark: {
    super: [],
    not: ['rock', 'steel'],
    no: ['ghost']
  },
  steel: {
    super: ['ice', 'rock'],
    not: ['fire', 'water', 'electric', 'steel'],
    no: []
  }
}

let totalEffectiveness = "x1";

// Caclulate effectiveness
function calculateEffectiveness() {
  const selectedAttackType = attackType.value;
  const selectedDefenseType1 = defenseType1.value;
  const selectedDefenseType2 = defenseType2.value;

  // Find effectiveness against first defense type
  let effectiveness1 = 1;

  if (effectivenessObj[selectedAttackType].super.includes(selectedDefenseType1)) {
    effectiveness1 = 2;
  } else if (effectivenessObj[selectedAttackType].not.includes(selectedDefenseType1)) {
    effectiveness1 = 0.5;
  } else if (effectivenessObj[selectedAttackType].no.includes(selectedDefenseType1)) {
    effectiveness1 = 0;
  } else {
    effectiveness1 = 1;
  }
  
  // Find effectiveness against second defense type
  let effectiveness2 = 1;
  if (effectivenessObj[selectedAttackType].super.includes(selectedDefenseType2)) {
    effectiveness2 = 2;
  } else if (effectivenessObj[selectedAttackType].not.includes(selectedDefenseType2)) {
    effectiveness2 = 0.5;
  } else if (effectivenessObj[selectedAttackType].no.includes(selectedDefenseType2)) {
    effectiveness2 = 0;
  } else {
    effectiveness2 = 1;
  }

  // Get total effectiveness
  totalEffectiveness = `x${effectiveness1 * effectiveness2}`;

  updateDOM();
}

// Update DOM
function updateDOM() {
  const effectivenessEl = document.createElement('p');
  effectivenessContainer.innerHTML = '<h3>Effectiveness multiplier</h3>';
  effectivenessContainer.appendChild(effectivenessEl);
  effectivenessEl.classList.add('multiplier');
  effectivenessEl.innerHTML = totalEffectiveness;
}

// Event listeners
attackType.addEventListener('change', calculateEffectiveness);
defenseType1.addEventListener('change', calculateEffectiveness);
defenseType2.addEventListener('change', calculateEffectiveness);

updateDOM();