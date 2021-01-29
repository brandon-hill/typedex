const effectivenessContainer = document.querySelector('.effectiveness-container');
const attackType = document.getElementById('attack-type');
const defenseType1 = document.getElementById('defense-type-1');
const defenseType2 = document.getElementById('defense-type-2');
const gen2through5btn = document.getElementById('gen-2-5-btn');
const gen6btn = document.getElementById('gen-6-btn');

// Gen 2-5 effectiveness object
const oldEffectivenessObj = {
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
    super: ['psychic', 'ghost'],
    not: ['fighting', 'dark', 'steel'],
    no: ['ghost']
  },
  steel: {
    super: ['ice', 'rock'],
    not: ['fire', 'water', 'electric', 'steel'],
    no: []
  }
}

// Gen 6+ effectiveness object
const currentEffectivenessObj = {
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
    not: ['poison', 'flying', 'psychic', 'bug', 'fairy'],
    no: ['ghost']
  },
  poison: {
    super: ['grass', 'fairy'],
    not: ['poison', 'ground', 'rock'],
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
    not: ['fire', 'fighting', 'poison', 'flying', 'ghost', 'steel', 'fairy'],
    no: []
  },
  rock: {
    super: ['fire', 'ice', 'flying', 'bug'],
    not: ['fighting', 'ground', 'steel'],
    no: []
  },
  ghost: {
    super: ['psychic', 'ghost'],
    not: ['dark'],
    no: ['normal']
  },
  dragon: {
    super: ['dragon'],
    not: ['steel'],
    no: ['fairy']
  },
  dark: {
    super: ['psychic', 'ghost'],
    not: ['fighting', 'dark', 'fairy'],
    no: ['ghost']
  },
  steel: {
    super: ['ice', 'rock', 'fairy'],
    not: ['fire', 'water', 'electric', 'steel'],
    no: []
  },
  fairy: {
    super: ['fighting', 'dragon', 'dark'],
    not: ['fire', 'poison', 'steel'],
    no: []
  }
}

let totalEffectiveness = 'x1';
let selectedGen = currentEffectivenessObj;

// Caclulate effectiveness
function calculateEffectiveness() {
  const selectedAttackType = attackType.value;
  const selectedDefenseType1 = defenseType1.value;
  const selectedDefenseType2 = defenseType2.value;

  // Ensure no duplicate defending types
  const defense1Types = defenseType1.getElementsByTagName('option');
  for (var i = 0; i < defense1Types.length; i++) {
    (defense1Types[i].value == selectedDefenseType2)
      ? defense1Types[i].disabled = true
      : defense1Types[i].disabled = false;
  }

  const defense2Types = defenseType2.getElementsByTagName('option');
  for (var i = 0; i < defense2Types.length; i++) {
    (defense2Types[i].value == selectedDefenseType1)
      ? defense2Types[i].disabled = true
      : defense2Types[i].disabled = false;
  }


  // Find effectiveness against first defense type
  let effectiveness1 = 1;
  if (selectedGen[selectedAttackType].super.includes(selectedDefenseType1)) {
    effectiveness1 = 2;
  } else if (selectedGen[selectedAttackType].not.includes(selectedDefenseType1)) {
    effectiveness1 = 0.5;
  } else if (selectedGen[selectedAttackType].no.includes(selectedDefenseType1)) {
    effectiveness1 = 0;
  } else {
    effectiveness1 = 1;
  }
  
  // Find effectiveness against second defense type
  let effectiveness2 = 1;
  if (selectedGen[selectedAttackType].super.includes(selectedDefenseType2)) {
    effectiveness2 = 2;
  } else if (selectedGen[selectedAttackType].not.includes(selectedDefenseType2)) {
    effectiveness2 = 0.5;
  } else if (selectedGen[selectedAttackType].no.includes(selectedDefenseType2)) {
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
defenseType1.addEventListener('change', calculateEffectiveness)
defenseType2.addEventListener('change', calculateEffectiveness);

gen2through5btn.addEventListener('click', e => {
  selectedGen = oldEffectivenessObj;

  if(!e.currentTarget.classList.contains('selected')) {

    // Remove fairy option
    attackType.remove(17);
    defenseType1.remove(17);
    defenseType2.remove(18);

    // Toggle buttons
    e.currentTarget.classList.toggle('selected');
    gen6btn.classList.toggle('selected');

    calculateEffectiveness();
  }  
});

gen6btn.addEventListener('click', e => {
  if(!e.currentTarget.classList.contains('selected')) {
    selectedGen = currentEffectivenessObj;

    // Add fairy option
    const fairyOption1 = document.createElement('option');
    fairyOption1.setAttribute('value', 'fairy');
    fairyOption1.innerHTML = 'Fairy';
    attackType.appendChild(fairyOption1);

    const fairyOption2 = document.createElement('option');
    fairyOption2.setAttribute('value', 'fairy');
    fairyOption2.innerHTML = 'Fairy';
    defenseType1.appendChild(fairyOption2);

    const fairyOption3 = document.createElement('option');
    fairyOption1.setAttribute('value', 'fairy');
    fairyOption1.innerHTML = 'Fairy';
    defenseType2.appendChild(fairyOption3);

    // Toggle buttons
    e.currentTarget.classList.toggle('selected');
    gen2through5btn.classList.toggle('selected');

    calculateEffectiveness(); 
  } 
});

updateDOM();