'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// Store original filter button text and category values on page load
document.addEventListener('DOMContentLoaded', function () {
  // Store original text for filter buttons
  filterBtn.forEach(btn => {
    btn.dataset.originalText = btn.textContent.trim().toLowerCase();
  });

  // Store original text for select items
  selectItems.forEach(item => {
    item.dataset.originalText = item.textContent.trim().toLowerCase();
  });

  // Store original category values for portfolio items
  document.querySelectorAll('[data-filter-item]').forEach(item => {
    item.dataset.originalCategory = item.dataset.category;
  });

  // Set original text for select value
  if (selectValue) {
    selectValue.dataset.originalText = selectValue.textContent.trim();
  }
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    // Use original text for filtering logic
    let selectedValue = this.dataset.originalText || this.innerText.toLowerCase();
    // Use translated text for display
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    // Use original category for comparison
    const itemCategory = filterItems[i].dataset.originalCategory || filterItems[i].dataset.category;

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === itemCategory) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    // Use original text for filtering logic
    let selectedValue = this.dataset.originalText || this.innerText.toLowerCase();
    // Use translated text for display
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    // Store the original text to identify the page
    const originalPageName = this.dataset.originalPage || this.innerHTML.toLowerCase();

    for (let i = 0; i < pages.length; i++) {
      if (originalPageName === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Portfolio modal variables
const portfolioItems = document.querySelectorAll("[data-portfolio-item]");
const portfolioModalContainer = document.querySelector("[data-portfolio-modal-container]");
const portfolioModalCloseBtn = document.querySelector("[data-portfolio-modal-close-btn]");
const portfolioOverlay = document.querySelector("[data-portfolio-overlay]");
const portfolioModalImg = document.querySelector("[data-portfolio-modal-img]");
const portfolioModalTitle = document.querySelector("[data-portfolio-modal-title]");
const portfolioModalCategory = document.querySelector("[data-portfolio-modal-category]");
const portfolioModalDescription = document.querySelector("[data-portfolio-modal-description]");
const portfolioModalTechnologies = document.querySelector("[data-portfolio-modal-technologies]");
const portfolioModalLink = document.querySelector("[data-portfolio-modal-link]");

// Portfolio modal toggle function
const portfolioModalFunc = function () {
  portfolioModalContainer.classList.toggle("active");
  portfolioOverlay.classList.toggle("active");
}

// Add click event to all portfolio items
portfolioItems.forEach(item => {
  item.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default link behavior

    // Get the project image
    const projectImg = this.querySelector(".project-img img");
    portfolioModalImg.src = projectImg.src;
    portfolioModalImg.alt = projectImg.alt;

    // Get the project title
    const projectTitle = this.querySelector(".project-title");
    portfolioModalTitle.textContent = projectTitle.textContent;

    // Get the project category
    const projectCategory = this.querySelector(".project-category");
    portfolioModalCategory.textContent = projectCategory.textContent;

    // Get the project details from hidden content
    const portfolioDetails = this.querySelector(".portfolio-details");

    if (portfolioDetails) {
      // Get description
      const description = portfolioDetails.querySelector(".portfolio-description");
      if (description) {
        portfolioModalDescription.textContent = description.textContent;
      } else {
        portfolioModalDescription.textContent = "No description available.";
      }

      // Get technologies
      const technologies = portfolioDetails.querySelector(".portfolio-technologies");
      // Clear previous technologies
      portfolioModalTechnologies.innerHTML = "";

      if (technologies && technologies.querySelectorAll("li").length > 0) {
        // Add each technology
        const techItems = technologies.querySelectorAll("li");
        techItems.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item.textContent;
          portfolioModalTechnologies.appendChild(li);
        });
      } else {
        // Add a default "No technologies listed" item
        const li = document.createElement("li");
        li.textContent = "No technologies listed";
        portfolioModalTechnologies.appendChild(li);
      }

      // Get link
      const link = portfolioDetails.querySelector(".portfolio-link");
      if (link) {
        portfolioModalLink.href = link.getAttribute("href");
        portfolioModalLink.textContent = link.textContent;
      } else {
        portfolioModalLink.href = "#";
        portfolioModalLink.textContent = "Project not available";
      }
    } else {
      // Set default values if no details are provided
      portfolioModalDescription.textContent = "No description available for this project.";
      portfolioModalTechnologies.innerHTML = "";
      const li = document.createElement("li");
      li.textContent = "No technologies listed";
      portfolioModalTechnologies.appendChild(li);
      portfolioModalLink.href = "#";
      portfolioModalLink.textContent = "Project not available";
    }

    // Open modal
    portfolioModalFunc();
  });
});

