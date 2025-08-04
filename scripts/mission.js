// Mission Page Functionality

// Check if user is admin
function isAdmin() {
    return localStorage.getItem('adminLoggedIn') || sessionStorage.getItem('adminLoggedIn');
}

// Initialize mission page
function initMissionPage() {
    // Hide edit controls for non-admin users
    if (!isAdmin()) {
        const editControls = document.querySelectorAll('.view-controls');
        editControls.forEach(control => {
            control.style.display = 'none';
        });
    }
}

// Edit content function
function editContent(type) {
    if (!isAdmin()) {
        alert('You need admin access to edit content.');
        return;
    }

    const textElement = document.getElementById(`${type}-text`);
    const viewControls = document.getElementById(`${type}-view-controls`);
    const editControls = document.getElementById(`${type}-edit-controls`);

    if (!textElement || !viewControls || !editControls) return;

    // Store original text
    const originalText = textElement.textContent;

    // Create textarea for editing
    const textarea = document.createElement('textarea');
    textarea.value = originalText;
    textarea.className = 'editable-content';
    textarea.setAttribute('data-original', originalText);

    // Replace paragraph with textarea
    textElement.style.display = 'none';
    textElement.parentNode.insertBefore(textarea, textElement);

    // Show edit controls, hide view controls
    viewControls.style.display = 'none';
    editControls.style.display = 'flex';

    // Focus on textarea
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
}

// Save mission function
function saveMission() {
    const textarea = document.querySelector('.editable-content');
    const textElement = document.getElementById('mission-text');
    const viewControls = document.getElementById('mission-view-controls');
    const editControls = document.getElementById('mission-edit-controls');

    if (!textarea || !textElement || !viewControls || !editControls) return;

    // Get new text
    const newText = textarea.value.trim();

    if (!newText) {
        alert('Mission text cannot be empty.');
        return;
    }

    // Update the text element
    textElement.textContent = newText;
    textElement.style.display = 'block';

    // Remove textarea
    textarea.remove();

    // Show view controls, hide edit controls
    viewControls.style.display = 'flex';
    editControls.style.display = 'none';

    // Save to localStorage (in real implementation, this would save to database)
    localStorage.setItem('missionText', newText);

    // Show success message
    showSuccessMessage('Mission updated successfully!');
}

// Save vision function
function saveVision() {
    const textarea = document.querySelector('.editable-content');
    const textElement = document.getElementById('vision-text');
    const viewControls = document.getElementById('vision-view-controls');
    const editControls = document.getElementById('vision-edit-controls');

    if (!textarea || !textElement || !viewControls || !editControls) return;

    // Get new text
    const newText = textarea.value.trim();

    if (!newText) {
        alert('Vision text cannot be empty.');
        return;
    }

    // Update the text element
    textElement.textContent = newText;
    textElement.style.display = 'block';

    // Remove textarea
    textarea.remove();

    // Show view controls, hide edit controls
    viewControls.style.display = 'flex';
    editControls.style.display = 'none';

    // Save to localStorage (in real implementation, this would save to database)
    localStorage.setItem('visionText', newText);

    // Show success message
    showSuccessMessage('Vision updated successfully!');
}

// Cancel edit function
function cancelEdit(type) {
    const textarea = document.querySelector('.editable-content');
    const textElement = document.getElementById(`${type}-text`);
    const viewControls = document.getElementById(`${type}-view-controls`);
    const editControls = document.getElementById(`${type}-edit-controls`);

    if (!textarea || !textElement || !viewControls || !editControls) return;

    // Restore original text
    const originalText = textarea.getAttribute('data-original');
    textElement.textContent = originalText;
    textElement.style.display = 'block';

    // Remove textarea
    textarea.remove();

    // Show view controls, hide edit controls
    viewControls.style.display = 'flex';
    editControls.style.display = 'none';
}

// Show success message
function showSuccessMessage(message) {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles for success message
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: rgba(40, 167, 69, 0.9);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: var(--shadow-dark);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        }
        
        .success-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
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

    // Add to page
    document.body.appendChild(successDiv);

    // Remove after 3 seconds
    setTimeout(() => {
        if (successDiv.parentElement) {
            successDiv.remove();
        }
    }, 3000);
}

// Load saved content
function loadSavedContent() {
    const savedMission = localStorage.getItem('missionText');
    const savedVision = localStorage.getItem('visionText');

    if (savedMission) {
        const missionText = document.getElementById('mission-text');
        if (missionText) {
            missionText.textContent = savedMission;
        }
    }

    if (savedVision) {
        const visionText = document.getElementById('vision-text');
        if (visionText) {
            visionText.textContent = savedVision;
        }
    }
}

// Initialize timeline animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Initialize objective and value cards animation
function initCardsAnimation() {
    const cards = document.querySelectorAll('.objective-card, .value-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMissionPage();
    loadSavedContent();
    initTimelineAnimation();
    initCardsAnimation();
});

// Export functions for use in other scripts
window.editContent = editContent;
window.saveMission = saveMission;
window.saveVision = saveVision;
window.cancelEdit = cancelEdit; 