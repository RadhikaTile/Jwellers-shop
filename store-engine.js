/**
 * AURA & ARTISAN - Unified Dynamic Store Engine
 * Version 1.0 (2026)
 * Handles: Dynamic Catalog, Live Gold/Silver Metal Pricing Formula,
 * Inventory Management, Order Processing, Shipping Rules, and Coupon Verification.
 */

(function (global) {
  'use strict';

  // Storage Keys
  const STORAGE_KEYS = {
    PRODUCTS: 'AA_STORE_PRODUCTS_V1',
    METAL_RATES: 'AA_METAL_RATES_V1',
    ORDERS: 'AA_STORE_ORDERS_V1',
    COUPONS: 'AA_COUPONS_V1',
    SHIPPING: 'AA_SHIPPING_SETTINGS_V1',
    SETTINGS: 'AA_STORE_SETTINGS_V1'
  };

  // ---------------------------------------------------------------------------
  // 1. DEFAULT BENCHMARK METAL RATES (Indian Retail & IBJA Benchmarks)
  // ---------------------------------------------------------------------------
  const DEFAULT_METAL_RATES = {
    gold24k: 7850,       // ₹ / gram (999 pure gold)
    gold22k: 7196,       // ₹ / gram (916 hallmark gold)
    gold18k: 5888,       // ₹ / gram (750 jewellery gold)
    gold14k: 4592,       // ₹ / gram (585 everyday gold)
    silver999: 94.50,    // ₹ / gram (fine silver)
    silver925: 87.40,    // ₹ / gram (sterling silver)
    usdInrRate: 86.80,   // USD to INR conversion rate
    isAutoLive: true,    // Auto-fetch from live API
    apiProvider: 'gold-api.com',
    defaultMakingPercent: 14, // 14% making charges
    gstPercent: 3,       // 3% standard Indian GST on jewellery
    lastUpdated: new Date().toISOString()
  };

  // ---------------------------------------------------------------------------
  // 2. DEFAULT PRODUCT CATALOG (Baseline Seed Data)
  // ---------------------------------------------------------------------------
  const BASELINE_PRODUCTS = [
  {
    "id": 1,
    "title": "The Meera Royal Meenakari Kadas (Pair)",
    "sku": "AA-VJ-001",
    "brand": "Jaipur Artisanal • Vijay Bangles Specialist",
    "category": "Meera Meenakari Bangles",
    "price": 2850,
    "origPrice": 3999,
    "discount": "29% OFF",
    "rating": 5,
    "reviewsCount": 142,
    "badge": "Best Seller",
    "stock": 18,
    "metalType": "brass-pvd",
    "metalWeight": 38,
    "makingCharges": 15,
    "gemstoneCost": 450,
    "isDynamicPricing": false,
    "image": "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
    "secondaryImage": "https://images.unsplash.com/photo-1611591475870-761376e10793?auto=format&fit=crop&w=700&q=80",
    "description": "Directly inspired by the legendary Meera Meenakari bangles of Tripolia Bazaar, Jaipur. Hand-enameled in high-fire kiln at 800°C with vivid peacock motifs.",
    "specs": {
      "Craft Style": "Authentic Jaipuri Meenakari (Hand-enameled)",
      "Core Metal": "Pure Jewellers Brass with 24K Micro Gold Plating",
      "Locking System": "Hidden Screw-pin locking for broad/slim hands",
      "Water Resistance": "Splash-proof enamel"
    }
  },
  {
    "id": 2,
    "title": "Aura 18K Anti-Tarnish Minimalist Ring & Cuff",
    "sku": "AA-AT-002",
    "brand": "Demi-Fine Luxury • Chahana & Raviva Style",
    "category": "18K Anti-Tarnish (Everyday)",
    "price": 1299,
    "origPrice": 1899,
    "discount": "31% OFF",
    "rating": 4.8,
    "reviewsCount": 318,
    "badge": "100% Waterproof",
    "stock": 35,
    "metalType": "gold-18k",
    "metalWeight": 4.2,
    "makingCharges": 12,
    "gemstoneCost": 200,
    "isDynamicPricing": false,
    "image": "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80",
    "secondaryImage": "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=700&q=80",
    "description": "An enduring icon of grace. Bonded with 18K titanium PVD gold that guarantees zero tarnishing through showers, workouts, and ocean swims.",
    "specs": {
      "Core Material": "Surgical Grade 316L Stainless Steel",
      "Plating": "18K Physical Vapor Deposition (PVD) Gold",
      "Tarnish Resistance": "Lifetime Color Guarantee (100% Waterproof)"
    }
  },
  {
    "id": 3,
    "title": "Padmavati Pachi Kundan & Emerald Choker Set",
    "sku": "AA-PK-003",
    "brand": "Royal Heritage • Sawwaisa & Khazana Style",
    "category": "Pachi Kundan & Polki",
    "price": 4950,
    "origPrice": 7200,
    "discount": "31% OFF",
    "rating": 5,
    "reviewsCount": 95,
    "badge": "Bridal Choice",
    "stock": 9,
    "metalType": "gold-22k",
    "metalWeight": 14.5,
    "makingCharges": 18,
    "gemstoneCost": 1800,
    "isDynamicPricing": true,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
    "secondaryImage": "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=700&q=80",
    "description": "Heirloom Rajputana bridal choker set featuring open-back Pachi Kundan foil setting, natural hydro-emerald tumblers, and hand-strung cultured Basra pearl clusters.",
    "specs": {
      "Setting": "Pachi Kundan with 24K pure gold leaf foil lining",
      "Stones": "Lab-certified uncut Polki stones & Hydro Emeralds",
      "Package Includes": "1 Royal Choker + 2 Matching Chandbalis + 1 Maang Tikka"
    }
  },
  {
    "id": 4,
    "title": "Feeling Chhail Mirror-Work Ghungroo Chandbalis",
    "sku": "AA-SL-004",
    "brand": "Tribal Bohemian • Chhail Style",
    "category": "Chhail Oxidized Silver",
    "price": 1450,
    "origPrice": 1999,
    "discount": "27% OFF",
    "rating": 4.7,
    "reviewsCount": 87,
    "badge": "Handcrafted",
    "stock": 14,
    "metalType": "silver-925",
    "metalWeight": 24,
    "makingCharges": 16,
    "gemstoneCost": 150,
    "isDynamicPricing": true,
    "image": "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&w=800&q=80",
    "secondaryImage": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80",
    "description": "Rajasthan festive spirit captured in 925 German Silver with micro mirrors and delicate ghungroos that produce a subtle melodious chime.",
    "specs": {
      "Material": "Hallmarked 925 German Silver with Antique Patina",
      "Weight": "24 grams per pair (Feather-balanced hollow core)",
      "Closure": "Hypoallergenic push-back with comfort cushion"
    }
  },
  {
    "id": 5,
    "title": "Sovereign 6mm Cuban Chain & Signet Set",
    "sku": "AA-MN-005",
    "brand": "Modern Men's Luxe • Swashaa Style",
    "category": "Swashaa Men's Luxe",
    "price": 1699,
    "origPrice": 2499,
    "discount": "32% OFF",
    "rating": 4.8,
    "reviewsCount": 110,
    "badge": "Men's Classic",
    "stock": 20,
    "metalType": "brass-pvd",
    "metalWeight": 45,
    "makingCharges": 12,
    "gemstoneCost": 0,
    "isDynamicPricing": false,
    "image": "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
    "secondaryImage": "https://images.unsplash.com/photo-1611591475878-1a74288029c7?auto=format&fit=crop&w=700&q=80",
    "description": "Engineered for the modern gentleman. Precision diamond-cut beveled Cuban links paired with an open-ended brushed steel wrist kada.",
    "specs": {
      "Chain Spec": "6mm width, 22 inches length with lobster clasp",
      "Kada Spec": "Semi-flexible 65mm inner diameter oval fit"
    }
  },
  {
    "id": 6,
    "title": "Baroque Pearl & Polki Multi-Strand Rani Haar",
    "sku": "AA-PR-006",
    "brand": "Royal Heritage • Nazaakat Basra Style",
    "category": "Nazaakat Basra Pearls",
    "price": 3450,
    "origPrice": 4890,
    "discount": "29% OFF",
    "rating": 4.9,
    "reviewsCount": 64,
    "badge": "Royal Pearls",
    "stock": 6,
    "metalType": "gold-22k",
    "metalWeight": 22,
    "makingCharges": 18,
    "gemstoneCost": 2600,
    "isDynamicPricing": true,
    "image": "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80",
    "secondaryImage": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80",
    "description": "Five delicate tiers of cultured Basra pearls woven with hand-enameled ruby and emerald spacers, crowned by a grand uncut Polki pendant.",
    "specs": {
      "Pearl Type": "Grade AAA Hand-knotted cultured seed pearls",
      "Pendant Core": "Hallmarked Brass with 24K Micro Gold dipping"
    }
  },
  {
    "id": 7,
    "title": "Goddess Lakshmi Nakshi & Kemp Coin Choker",
    "sku": "AA-TM-007",
    "brand": "Devotional Craft • Temple Grandeur Style",
    "category": "South Indian Temple Nakshi",
    "price": 4200,
    "origPrice": 5999,
    "discount": "30% OFF",
    "rating": 5,
    "reviewsCount": 88,
    "badge": "Temple Antique",
    "stock": 8,
    "metalType": "gold-22k",
    "metalWeight": 18,
    "makingCharges": 18,
    "gemstoneCost": 1200,
    "isDynamicPricing": true,
    "image": "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=80",
    "secondaryImage": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80",
    "description": "Antique matte gold featuring hand-embossed Lakshmi motifs, Kemp ruby-emerald cabochons, and sacred temple coin haars.",
    "specs": {
      "Style": "South Indian Temple Nakshi",
      "Stones": "Natural Kemp Rubies & Emerald Cabochons"
    }
  },
  {
    "id": 8,
    "title": "Solitaire Noir 3.0ct VVS Diamond Tennis Bracelet",
    "sku": "AA-DM-008",
    "brand": "Haute Joaillerie • Paris Atelier Style",
    "category": "Solitaire Lab Diamonds",
    "price": 5900,
    "origPrice": 8500,
    "discount": "31% OFF",
    "rating": 4.9,
    "reviewsCount": 72,
    "badge": "VVS Lab Diamond",
    "stock": 12,
    "metalType": "gold-18k",
    "metalWeight": 7.5,
    "makingCharges": 14,
    "gemstoneCost": 3200,
    "isDynamicPricing": false,
    "image": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    "secondaryImage": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80",
    "description": "Conflict-free VVS brilliant cuts, channel-set tennis bracelet, and diamond eternity bands set in 18K white and yellow gold.",
    "specs": {
      "Diamond Grade": "VVS1 Clarity, D-E Color",
      "Total Carat Weight": "3.0 Carats Total"
    }
  },
  {
    "id": 9,
    "title": "Noor Mother-of-Pearl Evil Eye Talisman Chain",
    "sku": "AA-TL-009",
    "brand": "Mediterranean Edit • Noor Talismans",
    "category": "Noor Evil Eye Talismans",
    "price": 1150,
    "origPrice": 1699,
    "discount": "32% OFF",
    "rating": 4.8,
    "reviewsCount": 154,
    "badge": "18K Anti-Tarnish",
    "stock": 25,
    "metalType": "gold-18k",
    "metalWeight": 3.5,
    "makingCharges": 10,
    "gemstoneCost": 350,
    "isDynamicPricing": false,
    "image": "https://images.unsplash.com/photo-1674554875210-49b2a1c163d4?auto=format&fit=crop&w=800&q=80",
    "secondaryImage": "https://images.unsplash.com/photo-1611591475878-1a74288029c7?auto=format&fit=crop&w=700&q=80",
    "description": "Waterproof mother-of-pearl talismans, sapphire evil eye amulets, and starry constellation charms on 18K PVD chain.",
    "specs": {
      "Amulet Core": "Natural Mother-of-Pearl & Cobalt Enamel",
      "Waterproof": "100% Sweatproof & Perfume-Proof"
    }
  },
  {
    "id": 10,
    "title": "Imperial Crimson & Pearl Latkan Bridal Chuda Set",
    "sku": "AA-CH-010",
    "brand": "Punjab & Marwar Heritage • Bridal Suite",
    "category": "Imperial Bridal Chuda",
    "price": 2750,
    "origPrice": 3800,
    "discount": "28% OFF",
    "rating": 4.9,
    "reviewsCount": 94,
    "badge": "Bridal Custom",
    "stock": 15,
    "metalType": "brass-pvd",
    "metalWeight": 42,
    "makingCharges": 15,
    "gemstoneCost": 400,
    "isDynamicPricing": false,
    "image": "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
    "secondaryImage": "https://images.unsplash.com/photo-1611591475870-761376e10793?auto=format&fit=crop&w=700&q=80",
    "description": "Traditional crimson red and ivory bridal chuda set accented with cultured pearl latkans, gold beaded edges, and filigree kada spacers.",
    "specs": {
      "Package": "Full Bridal Set (Both Hands - 24 Pieces)",
      "Sizing": "Custom Bridal Fitting (2.4, 2.6, 2.8)"
    }
  },
  {
    "id": 11,
    "title": "Navratna Nine-Gem 22K Gold Foil Filigree Choker",
    "sku": "AA-NV-011",
    "brand": "Vedic Astrological Heirlooms",
    "category": "Navratna Vedic Gems",
    "price": 5850,
    "origPrice": 8200,
    "discount": "29% OFF",
    "rating": 5,
    "reviewsCount": 46,
    "badge": "Vedic Royalty",
    "stock": 5,
    "metalType": "gold-22k",
    "metalWeight": 16,
    "makingCharges": 18,
    "gemstoneCost": 2200,
    "isDynamicPricing": true,
    "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
    "secondaryImage": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80",
    "description": "Sacred natural gemstones set in 22K gold foil with fine Jaipuri filigree karigari and antique pearl drops.",
    "specs": {
      "Gemstones": "Ruby, Pearl, Coral, Emerald, Yellow Sapphire, Diamond, Blue Sapphire, Hessonite, Cat's Eye",
      "Purity": "22K Hallmark Gold Foil"
    }
  },
  {
    "id": 12,
    "title": "Gulabi Jaipur 18K Rose Gold & Tourmaline Collier",
    "sku": "AA-RG-012",
    "brand": "Pink City Guild • Pastel Bridal",
    "category": "Gulabi Rose Gold & Tourmaline",
    "price": 3450,
    "origPrice": 4900,
    "discount": "30% OFF",
    "rating": 4.8,
    "reviewsCount": 82,
    "badge": "Modern Blush",
    "stock": 11,
    "metalType": "gold-18k",
    "metalWeight": 8.5,
    "makingCharges": 14,
    "gemstoneCost": 1100,
    "isDynamicPricing": false,
    "image": "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80",
    "secondaryImage": "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=700&q=80",
    "description": "18K blush rose gold baguette collars and natural Brazilian pink tourmaline for contemporary brides.",
    "specs": {
      "Gold Hue": "Blush 18K Rose Gold",
      "Stone": "Natural Pink Tourmaline Baguettes"
    }
  },
  {
    "id": 13,
    "title": "Rajkumari Triple-Chain Jadau Hathphool Suite",
    "sku": "AA-HP-013",
    "brand": "Rajputana Hand Heirlooms • Sawwaisa Style",
    "category": "Rajkumari Jadau Hathphool",
    "price": 4250,
    "origPrice": 5800,
    "discount": "27% OFF",
    "rating": 4.9,
    "reviewsCount": 58,
    "badge": "Bridal Handcraft",
    "stock": 7,
    "metalType": "gold-22k",
    "metalWeight": 12,
    "makingCharges": 18,
    "gemstoneCost": 1400,
    "isDynamicPricing": true,
    "image": "https://images.unsplash.com/photo-1611591475870-761376e10793?auto=format&fit=crop&w=800&q=80",
    "secondaryImage": "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=700&q=80",
    "description": "Intricate multi-strand ring-to-cuff hand harnesses studded with flat-cut Polki, seed pearls, and meena florets.",
    "specs": {
      "Inclusion": "Pair of Hathphools (Left & Right Hand) with matching adjustable rings",
      "Setting": "Pachi Jadau Foil Setting"
    }
  },
  {
    "id": 14,
    "title": "Dewdrop D-Color VVS1 Moissanite Eternity Solitaire",
    "sku": "AA-MS-014",
    "brand": "Certified Diamond Alternate • Dewdrop",
    "category": "Dewdrop VVS1 Moissanite",
    "price": 6400,
    "origPrice": 9500,
    "discount": "33% OFF",
    "rating": 5,
    "reviewsCount": 114,
    "badge": "VVS1 Brilliance",
    "stock": 14,
    "metalType": "gold-18k",
    "metalWeight": 6,
    "makingCharges": 12,
    "gemstoneCost": 3800,
    "isDynamicPricing": false,
    "image": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    "secondaryImage": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=80",
    "description": "Uncut double-refraction brilliant fire moissanite tennis chokers, solitaires, and cocktail eternity bands.",
    "specs": {
      "Stone Spec": "D-Color Flawless, VVS1 Clarity",
      "Certificate": "GRA Certified Moissanite Card"
    }
  },
  {
    "id": 15,
    "title": "Noor-E-Chauraha Crescent Polki Passa & Matha Patti",
    "sku": "AA-MP-015",
    "brand": "Mughal & Nizami Royal Jewels • Sawwaisa Style",
    "category": "Noor Passa & Matha Patti",
    "price": 3150,
    "origPrice": 4500,
    "discount": "30% OFF",
    "rating": 4.9,
    "reviewsCount": 73,
    "badge": "Nizami Heirlooms",
    "stock": 10,
    "metalType": "gold-22k",
    "metalWeight": 11.5,
    "makingCharges": 18,
    "gemstoneCost": 950,
    "isDynamicPricing": true,
    "image": "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80",
    "secondaryImage": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80",
    "description": "Royal crescent jhumars, sheeshphool hair bands, and pearl-tasseled maang tikkas crafted for bridal grandeur.",
    "specs": {
      "Adornment": "Dual Royal Passa (Side Hair) + Maang Tikka (Forehead Center)",
      "Pearls": "Hand-strung cultured micro pearl tassels"
    }
  }
];

  // ---------------------------------------------------------------------------
  // 3. DEFAULT INITIAL ORDERS SEED (for Admin Order Management)
  // ---------------------------------------------------------------------------
  const BASELINE_ORDERS = [
    {
      orderId: 'ORD-2026-9481',
      date: new Date(Date.now() - 3600000 * 4).toISOString(),
      customerName: 'Aanya Sharma',
      phone: '+91 98201 44521',
      email: 'aanya.sharma@example.com',
      shippingAddress: 'Flat 402, Imperial Heights, Lokhandwala, Andheri West, Mumbai, MH - 400053',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400053',
      items: [
        { id: 1, title: 'The Meera Royal Meenakari Kadas (Pair)', price: 2850, quantity: 1, variant: '2.6 Size / Peacock Blue' },
        { id: 2, title: 'Aura 18K Anti-Tarnish Clover Bracelet', price: 1299, quantity: 1, variant: 'Standard 17cm / Onyx Black' }
      ],
      subtotal: 4149,
      discount: 415,
      couponApplied: 'ROYAL10',
      shippingFee: 0,
      totalAmount: 3734,
      paymentMethod: 'UPI (Google Pay)',
      paymentStatus: 'PAID',
      orderStatus: 'Confirmed',
      courierPartner: 'BlueDart Express',
      trackingId: 'BD-884920194IN',
      notes: 'Customer requested gift packaging.'
    },
    {
      orderId: 'ORD-2026-9482',
      date: new Date(Date.now() - 3600000 * 22).toISOString(),
      customerName: 'Rohan Mehra',
      phone: '+91 99302 77142',
      email: 'rohan.mehra@example.com',
      shippingAddress: 'Villa 14, Palm Meadows, Whitefield, Bangalore, KA - 560066',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560066',
      items: [
        { id: 6, title: 'Sovereign 6mm Cuban Chain & Kada Set', price: 1699, quantity: 1, variant: '22 Inches / Brushed Steel' }
      ],
      subtotal: 1699,
      discount: 250,
      couponApplied: 'FIRSTAURA',
      shippingFee: 0,
      totalAmount: 1449,
      paymentMethod: 'Credit Card (Visa)',
      paymentStatus: 'PAID',
      orderStatus: 'Shipped',
      courierPartner: 'Delhivery Surface',
      trackingId: 'DLV-449102830IN',
      notes: 'Dispatched via express air hub.'
    },
    {
      orderId: 'ORD-2026-9483',
      date: new Date(Date.now() - 3600000 * 48).toISOString(),
      customerName: 'Priyanka Rathore',
      phone: '+91 94140 23891',
      email: 'priyanka.rathore@example.com',
      shippingAddress: 'C-82, Malviya Nagar, Jaipur, RJ - 302017',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302017',
      items: [
        { id: 3, title: 'Padmavati Pachi Kundan & Emerald Choker Set', price: 4950, quantity: 1, variant: 'Bridal Set with Chandbalis' }
      ],
      subtotal: 4950,
      discount: 500,
      couponApplied: 'BRIDAL500',
      shippingFee: 0,
      totalAmount: 4450,
      paymentMethod: 'Cash on Delivery (COD)',
      paymentStatus: 'COLLECTED',
      orderStatus: 'Delivered',
      courierPartner: 'BlueDart Express',
      trackingId: 'BD-771920381IN',
      notes: 'Delivered and verified by signature.'
    }
  ];

  // ---------------------------------------------------------------------------
  // 4. DEFAULT COUPONS
  // ---------------------------------------------------------------------------
  const BASELINE_COUPONS = [
    { code: 'ROYAL10', type: 'percentage', value: 10, minOrder: 1999, maxDiscount: 1000, description: '10% OFF on luxury orders above ₹1,999', isActive: true },
    { code: 'FIRSTAURA', type: 'flat', value: 250, minOrder: 1499, maxDiscount: 250, description: '₹250 FLAT OFF on your first purchase above ₹1,499', isActive: true },
    { code: 'BRIDAL500', type: 'flat', value: 500, minOrder: 4000, maxDiscount: 500, description: '₹500 OFF on Royal Heritage & Bridal jewellery', isActive: true },
    { code: 'AURA15', type: 'percentage', value: 15, minOrder: 4999, maxDiscount: 1500, description: '15% Festive Privilege OFF on orders above ₹4,999', isActive: true }
  ];

  // ---------------------------------------------------------------------------
  // 5. DEFAULT SHIPPING CONFIGURATION
  // ---------------------------------------------------------------------------
  const DEFAULT_SHIPPING = {
    freeThreshold: 1499,
    standardRate: 99,
    expressRate: 199,
    insuredTransit: true,
    supportedCouriers: ['BlueDart Express', 'Delhivery Surface', 'Shiprocket Air', 'DTDC Premium'],
    tier1PincodesPrefixes: ['11', '12', '40', '56', '50', '60', '70', '30', '38'] // Metros & Tier 1
  };

  // ---------------------------------------------------------------------------
  // 6. INITIALIZATION & STORAGE WRAPPERS
  // ---------------------------------------------------------------------------
  function safeJsonParse(str, fallback) {
    try {
      return str ? JSON.parse(str) : fallback;
    } catch (e) {
      console.warn('[StoreEngine] JSON parse failed, returning fallback:', e);
      return fallback;
    }
  }

  function getFromStorage(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? safeJsonParse(item, fallback) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      // Trigger custom storage event for in-tab reactivity
      window.dispatchEvent(new CustomEvent('aa_store_updated', { detail: { key, data } }));
      return true;
    } catch (e) {
      console.error('[StoreEngine] Failed to write to localStorage:', e);
      return false;
    }
  }

  // Ensure initial store is populated on first load
  function initStore() {
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS) || (safeJsonParse(localStorage.getItem(STORAGE_KEYS.PRODUCTS), []).length < 15)) {
      saveToStorage(STORAGE_KEYS.PRODUCTS, BASELINE_PRODUCTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.METAL_RATES)) {
      saveToStorage(STORAGE_KEYS.METAL_RATES, DEFAULT_METAL_RATES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      saveToStorage(STORAGE_KEYS.ORDERS, BASELINE_ORDERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.COUPONS)) {
      saveToStorage(STORAGE_KEYS.COUPONS, BASELINE_COUPONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SHIPPING)) {
      saveToStorage(STORAGE_KEYS.SHIPPING, DEFAULT_SHIPPING);
    }
  }

  // ---------------------------------------------------------------------------
  // 7. METAL PRICING CALCULATION ENGINE
  // ---------------------------------------------------------------------------
  const MetalPricing = {
    getRates: function () {
      return getFromStorage(STORAGE_KEYS.METAL_RATES, DEFAULT_METAL_RATES);
    },

    saveRates: function (rates) {
      const merged = Object.assign({}, DEFAULT_METAL_RATES, rates, { lastUpdated: new Date().toISOString() });
      saveToStorage(STORAGE_KEYS.METAL_RATES, merged);
      return merged;
    },

    /**
     * Compute dynamic retail price for a jewellery product:
     * Formula:
     * 1. Metal Base Cost = Metal Weight (g) * Purity Rate (₹/g)
     * 2. Making Charges = Metal Base Cost * (Making % / 100)  [or flat fee]
     * 3. Subtotal = Metal Base Cost + Making Charges + Gemstone Cost
     * 4. Final Selling Price = Subtotal * (1 + GST % / 100) rounded to clean retail number
     */
    calculatePrice: function (product, customRates) {
      const rates = customRates || this.getRates();
      const weight = Number(product.metalWeight) || 0;
      const gemstone = Number(product.gemstoneCost) || 0;
      const makingPercent = product.makingCharges !== undefined ? Number(product.makingCharges) : (rates.defaultMakingPercent || 14);
      const gstPercent = Number(rates.gstPercent) || 3;

      let perGramRate = 0;
      switch (product.metalType) {
        case 'gold-24k':
          perGramRate = rates.gold24k;
          break;
        case 'gold-22k':
          perGramRate = rates.gold22k;
          break;
        case 'gold-18k':
          perGramRate = rates.gold18k;
          break;
        case 'gold-14k':
          perGramRate = rates.gold14k;
          break;
        case 'silver-999':
          perGramRate = rates.silver999;
          break;
        case 'silver-925':
          perGramRate = rates.silver925;
          break;
        case 'brass-pvd':
        default:
          // Fixed semi-precious or micro-plated base
          return {
            basePrice: product.price,
            origPrice: product.origPrice || Math.round(product.price * 1.35),
            metalCost: 0,
            makingCost: 0,
            gemstoneCost: gemstone,
            gstAmount: Math.round(product.price * 0.03),
            isCalculated: false
          };
      }

      const metalCost = Math.round(weight * perGramRate);
      const makingCost = Math.round(metalCost * (makingPercent / 100));
      const subtotal = metalCost + makingCost + gemstone;
      const gstAmount = Math.round(subtotal * (gstPercent / 100));
      const calculatedSellingPrice = subtotal + gstAmount;

      return {
        basePrice: calculatedSellingPrice,
        origPrice: Math.round(calculatedSellingPrice * 1.3), // Benchmark 30% comparative MRP
        metalCost: metalCost,
        makingCost: makingCost,
        gemstoneCost: gemstone,
        gstAmount: gstAmount,
        perGramRate: perGramRate,
        isCalculated: true
      };
    },

    /**
     * Fetch live spot prices from live REST API (Gold-API.com)
     * Supports direct browser execution via CORS.
     */
    fetchLiveRates: async function () {
      const currentRates = this.getRates();
      try {
        // Query live Gold (XAU) spot in USD
        const goldRes = await fetch('https://api.gold-api.com/price/XAU', { cache: 'no-store' });
        if (!goldRes.ok) throw new Error('Gold API responded with ' + goldRes.status);
        const goldData = await goldRes.json();

        // Query live Silver (XAG) spot in USD
        const silverRes = await fetch('https://api.gold-api.com/price/XAG', { cache: 'no-store' });
        if (!silverRes.ok) throw new Error('Silver API responded with ' + silverRes.status);
        const silverData = await silverRes.json();

        // 1 Troy Ounce = 31.1034768 Grams
        const TROY_OUNCE_TO_GRAMS = 31.1034768;
        const usdInr = currentRates.usdInrRate || 86.80;

        // Spot Price per gram in INR
        const goldSpotUsd = Number(goldData.price) || 2700;
        const silverSpotUsd = Number(silverData.price) || 31.5;

        // Indian domestic gold includes statutory customs import duty & premium (~10-12% above pure international spot)
        const domesticDutyMultiplier = 1.11;

        const rawGoldPerGramInr = (goldSpotUsd / TROY_OUNCE_TO_GRAMS) * usdInr * domesticDutyMultiplier;
        const rawSilverPerGramInr = (silverSpotUsd / TROY_OUNCE_TO_GRAMS) * usdInr * domesticDutyMultiplier;

        const gold24k = Math.round(rawGoldPerGramInr);
        const gold22k = Math.round(gold24k * 0.9167);
        const gold18k = Math.round(gold24k * 0.7500);
        const gold14k = Math.round(gold24k * 0.5850);
        const silver999 = Math.round(rawSilverPerGramInr * 10) / 10;
        const silver925 = Math.round(silver999 * 0.9250 * 10) / 10;

        const updatedRates = {
          gold24k,
          gold22k,
          gold18k,
          gold14k,
          silver999,
          silver925,
          usdInrRate: usdInr,
          isAutoLive: true,
          apiProvider: 'gold-api.com (Live Feed)',
          lastUpdated: new Date().toISOString()
        };

        this.saveRates(updatedRates);
        return { success: true, rates: updatedRates, source: 'live' };
      } catch (err) {
        console.warn('[StoreEngine] Live API fetch failed or blocked by network, retaining benchmark rates:', err);
        return { success: false, rates: currentRates, error: err.message, source: 'cached' };
      }
    },

    /**
     * Recalculate all store products that have isDynamicPricing enabled
     */
    recalculateStorePrices: function () {
      const products = ProductCatalog.getAll();
      const rates = this.getRates();
      let updatedCount = 0;

      const updatedProducts = products.map(p => {
        if (p.isDynamicPricing && p.metalType && p.metalType !== 'brass-pvd') {
          const calc = this.calculatePrice(p, rates);
          updatedCount++;
          return Object.assign({}, p, {
            price: calc.basePrice,
            origPrice: calc.origPrice,
            discount: Math.round(((calc.origPrice - calc.basePrice) / calc.origPrice) * 100) + '% OFF'
          });
        }
        return p;
      });

      saveToStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);
      return { count: updatedCount, total: products.length };
    }
  };

  // ---------------------------------------------------------------------------
  // 8. PRODUCT CATALOG MANAGEMENT (CRUD)
  // ---------------------------------------------------------------------------
  const ProductCatalog = {
    getAll: function () {
      return getFromStorage(STORAGE_KEYS.PRODUCTS, BASELINE_PRODUCTS);
    },

    getById: function (id) {
      const products = this.getAll();
      return products.find(p => Number(p.id) === Number(id)) || null;
    },

    save: function (productData) {
      const products = this.getAll();
      let savedProduct = null;

      if (productData.id) {
        // Edit existing product
        const index = products.findIndex(p => Number(p.id) === Number(productData.id));
        if (index !== -1) {
          products[index] = Object.assign({}, products[index], productData);
          savedProduct = products[index];
        } else {
          savedProduct = productData;
          products.push(savedProduct);
        }
      } else {
        // Create new product
        const nextId = products.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0) + 1;
        savedProduct = Object.assign({}, productData, {
          id: nextId,
          sku: productData.sku || `AA-PRD-${String(nextId).padStart(3, '0')}`,
          rating: productData.rating || 5.0,
          reviewsCount: productData.reviewsCount || 1,
          createdAt: new Date().toISOString()
        });
        products.push(savedProduct);
      }

      // If dynamic pricing is active on this item, calculate its initial price
      if (savedProduct.isDynamicPricing && savedProduct.metalType !== 'brass-pvd') {
        const calc = MetalPricing.calculatePrice(savedProduct);
        savedProduct.price = calc.basePrice;
        savedProduct.origPrice = calc.origPrice;
      }

      saveToStorage(STORAGE_KEYS.PRODUCTS, products);
      return savedProduct;
    },

    delete: function (id) {
      const products = this.getAll();
      const filtered = products.filter(p => Number(p.id) !== Number(id));
      saveToStorage(STORAGE_KEYS.PRODUCTS, filtered);
      return filtered.length < products.length;
    },

    updateStock: function (id, newStock) {
      const products = this.getAll();
      const item = products.find(p => Number(p.id) === Number(id));
      if (item) {
        item.stock = Math.max(0, Number(newStock));
        saveToStorage(STORAGE_KEYS.PRODUCTS, products);
        return item.stock;
      }
      return null;
    },

    adjustStock: function (id, changeAmount) {
      const products = this.getAll();
      const item = products.find(p => Number(p.id) === Number(id));
      if (item) {
        item.stock = Math.max(0, (Number(item.stock) || 0) + changeAmount);
        saveToStorage(STORAGE_KEYS.PRODUCTS, products);
        return item.stock;
      }
      return null;
    },

    resetToDefaults: function () {
      saveToStorage(STORAGE_KEYS.PRODUCTS, BASELINE_PRODUCTS);
      return BASELINE_PRODUCTS;
    }
  };

  // ---------------------------------------------------------------------------
  // 9. ORDER MANAGEMENT ENGINE
  // ---------------------------------------------------------------------------
  const OrderManager = {
    getAll: function () {
      return getFromStorage(STORAGE_KEYS.ORDERS, BASELINE_ORDERS);
    },

    getById: function (orderId) {
      const orders = this.getAll();
      return orders.find(o => o.orderId === orderId) || null;
    },

    createOrder: function (orderPayload) {
      const orders = this.getAll();
      const timestamp = Date.now();
      const randomSeq = Math.floor(1000 + Math.random() * 9000);
      const orderId = `ORD-2026-${randomSeq}`;

      const newOrder = {
        orderId: orderId,
        date: new Date().toISOString(),
        customerName: orderPayload.customerName || 'Valued Patron',
        phone: orderPayload.phone || '',
        email: orderPayload.email || '',
        shippingAddress: orderPayload.shippingAddress || '',
        city: orderPayload.city || 'India',
        state: orderPayload.state || '',
        pincode: orderPayload.pincode || '',
        items: orderPayload.items || [],
        subtotal: Number(orderPayload.subtotal) || 0,
        discount: Number(orderPayload.discount) || 0,
        couponApplied: orderPayload.couponApplied || null,
        shippingFee: Number(orderPayload.shippingFee) || 0,
        totalAmount: Number(orderPayload.totalAmount) || 0,
        paymentMethod: orderPayload.paymentMethod || 'UPI',
        paymentStatus: orderPayload.paymentStatus || 'PAID',
        orderStatus: 'Confirmed',
        courierPartner: 'BlueDart Express',
        trackingId: `BD-${Math.floor(100000000 + Math.random() * 900000000)}IN`,
        notes: orderPayload.notes || 'Order placed via online luxury checkout.'
      };

      // Automatically deduct purchased inventory stock
      if (Array.isArray(newOrder.items)) {
        newOrder.items.forEach(item => {
          if (item.id) {
            ProductCatalog.adjustStock(item.id, -(Number(item.quantity) || 1));
          }
        });
      }

      orders.unshift(newOrder);
      saveToStorage(STORAGE_KEYS.ORDERS, orders);
      return newOrder;
    },

    updateStatus: function (orderId, newStatus, courierData) {
      const orders = this.getAll();
      const order = orders.find(o => o.orderId === orderId);
      if (order) {
        order.orderStatus = newStatus;
        if (courierData && courierData.courierPartner) {
          order.courierPartner = courierData.courierPartner;
        }
        if (courierData && courierData.trackingId) {
          order.trackingId = courierData.trackingId;
        }
        saveToStorage(STORAGE_KEYS.ORDERS, orders);
        return order;
      }
      return null;
    }
  };

  // ---------------------------------------------------------------------------
  // 10. SHIPPING RULES & PINCODE ENGINE
  // ---------------------------------------------------------------------------
  const ShippingEngine = {
    getSettings: function () {
      return getFromStorage(STORAGE_KEYS.SHIPPING, DEFAULT_SHIPPING);
    },

    saveSettings: function (settings) {
      const merged = Object.assign({}, DEFAULT_SHIPPING, settings);
      saveToStorage(STORAGE_KEYS.SHIPPING, merged);
      return merged;
    },

    calculateShippingFee: function (cartSubtotal, isExpress) {
      const settings = this.getSettings();
      if (isExpress) {
        return settings.expressRate || 199;
      }
      if (cartSubtotal >= (settings.freeThreshold || 1499)) {
        return 0; // Free complimentary insured shipping
      }
      return settings.standardRate || 99;
    },

    checkPincode: function (pincode) {
      const cleanPin = String(pincode).trim();
      if (!/^\d{6}$/.test(cleanPin)) {
        return {
          valid: false,
          message: 'Please enter a valid 6-digit Indian PIN code.'
        };
      }

      const settings = this.getSettings();
      const prefix = cleanPin.substring(0, 2);
      const isTier1 = settings.tier1PincodesPrefixes.includes(prefix);

      // Estimated Delivery Timeline calculation
      const days = isTier1 ? '2 to 3' : '3 to 5';
      const courier = isTier1 ? 'BlueDart Express Air' : 'Delhivery Premium Surface';

      return {
        valid: true,
        pincode: cleanPin,
        tier: isTier1 ? 'Metro / Tier 1' : 'National Standard',
        serviceable: true,
        estimatedDays: days,
        courier: courier,
        codAvailable: true,
        message: `Delivery in ${days} business days via ${courier}. COD available.`
      };
    }
  };

  // ---------------------------------------------------------------------------
  // 11. COUPON VERIFICATION ENGINE
  // ---------------------------------------------------------------------------
  const CouponEngine = {
    getAll: function () {
      return getFromStorage(STORAGE_KEYS.COUPONS, BASELINE_COUPONS);
    },

    save: function (coupon) {
      const coupons = this.getAll();
      const code = String(coupon.code).trim().toUpperCase();
      const index = coupons.findIndex(c => c.code.toUpperCase() === code);
      const sanitized = {
        code: code,
        type: coupon.type || 'percentage',
        value: Number(coupon.value) || 10,
        minOrder: Number(coupon.minOrder) || 0,
        maxDiscount: Number(coupon.maxDiscount) || 1000,
        description: coupon.description || `${coupon.value}% off on eligible order`,
        isActive: coupon.isActive !== undefined ? coupon.isActive : true
      };

      if (index !== -1) {
        coupons[index] = sanitized;
      } else {
        coupons.push(sanitized);
      }
      saveToStorage(STORAGE_KEYS.COUPONS, coupons);
      return sanitized;
    },

    delete: function (code) {
      const coupons = this.getAll();
      const filtered = coupons.filter(c => c.code.toUpperCase() !== String(code).trim().toUpperCase());
      saveToStorage(STORAGE_KEYS.COUPONS, filtered);
      return filtered.length < coupons.length;
    },

    validate: function (code, cartSubtotal) {
      if (!code) return { valid: false, message: 'No coupon code provided.' };
      const coupons = this.getAll();
      const cleanCode = String(code).trim().toUpperCase();
      const coupon = coupons.find(c => c.code.toUpperCase() === cleanCode && c.isActive);

      if (!coupon) {
        return { valid: false, message: `Coupon "${cleanCode}" is invalid or expired.` };
      }

      if (cartSubtotal < coupon.minOrder) {
        return {
          valid: false,
          message: `Minimum order value for ${cleanCode} is ₹${coupon.minOrder.toLocaleString('en-IN')}. Add ₹${(coupon.minOrder - cartSubtotal).toLocaleString('en-IN')} more to unlock!`
        };
      }

      let discountAmount = 0;
      if (coupon.type === 'percentage') {
        discountAmount = Math.round((cartSubtotal * coupon.value) / 100);
        if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
          discountAmount = coupon.maxDiscount;
        }
      } else {
        discountAmount = coupon.value;
      }

      return {
        valid: true,
        code: cleanCode,
        discountAmount: discountAmount,
        message: `Applied ${cleanCode}! You saved ₹${discountAmount.toLocaleString('en-IN')}.`,
        coupon: coupon
      };
    }
  };

  // ---------------------------------------------------------------------------
  // 12. INITIALIZE STORE
  // ---------------------------------------------------------------------------
  initStore();

  // Export to global scope
  global.StoreEngine = {
    init: initStore,
    MetalPricing: MetalPricing,
    Products: ProductCatalog,
    Orders: OrderManager,
    Shipping: ShippingEngine,
    Coupons: CouponEngine,
    STORAGE_KEYS: STORAGE_KEYS
  };

})(typeof window !== 'undefined' ? window : this);
