const openFormBtn = document.getElementById('openFormBtn');     // Button to open modal
const closeFormBtn = document.getElementById('closeFormBtn');   // Button to close modal
const formModal = document.getElementById('formModal');         // The modal container
const applicantForm = document.getElementById('applicantForm'); // The form itself
const cardContainer = document.getElementById('cardContainer'); // Where cards go
const filterButtons = document.getElementById('.filter-btn');   // Filter buttons

// In-memory state and load from localStorage
let applicants = [];    // This will hold all submitted applicant objects
let currentFilter = 'all';    // Controls which cards to show

// Function to check if any applicants are saved in localStorage
const storedApplicants = localStorage.getItem('applicants');
  if (storedApplicants) {
    applicants = JSON.parse(storedApplicants);
    renderCards();  // Load them on page load 
  }

// Event to Open and Close Modal
openFormBtn.addEventListener('click', () => {
  formModal.classList.add('hidden');  // Hide modal
});

closeFormBtn.addEventListener('click', () => {
  formModal.classList.add('hidden');
});

// Handle Form Submission
applicantForm.addEventListener('submit', (e) => {
  e.preventDefault();   // Prevent page refresh

  const name = document.getElementById('name').value.trim();
  const position = document.getElementById('position').value.trim();
  const company = document.getElementById('company').value.trim();
  const status = document.getElementById('status').value.trim();
  const date = document.getElementById('date').value.trim();

  const newApplicant = {
    id: Date.now(),   // unique ID
    name,
    position,
    company,
    status,
    date,
  };

  // Add to the array and save to localStorage
  applicants.push(newApplicant);
  localStorage.setItem('applicants', JSON.stringify(applicants));

  // Update the UI and reset
  renderCards();
  applicantForm.reset();  // Clear form fields
  formModal.classList.add('hidden');  // Close modal
});

// Function to render all applicant cards
function renderCards() {
  // Clear any existing cards
  cardContainer.innerHTML = '';

  // Filter based on current status
  const filtered = currentFilter === 'all'
    ? applicants
    : applicants.filter(app => app.status === currentFilter);

  // Loop through each applicant and create a card
  filtered.forEach(app => {
    // Create a card container
    const card = document.createElement('div');
    card.classList.add('card');

    // Set inner HTML for the card
    card.innerHTML = `
      <h3>${app.position} @ ${app.company}</h3>
      <small>${app.name} • ${app.date}</small>
      <span class="badge ${app.status}">${caplitalize(app.status)}</span>
      <div class="card-actions">
        <button onClick="deleteApplicant(${app.id}">❌</button>
      </div>
    `;

    // Append to card grid
    cardContainer.appendChild(card);
  });
}

// Delete a card
window.deleteApplicant = function(id) {
  // Remove the applicant from the array
  applicants = applicants.filter(app => app.id !== id);
  // Save the updated list
  localStorage.setItem('applicants', JSON.stringify(applicants));
  // Re-render the cards
  renderCards();
};

// Handle Filter Buttons
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active styling
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Set the new filter and re-render
    currentFilter = button.getAttribute('data-status');
    renderCards();
  });
});

// Utility - Capitalize Status for Badge
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}