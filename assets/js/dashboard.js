/* ==========================================================================
   SAAS PORTAL INTERACTIVITY: SVG CHARTS, APPROVALS, STRIPE & MESSAGES
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Sidebar Toggle
    const sidebar = document.querySelector('.sidebar');
    const headerToggle = document.querySelector('.dashboard-menu-toggle');

    if (headerToggle && sidebar) {
        headerToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // 2. Global State Persistence System
    const loadState = (key, defaultVal) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultVal;
    };

    const saveState = (key, val) => {
        localStorage.setItem(key, JSON.stringify(val));
    };

    // Load initial configurations
    const defaultCreatives = [
        {
            id: 1,
            title: "Summer Sales Banner - Facebook Ads",
            type: "Image Banner",
            size: "1200x628",
            image: "https://picsum.photos/id/26/600/300",
            status: "pending",
            comments: ["Please verify the brand accent color."]
        },
        {
            id: 2,
            title: "SEO Ebook Promo Video - Instagram Story",
            type: "MP4 Video Ads",
            size: "9:16 Portrait",
            image: "https://picsum.photos/id/3/600/300",
            status: "pending",
            comments: []
        },
        {
            id: 3,
            title: "Black Friday Retargeting Copy - Google Ads",
            type: "Text/Responsive Copy",
            size: "Headlines & Descriptions",
            image: "https://picsum.photos/id/60/600/300",
            status: "approved",
            comments: ["Looks great!", "Matches our tone perfectly."]
        }
    ];

    const defaultInvoices = [
        { id: "INV-2026-003", description: "Monthly SEO Campaign Management", amount: 1500, date: "2026-06-01", due: "2026-06-15", status: "paid" },
        { id: "INV-2026-004", description: "Paid Search & Meta Ads Spend Reimbursement", amount: 3200, date: "2026-06-10", due: "2026-06-24", status: "pending" },
        { id: "INV-2026-005", description: "Conversion Rate Optimization Funnel Setup", amount: 1800, date: "2026-06-15", due: "2026-06-30", status: "pending" }
    ];

    const defaultMessages = [
        { sender: "agency", text: "Hi there! We have uploaded the Summer Sales creatives to the Approval Center. Let us know your thoughts.", time: "10:15 AM" },
        { sender: "client", text: "Thanks, I am checking them out now. The metrics look solid for this month!", time: "10:22 AM" },
        { sender: "agency", text: "Fantastic! Yes, the new PPC adjustments are scaling very nicely.", time: "10:25 AM" }
    ];

    const defaultGoals = [
        { title: "Increase Monthly SEO Traffic to 25k", current: 22400, target: 25000, unit: "sessions" },
        { title: "Achieve Google Ads ROAS of 4.5x", current: 4.1, target: 4.5, unit: "x" },
        { title: "Lead Generation Threshold", current: 480, target: 500, unit: "leads" }
    ];

    // Read stored variables or set defaults
    let creatives = loadState('agency_creatives', defaultCreatives);
    let invoices = loadState('agency_invoices', defaultInvoices);
    let messages = loadState('agency_messages', defaultMessages);
    let goals = loadState('agency_goals', defaultGoals);

    // 3. Render Dashboard Charts (SVG Engine)
    const drawDashboardCharts = () => {
        const chartElement = document.getElementById('analytics-trend-chart');
        if (!chartElement) return;

        // Data points (Month Sessions vs Conversions)
        const sessionsData = [12000, 14200, 16800, 15500, 19200, 22400];
        const conversionsData = [450, 520, 610, 580, 780, 890];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

        const width = chartElement.clientWidth || 800;
        const height = 300;
        const padding = 40;

        const maxSession = Math.max(...sessionsData) * 1.1;
        const maxConv = Math.max(...conversionsData) * 1.1;

        // Map data points
        const mapX = (idx) => padding + (idx * (width - 2 * padding) / (sessionsData.length - 1));
        const mapY = (val, max) => height - padding - (val * (height - 2 * padding) / max);

        // Generate lines paths
        let sessionPath = `M ${mapX(0)} ${mapY(sessionsData[0], maxSession)}`;
        let sessionArea = `M ${mapX(0)} ${height - padding} L ${mapX(0)} ${mapY(sessionsData[0], maxSession)}`;
        
        let convPath = `M ${mapX(0)} ${mapY(conversionsData[0], maxConv)}`;
        let convArea = `M ${mapX(0)} ${height - padding} L ${mapX(0)} ${mapY(conversionsData[0], maxConv)}`;

        for (let i = 1; i < sessionsData.length; i++) {
            sessionPath += ` L ${mapX(i)} ${mapY(sessionsData[i], maxSession)}`;
            sessionArea += ` L ${mapX(i)} ${mapY(sessionsData[i], maxSession)}`;

            convPath += ` L ${mapX(i)} ${mapY(conversionsData[i], maxConv)}`;
            convArea += ` L ${mapX(i)} ${mapY(conversionsData[i], maxConv)}`;
        }

        sessionArea += ` L ${mapX(sessionsData.length - 1)} ${height - padding} Z`;
        convArea += ` L ${mapX(conversionsData.length - 1)} ${height - padding} Z`;

        // Draw grid lines
        let grids = '';
        for (let j = 0; j < 5; j++) {
            const y = padding + (j * (height - 2 * padding) / 4);
            grids += `<line class="chart-grid-line" x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" />`;
        }

        // Draw dots and tooltips
        let dots = '';
        sessionsData.forEach((val, i) => {
            dots += `
                <circle class="chart-dot" cx="${mapX(i)}" cy="${mapY(val, maxSession)}" r="5" fill="#2563EB" stroke="#ffffff" 
                data-tooltip="Traffic: ${val.toLocaleString()} Sessions" />
            `;
        });

        conversionsData.forEach((val, i) => {
            dots += `
                <circle class="chart-dot" cx="${mapX(i)}" cy="${mapY(val, maxConv)}" r="5" fill="#06B6D4" stroke="#ffffff"
                data-tooltip="Conversions: ${val} Leads" />
            `;
        });

        // Draw X Axis Labels
        let labels = '';
        months.forEach((m, i) => {
            labels += `
                <text x="${mapX(i)}" y="${height - 10}" text-anchor="middle" fill="var(--text-muted)" font-size="12">${m}</text>
            `;
        });

        chartElement.innerHTML = `
            <svg class="svg-chart" width="${width}" height="${height}">
                <defs>
                    <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#2563EB" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="#2563EB" stop-opacity="0"/>
                    </linearGradient>
                    <linearGradient id="chart-gradient-secondary" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="#06B6D4" stop-opacity="0"/>
                    </linearGradient>
                </defs>
                ${grids}
                <path class="chart-area" d="${sessionArea}" />
                <path class="chart-area-secondary" d="${convArea}" />
                <path class="chart-line" d="${sessionPath}" />
                <path class="chart-line-secondary" d="${convPath}" />
                ${dots}
                ${labels}
            </svg>
            <div id="chart-tooltip-box" class="chart-tooltip"></div>
        `;

        // Tooltip Interactivity
        const tooltipBox = document.getElementById('chart-tooltip-box');
        chartElement.querySelectorAll('.chart-dot').forEach(dot => {
            dot.addEventListener('mouseover', (e) => {
                tooltipBox.textContent = dot.getAttribute('data-tooltip');
                tooltipBox.style.opacity = '1';
                tooltipBox.style.left = (e.clientX - chartElement.getBoundingClientRect().left + 15) + 'px';
                tooltipBox.style.top = (e.clientY - chartElement.getBoundingClientRect().top - 35) + 'px';
            });
            dot.addEventListener('mousemove', (e) => {
                tooltipBox.style.left = (e.clientX - chartElement.getBoundingClientRect().left + 15) + 'px';
                tooltipBox.style.top = (e.clientY - chartElement.getBoundingClientRect().top - 35) + 'px';
            });
            dot.addEventListener('mouseout', () => {
                tooltipBox.style.opacity = '0';
            });
        });
    };

    window.addEventListener('resize', drawDashboardCharts);
    drawDashboardCharts();

    // 4. Creative Approvals Board Controller
    const renderCreativesBoard = () => {
        const board = document.getElementById('creatives-board');
        if (!board) return;

        board.innerHTML = creatives.map(c => `
            <div class="creative-card">
                <div class="creative-preview">
                    <img class="creative-preview-banner" src="${c.image}" alt="${c.title}">
                    <span class="creative-preview-badge status-badge ${c.status}">${c.status.toUpperCase()}</span>
                </div>
                <div class="creative-body">
                    <div>
                        <h4 style="margin-bottom:6px;">${c.title}</h4>
                        <span class="creative-meta">${c.type} • ${c.size}</span>
                    </div>
                    <div class="creative-comments">
                        <label style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">COMMENTS HISTORY</label>
                        <div class="comment-list">
                            ${c.comments.length ? c.comments.map(com => `<div class="comment-item">${com}</div>`).join('') : '<div class="comment-item" style="color:var(--text-muted);">No comments yet.</div>'}
                        </div>
                    </div>
                    ${c.status === 'pending' ? `
                        <div class="creative-actions">
                            <button class="btn btn-primary btn-sm approve-creative-btn" data-id="${c.id}" style="background-color:var(--success);">Approve</button>
                            <button class="btn btn-secondary btn-sm reject-creative-btn" data-id="${c.id}" style="color:var(--danger); border-color:var(--danger);">Request Changes</button>
                        </div>
                    ` : `<div style="text-align:center; font-size:0.875rem; font-weight:600; color:var(--success);">✓ Resolved</div>`}
                </div>
            </div>
        `).join('');

        // Attach action handlers
        board.querySelectorAll('.approve-creative-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                const creative = creatives.find(item => item.id === id);
                if (creative) {
                    creative.status = 'approved';
                    creative.comments.push("Approved by client.");
                    saveState('agency_creatives', creatives);
                    renderCreativesBoard();
                }
            });
        });

        board.querySelectorAll('.reject-creative-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                const comment = prompt("Please provide feedback or required changes:");
                if (comment && comment.trim() !== "") {
                    const creative = creatives.find(item => item.id === id);
                    if (creative) {
                        creative.status = 'rejected';
                        creative.comments.push(comment);
                        saveState('agency_creatives', creatives);
                        renderCreativesBoard();
                    }
                }
            });
        });
    };

    renderCreativesBoard();

    // 5. Invoice Management & Stripe Payment Portal Simulator
    const renderInvoices = () => {
        const tableBody = document.getElementById('invoices-table-body');
        if (!tableBody) return;

        tableBody.innerHTML = invoices.map(inv => `
            <tr>
                <td style="font-weight:600;">${inv.id}</td>
                <td>${inv.description}</td>
                <td style="font-weight:700;">$${inv.amount.toLocaleString()}</td>
                <td>${inv.due}</td>
                <td><span class="status-badge ${inv.status}">${inv.status.toUpperCase()}</span></td>
                <td>
                    ${inv.status === 'pending' ? `
                        <button class="btn btn-primary btn-sm pay-invoice-btn" data-id="${inv.id}">Pay Now</button>
                    ` : `<button class="btn btn-secondary btn-sm" disabled>Receipt</button>`}
                </td>
            </tr>
        `).join('');

        tableBody.querySelectorAll('.pay-invoice-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const inv = invoices.find(i => i.id === id);
                if (inv) {
                    openStripeMockModal(inv);
                }
            });
        });
    };

    const stripeModal = document.getElementById('stripe-mock-modal');
    const openStripeMockModal = (invoice) => {
        if (!stripeModal) return;
        document.getElementById('stripe-invoice-id').textContent = invoice.id;
        document.getElementById('stripe-amount').textContent = '$' + invoice.amount.toLocaleString();
        stripeModal.classList.add('active');

        // Payment submission
        const submitBtn = document.getElementById('stripe-submit-btn');
        const clickHandler = (e) => {
            e.preventDefault();
            submitBtn.textContent = "Processing payment secure credentials...";
            submitBtn.disabled = true;
            setTimeout(() => {
                invoice.status = "paid";
                saveState('agency_invoices', invoices);
                stripeModal.classList.remove('active');
                submitBtn.textContent = "Confirm Payment";
                submitBtn.disabled = false;
                renderInvoices();
                submitBtn.removeEventListener('click', clickHandler);
            }, 2000);
        };
        submitBtn.addEventListener('click', clickHandler);
    };

    renderInvoices();

    // 6. Support & Account Manager Messaging System
    const renderMessages = () => {
        const chatWindow = document.getElementById('chat-window-messages');
        if (!chatWindow) return;

        chatWindow.innerHTML = messages.map(m => `
            <div class="chat-bubble ${m.sender === 'client' ? 'sent' : 'received'}">
                <div>${m.text}</div>
                <div style="font-size:0.7rem; opacity:0.7; text-align:right; margin-top:4px;">${m.time}</div>
            </div>
        `).join('');
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    const sendBtn = document.getElementById('chat-send-btn');
    const inputField = document.getElementById('chat-input-text');

    if (sendBtn && inputField) {
        const handleSendMessage = () => {
            const text = inputField.value.trim();
            if (text === '') return;

            // Add client message
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            messages.push({ sender: 'client', text: text, time: timeStr });
            saveState('agency_messages', messages);
            renderMessages();
            inputField.value = '';

            // Simulate Account Manager auto-reply
            const chatWindow = document.getElementById('chat-window-messages');
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'chat-bubble received';
            typingIndicator.style.fontStyle = 'italic';
            typingIndicator.textContent = 'Account Manager is typing...';
            chatWindow.appendChild(typingIndicator);
            chatWindow.scrollTop = chatWindow.scrollHeight;

            setTimeout(() => {
                chatWindow.removeChild(typingIndicator);
                const managerReplies = [
                    "Understood. Let me sync with the SEO specialists and get back to you shortly.",
                    "Great point. I will add that requirement to our weekly sprint tracker.",
                    "Thanks for details! I will follow up with the creative team regarding adjustments.",
                    "Absolutely. We will send you the monthly report details early tomorrow."
                ];
                const reply = managerReplies[Math.floor(Math.random() * managerReplies.length)];
                messages.push({ sender: 'agency', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
                saveState('agency_messages', messages);
                renderMessages();
            }, 1500);
        };

        sendBtn.addEventListener('click', handleSendMessage);
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
    }

    renderMessages();

    // 7. Goals and Target tracking milestones
    const renderGoals = () => {
        const list = document.getElementById('goals-tracking-list');
        if (!list) return;

        list.innerHTML = goals.map(g => {
            const pct = Math.min((g.current / g.target) * 100, 100).toFixed(0);
            return `
                <div style="background-color:var(--panel-bg); border: 1px solid var(--border-color); border-radius:var(--radius-md); padding: 24px; margin-bottom: 20px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-weight:600;">
                        <span>${g.title}</span>
                        <span style="color:var(--primary);">${g.current} / ${g.target} ${g.unit} (${pct}%)</span>
                    </div>
                    <div style="height:8px; background-color:var(--bg-color); border-radius:var(--radius-full); overflow:hidden;">
                        <div style="height:100%; width:${pct}%; background-color:var(--success); transition: width 1s ease-out;"></div>
                    </div>
                </div>
            `;
        }).join('');
    };

    renderGoals();

    // 8. Settings Form Handler
    const settingsForm = document.getElementById('settings-profile-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const clientName = document.getElementById('settings-company-name').value;
            localStorage.setItem('client_company_name', clientName);
            alert("Settings saved successfully!");
        });

        // Initialize company name from storage
        const storedName = localStorage.getItem('client_company_name');
        if (storedName) {
            document.getElementById('settings-company-name').value = storedName;
            const profileHeaderNames = document.querySelectorAll('.profile-client-name');
            profileHeaderNames.forEach(el => el.textContent = storedName);
        }
    }
});
