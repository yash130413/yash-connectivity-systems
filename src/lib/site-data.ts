import barcode from "@/assets/prod-barcode.jpg";
import ribbons from "@/assets/prod-ribbons.jpg";
import packing from "@/assets/prod-packing.jpg";
import cableties from "@/assets/prod-cableties.jpg";
import connectors from "@/assets/prod-connectors.jpg";
import heatshrink from "@/assets/prod-heatshrink.jpg";
import conduit from "@/assets/prod-conduit.jpg";

export const COMPANY = {
  name: "Yash Connectivity Systems",
  short: "Yash Connectivity Systems",
  tagline: "Industrial Labeling & Packaging Solutions",
  phone: "9015669917",
  phoneIntl: "+919015669917",
  email: "yash.consys@gmail.com",
  address: "2880, Lane-4, Laxman Vihar, Phase-2, Gurugram – 122001",
  whatsapp: "https://wa.me/919015669917",
  hours: "Mon – Sat · 9:30 AM – 7:00 PM",
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  short: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
  applications: string[];
  industries: string[];
  benefits: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "barcode-labels",
    name: "Barcode Labels",
    category: "Barcode Labels",
    short: "Direct thermal & thermal transfer labels in chromo, polyester, and void grades.",
    image: barcode,
    description:
      "High-precision barcode labels engineered for logistics, warehousing, and product identification. Available in multiple substrates with strong adhesives suitable for cartons, polybags, metal, and curved surfaces.",
    specs: [
      { label: "Material", value: "Chromo / Polyester / PP / Void" },
      { label: "Sizes", value: "Custom from 15×10 mm to 150×100 mm" },
      { label: "Core", value: "25 mm / 40 mm / 76 mm" },
      { label: "Print Method", value: "Thermal Transfer / Direct Thermal" },
    ],
    applications: ["Carton labeling", "Asset tagging", "Pharma serialization", "Warehouse SKU"],
    industries: ["E-Commerce", "Automotive", "White Goods", "Export Houses"],
    benefits: ["Smudge & tear resistant", "Strong permanent adhesive", "Custom sizes & rolls", "Bulk MOQs available"],
  },
  {
    slug: "thermal-transfer-ribbons",
    name: "Thermal Transfer Ribbons",
    category: "Ribbons",
    short: "Wax, wax-resin and resin ribbons compatible with all major TTO printers.",
    image: ribbons,
    description:
      "Premium thermal transfer ribbons that deliver dense, scannable barcodes. Wax for paper labels, wax-resin for synthetic, and pure resin for harsh chemical or high-temperature environments.",
    specs: [
      { label: "Grades", value: "Wax / Wax-Resin / Resin" },
      { label: "Widths", value: "30 mm – 220 mm" },
      { label: "Length", value: "300 m / 450 m" },
      { label: "Compatibility", value: "Zebra, TSC, Honeywell, Postek" },
    ],
    applications: ["Carton barcoding", "Garment tags", "Logistics labels", "Cold-chain labels"],
    industries: ["Garment", "Food", "Export Houses", "E-Commerce"],
    benefits: ["Dense black print", "Anti-static back coating", "Universal printer fit", "Bulk pricing"],
  },
  {
    slug: "packing-materials",
    name: "Packing Materials",
    category: "Packing Materials",
    short: "Cartons, stretch films, BOPP tapes, bubble wraps and void fill.",
    image: packing,
    description:
      "End-to-end secondary packaging — corrugated cartons, stretch & shrink films, BOPP tapes, bubble wrap and void fill — supplied to factories, fulfilment centres and export houses.",
    specs: [
      { label: "Cartons", value: "3-ply / 5-ply / 7-ply" },
      { label: "Stretch Film", value: "17–25 micron" },
      { label: "BOPP Tape", value: "40 / 48 / 72 mm" },
      { label: "Bubble Wrap", value: "10 mm / 20 mm" },
    ],
    applications: ["Export packaging", "E-commerce dispatch", "Pallet wrapping", "Fragile protection"],
    industries: ["E-Commerce", "Export Houses", "White Goods", "Food"],
    benefits: ["Pan-India delivery", "Custom print on tape & cartons", "Bulk MOQs", "Tested for transit"],
  },
  {
    slug: "cable-ties",
    name: "Cable Ties",
    category: "Cable Ties",
    short: "Nylon 6/6 self-locking ties — UV stabilised, indoor & outdoor grade.",
    image: cableties,
    description:
      "Nylon 6/6 self-locking cable ties offering high tensile strength, low flammability (UL94 V-2) and weather resistance. Available in natural, black UV-grade and colour-coded variants.",
    specs: [
      { label: "Material", value: "Nylon 6/6 (PA66)" },
      { label: "Lengths", value: "100 mm – 900 mm" },
      { label: "Tensile", value: "8 kg – 80 kg" },
      { label: "Grades", value: "Natural / UV Black / Coloured" },
    ],
    applications: ["Wire harnessing", "Cable bundling", "Agriculture", "Construction"],
    industries: ["Automotive", "White Goods", "Packaging"],
    benefits: ["Strong self-locking head", "UV & weather resistant", "RoHS compliant", "Custom colours"],
  },
  {
    slug: "insulated-connectors",
    name: "Insulated Connectors",
    category: "Insulated Connectors",
    short: "Pre-insulated ring, fork, pin and butt terminals for wire harnesses.",
    image: connectors,
    description:
      "Pre-insulated lugs and terminals engineered for reliable, vibration-resistant connections in automotive wire harnesses, control panels and white-goods assemblies.",
    specs: [
      { label: "Range", value: "0.5 – 6.0 sq.mm" },
      { label: "Insulation", value: "PVC / Nylon" },
      { label: "Types", value: "Ring / Fork / Pin / Butt / Bullet" },
      { label: "Plating", value: "Tin-plated copper" },
    ],
    applications: ["Wire harnesses", "Switchgear", "Panel boards", "EV assemblies"],
    industries: ["Automotive", "White Goods"],
    benefits: ["Vibration resistant", "Colour coded by size", "Crimp-tested", "RoHS compliant"],
  },
  {
    slug: "heat-shrink-sleeves",
    name: "Heat Shrink Sleeves",
    category: "Heat Shrink Sleeves",
    short: "2:1 polyolefin sleeves for insulation, strain relief and identification.",
    image: heatshrink,
    description:
      "Flame-retardant polyolefin heat shrink tubing with 2:1 shrink ratio. Used across automotive harnesses, electronics manufacturing and battery packs for insulation and identification.",
    specs: [
      { label: "Material", value: "Cross-linked Polyolefin" },
      { label: "Ratio", value: "2:1" },
      { label: "Sizes", value: "1.5 mm – 100 mm" },
      { label: "Temperature", value: "-55°C to +125°C" },
    ],
    applications: ["Wire insulation", "Strain relief", "Battery pack covering", "Colour coding"],
    industries: ["Automotive", "White Goods"],
    benefits: ["Flame retardant", "Multiple colours", "RoHS compliant", "Bulk cuts available"],
  },
  {
    slug: "conduit-plastics",
    name: "Conduit Plastics",
    category: "Conduit Plastics",
    short: "Flexible corrugated PP / PA conduits for cable routing & protection.",
    image: conduit,
    description:
      "Flexible split & non-split corrugated conduits in polypropylene and polyamide for safe routing of cables in machines, harnesses and panels. Resistant to abrasion, chemicals and temperature.",
    specs: [
      { label: "Material", value: "PP / PA6 / PA12" },
      { label: "Sizes", value: "AD7 – AD54.5" },
      { label: "Type", value: "Slit / Closed" },
      { label: "Temperature", value: "-40°C to +120°C" },
    ],
    applications: ["Wire routing", "Machine harnesses", "Panel wiring", "Robotic arms"],
    industries: ["Automotive", "White Goods", "Packaging"],
    benefits: ["Flexible & tough", "Chemical resistant", "Easy snap-fit", "Available in bulk"],
  },
];

