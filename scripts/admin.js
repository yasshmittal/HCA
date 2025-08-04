// Admin Login Functionality

// Tab switching functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const loginForms = document.querySelectorAll('.login-form');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs and forms
            tabButtons.forEach(btn => btn.classList.remove('active'));
            loginForms.forEach(form => form.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            button.classList.add('active');
            document.getElementById(`${targetTab}-form`).classList.add('active');
        });
    });
}

// Password toggle functionality
function initPasswordToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.parentElement.querySelector('input');
            const icon = button.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const inputGroup = input.closest('.input-group');
        
        // Remove previous error states
        inputGroup.classList.remove('error', 'success');
        const errorMessage = inputGroup.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        
        // Validate email
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showError(inputGroup, 'Please enter a valid email address');
                isValid = false;
            } else {
                inputGroup.classList.add('success');
            }
        }
        
        // Validate required fields
        if (!input.value.trim()) {
            showError(inputGroup, 'This field is required');
            isValid = false;
        } else if (input.type !== 'email') {
            inputGroup.classList.add('success');
        }
        
        // Validate password length
        if (input.type === 'password' && input.value.length < 6) {
            showError(inputGroup, 'Password must be at least 6 characters long');
            isValid = false;
        }
    });
    
    return isValid;
}

// Show error message
function showError(inputGroup, message) {
    inputGroup.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    inputGroup.parentElement.appendChild(errorDiv);
}

// Admin login handler
function handleAdminLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('.login-btn');
    
    if (!validateForm(form)) {
        return;
    }
    
    const email = form.querySelector('#admin-email').value;
    const password = form.querySelector('#admin-password').value;
    const remember = form.querySelector('#admin-remember').checked;
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Simulate login process
    setTimeout(() => {
        // In real implementation, this would be an API call
        if (email === 'admin@haryanachess.org' && password === 'admin123') {
            // Store login state
            if (remember) {
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('adminEmail', email);
            } else {
                sessionStorage.setItem('adminLoggedIn', 'true');
                sessionStorage.setItem('adminEmail', email);
            }
            
            // Redirect to admin dashboard
            window.location.href = 'admin-dashboard.html';
        } else {
            showLoginError('Invalid email or password. Please try again.');
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    }, 1500);
}

// Developer login handler
function handleDevLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('.login-btn');
    
    if (!validateForm(form)) {
        return;
    }
    
    const email = form.querySelector('#dev-email').value;
    const password = form.querySelector('#dev-password').value;
    const remember = form.querySelector('#dev-remember').checked;
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Simulate login process
    setTimeout(() => {
        // In real implementation, this would be an API call
        if (email === 'dev@haryanachess.org' && password === 'dev123') {
            // Store login state
            if (remember) {
                localStorage.setItem('devLoggedIn', 'true');
                localStorage.setItem('devEmail', email);
            } else {
                sessionStorage.setItem('devLoggedIn', 'true');
                sessionStorage.setItem('devEmail', email);
            }
            
            // Redirect to developer panel
            window.location.href = 'dev-panel.html';
        } else {
            showLoginError('Invalid email or password. Please try again.');
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    }, 1500);
}

// Show login error
function showLoginError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.login-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'login-error';
    errorDiv.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add error styles
    const style = document.createElement('style');
    style.textContent = `
        .login-error {
            background-color: rgba(220, 53, 69, 0.1);
            border: 1px solid #dc3545;
            color: #dc3545;
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 1rem;
            animation: shake 0.5s ease;
        }
        
        .error-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Insert error message
    const activeForm = document.querySelector('.login-form.active');
    activeForm.insertBefore(errorDiv, activeForm.firstChild);
    
    // Remove error after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 5000);
}

// Check if user is already logged in
function checkLoginStatus() {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn') || sessionStorage.getItem('adminLoggedIn');
    const devLoggedIn = localStorage.getItem('devLoggedIn') || sessionStorage.getItem('devLoggedIn');
    
    if (adminLoggedIn) {
        window.location.href = 'admin-dashboard.html';
    } else if (devLoggedIn) {
        window.location.href = 'dev-panel.html';
    }
}

// Logout functionality
function logout() {
    // Clear all storage
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('devLoggedIn');
    localStorage.removeItem('devEmail');
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminEmail');
    sessionStorage.removeItem('devLoggedIn');
    sessionStorage.removeItem('devEmail');
    
    // Redirect to login page
    window.location.href = 'admin-login.html';
}

// Initialize admin functionality
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initPasswordToggles();
    
    // Check login status
    checkLoginStatus();
    
    // Add form event listeners
    const adminForm = document.getElementById('admin-login-form');
    const devForm = document.getElementById('dev-login-form');
    
    if (adminForm) {
        adminForm.addEventListener('submit', handleAdminLogin);
    }
    
    if (devForm) {
        devForm.addEventListener('submit', handleDevLogin);
    }
    
    // Add input validation on blur
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            const inputGroup = input.closest('.input-group');
            if (input.value.trim()) {
                inputGroup.classList.add('success');
            } else {
                inputGroup.classList.remove('success');
            }
        });
    });
});

// Export functions for use in other scripts
window.logout = logout;
window.checkLoginStatus = checkLoginStatus; 