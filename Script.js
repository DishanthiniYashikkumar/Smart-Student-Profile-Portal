// ==================== DYNAMIC GREETING ====================
// Display time-based greeting on Home Page using JavaScript Date object
function displayGreeting() 
{
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) 
	{
        const currentHour = new Date().getHours();
        let greetingText;
        
        if (currentHour < 12) {
            greetingText = '🌞 Good Morning!';
        } else if (currentHour < 18) {
            greetingText = '🌤️ Good Afternoon!';
        } else {
            greetingText = '🌃 Good Evening!';
        }
        
        greetingElement.textContent = greetingText;
    }
}

// ==================== PROFILE EDIT FUNCTIONALITY ====================
// Allow editing profile details dynamically using JavaScript
// Update information on the page
	function initProfileEdit() {
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const profileDetails = document.getElementById('profileDetails');
    const messageBox = document.getElementById('messageBox');
    
    if (!editBtn) return;
    
    // Store original values for cancel functionality
    let originalValues = {};
    
    // Edit button click handler
    editBtn.addEventListener('click', function() {
        // Store original values
        originalValues = {
            name: document.getElementById('displayName').textContent,
            regNo: document.getElementById('displayRegNo').textContent,
            program: document.getElementById('displayProgram').textContent,
            email: document.getElementById('displayEmail').textContent
        };
        
        // Set input values to current display values
        document.getElementById('inputName').value = originalValues.name;
        document.getElementById('inputRegNo').value = originalValues.regNo;
        document.getElementById('inputProgram').value = originalValues.program;
        document.getElementById('inputEmail').value = originalValues.email;
        
        // Switch to edit mode
        profileDetails.classList.add('edit-mode');
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
        
        // Hide any previous messages
        messageBox.classList.remove('show');
    });
    
    // Save button click handler
    saveBtn.addEventListener('click', function() {
        // Get input values
        const newName = document.getElementById('inputName').value.trim();
        const newRegNo = document.getElementById('inputRegNo').value.trim();
        const newProgram = document.getElementById('inputProgram').value.trim();
        const newEmail = document.getElementById('inputEmail').value.trim();
        
        // Validate inputs
        if (!newName || !newRegNo || !newProgram || !newEmail) {
            showMessage('Please fill in all fields!', 'error');
            return;
        }
        
        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(newEmail)) {
            showMessage('Please enter a valid email address!', 'error');
            return;
        }
        
        // Update display values
        document.getElementById('displayName').textContent = newName;
        document.getElementById('displayRegNo').textContent = newRegNo;
        document.getElementById('displayProgram').textContent = newProgram;
        document.getElementById('displayEmail').textContent = newEmail;
        
        // Update title name
        const displayNameTitle = document.getElementById('displayNameTitle');
        if (displayNameTitle) {
            displayNameTitle.textContent = newName.toUpperCase();
        }
        
        // Switch back to view mode
        profileDetails.classList.remove('edit-mode');
        editBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
        
        // Show success message
        showMessage('✅ Profile updated successfully!', 'success');
    });
    
    // Cancel button click handler
    cancelBtn.addEventListener('click', function() {
        // Restore original values
        document.getElementById('displayName').textContent = originalValues.name;
        document.getElementById('displayRegNo').textContent = originalValues.regNo;
        document.getElementById('displayProgram').textContent = originalValues.program;
        document.getElementById('displayEmail').textContent = originalValues.email;
        
        // Switch back to view mode
        profileDetails.classList.remove('edit-mode');
        editBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
        
        // Hide message
        messageBox.classList.remove('show');
    });
    
    // Helper function to show messages
    function showMessage(message, type) {
        messageBox.textContent = message;
        messageBox.className = 'message-box show ' + type;
        
        // Auto-hide success messages after 3 seconds
        if (type === 'success') {
            setTimeout(function() {
                messageBox.classList.remove('show');
            }, 3000);
        }
    }
}

