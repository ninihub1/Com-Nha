// Site settings. Change a link here and every button that uses it updates.
// To switch ordering platform, edit orderUrl. Nothing else needs to change.
const SITE = {
  // Pickup ordering (currently Foodbooking)
  orderUrl: "https://www.foodbooking.com/ordering/?restaurant_uid=7ab4130d-4b05-4d8f-8120-ea6ab1024606",
  // Delivery ordering (Uber Eats). The menu page adds ?diningMode=DELIVERY to it.
  uberEatsUrl: "https://www.ubereats.com/au/store/com-nha-restaurant-westminster/_axrUWOhW5KjC9jTwBZXnQ"
};

// Buttons mark which setting they use, e.g. <a data-site-link="orderUrl">.
// An empty setting hides its buttons.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-site-link]").forEach((el) => {
    const url = SITE[el.dataset.siteLink];
    if (url) {
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener";
    } else {
      el.hidden = true;
    }
  });
});