// Add click event to modal close button and overlay
if (portfolioModalCloseBtn) {
  portfolioModalCloseBtn.addEventListener("click", portfolioModalFunc);
}

if (portfolioOverlay) {
  portfolioOverlay.addEventListener("click", portfolioModalFunc);
}

// Blog modal variables
const blogItems = document.querySelectorAll("[data-blog-item]");
const blogModalContainer = document.querySelector("[data-blog-modal-container]");
const blogModalCloseBtn = document.querySelector("[data-blog-modal-close-btn]");
const blogOverlay = document.querySelector("[data-blog-overlay]");
const blogModalImg = document.querySelector("[data-blog-modal-img]");
const blogModalTitle = document.querySelector("[data-blog-modal-title]");
const blogModalCategory = document.querySelector("[data-blog-modal-category]");
const blogModalDate = document.querySelector("[data-blog-modal-date]");
const blogModalText = document.querySelector("[data-blog-modal-text]");

// Blog modal toggle function
const blogModalFunc = function () {
  blogModalContainer.classList.toggle("active");
  blogOverlay.classList.toggle("active");
}

// Add click event to all blog items
blogItems.forEach(item => {
  item.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default link behavior

    // Get the blog image
    const blogImg = this.querySelector(".blog-banner-box img");
    blogModalImg.src = blogImg.src;
    blogModalImg.alt = blogImg.alt;

    // Get the blog title
    const blogTitle = this.querySelector(".blog-item-title");
    blogModalTitle.textContent = blogTitle.textContent;

    // Get the blog category
    const blogCategory = this.querySelector(".blog-category");
    blogModalCategory.textContent = blogCategory.textContent;

    // Get the blog date
    const blogDate = this.querySelector(".blog-meta time");
    if (blogDate) {
      blogModalDate.textContent = blogDate.textContent;
      blogModalDate.setAttribute("datetime", blogDate.getAttribute("datetime"));
    }

    // Get the blog details from hidden content
    const blogDetails = this.querySelector(".blog-details");

    // Clear previous blog text content
    blogModalText.innerHTML = "";

    if (blogDetails) {
      // Get detailed text paragraphs
      const detailParagraphs = blogDetails.querySelectorAll(".blog-detail-text");
      if (detailParagraphs.length > 0) {
        detailParagraphs.forEach(paragraph => {
          const p = document.createElement("p");
          p.textContent = paragraph.textContent;
          blogModalText.appendChild(p);
        });
      } else {
        // If no detail paragraphs, use the brief text
        const briefText = this.querySelector(".blog-text");
        if (briefText) {
          const p = document.createElement("p");
          p.textContent = briefText.textContent;
          blogModalText.appendChild(p);

          // Add a placeholder paragraph
          const p2 = document.createElement("p");
          p2.textContent = "More details about this topic will be added soon.";
          blogModalText.appendChild(p2);
        } else {
          const p = document.createElement("p");
          p.textContent = "No content available for this blog post.";
          blogModalText.appendChild(p);
        }
      }
    } else {
      // Set default values if no details are provided
      const p = document.createElement("p");
      p.textContent = "No content available for this blog post.";
      blogModalText.appendChild(p);
    }

    // Open modal
    blogModalFunc();
  });
});

