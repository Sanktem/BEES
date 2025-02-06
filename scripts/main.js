document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const content2 = document.getElementById('content2');
    const content3 = document.getElementById('content3');
    const links = document.querySelectorAll('.middle nav ul li a');
    const links2 = document.querySelectorAll('.right nav ul li a');
    const links3 = document.querySelectorAll('.left nav ul li a');

    const contentMap = {
        beeYard: 'content/beeYard.html',
        apiary: 'content/apiary.html',
        crispr: 'content/crispr.html'
    };

    const contentMap2 = {
        inventory: 'content/inventory.html',
        upgrades: 'content/upgrades.html'
    };

    const contentMap3 = {
        resources: 'content/resources.html'
    };

    function loadContent(url, container, callback) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                container.innerHTML = data;
                if (callback) callback();
            })
            .catch(error => {
                console.error('Error loading content:', error);
                container.innerHTML = '<h3>Error</h3><p>Failed to load content.</p>';
            });
    }

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            links.forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');

            const sectionId = event.target.id;
            const url = contentMap[sectionId];

            if (url) {
                loadContent(url, content, sectionId === 'beeYard' ? loadInitialState : null);
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
                loadContent(url, content2, sectionId === 'upgrades' ? attachUpgradeButtonListener : null);
            } else {
                content2.innerHTML = '<h3>Unknown</h3><p>Content not found.</p>';
            }
        });
    });

    links3.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            links3.forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');

            const sectionId = event.target.id;
            const url = contentMap3[sectionId];

            if (url) {
                loadContent(url, content3);
            } else {
                content3.innerHTML = '<h3>Unknown</h3><p>Content not found.</p>';
            }
        });
    });

    loadInitialContent();
});

function loadInitialContent() {
    const initialBeeYardLink = document.querySelector('.middle nav ul li a#beeYard');
    const initialInventoryLink = document.querySelector('.right nav ul li a#inventory');
    const initialResourcesLink = document.querySelector('.left nav ul li a#resources');

    if (initialBeeYardLink) {
        initialBeeYardLink.click();
    }

    if (initialInventoryLink) {
        initialInventoryLink.click();
    }

    if (initialResourcesLink) {
        initialResourcesLink.click();
    }
}

function attachUpgradeButtonListener() {
    const upgradeButton = document.getElementById('Upgrade1');
    if (upgradeButton) {
        console.log('upgradeButton found');
        upgradeButton.addEventListener('click', () => {
            console.log('upgradeButton clicked');
            addBeehive();
            upgradeLevel_beehouse++;
            upgradePrice_beehouse += 10;
            upgradeButton.parentElement.previousElementSibling.textContent = upgradeLevel_beehouse;
            upgradeButton.parentElement.previousElementSibling.previousElementSibling.textContent = upgradePrice_beehouse;

            // Save the state to localStorage
            localStorage.setItem('upgradeLevel_beehouse', upgradeLevel_beehouse);
            localStorage.setItem('upgradePrice_beehouse', upgradePrice_beehouse);

            if (upgradeLevel_beehouse >= maxUpgrades_beehouse) {
                upgradeButton.disabled = true;
            }
        });

        // Initialize the button state
        upgradeButton.parentElement.previousElementSibling.textContent = upgradeLevel_beehouse;
        upgradeButton.parentElement.previousElementSibling.previousElementSibling.textContent = upgradePrice_beehouse;
        if (upgradeLevel_beehouse >= maxUpgrades_beehouse) {
            upgradeButton.disabled = true;
        }
    } else {
        console.log('upgradeButton not found, retrying...');
        setTimeout(attachUpgradeButtonListener, 100); // Retry after 100ms
    }
}

function addBeehive() {
    const hiveArea = document.getElementById('hive_area');
    if (!hiveArea) {
        console.error('hive_area not found');
        return;
    }

    const newBeehive = document.createElement('div');
    newBeehive.classList.add('beehive');
    newBeehive.innerHTML = `
        <br>
        <button class="button">Add Princess</button>
        <button class="button">Add Drone</button><br><br>
        Current Princesses: <span>0</span><br>
        Current Drones: <span>0</span>
    `;
    hiveArea.appendChild(newBeehive);
}

function loadInitialState() {
    for (let i = 0; i < upgradeLevel_beehouse; i++) {
        addBeehive();
    }
}