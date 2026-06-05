// ==========================================================================
// Porsche 911 (996) Maintenance Dashboard Logic
// ==========================================================================

// Default Porsche 911 (996) Real Log Book Records
const DEFAULT_RECORDS = [
    {
        id: "rec_1",
        title: "2x Dunlop Tyres",
        date: "2009-03-14",
        mileage: 60588,
        cost: 357.0,
        category: "General",
        parts: "",
        notes: "Workshop: tyreshops"
    },
    {
        id: "rec_2",
        title: "Expansion tank",
        date: "2009-04-08",
        mileage: 60793,
        cost: 100.96,
        category: "General",
        parts: "Door mirror glass, Expansion tank cap",
        notes: "Workshop: euro car parts. Breakdown: Expansion tank: £75.77, Door mirror glass: £14.75, Expansion tank cap: £10.44"
    },
    {
        id: "rec_3",
        title: "Arm",
        date: "2010-06-25",
        mileage: 66478,
        cost: 235.59,
        category: "Suspension",
        parts: "Nute and bolts",
        notes: "Workshop: Northway. Breakdown: Arm: £193.88, Nute and bolts: £41.71"
    },
    {
        id: "rec_4",
        title: "Maj Service",
        date: "2010-10-06",
        mileage: 68528,
        cost: 668.85,
        category: "Brakes",
        parts: "Brake Fluid, Rear Brake Pads",
        notes: "Workshop: Unknown"
    },
    {
        id: "rec_5",
        title: "Oil pressure sender",
        date: "2011-07-05",
        mileage: 73175,
        cost: 81.35,
        category: "Engine",
        parts: "",
        notes: "Workshop: Northway"
    },
    {
        id: "rec_6",
        title: "Minor service",
        date: "2011-10-19",
        mileage: 74848,
        cost: 549.55,
        category: "Engine",
        parts: "wiper blades, air mass sensor, oil filter , pollen filter",
        notes: "Workshop: Northway"
    },
    {
        id: "rec_7",
        title: "O/S number plate assembly",
        date: "2011-11-08",
        mileage: 75164,
        cost: 150.0,
        category: "General",
        parts: "Number plate light assembly, n/s/f wing",
        notes: "Workshop: swindon tehcnial services (swan hill garage)"
    },
    {
        id: "rec_8",
        title: "Clutch repair",
        date: "2012-05-11",
        mileage: 76914,
        cost: 751.58,
        category: "Transmission",
        parts: "",
        notes: "Workshop: Northway"
    },
    {
        id: "rec_9",
        title: "Radiator",
        date: "2012-12-15",
        mileage: 78424,
        cost: 417.05,
        category: "Engine",
        parts: "coolant, clips",
        notes: "Workshop: Northway"
    },
    {
        id: "rec_10",
        title: "Major service",
        date: "2015-07-14",
        mileage: 86900,
        cost: 426.0,
        category: "Engine",
        parts: "Oil filter, Pollen filter, air filter, fuel filter, spark plugs, sump washer, screen wash, poly belt change",
        notes: "Workshop: Northway. Breakdown: Major service: £40.50, poly belt change: £385.50"
    },
    {
        id: "rec_11",
        title: "Major Service",
        date: "2020-11-20",
        mileage: 87510,
        cost: 0.0,
        category: "Brakes",
        parts: "Bosche 80 A/H battery, Spark plug change, n/s/r brake line, New A/C condensors, A/C recharge, 4x tyres , Exhaust fixings, Drive belt replacement, (all done as pre-purchase)",
        notes: "Workshop: Northway"
    },
    {
        id: "rec_12",
        title: "Oil change",
        date: "2021-11-20",
        mileage: 87634,
        cost: 233.99,
        category: "Engine",
        parts: "Mobil 1 0x40, Oil filter, Carplay Head Unit, Seat Update (Drivers)",
        notes: "Workshop: Home. Breakdown: Mobil 1 0x40: £48.99, Seat Update (Drivers): £185.00"
    },
    {
        id: "rec_13",
        title: "Billet gas pedal hinge",
        date: "2022-04-11",
        mileage: 87683,
        cost: 603.04,
        category: "Suspension",
        parts: "Wheel bolt x2, Column stalk unit, stalk cap, Seat Update (Passengers)",
        notes: "Workshop: Home. Breakdown: Billet gas pedal hinge: £75.65, Wheel bolt x2: £3.33, Column stalk unit: £293.68, stalk cap: £5.38, Seat Update (Passengers): £225.00"
    },
    {
        id: "rec_14",
        title: "Oil seperator",
        date: "2022-06-17",
        mileage: 87705,
        cost: 755.79,
        category: "Engine",
        parts: "spark plugs, Coils, Rear Main Oil seal",
        notes: "Workshop: Norhway. Breakdown: Oil seperator: £69.11, spark plugs: £34.92, Coils: £192.00, Rear Main Oil seal: £459.76"
    },
    {
        id: "rec_15",
        title: "Key Head replacement x2",
        date: "2022-08-31",
        mileage: 87731,
        cost: 765.32,
        category: "General",
        parts: "Key Head units, Engine mounts x2",
        notes: "Workshop: OPC Porstmouth. Breakdown: Key Head replacement x2: £102.00, Key Head units: £292.32, Engine mounts x2: £371.00"
    },
    {
        id: "rec_16",
        title: "Minor Service",
        date: "2022-11-11",
        mileage: 87756,
        cost: 1217.54,
        category: "Suspension",
        parts: "Front Lower Arm, Column Stalk Install, Engine Mounts Fitment, Cruise control Activation, Alarm Diagnosis",
        notes: "Workshop: Northway. Breakdown: Minor Service: £46.50, Alarm Diagnosis: £1171.04"
    },
    {
        id: "rec_17",
        title: "Anti roll bar drop link",
        date: "2022-11-20",
        mileage: 87759,
        cost: 130.38,
        category: "Suspension",
        parts: "",
        notes: "Workshop: elkin motors"
    },
    {
        id: "rec_18",
        title: "Failed water pump",
        date: "2023-01-13",
        mileage: 87777,
        cost: 999.47,
        category: "Engine",
        parts: "",
        notes: "Workshop: OPC Portsmouth"
    },
    {
        id: "rec_19",
        title: "AOS",
        date: "2023-08-22",
        mileage: 87853,
        cost: 1105.75,
        category: "Engine",
        parts: "RMS, oil filler neck, o ring",
        notes: "Workshop: Northway. Breakdown: AOS: £1005.13, RMS: £25.55, oil filler neck: £70.52, o ring: £4.55"
    },
    {
        id: "rec_20",
        title: "Full suspension refresh",
        date: "2024-08-19",
        mileage: 87976,
        cost: 7917.37,
        category: "Suspension",
        parts: "Left Radiator, Right Radiator, Coolant, Radiator breather hose Left, Radiator Breather Host Right",
        notes: "Workshop: Northway. Breakdown: Full suspension refresh: £7572.35, Left Radiator: £113.42, Right Radiator: £113.41, Coolant: £70.10, Radiator breather hose Left: £15.70, Radiator Breather Host Right: £32.39"
    },
    {
        id: "rec_21",
        title: "Full geo setup",
        date: "2025-09-08",
        mileage: 88108,
        cost: 500.0,
        category: "Suspension",
        parts: "Rear tyres",
        notes: "Workshop: Centre gravity"
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
            console.error("Error parsing stored service history, resetting to empty.", e);
            serviceRecords = [];
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

// Sidebar dynamic action: Clear Data or Load Log Book Data
function handleSidebarAction() {
    if (serviceRecords.length === 0) {
        showConfirmModal(
            `<i class="fa-solid fa-circle-info"></i> Load Log Book Data`,
            `Do you want to populate the dashboard with the Porsche 911 (996) maintenance log book records from X82HLDLogBook.xlsx?`,
            `Load Log Book`,
            () => {
                serviceRecords = [...DEFAULT_RECORDS];
                saveData();
                updateDashboard();
            }
        );
    } else {
        showConfirmModal(
            `<i class="fa-solid fa-triangle-exclamation"></i> Clear Dashboard Data`,
            `Are you sure you want to delete all service records? This will permanently erase all your logged entries.`,
            `Clear All Data`,
            () => {
                serviceRecords = [];
                saveData();
                updateDashboard();
            }
        );
    }
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
    document.getElementById("btn-reset-data").addEventListener("click", handleSidebarAction);

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
    updateSidebarButton();
}

// Update Sidebar Action Button
function updateSidebarButton() {
    const btn = document.getElementById("btn-reset-data");
    if (!btn) return;
    if (serviceRecords.length === 0) {
        btn.innerHTML = `<i class="fa-solid fa-download"></i> Load Log Book`;
        btn.classList.remove("btn-clear-danger");
    } else {
        btn.innerHTML = `<i class="fa-solid fa-trash-can"></i> Clear All Data`;
        btn.classList.add("btn-clear-danger");
    }
}

// Calculate KPI Cards
function calculateStats() {
    const totalCost = serviceRecords.reduce((sum, rec) => sum + rec.cost, 0);
    
    // Current Odometer & Tracked Mileage calculation
    let currentMileage = 0;
    let baseMileage = 0;
    let trackedMiles = 0;
    if (serviceRecords.length > 0) {
        const maxServiceMileage = Math.max(...serviceRecords.map(r => r.mileage));
        const minServiceMileage = Math.min(...serviceRecords.map(r => r.mileage));
        currentMileage = maxServiceMileage;
        baseMileage = minServiceMileage;
        trackedMiles = currentMileage - baseMileage;
    }

    const costPerMile = trackedMiles > 0 ? (totalCost / trackedMiles) : 0;

    // Last service date & next oil service mileage
    let lastServiceDateText = "N/A";
    let nextServiceText = "N/A";
    let healthStatus = "No Records";
    let healthCardClass = "alert-status-yellow";

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
        } else {
            nextServiceText = "5,000 mi";
            healthStatus = "Excellent";
            healthCardClass = "alert-status-green";
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

    if (serviceRecords.length === 0) {
        timelineContainer.innerHTML = `
            <div class="timeline-empty-state" style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
                <i class="fa-solid fa-screwdriver-wrench" style="font-size: 32px; margin-bottom: 12px; color: var(--text-muted); opacity: 0.5;"></i>
                <p style="font-weight: 500; font-size: 14px; color: var(--text-secondary);">No service records logged yet.</p>
                <p style="font-size: 12px; color: var(--text-muted); margin-top: 6px;">Click 'Add Service Record' above to start tracking your vehicle's history.</p>
            </div>
        `;
        return;
    }

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
    const categoryChartWrapper = document.getElementById("categoryChart").parentNode;
    const trendChartWrapper = document.getElementById("trendChart").parentNode;

    if (serviceRecords.length === 0) {
        // Destroy existing chart instances if any
        if (categoryChartInstance) {
            categoryChartInstance.destroy();
            categoryChartInstance = null;
        }
        if (trendChartInstance) {
            trendChartInstance.destroy();
            trendChartInstance = null;
        }

        // Show placeholders
        if (!document.getElementById("category-chart-placeholder")) {
            const placeholder = document.createElement("div");
            placeholder.id = "category-chart-placeholder";
            placeholder.className = "chart-placeholder";
            placeholder.innerHTML = `
                <div class="placeholder-content">
                    <i class="fa-solid fa-chart-pie"></i>
                    <p>No service data logged yet</p>
                </div>
            `;
            categoryChartWrapper.appendChild(placeholder);
        }
        
        if (!document.getElementById("trend-chart-placeholder")) {
            const placeholder = document.createElement("div");
            placeholder.id = "trend-chart-placeholder";
            placeholder.className = "chart-placeholder";
            placeholder.innerHTML = `
                <div class="placeholder-content">
                    <i class="fa-solid fa-chart-line"></i>
                    <p>No service data logged yet</p>
                </div>
            `;
            trendChartWrapper.appendChild(placeholder);
        }
        return;
    }

    // Hide placeholders if present
    const p1 = document.getElementById("category-chart-placeholder");
    if (p1) p1.remove();
    
    const p2 = document.getElementById("trend-chart-placeholder");
    if (p2) p2.remove();

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
        let currentMileage = "";
        if (serviceRecords.length > 0) {
            currentMileage = Math.max(0, ...serviceRecords.map(r => r.mileage));
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
