export interface SubProject {
  id: string;
  number: number;
  title: string;
  assetId?: string;
  location: string;
  summary: string;
  image: string;
  imageCaption: string;
  highlights?: string[];
  metrics?: { label: string; value: string }[];
  gallery?: { url: string; caption: string; title?: string; type?: "site" | "render" | "plan" }[];
}

export interface Project {
  id: string;
  title: string;
  category: "Luxury Residential" | "High-Rise Development" | "Luxury Interiors" | "Hospitality";
  location: string;
  organization: string;
  period: string;
  role: string;
  summary: string;
  image: string;
  imageCaption: string;
  imageType: "conceptual" | "verified";
  highlights: string[];
  responsibilities: string[];
  technicalExecution: string[];
  metrics?: { label: string; value: string }[];
  gallery?: { url: string; caption: string; title?: string; type?: "site" | "render" | "plan" }[];
  subProjects?: SubProject[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: "Construction Management" | "Quality & Interiors" | "Hospitality Infrastructure" | "Civil Engineering" | "Entrepreneurship" | "Internship";
  overview: string;
  achievements: string[];
  deliverables?: string[];
}

export interface AchievementItem {
  metric: string;
  label: string;
  context: string;
  organization: string;
  significance: string;
}

export interface AwardItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: string;
  issuer: string;
  citation: string;
  image: string;
  badge: string;
}

