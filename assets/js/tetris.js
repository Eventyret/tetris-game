var canvas = document.getElementById('tetris');
var context = canvas.getContext('2d');

context.scale(20, 20);



var matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0],
];

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
        matrix.push(new Array(w).fill(0))
    }
    return matrix;
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(player.matrix, player.pos);
}
function drawMatrix(matrix, offset){
matrix.forEach((row, y) => {
    row.forEach((value, x) => {
        if (value !== 0) {
            context.fillStyle = 'red';
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
        player.pos.y = 0;
    }
    dropCounter = 0;
}


var dropCounter = 0;
var dropInterval = 1000;
var lastTime = 0;


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

var arena = createMatrix(12, 20);

var player = {
    pos:{x: 5, y: 5},
    matrix: matrix,
}

document.addEventListener('keydown', event => {
    
    if (event.keyCode === 37) {
        player.pos.x--; 
    } else if (event.keyCode === 39){
        player.pos.x++ ;
    } else if (event.keyCode === 40){
        playerDrop();
    }
    
    // console.log(event); // Getting Keycodes
    
})

update();