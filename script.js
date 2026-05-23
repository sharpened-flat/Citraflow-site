const tabButtons = document.querySelectorAll(".tab-button");
const productCards = document.querySelectorAll(".product-card");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.tab;

    tabButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    productCards.forEach((card) => {
      card.classList.toggle("is-active", card.id === targetId);
    });
  });
});

document.querySelector(".contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button");
  if (button) {
    button.textContent = "Request Captured";
    button.disabled = true;
  }
});