// ==================== CALCULATE CREDITS ====================
// Calculate total credits when user clicks "Calculate Total Credits"
// Compute and display the total value dynamically
function initCalculateCredits() {
    const calculateBtn = document.getElementById('calculateBtn');
    if (!calculateBtn) return;
    
    calculateBtn.addEventListener('click', function() {
        // Get all credit cells from the table
        const creditCells = document.querySelectorAll('.credits');
        let totalCredits = 0;
        let subjectCount = 0;
        
        // Sum all credit values
        creditCells.forEach(function(cell) {
            const creditValue = parseInt(cell.textContent);
            if (!isNaN(creditValue)) {
                totalCredits += creditValue;
                subjectCount++;
            }
        });
        
        // Calculate average
        const averageCredits = subjectCount > 0 ? (totalCredits / subjectCount).toFixed(1) : 0;
        
        // Display the total credits
        const totalDisplay = document.getElementById('totalDisplay');
        const totalCreditsElement = document.getElementById('totalCredits');
        
        if (totalDisplay && totalCreditsElement) {
            totalCreditsElement.textContent = totalCredits;
            totalDisplay.classList.add('show');
            
            // Add animation effect
            totalCreditsElement.style.animation = 'pulse 0.5s ease';
            setTimeout(function() {
                totalCreditsElement.style.animation = '';
            }, 500);
        }
        
        // Update statistics section if it exists
        const statsSection = document.getElementById('statsSection');
        if (statsSection) {
            document.getElementById('totalSubjects').textContent = subjectCount;
            document.getElementById('avgCredits').textContent = averageCredits;
            document.getElementById('totalCreditsCard').textContent = totalCredits;
            statsSection.style.display = 'grid';
        }
        
        // Scroll to results smoothly
        totalDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// ==================== FORM VALIDATION ====================
// Validate all form fields before submission
// Display meaningful error or success messages
function initFormValidation() {
    const submitBtn = document.getElementById('submitBtn');
    if (!submitBtn) return;
    
    // Get form elements
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const messageTextarea = document.getElementById('message');
    
    // Character counter for message field
    if (messageTextarea) {
        const charCounter = document.getElementById('charCounter');
        if (charCounter) {
            messageTextarea.addEventListener('input', function() {
                const currentLength = this.value.length;
                const maxLength = this.getAttribute('maxlength') || 500;
                charCounter.textContent = currentLength + ' / ' + maxLength + ' characters';
                
                // Add warning class if approaching limit
                if (currentLength > maxLength * 0.9) {
                    charCounter.classList.add('warning');
                } else {
                    charCounter.classList.remove('warning');
                }
            });
        }
    }
    
    // Submit button click handler
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get error message elements
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        const formMessage = document.getElementById('formMessage');
        
        // Get form groups
        const nameGroup = document.getElementById('nameGroup');
        const emailGroup = document.getElementById('emailGroup');
        const messageGroup = document.getElementById('messageGroup');
        
        // Reset previous errors
        resetErrors();
        
        let isValid = true;
        
        // Validate Full Name
        if (!fullNameInput.value.trim()) {
            showError(nameGroup, nameError, '❌ Full name is required');
            isValid = false;
        } else if (fullNameInput.value.trim().length < 3) {
            showError(nameGroup, nameError, '❌  Name must be at least 3 characters');
            isValid = false;
        }
        
        // Validate Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showError(emailGroup, emailError, '❌ Email address is required');
            isValid = false;
        } else if (!emailPattern.test(emailInput.value)) {
            showError(emailGroup, emailError, '❌ Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Message
        if (!messageInput.value.trim()) {
            showError(messageGroup, messageError, '❌ Message is required');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageGroup, messageError, '❌ Message must be at least 10 characters');
            isValid = false;
        }
        
        // If all validations pass, show success message
        if (isValid) {
            // Show success message
            formMessage.innerHTML = '<div class="icon"> ✅ </div>Message sent successfully! We\'ll get back to you soon.';
            formMessage.className = 'form-message show success';
            
            // Mark all fields as success
            nameGroup.classList.add('success');
            emailGroup.classList.add('success');
            messageGroup.classList.add('success');
            
            // Clear form fields
            fullNameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
            
            // Reset character counter
            const charCounter = document.getElementById('charCounter');
            if (charCounter) {
                charCounter.textContent = '0 / 500 characters';
                charCounter.classList.remove('warning');
            }
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                formMessage.classList.remove('show');
                nameGroup.classList.remove('success');
                emailGroup.classList.remove('success');
                messageGroup.classList.remove('success');
            }, 5000);
            
            // Scroll to success message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            // Show error message
            formMessage.innerHTML = '<div class="icon"> ❌ </div>Please fix the errors above and try again.';
            formMessage.className = 'form-message show error';
            
            // Scroll to first error
            const firstError = document.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Helper function to show error
    function showError(formGroup, errorElement, errorMessage) {
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        }
    }
    
    // Helper function to reset all errors
    function resetErrors() {
        const formGroups = document.querySelectorAll('.form-group');
        const errorMessages = document.querySelectorAll('.error-message');
        
        formGroups.forEach(function(group) {
            group.classList.remove('error', 'success');
        });
        
        errorMessages.forEach(function(error) {
            error.textContent = '';
            error.style.display = 'none';
        });
        
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
            formMessage.classList.remove('show');
        }
    }
    
    // Real-time validation on input
    if (fullNameInput) {
        fullNameInput.addEventListener('input', function() {
            const nameGroup = document.getElementById('nameGroup');
            const nameError = document.getElementById('nameError');
            if (this.value.trim().length >= 3) {
                nameGroup.classList.remove('error');
                nameError.style.display = 'none';
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const emailGroup = document.getElementById('emailGroup');
            const emailError = document.getElementById('emailError');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailPattern.test(this.value)) {
                emailGroup.classList.remove('error');
                emailError.style.display = 'none';
            }
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            const messageGroup = document.getElementById('messageGroup');
            const messageError = document.getElementById('messageError');
            if (this.value.trim().length >= 10) {
                messageGroup.classList.remove('error');
                messageError.style.display = 'none';
            }
        });
    }
}

// ==================== INITIALIZE ALL FUNCTIONS ====================
// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    displayGreeting();
    initProfileEdit();
    initCalculateCredits();
    initFormValidation();
});
