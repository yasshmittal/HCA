// Gallery Functionality

// Sample gallery data - in real implementation, this would come from database
const galleryData = [
    {
        id: 1,
        title: 'State Championship 2024',
        description: 'Opening ceremony of the prestigious State Chess Championship 2024',
        category: 'tournaments',
        image: 'assets/gallery/state-championship-2024.jpg',
        date: '2024-12-15',
        tags: ['championship', 'opening', 'ceremony']
    },
    {
        id: 2,
        title: 'Award Ceremony',
        description: 'Winners receiving their trophies and certificates',
        category: 'awards',
        image: 'assets/gallery/award-ceremony.jpg',
        date: '2024-12-10',
        tags: ['awards', 'winners', 'trophies']
    },
    {
        id: 3,
        title: 'Chess Workshop',
        description: 'Advanced coaching workshop for chess trainers',
        category: 'workshops',
        image: 'assets/gallery/chess-workshop.jpg',
        date: '2024-12-05',
        tags: ['workshop', 'coaching', 'training']
    },
    {
        id: 4,
        title: 'Education Seminar',
        description: 'Seminar on integrating chess into school curriculum',
        category: 'seminars',
        image: 'assets/gallery/education-seminar.jpg',
        date: '2024-11-30',
        tags: ['education', 'seminar', 'curriculum']
    },
    {
        id: 5,
        title: 'Youth Tournament',
        description: 'Young players competing in the youth championship',
        category: 'tournaments',
        image: 'assets/gallery/youth-tournament.jpg',
        date: '2024-11-25',
        tags: ['youth', 'tournament', 'competition']
    },
    {
        id: 6,
        title: 'School Program',
        description: 'Chess education program in government schools',
        category: 'education',
        image: 'assets/gallery/school-program.jpg',
        date: '2024-11-20',
        tags: ['education', 'school', 'program']
    }
];

let currentFilter = 'all';
let currentSort = 'newest';
let currentSearch = '';
let currentPage = 1;
const itemsPerPage = 6;

// Initialize gallery
function initGallery() {
    loadGalleryItems();
    setupFilters();
    setupLightbox();
    checkAdminAccess();
}

// Load gallery items
function loadGalleryItems() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    let filteredItems = filterGalleryItems();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = filteredItems.slice(startIndex, endIndex);

    if (currentPage === 1) {
        galleryGrid.innerHTML = '';
    }

    itemsToShow.forEach(item => {
        const galleryItem = createGalleryItem(item);
        galleryGrid.appendChild(galleryItem);
    });

    // Show/hide load more button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        if (endIndex >= filteredItems.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
}

// Create gallery item element
function createGalleryItem(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'gallery-item';
    itemDiv.setAttribute('data-id', item.id);
    itemDiv.setAttribute('data-category', item.category);

    itemDiv.innerHTML = `
        <div class="gallery-image">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <span class="gallery-category">${item.category}</span>
            </div>
        </div>
        <div class="gallery-info">
            <h3 class="gallery-title">${item.title}</h3>
            <p class="gallery-description">${item.description}</p>
            <div class="gallery-meta">
                <span class="gallery-date">
                    <i class="fas fa-calendar"></i>
                    ${formatDate(item.date)}
                </span>
                <div class="gallery-actions">
                    <button class="view-btn" onclick="openLightbox(${item.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${isAdmin() ? `
                        <button class="edit-btn" onclick="editImage(${item.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn" onclick="deleteImage(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    return itemDiv;
}

// Filter gallery items
function filterGalleryItems() {
    let filtered = galleryData;

    // Filter by category
    if (currentFilter !== 'all') {
        filtered = filtered.filter(item => item.category === currentFilter);
    }

    // Filter by search
    if (currentSearch) {
        const searchLower = currentSearch.toLowerCase();
        filtered = filtered.filter(item => 
            item.title.toLowerCase().includes(searchLower) ||
            item.description.toLowerCase().includes(searchLower) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
    }

    // Sort items
    filtered.sort((a, b) => {
        switch (currentSort) {
            case 'newest':
                return new Date(b.date) - new Date(a.date);
            case 'oldest':
                return new Date(a.date) - new Date(b.date);
            case 'name':
                return a.title.localeCompare(b.title);
            case 'category':
                return a.category.localeCompare(b.category);
            default:
                return 0;
        }
    });

    return filtered;
}

// Setup filters
function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.getElementById('gallery-search');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            currentFilter = e.target.value;
            currentPage = 1;
            loadGalleryItems();
        });
    }

    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            currentSort = e.target.value;
            currentPage = 1;
            loadGalleryItems();
        });
    }

    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentSearch = e.target.value;
                currentPage = 1;
                loadGalleryItems();
            }, 300);
        });
    }

    // Load more button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            currentPage++;
            loadGalleryItems();
        });
    }
}

