document.addEventListener('DOMContentLoaded', function() {
    // ========== EVENT HANDLING ========== //
    
    // Click Event
    const clickBox = document.getElementById('click-box');
    clickBox.addEventListener('click', function() {
        this.textContent = 'Clicked!';
        this.style.backgroundColor = '#ff6b6b';
        setTimeout(() => {
            this.textContent = 'Click me again!';
            this.style.backgroundColor = '#6e8efb';
        }, 1000);
    });
    
    // Hover Event
    const hoverBox = document.getElementById('hover-box');
    hoverBox.addEventListener('mouseenter', function() {
        this.textContent = 'Mouse is here!';
        this.style.transform = 'scale(1.05)';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        this.textContent = 'Hover over me!';
        this.style.transform = 'scale(1)';
    });
    
    // Keypress Event
    const keypressBox = document.getElementById('keypress-box');
    keypressBox.setAttribute('tabindex', '0'); // Make it focusable
    
    keypressBox.addEventListener('keydown', function(e) {
        this.textContent = `You pressed: ${e.key}`;
        this.style.backgroundColor = '#00b894';
        
        setTimeout(() => {
            this.textContent = 'Press any key while focused!';
            this.style.backgroundColor = '#00c9a7';
        }, 1000);
    });
    
    // Secret Events (Double-click and Long Press)
    const secretBox = document.getElementById('secret-box');
    let pressTimer;
    
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            this.textContent = 'Long press detected!';
            this.classList.add('spin');
            setTimeout(() => {
                this.classList.remove('spin');
                this.textContent = 'Double-click or long press me!';
            }, 1000);
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('dblclick', function() {
        this.textContent = 'Double-click detected!';
        this.classList.add('bounce');
        setTimeout(() => {
            this.classList.remove('bounce');
            this.textContent = 'Double-click or long press me!';
        }, 1000);
    });
    
    // ========== INTERACTIVE ELEMENTS ========== //
    
    // Color Changer
    const colorBtn = document.getElementById('color-btn');
    const colorText = document.getElementById('color-text');
    
    colorBtn.addEventListener('click', function() {
        const colors = ['#ff6b6b', '#48dbfb', '#1dd1a1', '#feca57', '#5f27cd'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        colorText.style.backgroundColor = randomColor;
        colorText.style.color = getContrastColor(randomColor);
        colorText.textContent = `Now I'm ${randomColor}!`;
    });
    
    function getContrastColor(hexColor) {
        // Convert hex to RGB
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        
        // Calculate luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Return black or white depending on luminance
        return luminance > 0.5 ? '#000000' : '#ffffff';
    }
    
    // Image Gallery
    const galleryImages = document.querySelectorAll('.gallery-container img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    }, 3000);
    
    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update panes
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ========== FORM VALIDATION ========== //
    const signupForm = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    const formSuccess = document.getElementById('form-success');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameInput.classList.add('shake');
            setTimeout(() => nameInput.classList.remove('shake'), 400);
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('shake');
            setTimeout(() => emailInput.classList.remove('shake'), 400);
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    function validatePassword() {
        if (passwordInput.value.length === 0) {
            passwordError.textContent = 'Password is required';
            strengthBar.style.width = '0%';
            strengthText.textContent = '';
            return false;
        } else if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            strengthBar.style.width = '25%';
            strengthBar.style.backgroundColor = '#e74c3c';
            strengthText.textContent = 'Weak';
            return false;
        } else {
            passwordError.textContent = '';
            
            // Calculate password strength
            let strength = 0;
            
            // Length check
            if (passwordInput.value.length >= 8) strength += 1;
            if (passwordInput.value.length >= 12) strength += 1;
            
            // Complexity checks
            if (/[A-Z]/.test(passwordInput.value)) strength += 1;
            if (/[0-9]/.test(passwordInput.value)) strength += 1;
            if (/[^A-Za-z0-9]/.test(passwordInput.value)) strength += 1;
            
            // Update strength indicator
            const strengthPercent = Math.min(100, strength * 25);
            strengthBar.style.width = `${strengthPercent}%`;
            
            if (strength <= 2) {
                strengthBar.style.backgroundColor = '#e74c3c';
                strengthText.textContent = 'Weak';
            } else if (strength <= 4) {
                strengthBar.style.backgroundColor = '#f39c12';
                strengthText.textContent = 'Medium';
            } else {
                strengthBar.style.backgroundColor = '#2ecc71';
                strengthText.textContent = 'Strong';
            }
            
            return true;
        }
    }
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            formSuccess.textContent = 'Form submitted successfully!';
            formSuccess.style.display = 'block';
            
            // Reset form
            setTimeout(() => {
                signupForm.reset();
                formSuccess.textContent = '';
                strengthBar.style.width = '0%';
                strengthText.textContent = '';
            }, 2000);
        }
    });
});