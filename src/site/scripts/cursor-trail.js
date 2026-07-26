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
            "rgba(254, 1, 9, ",    // Electric Crimson Red (#fe0109)
            "rgba(168, 85, 247, ",  // Violet (#a855f7)
            "rgba(126, 34, 206, ",  // Royal Violet (#7e22ce)
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

        let auraX = -1000;
        let auraY = -1000;
        let mouseX = -1000;
        let mouseY = -1000;
        let lastX = 0;
        let lastY = 0;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (auraX === -1000) {
                auraX = mouseX;
                auraY = mouseY;
            }

            const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
            if (dist > 3) {
                for (let i = 0; i < 2; i++) {
                    particles.push(new Particle(e.clientX, e.clientY));
                }
                lastX = e.clientX;
                lastY = e.clientY;
            }
        }, { passive: true });

        function drawShababAura() {
            if (mouseX === -1000) return;
            auraX += (mouseX - auraX) * 0.15;
            auraY += (mouseY - auraY) * 0.15;

            ctx.save();
            const radGrad = ctx.createRadialGradient(auraX, auraY, 0, auraX, auraY, 180);
            radGrad.addColorStop(0, "rgba(254, 1, 9, 0.20)");     // Center Crimson Red
            radGrad.addColorStop(0.45, "rgba(126, 34, 206, 0.12)"); // Mid Royal Violet
            radGrad.addColorStop(0.75, "rgba(34, 1, 126, 0.04)");  // Outer Deep Purple
            radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

            ctx.fillStyle = radGrad;
            ctx.beginPath();
            ctx.arc(auraX, auraY, 180, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        function loop() {
            ctx.clearRect(0, 0, width, height);

            drawShababAura();

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