export interface ExpertiseArea {
  id: string;
  title: string;
  category: string;
  description: string;
  points: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Saket Kumar Tiwari",
    monogram: "SKT",
    headline: "Crafting Exceptional Spaces. Delivering Engineering Excellence.",
    subheadline: "Civil Engineer | Construction & Project Management | Luxury Residential Developments",
    eyebrow: "CIVIL ENGINEERING · CONSTRUCTION MANAGEMENT",
    heroText: "Transforming architectural vision into meticulously executed spaces through thoughtful planning, technical precision, and uncompromising quality.",
    introduction: "I am a civil engineering and construction management professional with 9.5+ years of experience delivering luxury residential developments, high-end interiors, hospitality projects, and high-rise buildings.",
    aboutExtended: [
      "I bridge the critical gap between conceptual architectural design and grounded site reality across high-value luxury farmhouses, high-rise residential developments, and pan-India luxury interiors.",
      "Rooted in rigorous QA/QC governance, proactive resource leveling, and Lean Six Sigma standards, I ensure complex structural forms and bespoke finishes are delivered strictly on schedule and budget.",
    ],
    location: "Gurgaon, Haryana · New Delhi NCR, India",
    linkedinUrl: "https://www.linkedin.com/in/saket-kumar-tiwari-27053713b/",
  },

  impactStats: [
    {
      value: "9.5+",
      unit: "Years",
      label: "Professional Experience",
      caption: "Delivering luxury residential, high-rise, interiors & hospitality projects across India",
    },
    {
      value: "7",
      unit: "Organizations",
      label: "Career Organizations & Experiences",
      caption: "Progressive leadership from site engineering to construction management",
    },
    {
      value: "100%",
      unit: "Commitment",
      label: "Specification & Quality Adherence",
      caption: "Rigorous ISO compliance audits, ITP approvals & material submittal reviews",
    },
  ],

  achievements: [
    {
      metric: "₹700Cr+",
      label: "Overall Project Value Track Record",
      context: "Cumulative value of projects managed and delivered across career assignments in residential, high-rise, and interior sectors.",
      organization: "Career Milestone",
      significance: "Reflects broad operational scale, contractual governance, and financial stewardship."
    },
    {
      metric: "15%",
      label: "Reduction in Project Delays",
      context: "Achieved via strategic resource allocation and optimization across labor, materials, and equipment on luxury farmhouse development.",
      organization: "Aamor Inox Limited",
      significance: "Directly curtailed critical-path downtime and improved schedule adherence."
    },
    {
      metric: "20%",
      label: "Improvement in ISO Compliance",
      context: "Spearheaded quarterly audits and cross-departmental review meetings as Quality Lead & Internal Auditor across pan-India luxury interior projects.",
      organization: "La Sorogeeka Interiors",
      significance: "Established structured quality benchmarks and repeatable site compliance standard."
    },
    {
      metric: "10%",
      label: "Reduction in Rework Costs",
      context: "Designed and delivered targeted technical training programs for site supervisors and artisan teams.",
      organization: "La Sorogeeka Interiors",
      significance: "Eliminated costly execution defects before final client handover."
    },
    {
      metric: "19",
      label: "On-Time Hotel Launches",
      context: "Led property audits, feasibility assessments, site conversions, and vendor management across the NCR region.",
      organization: "OYO",
      significance: "Rapid operational turnaround under strict commercial go-live constraints."
    },
    {
      metric: "12%",
      label: "Procurement Cost Savings",
      context: "Achieved through cross-functional collaboration with Finance, Supply Chain Management (SCM), and Vendor Management.",
      organization: "OYO",
      significance: "Negotiated strategic vendor agreements without compromising finish specifications."
    }
  ] as AchievementItem[],

  expertise: [
    {
      id: "construction-execution",
      title: "Construction & Site Execution",
      category: "Site Operations",
      description: "Directing on-ground operations from earthwork and structural RCC frames through envelope closure and fine finishing works.",
      points: [
        "Rigorous contractor and trade crew supervision",
        "Daily site visit minutes and owner progress updates",
        "Milestone verification and site safety governance"
      ]
    },
    {
      id: "project-planning",
      title: "Project Planning & Scheduling",
      category: "Management",
      description: "Developing comprehensive baseline schedules, critical-path analysis, and dynamic milestone tracking to protect delivery timelines.",
      points: [
        "Work Breakdown Structures (WBS) and look-ahead plans",
        "Critical path monitoring and schedule risk mitigation",
        "Multi-agency milestone alignment across parallel works"
      ]
    },
    {
      id: "qa-qc",
      title: "Quality Assurance & Control (QA/QC)",
      category: "Standards & Governance",
      description: "Enforcing stringent inspection and testing protocols (ITPs) to guarantee flawless material performance and luxury finishes.",
      points: [
        "ISO quality standard compliance and audit routines",
        "Comprehensive material submittal approval workflows",
        "Pre-handover snag list elimination and defect prevention"
      ]
    },
    {
      id: "cost-boq",
      title: "Cost, BOQ & Resource Management",
      category: "Commercial Control",
      description: "Managing project budgets, Bills of Quantities (BOQ), material reconciliation, and labor allocation to maximize efficiency.",
      points: [
        "Detailed quantity takeoffs and contractor billing reviews",
        "Zero-delay milestone billing verification",
        "Resource leveling across labor, machinery, and inventory"
      ]
    },
    {
      id: "procurement-vendor",
      title: "Procurement & Vendor Coordination",
      category: "Supply Chain",
      description: "Managing specialized procurement for premium materials, architectural hardware, stone cladding, and lighting fixtures.",
      points: [
        "Purchase Order (PO) reconciliation and vendor SLA tracking",
        "Sourcing and vetting bespoke artisanal fabricators",
        "Cross-functional synchronization with SCM and finance"
      ]
    },
    {
      id: "luxury-residential",
      title: "Luxury Residential & Farmhouses",
      category: "Sector Specialization",
      description: "Turnkey delivery of ultra-luxury bespoke farmhouses, private estates, and architectural residences with high-touch finishes.",
      points: [
        "High-spec natural stone cladding and hardscaping",
        "Integrated MEP, architectural lighting, and smart automation",
        "Direct reporting to Project Directors and private estate owners"
      ]
    },
    {
      id: "high-rise",
      title: "High-Rise Residential Construction",
      category: "Structural Engineering",
      description: "Simultaneous high-rise tower management spanning heavy RCC structural works and simultaneous multi-floor interior finishes.",
      points: [
        "Parallel G+18 tower execution governance (SOBHA City)",
        "Formwork cycle management and crane logistics",
        "Structural-to-finishing transition schedule synchronization"
      ]
    },
    {
      id: "interior-fitouts",
      title: "Interior Fit-Out & Finishing Works",
      category: "High-End Interiors",
      description: "Orchestrating bespoke luxury interior fit-outs, Italian marble installation, custom millwork, and specialty joinery.",
      points: [
        "High-precision tolerance checks for luxury furnishings",
        "Specialist sub-contractor alignment and mockup approvals",
        "Pan-India execution standards on high-value interiors"
      ]
    },
    {
      id: "stakeholder-management",
      title: "Stakeholder & Consultant Management",
      category: "Leadership",
      description: "Serving as the trusted technical liaison uniting clients, project directors, design architects, structural consultants, and authorities.",
      points: [
        "Design discrepancy resolution prior to site execution",
        "Transparent stakeholder reporting and structured site minutes",
        "Regulatory authority liaison and statutory approval coordination"
      ]
    },
    {
      id: "handover-documentation",
      title: "Project Documentation & Handover",
      category: "Project Closeout",
      description: "Disciplined handover management with comprehensive as-built drawings, O&M manuals, warranty documentation, and client sign-offs.",
      points: [
        "Comprehensive testing and commissioning protocols",
        "As-built drawing verification and asset registers",
        "Flawless pre-delivery inspection and warranty handovers"
      ]
    }
  ] as ExpertiseArea[],

  projects: [
    {
      id: "private-luxury-farmhouse-new-delhi",
      title: "Private Luxury Farmhouse",
      category: "Luxury Residential",
      location: "New Delhi, India",
      organization: "Varun Beverages Limited",
      period: "January 2026 – Present",
      role: "Manager – Construction",
      summary: "Leading on-ground construction execution for an ultra-luxury private farmhouse in New Delhi, reporting directly to the Project Director on owner-facing coordination, finish standards, and specialist procurement.",
      image: "/projects/current-farmhouse.jpg",
      imageCaption: "Current Project — Private Luxury Farmhouse, New Delhi (Documented Site Execution)",
      imageType: "verified",
      highlights: [
        "Direct reporting to Project Director on owner-facing coordination",
        "Procurement management across stone cladding, hardware, lighting, and interior fit-outs",
        "Quantity takeoffs and PO reconciliation for specialized finishes",
        "Structured site visit minutes and progress transparency"
      ],
      responsibilities: [
        "Leading on-ground site execution of a high-value private estate, safeguarding design integrity and owner requirements.",
        "Managing specialized vendor coordination across architectural stone cladding, bespoke hardware, architectural lighting, and millwork packages.",
        "Performing detailed quantity takeoffs, tracking material reconciliations, and closing out PO discrepancies with commercial clarity.",
        "Liaising closely with master architects, landscape architects, and interior designers to translate custom details into physical execution.",
        "Driving site documentation discipline through formal site visit minutes and weekly owner progress reports."
      ],
      technicalExecution: [
        "Natural stone facade dry-cladding systems with engineered bracket fixings",
        "Integrated architectural lighting raceways and recessed architectural details",
        "Precision sub-base preparation for imported floor slabs and seamless transitions",
        "Zero-defect finish benchmarks verified via pre-installation mockups"
      ],
      metrics: [
        { label: "Scope", value: "Turnkey Luxury Farmhouse" },
        { label: "Governance", value: "Direct Director Reporting" },
        { label: "Execution", value: "Active On-Ground Delivery" }
      ]
    },
    {
      id: "luxury-farmhouse-aamor-inox",
      title: "Luxury Farmhouse Construction",
      category: "Luxury Residential",
      location: "New Delhi, India",
      organization: "Aamor Inox Limited",
      period: "December 2023 – January 2026",
      role: "Construction Manager",
      summary: "Spearheaded end-to-end execution of a prestigious luxury farmhouse, overseeing budgets, schedules, resource allocation, and quality benchmarks with documented 15% reduction in project delays.",
      image: "/projects/aamor-farmhouse-facade.jpg",
      imageCaption: "Aamor Inox Luxury Farmhouse — Contemporary Estate Facade, Balconies & Landscaped Grounds (Documented Site Execution)",
      imageType: "verified",
      highlights: [
        "End-to-end turnkey delivery including prior project Vardan coordination",
        "Reduced project delays by 15% through disciplined resource allocation",
        "Comprehensive budget, timeline, and statutory approval oversight",
        "Implemented advanced quality control for flawless luxury finishes"
      ],
      responsibilities: [
        "Supervised complete project lifecycle from site mobilization through design coordination and final handover.",
        "Managed resource leveling across specialized labor trades, heavy equipment, and procurement schedules, cutting delays by 15%.",
        "Interfaced with prominent architects, high-profile clients, trade subcontractors, and regulatory bodies for statutory approvals.",
        "Established on-site QA/QC matrices to ensure structural integrity and flawless aesthetic finishes on high-spec materials.",
        "Proactively identified site risks and engineering bottlenecks, preserving both financial contingency and baseline timelines."
      ],
      technicalExecution: [
        "Contemporary exterior envelope featuring cantilevered glass balconies, architectural stone feature walls, and dark metallic louvers",
        "High-precision installation of book-matched black & white Italian marble, striated natural stone slabs, and marble bathroom suites",
        "Custom architectural millwork, fluted timber acoustic wall cladding, and double-height dressing atrium with structural glass balustrades",
        "Bespoke glass display wardrobes with integrated warm LED profile lighting and central fluted island accessory dressers",
        "Turnkey master bath execution with freestanding soaking tub, concealed luxury diverters, and fluted glass wet-room partitions"
      ],
      metrics: [
        { label: "Schedule Optimization", value: "15% Delay Reduction" },
        { label: "Scope Lifecycle", value: "Turnkey Execution" },
        { label: "Quality Audit", value: "Zero Rework Handover" }
      ],
      gallery: [
        {
          url: "/projects/aamor-farmhouse-facade.jpg",
          title: "Estate Architecture & Facade",
          caption: "Actual Site Execution — Contemporary Luxury Farmhouse Exterior Elevation, Cantilevered Balconies, Dark Metal Louvers & Landscaped Lawn",
          type: "site"
        },
        {
          url: "/projects/aamor-dressing-atrium.jpg",
          title: "Staircase & Dressing Atrium",
          caption: "Double-Height Dressing Atrium — Fluted Timber Paneling, Cantilevered Staircase with Glass Balustrade & Full-Height Tinted Glass Wardrobes",
          type: "site"
        },
        {
          url: "/projects/aamor-wardrobe-closet.jpg",
          title: "Walk-In Glass Wardrobe",
          caption: "Bespoke Dressing Suite — Bronze Profile Glass Display Enclosures, Integrated LED Warm Channel Lighting & Central Fluted Island Dresser",
          type: "site"
        },
        {
          url: "/projects/aamor-master-vanity.jpg",
          title: "Master Double Vanity Suite",
          caption: "Palatial Master Vanity — Book-Matched Black & White Marble Cladding, Sculptural Ribbon Chandelier & Twin Brushed Brass Vessel Sinks",
          type: "site"
        },
        {
          url: "/projects/aamor-master-bath-suite.jpg",
          title: "Master Soaking Bath Suite",
          caption: "Ultra-Luxury Master Bath — Freestanding Acrylic Soaking Tub, Striated Natural Stone Cladding & Fluted Glass Wet-Room Partition",
          type: "site"
        }
      ]
    },
    {
      id: "luxury-residences-la-sorogeeka",
      title: "Luxury Interior Residences",
      category: "Luxury Interiors",
      location: "Delhi & Raipur, India",
      organization: "La Sorogeeka Interiors",
      period: "August 2021 – December 2023",
      role: "Senior Engineer / Quality Lead & Internal Auditor",
      summary: "Spearheaded site operations, QA/QC standards, bespoke joinery, and high-tolerance Italian marble execution for ultra-luxury private estates across Pan-India, including Civil Lines (Delhi) and Raipur Residence.",
      image: "/projects/lsi-civil-lines-salon.jpg",
      imageCaption: "La Sorogeeka Luxury Residences — Civil Lines & Raipur Residence (Documented Projects)",
      imageType: "verified",
      highlights: [
        "Turnkey execution of ultra-luxury private residences across Delhi and Raipur",
        "High-tolerance Italian marble installations, book-matched slabs, and intricate border inlays",
        "Bespoke classical joinery, ornate boiserie paneling, and sculptural helical staircases",
        "Zero-rework handover through rigorous ISO quality audits and mock-up verification"
      ],
      responsibilities: [
        "Led on-site execution and multi-trade coordination across luxury marble, joinery, and MEP fit-out packages.",
        "Supervised high-precision installation of imported Italian marble, custom classical wood paneling, and crystal chandeliers.",
        "Reviewed complex BOQs, evaluated technical material submittals, and authorized Inspection and Test Plans (ITPs) with 100% adherence.",
        "Conducted site workshops and inspection audits, eliminating defects and lowering rework expenditures."
      ],
      technicalExecution: [
        "Dry-lay layout verification and joint alignment for intricate marble floor border inlays",
        "High-tolerance architectural joinery installation with concealed structural fixings and acoustic gaskets",
        "Specialized decorative finishes including gold leafing, custom lacquer cabinetry, and illuminated onyx accents",
        "Integration of concealed MEP services within ornate coffered ceilings and architectural cornice details"
      ],
      metrics: [
        { label: "Portfolio", value: "Pan-India Luxury" },
        { label: "ISO Compliance", value: "+20% Improvement" },
        { label: "Handover Quality", value: "Zero Rework" }
      ],
      subProjects: [
        {
          id: "lsi-civil-lines",
          number: 1,
          title: "Project 01: Civil Lines",
          location: "Civil Lines, Delhi, India",
          image: "/projects/lsi-civil-lines-salon.jpg",
          imageCaption: "Project 01 (Civil Lines) — Neoclassical Formal Salon, Fluted Corinthian Columns & Inlaid Marble",
          summary: "Turnkey execution, high-tolerance Italian marble installations, bespoke boiserie millwork, and stringent QA/QC protocols for the ultra-luxury Civil Lines private residence in Delhi.",
          highlights: [
            "Ultra-luxury private residential interior fit-out in prestigious Civil Lines, Delhi",
            "Master craftsmanship across fluted columns, classical boiserie, and coffered ceilings",
            "Bespoke solid wood artisanal bar with backlit gold filigree screens and wine vault",
            "Zero-rework handover through rigorous ISO quality audits and mock-up verification"
          ],
          metrics: [
            { label: "Project", value: "01 of 02" },
            { label: "Residence", value: "Civil Lines Estate" },
            { label: "Quality", value: "Zero Rework" }
          ],
          gallery: [
            {
              url: "/projects/lsi-civil-lines-salon.jpg",
              title: "Formal Salon",
              caption: "Neoclassical Formal Salon — Fluted Corinthian Columns, Classical Cornicing & Inlaid Polished Marble Floor",
              type: "site"
            },
            {
              url: "/projects/lsi-civil-lines-grand-hall.jpg",
              title: "Grand Hall",
              caption: "Monumental Grand Hall — Multi-Tiered Crystal Chandelier, Marble Border Inlays & Bespoke Sliding Portals",
              type: "site"
            },
            {
              url: "/projects/lsi-civil-lines-bar-lounge.jpg",
              title: "Bespoke Bar",
              caption: "Artisanal Bar Lounge — Carved Solid Wood Cabinetry, Backlit Filigree Screens & Wine Display Arch",
              type: "site"
            },
            {
              url: "/projects/lsi-civil-lines-fireplace-lounge.jpg",
              title: "Fireplace Lounge",
              caption: "Classical Fireplace Lounge — Rosso Levanto Marble Mantel, Wall Boiserie & Backlit Scenic Fresco Mural",
              type: "site"
            },
            {
              url: "/projects/lsi-civil-lines-master-bath.jpg",
              title: "Master Bath Suite",
              caption: "Ultra-Luxury Master Bath Suite — Freestanding Soaking Tub, Marquina Wall Cladding & Lapis Vanity",
              type: "site"
            }
          ]
        },
        {
          id: "lsi-raipur-residence",
          number: 2,
          title: "Project 02: Raipur Residence",
          location: "Raipur, Chhattisgarh, India",
          image: "/projects/lsi-raipur-atrium.jpg",
          imageCaption: "Project 02 (Raipur Residence) — Double-Height Travertine Atrium, Floral Mosaic Floor Pedestal & Cove Lighting",
          summary: "Turnkey interior execution of a palatial private residence in Raipur, featuring a soaring double-height travertine atrium, bespoke jaali screens, monumental dining hall, and a sculptural helical wooden staircase.",
          highlights: [
            "Monumental double-height travertine marble wall cladding and integrated cove lighting",
            "Intricate floor mosaic art pedestal and precision-cut marble flooring",
            "Sculptural curved helical staircase with seamless solid wood stringer and glass balustrades",
            "Grand dining hall with multi-cylinder crystal chandeliers and bespoke furniture"
          ],
          metrics: [
            { label: "Project", value: "02 of 02" },
            { label: "Residence", value: "Raipur Palatial Estate" },
            { label: "Craftsmanship", value: "Travertine & Helical Joinery" }
          ],
          gallery: [
            {
              url: "/projects/lsi-raipur-atrium.jpg",
              title: "Double-Height Atrium",
              caption: "Double-Height Atrium — Floor-to-Ceiling Travertine Cladding, Mosaic Inlay Pedestal & Recessed Cove Ceilings",
              type: "site"
            },
            {
              url: "/projects/lsi-raipur-living-lounge.jpg",
              title: "Formal Living Lounge",
              caption: "Formal Living Lounge — Waterfall Crystal Chandelier, Travertine Wall with Backlit Screens & Marble Floor Inlays",
              type: "site"
            },
            {
              url: "/projects/lsi-raipur-dining.jpg",
              title: "Grand Dining Hall",
              caption: "High-Ceiling Dining Hall — Cylindrical Crystal Chandeliers, Custom 10-Seater Marble Table & Ornate Venetian Mirror",
              type: "site"
            },
            {
              url: "/projects/lsi-raipur-foyer.jpg",
              title: "Entrance Foyer",
              caption: "Grand Entrance Foyer — Fluted Travertine Accent Wall, Illuminated Art Niches & Geometric Screen Portals",
              type: "site"
            },
            {
              url: "/projects/lsi-raipur-staircase.jpg",
              title: "Helical Staircase",
              caption: "Sculptural Helical Staircase — Custom Curved Hardwood Joinery, Clear Glass Balustrade & Polished Marble Steps",
              type: "site"
            }
          ]
        }
      ]
    },
    {
      id: "sobha-city-gurugram",
      title: "Sobha City",
      category: "High-Rise Development",
      location: "Gurugram, Haryana, India",
      organization: "SOBHA",
      period: "October 2020 – August 2021",
      role: "Senior Engineer",
      summary: "Managed simultaneous site execution across two G+18 high-rise residential towers (A1 & A2), coordinating finishing works in Tower A1 and heavy structural works in Tower A2 to SOBHA's benchmark quality.",
      image: "/projects/sobha-city-tower-1.jpg",
      imageCaption: "Sobha City, Gurugram — G+18 High-Rise Residential Towers (Documented Site Execution)",
      imageType: "verified",
      highlights: [
        "Simultaneous multi-tower management across G+18 floors",
        "Coordinated finishing works in Tower A1 alongside structural works in Tower A2",
        "Aligned complex trade schedules between structural contractors and finishing gangs",
        "Strict adherence to SOBHA's renowned in-house precision quality standards"
      ],
      responsibilities: [
        "Directed daily on-site operations for Towers A1 & A2, ensuring high-tempo structural casting alongside synchronized architectural finishing.",
        "Coordinated with principal contractors, specialized subcontractors, and in-house engineering departments to eliminate bottlenecks.",
        "Maintained rigorous schedule tracking to ensure that progress milestones for both towers advanced without compromise.",
        "Liaised continuously with project architects and design consultants to verify that constructed details adhered to SOBHA's premium specifications."
      ],
      technicalExecution: [
        "Aluminum formwork cycle planning and vertical concrete pumping logistics for G+18 heights",
        "Wet area waterproofing testing and pre-plaster structural plumb and tolerance inspections",
        "Multi-agency trade zoning preventing damage to finished spaces during ongoing upper-floor works"
      ],
      metrics: [
        { label: "Scale", value: "Dual G+18 Towers" },
        { label: "Operations", value: "Structural & Finishing" },
        { label: "Standard", value: "SOBHA Precision Quality" }
      ],
      gallery: [
        {
          url: "/projects/sobha-city-tower-1.jpg",
          title: "Tower Facade",
          caption: "Actual Site Execution — Completed G+18 Residential Tower Facade & Balconies (Sobha City, Gurugram)",
          type: "site"
        },
        {
          url: "/projects/sobha-city-tower-2.jpg",
          title: "Tower Elevation",
          caption: "Podium Elevation View — Tower Verticality & Precision Pre-Cast Finish Standards",
          type: "site"
        },
        {
          url: "/projects/sobha-city-amenities-night.jpg",
          title: "Sports & Amenities",
          caption: "Master Amenities & Sports Arena — Night Aerial View (Clubhouse, Basketball, Tennis & Oval Track)",
          type: "site"
        },
        {
          url: "/projects/sobha-city-aerial-track.jpg",
          title: "Oval Park & Entrance",
          caption: "Central Oval Park & Grand Entrance Canopy — Night Aerial View of Landscaping and Circulation",
          type: "site"
        }
      ]
    },
    {
      id: "oyo-hospitality-projects",
      title: "OYO Property Conversions",
      category: "Hospitality",
      location: "Gurugram & NCR Region, India",
      organization: "OYO",
      period: "April 2019 – September 2020",
      role: "Project Lead",
      summary: "Led property audits, feasibility assessments, fast-track turnkey conversions, and site execution across 19 hotel properties in the NCR region with 12% procurement cost optimization.",
      image: "/projects/oyo-project-1.jpg",
      imageCaption: "OYO Property Conversions — 4 Documented Projects (1, 2, 3, 4)",
      imageType: "verified",
      highlights: [
        "19 on-time commercial property conversions in NCR",
        "12% procurement savings through strategic vendor negotiation",
        "Managed civil transformation, facade upgrades, MEP overhaul & interiors",
        "Full brand standard adherence and pre-launch quality audits"
      ],
      responsibilities: [
        "Led audits of potential hotel and co-living properties, preparing feasibility reports and cost/service estimates.",
        "Supervised civil, interior, and MEP transformations across multiple parallel sites.",
        "Liaised between owners, contractors, and corporate brand teams to secure flawless go-live.",
        "Collaborated with Finance and SCM teams, driving 12% procurement savings."
      ],
      technicalExecution: [
        "Commercial-grade waterproofing, anti-skid tiling, and sanitary fixtures",
        "Space-efficient modular furnishings and high-durability floor finishes",
        "Fire-fighting system integration and dedicated electrical distribution boards",
        "Rapid-cycle snagging protocols ensuring zero-delay commercial openings"
      ],
      metrics: [
        { label: "Portfolio", value: "19 Properties" },
        { label: "Cost Savings", value: "12% Procurement" },
        { label: "Featured Projects", value: "4 Distinct Assets" }
      ],
      subProjects: [
        {
          id: "oyo-project-1",
          number: 1,
          title: "Project 01: NCR Property Conversion",
          location: "NCR Region, India",
          image: "/projects/oyo-project-1.jpg",
          imageCaption: "Project 01 (NCR Property Conversion) — Exterior Facade, Room Interiors & Sanitary Upgrades",
          summary: "Turnkey multi-floor commercial hospitality property transformation featuring structural facade revamping, MEP overhaul, bespoke room fit-outs, and rapid commercial launch.",
          highlights: [
            "Multi-story commercial property conversion",
            "Facade modernization with exterior balcony glazing & lighting",
            "Complete sanitary, plumbing, and wall tiling execution",
            "On-time commercial go-live adherence under strict operational timelines"
          ],
          metrics: [
            { label: "Project", value: "01 of 04" },
            { label: "Scope", value: "Turnkey Conversion" },
            { label: "Delivery", value: "On-Time Go-Live" }
          ]
        },
        {
          id: "oyo-project-2",
          number: 2,
          title: "Project 02: GRG 1608, Gurgaon",
          assetId: "GRG 1608",
          location: "Gurgaon, Haryana, India",
          image: "/projects/oyo-grg-1608.png",
          imageCaption: "Project 02 (GRG 1608, Gurgaon) — G+5 Facade, Furnished Rooms, Recreation Arena & Utilities",
          summary: "Large-scale G+5 co-living building conversion featuring modern residential accommodations, common recreation lounge (table tennis, indoor games), room fit-outs, and utility infrastructure.",
          highlights: [
            "G+5 multi-story co-living residential development",
            "Recreational common areas including table tennis & lounge zones",
            "Standardized furnished guest rooms with workstations",
            "Complete sanitary, electrical, and drainage infrastructure overhaul"
          ],
          metrics: [
            { label: "Project", value: "02 of 04" },
            { label: "Asset ID", value: "GRG 1608" },
            { label: "Scale", value: "G+5 Multi-Unit" }
          ]
        },
        {
          id: "oyo-project-3",
          number: 3,
          title: "Project 03: GRG 1845, Gurgaon",
          assetId: "GRG 1845",
          location: "Gurgaon, Haryana, India",
          image: "/projects/oyo-grg-1845.png",
          imageCaption: "Project 03 (GRG 1845, Gurgaon) — Facade Architecture, Reception Lounge, Dining Hall & Accommodations",
          summary: "G+4 boutique co-living building execution complete with perimeter gatehouse, formal OYO Life reception lounge, dining facilities, and furnished multi-occupancy rooms.",
          highlights: [
            "Turnkey building transformation into branded OYO Life residence",
            "Entry gatehouse, exterior facade finish, and branded reception foyer",
            "Fully furnished residential suites with custom millwork",
            "Dedicated community dining and shared amenities"
          ],
          metrics: [
            { label: "Project", value: "03 of 04" },
            { label: "Asset ID", value: "GRG 1845" },
            { label: "Typology", value: "G+4 Co-Living" }
          ]
        },
        {
          id: "oyo-project-4",
          number: 4,
          title: "Project 04: GRG 1877, Gurgaon",
          assetId: "GRG 1877",
          location: "Gurgaon, Haryana, India",
          image: "/projects/oyo-grg-1877.png",
          imageCaption: "Project 04 (GRG 1877, Gurgaon) — Balcony Facade, Studio Living Units & Internal Circulation",
          summary: "Comprehensive property conversion featuring ornamental balcony exterior facade, twin/triple studio room layouts, corridor design, and modern residential amenity zones.",
          highlights: [
            "Architectural facade restoration with ornamental balcony balustrades",
            "Space-efficient twin and triple sharing studio layouts",
            "Corridor directional signage, notice hubs, and safety compliance",
            "Appliance installations including individual refrigerators and smart TVs"
          ],
          metrics: [
            { label: "Project", value: "04 of 04" },
            { label: "Asset ID", value: "GRG 1877" },
            { label: "Turnaround", value: "Fast-Track" }
          ]
        }
      ]
    },
    {
      id: "the-haveli-alokik-group",
      title: "The Haveli, Dhanbad",
      category: "High-Rise Development",
      location: "Dhanbad, Jharkhand, India",
      organization: "Alokik Group",
      period: "April 2017 – April 2019",
      role: "Site Engineer",
      summary: "Oversaw construction execution for 'The Haveli' development, comprising two G+10 residential towers and one G+4 commercial block, achieving zero-delay milestone billing and safety compliance.",
      image: "/projects/the-haveli-dhanbad.jpg",
      imageCaption: "The Haveli, Dhanbad — G+10 Residential Towers & G+4 Commercial Block (Documented Site Execution)",
      imageType: "verified",
      highlights: [
        "Two G+10 residential towers and one G+4 commercial block",
        "Supervised RCC structural works and architectural finishing",
        "Achieved zero-delay milestone billing through accurate progress reporting",
        "Coordinated supplier logistics for on-time delivery of critical structural materials"
      ],
      responsibilities: [
        "Supervised daily RCC structural pours, rebar detailing, shuttering checks, and subsequent masonry and plaster finishing.",
        "Enforced strict on-site occupational safety standards and engineering quality compliance across all contractor crews.",
        "Prepared detailed progress documentation, contractor measurement books, and bills, securing zero-delay milestone billing.",
        "Coordinated with steel mills, cement distributors, and local suppliers to guarantee timely delivery of critical construction materials."
      ],
      technicalExecution: [
        "Reinforced cement concrete (RCC) quality testing including slump tests, cube compressive tests, and bar bending schedule (BBS) audits",
        "External plastering with water-repellent compounds and expansion joint detailing",
        "Contractor billing verification based on verified physical on-site measurements"
      ],
      metrics: [
        { label: "Configuration", value: "2x G+10 & 1x G+4" },
        { label: "Milestone Billing", value: "Zero Delay" },
        { label: "Supply Chain", value: "On-Time Critical Materials" }
      ],
      gallery: [
        {
          url: "/projects/the-haveli-dhanbad.jpg",
          caption: "Actual Site Execution — Completed G+10 Tower Facade & Stilt Parking (Dhanbad)",
          type: "site",
        },
        {
          url: "/projects/the-haveli-render.jpg",
          caption: "Architectural 3D Visualization — Traditional Haveli Motifs, Jharokhas & Crown Chhatris",
          type: "render",
        },
        {
          url: "/projects/the-haveli-plan.jpg",
          caption: "Stilt Floor Plan & Master Layout — Circulation, Parking & Structural Grid",
          type: "plan",
        },
      ]
    }
  ] as Project[],

  experienceTimeline: [
    {
      id: "exp-vbl",
      company: "Varun Beverages Limited",
      role: "Manager",
      period: "January 2026 – Present",
      location: "New Delhi, Delhi, India",
      type: "Construction Management",
      overview: "Leading on-ground construction execution on a high-value private luxury farmhouse project in New Delhi, reporting directly to the Project Director on owner-facing coordination.",
      achievements: [
        "Leading on-ground execution of a high-value luxury farmhouse project, reporting directly to the Project Director on owner-facing coordination.",
        "Managing procurement and vendor coordination across stone cladding, hardware, lighting, and interior fit-out scopes, including quantity takeoffs and PO reconciliation.",
        "Coordinating with architects, design consultants, and specialist vendors to align execution with the owner's vision and finish-quality standards.",
        "Driving documentation discipline through structured site visit minutes and progress tracking to maintain transparency with ownership."
      ]
    },
    {
      id: "exp-aamor",
      company: "Aamor Inox Limited",
      role: "Construction Manager",
      period: "December 2023 – January 2026",
      location: "New Delhi, Delhi, India",
      type: "Construction Management",
      overview: "Spearheaded end-to-end execution of a high-value luxury farmhouse, overseeing budgets, schedules, resource allocation, and quality benchmarks.",
      achievements: [
        "Spearheading the end-to-end execution of a high-value luxury farmhouse, overseeing budgets, schedules, and quality benchmarks.",
        "Coordinating with architects, clients, subcontractors, and regulatory authorities to ensure seamless communication and timely approvals.",
        "Optimized resource allocation (labor, materials, equipment), reducing project delays by 15%.",
        "Implemented advanced quality control measures, ensuring adherence to luxury design standards and flawless finishes.",
        "Proactively identified and mitigated risks, ensuring the project stays within timeline and budget."
      ]
    },
    {
      id: "exp-lasorogeeka",
      company: "La Sorogeeka Interiors",
      role: "Senior Engineer",
      period: "August 2021 – December 2023",
      location: "Noida, Uttar Pradesh, India",
      type: "Quality & Interiors",
      overview: "Led pan-India luxury interior projects, acting as Internal Auditor & Quality Lead for the Quality Management Department on projects worth ₹300Cr+.",
      achievements: [
        "Conducted quarterly audits and review meetings, improving compliance with ISO standards by 20%.",
        "Managed entire site operations—from project quality planning to handover—on projects worth ₹300Cr+.",
        "Reviewed BOQs, approved material submittals & ITPs, ensuring 100% adherence to specifications.",
        "Designed & delivered training programs, enhancing team productivity and reducing rework costs by 10%.",
        "Regularly interfaced with clients, architects, and designers to ensure quality aligned with their vision."
      ]
    },
    {
      id: "exp-sobha",
      company: "Sobha Ltd.",
      role: "Senior Engineer",
      period: "October 2020 – August 2021",
      location: "Gurugram, Haryana, India",
      type: "Civil Engineering",
      overview: "Managed site execution on the prestigious Sobha City luxury residential project across two simultaneous high-rise towers (A1 & A2, G+18 floors).",
      achievements: [
        "Managed site execution across two simultaneous high-rise towers (A1 & A2), each comprising G+18 floors, covering finishing works in A1 and structural works in A2.",
        "Coordinated with contractors, subcontractors, and internal teams to ensure smooth parallel execution across both towers without compromise on quality benchmarks.",
        "Monitored progress against schedules, ensuring alignment between structural and finishing timelines across both blocks.",
        "Liaised with architects and design consultants to ensure execution adhered to Sobha's premium finish standards."
      ]
    },
    {
      id: "exp-oyo",
      company: "OYO",
      role: "Project Lead",
      period: "April 2019 – September 2020",
      location: "Gurugram, Haryana, India",
      type: "Hospitality Infrastructure",
      overview: "Led audits of potential hotel properties, feasibility assessments, site execution, and vendor coordination across NCR.",
      achievements: [
        "Led audits of potential hotel properties, preparing feasibility reports and accurate cost/service estimates.",
        "Executed multiple property conversions, achieving 19 on-time hotel launches in NCR region.",
        "Managed site execution, vendor coordination, and quality assurance to ensure premium guest experience.",
        "Collaborated with Finance, SCM, and Vendor Management teams to achieve cost savings of 12% in procurement."
      ]
    },
    {
      id: "exp-alokik",
      company: "Alokik Group",
      role: "Site Engineer",
      period: "April 2017 – April 2019",
      location: "Dhanbad Area, Jharkhand, India",
      type: "Civil Engineering",
      overview: "Oversaw the execution of 'The Haveli' project, comprising two G+10 residential towers and one G+4 commercial block.",
      achievements: [
        "Oversaw the execution of ‘The Haveli’ project, comprising two G+10 residential towers and one G+4 commercial block.",
        "Supervised RCC & finishing works, ensuring compliance with safety & quality standards.",
        "Prepared progress reports & contractor bills, achieving zero-delay milestone billing.",
        "Coordinated with contractors & suppliers, enabling on-time delivery of critical materials."
      ]
    },
    {
      id: "exp-laundry",
      company: "College Laundry",
      role: "Co-Founder",
      period: "March 2016 – January 2017",
      location: "Bhubaneswar, Odisha, India",
      type: "Entrepreneurship",
      overview: "Founded and scaled an online laundry startup, serving 3 colleges within 3 months of launch; gained early hands-on operational leadership.",
      achievements: [
        "Founded and scaled an online laundry startup, serving 3 colleges within 3 months of launch.",
        "Managed end-to-end operations including team hiring, logistics, and customer acquisition.",
        "Gained hands-on experience in entrepreneurship, operations, and client management."
      ]
    },
    {
      id: "exp-durga",
      company: "M/s Jai Maa Durga Construction",
      role: "Internship",
      period: "December 2015 – February 2016",
      location: "Dhanbad, Jharkhand, India",
      type: "Internship",
      overview: "Early-career civil engineering internship assisting in the construction of an S&T building and railway platform upgradation.",
      achievements: [
        "Assisted in the construction of an S&T building and railway platform upgradation at Jamuniatand station.",
        "Coordinated with Indian Railways inspectors, ensuring timely completion and quality delivery."
      ]
    }
  ] as ExperienceItem[],

  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      field: "Civil Engineering",
      institution: "Gandhi Institute for Technological Advancement",
      period: "Undergraduate Degree",
      description: "Comprehensive foundation in structural mechanics, concrete technology, construction surveying, soil engineering, and project planning."
    },
    {
      degree: "Intermediate (Class XII)",
      field: "Science",
      institution: "D A V Public School, Bokaro Steel City",
      period: "Higher Secondary",
      description: "Rigorous focus on advanced physics, chemistry, and mathematics."
    },
    {
      degree: "Matriculation (Class X)",
      field: "Mathematics & Science",
      institution: "Saraswati Vidya Mandir, Sinidih",
      period: "March 2009 – April 2011",
      description: "Secondary schooling with academic excellence in foundational sciences and mathematics."
    }
  ],

  certificationsAndTraining: {
    credentials: [
      {
        title: "Lean Six Sigma Green Belt (LSSGB) I",
        type: "Professional Certification",
        authority: "Six Sigma Quality Standard",
        focus: "Process optimization, DMAIC framework, defect reduction, and root-cause analysis in execution environments."
      }
    ],
    trainingCourses: [
      {
        title: "Quality Management Foundations",
        type: "Professional Course",
        focus: "Core principles of Total Quality Management (TQM), standard operating procedures, and continuous process improvement."
      },
      {
        title: "How to Write Effortless Quality Procedures & SOPs for ISO",
        type: "Professional Course",
        focus: "Drafting robust, audit-ready standard operating procedures and inspection & test plans (ITPs) aligned with ISO compliance."
      },
      {
        title: "Time and Productivity Management Techniques",
        type: "Professional Course",
        focus: "Critical path time allocation, executive focus, prioritization, and site-level productivity systems."
      },
      {
        title: "Advice for Leaders During a Crisis",
        type: "Professional Course",
        focus: "Contingency planning, resilient on-site decision making, risk mitigation, and team alignment under project pressure."
      },
      {
        title: "Master Confident Presentations",
        type: "Professional Course",
        focus: "High-impact stakeholder communication, client design reviews, and transparent project progress reporting."
      }
    ],
    honors: [
      {
        title: "Best Team of the Year — QA/QC Team (2023)",
        context: "Awarded by Teraciel Group / La Sorogeeka for zero-rework execution and quality oversight across luxury turnkey interiors."
      },
      {
        title: "Emerging Employee of the Year (2022)",
        context: "Presented at Teraciel Group 8th Annual Awards with engraved crystal diamond trophy for site leadership and governance."
      },
      {
        title: "Employee of the Month (June 2023)",
        context: "Awarded for independent site execution and de-snagging on P284 Devyani Project Delhi in the absence of a site engineer."
      },
      {
        title: "Best New Joinee (June 2019)",
        context: "Awarded by OYO Life Business Head for rapid onboarding and on-time delivery across NCR property conversions."
      }
    ],
    awardsAndRecognitions: [
      {
        id: "award-ceremony-qaqc-2023",
        title: "Best Team of the Year — QA/QC",
        organization: "Teraciel Group / La Sorogeeka",
        date: "Annual Day 2023",
        category: "Quality Governance",
        issuer: "Executive Leadership, Teraciel Group",
        citation: "Recognized on stage with the QA/QC Team of the Year crystal award for setting exceptional quality benchmarks and zero-rework execution across ultra-luxury fit-out developments.",
        image: "/awards/award-ceremony-best-team-qaqc.png",
        badge: "Annual Corporate Honor"
      },
      {
        id: "emerging-employee-2022",
        title: "Emerging Employee of the Year",
        organization: "Teraciel Group / La Sorogeeka",
        date: "20th August 2022",
        category: "Leadership & Impact",
        issuer: "Managing Director, Teraciel Group",
        citation: "Presented with the 8th Annual Teraciel Group Certificate of Appreciation and customized crystal diamond trophy in recognition of rapid operational ascension, technical diligence, and site governance.",
        image: "/awards/teraciel-emerging-employee-trophy.png",
        badge: "Individual Excellence Trophy"
      },
      {
        id: "employee-of-month-devyani",
        title: "Employee of the Month — P284 Devyani Project",
        organization: "La Sorogeeka Interiors India",
        date: "9th June 2023",
        category: "Site Execution & Snagging",
        issuer: "General Manager - HR",
        citation: "You are the star of our team who shines and inspires us every single day. You did a great job in P284 Devyani Project Delhi in the absence of any site engineer. Your contribution in the execution and snagging/de-snagging works is highly appreciated.",
        image: "/awards/la-sorogeeka-employee-of-month.png",
        badge: "Execution Under Pressure"
      },
      {
        id: "oyo-best-new-joinee-2019",
        title: "Best New Joinee — Certificate of Appreciation",
        organization: "OYO Life",
        date: "4th June 2019",
        category: "Rapid Mobilization",
        issuer: "Ayush Agarwal, Business Head",
        citation: "Certificate of Appreciation presented for outstanding initial onboarding performance, swift vendor coordination, and proactive project management across 19 fast-track hotel property conversions.",
        image: "/awards/oyo-best-joinee-certificate.png",
        badge: "Rapid Impact Award"
      }
    ] as AwardItem[]
  }
};
