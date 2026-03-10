// Toggle theme
const btn = document.getElementById("theme-toggle");

btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    btn.textContent = document.body.classList.contains("dark-mode") 
        ? "☀️ Mode Clair" 
        : "🌙 Mode Sombre";
});

