const SECRET = "31-05-2008";
const LETTER_LINES = [
  "My dearest mumma,",
  "Happiest biwrthday to youiii.",
  "You may not habe given birth to me but you gave nme smth even more special(the fact that you chose me as your son). thank yew for chosing me as your sone and being there for me. I'm soo grateful to habe you in my life and you will always be precious to me.",
  "I hope your birthday ish illed with lots of love and happiness. Live long Mumma and always be the amazing cutie(Goddess) you are",
  "lobe youi fowever",
  "Happy biwrthday once again",
];

const input      = document.getElementById("ll-input");
const inputGroup = document.getElementById("ll-input-group");
const errorMsg   = document.getElementById("ll-error-msg");
const openBtn    = document.getElementById("ll-open-btn");
const envWrap    = document.getElementById("ll-env-wrap");
const envelope   = document.getElementById("ll-envelope");
const seal       = document.getElementById("ll-seal");
const peek       = document.getElementById("ll-peek");
const card       = document.getElementById("ll-card");
const message    = document.getElementById("ll-message");

function formatDate(value) {
  const nums = value.replace(/\D/g, "").slice(0, 8);
  const parts = [];
  if (nums.length > 0) parts.push(nums.slice(0, 2));
  if (nums.length > 2) parts.push(nums.slice(2, 4));
  if (nums.length > 4) parts.push(nums.slice(4, 8));
  return parts.join("-");
}

input.addEventListener("input", () => {
  const pos = input.selectionStart;
  input.value = formatDate(input.value);
  input.classList.remove("ll-input--error");
  errorMsg.classList.add("ll-hidden");
});

input.addEventListener("keydown", (e) => {
  if (["Backspace", "Delete", "Tab"].includes(e.key) || e.key.startsWith("Arrow")) return;
  if (!/\d/.test(e.key)) e.preventDefault();
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleOpen();
});

openBtn.addEventListener("click", handleOpen);

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeLines() {
  message.innerHTML = "";
  for (let l = 0; l < LETTER_LINES.length; l++) {
    const text = LETTER_LINES[l];
    const p = document.createElement("p");
    message.appendChild(p);
    for (let i = 0; i <= text.length; i++) {
      await delay(50);
      p.textContent = text.slice(0, i);
    }
    await delay(400);
  }
}

function handleOpen() {
  if (input.value.trim() === SECRET) {
    envelope.classList.add("ll-envelope--open");
    seal.classList.add("ll-seal--gone");
    inputGroup.classList.add("ll-fade-out");
    openBtn.classList.add("ll-fade-out");

    setTimeout(() => peek.classList.add("ll-peek--visible"), 1100);
    setTimeout(() => envWrap.classList.add("ll-env-wrap--gone"), 2000);
    setTimeout(() => {
      card.classList.remove("ll-hidden");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.classList.add("ll-card--visible");
          message.classList.add("ll-message--visible");
          typeLines();
        });
      });
    }, 2300);
  } else {
    input.classList.add("ll-input--error");
    errorMsg.classList.remove("ll-hidden");
    setTimeout(() => input.classList.remove("ll-input--error"), 500);
  }
}
