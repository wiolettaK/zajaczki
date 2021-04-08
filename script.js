const tileColor = ["red", "red", "green", "green", "yellow", "yellow", "blue", "blue", "orange", "orange", "brown", "brown", "darkcyan", "darkcyan", "lightseagreen", "lightseagreen"];
const tiles = {};
const numerOfTiles = 16;
const startTileClass = 'tile-body startTileColor';
const endTileClass = 'tile-body endTileColor';
let tilesClicked = [];
let lockSelecting = true;
let counter = 0;


  document.addEventListener('DOMContentLoaded', function() {
    for(let i = 1; i <=numerOfTiles; i++) {
        createTile(i);
    }
  }, false);

  function createTile(id) {
    const newElement = document.createElement('div');
    const newElementBody = document.createElement('div');
    newElementBody.id = id;
    newElement.className = 'tile col-3';
    newElementBody.className = 'tile-body';
    newElementBody.onclick = () => memoryGame(id);
   
    const elementWhereTilesWillBeGenerated = document.querySelector(".row");
    elementWhereTilesWillBeGenerated.appendChild(newElement);
    newElement.appendChild(newElementBody);

    addColorTile(id);
  };

  function addColorTile (id) {
    const position = Math.floor(Math.random() * tileColor.length);
    tiles[id] = tileColor[position];
    tileColor.splice(position, 1);
  }

  function memoryGame(id) {
      if (lockSelecting) {
        showTrueColor (id);
        checkIfTheSame(id);
      }
  };

  function showTrueColor (id) {
    document.getElementById(id).classList.add(`${tiles[id]}-background`);
  };

  function checkIfTheSame (id) {
    if (tilesClicked.length === 0) {
        tilesClicked[0] = id;
    } else if (tilesClicked.length === 1 && tilesClicked[0] !== id) {
        lockSelecting = false;
        tilesClicked[1] = id;
        if (tiles[tilesClicked[0]] === tiles[tilesClicked[1]]) {
            document.getElementById(tilesClicked[0]).onclick = null;
            document.getElementById(tilesClicked[1]).onclick = null;
            setTimeout(function(){
                changeColor(endTileClass);
                checkWin();
            },800);
        } else {
           setTimeout(() => changeColor(startTileClass), 1500);
        }
    } 
  };

  function changeColor (colorTile) {
    document.getElementById(tilesClicked[0]).className=colorTile;
    document.getElementById(tilesClicked[1]).className=colorTile;
    tilesClicked = [];
    lockSelecting = true;
  };

  function checkWin () {
    counter++;
    if (counter === numerOfTiles/2) {
        alert("Wygrana!!!")
    }
  };