export const INDUSTRIES = [
  { slug: "automotive", name: "Automotive", desc: "Wire harness terminals, heat shrink, cable ties & barcode labels for OEMs and Tier-1 suppliers." },
  { slug: "food", name: "Food Industry", desc: "Food-grade packing materials and cold-chain labels for processing & distribution." },
  { slug: "garment", name: "Garment Industry", desc: "Care labels, price tags, ribbons and packaging for domestic and export garment makers." },
  { slug: "packaging", name: "Packaging Industry", desc: "Cartons, films, tapes and barcode labels for converters and contract packers." },
  { slug: "export", name: "Export Houses", desc: "Compliant shipping marks, barcode labels and export-grade packaging." },
  { slug: "white-goods", name: "White Goods", desc: "Connectors, sleeves, ties and barcode labels for appliance manufacturers." },
  { slug: "ecommerce", name: "E-Commerce", desc: "Direct thermal labels, polybags, tapes and void fill for fulfilment centres." },
];

export const CLIENTS = ["Amazon", "Haier", "Carrier", "Schneider Electric", "Hitachi", "Minda", "Revolt", "Richaglobal"];

export const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "100+", label: "Clients Served" },
  { value: "7+", label: "Product Categories" },
  { value: "Pan India", label: "Supply Network" },
];