// Setup lightbox
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    navigateLightbox('prev');
                    break;
                case 'ArrowRight':
                    navigateLightbox('next');
                    break;
            }
        }
    });
}

// Open lightbox
function openLightbox(itemId) {
    const item = galleryData.find(i => i.id === itemId);
    if (!item) return;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxCategory = document.getElementById('lightbox-category');

    if (lightboxImg) lightboxImg.src = item.image;
    if (lightboxImg) lightboxImg.alt = item.title;
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxDescription) lightboxDescription.textContent = item.description;
    if (lightboxCategory) lightboxCategory.textContent = item.category;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Store current item for navigation
    lightbox.currentItemId = itemId;
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Navigate lightbox
function navigateLightbox(direction) {
    const lightbox = document.getElementById('lightbox');
    const currentId = lightbox.currentItemId;
    const currentIndex = galleryData.findIndex(item => item.id === currentId);
    
    let newIndex;
    if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : galleryData.length - 1;
    } else {
        newIndex = currentIndex < galleryData.length - 1 ? currentIndex + 1 : 0;
    }

    openLightbox(galleryData[newIndex].id);
}

// Check admin access
function checkAdminAccess() {
    const isAdminUser = localStorage.getItem('adminLoggedIn') || sessionStorage.getItem('adminLoggedIn');
    const uploadSection = document.getElementById('upload-section');
    
    if (isAdminUser && uploadSection) {
        uploadSection.style.display = 'block';
        setupUploadForm();
    }
}

// Setup upload form
function setupUploadForm() {
    const uploadForm = document.getElementById('image-upload-form');
    const fileInput = document.getElementById('image-file');
    const filePreview = document.getElementById('file-preview');
    const cancelBtn = document.getElementById('cancel-upload');

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            filePreview.innerHTML = '';
            const files = Array.from(e.target.files);
            
            files.forEach((file, index) => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const previewItem = document.createElement('div');
                        previewItem.className = 'file-preview-item';
                        previewItem.innerHTML = `
                            <img src="${e.target.result}" alt="Preview">
                            <button type="button" class="remove-file" onclick="removeFile(${index})">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                        filePreview.appendChild(previewItem);
                    };
                    reader.readAsDataURL(file);
                }
            });
        });
    }

    if (uploadForm) {
        uploadForm.addEventListener('submit', handleImageUpload);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            uploadForm.reset();
            filePreview.innerHTML = '';
        });
    }
}

// Handle image upload
function handleImageUpload(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const submitBtn = event.target.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
    
    // Simulate upload - in real implementation, this would upload to server
    setTimeout(() => {
        alert('Images uploaded successfully!');
        event.target.reset();
        document.getElementById('file-preview').innerHTML = '';
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-upload"></i> Upload Images';
        
        // Reload gallery
        currentPage = 1;
        loadGalleryItems();
    }, 2000);
}

// Remove file from preview
function removeFile(index) {
    const fileInput = document.getElementById('image-file');
    const dt = new DataTransfer();
    const files = Array.from(fileInput.files);
    
    files.forEach((file, i) => {
        if (i !== index) {
            dt.items.add(file);
        }
    });
    
    fileInput.files = dt.files;
    
    // Update preview
    const filePreview = document.getElementById('file-preview');
    filePreview.innerHTML = '';
    
    Array.from(fileInput.files).forEach((file, i) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'file-preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button type="button" class="remove-file" onclick="removeFile(${i})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            filePreview.appendChild(previewItem);
        };
        reader.readAsDataURL(file);
    });
}

// Admin functions
function isAdmin() {
    return localStorage.getItem('adminLoggedIn') || sessionStorage.getItem('adminLoggedIn');
}

function editImage(id) {
    const item = galleryData.find(i => i.id === id);
    if (!item) return;
    
    // In real implementation, this would open an edit modal
    alert(`Edit image: ${item.title}`);
}

function deleteImage(id) {
    if (confirm('Are you sure you want to delete this image?')) {
        const index = galleryData.findIndex(i => i.id === id);
        if (index > -1) {
            galleryData.splice(index, 1);
            loadGalleryItems();
            alert('Image deleted successfully!');
        }
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);

// Export functions for use in other scripts
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.editImage = editImage;
window.deleteImage = deleteImage;
window.removeFile = removeFile; 