console.log('content.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    let upgradeLevel_beehouse = parseInt(localStorage.getItem('upgradeLevel_beehouse')) || 0;
    let upgradePrice_beehouse = parseInt(localStorage.getItem('upgradePrice_beehouse')) || 100;
    const maxUpgrades_beehouse = 10;

    // Function to add a new beehive
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

    // Function to attach event listener to the upgrade button
    function attachUpgradeButtonListener() {
        const upgradeButton = document.getElementById('Upgrade1');
        if (upgradeButton) {
            console.log('upgradeButton found');
            upgradeButton.addEventListener('click', () => {
                if (upgradeLevel_beehouse < maxUpgrades_beehouse) {
                    console.log('upgradeButton clicked');
                    addBeehive();
                    upgradeLevel_beehouse++;
                    upgradePrice_beehouse += 10;
                    upgradeButton.parentElement.previousElementSibling.textContent = upgradeLevel_beehouse;
                    upgradeButton.parentElement.previousElementSibling.previousElementSibling.textContent = upgradePrice_beehouse;

                    // Save the state to localStorage
                    localStorage.setItem('upgradeLevel_beehouse', upgradeLevel_beehouse);
                    localStorage.setItem('upgradePrice_beehouse', upgradePrice_beehouse);
                } else {
                    console.log('Maximum upgrades reached');
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

    // Load the initial state
    function loadInitialState() {
        for (let i = 0; i < upgradeLevel_beehouse; i++) {
            addBeehive();
        }
    }

    // Initial call to attach the event listener and load the state
    attachUpgradeButtonListener();
    loadInitialState();
});