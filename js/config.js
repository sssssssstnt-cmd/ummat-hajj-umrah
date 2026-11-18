/**
 * ============================================================================
 * UMMAT HAJJ UMRAH TOURS & TRAVELS (INDIA) — CENTRALIZED CONFIGURATION
 * ============================================================================
 * Edit this single file to update your phone numbers, WhatsApp number,
 * office address, departure cities, and Umrah/Hajj package prices anytime!
 */

window.UMMAT_CONFIG = {
  // 1. AGENCY DETAILS & CONTACT INFO
  agency: {
    name: "Ummat International",
    subName: "Hajj & Umrah Tours & Travels India",
    fullName: "Ummat International Tours & Travels",
    contactPerson: "Haji Aslam Jamkhed",
    tagline: "The Journey of a Lifetime — Trusted Travel Partner for a Sacred Journey",
    arabicBismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    arabicCalligraphy: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ",
    primaryDomain: "ummats.com",
    secondaryDomain: "ummathajjumrah.com",
    // 10-digit Indian WhatsApp number for Haji Aslam Jamkhed
    whatsappNumber: "919405070008",
    displayPhonePrimary: "+91 94050 70008",
    displayPhoneSecondary: "+91 23403 5689",
    email: "info@ummats.com",
    address: "Ummat International, Jamkhed / Mumbai, Maharashtra, India",
    branchCities: "Jamkhed • Mumbai • Pune • Ahmednagar • Aurangabad • Hyderabad",
    workingHours: "Daily: 9:00 AM to 10:00 PM (Direct Pilgrim Helpline Open 24/7)",
    web3FormsAccessKey: "",
    stats: [
      { value: "Thousands", label: "Of Pilgrims Served with Trust" },
      { value: "Zone 2", label: "Category B Mina Luxury Tents" },
      { value: "Hilton", label: "Makkah Sharif Tower Hotel" },
      { value: "Saudi Airlines", label: "Direct Flights Included" }
    ]
  },

  // 2. ROOM SHARING TYPES & PRICE ADJUSTMENTS (Per Adult in INR)
  sharingTypes: {
    quad: {
      id: "quad",
      label: "Quad (4 Sharing)",
      shortLabel: "Quad",
      description: "4 beds in 1 room — Best value for families & groups",
      priceAddon: 0
    },
    triple: {
      id: "triple",
      label: "Triple (3 Sharing)",
      shortLabel: "Triple",
      description: "3 beds in 1 room — Comfortable mid-size room",
      priceAddon: 9000
    },
    double: {
      id: "double",
      label: "Double (2 Sharing)",
      shortLabel: "Double",
      description: "2 beds in 1 room — Ideal for couples & elders",
      priceAddon: 18500
    }
  },

  // 3. CHILD & INFANT PRICING RULES (for the Cost Estimator)
  passengerPricing: {
    childWithBedRatio: 0.85,     // 85% of adult package price
    childWithoutBedRatio: 0.62,  // 62% of adult package price (flights + visa + transport)
    infantFlatFee: 19500         // Flat infant fee (Visa + Flight infant ticket)
  },

  // 4. INDIAN DEPARTURE CITIES & GATEWAY SURCHARGES
  departureCities: [
    { id: "mumbai", name: "Mumbai (BOM)", airline: "Saudia / Indigo / Air India Direct", addon: 0 },
    { id: "delhi", name: "Delhi (DEL)", airline: "Saudia / Air India Direct", addon: 0 },
    { id: "hyderabad", name: "Hyderabad (HYD)", airline: "Saudia / Indigo Direct", addon: 2000 },
    { id: "ahmedabad", name: "Ahmedabad (AMD)", airline: "Direct / 1-Stop Jeddah", addon: 1500 },
    { id: "bengaluru", name: "Bengaluru (BLR)", airline: "Saudia / Indigo Direct", addon: 3500 },
    { id: "lucknow", name: "Lucknow (LKO)", airline: "Saudia / Air India Express Direct", addon: 2500 },
    { id: "kolkata", name: "Kolkata (CCU)", airline: "Connecting / Direct Seasonal", addon: 4500 },
    { id: "chennai", name: "Chennai (MAA)", airline: "Direct / Connecting Flights", addon: 4000 },
    { id: "kochi", name: "Kochi / Calicut (COK/CCJ)", airline: "Air India Express / Saudia", addon: 3000 }
  ],

  // 5. UPCOMING DEPARTURE MONTHS / BATCHES
  departureMonths: [
    "Upcoming Weekly Batch (This Month)",
    "Next Month Special Batch",
    "Rajab & Shaban Umrah Batch",
    "Ramadan First 15 Days Batch",
    "Ramadan Last Ashra / Full Month",
    "Shawwal & Post-Eid Batch",
    "School Vacation Family Batch"
  ],

  // 6. PRIMARY UMRAH PACKAGES (Prices are Base Quad-Sharing in INR)
  umrahPackages: [
    {
      id: "economy-umrah",
      title: "Economy Umrah Package",
      subtitle: "Budget-Friendly All-Inclusive Spiritual Journey",
      badge: "Best Budget Choice",
      badgeType: "emerald",
      duration: "15 Days / 14 Nights",
      nightsSplit: "7 Nights Makkah • 7 Nights Madinah",
      basePriceQuad: 78000,
      originalPrice: 84000,
      makkahHotel: {
        name: "Al Kiswah Towers / Jawharat Al Rasheed or Similar",
        category: "Standard 3-Star Hotel",
        distance: "750m – 850m from Haram",
        shuttle: "24/7 Free AC Haram Shuttle Every 10 Mins"
      },
      madinahHotel: {
        name: "Badr Al Masa / Karam Al Khair or Similar",
        category: "Standard 3-Star Hotel",
        distance: "400m – 500m from Masjid an-Nabawi",
        shuttle: "Easy 6-Minute Walk to Haram Yard"
      },
      flights: "Return Economy Flights Included (Direct / 1-Stop)",
      meals: "3 Times Fresh Indian Food (Breakfast, Lunch & Dinner)",
      transport: "Full AC Luxury Bus (Jeddah – Makkah – Madinah – Airport)",
      highlights: [
        "Umrah Visa with Comprehensive Saudi Health Insurance",
        "Return Air Ticket from Major Indian Airports",
        "Daily Indian Buffet Meals Prepared by Indian Chefs",
        "Complete Makkah & Madinah Ziyarat with Experienced Aalim",
        "Complimentary Umrah Kit (Shoulder Bag, Ihram/Scarf, Tasbeeh, Dua Book)",
        "5 Liters Blessed Zamzam Water Can at Departure"
      ]
    },
    {
      id: "deluxe-umrah",
      title: "Super Deluxe Umrah Package",
      subtitle: "Walking Distance to Haram — Ideal for Families & Elders",
      badge: "Most Popular",
      badgeType: "gold",
      featured: true,
      duration: "15 Days / 14 Nights",
      nightsSplit: "7 Nights Makkah • 7 Nights Madinah",
      basePriceQuad: 95000,
      originalPrice: 104000,
      makkahHotel: {
        name: "Emaar Grand / Elaf Ajyad / Nawazi Watheer or Similar",
        category: "Superior 4-Star Class Hotel",
        distance: "300m – 350m from Masjid al-Haram",
        shuttle: "4-Minute Flat Walk from Ajyad / Ibrahim Khalil Rd"
      },
      madinahHotel: {
        name: "Taiba Front / Emaar Royal / Saja Al Madinah or Similar",
        category: "Superior 4-Star Class Hotel",
        distance: "150m – 200m from Masjid an-Nabawi",
        shuttle: "2-Minute Walk (Close to Ladies Gate 25)"
      },
      flights: "Direct Return Flights (Saudia / Air India / Indigo)",
      meals: "Lavish 3-Time Indian Buffet + Tea/Snacks",
      transport: "New Model Luxury AC Coach + Optional Haramain Train",
      highlights: [
        "Walking Distance Hotels in Both Makkah & Madinah (No Shuttle Needed)",
        "Direct Flights with 30kg + 7kg Baggage Allowance",
        "Close Access to Ladies Gate in Masjid an-Nabawi",
        "Guided Historical Ziyarat + Badr / Taif Visit Included",
        "Pre-Departure Umrah Training Seminar (Online & In-Person)",
        "Premium Umrah Welcome Kit + 5 Liters Official Zamzam"
      ]
    },
    {
      id: "luxury-5star-umrah",
      title: "Royal 5-Star Haram View Package",
      subtitle: "Zero Meters Clock Tower Complex & Haramain High-Speed Train",
      badge: "VIP 5-Star Luxury",
      badgeType: "royal",
      duration: "10 Days / 9 Nights (or 14 Days)",
      nightsSplit: "5 Nights Makkah Clock Tower • 4 Nights Madinah 5-Star",
      basePriceQuad: 138000,
      originalPrice: 152000,
      makkahHotel: {
        name: "Swissôtel / Pullman ZamZam / Fairmont Clock Tower",
        category: "International 5-Star Haram Courtyard",
        distance: "0 Meters (Direct Elevator to Haram Courtyard)",
        shuttle: "Direct Access to Mataf & Prayer Halls"
      },
      madinahHotel: {
        name: "Anwar Al Madinah Mövenpick / Pullman Zamzam Madinah",
        category: "International 5-Star Hotel",
        distance: "0m – 50m (Right in Front of Haram Piazza)",
        shuttle: "Steps Away from Rawdah & Ladies Gate"
      },
      flights: "Direct Full-Service Airlines (Saudia / Air India)",
      meals: "5-Star International & Authentic Indian Buffet Spread",
      transport: "Haramain High-Speed Bullet Train (Makkah ⇄ Madinah) + Private GMC/H1",
      highlights: [
        "Stay Directly on the Haram Courtyard (0m Walking Effort for Seniors)",
        "Haramain High-Speed Bullet Train Tickets Included (2 Hrs Makkah to Madinah)",
        "Private VIP Airport Transfers by Hyundai Staria / GMC Yukon",
        "Rawdah-e-Rasool Permit Booking Assistance on Nusuk App",
        "Dedicated VIP Relationship Manager & Private Guided Ziyarat",
        "Luxury Gift Hamper + 5L Zamzam per Pilgrim"
      ]
    },
    {
      id: "ramadan-special-umrah",
      title: "Blessed Ramadan Umrah Package",
      subtitle: "Experience the Reward of Hajj with the Prophet ﷺ in Ramadan",
      badge: "Ramadan 1448H Bookings Open",
      badgeType: "emerald",
      duration: "15 Days / 20 Days / Full Month Options",
      nightsSplit: "First Ashra • Second Ashra • Last 10 Nights (Laylatul Qadr)",
      basePriceQuad: 115000,
      originalPrice: 126000,
      makkahHotel: {
        name: "Walking Distance Hotel on Ajyad / Ibrahim Khalil Road",
        category: "Selected 3/4-Star Walking Distance",
        distance: "350m – 450m from Masjid al-Haram",
        shuttle: "5-Minute Walk for Taraweeh & Tahajjud Prayers"
      },
      madinahHotel: {
        name: "Central Markazia Area Hotel (North/West Zone)",
        category: "Selected Central Markazia Hotel",
        distance: "150m – 250m from Masjid an-Nabawi",
        shuttle: "3-Minute Walk to Haram Courtyard"
      },
      flights: "Confirmed Group Direct Tickets (Jeddah / Madinah)",
      meals: "Full Hot Indian Iftar Dinner Buffet + Pre-Dawn Suhoor (Sehri) Buffet",
      transport: "Full AC Coach Transfers + Local Ziyarat Tours",
      highlights: [
        "Special Indian Suhoor (Sehri) & Traditional Iftar Spread Every Day",
        "Walking Distance Hotels so You Never Miss Jama'at or Taraweeh",
        "Options Available for First 15 Days, Last 15 Days, or Full 30 Days",
        "Spiritual Discourses & Dua Sessions by Accompanying Aalim",
        "Complete Visa, Insurance, Kit & 5L Zamzam Included",
        "Easy EMI / Part-Payment Booking Facility (Book with ₹20,000 Advance)"
      ]
    }
  ],

  // 7. OFFICIAL HAJJ 2027 PLATINUM 36-DAYS SHIFTING PACKAGE
  hajj2027: {
    title: "HAJJ 2027 — THE JOURNEY OF A LIFETIME",
    subtitle: "Platinum 5-Star 36 Days Shifting Package • Zone 2 (Category B)",
    contactPerson: "Haji Aslam Jamkhed",
    helpline: "+91 94050 70008",
    whatsappNumber: "919405070008",
    airline: "Saudi Airlines (Direct Flight)",
    duration: "36 Days (Dhu al-Qi'dah 1, 1448H)",
    zoneCategory: "Zone 2 • Category B Mina Luxury Tents",
    hotels: {
      makkah: "Hilton Tower (Makkah Sharif Haram Courtyard)",
      madinah: "Central Markazia Area (Madinah Sharif)",
      aziziyah: "Aziziyah Air-Conditioned Building Stay"
    },
    pricing: [
      { beds: "5 Bed Sharing", price: 750000, label: "5 Bed Sharing" },
      { beds: "4 Bed Sharing", price: 770000, label: "4 Bed Sharing" },
      { beds: "3 Bed Sharing", price: 790000, label: "3 Bed Sharing" },
      { beds: "2 Bed Sharing", price: 810000, label: "2 Bed Sharing" }
    ],
    inclusions: [
      "Saudi Airlines Direct Return Air Ticket",
      "Official Hajj Visa & Saudi Medical Insurance",
      "Hilton Tower Makkah, Central Markazia Madinah & Aziziyah Accommodation",
      "3 Times Daily Hygienic & Delicious Indian Buffet Meals",
      "Unlimited Laundry Service in Holy Cities",
      "Upgraded A/C Tents in Mina (Zone 2, Category B)",
      "Full Air-Conditioned Luxury Coach Transportation",
      "Complete Ummat Travel Kit (Luggage Bags, Ihram, Books)",
      "5 Liters Sealed Official Zamzam Water (5LT Zam-Zam)"
    ],
    exclusions: [
      "Qurbani (Hady)",
      "Private Individual Transfers",
      "GST & TCS (As applicable per Indian travel norms)",
      "Anything Not Specifically Mentioned in Inclusions"
    ],
    itinerary: [
      { date: "11 Zil Qadah", title: "Direct Flight to Jeddah", desc: "Board Saudi Airlines direct flight from India to Jeddah; transfer to Hilton Tower Makkah." },
      { date: "25 Zil Qadah", title: "Hilton Tower to Madinah", desc: "Depart Makkah Sharif by luxury coach to Madinah Sharif Markazia hotel." },
      { date: "4 Zil Hijjah", title: "Madinah Sharif to Aziziyah", desc: "Proceed from Madinah Sharif to Aziziyah building stay for Hajj orientation." },
      { date: "4–6 Zil Hijjah", title: "Aziziyah Pre-Hajj Stay", desc: "Spiritual rest, Hajj training, and preparation for Mina." },
      { date: "7 Zil Hijjah", title: "Proceed to Mina (After Isha)", desc: "Wear Ihram and proceed after Isha prayer to Mina A/C Tents (Zone 2, Category B)." },
      { date: "9 Zil Hijjah (Day)", title: "Day of Arafat (After Fajr)", desc: "Proceed after Fajr to Plain of Arafat for the primary pillar of Hajj and collective Duas." },
      { date: "9 Zil Hijjah (Night)", title: "Night of Muzdalifah (At Maghrib)", desc: "Proceed at Maghrib to Muzdalifah under the open sky; collect pebbles for Ramee." },
      { date: "10 Zil Hijjah", title: "1st Day Ramee & Mina", desc: "Proceed at Fajr to Mina, then to Jamarah for 1st Day Ramee (Jamarat Al-Aqaba)." },
      { date: "11 Zil Hijjah", title: "2nd Day Ramee & Tawaf-e-Ziyarah", desc: "Proceed to Jamarah for 2nd Day Ramee and perform Tawaf-e-Ziyarah at Haram Sharif." },
      { date: "12 Zil Hijjah", title: "3rd Day Ramee & Aziziyah Transfer", desc: "Perform 3rd Day Ramee then transfer to Aziziyah accommodation." },
      { date: "13–16 Zil Hijjah", title: "Aziziyah Post-Hajj Stay", desc: "Tawaf-e-Wida and spiritual rest in Aziziyah." },
      { date: "16 Zil Hijjah", title: "Direct Return Flight to India", desc: "Transfer to Jeddah airport for Saudi Airlines direct flight back to India with 5L Zamzam." }
    ],
    documents: [
      { name: "Original Passport", desc: "Minimum 6 months validity from departure" },
      { name: "PAN Card", desc: "Mandatory for international tour remittance" },
      { name: "Aadhaar Card", desc: "Indian national identity proof" },
      { name: "2 Color Photos", desc: "White background passport-size" },
      { name: "Cheque / Bank Transfer", desc: "Official account payment" },
      { name: "20% Advance Booking", desc: "Confirm registration and seat allocation" }
    ]
  },

  // 8. HAJJ & CUSTOM TOURS SECTION (Complementary Offerings)
  specialServices: [
    {
      id: "hajj-packages",
      icon: "kaaba",
      tag: "Hajj 2027 Official",
      title: "Hajj 2027 Platinum 36-Days Shifting Package",
      description: "Direct Saudi Airlines flights, Hilton Tower Makkah, Central Markazia Madinah, Zone 2 Category B AC Mina Tents, 3-time Indian buffet meals & unlimited laundry. Bookings open with 20% advance.",
      startingHint: "From ₹7,50,000 (Haji Aslam Jamkhed: 9405070008)",
      features: [
        "Saudi Airlines Direct Return Flights",
        "Makkah: Hilton Tower • Madinah: Markazia",
        "Zone 2 Category B Mina AC Tents with Unlimited Laundry",
        "Complete 36 Days Guided Zil Qadah & Zil Hijjah Itinerary"
      ],
      whatsappPrompt: "Assalamu Alaikum Haji Aslam Jamkhed, I am interested in HAJJ 2027 Platinum 36 Days Shifting Package (₹7,50,000). Please share registration and payment details."
    },
    {
      id: "custom-family-umrah",
      icon: "family",
      tag: "Tailor-Made Dates",
      title: "Custom Private Family & Senior Citizen Umrah",
      description: "Can't travel on fixed group dates? We design personalized 7, 10, or 14-day private family Umrah packages on your exact chosen dates with wheelchair assistance, private cab transfers, and hotels of your choice.",
      startingHint: "Depart Any Day of the Week",
      features: [
        "Choose Your Own Travel Dates & Duration (5 to 21 Days)",
        "Private Sedan / Toyota Hiace / GMC Transfers (No Waiting for Buses)",
        "Wheelchair Assistance & Ground-Floor / Elevator-Accessible Rooms",
        "Optional Stopover in Dubai, Doha, or Istanbul"
      ],
      whatsappPrompt: "Assalamu Alaikum Ummat Travels, I want to plan a Custom Private Family Umrah package. Please share custom date options and pricing."
    },
    {
      id: "ziyarat-visa-services",
      icon: "globe",
      tag: "Add-On Extensions",
      title: "Taif, Badr, Al-Ula & International Ziyarat Tours",
      description: "Enrich your spiritual journey with guided day trips to Historical Badr, City of Roses Taif, Masjid Al-Ji'ranah, Hudaibiyah, plus dedicated Iraq (Karbala/Najaf/Baghdad) and Baitul Muqaddas (Al-Aqsa) Ziyarat groups.",
      startingHint: "Group & Standalone Visa Services",
      features: [
        "Taif & Badr Full-Day Guided Excursion with Traditional Lunch",
        "Standalone Umrah Visa + Saudi Insurance Processing in 24–48 Hours",
        "Haramain High-Speed Train & Hotel-Only Bookings at Wholesale Rates",
        "Group Air Ticketing for Sub-Agents & Jamat Organizers"
      ],
      whatsappPrompt: "Assalamu Alaikum Ummat Travels, I would like to enquire about Ziyarat extensions / Standalone Umrah Visa & Hotel bookings."
    }
  ],

  // 9. REQUIRED DOCUMENTS (Hajj & Umrah Registration)
  documentsRequired: [
    {
      title: "Original Passport",
      detail: "Minimum 6 months validity from departure date with at least 2 blank pages (clear front & back scan)."
    },
    {
      title: "PAN Card",
      detail: "Mandatory under Indian travel compliance regulations for international tour remittance."
    },
    {
      title: "Aadhaar Card",
      detail: "Clear copy of Government Aadhaar card for pilgrim identification and emergency records."
    },
    {
      title: "2 Passport Photos",
      detail: "Recent color photographs with a pure WHITE background (80% face coverage, no glare)."
    },
    {
      title: "Cheque / Online Bank Transfer",
      detail: "Official company account payment proof via Cheque, RTGS, NEFT, or verified UPI."
    },
    {
      title: "20% Booking Advance",
      detail: "Lock your Saudi Airlines flight seat, Hilton Tower room, and Mina Category B AC tent allocation."
    }
  ],

  // 9. FREQUENTLY ASKED QUESTIONS (FAQs)
  faqs: [
    {
      question: "What is included in your Umrah package starting price?",
      answer: "Our packages are 100% all-inclusive with zero hidden charges: Return Flights from India, Umrah Visa with mandatory Saudi Medical Insurance, Hotel accommodation in Makkah & Madinah, 3-time daily Indian buffet meals (breakfast, lunch & dinner), full AC luxury bus transport, guided Ziyarat in both holy cities with an experienced Aalim, a complimentary Umrah kit (bags, Ihram/scarf, books), and a 5-liter sealed Zamzam water can."
    },
    {
      question: "What is the difference between Quad, Triple, and Double room sharing?",
      answer: "In Quad sharing, 4 pilgrims share a spacious 4-bed hotel room (most budget-friendly). In Triple sharing, 3 beds are allotted in one room. In Double sharing, only 2 beds are placed in the room—making it ideal for married couples or two family members seeking complete privacy. Note: Even in Quad sharing for unrelated pilgrims, gents and ladies are accommodated in separate rooms."
    },
    {
      question: "Are the hotels accessible for elderly parents and wheelchair users?",
      answer: "Yes, Alhamdulillah. For elderly pilgrims, we strongly recommend our Super Deluxe (300m flat walk) or Royal 5-Star Haram View (0m courtyard) packages. All our partner hotels have multiple high-speed elevators, wheelchair ramps, and easy access to Masjid al-Haram and Masjid an-Nabawi Ladies Gate 25."
    },
    {
      question: "What kind of food is served during the tour?",
      answer: "We serve hygienic, freshly cooked Indian food 3 times a day (North Indian, Mughlai & South Indian touches) prepared by our own experienced Indian chefs in Makkah and Madinah—including roti/paratha, rice, dal, non-veg/veg curries, salad, sweets, and tea."
    },
    {
      question: "How can I book my package and can I pay in installments?",
      answer: "Yes! You can reserve your seat by paying an initial booking advance of ₹20,000 per person along with your passport copy. The remaining balance can be paid in easy stages before visa stamping and ticket issuance, up to 15 days prior to departure."
    },
    {
      question: "Do you arrange departures from cities other than Mumbai?",
      answer: "Yes, we operate regular departures from Mumbai, Delhi, Hyderabad, Ahmedabad, Bengaluru, Lucknow, Kolkata, Chennai, and Kozhikode/Kochi. You can select your departure city in our Umrah Cost Estimator above to see the exact fare from your nearest airport."
    }
  ]
};
