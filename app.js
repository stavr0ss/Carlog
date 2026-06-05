// ==========================================================================
// Porsche 911 (996) Maintenance Dashboard Logic
// ==========================================================================

// Default High-Fidelity Demo Data
const DEFAULT_RECORDS = [
    {
        id: "rec-1",
        title: "Purchase Inspection & Oil Service",
        date: "2022-04-10",
        mileage: 60100,
        cost: 180.00,
        category: "General",
        parts: "Mobil 1 FS 0W-40, Mahle Oil Filter, Crush Washer",
        notes: "Pre-purchase inspection checklist passed. Clean cylinder bores verified via scoping. Oil changed, oil filter inspected for any metal flakes (none found). Replaced sump plug crush washer."
    },
    {
        id: "rec-2",
        title: "IMS Bearing Retrofit & Rear Main Seal (RMS) Upgrade",
        date: "2022-08-15",
        mileage: 62450,
        cost: 1650.00,
        category: "Preventive",
        parts: "LN Engineering Single-Row Ceramic Retrofit Kit, Genuine Porsche PTFE RMS",
        notes: "Proactive upgrade of the IMS bearing using LN Engineering Ceramic kit. Factory single-row bearing showed minor seals wear but was still intact. Replaced Rear Main Seal (weeping slightly) with updated PTFE seal. Clutch plate thickness measured (7.8mm, good), reassembled."
    },
    {
        id: "rec-3",
        title: "Front Radiators Cleanout & Coolant Flush",
        date: "2023-01-20",
        mileage: 65200,
        cost: 120.00,
        category: "General",
        parts: "Porsche OAT Coolant, Cable Ties",
        notes: "Removed front bumper cover. Cleared substantial build-up of leaves, road grit, and organic debris trapped between the A/C condensers and radiators. Cleaned corroded radiator lower channels. Flushed cooling system with fresh OEM Porsche Pink coolant."
    },
    {
        id: "rec-4",
        title: "Front & Rear Brake Discs, Pads, and Fluid Flush",
        date: "2023-07-14",
        mileage: 70800,
        cost: 520.00,
        category: "Brakes",
        parts: "Textar Brake Pads, Sebro Brake Discs, Wear Sensors, Motul RBF 600 Brake Fluid",
        notes: "Replaced front and rear brake pads and discs. Sebro cross-drilled rotors installed. New caliper damping plates and wear indicator cables. Flushed brake hydraulic system with high-temperature Motul RBF 600 fluid."
    },
    {
        id: "rec-5",
        title: "Pierburg Water Pump & LN Low-Temp Thermostat (160°F)",
        date: "2024-03-05",
        mileage: 74120,
        cost: 480.00,
        category: "Preventive",
        parts: "Pierburg Composite Impeller Water Pump, LN Engineering 160°F / 71°C Thermostat",
        notes: "Proactively replaced water pump to prevent plastic impeller blades fatigue. Installed LN Engineering low-temperature thermostat to open cooling circuit early, reducing hot spots in cylinder banks 4-6. Refilled system using vacuum fill tool."
    },
    {
        id: "rec-6",
        title: "Major Service, Beru 997 Coils & Spark Plug Tubes",
        date: "2025-02-18",
        mileage: 81050,
        cost: 750.00,
        category: "Engine",
        parts: "Beru 997 Coils, NGK BKR6EK Spark Plugs, Plugs Tubes, Motul 8100 X-cess 5W-40, Filters",
        notes: "Replaced all 6 spark plugs. Noticed minor oil in plug wells, replaced all 6 plastic spark plug tubes and O-rings. Upgraded cracked factory coil packs to larger 997-spec Beru coil packs (longer bolts used). Changed oil to Motul 8100 X-cess 5W-40 (higher ZDDP). Replaced air, cabin, and fuel filters."
    },
    {
        id: "rec-7",
        title: "Gearbox Oil Service & Shift Cable Calibration",
        date: "2025-10-12",
        mileage: 84600,
        cost: 210.00,
        category: "Transmission",
        parts: "Mobil 1 PTX 75W-90 Gearbox Oil, New Drain/Fill Plugs",
        notes: "Drained 6-speed manual transaxle. Refilled with Mobil PTX 75W-90 oil (cured stiff shift when gearbox is cold). Adjusted shift linkage cables at the shifter box underneath the center console."
    },
    {
        id: "rec-8",
        title: "Suspension Refresh (TRW Coffin Arms & 4-Wheel Alignment)",
        date: "2026-04-02",
        mileage: 87450,
        cost: 890.00,
        category: "Suspension",
        parts: "TRW Lower Control Arms (Coffin Arms), Meyle HD Drop Links, Inner/Outer Tie Rods",
        notes: "Addressed squeaking/groaning front suspension. Replaced front lower control arms (coffin arms) and outer tie rod ends. Installed new front sway bar drop links. Performed a full Hunter 4-wheel laser alignment to factory specs. Handling is significantly sharpened."
    }
];

