const text = "vyfor";
const container = document.getElementById("text-container");
const scrollIndicator = document.querySelector('.scroll-indicator');

// Initially hide the scroll indicator
scrollIndicator.style.opacity = "0";
scrollIndicator.style.visibility = "hidden";

for (let i = 0; i < text.length; i++) {
  const span = document.createElement("span");
  span.classList.add("letter");
  span.textContent = text[i];
  span.style.animationDelay = (0.5 + i * 0.15) + "s";
  container.appendChild(span);
}

const textAnimationDuration = 0.5 + (text.length - 1) * 0.15 + 0.8 + 0.5;

setTimeout(() => {
  scrollIndicator.style.visibility = "visible";
  scrollIndicator.style.opacity = "1";
  scrollIndicator.style.transition = "opacity 0.8s ease";
}, textAnimationDuration * 1000);

// snow
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const snowflakes = [];

function createSnowflake() {
  snowflakes.push({
    x: Math.random() * canvas.width,
    y: -10,
    size: Math.random() * 2 + 1,
    speedY: Math.random() * 1.5 + 0.5,
    speedX: (Math.random() - 0.5) * 0.8
  });
}

function updateSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.02) {
    createSnowflake();
  }

  ctx.fillStyle = "white";
  for (let i = 0; i < snowflakes.length; i++) {
    const flake = snowflakes[i];
    flake.y += flake.speedY;
    flake.x += flake.speedX;

    if (flake.y > canvas.height) {
      flake.y = -10;
      flake.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(updateSnow);
}

updateSnow();

// scroll functionality
const aboutSection = document.querySelector('.about-section');
const aboutItems = document.querySelectorAll('.about-item');

scrollIndicator.addEventListener('click', () => {
  aboutSection.scrollIntoView({ behavior: 'smooth' });
});

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      const index = entry.target.getAttribute('data-index');
      entry.target.style.transitionDelay = `${index * 0.1}s`;
    }
  });
}, observerOptions);

aboutItems.forEach(item => {
  observer.observe(item);
});