var canvas = document.getElementById('tetris');
var context = canvas.getContext('2d');

context.scale(20, 20);



var matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0],
];

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

var dropCounter = 0;
var dropInterval = 1000;
var lastTime = 0;


function update(time = 0) {
    var deltaTime = time - lastTime;
    lastTime = time;

    
    // console.log(deltaTime) Getting the time for debug

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        player.pos.y++;
        dropCounter = 0;
    }

    draw();
    requestAnimationFrame(update);
}

var player = {
    pos:{x: 5, y: 5},
    matrix: matrix,
}

document.addEventListener('keydown', event => {
    
    if (event.keyCode === 37) {
        player.pos.x--; 
    } else if (event.keyCode == 39){
        player.pos.x++ ;
    }
    
    // console.log(event); // Getting Keycodes
    
})

update();