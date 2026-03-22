/* ═══════════════════════════════════════════════════════
   G. CHAITANYA — AURORA UI SCRIPTS
   Cursor · Navbar · Aurora Shift · Typing · Scroll
═══════════════════════════════════════════════════════ */

/* ── CUSTOM CURSOR ──────────────────────────────────────── */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

let ringX = 0, ringY = 0, dotX = 0, dotY = 0;

document.addEventListener('mousemove', (e) => {
  dotX = e.clientX; dotY = e.clientY;
  dot.style.left  = dotX + 'px';
  dot.style.top   = dotY + 'px';
});

// Ring follows with slight lag
function animateRing() {
  ringX += (dotX - ringX) * 0.12;
  ringY += (dotY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => { dot.style.opacity='0'; ring.style.opacity='0'; });
document.addEventListener('mouseenter', () => { dot.style.opacity='1'; ring.style.opacity='1'; });

/* ── NAVBAR SCROLL ──────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── HAMBURGER ──────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ── ACTIVE NAV LINK ────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const secObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        const match = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', match);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => secObserver.observe(s));

/* ── SMOOTH SCROLL ──────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  });
});

/* ── AURORA ROLE TYPING ─────────────────────────────────── */
const auroraEl = document.getElementById('auroraText');
const roles = [
  'RAG Pipelines',
  'LLM Workflows',
  'GenAI Systems',
  'ML Models',
  'AI Agents',
  'Python APIs',
  'ChayTech Content',
];

let rIdx = 0, cIdx = 0, deleting = false;

function typeAurora() {
  const current = roles[rIdx];
  if (deleting) {
    auroraEl.textContent = current.substring(0, cIdx - 1);
    cIdx--;
  } else {
    auroraEl.textContent = current.substring(0, cIdx + 1);
    cIdx++;
  }

  let delay = deleting ? 45 : 75;
  if (!deleting && cIdx === current.length) { delay = 2000; deleting = true; }
  else if (deleting && cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; delay = 350; }

  setTimeout(typeAurora, delay);
}
typeAurora();

/* ── SCROLL REVEAL ──────────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObs.observe(el));

/* ── AURORA LAYER MOUSE PARALLAX ────────────────────────── */
const auroraLayer = document.getElementById('auroraLayer');
document.addEventListener('mousemove', (e) => {
  const mx = (e.clientX / window.innerWidth  - 0.5) * 2; // -1 to 1
  const my = (e.clientY / window.innerHeight - 0.5) * 2;
  auroraLayer.style.transform = `translate(${mx * 15}px, ${my * 15}px) scale(1)`;
});

/* ── AURORA SECTION COLOR SHIFTS ────────────────────────── */
const sectionColors = {
  home:          { c1: '#13ffaa', c2: '#1e67c6', opacity: 0.13 },
  about:         { c1: '#13ffaa', c2: '#1e67c6', opacity: 0.12 },
  skills:        { c1: '#ce84cf', c2: '#1e67c6', opacity: 0.13 },
  experience:    { c1: '#1e67c6', c2: '#dd335c', opacity: 0.12 },
  projects:      { c1: '#13ffaa', c2: '#ce84cf', opacity: 0.13 },
  certifications:{ c1: '#f59e0b', c2: '#dd335c', opacity: 0.11 },
  blog:          { c1: '#ce84cf', c2: '#13ffaa', opacity: 0.12 },
  contact:       { c1: '#f59e0b', c2: '#13ffaa', opacity: 0.12 },
};

function hexToRgba(hex, a) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

function updateAurora(sectionId) {
  const cfg = sectionColors[sectionId] || sectionColors['home'];
  const c1 = hexToRgba(cfg.c1, cfg.opacity);
  const c2 = hexToRgba(cfg.c2, cfg.opacity * 1.4);
  auroraLayer.style.backgroundImage = `
    radial-gradient(ellipse at 20% 40%, ${c1} 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, ${c2} 0%, transparent 45%),
    radial-gradient(ellipse at 55% 75%, rgba(206,132,207,0.10) 0%, transparent 50%),
    radial-gradient(ellipse at 10% 85%, rgba(221,51,92,0.08)   0%, transparent 45%),
    radial-gradient(ellipse at 90% 60%, rgba(245,158,11,0.07)  0%, transparent 40%)
  `;
}

const colorObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) updateAurora(entry.target.id);
  });
}, { threshold: 0.3 });

document.querySelectorAll('section[id]').forEach(s => colorObserver.observe(s));

/* ── PROJECT CARD TILT ──────────────────────────────────── */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const cx = r.width  / 2, cy = r.height / 2;
    const rx = ((e.clientY - r.top  - cy) / cy) * -5;
    const ry = ((e.clientX - r.left - cx) / cx) *  5;
    card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ── GLASS CARD MOUSE GLOW ──────────────────────────────── */
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width  * 100)}%`);
    card.style.setProperty('--my', `${((e.clientY - r.top)  / r.height * 100)}%`);
  });
});

/* ── STAT COUNT-UP ──────────────────────────────────────── */
function countUp(el, target, dur = 1200) {
  let v = 0; const step = target / (dur / 16);
  const t = setInterval(() => {
    v += step;
    if (v >= target) { el.textContent = target + '+'; clearInterval(t); }
    else el.textContent = Math.floor(v) + '+';
  }, 16);
}
const bubbles = document.querySelectorAll('.stat-bubble');
let counted = false;
const countObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    document.querySelectorAll('.sb-num').forEach(el => {
      countUp(el, parseInt(el.textContent));
    });
  }
}, { threshold: 0.5 });
if (bubbles[0]) countObs.observe(bubbles[0]);

/* ── PAGE LOAD FADE ─────────────────────────────────────── */
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.6s ease';
window.addEventListener('load', () => {
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});

/* ── CONSOLE SIGNATURE ──────────────────────────────────── */
console.log(
  '%cG. Chaitanya%c\nAI/ML & GenAI Engineer · Hyderabad\nchaitanyatech.77@gmail.com\ngithub.com/chaitanyatech77q',
  'color:#13ffaa;font-size:1.4rem;font-weight:900;',
  'color:#8ba3c7;font-size:0.9rem;'
);
