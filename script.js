document.addEventListener('DOMContentLoaded', async () => {
    const startButton = document.getElementById('start-button'); 
    const attackButton1 = document.getElementById('attack-button1'); 
    const attackButton2 = document.getElementById('attack-button2'); 
    const gameArea = document.getElementById('game-area'); 
    const pokemon1NameElement = document.getElementById('pokemon1-name'); 
    const pokemon2NameElement = document.getElementById('pokemon2-name'); 
    const pokemon1HpElement = document.getElementById('pokemon1-hp'); 
    const pokemon2HpElement = document.getElementById('pokemon2-hp'); 
    const winnerMessage = document.getElementById('winner-message'); 
    const damageMessage = document.getElementById('damage-message'); 
    const restartButton = document.getElementById('restart-button'); 
    const pokemon1Img = document.getElementById('pokemon1-img'); 
    const pokemon2Img = document.getElementById('pokemon2-img'); 

    let pokemon1;
    let pokemon2;
    let pokemon1Hp = 100;
    let pokemon2Hp = 100;
    let currentPlayer = Math.random() > 0.5 ? 1 : 2; //random start

    //config combat
    const setupBattle = async () => {
        const pokemons = await getPokemonsForBattle();
        pokemon1 = pokemons.pokemon1;
        pokemon2 = pokemons.pokemon2;

        //recup nom + images
        pokemon1Img.src = pokemon1.sprites.front_default;
        pokemon1Img.alt = pokemon1.name;
        pokemon1NameElement.innerText = pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1);

        pokemon2Img.src = pokemon2.sprites.front_default;
        pokemon2Img.alt = pokemon2.name;
        pokemon2NameElement.innerText = pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1);

        //reset pv et interface
        pokemon1Hp = 100;
        pokemon2Hp = 100;
        pokemon1HpElement.innerText = `${pokemon1Hp} PV`;
        pokemon2HpElement.innerText = `${pokemon2Hp} PV`;
        winnerMessage.innerText = '';
        damageMessage.classList.add('hidden');
        currentPlayer = Math.random() > 0.5 ? 1 : 2;
        toggleAttackButtons();
    };

    //au click
    startButton.addEventListener('click', () => {
        startButton.classList.add('hidden');
        gameArea.classList.remove('hidden');
        setupBattle();
    });

    //event btn pkm1
    attackButton1.addEventListener('click', () => {
        if (currentPlayer === 1) {
            const attackPower = Math.floor(Math.random() * 21) + 30; //puissance d'attaque random entre 30 et 50
            pokemon2Hp -= attackPower;
            pokemon2HpElement.innerText = `${pokemon2Hp > 0 ? pokemon2Hp : 0} PV`;
            displayDamageMessage(attackPower, pokemon1.name, pokemon2.name);
            if (pokemon2Hp <= 0) {
                endGame(1);
            } else {
                currentPlayer = 2;
                toggleAttackButtons();
            }
        }
    });

    //event btn pkm2
    attackButton2.addEventListener('click', () => {
        if (currentPlayer === 2) {
            const attackPower = Math.floor(Math.random() * 21) + 30; //puissance d'attaque random entre 30 et 50
            pokemon1Hp -= attackPower;
            pokemon1HpElement.innerText = `${pokemon1Hp > 0 ? pokemon1Hp : 0} PV`;
            displayDamageMessage(attackPower, pokemon2.name, pokemon1.name);
            if (pokemon1Hp <= 0) {
                endGame(2);
            } else {
                currentPlayer = 1;
                toggleAttackButtons();
            }
        }
    });

    //restart
    restartButton.addEventListener('click', () => {
        restartButton.classList.add('hidden');
        setupBattle();
        attackButton1.classList.add('hidden');
        attackButton2.classList.add('hidden');
        gameArea.classList.remove('hidden');
    });

    //switch btn attack
    const toggleAttackButtons = () => {
        if (currentPlayer === 1) {
            attackButton1.classList.remove('hidden');
            attackButton2.classList.add('hidden');
        } else {
            attackButton1.classList.add('hidden');
            attackButton2.classList.remove('hidden');
        }
    };

    //message degats
    const displayDamageMessage = (damage, attacker, defender) => {
        damageMessage.innerText = `${attacker} a infligé ${damage} dégâts à ${defender} !`;
        damageMessage.classList.remove('hidden');
        setTimeout(() => {
            damageMessage.classList.add('hidden');
        }, 3000); // Masquer le message après 3 secondes
    };

    //display gagnant
    const endGame = (winner) => {
        attackButton1.classList.add('hidden');
        attackButton2.classList.add('hidden');
        winnerMessage.innerText = `Le ${winner === 1 ? pokemon1.name : pokemon2.name} a gagné!`;
        restartButton.classList.remove('hidden');
    };
});
