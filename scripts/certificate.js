// Certificate search and download functionality

// Sample certificate data - in real implementation, this would come from database
const certificates = [
    {
        id: 'HCA001',
        name: 'Rahul Kumar',
        event: 'State Championship 2024',
        date: '2024-12-15',
        downloadLink: 'certificates/rahul-kumar-state-championship-2024.pdf',
        status: 'completed'
    },
    {
        id: 'HCA002',
        name: 'Priya Sharma',
        event: 'District Tournament 2024',
        date: '2024-12-10',
        downloadLink: 'certificates/priya-sharma-district-tournament-2024.pdf',
        status: 'completed'
    },
    {
        id: 'HCA003',
        name: 'Amit Singh',
        event: 'Youth Championship 2024',
        date: '2024-12-08',
        downloadLink: 'certificates/amit-singh-youth-championship-2024.pdf',
        status: 'completed'
    },
    {
        id: 'HCA004',
        name: 'Neha Patel',
        event: 'Rapid Chess Championship 2024',
        date: '2024-11-25',
        downloadLink: 'certificates/neha-patel-rapid-championship-2024.pdf',
        status: 'completed'
    },
    {
        id: 'HCA005',
        name: 'Vikram Malhotra',
        event: 'State Championship 2024',
        date: '2024-12-15',
        downloadLink: 'certificates/vikram-malhotra-state-championship-2024.pdf',
        status: 'completed'
    },
    {
        id: 'HCA006',
        name: 'Anjali Gupta',
        event: 'District Tournament 2024',
        date: '2024-12-10',
        downloadLink: 'certificates/anjali-gupta-district-tournament-2024.pdf',
        status: 'completed'
    }
];

// Search certificates function
function searchCertificate() {
    const searchInput = document.getElementById('certificate-search');
    const searchTerm = searchInput.value.trim();
    const resultsContainer = document.getElementById('search-results');
    
    if (!searchTerm) {
        alert('Please enter a name or ID to search');
        return;
    }
    
    // Filter certificates based on search term
    const results = certificates.filter(cert => 
        cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.event.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    displaySearchResults(results, resultsContainer);
}

// Display search results
function displaySearchResults(results, container) {
    if (!container) return;
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--gray-dark); margin-bottom: 1rem;"></i>
                <h3>No certificates found</h3>
                <p>No certificates found for your search. Please try a different name or ID.</p>
                <p>If you believe this is an error, please contact our support team.</p>
            </div>
        `;
        return;
    }
    
    const resultsHTML = results.map(cert => `
        <div class="certificate-result">
            <div class="cert-info">
                <h4>${cert.name}</h4>
                <p><strong>ID:</strong> ${cert.id}</p>
                <p><strong>Event:</strong> ${cert.event}</p>
                <p><strong>Date:</strong> ${formatDate(cert.date)}</p>
            </div>
            <div class="certificate-actions">
                <a href="${cert.downloadLink}" class="btn btn-primary download-btn" onclick="downloadCertificate('${cert.id}')">
                    <i class="fas fa-download"></i> Download
                </a>
                <a href="${cert.downloadLink}" class="btn btn-secondary" target="_blank">
                    <i class="fas fa-eye"></i> Preview
                </a>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = `
        <div class="results-header">
            <h3>Found ${results.length} certificate${results.length > 1 ? 's' : ''}</h3>
        </div>
        ${resultsHTML}
    `;
}

// Download certificate function
function downloadCertificate(certId) {
    const cert = certificates.find(c => c.id === certId);
    if (!cert) {
        alert('Certificate not found');
        return;
    }
    
    // Simulate download - in real implementation, this would trigger actual download
    console.log(`Downloading certificate: ${cert.name} - ${cert.event}`);
    
    // Show download progress
    showDownloadProgress(cert);
    
    // In real implementation, you would:
    // 1. Generate the PDF certificate
    // 2. Trigger browser download
    // 3. Log the download for analytics
}

// Show download progress
function showDownloadProgress(cert) {
    const progressDiv = document.createElement('div');
    progressDiv.className = 'download-progress';
    progressDiv.innerHTML = `
        <div class="progress-content">
            <i class="fas fa-download"></i>
            <span>Downloading certificate for ${cert.name}...</span>
        </div>
    `;
    
    document.body.appendChild(progressDiv);
    
    // Remove progress after 2 seconds
    setTimeout(() => {
        document.body.removeChild(progressDiv);
        showDownloadSuccess(cert);
    }, 2000);
}

// Show download success message
function showDownloadSuccess(cert) {
    const successDiv = document.createElement('div');
    successDiv.className = 'download-success';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <span>Certificate downloaded successfully!</span>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        document.body.removeChild(successDiv);
    }, 3000);
}

// Format date function
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Preview certificate function
function previewCertificate(certId) {
    const cert = certificates.find(c => c.id === certId);
    if (!cert) {
        alert('Certificate not found');
        return;
    }
    
    // Open certificate in new tab for preview
    window.open(cert.downloadLink, '_blank');
}

// Recent certificates functionality
function loadRecentCertificates() {
    const recentCertificates = certificates.slice(0, 3); // Show last 3 certificates
    
    const certificatesGrid = document.querySelector('.certificates-grid');
    if (!certificatesGrid) return;
    
    // Update recent certificates display
    recentCertificates.forEach((cert, index) => {
        const certCard = certificatesGrid.children[index];
        if (certCard) {
            const titleElement = certCard.querySelector('h3');
            const nameElement = certCard.querySelector('.player-name');
            const idElement = certCard.querySelector('.player-id');
            const dateElement = certCard.querySelector('.certificate-date');
            
            if (titleElement) titleElement.textContent = cert.event;
            if (nameElement) nameElement.textContent = cert.name;
            if (idElement) idElement.textContent = cert.id;
            if (dateElement) dateElement.textContent = formatDate(cert.date);
            
            // Update download links
            const downloadBtn = certCard.querySelector('.btn-primary');
            const previewBtn = certCard.querySelector('.btn-secondary');
            
            if (downloadBtn) {
                downloadBtn.href = cert.downloadLink;
                downloadBtn.onclick = () => downloadCertificate(cert.id);
            }
            
            if (previewBtn) {
                previewBtn.href = cert.downloadLink;
                previewBtn.target = '_blank';
            }
        }
    });
}

// Initialize certificate functionality
document.addEventListener('DOMContentLoaded', () => {
    loadRecentCertificates();
    
    // Add event listener for search form
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            searchCertificate();
        });
    }
    
    // Add event listener for search input (search as you type)
    const searchInput = document.getElementById('certificate-search');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (searchInput.value.trim().length >= 3) {
                    searchCertificate();
                }
            }, 500);
        });
    }
});

// Add CSS for download progress and success messages
const style = document.createElement('style');
style.textContent = `
    .download-progress,
    .download-success {
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
    
    .download-success {
        background-color: #28a745;
        border-color: #28a745;
    }
    
    .progress-content,
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
    
    .results-header {
        margin-bottom: 2rem;
        text-align: center;
    }
    
    .results-header h3 {
        color: var(--gold);
        font-size: 1.5rem;
    }
`;

document.head.appendChild(style);

// Export functions for use in other scripts
window.searchCertificate = searchCertificate;
window.downloadCertificate = downloadCertificate;
window.previewCertificate = previewCertificate; 