// Add click event to modal close button and overlay
if (blogModalCloseBtn) {
  blogModalCloseBtn.addEventListener("click", blogModalFunc);
}

if (blogOverlay) {
  blogOverlay.addEventListener("click", blogModalFunc);
}

// Language handling
let currentLang = 'id';
let translations = {};

async function loadTranslations() {
  try {
    const response = await fetch(`./assets/lang/${currentLang}.json`);
    translations = await response.json();
    updatePageContent();

    // Update active state on language buttons after loading translations
    updateActiveLanguageButton();
  } catch (error) {
    console.error('Error loading translations:', error);
  }

  // Update Portfolio modal texts based on language
  if (translations.portfolio && translations.portfolio.modal) {
    // Update modal texts if they exist in translations
    const techTitle = document.querySelector('.portfolio-modal-technologies h4');
    if (techTitle && translations.portfolio.modal.technologiesUsed) {
      techTitle.textContent = translations.portfolio.modal.technologiesUsed;
    }
  }
}

function updatePageContent() {
  // Update navigation
  document.querySelectorAll('[data-nav-link]').forEach(element => {
    // Store original text as a data attribute if not already stored
    if (!element.dataset.originalPage) {
      element.dataset.originalPage = element.textContent.trim().toLowerCase();
    }

    const key = element.dataset.originalPage;
    if (translations.nav && translations.nav[key]) {
      element.textContent = translations.nav[key];
    }
  });

  // Update sidebar
  const showContactsBtn = document.querySelector('[data-sidebar-btn] span');
  if (showContactsBtn) {
    showContactsBtn.textContent = sidebar.classList.contains('active')
      ? translations.sidebar.hideContacts
      : translations.sidebar.showContacts;
  }

  // Update sidebar title
  const sidebarTitle = document.querySelector('.info-content .title');
  if (sidebarTitle && translations.sidebar.title) {
    sidebarTitle.textContent = translations.sidebar.title;
  }

  // Update contact titles
  document.querySelectorAll('.contact-title').forEach(element => {
    const key = element.textContent.trim().toLowerCase();
    if (translations.sidebar.contact && translations.sidebar.contact[key]) {
      element.textContent = translations.sidebar.contact[key];
    }
  });

  // Update article titles
  document.querySelectorAll('.article-title').forEach(element => {
    const page = element.closest('[data-page]')?.dataset.page;
    if (page && translations[page] && translations[page].title) {
      element.textContent = translations[page].title;
    }
  });

  // Update About section
  if (document.querySelector('.about-text') && translations.about && translations.about.text) {
    const paragraphs = document.querySelectorAll('.about-text p');
    translations.about.text.forEach((text, index) => {
      if (paragraphs[index]) {
        paragraphs[index].textContent = text;
      }
    });
  }

  // Update What am I working on section
  const serviceTitle = document.querySelector('.service-title');
  if (serviceTitle && translations.about && translations.about.workingOn) {
    serviceTitle.textContent = translations.about.workingOn;
  }

  // Update services
  if (translations.about && translations.about.services) {
    const serviceItems = document.querySelectorAll('.service-item');
    translations.about.services.forEach((service, index) => {
      if (serviceItems[index]) {
        const titleElem = serviceItems[index].querySelector('.service-item-title');
        const textElem = serviceItems[index].querySelector('.service-item-text');

        if (titleElem && service.title) {
          titleElem.textContent = service.title;
        }

        if (textElem && service.text) {
          textElem.textContent = service.text;
        }
      }
    });
  }

  // Update testimonials title
  const testimonialsTitle = document.querySelector('.testimonials-title');
  if (testimonialsTitle && translations.about && translations.about.testimonials) {
    testimonialsTitle.textContent = translations.about.testimonials;
  }

  // Update clients title
  const clientsTitle = document.querySelector('.clients-title');
  if (clientsTitle && translations.about && translations.about.clients) {
    clientsTitle.textContent = translations.about.clients;
  }

  // Update Resume section
  if (translations.resume) {
    // Update education section
    const educationTitle = document.querySelector('.timeline .title-wrapper:first-of-type .h3');
    if (educationTitle && translations.resume.education && translations.resume.education.title) {
      educationTitle.textContent = translations.resume.education.title;
    }

    // Update education items
    if (translations.resume.education && translations.resume.education.items) {
      const educationSection = document.querySelector('.timeline:first-of-type');
      const educationItems = educationSection.querySelectorAll('.timeline-item');

      translations.resume.education.items.forEach((item, index) => {
        if (educationItems[index]) {
          const schoolElem = educationItems[index].querySelector('.timeline-item-title');
          const textElem = educationItems[index].querySelector('.timeline-text');

          if (schoolElem && item.school) {
            schoolElem.textContent = item.school;
          }

          if (textElem && item.description) {
            textElem.textContent = item.description;
          }
        }
      });
    }

    // Update work experience section
    const experienceTitle = document.querySelector('.timeline:nth-of-type(2) .title-wrapper .h3');
    if (experienceTitle && translations.resume.experience && translations.resume.experience.title) {
      experienceTitle.textContent = translations.resume.experience.title;
    }

    // Update experience items
    if (translations.resume.experience && translations.resume.experience.items) {
      const experienceSection = document.querySelector('.timeline:nth-of-type(2)');
      const experienceItems = experienceSection.querySelectorAll('.timeline-item');

      translations.resume.experience.items.forEach((item, index) => {
        if (experienceItems[index]) {
          const positionElem = experienceItems[index].querySelector('.timeline-item-title');
          const yearsElem = experienceItems[index].querySelector('span');
          const textElem = experienceItems[index].querySelector('.timeline-text');

          if (positionElem && item.position) {
            positionElem.textContent = item.position;
          }

          if (yearsElem && item.years) {
            yearsElem.textContent = item.years;
          }

          if (textElem && item.description) {
            textElem.innerHTML = item.description.replace(/\n/g, '<br>');
          }
        }
      });
    }

    // Update skills section title
    const skillsTitle = document.querySelector('.skills-title');
    if (skillsTitle && translations.resume.skills && translations.resume.skills.title) {
      skillsTitle.textContent = translations.resume.skills.title;
    }
  }

  // Update Portfolio section
  if (translations.portfolio) {
    // Update portfolio filter buttons
    if (translations.portfolio.filter) {
      // Update filter list for desktop view
      const filterButtons = document.querySelectorAll('.filter-item button');
      filterButtons.forEach(button => {
        // Get original text from data attribute
        const originalText = button.dataset.originalText || button.textContent.trim().toLowerCase();
        const key = originalText === 'all' ? 'all' :
          originalText === 'web design' ? 'webDesign' :
            originalText === 'applications' ? 'applications' :
              originalText === 'web development' ? 'webDevelopment' : '';

        if (key && translations.portfolio.filter[key]) {
          button.textContent = translations.portfolio.filter[key];
        }
      });

      // Update select category text
      const selectValue = document.querySelector('[data-selecct-value]');
      if (selectValue) {
        // Get the currently active filter
        const activeFilterBtn = document.querySelector('.filter-item button.active');
        if (activeFilterBtn) {
          selectValue.textContent = activeFilterBtn.textContent;
        } else if (translations.portfolio.filter.selectCategory) {
          selectValue.textContent = translations.portfolio.filter.selectCategory;
        }
      }

      // Update select items for mobile view
      const selectItems = document.querySelectorAll('.select-item button');
      selectItems.forEach(item => {
        // Get original text from data attribute
        const originalText = item.dataset.originalText || item.textContent.trim().toLowerCase();
        const key = originalText === 'all' ? 'all' :
          originalText === 'web design' ? 'webDesign' :
            originalText === 'applications' ? 'applications' :
              originalText === 'web development' ? 'webDevelopment' : '';

        if (key && translations.portfolio.filter[key]) {
          item.textContent = translations.portfolio.filter[key];
        }
      });
    }

    // Update print button text if it exists
    if (translations.portfolio.printButton) {
      const printButtonText = document.querySelector('[data-print-text]');
      if (printButtonText) {
        printButtonText.textContent = translations.portfolio.printButton;
      }
    }
  }

  // Update Contact form
  const contactForm = document.querySelector('.contact-form');
  if (contactForm && translations.contact && translations.contact.form) {
    const formTitle = contactForm.querySelector('.form-title');
    if (formTitle) {
      formTitle.textContent = translations.contact.form.title;
    }

    const fullnameInput = contactForm.querySelector('[name="fullname"]');
    if (fullnameInput) {
      fullnameInput.placeholder = translations.contact.form.fullname;
    }

    const emailInput = contactForm.querySelector('[name="email"]');
    if (emailInput) {
      emailInput.placeholder = translations.contact.form.email;
    }

    const messageInput = contactForm.querySelector('[name="message"]');
    if (messageInput) {
      messageInput.placeholder = translations.contact.form.message;
    }

    const sendBtn = contactForm.querySelector('.form-btn span');
    if (sendBtn) {
      sendBtn.textContent = translations.contact.form.send;
    }
  }
}

function changeLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  // Save selected language to localStorage
  localStorage.setItem('selectedLanguage', lang);

  // Update active state on language buttons
  updateActiveLanguageButton();

  // Load translations and immediately update print elements
  loadTranslations().then(() => {
    // Explicitly dispatch an event after translations are loaded with the language detail
    const event = new CustomEvent('languageChanged', {
      detail: {
        language: lang,
        translations: translations
      }
    });
    document.dispatchEvent(event);
  });
}

// Add a specific listener for print-related language updates
document.addEventListener('languageChanged', function (event) {
  // Force update any elements that would be used in printing
  if (window.translations) {
    const printSectionTitles = document.querySelectorAll('.print-section-title');
    if (printSectionTitles.length > 0) {
      updateSectionTitlesWithTranslations(window.translations);
    }

    const printAboutTexts = document.querySelectorAll('.print-about');
    if (printAboutTexts.length > 0) {
      populateAboutSection(window.translations);
    }
  }
});

// Helper function to update section titles with translations - can be called immediately after language change
function updateSectionTitlesWithTranslations(translations) {
  const sectionTitles = {
    "About Me": translations.about?.title || "About Me",
    "Professional Experience": translations.resume?.experience?.title || "Professional Experience",
    "Skills & Expertise": translations.resume?.skills?.title || "Skills & Expertise",
    "Portfolio Projects": translations.portfolio?.title || "Portfolio Projects"
  };

  document.querySelectorAll('.print-section-title').forEach(titleElement => {
    const originalTitle = titleElement.textContent.trim();
    if (sectionTitles[originalTitle]) {
      titleElement.textContent = sectionTitles[originalTitle];
    }
  });
}

