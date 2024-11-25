// Initialiserar globala variabler för att hålla koll på poäng, omgångar och spelarens namn.
let totalScore = 0;
let roundScore = 0;
let roundsPlayed = 0;
let diceNumber = 0;
let playersName = "";

// Hämtar relevanta DOM-element för att kunna manipulera spelets gränssnitt.
const gameForm = document.getElementById("gameForm");
const nameDisplayEl = document.getElementById("nameDisplay");
const playerNameEl = document.getElementById("playerName");
const totalScoreEl = document.getElementById("totalScore");
const roundScoreEl = document.getElementById("roundScore");
const roundsPlayedEl = document.getElementById("roundsPlayed");
const diceNumberEl = document.getElementById("diceNumber");
const gameMessageEl = document.getElementById("gameMessage");
const rollDiceBtn = document.getElementById("rollDice");
const newRoundBtn = document.getElementById("newRound");
const restartGameBtn = document.getElementById("restartGame");
const diceOne = document.getElementById("one");
const diceTwo = document.getElementById("two");
const diceThree = document.getElementById("three");
const diceFour = document.getElementById("four");
const diceFive = document.getElementById("five");
const diceSix = document.getElementById("six");

// Event för att hantera inskick av spelarens namn, döljer formuläret och visar namnet.
gameForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Förhindrar att sidan laddas om.
    playersName = gameForm.querySelector('input').value;

    playerNameEl.innerText = playersName; // Visar spelarens namn.

    gameForm.style.display = "none"; // Döljer formuläret.
    nameDisplayEl.style.display = "block"; // Visar namndisplay.
});

// Event för att hantera tärningskast och uppdatera spelstatus baserat på tärningsvärdet.
rollDiceBtn.addEventListener("click", () => {
    const diceValue = getRandomDiceValue(); // Hämtar ett slumpmässigt tärningsvärde.
    diceNumber = diceValue;

    if (diceValue === 1) { 
        // Om tärningen visar 1, nollställs omgångspoängen och omgången avslutas.
        roundScore = 0;
        roundsPlayed++;
        gameMessageEl.innerText = "Du slog en etta! Omgången är över.";
    } 
    else {
        // Om tärningen inte visar 1, adderas värdet till omgångspoängen.
        roundScore += diceValue;
        gameMessageEl.innerText = "Fortsätt att kasta eller starta en ny omgång.";
    }

    showCorrectDice(diceValue); // Visar rätt tärning på skärmen.
    updateScore(); // Uppdaterar poäng och andra spelvariabler på skärmen.
});

// Event för att avsluta den aktuella omgången och starta en ny.
newRoundBtn.addEventListener("click", () => {
    if (roundScore > 0) {
        // Lägg till omgångspoängen till totalsumman om den är större än 0.
        totalScore += roundScore;
        roundScore = 0; // Nollställ omgångspoängen.
        roundsPlayed++; // Öka antalet spelade omgångar.
        gameMessageEl.innerText = "Poängen är inräknade i totalen. Starta en ny omgång.";
    }

    updateScore(); // Uppdaterar poängen.
    checkGameEnd(); // Kollar om spelet är slut (dvs om totalpoängen nått 100).
});

// Event för att starta om spelet, återställer alla variabler och UI.
restartGameBtn.addEventListener("click", () => {
    totalScore = 0;
    roundScore = 0;
    roundsPlayed = 0;
    diceNumber = 0;
    playersName = "";

    // Återställ gränssnittet till ursprungsläge.
    totalScoreEl.innerText = "0";
    roundScoreEl.innerText = "0";
    roundsPlayedEl.innerText = "0";
    diceNumberEl.innerText = "-";
    gameMessageEl.innerText = "Spelet har startat om";

    rollDiceBtn.disabled = false;
    newRoundBtn.disabled = false;

    // Döljer alla tärningsbilder.
    const diceElements = [diceOne, diceTwo, diceThree, diceFour, diceFive, diceSix];
    diceElements.forEach(dice => (dice.style.display = "none"));

    gameForm.style.display = "block"; // Visar formuläret för att ange namn.
    nameDisplayEl.style.display = "none";
    gameForm.querySelector('input').value = ""; // Tömmer inputfältet.
});

// Funktion för att generera ett slumpmässigt tärningsvärde mellan 1 och 6.
function getRandomDiceValue() {
    return 1 + Math.floor(Math.random() * 6); 
}


// Funktion för att uppdatera poängen och omgångsstatistik på skärmen.
function updateScore() {
    totalScoreEl.innerText = totalScore;
    roundScoreEl.innerText = roundScore;
    roundsPlayedEl.innerText = roundsPlayed;
    diceNumberEl.innerText = diceNumber;
}

// Funktion som kontrollerar om spelet är slut (totalpoängen >= 100).
function checkGameEnd() {
    if (totalScore >= 100) {
        gameMessageEl.innerText = `Grattis ${playersName}! Du nådde 100 poäng på ${roundsPlayed} omgångar. Spelet är slut.`;
        rollDiceBtn.disabled = true; // Inaktiverar tärningskast-knappen.
        newRoundBtn.disabled = true; // Inaktiverar knappen för ny omgång.
    }
}

// Funktion för att visa rätt tärning baserat på det kastade värdet.
function showCorrectDice(value) {
    // Döljer alla tärningar innan rätt tärning visas.
    const diceElements = [diceOne, diceTwo, diceThree, diceFour, diceFive, diceSix];
    diceElements.forEach(dice => (dice.style.display = "none"));

    // Visar rätt tärning baserat på värdet.
    switch (value) {
        case 1:
            diceOne.style.display = "flex";
            break;
        case 2:
            diceTwo.style.display = "flex";
            break;
        case 3:
            diceThree.style.display = "flex";
            break;
        case 4:
            diceFour.style.display = "flex";
            break;
        case 5:
            diceFive.style.display = "flex";
            break;
        case 6:
            diceSix.style.display = "flex";
            break;
    }
}
