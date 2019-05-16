/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, isGamePlaying, winNum = 100, p1Name = "Player 1", p2Name = "Player 2";
//var dice;

    //scores = [0,0];
    //roundScore =0;
    //activePlayer = 0;
initialize();


/*
DOM manipulation with querySelector:
element = document.querySelector(selectors);
The Document method querySelector() returns the first Element within the document that matches the specified selector, or group of selectors. If no matches are found, null is returned.
*/

//document.querySelector('#current-0').textContent = dice;
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<h1>' + dice + '</h1>';

 /*
 note you can read a value from your document and store it in a variable for later use like
 let x = document.querySelector('#current-0').textContent;
 console.log(x);
 */

/*
Handling Events in javaScript:
addEventListener() is a method of the Document Object. It attaches an event handler to the document. The addEventListener method will call the second argument which is a function whenever the event described by its first argument occurs.
syntax:
document.addEventListener(event, function);
google "event reference MDN" for a list of events
*/

/*

CSS display Property specifies how a certain HTML element should be displayed. syntax in css looks like: display: value;
syntax in javascript looks like: object.style.display="none"
*/

/*We put the following codes in initialize() function*/
    ///document.querySelector('.dice').style.display = 'none';
    ///document.getElementById('score-0').textContent = '0';
    ///document.getElementById('score-1').textContent = '0';
    ///document.getElementById('current-0').textContent = '0';
    ///document.getElementById('current-1').textContent = '0';

/*document.addEventListener(event, function); here we define the function anonymously. Anonymous functions are function without any name and we cannot use them elsewhere*/
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(isGamePlaying){
            /*1. create a random number*/
        document.querySelector("#bonus").textContent = " ";
        var dice1 = Math.floor(6*Math.random()+ 1);
        var dice2 = Math.floor(6*Math.random()+ 1);



        /*2. display the this random variable*/
        document.querySelector('#dice1').style.display = 'block';
        document.querySelector('#dice2').style.display = 'block';
        //document.querySelector('.dice').src = 'dice-5.png'
        document.querySelector('#dice1').src = 'dice-' + dice1 + '.png';
        document.querySelector('#dice2').src = 'dice-' + dice2 + '.png';
        /*Note we need dice only here so we can remove it from the declaration list in line 12 */

        if(dice1 == 6 && dice2 == 6) {
          //Player rolls 6 twice in a row. Set global score to 0, and change player.
          scores[activePlayer] = 0;
          document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
          nextPlayer();
        }

        //Either or both of prevRoll or dice werent equal to 6, change value of prevRoll.

        /* 3. Update the round score IF the rolled number was NOT a 1*/
        if (dice1 != 1 && dice2 != 1){

          //If a pair is rolled that isn't two 6s or two 1s, receive an "extra dice bonus". For instance, if two 5s are rolled, value of pair is 15, not 10.
          if(dice1 == dice2 && dice1 + dice2 != 12) {
            dice = dice1 * 3;
            document.querySelector('#bonus').textContent = "Bonus: " + dice / 3 + " Extra PTS!";
          } else {
            dice = dice1 + dice2;
          }

            if(dice == 7) {
              let otherPlayer;
              activePlayer == 1 ? otherPlayer = 0 : otherPlayer = 1;
              scores[otherPlayer] = scores[otherPlayer] - 7;
              if(otherPlayer == 0) {
                document.querySelector('#bonus').textContent = "Bonus: " + p1Name + " loses 7 pts!";
                document.getElementById('score-0').textContent = scores[0];
              }
              else {
                document.querySelector('#bonus').textContent =  "Bonus: " + p2Name + " loses 7 pts!";
                document.getElementById('score-1').textContent = scores[1];
              }
            }
            else {
              roundScore += dice;
            }
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else{
            /*next player*/
           nextPlayer();
        }
    }
});

/*Implementation of HOLD*/

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(isGamePlaying){
            // 1. Add current score to Global score
        scores[activePlayer] += roundScore;

        // 2. Update user interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // 3. check if player won the game
        if(scores[activePlayer] >= winNum){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#dice1').style.display = 'none';
            document.querySelector('#dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            isGamePlaying = false;
        }else{
            // 4. next player
            nextPlayer();
        }
    }
});

// document.querySelector('.btn-change').addEventListener('click', function(){
//   document.getElementById("modal-change").show();
// });

document.querySelector("#changes").addEventListener('click', function makeChanges(){

     winNum = parseInt(document.getElementById('winNum').value);
     p1Name = document.getElementById('p1Name').value;
     p2Name = document.getElementById('p2Name').value;

    document.getElementById("name-0").textContent =  p1Name;
    document.getElementById("name-1").textContent = p2Name;
    document.getElementById("towin").textContent = winNum;

});

/*use thes function */
function nextPlayer(){
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('#dice1').style.display = 'none';
        document.querySelector('#dice2').style.display = 'none';
}

/*Implementation of the new game*/
document.querySelector('.btn-new').addEventListener('click', initialize);
 /* implementing the initialize function */
function  initialize(){

    scores = [0,0];
    roundScore = 0;
    //First player is selected randomly
    activePlayer = Math.floor(Math.random() * 2);
    isGamePlaying = true;

    document.querySelector("#towin").textContent = winNum;
    document.querySelector('#dice1').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = p1Name;
    document.getElementById('name-1').textContent = p2Name;

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}
