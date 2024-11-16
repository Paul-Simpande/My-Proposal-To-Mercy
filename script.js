const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');
function goToQuestionsPage() {
    window.location.href = "questions.html";
}
function respondYes() {
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const button = document.getElementById("yes");
    const rect = button.getBoundingClientRect();
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const particles = [];
    const colors = ["#FF5733", "#FFC300", "#DAF7A6", "#FF69B4", "#8A2BE2"];

    const yaySound = document.getElementById("yaySound");
    yaySound.currentTime = 0; // Reset playback
    yaySound.play();

    function createParticle(x, y) {
        const count = 100;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;

            particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 5 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 100,
            });
        }
    }

    function updateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.size *= 0.96;
            p.life--;

            if (p.life <= 0 || p.size <= 0.1) {
                particles.splice(i, 1);
            }
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        }
    }

    function loop() {
        updateParticles();
        drawParticles();
        if (particles.length > 0) {
            requestAnimationFrame(loop);
        }
    }
    
    createParticle(centerX, centerY);
    loop();

    sendAnswer('Yes! You’ve already debugged my heart, and now I’m ready to commit to this lifelong project with you. Let’s merge our lives and deploy the most amazing future together. 💻❤️');
}

function respondNo() {
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const button = document.getElementById("no");
    const rect = button.getBoundingClientRect();
    
    const bottomLeft = { x: rect.left, y: rect.bottom };
    const bottomRight = { x: rect.right, y: rect.bottom };

    const streams = [];
    const streamColor = "#87CEFA"; 
    
    const sadSound = document.getElementById("sadSound");
    sadSound.currentTime = 0;
    sadSound.play();
    
    function createStream(x, y) {
        for (let i = 0; i < 5; i++) {
            streams.push({
                x: x + Math.random() * 5 - 2.5,
                y: y,
                vy: Math.random() * 2 + 2,
                size: Math.random() * 2 + 1,
                opacity: 0.8 + Math.random() * 0.2,
            });
        }
    }

    function updateStreams() {
        for (let i = streams.length - 1; i >= 0; i--) {
            const particle = streams[i];
            particle.y += particle.vy;
            particle.opacity -= 0.005;
            
            if (particle.opacity <= 0 || particle.y > canvas.height) {
                streams.splice(i, 1);
            }
        }
    }

    function drawStreams() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const particle of streams) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(135, 206, 250, ${particle.opacity})`;
            ctx.fill();
        }
    }

    let animationFrame;
    function loop() {
        updateStreams();
        drawStreams();
        animationFrame = requestAnimationFrame(loop);
    }
    
    const interval = setInterval(() => {
        createStream(bottomLeft.x, bottomLeft.y);
        createStream(bottomRight.x, bottomRight.y);
    }, 50);
    
    setTimeout(() => {
        clearInterval(interval);
        cancelAnimationFrame(animationFrame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);

    loop();

    // Send "No" answer
    sendAnswer('No, Nice try, Mr. Programmer, but she is still analyzing the feasibility of this proposal. Maybe you need to iterate on your approach and try again. 😉');
}
emailjs.init("izQGUK6FlYug3drY-");
function sendAnswer(answer) {
    emailjs.send("service_c45dnqv", "template_idl1nu7", { answer })
        .then((response) => {
            console.log("Email sent successfully!", response);
        })
        .catch((error) => {
            console.error("Failed to send email.", error);
        });
}
