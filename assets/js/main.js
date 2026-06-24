/* ==========================================================================
   GLOBAL SCRIPTS: LIGHT/DARK MODE, RTL, ACCORDIONS, CALCS, AND MODALS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Management (Light/Dark Mode via data-theme on html)
    const initTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        // If theme-2.html is active, default to dark. Otherwise, default to light
        const defaultTheme = window.location.pathname.includes('home-2.html') ? 'dark' : 'light';
        const currentTheme = storedTheme || defaultTheme;
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeToggleIcons();
    };

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggleIcons();
    };

    const updateThemeToggleIcons = () => {
        const toggles = document.querySelectorAll('.theme-switch i');
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        toggles.forEach(icon => {
            if (currentTheme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
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
        const labels = document.querySelectorAll('.dir-switch .dir-text');
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        labels.forEach(label => {
            label.textContent = currentDir === 'ltr' ? 'RTL' : 'LTR';
        });
    };

    // Attach Theme and RTL Toggles
    document.querySelectorAll('.theme-switch').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    document.querySelectorAll('.dir-switch').forEach(btn => {
        btn.addEventListener('click', toggleRTL);
    });

    initTheme();
    initRTL();

    // 3. Header Scroll Effect
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 4. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    if (hamburger && navLinks) {
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
            if (navOverlay) navOverlay.classList.toggle('visible');
        };

        hamburger.addEventListener('click', toggleMenu);
        if (navOverlay) {
            navOverlay.addEventListener('click', toggleMenu);
        }

        // Close mobile drawer on clicking anchor links
        navLinks.querySelectorAll('a:not(.nav-link)').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });
    }

    // Mobile Dropdowns accordion toggle behavior
    const dropdownToggles = document.querySelectorAll('.nav-item.has-dropdown > .nav-link');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const parent = toggle.parentElement;
                parent.classList.toggle('open');
            }
        });
    });

    // 5. FAQ Accordion
    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.faq-body');
            const isActive = item.classList.contains('active');

            // Close all other accordion items
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                const b = i.querySelector('.faq-body');
                if (b) b.style.maxHeight = null;
            });

            if (!isActive && body) {
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

        // Update display text values
        const spendValText = document.getElementById('spend-val');
        const convValText = document.getElementById('conv-val');
        const leadValText = document.getElementById('lead-val');

        if (spendValText) spendValText.textContent = '$' + spend.toLocaleString();
        if (convValText) convValText.textContent = conv.toFixed(1) + '%';
        if (leadValText) leadValText.textContent = '$' + targetLeadVal;

        // Perform returns calculations
        const totalLeads = Math.round(spend / targetLeadVal);
        const revenue = Math.round(totalLeads * (conv / 100) * 1500); // Assumes $1,500 Customer Value
        const roas = spend > 0 ? (revenue / spend).toFixed(1) : '0.0';

        const leadsEl = document.getElementById('result-leads');
        const revEl = document.getElementById('result-revenue');
        const roasEl = document.getElementById('result-roas');

        if (leadsEl) leadsEl.textContent = totalLeads.toLocaleString();
        if (revEl) revEl.textContent = '$' + revenue.toLocaleString();
        if (roasEl) roasEl.textContent = roas + 'x';
    };

    if (spendSlider) {
        spendSlider.addEventListener('input', updateROICalculator);
        if (convSlider) convSlider.addEventListener('input', updateROICalculator);
        if (leadSlider) leadSlider.addEventListener('input', updateROICalculator);
        updateROICalculator(); // Init values on load
    }

    // 7. Modals Manager (Audit tool, Strategy Booking)
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

    // Strategy Modal Trigger
    const strategyBtns = document.querySelectorAll('.trigger-strategy-call');
    const strategyModal = document.getElementById('strategy-modal');
    strategyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (strategyModal) strategyModal.classList.add('active');
        });
    });

    // 8. Client Mockup Dashboard Interactive Switcher
    const dbMenuItems = document.querySelectorAll('.dashboard-sidebar-menu li');
    const dbTabContents = document.querySelectorAll('.dashboard-tab-content');

    if (dbMenuItems.length > 0) {
        dbMenuItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active classes
                dbMenuItems.forEach(mi => mi.classList.remove('active'));
                dbTabContents.forEach(tc => tc.classList.remove('active'));

                // Add active to current click item
                item.classList.add('active');
                
                // Toggle active on correct tab pane
                const targetId = item.getAttribute('data-db-tab');
                const targetTab = document.getElementById(targetId);
                if (targetTab) {
                    targetTab.classList.add('active');
                }
            });
        });
    }

    // 9. Intersection Observer Stat Counter Animations
    const statObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const targetVal = parseInt(el.getAttribute('data-target') || '0');
            const suffix = el.getAttribute('data-suffix') || '';
            const isPercent = el.textContent.includes('%');
            
            let currentVal = 0;
            const steps = 60;
            const increment = Math.ceil(targetVal / steps);
            
            const counterInterval = setInterval(() => {
                currentVal = Math.min(currentVal + increment, targetVal);
                el.textContent = currentVal + suffix;
                if (currentVal >= targetVal) {
                    clearInterval(counterInterval);
                }
            }, 25);
            
            statObserver.unobserve(el);
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.p1-counter, .p2-counter').forEach(counter => {
        statObserver.observe(counter);
    });

    // 10. Home 1 Hero - Interactive Mouse Cursor Glow
    const heroSection = document.getElementById('hero');
    const cursorGlow = document.getElementById('heroCursorGlow');

    if (heroSection && cursorGlow) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            cursorGlow.style.left = `${x}px`;
            cursorGlow.style.top = `${y}px`;
            cursorGlow.style.opacity = '1';
        });

        heroSection.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
    }

    // 11. Home 1 Hero Mockup Dashboard Interactivity (Tabs & Hover Tooltips)
    const mockupBars = document.querySelectorAll('.p1-hero-mockup .chart-bar, .p1-hero-mockup .chart-bar-active');
    const mockupRevenueVal = document.getElementById('mockup-revenue-val');
    const mockupChartTooltip = document.getElementById('mockupChartTooltip');
    const mockupTabBtns = document.querySelectorAll('.p1-hero-mockup .mockup-tab-btn');
    const mockupPanes = document.querySelectorAll('.p1-hero-mockup .mockup-pane');

    const updateTooltip = (bar) => {
        if (!mockupChartTooltip || !mockupRevenueVal) return;
        const rev = bar.getAttribute('data-rev');
        const month = bar.getAttribute('data-month');
        
        // Update tooltip text
        mockupChartTooltip.textContent = `${month}: ${rev}`;
        
        // Calculate position
        const barRect = bar.getBoundingClientRect();
        const containerRect = bar.parentElement.getBoundingClientRect();
        
        // Calculate center relative to container
        const leftOffset = (barRect.left - containerRect.left) + (barRect.width / 2);
        const topOffset = (barRect.top - containerRect.top);
        
        mockupChartTooltip.style.left = `${leftOffset}px`;
        mockupChartTooltip.style.top = `${topOffset}px`;
        mockupChartTooltip.classList.add('active');
        
        // Dynamically update revenue header text with a fade transition
        if (mockupRevenueVal.textContent !== rev) {
            mockupRevenueVal.style.opacity = '0.3';
            setTimeout(() => {
                mockupRevenueVal.textContent = rev;
                mockupRevenueVal.style.opacity = '1';
            }, 100);
        }
    };

    const resetActiveStates = () => {
        mockupBars.forEach(b => {
            b.className = 'chart-bar';
        });
    };

    if (mockupBars.length > 0 && mockupRevenueVal && mockupChartTooltip) {
        // Attach chart hover listeners
        mockupBars.forEach(bar => {
            bar.addEventListener('mouseenter', () => {
                resetActiveStates();
                bar.className = 'chart-bar-active';
                updateTooltip(bar);
            });
        });

        // Set default tooltip positioning for May (the last/active one)
        const activeBar = document.querySelector('.p1-hero-mockup .chart-bar-active');
        if (activeBar) {
            // Wait slightly for layout to settle on DOM load
            setTimeout(() => {
                updateTooltip(activeBar);
            }, 300);
        }

        // Hide tooltip on mouse leave of the chart wrap, restoring May as active
        const chartWrap = document.querySelector('.p1-hero-mockup .mockup-chart-wrap');
        if (chartWrap) {
            chartWrap.addEventListener('mouseleave', () => {
                resetActiveStates();
                const defaultActive = document.querySelector('.p1-hero-mockup [data-month="May"]');
                if (defaultActive) {
                    defaultActive.className = 'chart-bar-active';
                    updateTooltip(defaultActive);
                }
            });
        }
    }

    if (mockupTabBtns.length > 0) {
        mockupTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Deactivate all buttons & panes
                mockupTabBtns.forEach(b => b.classList.remove('active'));
                mockupPanes.forEach(p => p.classList.remove('active'));
                
                // Activate current button
                btn.classList.add('active');
                
                // Activate targeted pane
                const targetId = btn.getAttribute('data-mockup-tab');
                const targetPane = document.getElementById(targetId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
                
                // If switching to Overview, make sure tooltip positions correctly
                if (targetId === 'mockup-pane-overview') {
                    const activeBar = document.querySelector('.p1-hero-mockup .chart-bar-active');
                    if (activeBar) {
                        setTimeout(() => {
                            updateTooltip(activeBar);
                        }, 50);
                    }
                }
            });
        });
    }
});
