const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

c.fillRect(0, 0, canvas.width, canvas.height)

class Player {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.width = 10
        this.height = 200
        this.lastKey
    }

    draw() {
        c.fillStyle = 'white'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()

        this.position.y += this.velocity.y

        if (this.position.y + this.velocity.y < 0) {
            this.position.y = 0
        }
        else if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.position.y = canvas.height - this.height
        }
    }
}

class Ball {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.width = 20
        this.height = 20
    }

    draw() {
        c.fillStyle = 'white'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.velocity.y <= 0 || this.position.y + this.velocity.y >= canvas.height) this.velocity.y *= -1
        if (touchBall({ rectangle1: player1 }) || touchBall({ rectangle1: player2 })) this.velocity.x *= -1
    }
}

const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
}

const player1 = new Player({
    position: {
        x: 0,
        y: 292
    }, velocity: {
        x: 0,
        y: 0
    }
})

const player2 = new Player({
    position: {
        x: canvas.width - 10,
        y: 292
    }, velocity: {
        x: 0,
        y: 0
    }
})

const ball = new Ball({
    position: {
        x: canvas.width / 2 -10,
        y: canvas.height / 2 -10
    }, velocity: {
        x: 0,
        y: 0
    }
})

const speed = 10;

function touchBall({ rectangle1 }) {
    return (
        (
            ball.position.x + ball.width >= rectangle1.position.x
            && ball.position.x <= rectangle1.position.x + rectangle1.width
            && ball.position.y + ball.height >= rectangle1.position.y
            && ball.position.y <= rectangle1.position.y + rectangle1.height
        )
    )
}

function throwBall() {
    setTimeout(() => {
        ball.velocity.x = (Math.random() > 0.5 ? 1 : -1) * 5
        ball.velocity.y = (Math.random() > 0.5 ? 1 : -1) * 5
    }, 2000)
}
let gameOver = false
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player1.update()
    player2.update()
    ball.update()

    player1.velocity.y = 0
    player2.velocity.y = 0

    if (ball.position.x < player1.position.x) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
        document.querySelector('#displayText').style.display = 'flex'
        gameOver = true
    }
    else if (ball.position.x > player2.position.x) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
        document.querySelector('#displayText').style.display = 'flex'
        gameOver = true
    }
    if (!gameOver) {
        if (keys.w.pressed && player1.lastKey == 'w') {
            player1.velocity.y = -speed;
        }
        if (keys.s.pressed && player1.lastKey == 's') {
            player1.velocity.y = speed;
        }

        if (keys.ArrowUp.pressed && player2.lastKey == 'ArrowUp') {
            player2.velocity.y = -speed;
        }
        if (keys.ArrowDown.pressed && player2.lastKey == 'ArrowDown') {
            player2.velocity.y = speed;
        }
    }
}

animate()
throwBall()


window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = true
            player1.lastKey = 'w'
            break
        case 's':
            keys.s.pressed = true
            player1.lastKey = 's'
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            player2.lastKey = 'ArrowUp'
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            player2.lastKey = 'ArrowDown'
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = false
            break
    }
})