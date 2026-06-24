/* ==========================================================================
   ADMIN PORTAL OPERATIONS MOCK SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sidebar menu toggle in admin with Overlay & Close Button
    const sidebar = document.querySelector('.sidebar');
    let overlay = document.querySelector('.sidebar-overlay');
    
    // Inject overlay if it doesn't exist
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }

    // Inject close button into sidebar if it doesn't exist
    if (sidebar && !sidebar.querySelector('.sidebar-close-btn')) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'sidebar-close-btn';
        closeBtn.innerHTML = '<i class="ph ph-x"></i>';
        sidebar.appendChild(closeBtn);
    }

    document.body.addEventListener('click', (e) => {
        // Open Sidebar
        if (e.target.closest('.dashboard-menu-toggle')) {
            if (sidebar) sidebar.classList.add('active');
            if (overlay) overlay.classList.add('active');
        }
        // Close Sidebar
        if (e.target.closest('.sidebar-close-btn') || e.target.classList.contains('sidebar-overlay')) {
            if (sidebar) sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        }
    });

    // Move header actions to sidebar on mobile screens
    const headerActionsContainer = document.querySelector('.dashboard-header-actions');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    if (headerActionsContainer && sidebarMenu) {
        let mobileActionsRow = document.createElement('li');
        mobileActionsRow.className = 'mobile-actions-row';
        const logoutLi = sidebarMenu.lastElementChild;
        sidebarMenu.insertBefore(mobileActionsRow, logoutLi);

        const relocateActions = () => {
            const isMobile = window.innerWidth <= 768;
            Array.from(headerActionsContainer.children).forEach(el => {
                if (!el.classList.contains('header-search')) {
                    if (isMobile) {
                        mobileActionsRow.appendChild(el);
                    } else {
                        headerActionsContainer.appendChild(el);
                    }
                }
            });
        };
        window.addEventListener('resize', relocateActions);
        relocateActions();
    }

    // 2. Global State Persistence System
    const loadState = (key, defaultVal) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultVal;
    };

    const saveState = (key, val) => {
        localStorage.setItem(key, JSON.stringify(val));
    };

    // Shared Client-Admin Data Stores
    const defaultInvoices = [
        { id: "INV-2026-003", description: "Monthly SEO Campaign Management", amount: 1500, date: "2026-06-01", due: "2026-06-15", status: "paid" },
        { id: "INV-2026-004", description: "Paid Search & Meta Ads Spend Reimbursement", amount: 3200, date: "2026-06-10", due: "2026-06-24", status: "pending" },
        { id: "INV-2026-005", description: "Conversion Rate Optimization Funnel Setup", amount: 1800, date: "2026-06-15", due: "2026-06-30", status: "pending" }
    ];

    const defaultBlogs = [
        { id: 1, title: "Using SEO Topic Clusters to Capture Enterprise Search Space", category: "Search Optimization", date: "2026-06-15", status: "published" },
        { id: 2, title: "Overhauling Meta Ad Account Structures for Summer Scaling", category: "Paid Media (PPC)", date: "2026-06-10", status: "published" },
        { id: 3, title: "A/B Testing Headline Formulas: 3 Frameworks for Landing Pages", category: "Conversion Funnels (CRO)", date: "2026-06-05", status: "published" }
    ];

    const defaultUsers = [
        { id: 101, name: "Marcus Vance", email: "marcus@ecomdynamics.com", company: "E-Com Dynamics", role: "Manager", status: "active" },
        { id: 102, name: "Elena Rostova", email: "elena@saasifyglobal.com", company: "SaaSify Global", role: "Owner", status: "active" },
        { id: 103, name: "Julian K.", email: "julian@vcpartners.com", company: "Venture Capital Inc", role: "Manager", status: "active" },
        { id: 104, name: "Admin Lead", email: "admin@apexgrowth.com", company: "ApexGrowth Staff", role: "Super Admin", status: "active" },
        { id: 105, name: "Chloe Smith", email: "chloe@innovatestudios.com", company: "Innovate Studios", role: "Manager", status: "pending" }
    ];

    const defaultClients = [
        { id: 201, company: "SaaSify Global", budget: 15000, spend: 12400, roas: "4.8x", status: "active", manager: "Sarah Chen" },
        { id: 202, company: "E-Com Dynamics", budget: 22000, spend: 18900, roas: "4.5x", status: "active", manager: "Marcus Kincaid" },
        { id: 203, company: "Alpha Tech", budget: 8000, spend: 3200, roas: "3.9x", status: "onboarding", manager: "Sarah Chen" },
        { id: 204, company: "Venture Capital Inc", budget: 45000, spend: 41000, roas: "5.2x", status: "active", manager: "Marcus Kincaid" }
    ];

    const defaultAudits = [
        { id: 301, domain: "saasifyglobal.com", email: "elena@saasifyglobal.com", service: "SEO", score: 78, status: "completed" },
        { id: 302, domain: "ecomdynamics.com", email: "marcus@ecomdynamics.com", service: "Paid Ads", score: 82, status: "completed" },
        { id: 303, domain: "newtechstartup.io", email: "hello@newtech.io", service: "CRO", score: 0, status: "pending" }
    ];

    let invoices = loadState('agency_invoices', defaultInvoices);
    let blogs = loadState('agency_blogs', defaultBlogs);
    let users = loadState('admin_users', defaultUsers);
    let clients = loadState('admin_clients', defaultClients);
    let audits = loadState('admin_audits', defaultAudits);

    // ==========================================
    // MODULE 1: USER MANAGEMENT
    // ==========================================
    const renderUsersTable = () => {
        const grid = document.getElementById('admin-users-grid') || document.getElementById('admin-users-table-body');
        if (!grid) return;

        if (grid.tagName.toLowerCase() === 'tbody') {
            grid.innerHTML = users.map(u => `
                <tr id="user-row-${u.id}">
                    <td style="font-weight:600;">${u.id}</td>
                    <td><strong>${u.name}</strong></td>
                    <td>${u.email}</td>
                    <td>${u.company}</td>
                    <td><span class="status-badge paid" style="background-color:rgba(147,51,234,0.1); color:#9333ea;">${u.role}</span></td>
                    <td><span class="status-badge ${u.status === 'active' ? 'paid' : 'overdue'}">${u.status.toUpperCase()}</span></td>
                    <td>
                        <button class="btn btn-secondary btn-sm delete-user-btn" data-id="${u.id}" style="padding: 6px 12px; border-color:var(--danger); color:var(--danger);">Delete</button>
                    </td>
                </tr>
            `).join('');
        } else {
            grid.innerHTML = users.map(u => `
                <div class="kanban-card" style="display:flex; flex-direction:column; align-items:center; text-align:center; position:relative; overflow:hidden; padding-top:10px;" id="user-card-${u.id}">
                    <div style="width:100%; height:60px; background: linear-gradient(135deg, rgba(147,51,234,0.1) 0%, rgba(59,130,246,0.1) 100%); position:absolute; top:0; left:0; z-index:0;"></div>
                    <div class="profile-avatar" style="width:64px; height:64px; font-size:1.5rem; margin-top:10px; z-index:1; border:4px solid var(--panel-bg);">${u.name.substring(0, 2).toUpperCase()}</div>
                    <h3 style="font-size:1.1rem; margin-top:10px; margin-bottom:4px; z-index:1;">${u.name}</h3>
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px; z-index:1;">${u.company}</p>
                    <div style="display:flex; gap:8px; margin-bottom:20px; z-index:1;">
                        <span class="status-badge" style="background-color:rgba(147,51,234,0.1); color:#9333ea;">${u.role}</span>
                        <span class="status-badge ${u.status === 'active' ? 'paid' : 'overdue'}">${u.status.toUpperCase()}</span>
                    </div>
                    <div style="width:100%; border-top:1px solid var(--border-color); padding-top:16px; display:flex; justify-content:space-between; align-items:center; z-index:1;">
                        <span style="font-size:0.8rem; color:var(--text-muted);"><a href="mailto:${u.email}" style="color:var(--text-muted); text-decoration:none;">${u.email}</a></span>
                        <button class="btn btn-secondary btn-sm delete-user-btn" data-id="${u.id}" style="padding: 4px 8px; border-color:var(--danger); color:var(--danger); font-size:0.75rem;">Delete</button>
                    </div>
                </div>
            `).join('');
        }

        grid.querySelectorAll('.delete-user-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                if (confirm(`Are you sure you want to delete user ID ${id}?`)) {
                    users = users.filter(u => u.id !== id);
                    saveState('admin_users', users);
                    renderUsersTable();
                }
            });
        });
    };

    const addUserForm = document.getElementById('admin-add-user-form');
    if (addUserForm) {
        addUserForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('user-fullname').value;
            const email = document.getElementById('user-emailaddr').value;
            const company = document.getElementById('user-companyname').value;
            const role = document.getElementById('user-role').value;

            const newUser = {
                id: Math.floor(Math.random() * 1000) + 200,
                name: name,
                email: email,
                company: company,
                role: role,
                status: "active"
            };

            users.push(newUser);
            saveState('admin_users', users);
            renderUsersTable();
            addUserForm.reset();
            alert("User account created successfully!");
        });
    }

    renderUsersTable();

    // ==========================================
    // MODULE 2: CLIENT PORTALS MANAGEMENT
    // ==========================================
    const renderClientsGrid = () => {
        const clientGrid = document.getElementById('admin-clients-grid');
        if (!clientGrid) return;

        clientGrid.innerHTML = clients.map(c => `
            <div class="creative-card">
                <div class="creative-body">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin-bottom:12px;">
                        <h3 style="font-size:1.2rem; font-weight:800;">${c.company}</h3>
                        <span class="status-badge ${c.status === 'active' ? 'paid' : 'pending'}">${c.status.toUpperCase()}</span>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:8px; font-size:0.9rem;">
                        <div style="display:flex; justify-content:space-between;"><span>Allocated Budget:</span><strong>$${c.budget.toLocaleString()}</strong></div>
                        <div style="display:flex; justify-content:space-between;"><span>Active Spend:</span><strong>$${c.spend.toLocaleString()}</strong></div>
                        <div style="display:flex; justify-content:space-between;"><span>Client Manager:</span><span>${c.manager}</span></div>
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span>Onboarding:</span>
                            <div style="flex-grow:0.5; height:6px; background-color:var(--bg-color); border-radius:4px; overflow:hidden;">
                                <div style="height:100%; width:${c.status === 'active' ? '100%' : '40%'}; background-color:var(--success);"></div>
                            </div>
                        </div>
                    </div>
                    <div style="display:flex; gap:10px; margin-top:20px; border-top:1px solid var(--border-color); padding-top:16px;">
                        <button class="btn btn-primary btn-sm budget-increase-btn" data-id="${c.id}" style="flex:1;">+ $1k Budget</button>
                        <button class="btn btn-secondary btn-sm client-status-btn" data-id="${c.id}" style="flex:1.2;">Toggle Status</button>
                    </div>
                </div>
            </div>
        `).join('');

        clientGrid.querySelectorAll('.budget-increase-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                const client = clients.find(item => item.id === id);
                if (client) {
                    client.budget += 1000;
                    saveState('admin_clients', clients);
                    renderClientsGrid();
                }
            });
        });

        clientGrid.querySelectorAll('.client-status-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                const client = clients.find(item => item.id === id);
                if (client) {
                    client.status = client.status === 'active' ? 'onboarding' : 'active';
                    saveState('admin_clients', clients);
                    renderClientsGrid();
                }
            });
        });
    };

    renderClientsGrid();

    // ==========================================
    // MODULE 3: AUDITS & LEADS WIZARDS
    // ==========================================
    const renderAuditsTable = () => {
        const feed = document.getElementById('admin-audits-timeline') || document.getElementById('admin-audits-table-body');
        if (!feed) return;

        if (feed.tagName.toLowerCase() === 'tbody') {
            feed.innerHTML = audits.map(a => `
                <tr>
                    <td style="font-weight:600;">${a.id}</td>
                    <td><strong>${a.domain}</strong></td>
                    <td>${a.email}</td>
                    <td>${a.service}</td>
                    <td><strong style="color:var(--primary);">${a.score > 0 ? a.score + '/100' : 'PENDING'}</strong></td>
                    <td><span class="status-badge ${a.status === 'completed' ? 'paid' : 'pending'}">${a.status.toUpperCase()}</span></td>
                    <td>
                        ${a.status === 'pending' ? `
                            <button class="btn btn-primary btn-sm run-audit-calc" data-id="${a.id}">Run Audit Analysis</button>
                        ` : `<span style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">Report Sent</span>`}
                    </td>
                </tr>
            `).join('');
        } else {
            feed.innerHTML = audits.map(a => `
                <div class="timeline-item" style="border-left: 4px solid ${a.status === 'completed' ? 'var(--primary)' : 'var(--warning)'}; border-radius: var(--radius-md);">
                    <div class="timeline-icon" style="background-color: ${a.status === 'completed' ? 'var(--primary)' : 'var(--warning)'}; border:none; box-shadow:none;">${a.status === 'completed' ? '<i class="ph ph-chart-bar"></i>' : '<i class="ph ph-clock"></i>'}</div>
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <div>
                            <h3 style="font-size:1.1rem; margin-bottom:4px;">${a.domain}</h3>
                            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">Contact: <a href="mailto:${a.email}" style="color:var(--text-color); text-decoration:none;">${a.email}</a> • Service: ${a.service}</p>
                        </div>
                        <div style="text-align:right;">
                            <span class="status-badge ${a.status === 'completed' ? 'paid' : 'pending'}" style="margin-bottom:6px;">${a.status.toUpperCase()}</span>
                            <div style="font-size:1.25rem; font-weight:800; color:var(--primary);">${a.score > 0 ? a.score + '<span style="font-size:0.8rem; color:var(--text-muted);">/100</span>' : 'TBD'}</div>
                        </div>
                    </div>
                    <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:10px;">
                        ${a.status === 'pending' ? `
                            <button class="btn btn-primary btn-sm run-audit-calc" data-id="${a.id}">Run Audit Analysis</button>
                        ` : `<span style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">Report Sent</span>`}
                    </div>
                </div>
            `).join('');
        }

        feed.querySelectorAll('.run-audit-calc').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                const audit = audits.find(item => item.id === id);
                if (audit) {
                    audit.score = Math.floor(Math.random() * 20) + 68; // Random score 68-88
                    audit.status = "completed";
                    saveState('admin_audits', audits);
                    renderAuditsTable();
                    alert(`Audit score of ${audit.score}/100 has been calculated and sent to ${audit.email}!`);
                }
            });
        });
    };

    renderAuditsTable();

    // ==========================================
    // MODULE 4: INVOICES & BILLING CONSOLE
    // ==========================================
    const renderInvoicesTable = () => {
        const feed = document.getElementById('admin-invoices-timeline') || document.getElementById('admin-invoices-table-body');
        if (!feed) return;

        if (feed.tagName.toLowerCase() === 'tbody') {
            feed.innerHTML = invoices.map(inv => `
                <tr>
                    <td style="font-weight:600;">${inv.id}</td>
                    <td>${inv.description}</td>
                    <td style="font-weight:700;">$${inv.amount.toLocaleString()}</td>
                    <td>${inv.due}</td>
                    <td><span class="status-badge ${inv.status}">${inv.status.toUpperCase()}</span></td>
                    <td>
                        <button class="btn btn-secondary btn-sm toggle-payment-btn" data-id="${inv.id}">Toggle Status</button>
                    </td>
                </tr>
            `).join('');
        } else {
            feed.innerHTML = invoices.map(inv => `
                <div class="timeline-item" style="border-left: 4px solid ${inv.status === 'paid' ? 'var(--success)' : 'var(--warning)'}; border-radius: var(--radius-md);">
                    <div class="timeline-icon" style="background-color: ${inv.status === 'paid' ? 'var(--success)' : 'var(--warning)'}; border:none; box-shadow:none;">${inv.status === 'paid' ? '<i class="ph ph-check"></i>' : '<i class="ph ph-warning"></i>'}</div>
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <div>
                            <h3 style="font-size:1.1rem; margin-bottom:4px;">${inv.description}</h3>
                            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">Invoice ID: ${inv.id} • Due: ${inv.due}</p>
                        </div>
                        <span style="font-size:1.25rem; font-weight:800; color:var(--text-color);">$${inv.amount.toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                        <span class="status-badge ${inv.status}">${inv.status.toUpperCase()}</span>
                        <button class="btn btn-secondary btn-sm toggle-payment-btn" data-id="${inv.id}">Toggle Status</button>
                    </div>
                </div>
            `).join('');
        }

        feed.querySelectorAll('.toggle-payment-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const inv = invoices.find(i => i.id === id);
                if (inv) {
                    inv.status = inv.status === 'paid' ? 'pending' : 'paid';
                    saveState('agency_invoices', invoices);
                    renderInvoicesTable();
                }
            });
        });
    };

    const addInvoiceForm = document.getElementById('admin-add-invoice-form');
    if (addInvoiceForm) {
        addInvoiceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const desc = document.getElementById('invoice-desc').value;
            const amount = parseInt(document.getElementById('invoice-amount').value);
            const due = document.getElementById('invoice-due').value;

            const newInv = {
                id: "INV-2026-00" + (invoices.length + 3),
                description: desc,
                amount: amount,
                date: new Date().toISOString().split('T')[0],
                due: due,
                status: "pending"
            };

            invoices.push(newInv);
            saveState('agency_invoices', invoices);
            renderInvoicesTable();
            addInvoiceForm.reset();
            alert("New invoice issued successfully!");
        });
    }

    renderInvoicesTable();

    // ==========================================
    // MODULE 5: CONTENT & BLOG PUBLISHER
    // ==========================================
    const renderBlogsTable = () => {
        const tableBody = document.getElementById('admin-blogs-table-body');
        if (!tableBody) return;

        if (tableBody.tagName.toLowerCase() === 'tbody') {
            tableBody.innerHTML = blogs.map(b => `
                <tr>
                    <td style="font-weight:600;">${b.id}</td>
                    <td><strong>${b.title}</strong></td>
                    <td>${b.category}</td>
                    <td>${b.date}</td>
                    <td><span class="status-badge paid" style="background-color:rgba(16,185,129,0.15); color:var(--success);">${b.status.toUpperCase()}</span></td>
                    <td>
                        <button class="btn btn-secondary btn-sm delete-blog-btn" data-id="${b.id}">Delete</button>
                    </td>
                </tr>
            `).join('');
        } else {
            tableBody.innerHTML = blogs.map(b => `
                <div class="kanban-card" id="blog-${b.id}">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                        <span class="status-badge" style="background-color:rgba(147,51,234,0.1); color:#9333ea; font-size:0.75rem;">${b.category}</span>
                        <span style="font-size:0.75rem; color:var(--text-muted);">${b.date}</span>
                    </div>
                    <h3 style="font-size:1.05rem; margin-bottom:16px;">${b.title}</h3>
                    <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:12px;">
                        <span class="status-badge paid" style="background-color:rgba(16,185,129,0.1); color:var(--success);">LIVE</span>
                        <button class="btn btn-secondary btn-sm delete-blog-btn" data-id="${b.id}" style="padding: 4px 8px; border-color:var(--danger); color:var(--danger); font-size:0.75rem;">Delete</button>
                    </div>
                </div>
            `).join('');
        }

        tableBody.querySelectorAll('.delete-blog-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                if (confirm(`Are you sure you want to delete blog ID ${id}?`)) {
                    blogs = blogs.filter(b => b.id !== id);
                    saveState('agency_blogs', blogs);
                    renderBlogsTable();
                }
            });
        });
    };

    const addBlogForm = document.getElementById('admin-add-blog-form');
    if (addBlogForm) {
        addBlogForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('blog-title-input').value;
            const category = document.getElementById('blog-category-input').value;

            const newBlog = {
                id: blogs.length + 1,
                title: title,
                category: category,
                date: new Date().toISOString().split('T')[0],
                status: "published"
            };

            blogs.push(newBlog);
            saveState('agency_blogs', blogs);
            renderBlogsTable();
            addBlogForm.reset();
            alert("Blog post published successfully!");
        });
    }

    renderBlogsTable();

    // ==========================================
    // GENERAL SETTINGS & METRICS DEMO CHARTS
    // ==========================================
    const drawAdminCharts = () => {
        const chartElement = document.getElementById('admin-trend-chart');
        if (!chartElement) return;

        const spendData = [5000, 6800, 7200, 8400, 11000, 12400];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

        const width = chartElement.clientWidth || 800;
        const height = 250;
        const padding = 40;

        const maxSpend = Math.max(...spendData) * 1.1;

        const mapX = (idx) => padding + (idx * (width - 2 * padding) / (spendData.length - 1));
        const mapY = (val) => height - padding - (val * (height - 2 * padding) / maxSpend);

        let spendPath = `M ${mapX(0)} ${mapY(spendData[0])}`;
        let spendArea = `M ${mapX(0)} ${height - padding} L ${mapX(0)} ${mapY(spendData[0])}`;

        for (let i = 1; i < spendData.length; i++) {
            spendPath += ` L ${mapX(i)} ${mapY(spendData[i])}`;
            spendArea += ` L ${mapX(i)} ${mapY(spendData[i])}`;
        }
        spendArea += ` L ${mapX(spendData.length - 1)} ${height - padding} Z`;

        let grids = '';
        for (let j = 0; j < 4; j++) {
            const y = padding + (j * (height - 2 * padding) / 3);
            grids += `<line class="chart-grid-line" x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="var(--border-color)" stroke-dasharray="4" />`;
        }

        let labels = '';
        months.forEach((m, i) => {
            labels += `<text x="${mapX(i)}" y="${height - 10}" text-anchor="middle" fill="var(--text-muted)" font-size="12">${m}</text>`;
        });

        chartElement.innerHTML = `
            <svg width="${width}" height="${height}" style="overflow:visible;">
                <defs>
                    <linearGradient id="admin-glow-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#9333ea" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="#9333ea" stop-opacity="0"/>
                    </linearGradient>
                </defs>
                ${grids}
                <path d="${spendArea}" fill="url(#admin-glow-grad)" />
                <path d="${spendPath}" fill="none" stroke="#9333ea" stroke-width="3" stroke-linecap="round" />
                ${spendData.map((val, i) => `<circle cx="${mapX(i)}" cy="${mapY(val)}" r="4" fill="#9333ea" stroke="#ffffff" stroke-width="2" />`).join('')}
                ${labels}
            </svg>
        `;
    };

    window.addEventListener('resize', drawAdminCharts);
    drawAdminCharts();
});
