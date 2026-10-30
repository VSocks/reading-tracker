document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById('reset-data');
    const clearButton = document.getElementById('clear-data');
    const getButton = document.getElementById('get-data');

    resetButton.addEventListener('click', () => {
        localStorage.clear();
        fetchData();
        alert('Data has been reset.');
    });

    clearButton.addEventListener('click', () => {
        localStorage.clear();
        alert('All data has been cleared.');
    });

    getButton.addEventListener('click', () => {
        fetchData();
        alert('Data has been fetched and stored in localStorage.');
    });
});


function fetchData() {
    fetch('./data/seed.json')
        .then(response => response.text())
        .then(data => {
            localStorage.setItem('store.js', data);
        })
        .catch(error => {
            console.error('Error fetching store.js:', error);
        });
};