// Helper function to update about section with translations
function populateAboutSection(translations) {
  if (translations.about && translations.about.text) {
    const aboutTexts = document.querySelectorAll('.print-about');
    translations.about.text.forEach((text, index) => {
      if (aboutTexts[index]) {
        aboutTexts[index].textContent = text;
      }
    });
  }
}

// Theme handling
function setTheme(theme) {
  document.documentElement.className = theme;
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'dark-theme';
  const newTheme = currentTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';
  setTheme(newTheme);
}

// Initialize theme and language
document.addEventListener('DOMContentLoaded', () => {
  // Set theme
  const savedTheme = localStorage.getItem('theme') || 'dark-theme';
  setTheme(savedTheme);

  // Get saved language or default to Indonesian
  currentLang = localStorage.getItem('selectedLanguage') || 'id';
  document.documentElement.lang = currentLang;

  // Set active state on language button
  updateActiveLanguageButton();

  loadTranslations();

  // Add event listener to sidebar button to update text after toggle
  sidebarBtn.addEventListener("click", function () {
    setTimeout(() => {
      const showContactsBtn = document.querySelector('[data-sidebar-btn] span');
      if (showContactsBtn && translations.sidebar) {
        showContactsBtn.textContent = sidebar.classList.contains('active')
          ? translations.sidebar.hideContacts
          : translations.sidebar.showContacts;
      }
    }, 100);
  });
});

