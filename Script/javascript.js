window.onload = () => {

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = 'rgba(0, 0, 0, 1)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

const clearCanvas = () => {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

const randNum = (min, max) => Math.random() * (max - min) + min;

class Particle {
    constructor(x, y, hue) {
        this.x = x;
        this.y = y;
        this.speedX = randNum(-2, 2);
        this.speedY = randNum(-2, 2);
        this.radius = randNum(1, 8);
        this.hue = hue || 0;
    }

    update() {
        this.radius = Math.max(this.radius - 0.1, 0);
        this.x += this.speedX;
        this.y += this.speedY;
        this.draw();
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, 1)`;
        ctx.fill();
    }
}


class Effect {
    constructor() {
        this.particles = [];
        this.hue = 0;
    }
    update() {
        this.hue = (this.hue + 5) % 360;
        this.particles = this.particles.filter(p => p.radius > 0);
        this.particles.forEach((p) => p.update());
    }

    addNewParticles() {
        for (let i = 0; i < 8; i++) {
            this.particles.push(new Particle(mouse.x, mouse.y, this.hue));
        }
    }
}

const effect = new Effect();

const onMouseMove = (e) => {
    mouse.x = e?.clientX || e.touches[0].clientX;
    mouse.y = e?.clientY || e.touches[0].clientY;

    effect.addNewParticles();
}

const tick = () => {
    clearCanvas();
    effect.update();
    window.requestAnimationFrame(tick);
}

window.requestAnimationFrame(tick);

window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('touchmove', onMouseMove);
window.addEventListener('click', effect.addNewParticles.bind(effect));
                }
