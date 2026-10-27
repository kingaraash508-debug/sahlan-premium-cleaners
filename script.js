const WHATSAPP_NUMBER = "254711224477";

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open menu" : "Close menu");
  siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a") && window.matchMedia("(max-width: 680px)").matches) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    siteNav.classList.remove("is-open");
  }
});

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const serviceSelect = document.querySelector("#service-type");
    const serviceOption = Array.from(serviceSelect.options).find((option) => option.value === link.dataset.service);
    if (serviceOption) {
      serviceSelect.value = serviceOption.value;
    }
  });
});

document.querySelector("#quote-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const details = [
    "Hello Sahlan Premium Cleaners, I'd like to request a quote.",
    `Name: ${formData.get("name")}`,
    `Service: ${formData.get("service")}`,
    `Area: ${formData.get("area")}`,
    formData.get("size") ? `Space size: ${formData.get("size")}` : "",
    formData.get("frequency") ? `How often: ${formData.get("frequency")}` : "",
    formData.get("details") ? `Details: ${formData.get("details")}` : "",
  ].filter(Boolean);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(details.join("\n"))}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

document.querySelector("#year").textContent = new Date().getFullYear();
