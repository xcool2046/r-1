// Contact Form Module
export class ContactForm {
    constructor() {
        this.container = null;
        this.form = null;
    }

    init() {
        this.container = document.querySelector('.contact-content');
        if (!this.container) {
            console.warn('Contact container not found');
            return;
        }

        this.renderContactContent();
        this.setupEventListeners();
    }

    renderContactContent() {
        this.container.innerHTML = `
            <div class="contact-info">
                <h3>// Direct_Communication_Channels:</h3>
                <div class="contact-item">
                    <div class="contact-icon">📧</div>
                    <div class="contact-details">
                        <div class="contact-label">Email_Protocol:</div>
                        <div class="contact-value">
                            <a href="mailto:jianlixiazai@qq.com">jianlixiazai<[at]>qq<[dot]>com</a>
                        </div>
                    </div>
                </div>
                
                <div class="contact-item">
                    <div class="contact-icon">📱</div>
                    <div class="contact-details">
                        <div class="contact-label">Voice_Channel:</div>
                        <div class="contact-value">+86-188-8888-8888</div>
                    </div>
                </div>
                
                <div class="social-networks">
                    <h4>Professional_Networks:</h4>
                    <div class="social-links-grid">
                        <a href="#" class="social-link">
                            <span>🔗</span> LinkedIn_Profile
                        </a>
                        <a href="#" class="social-link">
                            <span>💻</span> GitHub_Repository
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="contact-form">
                <h3>// Initiate_Contact_Sequence:</h3>
                <p class="form-sequence">Initiate_Contact_Sequence...</p>
                
                <form id="contact-form" class="contact-form-element">
                    <div class="form-group">
                        <label for="contact-name" class="form-label">Your_Identifier:</label>
                        <input type="text" id="contact-name" name="name" class="form-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="contact-email" class="form-label">Email_Address:</label>
                        <input type="email" id="contact-email" name="email" class="form-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="contact-subject" class="form-label">Message_Subject:</label>
                        <input type="text" id="contact-subject" name="subject" class="form-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="contact-message" class="form-label">Message_Content:</label>
                        <textarea id="contact-message" name="message" class="form-textarea" required></textarea>
                    </div>
                    
                    <button type="submit" class="form-submit">[ Transmit_Signal >> ]</button>
                    
                    <div class="form-status" id="form-status"></div>
                </form>
            </div>
        `;
    }

    setupEventListeners() {
        this.form = document.getElementById('contact-form');
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(e);
        });

        // Add real-time validation
        const inputs = this.form.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    async handleFormSubmit(event) {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Validate form
        if (!this.validateForm(data)) {
            return;
        }

        // Show loading state
        this.setFormLoading(true);

        try {
            // Simulate form submission (replace with actual endpoint)
            await this.submitForm(data);
            
            this.showFormStatus('Message transmitted successfully! Response expected within 24-48 hours.', 'success');
            this.form.reset();
            
            // Dispatch success event
            document.dispatchEvent(new CustomEvent('contactFormSubmit', {
                detail: { success: true, message: 'Message sent successfully!' }
            }));
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormStatus('Transmission failed. Please try alternative communication channels.', 'error');
            
            // Dispatch error event
            document.dispatchEvent(new CustomEvent('contactFormSubmit', {
                detail: { success: false, message: error.message }
            }));
        } finally {
            this.setFormLoading(false);
        }
    }

    async submitForm(data) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                if (Math.random() > 0.2) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Network transmission error'));
                }
            }, 2000);
        });
    }

    validateForm(data) {
        let isValid = true;
        const errors = {};

        // Validate required fields
        if (!data.name || data.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
            isValid = false;
        }

        if (!data.email || !this.isValidEmail(data.email)) {
            errors.email = 'Valid email address required';
            isValid = false;
        }

        if (!data.subject || data.subject.trim().length < 3) {
            errors.subject = 'Subject must be at least 3 characters';
            isValid = false;
        }

        if (!data.message || data.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters';
            isValid = false;
        }

        // Display errors
        Object.keys(errors).forEach(field => {
            this.showFieldError(field, errors[field]);
        });

        return isValid;
    }

    validateField(input) {
        const value = input.value.trim();
        const name = input.name;
        let error = '';

        switch (name) {
            case 'name':
                if (value.length < 2) error = 'Name too short';
                break;
            case 'email':
                if (!this.isValidEmail(value)) error = 'Invalid email';
                break;
            case 'subject':
                if (value.length < 3) error = 'Subject too short';
                break;
            case 'message':
                if (value.length < 10) error = 'Message too short';
                break;
        }

        if (error) {
            this.showFieldError(name, error);
        } else {
            this.clearFieldError(input);
        }
    }

    showFieldError(fieldName, message) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        field.style.borderColor = 'var(--accent-magenta)';
        
        // Remove existing error
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add new error
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: var(--accent-magenta);
            font-size: 0.8rem;
            font-family: var(--font-mono);
            margin-top: 4px;
        `;
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(input) {
        input.style.borderColor = 'var(--accent-cyan)';
        const error = input.parentNode.querySelector('.field-error');
        if (error) {
            error.remove();
        }
    }

    showFormStatus(message, type) {
        const statusElement = document.getElementById('form-status');
        if (!statusElement) return;

        statusElement.textContent = message;
        statusElement.className = `form-status ${type}`;
    }

    setFormLoading(loading) {
        const submitButton = this.form.querySelector('.form-submit');
        if (!submitButton) return;

        if (loading) {
            submitButton.textContent = '[ Transmitting... ]';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.6';
        } else {
            submitButton.textContent = '[ Transmit_Signal >> ]';
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
} 