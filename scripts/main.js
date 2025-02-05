document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const content2 = document.getElementById('content2');
    const links = document.querySelectorAll('.middle nav ul li a');
    const links2 = document.querySelectorAll('.right nav ul li a');

    const contentMap = {
        beeYard: 'content/beeYard.html',
        apiary: 'content/apiary.html',
        crispr: 'content/crispr.html'
    };

    const contentMap2 = {
        inventory: 'content/inventory.html',
        upgrades: 'content/upgrades.html'
    };

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            links.forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');

            const sectionId = event.target.id;
            const url = contentMap[sectionId];

            if (url) {
                fetch(url)
                    .then(response => response.text())
                    .then(data => {
                        content.innerHTML = data;
                    })
                    .catch(error => {
                        console.error('Error loading content:', error);
                        content.innerHTML = '<h3>Error</h3><p>Failed to load content.</p>';
                    });
            } else {
                content.innerHTML = '<h3>Unknown</h3><p>Content not found.</p>';
            }
        });
    });

    links2.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            links2.forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');

            const sectionId = event.target.id;
            const url = contentMap2[sectionId];

            if (url) {
                fetch(url)
                    .then(response => response.text())
                    .then(data => {
                        content2.innerHTML = data;
                    })
                    .catch(error => {
                        console.error('Error loading content:', error);
                        content2.innerHTML = '<h3>Error</h3><p>Failed to load content.</p>';
                    });
            } else {
                content2.innerHTML = '<h3>Unknown</h3><p>Content not found.</p>';
            }
        });
    });

    loadInitialContent();
});

function loadInitialContent() {
    const initialBeeYardLink = document.querySelector('.middle nav ul li a#beeYard');
    const initialInventoryLink = document.querySelector('.right nav ul li a#inventory');

    if (initialBeeYardLink) {
        initialBeeYardLink.click();
    }

    if (initialInventoryLink) {
        initialInventoryLink.click();
    }
}