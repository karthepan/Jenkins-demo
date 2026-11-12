document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Sticky & Mobile Menu Toggle
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 2. Interactive Menu Category Filtering
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            menuCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // 3. Add to Order / Toast Simulation
    const orderBtns = document.querySelectorAll('.order-btn');
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');

    orderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const itemName = btn.getAttribute('data-name');
            const itemPrice = btn.getAttribute('data-price');
            
            toastMessage.textContent = `Added "${itemName}" (${itemPrice}) to your inquiry!`;
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 3500);
        });
    });

    // 4. Testimonials Slider
    const track = document.getElementById('testimonialTrack');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    function updateSlider(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
        });
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider(currentIndex);
    });

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            currentIndex = idx;
            updateSlider(currentIndex);
        });
    });

    // Auto-advance slider every 6 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider(currentIndex);
    }, 6000);

    // 5. Reservation Form Validation & Modal Confirmation
    const reservationForm = document.getElementById('reservationForm');
    const successModal = document.getElementById('successModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const resDateInput = document.getElementById('resDate');

    // Set minimum date for reservation to today
    const today = new Date().toISOString().split('T')[0];
    resDateInput.setAttribute('min', today);

    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const guests = document.getElementById('guests').value;
        const resDate = document.getElementById('resDate').value;
        const resTimeSelect = document.getElementById('resTime');
        const resTimeText = resTimeSelect.options[resTimeSelect.selectedIndex].text;

        // Format Date nicely
        const formattedDate = new Date(resDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        modalMessage.textContent = `Thank you, ${fullName}. Your table for ${guests} ${guests > 1 ? 'guests' : 'guest'} has been successfully reserved for ${formattedDate} at ${resTimeText}. A confirmation email has been dispatched.`;
        
        successModal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
        reservationForm.reset();
    });

    // Close modal on outside click
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
            reservationForm.reset();
        }
    });

    // 6. Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        toastMessage.textContent = `Thank you for subscribing with ${emailInput.value}!`;
        toast.classList.add('show');
        newsletterForm.reset();

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    });
});