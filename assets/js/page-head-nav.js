let selectedNavButton = null;

// Toggles visibility of given subnav by toggling pageHead__navList--open class to it
function toggleSubnav(subnav, open) {
  if (open) {
    subnav.classList.add("pageHead__navList--open");
    subnav.classList.remove("pageHead__navList--close");
    selectedNavButton.setAttribute("aria-expanded", "true");
  } else {
    const subnavNestedList = subnav.querySelector(".pageHead__navList--nested");
    if (selectedNavButton && subnavNestedList && selectedNavButton.nextElementSibling.id === subnavNestedList.id) {
      subnav.classList.remove("pageHead__navList--open");
      subnav.classList.add("pageHead__navList--close");
      setTimeout(() => {
        subnav.classList.remove("pageHead__navList--close");
      }, 1600);
      selectedNavButton.setAttribute("aria-expanded", "false");
      selectedNavButton = null;
    }
  }
}

// Closes all subnavs on the page.
function closeAllSubnavs() {
  const subnavs = document.querySelectorAll(".pageHead__navItem--primary");
  for (let i = 0, l = subnavs.length; i < l; i++) {
    toggleSubnav(subnavs[i], false);
  }
}

// Attaches click event listener to subnav toggle.
function setupSubnavToggle(subnavToggle) {
  subnavToggle.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();

    const subnav = subnavToggle.parentElement;
    const isActive = subnav.classList.contains("pageHead__navList--open");

    closeAllSubnavs();
    if (!isActive) {
      selectedNavButton = event.target;
      toggleSubnav(subnav, true);
    }
  });
}

// Setup all subnav toggles on the page
const subnavToggles = document.querySelectorAll("button.pageHead__navLink--primary");

for (let i = 0, l = subnavToggles.length; i < l; i++) {
  setupSubnavToggle(subnavToggles[i]);
}

// Close all menus if anything else on the page is clicked
document.addEventListener("click", event => {
  const target = event.target;

  if (target.closest) {
    if (!target.closest(".pageHead__navLink--primary") && !target.closest(".pageHead__navList--nested")) {
      closeAllSubnavs();
    }
  }
});
