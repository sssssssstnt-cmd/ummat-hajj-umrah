/**
 * ============================================================================
 * UMMAT HAJJ UMRAH TOURS & TRAVELS (INDIA) — REACT APPLICATION DATA & CONFIG
 * ============================================================================
 * Edit this file to update your phone numbers, WhatsApp number, office address,
 * departure cities, spiritual reflections, and Umrah/Hajj package prices!
 */

window.UMMAT_CONFIG = {
  agency: {
    name: "Ummat",
    subName: "Hajj & Umrah Sanctuary",
    fullName: "Ummat Hajj Umrah Tours & Travels",
    tagline: "A Serene, Mindful & All-Inclusive Spiritual Journey to the Sacred Lands",
    arabicBismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    arabicTalbiyah: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ",
    talbiyahTranslation: "“Here I am, O Allah, here I am. Here I am, You have no partner, here I am.”",
    arabicSalam: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
    primaryDomain: "ummathajjumrah.com",
    secondaryDomain: "ummathajjumrah.in",
    // Enter your 10-digit Indian WhatsApp number with country code 91 (no + or spaces)
    whatsappNumber: "919876543210",
    displayPhonePrimary: "+91 98765 43210",
    displayPhoneSecondary: "+91 98765 43211",
    email: "salam@ummathajjumrah.com",
    address: "Suite 14, Al-Barakah Sanctuary Arcade, Near Jama Masjid, Mumbai - 400003, Maharashtra, India",
    branchCities: ["Mumbai", "New Delhi", "Hyderabad", "Bengaluru", "Ahmedabad", "Lucknow", "Kolkata", "Chennai", "Kochi"],
    workingHours: "Daily: 10:00 AM – 9:00 PM IST (Jumu'ah Prayer Pause: 12:30 PM – 2:30 PM)",
    web3FormsAccessKey: "",
    stats: [
      { value: "12,500+", label: "Blessed Pilgrims Served", detail: "Families & elders across India" },
      { value: "100%", label: "Peace-of-Mind Visa Care", detail: "Zero-hassle documentation & insurance" },
      { value: "0m – 350m", label: "Sanctuary Proximity", detail: "Steps away from Masjid al-Haram" },
      { value: "24 / 7", label: "Makkah & Madinah Hosts", detail: "On-ground Urdu, Hindi & English care" }
    ]
  },

  // Mindful Journey Steps — Peace-Oriented Experience
  peacePillars: [
    {
      step: "01",
      arabic: "النِّيَّة وَالِاسْتِعْدَاد",
      title: "Pure Intention (Niyyah), Zero Paperwork Stress",
      description: "From the moment you decide to answer the call of Allah, our concierge handles your Umrah visa, Saudi medical insurance, Nusuk Rawdah permits, and direct flights so your heart remains free from worldly worry."
    },
    {
      step: "02",
      arabic: "جِوَارُ الْحَرَمَيْن",
      title: "Sanctuary Proximity for Unhurried Ibadah",
      description: "Rest steps away from Masjid al-Haram and Masjid an-Nabawi. Our carefully vetted hotels near Ladies Gate 25 and the Haram Courtyard ensure elderly parents never struggle with long walks."
    },
    {
      step: "03",
      arabic: "الصُّحْبَةُ الصَّالِحَة",
      title: "Gentle Sunnah Guidance & Nourishing Indian Hospitality",
      description: "Accompanied by a compassionate, soft-spoken Aalim for authentic Sunnah guidance, paired with freshly cooked, comforting Indian meals three times daily."
    }
  ],

  // Room Sharing Multipliers (Per Adult in INR)
  sharingTypes: {
    quad: {
      id: "quad",
      label: "Quad Sanctuary (4 Beds)",
      shortLabel: "Quad (4)",
      pillSub: "4 Beds / Room",
      description: "Spacious 4-bed suite — Most economical for families & companions",
      priceAddon: 0
    },
    triple: {
      id: "triple",
      label: "Triple Sanctuary (3 Beds)",
      shortLabel: "Triple (3)",
      pillSub: "3 Beds / Room",
      description: "Balanced 3-bed room — Extra breathing room for small families",
      priceAddon: 9000
    },
    double: {
      id: "double",
      label: "Private Double (2 Beds)",
      shortLabel: "Double (2)",
      pillSub: "Private Couple Suite",
      description: "Serene 2-bed private room — Designed for couples & elderly parents",
      priceAddon: 18500
    }
  },

  passengerPricing: {
    childWithBedRatio: 0.85,
    childWithoutBedRatio: 0.62,
    infantFlatFee: 19500
  },

  departureCities: [
    { id: "mumbai", name: "Mumbai (BOM)", airline: "Saudia / Air India Direct", addon: 0 },
    { id: "delhi", name: "New Delhi (DEL)", airline: "Saudia / Air India Direct", addon: 0 },
    { id: "hyderabad", name: "Hyderabad (HYD)", airline: "Saudia / Indigo Direct", addon: 2000 },
    { id: "ahmedabad", name: "Ahmedabad (AMD)", airline: "Direct Jeddah Flights", addon: 1500 },
    { id: "bengaluru", name: "Bengaluru (BLR)", airline: "Saudia / Indigo Direct", addon: 3500 },
    { id: "lucknow", name: "Lucknow (LKO)", airline: "Saudia / Air India Express Direct", addon: 2500 },
    { id: "kolkata", name: "Kolkata (CCU)", airline: "Direct / Seasonal Gateway", addon: 4500 },
    { id: "chennai", name: "Chennai (MAA)", airline: "Direct / Connecting Gateway", addon: 4000 },
    { id: "kochi", name: "Kochi / Kozhikode (COK/CCJ)", airline: "Saudia / Air India Express", addon: 3000 }
  ],

  departureMonths: [
    "Upcoming Serene Batch (This Month)",
    "Next Month Spiritual Batch",
    "Rajab & Shaban Blessed Retreat",
    "Ramadan First 15 Days Sanctuary",
    "Ramadan Last Ashra (Laylatul Qadr)",
    "Shawwal Post-Eid Tranquil Batch",
    "Winter Family & Elders Special Batch"
  ],

  umrahPackages: [
    {
      id: "economy-umrah",
      tier: "Essential Peace",
      title: "Serene Economy Umrah",
      subtitle: "Thoughtfully curated for dignified, budget-friendly devotion",
      badge: "Accessible Grace",
      featured: false,
      duration: "15 Days / 14 Nights",
      nightsSplit: "7 Nights Makkah • 7 Nights Madinah",
      basePriceQuad: 78000,
      originalPrice: 84000,
      image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=900&q=80",
      makkahHotel: {
        name: "Al Kiswah Towers / Jawharat Al Rasheed",
        category: "Verified 3-Star Comfort",
        distance: "750m from Haram",
        walkTime: "24/7 Private AC Haram Shuttle (Every 8 Mins)"
      },
      madinahHotel: {
        name: "Badr Al Masa / Karam Al Khair",
        category: "Verified 3-Star Comfort",
        distance: "400m from Masjid an-Nabawi",
        walkTime: "Peaceful 5-Minute Walk to Haram Piazza"
      },
      flights: "Confirmed Return Economy Flights",
      meals: "3x Daily Home-Style Indian Buffet",
      transport: "Luxury Air-Conditioned Touring Coach",
      highlights: [
        "Complete Umrah Visa & Comprehensive Saudi Health Insurance",
        "Return Flights from Major Indian Gateways with 30kg Baggage",
        "Freshly Prepared Indian Breakfast, Lunch & Dinner Daily",
        "Spiritual Ziyarat of Makkah & Madinah Led by a Gentle Aalim",
        "Complimentary Sanctuary Kit (Ihram/Scarf, Dua Book, Tasbeeh, Bags)",
        "5 Liters Sealed Zamzam Water Can upon Return"
      ]
    },
    {
      id: "deluxe-umrah",
      tier: "Walking Sanctuary",
      title: "Super Deluxe Haram-Walk",
      subtitle: "Effortless walking distance for families, ladies & elderly parents",
      badge: "Most Loved by Families",
      featured: true,
      duration: "15 Days / 14 Nights",
      nightsSplit: "7 Nights Makkah • 7 Nights Madinah",
      basePriceQuad: 95000,
      originalPrice: 104000,
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=900&q=80",
      makkahHotel: {
        name: "Emaar Grand / Elaf Ajyad / Nawazi Watheer",
        category: "Superior 4-Star Walking Hotel",
        distance: "300m from Masjid al-Haram",
        walkTime: "4-Minute Flat Walk (No Shuttle Needed)"
      },
      madinahHotel: {
        name: "Taiba Front / Emaar Royal / Saja Al Madinah",
        category: "Superior 4-Star Markazia",
        distance: "150m from Masjid an-Nabawi",
        walkTime: "2-Minute Walk (Steps from Ladies Gate 25)"
      },
      flights: "Direct Return Flights (Saudia / Air India)",
      meals: "Lavish 3-Time Indian Buffet + Evening Chai",
      transport: "New-Model Luxury Coach + Optional Bullet Train",
      highlights: [
        "3-Minute Walking Distance in Both Holy Cities — Pray All 5 Salah in Haram",
        "Direct Non-Stop Flights from India with Full Meal & Baggage Service",
        "Immediate Access to Ladies Gate 25 in Masjid an-Nabawi",
        "Extended Ziyarat Including Historical Badr or Taif Valley",
        "Pre-Departure Spiritual & Practical Seminar for First-Time Pilgrims",
        "Signature Sanctuary Gift Kit + 5 Liters Official Zamzam"
      ]
    },
    {
      id: "luxury-5star-umrah",
      tier: "Royal Courtyard",
      title: "5-Star Haram View & Bullet Train",
      subtitle: "Zero-meter Haram Courtyard hotels & Haramain High-Speed Rail",
      badge: "World-Class Sanctuary",
      featured: false,
      duration: "10 Days / 9 Nights (or 14 Days)",
      nightsSplit: "5 Nights Clock Tower • 4 Nights Madinah 5-Star",
      basePriceQuad: 138000,
      originalPrice: 152000,
      image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=900&q=80",
      makkahHotel: {
        name: "Swissôtel / Pullman ZamZam / Fairmont Clock Tower",
        category: "5-Star Haram Courtyard",
        distance: "0 Meters (Direct Haram Courtyard)",
        walkTime: "Private Elevator Straight to Prayer Halls"
      },
      madinahHotel: {
        name: "Anwar Al Madinah Mövenpick / Pullman Madinah",
        category: "5-Star Frontline Markazia",
        distance: "0m – 50m (On Haram Piazza)",
        walkTime: "Direct Entry to Rawdah & Ladies Courtyard"
      },
      flights: "Direct Full-Service Carrier (Saudia / Air India)",
      meals: "5-Star International & Authentic Indian Dining",
      transport: "Haramain High-Speed Bullet Train + Private GMC",
      highlights: [
        "Zero Walking Strain for Seniors — Elevator Opens Directly to Haram Piazza",
        "First-Class Haramain Bullet Train (Makkah ⇄ Madinah in 2 Hours)",
        "Private VIP GMC Yukon / Hyundai Staria Airport Chauffeur",
        "Dedicated Concierge for Nusuk Rawdah-e-Rasool Permit Scheduling",
        "Private Family Ziyarat in Luxury SUV with Scholarly Commentary",
        "Bespoke Luxury Pilgrim Hamper + 5L Zamzam per Guest"
      ]
    },
    {
      id: "ramadan-special-umrah",
      tier: "Sacred Month Retreat",
      title: "Blessed Ramadan Sanctuary",
      subtitle: "Experience the reward of Hajj in the company of the Prophet ﷺ",
      badge: "Ramadan 1448H Open",
      featured: false,
      duration: "15 Days / Last Ashra / Full Month",
      nightsSplit: "First Ashra • Second Ashra • Laylatul Qadr Options",
      basePriceQuad: 115000,
      originalPrice: 126000,
      image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=900&q=80",
      makkahHotel: {
        name: "Ajyad / Ibrahim Khalil Walking Hotel",
        category: "Selected Walking-Distance Hotel",
        distance: "350m from Masjid al-Haram",
        walkTime: "5-Minute Walk for Taraweeh & Tahajjud"
      },
      madinahHotel: {
        name: "Central Markazia Sanctuary Hotel",
        category: "Selected Central Markazia",
        distance: "180m from Masjid an-Nabawi",
        walkTime: "3-Minute Walk to Haram Courtyard"
      },
      flights: "Confirmed Ramadan Direct Group Seats",
      meals: "Warm Indian Suhoor (Sehri) & Traditional Iftar Buffet",
      transport: "Full AC Transfers & Spiritual Ziyarat",
      highlights: [
        "Nourishing Pre-Dawn Indian Suhoor & Full Traditional Iftar Spread Daily",
        "Walking Distance Hotels so You Can Rest Between Taraweeh & Qiyam-ul-Layl",
        "Flexible Stays: First 15 Days, Last 10 Nights, or Full Blessed Month",
        "Daily Post-Asr Spiritual Reflections & Dua Circles with Our Aalim",
        "All-Inclusive Visa, Flights, Ramadan Kit & 5L Zamzam",
        "Reserve Early with ₹20,000 & Pay in Calm Staggered Installments"
      ]
    }
  ],

  specialServices: [
    {
      id: "hajj-packages",
      tag: "Hajj 1448H / 2027",
      arabic: "الحَجُّ المَبْرُور",
      title: "Shifting & Non-Shifting Hajj Sanctuaries",
      description: "Embark on the Fifth Pillar of Islam with serene preparedness. We offer official private quota Shifting (Aziziya + Markazia) and VIP Non-Shifting 5-Star Hajj packages featuring upgraded gypsum-board air-conditioned tents in Mina & Arafat.",
      startingHint: "Early Pre-Registration & Quota Guidance Open",
      features: [
        "Complete Nusuk & Indian PTO Documentation Guidance",
        "Upgraded AC Mina & Arafat Tents with Sofa-Beds & Fresh Indian Meals",
        "Accompanying Medical Doctor, Scholarly Aalim & 24/7 Wheelchairs",
        "Short (18–22 Days) & Long (34–40 Days) Spiritual Itineraries"
      ],
      whatsappPrompt: "Assalamu Alaikum Ummat Travels, I would like serene guidance regarding Hajj 2027 Shifting & Non-Shifting packages and pre-registration."
    },
    {
      id: "custom-family-umrah",
      tag: "Bespoke Dates",
      arabic: "عُمْرَةُ العَائِلَة",
      title: "Private Family & Senior Citizen Sanctuary",
      description: "Travel on your own calendar at your family’s natural pace. Ideal for multi-generational families travelling with elderly parents or young children who prefer private SUVs, wheelchair care, and custom 7 to 14-day stays.",
      startingHint: "Depart Any Day of the Year",
      features: [
        "Tailor-Made Dates & Duration (5, 7, 10, or 14 Nights)",
        "Private GMC / Hyundai Staria Chauffeur — Zero Waiting for Group Buses",
        "Dedicated Wheelchair Attendants & High-Speed Elevator Rooms",
        "Optional Halal Stopovers in Dubai, Doha, or Istanbul"
      ],
      whatsappPrompt: "Assalamu Alaikum Ummat Travels, we wish to plan a Private Custom Family Umrah on our own dates. Please share personalized options."
    },
    {
      id: "ziyarat-visa-services",
      tag: "Sacred Heritage",
      arabic: "الرِّحْلَاتُ التَّارِيخِيَّة",
      title: "Badr, Taif, Al-Ula & Al-Aqsa Ziyarat Extensions",
      description: "Deepen your connection with Islamic history through reflective, scholar-led excursions to the Battlefield of Badr, the mountain orchards of Taif, Hudaibiyah, and international Ziyarat retreats.",
      startingHint: "Guided Heritage & Express 48-Hr Visa Desk",
      features: [
        "Full-Day Guided Badr & Taif Excursions with Traditional Arab/Indian Lunch",
        "Standalone Umrah Visa + Insurance Processed in 24–48 Hours",
        "Haramain High-Speed Train & 5-Star Hotel-Only Bookings",
        "Dedicated Desk for Masjid Committees & Jamat Organizers"
      ],
      whatsappPrompt: "Assalamu Alaikum Ummat Travels, I would like to enquire about Historical Ziyarat extensions / Standalone Umrah Visa & Hotel services."
    }
  ],

  testimonials: [
    {
      quote: "Taking my 74-year-old mother for Umrah was my life's biggest worry. Ummat Travels gave us a room 150 meters from Ladies Gate 25 in Madinah and warm Indian dal-roti every single day. My mother prayed all 5 salah inside the Haram without fatigue.",
      author: "Haji Abdul Rahman & Family",
      city: "Hyderabad • Super Deluxe Package",
      rating: 5
    },
    {
      quote: "There was zero commercial rush. Our accompanying Maulana explained the history of every site in Madinah with such calmness and adab that tears flowed naturally. Every promise made in Mumbai was honored in Makkah.",
      author: "Dr. Farhana & Zubair Shaikh",
      city: "Mumbai • Royal 5-Star Haram View",
      rating: 5
    },
    {
      quote: "Transparent pricing down to the last rupee. We used the cost estimator on their website, locked our 6 family seats with ₹20,000 each, and received our visas, kits, and Haramain train tickets a week before flying from Delhi.",
      author: "Advocate Imran Siddiqui",
      city: "New Delhi • Family Group of 6",
      rating: 5
    }
  ],

  documentsRequired: [
    {
      step: "01",
      title: "Valid Indian Passport",
      detail: "Minimum 6 months validity from departure date with 2 blank pages (clear front & back scan on WhatsApp)."
    },
    {
      step: "02",
      title: "White-Background Photo",
      detail: "1 recent passport-size color photograph with a pure white background (80% face visibility)."
    },
    {
      step: "03",
      title: "PAN & Aadhaar Copy",
      detail: "Mandatory under Indian travel regulations for international tour compliance & smooth forex processing."
    },
    {
      step: "04",
      title: "₹20,000 Seat Reservation",
      detail: "Confirm your flight seat & Haram hotel room via UPI / NEFT / Cheque and pay the balance in easy stages."
    }
  ],

  faqs: [
    {
      question: "Is everything truly included in the displayed package price?",
      answer: "Yes, Alhamdulillah. Every rupee is transparent: Return Air Tickets from India, Umrah Visa with comprehensive Saudi Medical Insurance, Makkah & Madinah Hotel stays, 3-time daily freshly cooked Indian buffet meals, AC luxury transport, scholar-guided Ziyarat in both holy cities, our signature Pilgrim Welcome Kit, and a 5-liter sealed Zamzam water can."
    },
    {
      question: "How do Quad (4), Triple (3), and Double (2) room options work for families?",
      answer: "In Quad sharing, 4 beds are placed in a spacious room (ideal for a family of 4 or budget pilgrims). Triple sharing provides 3 beds, while Double sharing gives you a private 2-bed room designed for married couples or two elders seeking complete quietude. For individual pilgrims in Quad/Triple, gentlemen and ladies are always housed in separate rooms."
    },
    {
      question: "How do you care for elderly parents and wheelchair users?",
      answer: "Serving elders is our highest honor. Our Super Deluxe (300m flat walk) and Royal 5-Star (0m Haram Courtyard) hotels feature bank elevators, step-free wheelchair ramps, and close proximity to Masjid an-Nabawi Ladies Gate 25. Our ground team in Makkah and Madinah stays on call 24/7 for medical or mobility assistance."
    },
    {
      question: "What kind of food is served during the journey?",
      answer: "We serve comforting, hygienic home-style Indian meals 3 times daily (Breakfast, Lunch & Dinner) cooked by our own Indian chefs in Makkah and Madinah—featuring fresh rotis/parathas, aromatic rice, dal, chicken/mutton dishes, seasonal vegetables, salad, desserts, and hot Indian chai."
    },
    {
      question: "Can we book now with a partial payment and pay the rest in installments?",
      answer: "Absolutely. You can lock your airline seat and hotel allocation with an initial booking deposit of ₹20,000 per person. The remaining amount can be paid in serene, staggered installments prior to visa issuance and 15 days before departure."
    },
    {
      question: "Do you arrange departures from cities across India?",
      answer: "Yes. We operate seamless departures from Mumbai, New Delhi, Hyderabad, Bengaluru, Ahmedabad, Lucknow, Kolkata, Chennai, and Kochi/Kozhikode. Use our Interactive Cost Sanctuary Calculator above to see exact fares from your city."
    }
  ]
};
