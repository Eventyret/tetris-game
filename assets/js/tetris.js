// Create the canvas
var canvas = document.getElementById('tetris');
var context = canvas.getContext('2d');
// Scale it
context.scale(20, 20);

// If a player has filled a row we want to remove it and give them a score
function arenaSweep(){
    let rowCount = 1;
    outer: for (var y = arena.length -1; y > 0; --y) {
        for(var x = 0; x < arena[y].length; ++x){
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        var row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player.score += rowCount * 10;
        rowCount *= 2;

    }
}


// Creating the collision function
function collide(arena, player) {
    var [m, o] = [player.matrix, player.pos];
    for (var y=0; y < m.length; y++) {
        for (var x= 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (arena[y + o.y] &&
                 arena[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
        }
    }
    return false;
}

function createMatrix(w, h){
    var matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}
// Creating the Pieces in shapes
function createPiece(type) {
    if (type === 'T') {
       return [
            [0,0,0],
            [1,1,1],
            [0,1,0],
        ];
    } else if (type === 'O') {
        return [
            [2,2],
            [2,2],
        ];
    } else if (type === 'L') {
        return [
             [0,3,0],
             [0,3,0],
             [0,3,3],
         ];
    } else if (type === 'J') {
        return [
             [0,4,0],
             [0,4,0],
             [4,4,0],
         ];
    } else if (type === 'I') {
        return [
             [0,5,0,0],
             [0,5,0,0],
             [0,5,0,0],
         ];
    } else if (type === 'S') {
        return [
            [0,6,6],
            [6,6,0],
            [0,0,0],
         ];
    } else if (type === 'Z') {
        return [
            [7,7,7],
            [7,0,0],
            [0,0,0],
         ];
    }
    
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset){
matrix.forEach((row, y) => {
    row.forEach((value, x) => {
        if (value !== 0) {
            context.fillStyle = colors[value];
            context.fillRect(x + offset.x,
                             y + offset.y,
                            1, 1);
            }
        });
    });
}

function merge(arena, player) {
   player.matrix.forEach((row, y) => {
       row.forEach((value, x) => {
           if (value !== 0) {
               arena[y + player.pos.y][x + player.pos.x] = value;
           }
       });
   });
}

function playerDrop(){
    player.pos.y++;
    if (collide(arena, player)){
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

function playerMove(dir){
    player.pos.x += dir;
    if (collide(arena,player)) {
        player.pos.x -= dir;
    }
}

// Game Over, its filled up 
function playerReset() {
    var pieces = 'ILJOTSZ';
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
                   (player.matrix[0].length / 2 | 0);
    if (collide (arena, player)) {
        arena.forEach(row => row.fill(0));
        // Give the player their score and restart, since we will continue forever we will force a restart anyways
        mbox.confirm('<h4 id="game">G A M E</h4><h4 id="over">O V E R</h4><br><b>Total Score<br><p id="playerscore">' + player.score + '</p></b><br><p id="restart">Go again?</p>', function(yes){
            if (yes) {
                location.reload();
            } else {
                mbox.alert('Sad for you it\'s going to restart anyways'), setTimeout(function(){ location.reload(); }, 2500);
            }
        })
        store.set(player.score).score == 'score'
        player.score = 0;
        updateScore();
    }
}
// Lets make it so the player can't rotate through walls - Then we offset them

function playerRotate(dir) {
    var pos = player.pos.x;
    var offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix -dir);
            player.pos.x = pos;
            return;
        }
    }
}

// Rotation since its a square we mix left and right continus to get a full rotation
function rotate(matrix,dir) {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < y; ++x) {
            // Touble Switch -to rotate
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }
    if (dir > 0) {
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
}

var dropCounter = 0;
var dropInterval = 700;
var lastTime = 0;

// Lets update and re-draw the canvas
function update(time = 0) {
    var deltaTime = time - lastTime;
    lastTime = time;

    
    // console.log(deltaTime) Getting the time for debug

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
       playerDrop();
    }

    draw();
    requestAnimationFrame(update);
}

function updateScore() {
    localStorage.highscore = player.score;
    document.getElementById('score').innerHTML = player.score
}

// Colors for blocks They are random
var colors = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
];
// Creating the Arena
var arena = createMatrix(12, 20);

// Player with starting score of 0
var player = {
    pos:{x: 0, y: 0},
    matrix: null,
    score: 0
};

// Keyboard bindings QUERTY Style http://keycode.info/

document.addEventListener('keydown', event => {
    
        // Arrow Left === 37 // A === 65
    if (event.keyCode === 65) {
        playerMove(-1);
        
        // Arrow Right === 39 // D === 68
    } else if (event.keyCode === 68) {
        playerMove(1);
        
        // Arrow Down  === 40 // S === 83
    } else if (event.keyCode === 83) {
        playerDrop();
        
        // Q === 83
    } else if (event.keyCode === 81) {
        playerRotate(-1);

        // E === 69
    } else if (event.keyCode === 69) {
        playerRotate(1);
    }
    
    // console.log(event); // Getting Keycodes
    
});

playerReset(); // Lets Reset the player
update(); // Run the update to continue to draw