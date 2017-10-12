var scores, roundScore, activePlayer, diceEl;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;
diceEl = document.querySelector('.dice');

diceEl.style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function() {
    var dice = Math.floor(Math.random() * 6) + 1;

    if (dice !== 1) {
        diceEl.style.display = 'block';
        diceEl.src = 'dice-' + dice + '.png';
        roundScore += dice;
        document.getElementById(
            'current-' + activePlayer
        ).textContent = roundScore;
    } else {
        playerHasWon().then(changePlayer);
    }
});

// document.querySelector('.btn-hold').addEventListener('click', function() {
//     scores[activePlayer] += roundScore;

//     document.getElementById('score-' + activePlayer).textContent =
//         scores[activePlayer];

//     playerHasWon().then(changePlayer);
// });

function changePlayer() {
    diceEl.style.display = 'none';

    document.getElementById('current-' + activePlayer).textContent = 0;
    roundScore = 0;
    document
        .querySelector('.player-' + activePlayer)
        .classList.remove('active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document
        .querySelector('.player-' + activePlayer)
        .classList.add('active');
}

async function playerHasWon() {
    if (scores[activePlayer] >= 100) {
        alert('Player ' + (activePlayer + 1) + 'has won');
        reset();
    }
}

function reset() {
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    diceEl.hide();
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
}

// document.querySelector('.btn-new').addEventListener('click', function() {
//     var msgs = 'HEY DEV <{:-)';
//     reset();
//     diceEl.attr('msg', msgs);
//     changePlayer();
// });
