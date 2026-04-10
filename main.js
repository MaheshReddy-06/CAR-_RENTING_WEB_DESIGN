import { cars } from './js/cars.js';
import { createCarCard } from './js/utils.js';

function initializeApp() {
  const app = document.querySelector('#app');
  
  app.innerHTML = `
    <div class="header">
      <h1>Luxury Car Rentals</h1>
      <p>Choose from our premium selection of vehicles</p>
    </div>
    <div class="container">
      <div class="cars-grid">
        ${cars.map(car => createCarCard(car)).join('')}
      </div>
    </div>
  `;

  // Event delegation for booking buttons
  app.addEventListener('click', (e) => {
    if (e.target.classList.contains('book-btn')) {
      const carCard = e.target.closest('.car-card');
      if (carCard) {
        const carId = parseInt(carCard.dataset.carId);
        const car = cars.find(c => c.id === carId);
        if (car) {
          alert(`Booking confirmed for ${car.name}!`);
        }
      }
    }
  });
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);