// Form handling for job application submissions
document.addEventListener('DOMContentLoaded', function() {
    const cvForm = document.getElementById('cvForm');
    const successMessage = document.getElementById('successMessage');
    const fileInput = document.getElementById('cv');
    
    if (cvForm) {
        // File upload drag and drop
        const fileUploadWrapper = document.querySelector('.file-upload-wrapper');
        if (fileUploadWrapper) {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                fileUploadWrapper.addEventListener(eventName, preventDefaults, false);
            });
            
            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            ['dragenter', 'dragover'].forEach(eventName => {
                fileUploadWrapper.addEventListener(eventName, () => {
                    fileUploadWrapper.style.borderColor = '#00d9ff';
                    fileUploadWrapper.style.backgroundColor = 'rgba(0, 217, 255, 0.05)';
                });
            });
            
            ['dragleave', 'drop'].forEach(eventName => {
                fileUploadWrapper.addEventListener(eventName, () => {
                    fileUploadWrapper.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    fileUploadWrapper.style.backgroundColor = 'transparent';
                });
            });
            
            fileUploadWrapper.addEventListener('drop', (e) => {
                const dt = e.dataTransfer;
                const files = dt.files;
                fileInput.files = files;
                updateFileInputLabel(files[0]);
            });
        }
        
        // Update file input label when file is selected
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    updateFileInputLabel(e.target.files[0]);
                }
            });
        }
        
        // Form submission
        cvForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                return;
            }
            
            // Validate file upload
            if (!validateFileUpload()) {
                return;
            }
            
            // Show loading state
            const submitBtn = cvForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            
            // Simulate form submission (in real scenario, this would be an API call)
            setTimeout(() => {
                // Collect form data
                const formData = new FormData(cvForm);
                const jobTitle = document.querySelector('.job-title-section h1').textContent;
                const jobLocation = document.querySelector('.location').textContent;
                
                // Log submission (for demonstration)
                console.log('Application Submitted:');
                console.log('- Full Name:', formData.get('fullName'));
                console.log('- Email:', formData.get('email'));
                console.log('- Phone:', formData.get('phone'));
                console.log('- LinkedIn:', formData.get('linkedin'));
                console.log('- CV File:', formData.get('cv').name);
                console.log('- Cover Letter:', formData.get('message'));
                console.log('- Position:', jobTitle);
                console.log('- Location:', jobLocation);
                
                // Track event
                trackApplicationEvent(jobTitle);
                
                // Show success message
                cvForm.style.display = 'none';
                successMessage.style.display = 'flex';
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Reset button state after message display
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 3000);
                
            }, 1500);
        });
    }
});

// Validate form fields
function validateForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const terms = document.getElementById('terms').checked;
    
    if (!fullName) {
        showFormError('Please enter your full name');
        return false;
    }
    
    if (!email) {
        showFormError('Please enter your email address');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showFormError('Please enter a valid email address');
        return false;
    }
    
    if (!terms) {
        showFormError('Please agree to the terms and conditions');
        return false;
    }
    
    return true;
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate file upload
function validateFileUpload() {
    const fileInput = document.getElementById('cv');
    const file = fileInput.files[0];
    
    if (!file) {
        showFormError('Please upload your CV/Resume');
        return false;
    }
    
    // Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
        showFormError('File size must be less than 5MB');
        return false;
    }
    
    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const validExtensions = ['pdf', 'doc', 'docx'];
    
    if (!validExtensions.includes(fileExtension)) {
        showFormError('Please upload a PDF, DOC, or DOCX file');
        return false;
    }
    
    return true;
}

// Update file input label with selected file name
function updateFileInputLabel(file) {
    const label = document.querySelector('.file-upload-label');
    if (label && file) {
        const fileSize = (file.size / 1024).toFixed(2);
        label.innerHTML = `<i class="fas fa-file-check"></i> ${file.name} (${fileSize} KB)`;
        label.style.color = '#00d9ff';
    }
}

// Show form error message
function showFormError(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification error';
    toast.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Track application submission event
function trackApplicationEvent(jobTitle) {
    // Send analytics event
    if (window.gtag) {
        gtag('event', 'job_application_submitted', {
            'position': jobTitle,
            'timestamp': new Date().toISOString()
        });
    }
    
    // Log event for monitoring
    console.log(`[Analytics] Job application submitted for: ${jobTitle}`);
}

// Style for toast notifications (add to styles if not present)
const style = document.createElement('style');
style.innerHTML = `
    .toast-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(220, 38, 38, 0.9);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        font-weight: 600;
        max-width: 400px;
    }
    
    .toast-notification.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .toast-notification.error {
        background: rgba(220, 38, 38, 0.9);
    }
    
    .toast-notification.success {
        background: rgba(34, 197, 94, 0.9);
    }
    
    @media (max-width: 768px) {
        .toast-notification {
            bottom: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;
document.head.appendChild(style);
