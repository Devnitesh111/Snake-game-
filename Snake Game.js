$(document).ready(function() {
    const gridSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let direction = 'right';
    let score = 0;
    let gameLoop;

    function render() {
        $('#game-board').empty();
        snake.forEach(segment => {
            $('#game-board').append(`<div class="snake" style="left: ${segment.x * gridSize}px; top: ${segment.y * gridSize}px;"></div>`);
        });
        $('#game-board').append(`<div class="food" style="left: ${food.x * gridSize}px; top: ${food.y * gridSize}px;"></div>`);
        $('#score').text(`Score: ${score}`);
    }

    function move() {
        const head = { ...snake[0] };
        switch (direction) {
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
        }

        if (head.x === food.x && head.y === food.y) {
            score++;
            snake.unshift(head);
            generateFood();
        } else {
            snake.pop();
            snake.unshift(head);
        }

        if (head.x < 0 || head.y < 0 || head.x >= gridSize || head.y >= gridSize || collision()) {
            clearInterval(gameLoop);
            alert(`Game Over! Your score is ${score}.`);
            resetGame();
        }

        render();
    }

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
    }

    function collision() {
        return snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = 'right';
        score = 0;
        generateFood();
        gameLoop = setInterval(move, 100);
    }

    $('#start-button').click(function() {
        resetGame();
    });

    $(document).keydown(function(e) {
        switch (e.which) {
            case 37: // left
                if (direction !== 'right') direction = 'left';
                break;
            case 38: // up
                if (direction !== 'down') direction = 'up';
                break;
            case 39: // right
                if (direction !== 'left') direction = 'right';
                break;
            case 40: // down
                if (direction !== 'up') direction = 'down';
                break;
        }
    });
});
