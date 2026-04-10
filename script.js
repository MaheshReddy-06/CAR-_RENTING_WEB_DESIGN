document.addEventListener('DOMContentLoaded', () => {
    // Car Data
    const cars = [
        {
            id: 1,
            name: 'Tesla Model S',
            price: 299,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=800',
            seats: 5,
            transmission: 'Auto',
            fuel: 'Electric'
        },
        {
            id: 2,
            name: 'BMW M5',
            price: 399,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800',
            seats: 5,
            transmission: 'Auto',
            fuel: 'Petrol'
        },
        {
            id: 3,
            name: 'Mercedes AMG GT',
            price: 459,
            rating: 5.0,
            image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800',
            seats: 2,
            transmission: 'Auto',
            fuel: 'Petrol'
        }
    ];

    // Render Cars
    const carGrid = document.querySelector('.car-grid');
    if (carGrid) {
        const carsHTML = cars.map(car => `
            <div class="car-card" data-car-id="${car.id}">
                <img src="${car.image}" alt="${car.name}" class="car-image">
                <div class="car-info">
                    <h3 class="car-name">${car.name}</h3>
                    <div class="features">
                        <span class="feature">👥 ${car.seats} seats</span>
                        <span class="feature">⚙️ ${car.transmission}</span>
                        <span class="feature">⛽ ${car.fuel}</span>
                    </div>
                    <div class="car-rating">
                        ${'★'.repeat(Math.floor(car.rating))}${car.rating % 1 >= 0.5 ? '½' : ''} ${car.rating}
                    </div>
                    <div class="car-price">$${car.price}/day</div>
                    <button class="book-btn">Book Now</button>
                </div>
            </div>
        `).join('');
        carGrid.innerHTML = carsHTML;
    }

    // Modal Handling
    const modal = document.getElementById('bookingModal');
    const closeModal = document.querySelector('.close-modal');
    let selectedCar = null;

    // Close modal when clicking the close button or outside the modal
    closeModal.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Handle Booking Buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('book-btn')) {
            const carCard = e.target.closest('.car-card');
            if (carCard) {
                const carId = parseInt(carCard.dataset.carId);
                selectedCar = cars.find(c => c.id === carId);
                if (selectedCar) {
                    // Update booking form with car details
                    document.getElementById('selectedCar').textContent = `Selected Car: ${selectedCar.name}`;
                    document.getElementById('totalPrice').textContent = `Daily Rate: $${selectedCar.price}`;
                    modal.style.display = 'block';
                }
            }
        }
    });

    // Booking Form Handling
    const bookingForm = document.getElementById('bookingForm');
    const pickupDate = document.getElementById('pickupDate');
    const returnDate = document.getElementById('returnDate');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    pickupDate.min = today;
    returnDate.min = today;

    // Update return date min value when pickup date changes
    pickupDate.addEventListener('change', () => {
        returnDate.min = pickupDate.value;
        if (returnDate.value < pickupDate.value) {
            returnDate.value = pickupDate.value;
        }
        updateTotalPrice();
    });

    returnDate.addEventListener('change', updateTotalPrice);

    function updateTotalPrice() {
        if (selectedCar && pickupDate.value && returnDate.value) {
            const start = new Date(pickupDate.value);
            const end = new Date(returnDate.value);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            const total = selectedCar.price * days;
            document.getElementById('totalPrice').textContent = 
                `Daily Rate: $${selectedCar.price}\nTotal for ${days} days: $${total}`;
        }
    }

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(bookingForm);
        const bookingDetails = {
            car: selectedCar.name,
            customerName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            pickupDate: formData.get('pickupDate'),
            returnDate: formData.get('returnDate'),
            pickupLocation: formData.get('pickupLocation')
        };
        
        // Here you would typically send this data to a server
        console.log('Booking Details:', bookingDetails);
        alert('Thank you for your booking! We will contact you shortly to confirm the details.');
        
        modal.style.display = 'none';
        bookingForm.reset();
    });

    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Gallery Image Interaction
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('expanded');
        });
    });

    // Blog Read More Functionality
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const blogContent = e.target.closest('.blog-content');
            if (blogContent) {
                blogContent.classList.toggle('expanded');
            }
        });
    });
});