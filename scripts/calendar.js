// Calendar functionality
class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.events = this.getEvents();
        
        this.init();
    }

    init() {
        this.renderCalendar();
        this.bindEvents();
        this.setupEventFilters();
    }

    renderCalendar() {
        const calendarGrid = document.getElementById('calendar-grid');
        const currentMonthElement = document.getElementById('current-month');
        
        if (!calendarGrid || !currentMonthElement) return;

        // Update month/year display
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        currentMonthElement.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;

        // Clear previous calendar
        calendarGrid.innerHTML = '';

        // Get first day of month and number of days
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        // Generate calendar days
        for (let i = 0; i < 42; i++) {
            const dayDate = new Date(startDate);
            dayDate.setDate(startDate.getDate() + i);

            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = dayDate.getDate();
            dayElement.appendChild(dayNumber);

            // Check if it's today
            const today = new Date();
            if (dayDate.toDateString() === today.toDateString()) {
                dayElement.classList.add('today');
            }

            // Check if it's from other month
            if (dayDate.getMonth() !== this.currentMonth) {
                dayElement.classList.add('other-month');
            }

            // Check if it has events
            const eventsOnDay = this.getEventsForDate(dayDate);
            if (eventsOnDay.length > 0) {
                dayElement.classList.add('has-event');
                const eventIndicator = document.createElement('div');
                eventIndicator.className = 'event-indicator';
                eventIndicator.textContent = `${eventsOnDay.length} event${eventsOnDay.length > 1 ? 's' : ''}`;
                dayElement.appendChild(eventIndicator);
            }

            // Add click event to show events
            dayElement.addEventListener('click', () => {
                this.showEventsForDate(dayDate);
            });

            calendarGrid.appendChild(dayElement);
        }
    }

    bindEvents() {
        const prevBtn = document.getElementById('prev-month');
        const nextBtn = document.getElementById('next-month');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentMonth--;
                if (this.currentMonth < 0) {
                    this.currentMonth = 11;
                    this.currentYear--;
                }
                this.renderCalendar();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentMonth++;
                if (this.currentMonth > 11) {
                    this.currentMonth = 0;
                    this.currentYear++;
                }
                this.renderCalendar();
            });
        }
    }

    getEvents() {
        // Sample events data - in real implementation, this would come from database
        return [
            {
                id: 1,
                title: 'State Championship 2024',
                date: new Date(2024, 11, 15),
                location: 'Chandigarh, Haryana',
                type: 'tournament',
                description: 'Annual state-level chess championship for all age groups.',
                prize: '₹50,000 Prize Pool'
            },
            {
                id: 2,
                title: 'Chess Coaching Workshop',
                date: new Date(2024, 11, 20),
                location: 'Gurugram, Haryana',
                type: 'workshop',
                description: 'Advanced coaching workshop for chess trainers and coaches.',
                duration: '2 Days'
            },
            {
                id: 3,
                title: 'Chess in Education Seminar',
                date: new Date(2024, 11, 25),
                location: 'Panchkula, Haryana',
                type: 'seminar',
                description: 'Seminar on integrating chess into school curriculum.',
                duration: '1 Day'
            },
            {
                id: 4,
                title: 'Youth Championship 2025',
                date: new Date(2025, 0, 5),
                location: 'Faridabad, Haryana',
                type: 'tournament',
                description: 'Special tournament for players under 18 years.',
                prize: '₹25,000 Prize Pool'
            },
            {
                id: 5,
                title: 'Arbiters Training Program',
                date: new Date(2025, 0, 12),
                location: 'Rohtak, Haryana',
                type: 'workshop',
                description: 'Training program for chess arbiters.',
                duration: '3 Days'
            },
            {
                id: 6,
                title: 'Rapid Chess Championship',
                date: new Date(2025, 0, 20),
                location: 'Hisar, Haryana',
                type: 'tournament',
                description: 'Fast-paced rapid chess tournament.',
                prize: '₹30,000 Prize Pool'
            }
        ];
    }

    getEventsForDate(date) {
        return this.events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === date.toDateString();
        });
    }

    showEventsForDate(date) {
        const events = this.getEventsForDate(date);
        const dateString = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        if (events.length === 0) {
            alert(`No events scheduled for ${dateString}`);
            return;
        }

        let message = `Events on ${dateString}:\n\n`;
        events.forEach(event => {
            message += `• ${event.title}\n`;
            message += `  Location: ${event.location}\n`;
            message += `  Type: ${event.type.charAt(0).toUpperCase() + event.type.slice(1)}\n\n`;
        });

        alert(message);
    }

    setupEventFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const eventCards = document.querySelectorAll('.event-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                eventCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'flex';
                        card.style.animation = 'fadeInUp 0.6s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
});

// Event search functionality
function searchEvents() {
    const searchInput = document.getElementById('event-search');
    const searchTerm = searchInput.value.toLowerCase();
    const eventCards = document.querySelectorAll('.event-card');

    eventCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.event-description').textContent.toLowerCase();
        const location = card.querySelector('.event-location').textContent.toLowerCase();

        if (title.includes(searchTerm) || 
            description.includes(searchTerm) || 
            location.includes(searchTerm)) {
            card.style.display = 'flex';
            card.style.animation = 'fadeInUp 0.6s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Export calendar functions for use in other scripts
window.Calendar = Calendar;
window.searchEvents = searchEvents; 