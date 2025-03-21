/**
 * Language-Print Synchronization Utility
 * This script ensures that print elements stay in sync with language changes
 * without requiring a page reload.
 */

(function () {
    // Initialize print container when language changes
    document.addEventListener('languageChanged', function (event) {
        // Pre-populate the print container with the current language
        // but keep it hidden
        const printContainer = document.querySelector('.print-container');
        if (printContainer) {
            // Get current language
            const currentLang = document.documentElement.lang || 'id';
            const translations = window.translations || {};

            // Pre-update the print container with current language
            updatePrintHeaderWithTranslations(translations);
            updatePrintSectionTitles(translations);
            updatePrintAboutSection(translations);

            // This pre-populates but keeps the container hidden
            // When the user clicks print, it will already have correct translations
        }
    });

    // Helper function to update print header with translations
    function updatePrintHeaderWithTranslations(translations) {
        // Update title if available
        const titleElement = document.querySelector('.print-title');
        if (titleElement && translations.sidebar && translations.sidebar.title) {
            titleElement.textContent = translations.sidebar.title;
        }

        // Update contact labels if available
        const contactLabels = {
            "mail-outline": translations.sidebar?.contact?.email || "Email",
            "phone-portrait-outline": translations.sidebar?.contact?.phone || "Phone",
            "globe-outline": translations.sidebar?.contact?.website || "Website",
            "location-outline": translations.sidebar?.contact?.location || "Location"
        };

        // Update aria-labels for screen readers
        document.querySelectorAll('.print-contact span ion-icon').forEach(icon => {
            const iconName = icon.getAttribute('name');
            if (iconName && contactLabels[iconName]) {
                icon.setAttribute('aria-label', contactLabels[iconName]);
            }
        });
    }

    // Helper function to update section titles
    function updatePrintSectionTitles(translations) {
        const titleMap = {
            "About Me": translations.about?.title || "About Me",
            "Professional Experience": translations.resume?.experience?.title || "Professional Experience",
            "Skills & Expertise": translations.resume?.skills?.title || "Skills & Expertise",
            "Portfolio Projects": translations.portfolio?.title || "Portfolio Projects"
        };

        document.querySelectorAll('.print-section-title').forEach(element => {
            const key = element.textContent.trim();
            if (titleMap[key]) {
                element.textContent = titleMap[key];
            }
        });
    }

    // Helper function to update about section
    function updatePrintAboutSection(translations) {
        if (translations.about && translations.about.text) {
            const aboutTexts = document.querySelectorAll('.print-about');
            translations.about.text.forEach((text, index) => {
                if (aboutTexts[index]) {
                    aboutTexts[index].textContent = text;
                }
            });
        }
    }
})();
