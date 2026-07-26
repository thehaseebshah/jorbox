(function() {
    function initConstellation() {
        const existing = document.getElementById("constellation-canvas");
        if (existing) return;

        const canvas = document.createElement("canvas");
        canvas.id = "constellation-canvas";
        canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;opacity:0.6;";
        document.body.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        let width, height;
        let mouseX = -9999, mouseY = -9999;
        const PARTICLE_COUNT = 55;
        const CONNECT_DIST = 140;
        const MOUSE_DIST = 200;
        const particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize, { passive: true });

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        class Star {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.r = Math.random() * 1.4 + 0.6;
                this.alpha = Math.random() * 0.5 + 0.3;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Star());
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECT_DIST) {
                        const alpha = (1 - dist / CONNECT_DIST) * 0.18;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Mouse proximity connections
                const mdx = particles[i].x - mouseX;
                const mdy = particles[i].y - mouseY;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist < MOUSE_DIST) {
                    const alpha = (1 - mDist / MOUSE_DIST) * 0.35;
                    ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.stroke();
                }
            }

            // Draw & update particles
            for (const p of particles) {
                p.update();
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.fill();
            }

            requestAnimationFrame(draw);
        }

        draw();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initConstellation);
    } else {
        initConstellation();
    }
})();
