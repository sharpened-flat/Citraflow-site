const tabButtons = document.querySelectorAll(".tab-button");
const productCards = document.querySelectorAll(".product-card");
const contactForm = document.querySelector(".contact-form");
const statusNode = document.querySelector(".form-status");
const responsePanel = document.querySelector(".assistant-response");
const responseBody = document.querySelector(".assistant-response-body");

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

async function postQuoteRequest(payload) {
  const endpoints = ["/api/quote-assistant", "/.netlify/functions/quote-assistant"];
  let lastError = new Error("No API endpoint responded.");

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 404) {
        continue;
      }

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "The assistant request failed.");
      }

      return data;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unexpected request failure.");
    }
  }

  throw lastError;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderAssistantReply(reply) {
  const blocks = reply
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, "<br>")}</p>`);

  if (responseBody) {
    responseBody.innerHTML = blocks.join("");
  }

  if (responsePanel) {
    responsePanel.hidden = false;
  }
}

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const button = form.querySelector("button");
  const formData = Object.fromEntries(new FormData(form).entries());

  if (button) {
    button.disabled = true;
    button.textContent = "Generating Reply...";
  }

  if (statusNode) {
    statusNode.textContent = "Submitting details to the GPT-5.5 endpoint.";
  }

  if (responsePanel) {
    responsePanel.hidden = true;
  }

  try {
    const result = await postQuoteRequest(formData);
    renderAssistantReply(result.reply);

    if (statusNode) {
      statusNode.textContent = `Draft generated with ${result.model}.`;
    }
  } catch (error) {
    if (statusNode) {
      statusNode.textContent =
        error instanceof Error ? error.message : "The assistant request failed.";
    }
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = "Generate GPT-5.5 Clinical Reply";
    }
  }
});