// Load default language (Indonesian)
document.addEventListener('DOMContentLoaded', () => {
  // Set initial active state on language button
  const defaultLangButton = document.querySelector(`.lang-btn[data-lang="${currentLang}"]`);
  if (defaultLangButton) {
    defaultLangButton.classList.add('active');
  }

  loadTranslations();

  // Add event listener to sidebar button to update text after toggle
  sidebarBtn.addEventListener("click", function () {
    setTimeout(() => {
      const showContactsBtn = document.querySelector('[data-sidebar-btn] span');
      if (showContactsBtn && translations.sidebar) {
        showContactsBtn.textContent = sidebar.classList.contains('active')
          ? translations.sidebar.hideContacts
          : translations.sidebar.showContacts;
      }
    }, 100);
  });
});

// Helper function to store original text values
function storeOriginalTextValues() {
  // Store original nav link text
  document.querySelectorAll('[data-nav-link]').forEach(element => {
    if (!element.dataset.originalPage) {
      element.dataset.originalPage = element.textContent.trim().toLowerCase();
    }
  });

  // Store original filter button text
  document.querySelectorAll('[data-filter-btn]').forEach(button => {
    if (!button.dataset.originalText) {
      button.dataset.originalText = button.textContent.trim().toLowerCase();
    }
  });

  // Store original select items text
  document.querySelectorAll('[data-select-item]').forEach(item => {
    if (!item.dataset.originalText) {
      item.dataset.originalText = item.textContent.trim().toLowerCase();
    }
  });

  // Store original portfolio item categories
  document.querySelectorAll('[data-filter-item]').forEach(item => {
    if (!item.dataset.originalCategory) {
      item.dataset.originalCategory = item.dataset.category;
    }
  });
}

// After the changeLanguage function, ensure the updateActiveLanguageButton function works correctly
function updateActiveLanguageButton() {
  // Remove active class from all language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    // Reset border and other styles
    btn.style.border = '';
  });

  // Add active class to the current language button with additional visible styling
  const activeButtons = document.querySelectorAll(`.lang-btn[data-lang="${currentLang}"]`);
  activeButtons.forEach(btn => {
    btn.classList.add('active');
    // Add extra styling for visibility
    // btn.style.border = '1px solid var(--orange-yellow-crayola)';
  });

  console.log(`Language set to: ${currentLang}, Active buttons found: ${activeButtons.length}`);
}

// Let's ensure the DOM contains properly configured language buttons
document.addEventListener('DOMContentLoaded', function () {
  // Add direct click handlers to language buttons to ensure they work
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const lang = btn.getAttribute('data-lang');
    btn.addEventListener('click', function () {
      changeLanguage(lang);
    });

    // Set initial active state
    if (lang === (localStorage.getItem('selectedLanguage') || 'id')) {
      btn.classList.add('active');
    }
  });
});

// Let's force initialize the language buttons when the page is fully loaded
window.addEventListener('load', function () {
  // Force update language buttons active state
  updateActiveLanguageButton();

  // Log the status of language buttons
  const allLangButtons = document.querySelectorAll('.lang-btn');
  console.log(`Total language buttons: ${allLangButtons.length}`);
  allLangButtons.forEach(btn => {
    console.log(`Button: ${btn.getAttribute('data-lang')}, Active: ${btn.classList.contains('active')}`);
  });
});