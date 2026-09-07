<?php
/**
 * CentralPoint Employee Portal - Mock Data Store
 * All applications, categories, announcements, company details, and quick links
 */

$currentUser = [
    'name' => 'Juan Dela Cruz',
    'role' => 'Employee',
    'initials' => 'JD',
    'department' => 'Quality Assurance',
    'avatarGradient' => 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
    'unreadNotifications' => 3
];

$companyInfo = [
    'name' => 'La Rose Noire Philippines',
    'tagline' => 'Food Manufacturing • Premium Pastry Solutions',
    'slogan' => 'Exceptional Indulgence for a Sweeter Tomorrow.',
    'address' => 'Lot 1-A & B, Clark IE-05 Area, M.A. Roxas Highway,
Clark Freeport Zone, Philippines',
    'email' => 'office@la-rose-noire.com',
    'phone' => ' +63 45 499-3010',
    'website' => 'www.larosenoire.ph',
    'websiteUrl' => 'https://www.larosenoire.ph',
    'image' => 'assets/images/lrn-facility-thumb.jpg',
    'heroImage' => 'assets/images/hero-facility-clean.jpg'
];

$categories = [
    'all' => ['label' => 'All Apps', 'count' => 48, 'icon' => 'grid'],
    'it' => ['label' => 'IT', 'count' => 7, 'icon' => 'monitor'],
    'hr' => ['label' => 'HR', 'count' => 8, 'icon' => 'users'],
    'qa' => ['label' => 'QA', 'count' => 6, 'icon' => 'shield-check'],
    'operations' => ['label' => 'Operations', 'count' => 6, 'icon' => 'settings'],
    // Inside More dropdown:
    'finance' => ['label' => 'Finance', 'count' => 5, 'icon' => 'credit-card'],
    'facilities' => ['label' => 'Facilities', 'count' => 4, 'icon' => 'building'],
    'administration' => ['label' => 'Administration', 'count' => 5, 'icon' => 'briefcase'],
    'communication' => ['label' => 'Communication', 'count' => 4, 'icon' => 'mail'],
    'external' => ['label' => 'External', 'count' => 3, 'icon' => 'globe']
];

