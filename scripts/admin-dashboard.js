// Admin Dashboard Functionality

// Check if user is logged in
function checkAdminAuth() {
    const isAdmin = localStorage.getItem('adminLoggedIn') || sessionStorage.getItem('adminLoggedIn');
    if (!isAdmin) {
        window.location.href = 'admin-login.html';
    }
}

// Update current time
function updateCurrentTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const now = new Date();
        timeElement.textContent = now.toLocaleString();
    }
}

// File upload functionality
function uploadFile(type) {
    const fileInput = document.getElementById(`${type}-file`);
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }
    
    // Validate file type
    const allowedExtensions = ['.xlsx', '.xls'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
        alert('Please upload a valid Excel file (.xlsx or .xls)');
        return;
    }
    
    // Show upload progress
    showUploadProgress(type, file.name);
    
    // Simulate upload process
    setTimeout(() => {
        showUploadSuccess(type, file.name);
        fileInput.value = '';
    }, 2000);
}

// Show upload progress
function showUploadProgress(type, fileName) {
    const progressDiv = document.createElement('div');
    progressDiv.className = 'upload-progress';
    progressDiv.innerHTML = `
        <div class="progress-content">
            <i class="fas fa-upload"></i>
            <span>Uploading ${fileName}...</span>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(progressDiv);
    
    // Animate progress bar
    const progressFill = progressDiv.querySelector('.progress-fill');
    let width = 0;
    const interval = setInterval(() => {
        width += 10;
        progressFill.style.width = width + '%';
        if (width >= 100) {
            clearInterval(interval);
        }
    }, 200);
}

// Show upload success
function showUploadSuccess(type, fileName) {
    // Remove progress
    const progressDiv = document.querySelector('.upload-progress');
    if (progressDiv) {
        document.body.removeChild(progressDiv);
    }
    
    // Show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'upload-success';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <span>${fileName} uploaded successfully!</span>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        if (successDiv.parentElement) {
            document.body.removeChild(successDiv);
        }
    }, 3000);
}

// Admin functions
function manageUsers() {
    alert('User management feature will be implemented in Phase 2.');
}

function backupSystem() {
    alert('System backup initiated. This feature will be implemented in Phase 2.');
}

function viewLogs() {
    alert('System logs will be displayed here. This feature will be implemented in Phase 2.');
}

function addTournament() {
    alert('Add tournament form will be implemented in Phase 2.');
}

function sendNotification() {
    alert('Notification system will be implemented in Phase 2.');
}

function generateReport() {
    alert('Report generation will be implemented in Phase 2.');
}

// Add CSS for upload progress and success messages
function addUploadStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .upload-progress,
        .upload-success {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--navy-blue);
            color: var(--white);
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: var(--shadow-dark);
            z-index: 10000;
            border: 1px solid var(--gold);
            animation: slideInRight 0.3s ease;
        }
        
        .upload-success {
            background-color: rgba(40, 167, 69, 0.9);
            border-color: #28a745;
        }
        
        .progress-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .progress-bar {
            width: 100px;
            height: 4px;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
            margin-left: 1rem;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background-color: var(--gold);
            transition: width 0.2s ease;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize dashboard
function initDashboard() {
    checkAdminAuth();
    addUploadStyles();
    updateCurrentTime();
    
    // Update time every minute
    setInterval(updateCurrentTime, 60000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);

// Export functions for use in other scripts
window.uploadFile = uploadFile;
window.manageUsers = manageUsers;
window.backupSystem = backupSystem;
window.viewLogs = viewLogs;
window.addTournament = addTournament;
window.sendNotification = sendNotification;
window.generateReport = generateReport; 