export const WHY_US = [
  { title: "Quality Products", desc: "Sourced from audited manufacturers with consistent batch quality." },
  { title: "Competitive Pricing", desc: "Direct trade pricing with transparent quotations for bulk orders." },
  { title: "Fast Delivery", desc: "Ready stocks of fast-moving SKUs with same-day dispatch options." },
  { title: "Technical Support", desc: "Application engineers help you choose the right spec for your line." },
  { title: "Reliable Supply Chain", desc: "Multi-source procurement keeps your production never starved." },
  { title: "Industry Expertise", desc: "A decade of serving auto, white-goods, exports and packaging leaders." },
];

export const STEPS = [
  { n: "01", title: "Share Requirement", desc: "Send your specs, drawings or sample images on WhatsApp or our quote form." },
  { n: "02", title: "Receive Quotation", desc: "Get an itemised quote with MOQs, lead times and delivery options." },
  { n: "03", title: "Approve Order", desc: "Confirm the PO; we issue order acknowledgement and production plan." },
  { n: "04", title: "Fast Delivery", desc: "Dispatched pan-India with tracking and on-time delivery commitment." },
];

export const TESTIMONIALS = [
  { quote: "Yash Connectivity has been our trusted partner for barcode labels and ribbons for over four years. Consistent quality, on-time delivery.", name: "Procurement Head", company: "Tier-1 Auto Supplier" },
  { quote: "Their cable ties and heat shrink sleeves pass our inspection every batch. Pricing is competitive even at high volumes.", name: "Purchase Manager", company: "White Goods Manufacturer" },
  { quote: "Reliable supplier for our fulfilment centre — direct thermal labels are always in stock and dispatched the same day.", name: "Operations Lead", company: "E-Commerce Logistics" },
];

export const BLOG_POSTS = [
  { slug: "what-are-barcode-labels", title: "What Are Barcode Labels? A Buyer's Guide", excerpt: "Material grades, adhesives, sizes and how to pick the right label for your line.", read: "6 min read", tag: "Barcode" },
  { slug: "how-thermal-transfer-printing-works", title: "How Thermal Transfer Printing Works", excerpt: "Inside the print head — wax, wax-resin and resin ribbons explained.", read: "5 min read", tag: "Printing" },
  { slug: "cable-tie-selection-guide", title: "Cable Tie Selection Guide", excerpt: "Tensile strength, UV resistance and flammability ratings demystified.", read: "7 min read", tag: "Cable Ties" },
  { slug: "heat-shrink-sleeve-applications", title: "Heat Shrink Sleeve Applications", excerpt: "Where 2:1 polyolefin sleeves win over PVC and other insulation methods.", read: "5 min read", tag: "Heat Shrink" },
  { slug: "packaging-material-guide", title: "Packaging Material Guide for Exporters", excerpt: "Choosing carton plies, stretch films and tapes for international transit.", read: "8 min read", tag: "Packaging" },
];
