/* ==========================================================================
   GLOBAL SCRIPTS: LIGHT/DARK MODE, RTL, ACCORDIONS, CALCS, AND WIZARDS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Management (Light/Dark Mode)
    const initTheme = () => {
        const currentTheme = localStorage.getItem('theme') || 'dark'; // Default to dark for premium SaaS feel
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        updateThemeToggleIcons();
    };

    const toggleTheme = () => {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
        updateThemeToggleIcons();
    };

    const updateThemeToggleIcons = () => {
        const toggles = document.querySelectorAll('.theme-toggle-icon');
        const isDark = document.body.classList.contains('dark-mode');
        toggles.forEach(icon => {
            icon.textContent = isDark ? '☀️' : '🌙';
        });
    };

    // 2. RTL Management
    const initRTL = () => {
        const currentDir = localStorage.getItem('dir') || 'ltr';
        document.documentElement.setAttribute('dir', currentDir);
        updateRTLToggleLabels();
    };

    const toggleRTL = () => {
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', newDir);
        localStorage.setItem('dir', newDir);
        updateRTLToggleLabels();
    };

    const updateRTLToggleLabels = () => {
        const labels = document.querySelectorAll('.rtl-toggle-text');
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        labels.forEach(label => {
            label.textContent = currentDir === 'ltr' ? 'LTR' : 'RTL';
        });
    };

    // Attach Theme and RTL Toggles
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
        btn.addEventListener('click', toggleRTL);
    });

    initTheme();
    initRTL();

    // 3. Header Scroll Effect
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 4. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    // 5. FAQ Accordion
    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.faq-body');
            const isActive = item.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-body').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    // 6. Interactive ROI Calculator
    const spendSlider = document.getElementById('calc-spend');
    const convSlider = document.getElementById('calc-conv');
    const leadSlider = document.getElementById('calc-lead');

    const updateROICalculator = () => {
        if (!spendSlider) return;

        const spend = parseInt(spendSlider.value);
        const conv = parseFloat(convSlider.value);
        const targetLeadVal = parseInt(leadSlider.value);

        // Update labels
        document.getElementById('spend-val').textContent = '$' + spend.toLocaleString();
        document.getElementById('conv-val').textContent = conv + '%';
        document.getElementById('lead-val').textContent = '$' + targetLeadVal;

        // Perform calculations
        // Average Customer Value assumed $1500, average lead rate calculation
        const totalLeads = Math.round(spend / targetLeadVal);
        const revenue = Math.round(totalLeads * (conv / 100) * 1500);
        const roas = spend > 0 ? (revenue / spend).toFixed(1) : 0;

        document.getElementById('result-leads').textContent = totalLeads.toLocaleString();
        document.getElementById('result-revenue').textContent = '$' + revenue.toLocaleString();
        document.getElementById('result-roas').textContent = roas + 'x';
    };

    if (spendSlider) {
        spendSlider.addEventListener('input', updateROICalculator);
        convSlider.addEventListener('input', updateROICalculator);
        leadSlider.addEventListener('input', updateROICalculator);
        updateROICalculator(); // Initial run
    }

    // 7. Modals Manager (Audit, Strategy Booking Wizard)
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    const closeButtons = document.querySelectorAll('.modal-close');

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modalOverlays.forEach(o => o.classList.remove('active'));
        });
    });

    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    // Strategy Call Modal Trigger
    const strategyBtns = document.querySelectorAll('.trigger-strategy-call');
    const strategyModal = document.getElementById('strategy-modal');
    strategyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (strategyModal) strategyModal.classList.add('active');
        });
    });

    // Audit Tool Wizard Modal Trigger & Stepper
    const auditBtns = document.querySelectorAll('.trigger-audit-tool');
    const auditModal = document.getElementById('audit-modal');
    auditBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (auditModal) {
                resetAuditWizard();
                auditModal.classList.add('active');
            }
        });
    });

    // Audit Wizard Stepper logic
    let auditStep = 1;
    const nextStepBtns = document.querySelectorAll('.audit-next');
    const prevStepBtns = document.querySelectorAll('.audit-prev');
    const auditSteps = document.querySelectorAll('.wizard-step');
    const auditProgress = document.getElementById('audit-progress-bar');

    const updateAuditWizard = () => {
        auditSteps.forEach((step, idx) => {
            if (idx === (auditStep - 1)) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        if (auditProgress) {
            const percent = ((auditStep - 1) / (auditSteps.length - 1)) * 100;
            auditProgress.style.width = percent + '%';
        }
    };

    const resetAuditWizard = () => {
        auditStep = 1;
        updateAuditWizard();
    };

    nextStepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (auditStep < auditSteps.length) {
                // Form validation simple check
                if (auditStep === 1) {
                    const emailInput = document.getElementById('audit-email');
                    const urlInput = document.getElementById('audit-url');
                    if (emailInput && !emailInput.value.includes('@')) {
                        alert('Please enter a valid email address.');
                        return;
                    }
                    if (urlInput && urlInput.value.trim() === '') {
                        alert('Please enter your website URL.');
                        return;
                    }
                }
                auditStep++;
                updateAuditWizard();
                if (auditStep === 3) {
                    // Generate dynamic result score
                    generateAuditResults();
                }
            }
        });
    });

    prevStepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (auditStep > 1) {
                auditStep--;
                updateAuditWizard();
            }
        });
    });

    const generateAuditResults = () => {
        const url = document.getElementById('audit-url')?.value || 'yourwebsite.com';
        const service = document.getElementById('audit-service')?.value || 'SEO';
        
        // Generate random but professional looking scores
        const score = Math.floor(Math.random() * 20) + 65; // 65-85 score
        
        const scoreCircle = document.getElementById('audit-score-circle');
        const recommendText = document.getElementById('audit-recommendations');
        
        if (scoreCircle) {
            scoreCircle.innerHTML = `
                <div style="font-size: 3rem; font-weight:800; color:var(--primary);">${score}/100</div>
                <div style="font-size:0.875rem; color:var(--text-muted);">Marketing Score</div>
            `;
        }
        
        if (recommendText) {
            recommendText.innerHTML = `
                <h4>Key Recommendations for ${url}:</h4>
                <ul style="padding-inline-start: 20px; margin-top: 10px; text-align: left; display: flex; flex-direction:column; gap: 8px;">
                    <li>🏷️ Fix 12 missing meta tags and schema structured markup for better search visibility.</li>
                    <li>⚡ Compress visual assets to solve Web Vitals LCP latency issues.</li>
                    <li>🎯 Set up conversion funnel tracking for your targeted <strong>${service}</strong> campaigns.</li>
                </ul>
            `;
        }
    };
});