$applications = [
    // Page 1 Top 8 (Ordered exactly as in reference image)
    [
        'id' => 'QR_TASK_CHECK',
        'name' => 'QR Task Check',
        'category' => 'IT',
        'categoryLabel' => 'IT Support',
        'department' => 'Information Technology',
        'icon' => 'QR',
        'iconColor' => 'Green',
        'url' => 'http://10.2.0.8/QRS_new/',
        'description' => 'QR Task Check is a web-based task management system that allows employees to easily check and manage their tasks.',
        'keywords' => 'QR Task Check'
    ],
    [
        'id' => 'people-navee',
        'name' => 'People Navee',
        'category' => 'hr',
        'categoryLabel' => 'HR',
        'department' => 'Human Resources',
        'icon' => 'users',
        'iconColor' => 'purple',
        'url' => 'https://navee.larosenoire.ph',
        'description' => 'Core Human Resources Information System for employee records, onboarding, and self-service.',
        'keywords' => 'hr hris staff profile employees directory navee people payroll leaves'
    ],
    [
        'id' => 'app-ticket',
        'name' => 'Application Ticket',
        'category' => 'it',
        'categoryLabel' => 'IT Support',
        'department' => 'Information Technology',
        'icon' => 'mail',
        'iconColor' => 'blue',
        'url' => 'https://tickets.larosenoire.ph/apps',
        'description' => 'Submit bug reports, feature requests, and support tickets for in-house enterprise software.',
        'keywords' => 'it support tickets bugs issues requests software helpdesk service'
    ],
    [
        'id' => 'itickethub',
        'name' => 'ITicketHub',
        'category' => 'it',
        'categoryLabel' => 'IT Support',
        'department' => 'Information Technology',
        'icon' => 'monitor',
        'iconColor' => 'teal',
        'url' => 'https://itickethub.larosenoire.ph',
        'description' => 'Centralized IT helpdesk for hardware troubleshooting, network connectivity, and workstation setup.',
        'keywords' => 'it helpdesk support hardware network laptop computer itickethub'
    ],
    [
        'id' => 'meeting-rooms',
        'name' => 'Meeting Rooms',
        'category' => 'facilities',
        'categoryLabel' => 'Facilities',
        'department' => 'General Services',
        'icon' => 'calendar',
        'iconColor' => 'pink',
        'url' => 'https://rooms.larosenoire.ph',
        'description' => 'Conference room reservation system with AV equipment booking, schedule views, and catering options.',
        'keywords' => 'rooms meeting booking calendar schedule conference facilities boardroom'
    ],
    [
        'id' => 'hr-personal-info',
        'name' => 'HR Personal Info',
        'category' => 'hr',
        'categoryLabel' => 'HR',
        'department' => 'Human Resources',
        'icon' => 'user-circle',
        'iconColor' => 'magenta',
        'url' => 'https://hr.larosenoire.ph/profile',
        'description' => 'Review and update personal records, emergency contacts, tax documents, and dependent information.',
        'keywords' => 'hr personal info profile records address emergency contacts benefits tax'
    ],
    [
        'id' => 'secure-pass',
        'name' => 'Secure Pass',
        'category' => 'administration',
        'categoryLabel' => 'Administration',
        'department' => 'Security & Admin',
        'icon' => 'arrow-right-circle',
        'iconColor' => 'blue',
        'url' => 'https://securepass.larosenoire.ph',
        'description' => 'Facility access control, digital badge management, security clearance, and visitor pre-registration.',
        'keywords' => 'security pass badge access building door rfid clearance admin'
    ],
    [
        'id' => 'engineering-work-order',
        'name' => 'Engineering Work Order System',
        'category' => 'operations',
        'categoryLabel' => 'Operations',
        'department' => 'Engineering & Maintenance',
        'icon' => 'settings',
        'iconColor' => 'green',
        'url' => 'https://engineering.larosenoire.ph',
        'description' => 'Preventive maintenance tracking, equipment repairs, machinery work orders, and parts management.',
        'keywords' => 'engineering maintenance repairs work order machines equipment operations'
    ],

    // Favorites & Key Apps
    [
        'id' => 'QR_TASK_CHECK',
        'name' => 'QR Task Check',
        'category' => 'IT',
        'categoryLabel' => 'IT Support',
        'department' => 'Information Technology',
        'icon' => 'QR',
        'iconColor' => 'Green',
        'url' => 'http://10.2.0.8/QRS_new/',
        'description' => 'QR Task Check is a web-based task management system that allows employees to easily check and manage their tasks.',
        'keywords' => 'QR Task Check'
    ],
    [
        'id' => 'docusign',
        'name' => 'DocuSign',
        'category' => 'administration',
        'categoryLabel' => 'e-Signature',
        'department' => 'Legal & Admin',
        'icon' => 'file-text',
        'iconColor' => 'purple',
        'url' => 'https://app.docusign.com',
        'description' => 'Electronic signature and digital agreement cloud platform.',
        'keywords' => 'docusign signature contracts agreements sign legal approval'
    ],

    // QA Applications (Key for Saved Workspace requirement)
    [
        'id' => 'qa-portal',
        'name' => 'QA Portal',
        'category' => 'qa',
        'categoryLabel' => 'QA',
        'department' => 'Quality Assurance',
        'icon' => 'shield-check',
        'iconColor' => 'purple',
        'url' => 'https://qa.larosenoire.ph',
        'description' => 'Central quality assurance hub for standards, testing policies, and inspection logs.',
        'keywords' => 'qa quality assurance testing standards compliance inspection'
    ],
    [
        'id' => 'staging-website',
        'name' => 'Staging Website',
        'category' => 'qa',
        'categoryLabel' => 'QA',
        'department' => 'Quality Assurance',
        'icon' => 'server',
        'iconColor' => 'teal',
        'url' => 'https://staging.larosenoire.ph',
        'description' => 'Pre-production staging environment for regression testing and deployment verification.',
        'keywords' => 'staging qa test pre-production preview deploy'
    ],
    [
        'id' => 'bug-tracker',
        'name' => 'Bug Tracker',
        'category' => 'qa',
        'categoryLabel' => 'QA',
        'department' => 'Quality Assurance',
        'icon' => 'alert-triangle',
        'iconColor' => 'orange',
        'url' => 'https://bugs.larosenoire.ph',
        'description' => 'Defect management system for logging, assigning, and resolving software and procedural bugs.',
        'keywords' => 'bug tracker defect issue qa tickets testing error'
    ],
    [
        'id' => 'test-reports',
        'name' => 'Test Reports',
        'category' => 'qa',
        'categoryLabel' => 'QA',
        'department' => 'Quality Assurance',
        'icon' => 'bar-chart',
        'iconColor' => 'blue',
        'url' => 'https://reports.qa.larosenoire.ph',
        'description' => 'Automated test execution summaries, QA metrics, test pass rates, and coverage analytics.',
        'keywords' => 'test reports qa metrics coverage analytics test runs'
    ],
    [
        'id' => 'jira-qa',
        'name' => 'Jira',
        'category' => 'qa',
        'categoryLabel' => 'QA',
        'department' => 'Quality Assurance',
        'icon' => 'check-square',
        'iconColor' => 'blue',
        'url' => 'https://jira.larosenoire.ph',
        'description' => 'Agile sprint planning, backlog grooming, and QA test cycle tracking.',
        'keywords' => 'jira atlassian sprints tickets qa agile scrum'
    ],
    [
        'id' => 'test-environment',
        'name' => 'Test Environment',
        'category' => 'qa',
        'categoryLabel' => 'QA',
        'department' => 'Quality Assurance',
        'icon' => 'cpu',
        'iconColor' => 'green',
        'url' => 'https://env.qa.larosenoire.ph',
        'description' => 'Configurable sandboxes, test database seeders, and isolated QA environments.',
        'keywords' => 'test environment sandbox seed database testing server'
    ],

    // Remaining IT Applications (Total 7 IT)
    [
        'id' => 'it-asset-manager',
        'name' => 'IT Asset Manager',
        'category' => 'it',
        'categoryLabel' => 'IT Support',
        'department' => 'Information Technology',
        'icon' => 'layers',
        'iconColor' => 'purple',
        'url' => 'https://assets.larosenoire.ph',
        'description' => 'Hardware lifecycle tracking, software licensing inventory, and equipment assignment.',
        'keywords' => 'it asset hardware computer monitor equipment inventory'
    ],
    [
        'id' => 'vpn-gateway',
        'name' => 'VPN Gateway',
        'category' => 'it',
        'categoryLabel' => 'IT Support',
        'department' => 'Information Technology',
        'icon' => 'lock',
        'iconColor' => 'teal',
        'url' => 'https://vpn.larosenoire.ph',
        'description' => 'Secure remote network access portal for telecommuting employees and branch offices.',
        'keywords' => 'vpn remote access security connection network'
    ],
    [
        'id' => 'cloud-console',
        'name' => 'Cloud Console',
        'category' => 'it',
        'categoryLabel' => 'IT Support',
        'department' => 'Information Technology',
        'icon' => 'cloud',
        'iconColor' => 'cyan',
        'url' => 'https://cloud.larosenoire.ph',
        'description' => 'Server management, backup monitoring, and enterprise cloud infrastructure controls.',
        'keywords' => 'cloud console aws azure server hosting backup'
    ],
    [
        'id' => 'software-center',
        'name' => 'Software Center',
        'category' => 'it',
        'categoryLabel' => 'IT Support',
        'department' => 'Information Technology',
        'icon' => 'package',
        'iconColor' => 'pink',
        'url' => 'https://software.larosenoire.ph',
        'description' => 'Self-service catalog for downloading approved company software and utility updates.',
        'keywords' => 'software download install center apps utilities'
    ],
    [
        'id' => 'network-access',
        'name' => 'Network Access Portal',
        'category' => 'it',
        'categoryLabel' => 'IT Support',
        'department' => 'Information Technology',
        'icon' => 'wifi',
        'iconColor' => 'blue',
        'url' => 'https://wifi.larosenoire.ph',
        'description' => 'Employee and guest Wi-Fi authentication and device registration.',
        'keywords' => 'wifi network internet connection password login access'
    ],

    // Remaining HR Applications (Total 8 HR)
    [
        'id' => 'leave-management',
        'name' => 'Leave Management',
        'category' => 'hr',
        'categoryLabel' => 'HR',
        'department' => 'Human Resources',
        'icon' => 'calendar',
        'iconColor' => 'teal',
        'url' => 'https://leaves.larosenoire.ph',
        'description' => 'Submit vacation, sick, and emergency leaves, check leave balances, and view approvals.',
        'keywords' => 'leave vacation sick time off absences holiday hr'
    ],
    [
        'id' => 'payroll-portal',
        'name' => 'Payroll & Payslips',
        'category' => 'hr',
        'categoryLabel' => 'HR',
        'department' => 'Human Resources',
        'icon' => 'credit-card',
        'iconColor' => 'green',
        'url' => 'https://payroll.larosenoire.ph',
        'description' => 'Secure access to electronic payslips, tax withholding certificates, and 13th month computation.',
        'keywords' => 'payroll payslip salary compensation tax withholding hr'
    ],
    [
        'id' => 'performance-review',
        'name' => 'Performance Review',
        'category' => 'hr',
        'categoryLabel' => 'HR',
        'department' => 'Human Resources',
        'icon' => 'award',
        'iconColor' => 'orange',
        'url' => 'https://kpi.larosenoire.ph',
        'description' => 'Bi-annual appraisal cycles, KPI tracking, 360-degree feedback, and goal alignment.',
        'keywords' => 'performance appraisal kpi goals review evaluation hr'
    ],
    [
        'id' => 'employee-benefits',
        'name' => 'Employee Benefits & HMO',
        'category' => 'hr',
        'categoryLabel' => 'HR',
        'department' => 'Human Resources',
        'icon' => 'heart',
        'iconColor' => 'pink',
        'url' => 'https://benefits.larosenoire.ph',
        'description' => 'Health insurance coverage, dependent enrollment, medical reimbursements, and wellness perks.',
        'keywords' => 'hmo benefits healthcare insurance medical clinic dental hr'
    ],
    [
        'id' => 'training-academy',
        'name' => 'LRN Training Academy',
        'category' => 'hr',
        'categoryLabel' => 'HR',
        'department' => 'Human Resources',
        'icon' => 'book-open',
        'iconColor' => 'purple',
        'url' => 'https://academy.larosenoire.ph',
        'description' => 'Online learning portal featuring hygiene certifications, pastry craft lessons, and safety modules.',
        'keywords' => 'training academy courses learning lms certifications pastry'
    ],
    [
        'id' => 'time-attendance',
        'name' => 'Time & Attendance Tracker',
        'category' => 'hr',
        'categoryLabel' => 'HR',
        'department' => 'Human Resources',
        'icon' => 'clock',
        'iconColor' => 'blue',
        'url' => 'https://dtr.larosenoire.ph',
        'description' => 'Daily time record verification, overtime requests, shift schedules, and holiday credits.',
        'keywords' => 'attendance dtr timekeeping shifts overtime clock in out'
    ],

    // Remaining Operations Applications (Total 6 Operations)
    [
        'id' => 'production-scheduler',
        'name' => 'Production Scheduler',
        'category' => 'operations',
        'categoryLabel' => 'Operations',
        'department' => 'Manufacturing Operations',
        'icon' => 'activity',
        'iconColor' => 'purple',
        'url' => 'https://production.larosenoire.ph',
        'description' => 'Real-time bakery output planning, oven line allocation, and batch volume monitoring.',
        'keywords' => 'production scheduler bakery manufacturing line batch schedule'
    ],
    [
        'id' => 'warehouse-wms',
        'name' => 'Warehouse & Inventory WMS',
        'category' => 'operations',
        'categoryLabel' => 'Operations',
        'department' => 'Logistics & Warehouse',
        'icon' => 'archive',
        'iconColor' => 'blue',
        'url' => 'https://wms.larosenoire.ph',
        'description' => 'Cold storage raw material stock levels, finished goods storage, and FIFO dispatch control.',
        'keywords' => 'warehouse wms inventory storage cold stock logistics'
    ],
    [
        'id' => 'supply-chain-tracker',
        'name' => 'Supply Chain Tracker',
        'category' => 'operations',
        'categoryLabel' => 'Operations',
        'department' => 'Supply Chain & Procurement',
        'icon' => 'truck',
        'iconColor' => 'orange',
        'url' => 'https://supply.larosenoire.ph',
        'description' => 'Shipment tracking, international container ETA, port customs status, and cargo manifests.',
        'keywords' => 'supply chain logistics shipping truck cargo delivery customs'
    ],
    [
        'id' => 'haccp-monitor',
        'name' => 'HACCP & Quality Monitor',
        'category' => 'operations',
        'categoryLabel' => 'Operations',
        'department' => 'Food Safety & QA',
        'icon' => 'check-circle',
        'iconColor' => 'green',
        'url' => 'https://haccp.larosenoire.ph',
        'description' => 'Food safety compliance logs, critical control point temperatures, and sanitization logs.',
        'keywords' => 'haccp food safety hygiene sanitation temperature quality'
    ],
    [
        'id' => 'facility-maintenance',
        'name' => 'Facility Maintenance',
        'category' => 'operations',
        'categoryLabel' => 'Operations',
        'department' => 'General Services',
        'icon' => 'tool',
        'iconColor' => 'teal',
        'url' => 'https://facilities.larosenoire.ph/maint',
        'description' => 'Cleanroom HVAC monitoring, refrigeration systems, water filtration, and electrical upkeep.',
        'keywords' => 'facility maintenance hvac cold room power water electrical'
    ],

    // Finance Applications (Total 5 Finance)
    [
        'id' => 'oracle-erp',
        'name' => 'Oracle ERP Financials',
        'category' => 'finance',
        'categoryLabel' => 'Finance',
        'department' => 'Finance & Accounting',
        'icon' => 'dollar-sign',
        'iconColor' => 'green',
        'url' => 'https://erp.larosenoire.ph',
        'description' => 'Enterprise resource planning for general ledger, balance sheets, and audit reporting.',
        'keywords' => 'oracle erp finance accounting ledger journal audit'
    ],
    [
        'id' => 'expense-claims',
        'name' => 'Expense Claims Portal',
        'category' => 'finance',
        'categoryLabel' => 'Finance',
        'department' => 'Finance & Accounting',
        'icon' => 'receipt',
        'iconColor' => 'blue',
        'url' => 'https://expenses.larosenoire.ph',
        'description' => 'Staff reimbursement filing with digital receipt scanning and managerial approval workflows.',
        'keywords' => 'expense reimbursement receipt claims liquidation money travel'
    ],
    [
        'id' => 'vendor-invoicing',
        'name' => 'Vendor Invoicing Portal',
        'category' => 'finance',
        'categoryLabel' => 'Finance',
        'department' => 'Accounts Payable',
        'icon' => 'file-plus',
        'iconColor' => 'purple',
        'url' => 'https://ap.larosenoire.ph',
        'description' => 'Supplier invoice intake, purchase order matching, payment terms, and disbursement status.',
        'keywords' => 'invoicing supplier vendors accounts payable po bills'
    ],
    [
        'id' => 'budget-tracker',
        'name' => 'Department Budget Tracker',
        'category' => 'finance',
        'categoryLabel' => 'Finance',
        'department' => 'Financial Planning',
        'icon' => 'pie-chart',
        'iconColor' => 'orange',
        'url' => 'https://budget.larosenoire.ph',
        'description' => 'Capex and Opex variance analysis, departmental burn rates, and forecast modeling.',
        'keywords' => 'budget forecast capex opex department finance spend'
    ],
    [
        'id' => 'petty-cash',
        'name' => 'Petty Cash System',
        'category' => 'finance',
        'categoryLabel' => 'Finance',
        'department' => 'Treasury',
        'icon' => 'credit-card',
        'iconColor' => 'teal',
        'url' => 'https://treasury.larosenoire.ph/cash',
        'description' => 'Office cash vouchers, emergency purchases, and custodian reconciliation.',
        'keywords' => 'petty cash vouchers treasury money urgent expense'
    ],

    // Facilities (Total 4 Facilities: meeting-rooms already declared above, + 3 more)
    [
        'id' => 'fleet-booking',
        'name' => 'Fleet & Vehicle Booking',
        'category' => 'facilities',
        'categoryLabel' => 'Facilities',
        'department' => 'Transportation & Logistics',
        'icon' => 'truck',
        'iconColor' => 'blue',
        'url' => 'https://fleet.larosenoire.ph',
        'description' => 'Company van reservations for business trips, client pickups, and shuttle transfers.',
        'keywords' => 'vehicle car van shuttle transport travel facilities'
    ],
    [
        'id' => 'visitor-management',
        'name' => 'Visitor Management',
        'category' => 'facilities',
        'categoryLabel' => 'Facilities',
        'department' => 'Security & Facilities',
        'icon' => 'user-check',
        'iconColor' => 'green',
        'url' => 'https://visitors.larosenoire.ph',
        'description' => 'Pre-register guest arrivals, safety briefings, NDA sign-offs, and guest badges.',
        'keywords' => 'visitor guest badge entry gate lobby pass'
    ],
    [
        'id' => 'cafeteria-menu',
        'name' => 'Cafeteria Menu & Meal Pass',
        'category' => 'facilities',
        'categoryLabel' => 'Facilities',
        'department' => 'Employee Wellness',
        'icon' => 'coffee',
        'iconColor' => 'pink',
        'url' => 'https://cafeteria.larosenoire.ph',
        'description' => 'Daily subsidized lunch menu, dietary options, pastry specials, and digital meal credits.',
        'keywords' => 'cafeteria food lunch meal pastry canteen dining'
    ],

    // Administration (Total 5 Admin: secure-pass, docusign declared above, + 3 more)
    [
        'id' => 'corporate-travel',
        'name' => 'Corporate Travel Portal',
        'category' => 'administration',
        'categoryLabel' => 'Administration',
        'department' => 'General Administration',
        'icon' => 'compass',
        'iconColor' => 'cyan',
        'url' => 'https://travel.larosenoire.ph',
        'description' => 'Flight bookings, hotel reservations, per diem allowances, and travel insurance.',
        'keywords' => 'travel flight hotel tickets per diem international trip'
    ],
    [
        'id' => 'legal-repository',
        'name' => 'Legal Document Repository',
        'category' => 'administration',
        'categoryLabel' => 'Administration',
        'department' => 'Legal Department',
        'icon' => 'folder',
        'iconColor' => 'purple',
        'url' => 'https://legal.larosenoire.ph',
        'description' => 'Approved template agreements, NDAs, trademark certificates, and regulatory filings.',
        'keywords' => 'legal contracts templates nda compliance law permits'
    ],
    [
        'id' => 'asset-disposal',
        'name' => 'Asset Disposal System',
        'category' => 'administration',
        'categoryLabel' => 'Administration',
        'department' => 'Admin & Logistics',
        'icon' => 'trash-2',
        'iconColor' => 'orange',
        'url' => 'https://disposal.larosenoire.ph',
        'description' => 'Scrap authorization, obsolete electronics recycling, and decommissioning records.',
        'keywords' => 'disposal scrap decommissioning recycling equipment assets'
    ],

    // Communication (Total 4 Communication: employee-email declared above, + 3 more)
    [
        'id' => 'slack-teams',
        'name' => 'Teams & Chat',
        'category' => 'communication',
        'categoryLabel' => 'Communication',
        'department' => 'Corporate Communications',
        'icon' => 'message-square',
        'iconColor' => 'purple',
        'url' => 'https://teams.microsoft.com',
        'description' => 'Direct messaging, departmental channels, project collaboration, and audio/video calls.',
        'keywords' => 'teams slack chat communication message direct call video'
    ],
    [
        'id' => 'zoom-rooms',
        'name' => 'Zoom Conference',
        'category' => 'communication',
        'categoryLabel' => 'Communication',
        'department' => 'Corporate Communications',
        'icon' => 'video',
        'iconColor' => 'blue',
        'url' => 'https://zoom.us',
        'description' => 'High definition video meetings, webinars, screen sharing, and international calls.',
        'keywords' => 'zoom meeting video conference calls webinar screen'
    ],
    [
        'id' => 'survey-hub',
        'name' => 'Feedback & Survey Hub',
        'category' => 'communication',
        'categoryLabel' => 'Communication',
        'department' => 'Internal Communications',
        'icon' => 'clipboard',
        'iconColor' => 'teal',
        'url' => 'https://feedback.larosenoire.ph',
        'description' => 'Employee pulse surveys, suggestion box, town hall Q&A, and culture assessments.',
        'keywords' => 'feedback survey questions suggestion pulse townhall opinion'
    ],

    // External (Total 3 External: lrn-website declared above, + 2 more)
    [
        'id' => 'intranet-portal',
        'name' => 'Company Intranet Portal',
        'category' => 'external',
        'categoryLabel' => 'External',
        'department' => 'Internal Communications',
        'icon' => 'shield',
        'iconColor' => 'blue',
        'url' => 'https://intranet.larosenoire.ph',
        'description' => 'Corporate announcements, organization charts, leadership directory, and branch information.',
        'keywords' => 'intranet corporate portal internal news leadership directory'
    ],
    [
        'id' => 'knowledge-base',
        'name' => 'Knowledge Base & SOPs',
        'category' => 'external',
        'categoryLabel' => 'External',
        'department' => 'Organizational Development',
        'icon' => 'help-circle',
        'iconColor' => 'pink',
        'url' => 'https://kb.larosenoire.ph',
        'description' => 'Standard operating procedures, pastry recipe manuals, and operational guidelines.',
        'keywords' => 'knowledge base sop manual documentation guidelines recipes'
    ]
];

