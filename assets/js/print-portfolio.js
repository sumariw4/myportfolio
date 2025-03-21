'use strict';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get the print buttons (both mobile and desktop)
    const printBtnMobile = document.getElementById('printPortfolioBtnMobile');
    const printBtnDesktop = document.getElementById('printPortfolioBtnDesktop');

    // Add click event to the print buttons
    if (printBtnMobile) {
        printBtnMobile.addEventListener('click', prepareAndPrintPortfolio);
    }

    if (printBtnDesktop) {
        printBtnDesktop.addEventListener('click', prepareAndPrintPortfolio);
    }

    // Function to prepare the print container and trigger printing
    function prepareAndPrintPortfolio() {
        // Get current language
        const currentLang = document.documentElement.lang || 'id';

        // Force refresh translations before printing to ensure latest language is used
        fetch(`./assets/lang/${currentLang}.json`)
            .then(response => response.json())
            .then(data => {
                window.translations = data;
                preparePrintContainerWithTranslations();
            })
            .catch(error => {
                console.error('Error loading translations for print:', error);
                // Proceed anyway with default text or existing translations
                preparePrintContainerWithTranslations();
            });
    }

    function preparePrintContainerWithTranslations() {
        // Populate the print container with data
        populatePrintContainer();

        // Show the print container (it's initially hidden)
        const printContainer = document.querySelector('.print-container');
        printContainer.style.display = 'block';

        // Trigger the browser's print functionality
        setTimeout(() => {
            window.print();

            // Hide the print container again after printing
            setTimeout(() => {
                printContainer.style.display = 'none';
            }, 500);
        }, 300);
    }

    // Function to populate the print container with portfolio data
    function populatePrintContainer() {
        // Get current language translations
        const translations = window.translations || {};
        const currentLang = document.documentElement.lang || 'id';

        // Update print header content with translations
        updatePrintHeaderWithTranslations(translations);

        // Add avatar to print header
        const avatarImg = document.querySelector('.avatar-box img');
        if (avatarImg) {
            const printHeader = document.querySelector('.print-header');
            if (printHeader) {
                // Check if avatar already exists to avoid duplication
                if (!document.querySelector('.print-avatar')) {
                    const printAvatar = document.createElement('img');
                    printAvatar.src = avatarImg.src;
                    printAvatar.alt = avatarImg.alt;
                    printAvatar.className = 'print-avatar';
                    printHeader.insertBefore(printAvatar, printHeader.firstChild);
                }
            }
        }

        // Clear existing sections to rebuild in correct order
        const printContainer = document.querySelector('.print-container');
        // Keep the header, remove all sections
        const sections = printContainer.querySelectorAll('.print-section');
        sections.forEach(section => section.remove());

        // Create and append sections in the desired order
        const aboutSection = createAboutSection(translations);
        printContainer.appendChild(aboutSection);

        const educationSection = createEducationSection(translations);
        printContainer.appendChild(educationSection);

        const experienceSection = createExperienceSection(translations);
        printContainer.appendChild(experienceSection);

        const skillsSection = createSkillsSection(translations);
        printContainer.appendChild(skillsSection);

        const portfolioSection = createPortfolioSection(translations);
        printContainer.appendChild(portfolioSection);

        // Add page break before portfolio section if content is long
        portfolioSection.classList.add('page-break-before');

        // Add footer with date
        addFooter(translations, currentLang);
    }

    // Create About section
    function createAboutSection(translations) {
        const section = document.createElement('div');
        section.className = 'print-section';

        const title = document.createElement('h2');
        title.className = 'print-section-title';
        title.textContent = translations.about?.title || "About Me";
        section.appendChild(title);

        // Add about paragraphs
        if (translations.about && translations.about.text) {
            translations.about.text.forEach(text => {
                const paragraph = document.createElement('p');
                paragraph.className = 'print-about';
                paragraph.textContent = text;
                section.appendChild(paragraph);
            });
        } else {
            // Fallback to getting text from DOM
            const aboutTexts = document.querySelectorAll('.about-text p');
            aboutTexts.forEach(p => {
                const paragraph = document.createElement('p');
                paragraph.className = 'print-about';
                paragraph.textContent = p.textContent;
                section.appendChild(paragraph);
            });
        }

        return section;
    }

    // Create Education section
    function createEducationSection(translations) {
        const section = document.createElement('div');
        section.className = 'print-section';

        const title = document.createElement('h2');
        title.className = 'print-section-title';
        title.textContent = translations.resume?.education?.title || "Education";
        section.appendChild(title);

        const educationList = document.createElement('div');
        educationList.className = 'print-education-list';

        // Get education items from translations or DOM
        if (translations.resume && translations.resume.education && translations.resume.education.items) {
            const educationItems = translations.resume.education.items;

            educationItems.forEach(item => {
                const educationItem = document.createElement('div');
                educationItem.className = 'print-experience-item'; // Reuse experience styles

                const schoolEl = document.createElement('div');
                schoolEl.className = 'print-experience-title';
                schoolEl.textContent = item.school;

                const periodEl = document.createElement('div');
                periodEl.className = 'print-experience-period';
                periodEl.textContent = item.years;

                const descriptionEl = document.createElement('div');
                descriptionEl.className = 'print-experience-description';
                descriptionEl.textContent = item.description;

                educationItem.appendChild(schoolEl);
                educationItem.appendChild(periodEl);
                educationItem.appendChild(descriptionEl);

                educationList.appendChild(educationItem);
            });
        } else {
            // Fallback to directly getting education items from the DOM
            const educationItems = document.querySelectorAll('.timeline:first-of-type .timeline-item');

            educationItems.forEach(item => {
                const school = item.querySelector('.timeline-item-title').textContent;
                const period = item.querySelector('span').textContent;
                const description = item.querySelector('.timeline-text').textContent;

                const educationItem = document.createElement('div');
                educationItem.className = 'print-experience-item';

                const schoolEl = document.createElement('div');
                schoolEl.className = 'print-experience-title';
                schoolEl.textContent = school;

                const periodEl = document.createElement('div');
                periodEl.className = 'print-experience-period';
                periodEl.textContent = period;

                const descriptionEl = document.createElement('div');
                descriptionEl.className = 'print-experience-description';
                descriptionEl.textContent = description;

                educationItem.appendChild(schoolEl);
                educationItem.appendChild(periodEl);
                educationItem.appendChild(descriptionEl);

                educationList.appendChild(educationItem);
            });
        }

        section.appendChild(educationList);
        return section;
    }

    // Create Experience section
    function createExperienceSection(translations) {
        const section = document.createElement('div');
        section.className = 'print-section';

        const title = document.createElement('h2');
        title.className = 'print-section-title';
        title.textContent = translations.resume?.experience?.title || "Professional Experience";
        section.appendChild(title);

        const experienceList = document.createElement('div');
        experienceList.className = 'print-experience-list';

        // If we have translated experience items, use those
        if (translations.resume && translations.resume.experience && translations.resume.experience.items) {
            const experienceItems = translations.resume.experience.items;

            experienceItems.forEach(item => {
                const experienceItem = document.createElement('div');
                experienceItem.className = 'print-experience-item';

                const titleEl = document.createElement('div');
                titleEl.className = 'print-experience-title';
                titleEl.textContent = item.position;

                const periodEl = document.createElement('div');
                periodEl.className = 'print-experience-period';
                periodEl.textContent = item.years;

                const descriptionEl = document.createElement('div');
                descriptionEl.className = 'print-experience-description';
                descriptionEl.innerHTML = item.description.replace(/\n/g, '<br>');

                experienceItem.appendChild(titleEl);
                experienceItem.appendChild(periodEl);
                experienceItem.appendChild(descriptionEl);

                experienceList.appendChild(experienceItem);
            });
        } else {
            // Fallback to directly getting experience items from the DOM
            const experienceItems = document.querySelectorAll('.timeline:nth-of-type(2) .timeline-item');

            experienceItems.forEach(item => {
                const position = item.querySelector('.timeline-item-title').textContent;
                const period = item.querySelector('span').textContent;
                const description = item.querySelector('.timeline-text').innerHTML;

                const experienceItem = document.createElement('div');
                experienceItem.className = 'print-experience-item';

                const titleEl = document.createElement('div');
                titleEl.className = 'print-experience-title';
                titleEl.textContent = position;

                const periodEl = document.createElement('div');
                periodEl.className = 'print-experience-period';
                periodEl.textContent = period;

                const descriptionEl = document.createElement('div');
                descriptionEl.className = 'print-experience-description';
                descriptionEl.innerHTML = description;

                experienceItem.appendChild(titleEl);
                experienceItem.appendChild(periodEl);
                experienceItem.appendChild(descriptionEl);

                experienceList.appendChild(experienceItem);
            });
        }

        section.appendChild(experienceList);
        return section;
    }

    // Create Skills section
    function createSkillsSection(translations) {
        const section = document.createElement('div');
        section.className = 'print-section';

        const title = document.createElement('h2');
        title.className = 'print-section-title';
        title.textContent = translations.resume?.skills?.title || "Skills & Expertise";
        section.appendChild(title);

        const skillsList = document.createElement('div');
        skillsList.className = 'print-skills-list';

        // Get skills from the resume page
        const skills = document.querySelectorAll('.skills-item');

        skills.forEach(skillItem => {
            const titleWrapper = skillItem.querySelector('.title-wrapper');
            const skillName = titleWrapper.querySelector('h5').textContent;
            const skillValue = parseInt(titleWrapper.querySelector('data').getAttribute('value'));

            // Convert percentage to level 1-5
            const level = Math.ceil(skillValue / 20);

            const skillItemElement = document.createElement('div');
            skillItemElement.className = 'print-skills-item';

            // Add name with percentage
            const nameSpan = document.createElement('span');
            nameSpan.textContent = `${skillName} (${skillValue}%)`;
            skillItemElement.appendChild(nameSpan);

            // Add a level indicator
            const levelIndicator = document.createElement('span');
            levelIndicator.className = 'print-skills-level';
            levelIndicator.setAttribute('data-level', level);
            levelIndicator.setAttribute('data-percentage', skillValue);

            // Set width directly based on percentage
            levelIndicator.style.position = 'relative';
            levelIndicator.style.width = '60px';
            levelIndicator.style.height = '8px';
            levelIndicator.style.backgroundColor = '#eee';
            levelIndicator.style.borderRadius = '4px';
            levelIndicator.style.overflow = 'hidden';

            // Add inner fill element with the actual percentage width
            const fillElement = document.createElement('span');
            fillElement.style.position = 'absolute';
            fillElement.style.left = '0';
            fillElement.style.top = '0';
            fillElement.style.height = '100%';
            fillElement.style.width = `${skillValue}%`;
            fillElement.style.backgroundColor = '#666';

            levelIndicator.appendChild(fillElement);
            skillItemElement.appendChild(levelIndicator);

            skillsList.appendChild(skillItemElement);
        });

        section.appendChild(skillsList);
        return section;
    }

    // Create Portfolio section
    function createPortfolioSection(translations) {
        const section = document.createElement('div');
        section.className = 'print-section';

        const title = document.createElement('h2');
        title.className = 'print-section-title';
        title.textContent = translations.portfolio?.title || "Portfolio Projects";
        section.appendChild(title);

        const projectList = document.createElement('div');
        projectList.className = 'print-project-list';

        // Get project items from the portfolio page
        const projectItems = document.querySelectorAll('.project-item.active');

        // Limit to the first 6 projects for better print layout
        const maxProjects = 6;
        const projectsToShow = Array.from(projectItems).slice(0, maxProjects);

        // Translate some common text strings
        const noDescAvailable = translations.portfolio?.modal?.noDescription || "No description available.";
        const techsUsed = translations.portfolio?.modal?.technologiesUsed || "Technologies used:";

        // Add portfolio projects
        projectsToShow.forEach(item => {
            // ...existing code for each project...
            const title = item.querySelector('.project-title').textContent;
            const category = item.querySelector('.project-category').textContent;

            // Get details from the hidden portfolio details if they exist
            const details = item.querySelector('.portfolio-details');
            let description = noDescAvailable;
            let technologies = [];

            if (details) {
                const descElement = details.querySelector('.portfolio-description');
                if (descElement) {
                    description = descElement.textContent;
                }

                const techsElement = details.querySelector('.portfolio-technologies');
                if (techsElement) {
                    const techItems = techsElement.querySelectorAll('li');
                    techItems.forEach(tech => {
                        technologies.push(tech.textContent);
                    });
                }
            }

            // Create project item for print
            const projectItem = document.createElement('div');
            projectItem.className = 'print-project-item';

            const titleEl = document.createElement('div');
            titleEl.className = 'print-project-title';
            titleEl.textContent = title;

            const categoryEl = document.createElement('div');
            categoryEl.className = 'print-project-category';
            categoryEl.textContent = category;

            const descriptionEl = document.createElement('div');
            descriptionEl.className = 'print-project-description';

            // Limit description length for better print layout
            descriptionEl.textContent = description.length > 120 ?
                description.substring(0, 120) + '...' : description;

            projectItem.appendChild(titleEl);
            projectItem.appendChild(categoryEl);
            projectItem.appendChild(descriptionEl);

            // Add technologies if they exist
            if (technologies.length > 0) {
                const techsContainer = document.createElement('ul');
                techsContainer.className = 'print-project-technologies';

                // Add a small header for technologies if we have them
                const techHeader = document.createElement('li');
                techHeader.className = 'tech-header';
                techHeader.textContent = techsUsed;
                techsContainer.appendChild(techHeader);

                technologies.forEach(tech => {
                    const techItem = document.createElement('li');
                    techItem.textContent = tech;
                    techsContainer.appendChild(techItem);
                });

                projectItem.appendChild(techsContainer);
            }

            projectList.appendChild(projectItem);
        });

        // Add note if showing limited projects
        if (projectItems.length > maxProjects) {
            const moreProjectsText = translations.portfolio?.moreProjects ||
                `Showing ${maxProjects} of ${projectItems.length} projects. Visit website for more.`;

            const noteEl = document.createElement('div');
            noteEl.className = 'print-project-note';
            noteEl.textContent = moreProjectsText;
            noteEl.style.gridColumn = '1 / -1';
            noteEl.style.textAlign = 'center';
            noteEl.style.marginTop = '10px';
            noteEl.style.fontSize = '9pt';
            noteEl.style.fontStyle = 'italic';
            noteEl.style.color = '#666';

            projectList.appendChild(noteEl);
        }

        section.appendChild(projectList);
        return section;
    }

    // Update print header with translations
    function updatePrintHeaderWithTranslations(translations) {
        // We don't need to translate the name

        // Translate the title if available
        const titleElement = document.querySelector('.print-title');
        if (titleElement && translations.sidebar && translations.sidebar.title) {
            titleElement.textContent = translations.sidebar.title;
        }

        // Translate contact labels if available
        const contactLabels = {
            "mail-outline": translations.sidebar?.contact?.email || "Email",
            "phone-portrait-outline": translations.sidebar?.contact?.phone || "Phone",
            "globe-outline": translations.sidebar?.contact?.website || "Website",
            "location-outline": translations.sidebar?.contact?.location || "Location"
        };

        // Update contact item icons with translated labels for screen readers
        document.querySelectorAll('.print-contact span ion-icon').forEach(icon => {
            const iconName = icon.getAttribute('name');
            if (iconName && contactLabels[iconName]) {
                icon.setAttribute('aria-label', contactLabels[iconName]);
            }
        });
    }

    // Update section titles with translations
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

    // Populate About section with translations
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

    // Add footer with current date
    function addFooter(translations, currentLang) {
        const printContainer = document.querySelector('.print-container');

        // Remove existing footer if it exists
        const existingFooter = document.querySelector('.print-footer');
        if (existingFooter) {
            existingFooter.remove();
        }

        const footer = document.createElement('div');
        footer.className = 'print-footer';

        const now = new Date();
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

        // Translate "Generated on" if available
        const generatedText = translations.portfolio?.generatedOn || "Generated on";
        footer.textContent = `${generatedText} ${now.toLocaleDateString(currentLang, dateOptions)} • ${window.location.host}`;

        printContainer.appendChild(footer);
    }

    // Populate skills section with translations
    function populateSkillsSection(translations) {
        const skillsList = document.querySelector('.print-skills-list');
        skillsList.innerHTML = '';

        // Get skills from the resume page
        const skills = document.querySelectorAll('.skills-item');

        skills.forEach(skillItem => {
            const titleWrapper = skillItem.querySelector('.title-wrapper');
            const skillName = titleWrapper.querySelector('h5').textContent;
            const skillValue = parseInt(titleWrapper.querySelector('data').getAttribute('value'));

            // Convert percentage to level 1-5
            const level = Math.ceil(skillValue / 20);

            const skillItemElement = document.createElement('div');
            skillItemElement.className = 'print-skills-item';

            // Add name with percentage
            const nameSpan = document.createElement('span');
            nameSpan.textContent = `${skillName} (${skillValue}%)`;
            skillItemElement.appendChild(nameSpan);

            // Add a level indicator
            const levelIndicator = document.createElement('span');
            levelIndicator.className = 'print-skills-level';
            levelIndicator.setAttribute('data-level', level);
            levelIndicator.setAttribute('data-percentage', skillValue);

            // Set width directly based on percentage
            levelIndicator.style.position = 'relative';
            levelIndicator.style.width = '60px';
            levelIndicator.style.height = '8px';
            levelIndicator.style.backgroundColor = '#eee';
            levelIndicator.style.borderRadius = '4px';
            levelIndicator.style.overflow = 'hidden';

            // Add inner fill element with the actual percentage width
            const fillElement = document.createElement('span');
            fillElement.style.position = 'absolute';
            fillElement.style.left = '0';
            fillElement.style.top = '0';
            fillElement.style.height = '100%';
            fillElement.style.width = `${skillValue}%`;
            fillElement.style.backgroundColor = '#666';

            levelIndicator.appendChild(fillElement);
            skillItemElement.appendChild(levelIndicator);

            skillsList.appendChild(skillItemElement);
        });
    }

    // Populate experience section with translations
    function populateExperienceSection(translations) {
        const experienceList = document.querySelector('.print-experience-list');
        experienceList.innerHTML = '';

        // If we have translated experience items, use those
        if (translations.resume && translations.resume.experience && translations.resume.experience.items) {
            const experienceItems = translations.resume.experience.items;

            experienceItems.forEach(item => {
                const experienceItem = document.createElement('div');
                experienceItem.className = 'print-experience-item';

                const titleEl = document.createElement('div');
                titleEl.className = 'print-experience-title';
                titleEl.textContent = item.position;

                const periodEl = document.createElement('div');
                periodEl.className = 'print-experience-period';
                periodEl.textContent = item.years;

                const descriptionEl = document.createElement('div');
                descriptionEl.className = 'print-experience-description';
                descriptionEl.innerHTML = item.description.replace(/\n/g, '<br>');

                experienceItem.appendChild(titleEl);
                experienceItem.appendChild(periodEl);
                experienceItem.appendChild(descriptionEl);

                experienceList.appendChild(experienceItem);
            });
        } else {
            // Fallback to directly getting experience items from the DOM
            const experienceItems = document.querySelectorAll('.timeline:nth-of-type(2) .timeline-item');

            experienceItems.forEach(item => {
                const position = item.querySelector('.timeline-item-title').textContent;
                const period = item.querySelector('span').textContent;
                const description = item.querySelector('.timeline-text').innerHTML;

                const experienceItem = document.createElement('div');
                experienceItem.className = 'print-experience-item';

                const titleEl = document.createElement('div');
                titleEl.className = 'print-experience-title';
                titleEl.textContent = position;

                const periodEl = document.createElement('div');
                periodEl.className = 'print-experience-period';
                periodEl.textContent = period;

                const descriptionEl = document.createElement('div');
                descriptionEl.className = 'print-experience-description';
                descriptionEl.innerHTML = description;

                experienceItem.appendChild(titleEl);
                experienceItem.appendChild(periodEl);
                experienceItem.appendChild(descriptionEl);

                experienceList.appendChild(experienceItem);
            });
        }
    }

    // Populate projects section with translations
    function populateProjectsSection(translations) {
        const projectList = document.querySelector('.print-project-list');
        projectList.innerHTML = '';

        // Get project items from the portfolio page
        const projectItems = document.querySelectorAll('.project-item.active');

        // Limit to the first 6 projects for better print layout
        const maxProjects = 6;
        const projectsToShow = Array.from(projectItems).slice(0, maxProjects);

        // Translate some common text strings
        const noDescAvailable = translations.portfolio?.modal?.noDescription || "No description available.";
        const techsUsed = translations.portfolio?.modal?.technologiesUsed || "Technologies used:";

        projectsToShow.forEach(item => {
            const title = item.querySelector('.project-title').textContent;
            const category = item.querySelector('.project-category').textContent;

            // Get details from the hidden portfolio details if they exist
            const details = item.querySelector('.portfolio-details');
            let description = noDescAvailable;
            let technologies = [];

            if (details) {
                const descElement = details.querySelector('.portfolio-description');
                if (descElement) {
                    description = descElement.textContent;
                }

                const techsElement = details.querySelector('.portfolio-technologies');
                if (techsElement) {
                    const techItems = techsElement.querySelectorAll('li');
                    techItems.forEach(tech => {
                        technologies.push(tech.textContent);
                    });
                }
            }

            // Create project item for print
            const projectItem = document.createElement('div');
            projectItem.className = 'print-project-item';

            const titleEl = document.createElement('div');
            titleEl.className = 'print-project-title';
            titleEl.textContent = title;

            const categoryEl = document.createElement('div');
            categoryEl.className = 'print-project-category';
            categoryEl.textContent = category;

            const descriptionEl = document.createElement('div');
            descriptionEl.className = 'print-project-description';

            // Limit description length for better print layout
            descriptionEl.textContent = description.length > 120 ?
                description.substring(0, 120) + '...' : description;

            projectItem.appendChild(titleEl);
            projectItem.appendChild(categoryEl);
            projectItem.appendChild(descriptionEl);

            // Add technologies if they exist
            if (technologies.length > 0) {
                const techsContainer = document.createElement('ul');
                techsContainer.className = 'print-project-technologies';

                // Add a small header for technologies if we have them
                const techHeader = document.createElement('li');
                techHeader.className = 'tech-header';
                techHeader.textContent = techsUsed;
                techsContainer.appendChild(techHeader);

                technologies.forEach(tech => {
                    const techItem = document.createElement('li');
                    techItem.textContent = tech;
                    techsContainer.appendChild(techItem);
                });

                projectItem.appendChild(techsContainer);
            }

            projectList.appendChild(projectItem);
        });

        // Add note if showing limited projects
        if (projectItems.length > maxProjects) {
            const moreProjectsText = translations.portfolio?.moreProjects ||
                `Showing ${maxProjects} of ${projectItems.length} projects. Visit website for more.`;

            const noteEl = document.createElement('div');
            noteEl.className = 'print-project-note';
            noteEl.textContent = moreProjectsText;
            noteEl.style.gridColumn = '1 / -1';
            noteEl.style.textAlign = 'center';
            noteEl.style.marginTop = '10px';
            noteEl.style.fontSize = '9pt';
            noteEl.style.fontStyle = 'italic';
            noteEl.style.color = '#666';

            projectList.appendChild(noteEl);
        }
    }

    // Update print button text when language changes
    document.addEventListener('languageChanged', function (event) {
        updatePrintButtonText();

        // If the user changes the language and immediately prints, make sure translations are current
        const currentLang = event.detail.language;
        if (currentLang) {
            fetch(`./assets/lang/${currentLang}.json`)
                .then(response => response.json())
                .then(data => {
                    window.translations = data;
                })
                .catch(error => {
                    console.error('Error updating translations after language change:', error);
                });
        }
    });

    function updatePrintButtonText() {
        const printTextElement = document.querySelector('[data-print-text]');
        if (printTextElement && window.translations && window.translations.portfolio && window.translations.portfolio.printButton) {
            printTextElement.textContent = window.translations.portfolio.printButton;
        }
    }
});