// App State
let serviceRecords = [];
let categoryChartInstance = null;
let trendChartInstance = null;

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
    loadData();
    initEventListeners();
    updateDashboard();
});

// Load records from local storage or use default
function loadData() {
    const stored = localStorage.getItem("porsche996_service_history");
    if (stored) {
        try {
            serviceRecords = JSON.parse(stored);
        } catch (e) {
            console.error("Error parsing stored service history, resetting to default.", e);
            serviceRecords = [...DEFAULT_RECORDS];
            saveData();
        }
    } else {
        serviceRecords = [...DEFAULT_RECORDS];
        saveData();
    }
}

// Save records to local storage
function saveData() {
    localStorage.setItem("porsche996_service_history", JSON.stringify(serviceRecords));
}

// State for confirmation action modal
let pendingConfirmAction = null;

function showConfirmModal(title, message, btnText, onConfirm) {
    document.getElementById("confirm-modal-title").innerHTML = title;
    document.getElementById("confirm-modal-message").innerHTML = message;
    
    const actionBtn = document.getElementById("btn-action-confirm");
    actionBtn.innerText = btnText;

    pendingConfirmAction = onConfirm;
    document.getElementById("confirm-modal").classList.add("open");
}

function closeConfirmModal() {
    document.getElementById("confirm-modal").classList.remove("open");
    pendingConfirmAction = null;
}

// Reset to Default Demo Data
function resetDemoData() {
    showConfirmModal(
        `<i class="fa-solid fa-triangle-exclamation"></i> Reset Dashboard Data`,
        `Are you sure you want to reset all service records to the default Porsche 996 maintenance timeline? This will erase all your custom logged entries.`,
        `Reset Demo Data`,
        () => {
            serviceRecords = [...DEFAULT_RECORDS];
            saveData();
            updateDashboard();
        }
    );
}

// Bind Event Listeners
function initEventListeners() {
    // Navigation
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            navItems.forEach(n => n.classList.remove("active"));
            item.classList.add("active");
        });
    });

    // Reset button
    document.getElementById("btn-reset-data").addEventListener("click", resetDemoData);

    // Search and Filters
    document.getElementById("log-search").addEventListener("input", filterAndRenderTimeline);
    document.getElementById("filter-category").addEventListener("change", filterAndRenderTimeline);
    document.getElementById("sort-order").addEventListener("change", filterAndRenderTimeline);

    // Modal Events
    const modal = document.getElementById("service-modal");
    const openBtn = document.getElementById("btn-open-form");
    const closeBtn = document.getElementById("btn-close-modal");
    const cancelBtn = document.getElementById("btn-cancel-form");
    const form = document.getElementById("service-form");

    openBtn.addEventListener("click", () => openServiceModal());
    closeBtn.addEventListener("click", () => closeServiceModal());
    cancelBtn.addEventListener("click", () => closeServiceModal());
    
    // Close modal on background click
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeServiceModal();
    });

    // Form Submit
    form.addEventListener("submit", handleFormSubmit);

    // Custom Confirm Modal Listeners
    const confirmModal = document.getElementById("confirm-modal");
    document.getElementById("btn-close-confirm").addEventListener("click", closeConfirmModal);
    document.getElementById("btn-cancel-confirm").addEventListener("click", closeConfirmModal);
    confirmModal.addEventListener("click", (e) => {
        if (e.target === confirmModal) closeConfirmModal();
    });

    document.getElementById("btn-action-confirm").addEventListener("click", () => {
        if (pendingConfirmAction) {
            pendingConfirmAction();
        }
        closeConfirmModal();
    });
}