// Initial default favorites shown in reference image
$defaultFavoriteIds = [
    'people-navee',
    'employee-email',
    'itickethub',
    'docusign',
    'meeting-rooms'
];

// Default workspaces as requested in user prompt
$initialWorkspaces = [
    [
        'id' => 'qa-websites',
        'name' => 'QA Websites',
        'isDefault' => true,
        'appIds' => [
            'qa-portal',
            'staging-website',
            'bug-tracker',
            'test-reports',
            'jira-qa',
            'test-environment'
        ]
    ],
    [
        'id' => 'it-tools',
        'name' => 'IT Support Suite',
        'isDefault' => false,
        'appIds' => [
            'itickethub',
            'app-ticket',
            'it-asset-manager',
            'vpn-gateway',
            'software-center'
        ]
    ]
];

$announcements = [
    [
        'id' => 'conduct-2026',
        'tag' => 'New',
        'year' => '2026',
        'title' => "Employee's Code of Business Conduct",
        'description' => "Please read the updated Employee's Code of Business Conduct.",
        'image' => 'assets/images/announcement-conduct.jpg',
        'date' => 'Sep 01, 2026',
        'readTime' => '5 min read'
    ],
    [
        'id' => 'safety-week',
        'tag' => 'Event',
        'year' => '2026',
        'title' => "Annual Workplace Safety & Ergonomics Week",
        'description' => "Join interactive training workshops and ergonomics posture screenings at the Main Hall.",
        'image' => 'assets/images/announcement-conduct.jpg',
        'date' => 'Aug 28, 2026',
        'readTime' => '3 min read'
    ],
    [
        'id' => 'sustainability',
        'tag' => 'Update',
        'year' => '2026',
        'title' => "LRN Green Initiative: 100% Eco Packaging",
        'description' => "We have completed our transition to biodegradable, sustainable packaging for all pastry lines.",
        'image' => 'assets/images/announcement-conduct.jpg',
        'date' => 'Aug 20, 2026',
        'readTime' => '4 min read'
    ],
    [
        'id' => 'townhall-q3',
        'tag' => 'Company',
        'year' => '2026',
        'title' => "Q3 Global Town Hall with Executive Leadership",
        'description' => "Tune in live this Thursday for our international milestone review and employee awards ceremony.",
        'image' => 'assets/images/announcement-conduct.jpg',
        'date' => 'Aug 15, 2026',
        'readTime' => '2 min read'
    ]
];

$quickLinks = [
    [
        'id' => 'intranet',
        'title' => 'Company Intranet',
        'icon' => 'shield',
        'url' => 'https://intranet.larosenoire.ph'
    ],
    [
        'id' => 'it-helpdesk',
        'title' => 'IT Helpdesk',
        'icon' => 'monitor',
        'url' => 'https://itickethub.larosenoire.ph'
    ],
    [
        'id' => 'hr-portal',
        'title' => 'HR Portal',
        'icon' => 'users',
        'url' => 'https://navee.larosenoire.ph'
    ],
    [
        'id' => 'policies',
        'title' => 'Company Policies',
        'icon' => 'file-text',
        'url' => 'https://policies.larosenoire.ph'
    ]
];
