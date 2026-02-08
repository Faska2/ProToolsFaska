'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutHeroAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax Effect
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 150]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0.5]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouseX = -1000;
        let mouseY = -1000;

        const image = new Image();
        image.src = '/aboutimage.png';
        image.crossOrigin = 'Anonymous';

        class Particle {
            x: number;
            y: number;
            originX: number;
            originY: number;
            color: string;
            size: number;
            vx: number;
            vy: number;
            char: string;
            density: number;

            constructor(x: number, y: number, color: string) {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.originX = x; // Target position from image
                this.originY = y;
                this.color = color;
                this.size = Math.floor(Math.random() * 10) + 8; // Size of the matrix char
                this.vx = 0;
                this.vy = 0;
                this.char = Math.random() > 0.5 ? '1' : '0';
                this.density = (Math.random() * 30) + 1;
            }

            draw() {
                if (!ctx) return;
                // Neon Green Glow Effect
                ctx.shadowBlur = 5;
                ctx.shadowColor = this.color;
                ctx.fillStyle = this.color;
                ctx.font = `${this.size}px monospace`;
                ctx.fillText(this.char, this.x, this.y);
                ctx.shadowBlur = 0;
            }

            update() {
                // Mouse Interaction - Disintegration
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = 100;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * this.density;
                const directionY = forceDirectionY * force * this.density;

                if (distance < maxDistance) {
                    this.x -= directionX * 3;
                    this.y -= directionY * 3;
                    // Randomize char on hover
                    if (Math.random() < 0.1) this.char = Math.random() > 0.5 ? '1' : '0';
                } else {
                    // Return to origin
                    if (this.x !== this.originX) {
                        const dx = this.x - this.originX;
                        this.x -= dx / 15;
                    }
                    if (this.y !== this.originY) {
                        const dy = this.y - this.originY;
                        this.y -= dy / 15;
                    }
                }

                // Random char flip idle animation
                if (Math.random() < 0.01) {
                    this.char = Math.random() > 0.5 ? '1' : '0';
                }
            }
        }

        const init = () => {
            if (!canvas) return;

            // Clear particles
            particles = [];

            // We need to scale the image to fit the canvas but maintain aspect ratio
            const scalingFactor = Math.min(canvas.width / image.width, canvas.height / image.height) * 0.7; // 70% size
            const newWidth = image.width * scalingFactor;
            const newHeight = image.height * scalingFactor;
            const startX = (canvas.width - newWidth) / 2;
            const startY = (canvas.height - newHeight) / 2;

            // Draw image effectively to read pixel data
            ctx.drawImage(image, startX, startY, newWidth, newHeight);

            // Get pixel data
            const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the image

            // Iterate through pixels to create particles
            // Step > 1 for performance and "matrix style" spacing
            const step = 6;

            for (let y = 0; y < canvas.height; y += step) {
                for (let x = 0; x < canvas.width; x += step) {
                    const index = (y * 4 * pixels.width) + (x * 4);
                    const alpha = pixels.data[index + 3];

                    // If pixel is visible
                    if (alpha > 128) {
                        const r = pixels.data[index];
                        const g = pixels.data[index + 1];
                        const b = pixels.data[index + 2];

                        // Filter: Only take "greenish" or just transform all to green matrix style?
                        // User requested "Green neon glow". 
                        // Let's preserve some brightness but force Green.
                        const brightness = (r + g + b) / 3;

                        // Only spawn particles for brighter parts to define shape
                        if (brightness > 20) {
                            // Matrix Green Color Palette
                            const color = `rgb(0, ${Math.min(255, brightness + 50)}, 50)`;
                            particles.push(new Particle(x, y, color));
                        }
                    }
                }
            }
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            if (!ctx || !canvas) return;

            // Trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }

            // Add random "Matrix Rain" characters in background
            // (Optional - kept minimal for focus on face)
        };

        image.onload = () => {
            // Trigger resize to set initial dimensions
            handleResize();
        };

        const handleResize = () => {
            if (containerRef.current && canvasRef.current) {
                canvasRef.current.width = containerRef.current.clientWidth;
                canvasRef.current.height = containerRef.current.clientHeight;
                init();
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        }

        if (containerRef.current) {
            window.addEventListener('resize', handleResize);
            containerRef.current.addEventListener('mousemove', handleMouseMove);
            containerRef.current.addEventListener('mouseleave', handleMouseLeave);
        }

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (containerRef.current) {
                containerRef.current.removeEventListener('mousemove', handleMouseMove);
                containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="w-full flex justify-center perspective-1000">
            <motion.div
                ref={containerRef}
                style={{ y, opacity }}
                className="relative w-full max-w-4xl h-[600px] bg-black rounded-3xl overflow-hidden border border-green-500/20 shadow-[0_0_50px_rgba(0,255,0,0.1)] group"
            >
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

                {/* Cinematic Overlay Effects */}
                <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,255,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-center animate-scanline" />
                <div className="absolute inset-0 pointer-events-none z-30 bg-radial-gradient(circle_at_center, transparent 30%, black 100%)" />

                {/* UI Decos */}
                <div className="absolute bottom-8 left-8 z-40 flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#00ff00]" />
                    <span className="text-green-500/80 font-mono text-xs tracking-[0.2em] uppercase">
                        Neural Link: Active
                    </span>
                </div>

                <div className="absolute top-8 right-8 z-40 border-l-2 border-green-500/30 pl-4 py-1">
                    <div className="flex flex-col">
                        <span className="text-green-500 font-mono text-xs font-bold">FASKA_AI</span>
                        <span className="text-green-500/50 font-mono text-[10px] tracking-widest">v2.0.45</span>
                    </div>
                </div>

                <div className="absolute bottom-8 right-8 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-green-400/60 font-mono text-[10px] animate-pulse">
                        &lt; INTERACT /&gt;
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
