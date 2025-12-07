// ✅ Smooth scroll for navigation links
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: "smooth"
    });
  });
});


// ✅ Hover animation for skill & project cards
document.querySelectorAll("#skills > div > div, #projects > div > div").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-6px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});


// ✅ Contact button action (highlight)
const contactBtn = document.querySelector("#contact button");

if (contactBtn) {
  contactBtn.addEventListener("click", () => {
    const contactSection = document.querySelector("#contact");
    contactSection.scrollIntoView({ behavior: "smooth" });

    contactSection.style.boxShadow = "0 0 25px rgba(99, 102, 241, 0.6)";
    setTimeout(() => {
      contactSection.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
    }, 1200);
  });
}


// ✅ Project buttons → example logic
const projectButtons = document.querySelectorAll("#projects button");

projectButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (index === 0) {
      window.open("https://github.com/Troi", "_blank"); // Budget Manager
    } else {
      alert("Project will be added soon 🙂");
    }
  });
});


// ✨✨ Scroll Reveal Animation ✨✨

const revealElements = [
  document.querySelector("#about"),
  document.querySelector("#skills"),
  document.querySelector("#projects"),
  document.querySelector("#contact"),
  ...document.querySelectorAll("#skills > div > div"),
  ...document.querySelectorAll("#projects > div > div")
].filter(Boolean); 

revealElements.forEach(el => {
  el.classList.add("reveal");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15 
  }
);

revealElements.forEach(el => observer.observe(el));
