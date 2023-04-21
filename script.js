'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new')
const btnHold = document.querySelector('.btn--hold')

//starting conditions:
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let playing = true;
let totalScore = [0,0];
let currentScore = 0;
let activePlayer = 0;

//Switching player function
const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;

    if(activePlayer !== 0)
        {
            activePlayer = 0
        }
    else{
            activePlayer = 1;
        }

    //change bg transition:
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};


//Rolling Dice btn ----->
btnRoll.addEventListener('click', function(){
   if(playing) {
    //generating random no.
    const dice = Math.trunc(Math.random()*6)+1 ;  

    //Display dice img
    diceEl.classList.remove('hidden');
    diceEl.src = `/dice_img/dice-${dice}.png`;
   
    if(dice !== 1) {
        //adding current score:
        currentScore = currentScore+dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    }else {
        //switch player
        switchPlayer();
    }   
}
});

//Hold btn ----->
btnHold.addEventListener('click', function() {
    if(playing){
    //adding currentScore to TotalScore
    totalScore[activePlayer] += currentScore;


    document.getElementById(`score--${activePlayer}`).textContent = totalScore[activePlayer];


    //check for winner
    if(totalScore[activePlayer] >= 100){
        playing = false;
        diceEl.classList.add('hidden')
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }
    else{
        //switch player
        switchPlayer();
    }
    }
});

//New game btn ----->
btnNew.addEventListener('click', function (){

    playing = true;
    totalScore = [0,0];
    currentScore = 0;
    activePlayer = 0;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
   
});

 
