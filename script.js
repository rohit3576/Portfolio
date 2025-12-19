/* =========================
   SCROLL REVEAL ANIMATION
========================= */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll("section, .card").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});

/* =========================
   ACTIVE NAV LINK
========================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* =========================
   SCROLL PROGRESS BAR
========================= */
const progress = document.createElement("div");
progress.id = "scroll-progress";
document.body.appendChild(progress);

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const percent = (scrollTop / height) * 100;
  progress.style.width = percent + "%";
});

/* =========================
   BACK TO TOP BUTTON
========================= */
const topBtn = document.createElement("button");
topBtn.id = "topBtn";
topBtn.innerHTML = "↑";
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =========================
   NAVBAR SHADOW ON SCROLL
========================= */
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.style.boxShadow =
    window.scrollY > 20
      ? "0 10px 30px rgba(0,0,0,0.5)"
      : "none";
});

/* =========================
   CARD MICRO INTERACTIONS
========================= */
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.transform = `
      perspective(800px)
      rotateX(${(y / rect.height - 0.5) * 6}deg)
      rotateY(${(x / rect.width - 0.5) * -6}deg)
      translateY(-10px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

/* =========================
   CUSTOM CURSOR (DOT + RING)
========================= */
const cursor = document.createElement("div");
cursor.className = "cursor";
document.body.appendChild(cursor);

const ring = document.createElement("div");
ring.className = "cursor-ring";
document.body.appendChild(ring);

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  ring.style.left = e.clientX + "px";
  ring.style.top = e.clientY + "px";
});

/* =========================
   CURSOR INTERACTION ON LINKS
========================= */
document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("mouseenter", () => {
    ring.style.transform = "translate(-50%, -50%) scale(1.5)";
  });

  el.addEventListener("mouseleave", () => {
    ring.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

/* =========================
   DISABLE CURSOR ON MOBILE
========================= */
if (window.innerWidth < 768) {
  cursor.style.display = "none";
  ring.style.display = "none";
}