// Dashboard Update orchestrator
function updateDashboard() {
    calculateStats();
    updateChecklist();
    filterAndRenderTimeline();
    renderCharts();
}

// Calculate KPI Cards
function calculateStats() {
    const totalCost = serviceRecords.reduce((sum, rec) => sum + rec.cost, 0);
    
    // Current Odometer: Default baseline is 88,200 mi, or the maximum service log mileage
    let currentMileage = 88200;
    if (serviceRecords.length > 0) {
        const maxServiceMileage = Math.max(...serviceRecords.map(r => r.mileage));
        currentMileage = Math.max(currentMileage, maxServiceMileage);
    }

    // Cost Per Mile calculation (Baseline purchase at 60,100 miles)
    const baseMileage = 60100;
    const trackedMiles = currentMileage - baseMileage;
    const costPerMile = trackedMiles > 0 ? (totalCost / trackedMiles) : 0;

    // Last service date & next oil service mileage
    let lastServiceDateText = "N/A";
    let nextServiceText = "5,000 mi";
    let healthStatus = "Excellent";
    let healthCardClass = "alert-status-green";

    if (serviceRecords.length > 0) {
        // Sort by date to get latest
        const sortedByDate = [...serviceRecords].sort((a, b) => new Date(b.date) - new Date(a.date));
        const latestRec = sortedByDate[0];
        lastServiceDateText = formatDate(latestRec.date);

        // Find last Engine oil service (Category: Engine/General containing "oil" in title or notes)
        const oilServices = serviceRecords.filter(r => 
            (r.category === "Engine" || r.category === "General") && 
            (r.title.toLowerCase().includes("oil") || r.notes.toLowerCase().includes("oil"))
        );

        if (oilServices.length > 0) {
            const lastOilService = oilServices.sort((a, b) => b.mileage - a.mileage)[0];
            const milesSinceOil = currentMileage - lastOilService.mileage;
            const milesRemaining = Math.max(0, 5000 - milesSinceOil);
            
            // Age of oil in months
            const lastOilDate = new Date(lastOilService.date);
            const today = new Date();
            const monthsSinceOil = (today.getFullYear() - lastOilDate.getFullYear()) * 12 + today.getMonth() - lastOilDate.getMonth();

            nextServiceText = `${milesRemaining.toLocaleString()} mi / ${Math.max(0, 12 - monthsSinceOil)} mos`;

            if (milesSinceOil > 5000 || monthsSinceOil > 12) {
                healthStatus = "Service Due";
                healthCardClass = "alert-status-red";
            } else if (milesSinceOil > 4000 || monthsSinceOil > 10) {
                healthStatus = "Service Soon";
                healthCardClass = "alert-status-yellow";
            } else {
                healthStatus = "Excellent";
                healthCardClass = "alert-status-green";
            }
        }
    }

    // Update UI elements
    document.getElementById("val-total-cost").innerText = `£${totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById("val-cost-per-mile").innerText = `£${costPerMile.toFixed(2)} / mile`;
    document.getElementById("val-mileage").innerText = `${currentMileage.toLocaleString()} mi`;
    document.getElementById("val-miles-tracked").innerText = `${trackedMiles.toLocaleString()} mi tracked`;
    document.getElementById("val-record-count").innerText = serviceRecords.length;
    document.getElementById("val-last-service-date").innerText = `Last service: ${lastServiceDateText}`;
    
    const statusCard = document.getElementById("card-status");
    statusCard.className = `stat-card ${healthCardClass}`;
    document.getElementById("val-health-status").innerText = healthStatus;
    document.getElementById("val-next-service-miles").innerText = `Next service: ${nextServiceText}`;
}

// Dynamic checklist based on records scan
function updateChecklist() {
    const checklists = [
        {
            id: "ims",
            keywords: ["ims", "intermediate shaft"],
            chkId: "chk-ims",
            badgeId: "badge-ims",
            metaId: "meta-ims"
        },
        {
            id: "rms",
            keywords: ["rms", "rear main seal"],
            chkId: "chk-rms",
            badgeId: "badge-rms",
            metaId: "meta-rms"
        },
        {
            id: "waterpump",
            keywords: ["water pump", "waterpump", "thermostat"],
            chkId: "chk-waterpump",
            badgeId: "badge-waterpump",
            metaId: "meta-waterpump"
        },
        {
            id: "aos",
            keywords: ["aos", "air oil separator", "air-oil"],
            chkId: "chk-aos",
            badgeId: "badge-aos",
            metaId: "meta-aos"
        },
        {
            id: "coils",
            keywords: ["coil pack", "coils", "spark plug tube"],
            chkId: "chk-coils",
            badgeId: "badge-coils",
            metaId: "meta-coils"
        }
    ];

    checklists.forEach(item => {
        // Search records for matching keywords
        const matches = serviceRecords.filter(r => 
            item.keywords.some(kw => 
                r.title.toLowerCase().includes(kw) || 
                r.notes.toLowerCase().includes(kw) || 
                r.parts.toLowerCase().includes(kw)
            )
        );

        const chkBox = document.getElementById(item.chkId);
        const badge = document.getElementById(item.badgeId);
        const meta = document.getElementById(item.metaId);
        const cardItem = document.getElementById(`item-${item.id}`);

        if (matches.length > 0) {
            // Found service record matching the upgrade
            const newestMatch = matches.sort((a, b) => b.mileage - a.mileage)[0];
            chkBox.checked = true;
            badge.innerText = "Done";
            badge.className = "status-badge badge-green";
            meta.innerText = `Completed @ ${newestMatch.mileage.toLocaleString()} mi (${formatDate(newestMatch.date)})`;
            cardItem.className = "checklist-item completed";
        } else {
            // Not completed
            chkBox.checked = false;
            badge.innerText = "Pending";
            badge.className = "status-badge badge-yellow";
            meta.innerText = "Last changed: Unknown";
            cardItem.className = "checklist-item pending";
        }
    });
}

// Filter, Sort, and Render Service Timeline
function filterAndRenderTimeline() {
    const searchQuery = document.getElementById("log-search").value.toLowerCase();
    const selectedCategory = document.getElementById("filter-category").value;
    const sortOrder = document.getElementById("sort-order").value;
    
    // Filter
    let filtered = serviceRecords.filter(rec => {
        const matchesSearch = 
            rec.title.toLowerCase().includes(searchQuery) ||
            rec.notes.toLowerCase().includes(searchQuery) ||
            rec.parts.toLowerCase().includes(searchQuery);
            
        const matchesCategory = selectedCategory === "all" || rec.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    // Sort
    filtered.sort((a, b) => {
        if (sortOrder === "date-desc") return new Date(b.date) - new Date(a.date);
        if (sortOrder === "date-asc") return new Date(a.date) - new Date(b.date);
        if (sortOrder === "cost-desc") return b.cost - a.cost;
        if (sortOrder === "mileage-desc") return b.mileage - a.mileage;
        return 0;
    });

    // Render HTML
    const timelineContainer = document.getElementById("timeline-list");
    timelineContainer.innerHTML = "";

    if (filtered.length === 0) {
        timelineContainer.innerHTML = `
            <div class="timeline-empty-state">
                <i class="fa-solid fa-folder-open"></i>
                <p>No matching service records found.</p>
            </div>
        `;
        return;
    }

    filtered.forEach((rec, idx) => {
        const itemEl = document.createElement("div");
        itemEl.className = "timeline-item";
        itemEl.style.animationDelay = `${idx * 0.05}s`;

        const categoryClass = rec.category.toLowerCase();
        const dateFormatted = formatDate(rec.date);

        // Sub-elements for parts
        let partsHTML = "";
        if (rec.parts && rec.parts.trim() !== "") {
            const partsList = rec.parts.split(",").map(p => p.trim());
            partsHTML = `
                <div class="card-parts">
                    <span class="parts-label">Parts:</span>
                    ${partsList.map(part => `<span class="part-tag">${part}</span>`).join("")}
                </div>
            `;
        }

        itemEl.innerHTML = `
            <div class="timeline-dot dot-${categoryClass}"><i class="fa-solid ${getCategoryIcon(rec.category)}"></i></div>
            <div class="timeline-card">
                <div class="card-top">
                    <div class="card-title-group">
                        <span class="badge badge-${categoryClass}">${rec.category}</span>
                        <h4>${rec.title}</h4>
                        <div class="card-meta">
                            <span><i class="fa-regular fa-calendar"></i> ${dateFormatted}</span>
                            <span><i class="fa-solid fa-gauge-high"></i> ${rec.mileage.toLocaleString()} mi</span>
                        </div>
                    </div>
                    <div class="card-cost">£${rec.cost.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                </div>
                <p class="card-notes">${rec.notes}</p>
                ${partsHTML}
                <div class="card-actions">
                    <button class="action-btn action-edit" onclick="editRecord('${rec.id}')"><i class="fa-regular fa-pen-to-square"></i> Edit</button>
                    <button class="action-btn action-delete" onclick="deleteRecord('${rec.id}')"><i class="fa-regular fa-trash-can"></i> Delete</button>
                </div>
            </div>
        `;
        timelineContainer.appendChild(itemEl);
    });
}

// Helper: Form Category Icon
function getCategoryIcon(cat) {
    switch(cat) {
        case "Engine": return "fa-oil-can";
        case "Transmission": return "fa-gears";
        case "Suspension": return "fa-bezier-curve";
        case "Brakes": return "fa-circle-dot";
        case "Preventive": return "fa-shield-halved";
        default: return "fa-screwdriver-wrench";
    }
}

// Helper: Format Date
function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-GB', options);
}

// Chart Renderings
function renderCharts() {
    // 1. Cost Allocation by Category (Doughnut Chart)
    const categories = ["Engine", "Transmission", "Suspension", "Brakes", "Preventive", "General"];
    const categoryTotals = categories.map(cat => {
        return serviceRecords
            .filter(r => r.category === cat)
            .reduce((sum, r) => sum + r.cost, 0);
    });

    // Theme Colors corresponding to Badges
    const categoryColors = [
        "rgba(239, 68, 68, 0.7)",   // Engine (Red)
        "rgba(139, 92, 246, 0.7)",  // Transmission (Purple)
        "rgba(59, 130, 246, 0.7)",   // Suspension (Blue)
        "rgba(245, 158, 11, 0.7)",   // Brakes (Amber)
        "rgba(16, 185, 129, 0.7)",   // Preventive (Emerald)
        "rgba(107, 114, 128, 0.7)"   // General (Grey)
    ];

    const categoryBorderColors = [
        "#ef4444", "#8b5cf6", "#3b82f6", "#f59e0b", "#10b981", "#6b7280"
    ];

    const ctxCat = document.getElementById("categoryChart").getContext("2d");
    
    if (categoryChartInstance) {
        categoryChartInstance.destroy();
    }

    categoryChartInstance = new Chart(ctxCat, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                data: categoryTotals,
                backgroundColor: categoryColors,
                borderColor: categoryBorderColors,
                borderWidth: 1.5,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#9ca3af',
                        font: {
                            family: 'Outfit',
                            size: 11
                        },
                        padding: 12,
                        boxWidth: 12
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let val = context.raw || 0;
                            return ` £${val.toLocaleString(undefined, {maximumFractionDigits: 2})}`;
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });

    // 2. Cumulative Spend Timeline (Line Chart)
    // Sort oldest first
    const chronRecords = [...serviceRecords].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let cumulative = 0;
    const chartData = chronRecords.map(r => {
        cumulative += r.cost;
        return {
            x: new Date(r.date),
            y: cumulative,
            mileage: r.mileage,
            title: r.title
        };
    });

    const ctxTrend = document.getElementById("trendChart").getContext("2d");

    if (trendChartInstance) {
        trendChartInstance.destroy();
    }

    // Gradient fill for area chart
    const gradient = ctxTrend.createLinearGradient(0, 0, 0, 240);
    gradient.addColorStop(0, 'rgba(225, 6, 0, 0.25)');
    gradient.addColorStop(1, 'rgba(225, 6, 0, 0.00)');

    trendChartInstance = new Chart(ctxTrend, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Cumulative Cost',
                data: chartData,
                borderColor: '#e10600',
                borderWidth: 2,
                fill: true,
                backgroundColor: gradient,
                tension: 0.25,
                pointBackgroundColor: '#e10600',
                pointBorderColor: '#0d0f12',
                pointBorderWidth: 1,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        parser: 'yyyy-MM-dd',
                        unit: 'month',
                        displayFormats: {
                            month: 'MMM yyyy'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.03)'
                    },
                    ticks: {
                        color: '#6b7280',
                        font: {
                            family: 'Outfit',
                            size: 10
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.03)'
                    },
                    ticks: {
                        color: '#6b7280',
                        font: {
                            family: 'Outfit',
                            size: 10
                        },
                        callback: function(value) {
                            return '£' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            const dataPoint = context[0].raw;
                            return `${formatDate(dataPoint.x)} @ ${dataPoint.mileage.toLocaleString()} mi`;
                        },
                        label: function(context) {
                            const dataPoint = context.raw;
                            return `Cumulative: £${dataPoint.y.toLocaleString(undefined, {maximumFractionDigits: 2})}`;
                        },
                        afterLabel: function(context) {
                            return `Service: ${context.raw.title}`;
                        }
                    }
                }
            }
        }
    });
}

// Modal Form Operations
function openServiceModal(recordId = null) {
    const modal = document.getElementById("service-modal");
    const form = document.getElementById("service-form");
    const titleEl = document.getElementById("modal-title");
    
    form.reset();
    document.getElementById("form-record-id").value = "";

    if (recordId) {
        // Edit mode
        const rec = serviceRecords.find(r => r.id === recordId);
        if (rec) {
            titleEl.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Service Event`;
            document.getElementById("form-record-id").value = rec.id;
            document.getElementById("form-title").value = rec.title;
            document.getElementById("form-date").value = rec.date;
            document.getElementById("form-mileage").value = rec.mileage;
            document.getElementById("form-cost").value = rec.cost;
            document.getElementById("form-category").value = rec.category;
            document.getElementById("form-parts").value = rec.parts || "";
            document.getElementById("form-notes").value = rec.notes || "";
        }
    } else {
        // Create mode
        titleEl.innerHTML = `<i class="fa-solid fa-plus-circle"></i> Log Service Event`;
        // Pre-fill date with today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById("form-date").value = today;
        
        // Pre-fill mileage with current estimation
        let currentMileage = 88200;
        if (serviceRecords.length > 0) {
            currentMileage = Math.max(currentMileage, ...serviceRecords.map(r => r.mileage));
        }
        document.getElementById("form-mileage").value = currentMileage;
    }

    modal.classList.add("open");
}

