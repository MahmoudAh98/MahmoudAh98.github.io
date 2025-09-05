
// Typing effect for roles
const roles = ["DevOps Engineer", "Automation Enthusiast"];
let roleIndex = 0;
let charIndex = 0;
let typingElement = document.getElementById("typing");

function typeRole() {
  if (charIndex < roles[roleIndex].length) {
    typingElement.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeRole, 100);
  } else {
    setTimeout(eraseRole, 1500);
  }
}

function eraseRole() {
  if (charIndex > 0) {
    typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseRole, 50);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 300);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typingElement) {
    typeRole();
  }
});



// Contact form submission with feedback
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const action = form.action;
    status.textContent = "Sending...";
    try {
      const response = await fetch(action, {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        status.textContent = "✅ Message sent successfully!";
        status.className = "form-status success";
        form.reset();
      } else {
        status.textContent = "❌ Something went wrong. Please try again.";
        status.className = "form-status error";
      }
    } catch (error) {
      status.textContent = "❌ Network error. Please try again.";
      status.className = "form-status error";
    }
  });
});
