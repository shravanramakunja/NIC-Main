const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: null, y: null };

window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

let dots = [];

class Dot {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // light black on white bg
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.draw();
    }
}

function connectDots() {
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 115) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
                ctx.stroke();
            }
        }

        if (mouse.x !== null && mouse.y !== null) {
            const dx = dots[i].x - mouse.x;
            const dy = dots[i].y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
                ctx.stroke();
            }
        }
    }
}

function initDots() {
    dots = [];
    for (let i = 0; i < 120; i++) {
        dots.push(new Dot());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => dot.update());
    connectDots();
    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initDots();
});

initDots();
animate();