function closeServiceModal() {
    const modal = document.getElementById("service-modal");
    modal.classList.remove("open");
}

// Handle Form Submission (Add/Edit)
function handleFormSubmit(e) {
    e.preventDefault();

    const recordId = document.getElementById("form-record-id").value;
    const title = document.getElementById("form-title").value;
    const date = document.getElementById("form-date").value;
    const mileage = parseInt(document.getElementById("form-mileage").value);
    const cost = parseFloat(document.getElementById("form-cost").value);
    const category = document.getElementById("form-category").value;
    const parts = document.getElementById("form-parts").value;
    const notes = document.getElementById("form-notes").value;

    if (recordId) {
        // Update
        const idx = serviceRecords.findIndex(r => r.id === recordId);
        if (idx !== -1) {
            serviceRecords[idx] = {
                id: recordId,
                title, date, mileage, cost, category, parts, notes
            };
        }
    } else {
        // Create
        const newRecord = {
            id: 'rec-' + Date.now(),
            title, date, mileage, cost, category, parts, notes
        };
        serviceRecords.push(newRecord);
    }

    saveData();
    closeServiceModal();
    updateDashboard();
}

// Global actions exposed for onclick attributes in dynamically rendered elements
window.editRecord = function(id) {
    openServiceModal(id);
};

window.deleteRecord = function(id) {
    const record = serviceRecords.find(r => r.id === id);
    const titleText = record ? `"${record.title}"` : "this record";
    showConfirmModal(
        `<i class="fa-solid fa-trash-can"></i> Delete Service Record`,
        `Are you sure you want to delete the service record for <strong>${titleText}</strong>? This action cannot be undone.`,
        `Delete Record`,
        () => {
            serviceRecords = serviceRecords.filter(r => r.id !== id);
            saveData();
            updateDashboard();
        }
    );
};

// Chart.js script loader fallback for Time scale
// We need the chartjs-adapter-date-fns adapter or similar for date handling.
// Let's inject the date-fns adapter dynamically.
const scriptAdapter = document.createElement('script');
scriptAdapter.src = "https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js";
document.head.appendChild(scriptAdapter);
scriptAdapter.onload = () => {
    // Re-render chart if loaded after rendering attempt
    if (serviceRecords.length > 0) {
        renderCharts();
    }
};
