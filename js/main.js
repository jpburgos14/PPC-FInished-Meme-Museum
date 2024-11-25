// main.js
// Toggle section active class
const sectionNavigator = (targetClass) => {
    const targetSection = document.getElementById(targetClass);
    if (targetSection) {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.remove('active');
        });
        targetSection.classList.add('active');
    }
}

// Navigation to sections
window.addEventListener('load', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(navButton => {
        navButton.addEventListener('click', function (e) {
            const target = this.getAttribute('data-target');
            if (target) {
                e.preventDefault();
                navButtons.forEach(button => {
                    button.classList.remove('active');
                });
                this.classList.add('active');
                sectionNavigator(target);
            }

            if (window.innerWidth < 768) {
                toggleMenu();
            }
        });
    });
});

// Toggle menu function (for smaller screens)
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const nav = document.querySelector('.nav');
    if (menu && nav) {
        nav.classList.toggle('active');
    }
}

// Function to open the modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Function to close the modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Function to open the overlay
function openOverlay(sectionName) {
    const overlayContentArea = document.getElementById("overlayContentArea");

    if (!overlayContentArea) {
        console.error("Error: overlayContentArea not found!");
        return;
    }

    overlayContentArea.innerHTML = '';

    let filename;
    switch (sectionName) {
        case '/':
            filename = 'home-overlay.html';
            break;
        case 'exhibition':
            filename = './overlay/exhibition-overlay.html';
            break;
        case 'history':
            filename = './overlay/history-overlay.html';
            break;
        case 'collection':
            filename = './overlay/collection-overlay.html';
            break;
        default:
            console.error("Error: Invalid section name!");
            return;
    }

    fetch(filename)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            overlayContentArea.innerHTML = html;
            console.log("Overlay content loaded successfully!");
        })
        .catch(error => {
            console.error("Error fetching overlay content:", error);
            overlayContentArea.innerHTML = `<p class="error-message">Error loading overlay content. Please try again later.</p>`;
        });

    const overlaySection = document.getElementById("overlaySection");
    if (overlaySection) {
        overlaySection.style.display = "flex";
    } else {
        console.error("Error: overlaySection not found!");
    }
}

// Function to close the overlay
function closeOverlay() {
    document.getElementById("overlaySection").style.display = "none";
}