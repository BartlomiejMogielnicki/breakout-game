const rulesBtn = document.getElementById('info-btn');
const closeBtn = document.getElementById('close-btn');
const rulesContainer = document.getElementById('rules-container');

// Event listeners
rulesBtn.addEventListener('click', () => {
    rulesContainer.classList.add('show');
})

closeBtn.addEventListener('click', () => {
    rulesContainer.classList.remove('show');
})