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
    name: "Ummat Hajj Umrah",
    subName: "Tours & Travels India",
    fullName: "Ummat Hajj Umrah Tours & Travels",
    tagline: "Your Trusted Companion for a Blessed Journey to Makkah & Madinah",
    arabicBismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    arabicCalligraphy: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ",
    primaryDomain: "ummathajjumrah.com",
    secondaryDomain: "ummathajjumrah.in",
    // Enter your 10-digit Indian WhatsApp number with country code 91 (no + or spaces)
    whatsappNumber: "919876543210",
    // Formatted numbers displayed on the website
    displayPhonePrimary: "+91 98765 43210",
    displayPhoneSecondary: "+91 98765 43211",
    email: "info@ummathajjumrah.com",
    address: "Shop No. 14, Al-Barakah Arcade, Near Jama Masjid, Mohammed Ali Road, Mumbai - 400003, Maharashtra, India",
    branchCities: "Mumbai • Delhi • Hyderabad • Bengaluru • Ahmedabad • Lucknow",
    workingHours: "Mon – Sun: 10:00 AM to 9:00 PM (Friday break: 12:30 PM – 2:30 PM)",
    // Optional: Free Web3Forms access key (https://web3forms.com) to also receive email leads
    web3FormsAccessKey: "",
    stats: [
      { value: "12,500+", label: "Happy Pilgrims Served" },
      { value: "100%", label: "Visa Approval Track Record" },
      { value: "3 Times", label: "Fresh Indian Buffet Meals" },
      { value: "24/7", label: "Makkah & Madinah Ground Team" }
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

  // 7. HAJJ & CUSTOM TOURS SECTION (Complementary Offerings)
  specialServices: [
    {
      id: "hajj-packages",
      icon: "kaaba",
      tag: "Hajj 1448H / 2027",
      title: "Shifting & Non-Shifting Hajj Packages",
      description: "Pre-register for our Government-compliant private quota Hajj packages. Choose between Aziziya + Markazia Shifting packages or VIP Non-Shifting 5-Star packages near Jamarat & Haram with upgraded Mina AC tents.",
      startingHint: "Early Bird Registration & Guidance Available",
      features: [
        "Complete Nusuk / Private PTO Quota Guidance & Documentation",
        "Upgraded Gypsum Board AC Tents in Mina & Arafat with Sofa Cum Beds",
        "24/7 Medical Doctor, Aalim Guidance & Fresh Indian Meals in Mina",
        "Short (18–22 Days) & Long (34–40 Days) Hajj Itineraries"
      ],
      whatsappPrompt: "Assalamu Alaikum Ummat Travels, I would like to enquire about upcoming Hajj Packages (Shifting / Non-Shifting) and pre-registration details."
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

  // 8. DOCUMENTS REQUIRED & STEP-BY-STEP CHECKLIST
  documentsRequired: [
    {
      title: "Original Passport",
      detail: "Minimum 6 months validity from the date of departure with at least 2 blank pages (front & back scan)."
    },
    {
      title: "Passport Size Photograph",
      detail: "1 recent color photo with a pure WHITE background (without spectacles/caps, 80% face coverage)."
    },
    {
      title: "PAN Card & Aadhaar Card",
      detail: "Clear copy of PAN Card (mandatory under Indian TCS regulations for international tour bookings) & Aadhaar."
    },
    {
      title: "Booking Advance",
      detail: "Pay just ₹20,000 per person via Bank Transfer / UPI / Cheque to lock your airline seat & hotel room."
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
