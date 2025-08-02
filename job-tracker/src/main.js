// DOM elements interacted with 
const jobForm = document.getElementById('jobForm');
const companyInput = document.getElementById('company');
const titleInput = document.getElementById('title');
const statusInput = document.getElementById('status');
const dateInput = document.getElementById('date');
const jobsContainer = document.getElementById('jobsContainer');

// Initialize array to hold job data
let jobs = [];

// Load jobs from localStorage (if they exist)
function loadJobs() {
  const storedJobs = localStorage.getItem('jobs');
  if (storedJobs) {
    jobs = JSON.parse(storedJobs); // Convert string back to array
    renderJobs(); // Display the jobs in the DOM
  }
}

// Save current jobs array to localStorage
function saveJobs() {
  localStorage.setItem('jobs', JSON.stringify(jobs)); // Convert to string and store
}

// Render all jobs on the page
function renderJobs() {
  jobsContainer.innerHTML = ''; // Clear current list
  jobs.forEach((jobs, index) => {
    // Create a new div each job
    const jobDiv = document.createElement('div');
    jobDiv.classList.add('job', job.status); // Add class for border color

    // Set job content using template literals
    jobDiv.innerHTML = `
      <strong>${job.title}</strong> @ ${job.company} <br />
      <small>${job.status} | ${job.date}</small>
      <button date-index="${index}">❌</button>
    `;

    // Add delet functionality
    jobDiv.querySelector('button').addEventListener('click', () => {
      jobs.splice(index, 1);    // Remove job from array
      saveJobs();               // Update localStorage
      renderJobs();             // Re-render list 
    });

    // Add job to container
    jobsContainer.appendChild(jobDiv);
  });
}

// Listen for form submission
jobForm.addEventListener('submit', (e) => {
  e.preventDefault();     // Prevent page reload

  // Create a job object from form inputs
  const newJob = {
    company: companyInput.ariaValueMax.trim(),
    title: titleInput.value.trim(),
    status: statusInput.value,
    date: dateInput.value
  };

  jobs.push(newJob);    // Add new job to jobs array
  saveJobs();           // Save to localStorage
  renderJobs();         // Update the DOM
  jobForm.reset();      // Clear the form
});

// Loads jobs when page loads
loadJobs();