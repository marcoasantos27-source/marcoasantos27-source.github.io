// MENU RESPONSIVO
// ======================================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


// ======================================================
// ANIMAÇÃO AO ROLAR A PÁGINA
// ======================================================

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 80) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// ======================================================
// FORMULÁRIO DE CONTATO
// ======================================================

const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");


// Exibe uma mensagem de erro no campo
function setError(input, message) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");

  formGroup.classList.add("error");
  errorMessage.textContent = message;
}


// Remove a mensagem de erro do campo
function clearError(input) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");

  formGroup.classList.remove("error");
  errorMessage.textContent = "";
}


// Verifica se o e-mail possui um formato válido
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

// ======================================================
// ENVIO E VALIDAÇÃO DO FORMULÁRIO
// ======================================================

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const submitButton = contactForm.querySelector('button[type="submit"]');

  let isValid = true;

  successMessage.textContent = "";
  successMessage.classList.remove("error");

  // Validação do nome
  if (name.value.trim().length < 3) {
    setError(name, "Digite um nome com pelo menos 3 caracteres.");
    isValid = false;
  } else {
    clearError(name);
  }

  // Validação do e-mail
  if (!isValidEmail(email.value.trim())) {
    setError(email, "Digite um e-mail válido.");
    isValid = false;
  } else {
    clearError(email);
  }

  // Validação da mensagem
  if (message.value.trim().length < 10) {
    setError(message, "Digite uma mensagem com pelo menos 10 caracteres.");
    isValid = false;
  } else {
    clearError(message);
  }

  // Interrompe o envio se algum campo estiver inválido
  if (!isValid) {
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar a mensagem.");
    }

    successMessage.textContent =
      "Mensagem enviada com sucesso! Obrigado pelo contato.";

    contactForm.reset();
  } catch (error) {
    successMessage.textContent =
      "Não foi possível enviar a mensagem. Tente novamente.";

    successMessage.classList.add("error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Enviar mensagem";
  }
});


