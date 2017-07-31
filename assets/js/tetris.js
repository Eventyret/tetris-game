var canvas = document.getElementById('tetris');
var context = canvas.getContext('2d');

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);

var matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0],
];

matrix.forEach((row, y) => {
    row.forEach((value, x) => {
        
    })
})