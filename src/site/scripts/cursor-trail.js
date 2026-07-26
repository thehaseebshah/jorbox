(function() {
    function initParticleTrail() {
        let canvas = document.getElementById("cursor-trail-canvas");
        if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.id = "cursor-trail-canvas";
            canvas.style.cssText = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 99999;";
            document.body.appendChild(canvas);
        }

        const ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const colors = [
            "rgba(254, 1, 9, ",    // Crimson Red
            "rgba(168, 85, 247, ",  // Violet
            "rgba(126, 34, 206, ",  // Deep Purple
            "rgba(255, 255, 255, "   // White Sparkle
        ];

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2.2 + 1.2;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = 1;
                this.decay = Math.random() * 0.035 + 0.025;
                this.vx = (Math.random() - 0.5) * 1.2;
                this.vy = (Math.random() - 0.5) * 1.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.size = Math.max(0, this.size - 0.08);
                this.alpha -= this.decay;
            }

            draw() {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.alpha + ")";
                ctx.shadowBlur = 6;
                ctx.shadowColor = "#fe0109";
                ctx.fill();
                ctx.restore();
            }
        }

        function addParticles(x, y) {
            for (let i = 0; i < 3; i++) {
                particles.push(new Particle(x, y));
            }
        }

        let lastX = 0;
        let lastY = 0;

        window.addEventListener("mousemove", (e) => {
            const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
            if (dist > 4) {
                addParticles(e.clientX, e.clientY);
                lastX = e.clientX;
                lastY = e.clientY;
            }
        }, { passive: true });

        function loop() {
            ctx.clearRect(0, 0, width, height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.update();
                p.draw();
                if (p.alpha <= 0 || p.size <= 0) {
                    particles.splice(i, 1);
                }
            }

            requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initParticleTrail);
    } else {
        initParticleTrail();
    }
})();
