/**
 * ============================================================================
 * UMMAT HAJJ UMRAH TOURS & TRAVELS (INDIA) — REACT-POWERED SANCTUARY APPLICATION
 * ============================================================================
 * A world-standard, peace-oriented, zero-dependency reactive application.
 * Manages reactive state for:
 * - Room sharing toggle (Quad / Triple / Double) on every package card
 * - Interactive family pilgrimage cost estimator
 * - Controlled callback concierge form & pre-filled WhatsApp quotes
 * - Interactive FAQ accordion and mobile drawer
 */

(function () {
  "use strict";

  const CONFIG = window.UMMAT_CONFIG;
  if (!CONFIG) {
    console.error("UMMAT_CONFIG is missing!");
    return;
  }

  // Format INR in Indian Numbering System (e.g. ₹1,38,000)
  function formatINR(val) {
    const num = Math.round(Number(val) || 0);
    return "₹" + num.toLocaleString("en-IN");
  }

  // Generate WhatsApp Click-to-Chat Link
  function getWhatsAppUrl(message) {
    const cleanNumber = (CONFIG.agency.whatsappNumber || "919876543210").replace(/\D/g, "");
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  }

  // Application Global State Store
  const State = {
    packageSharing: {
      "economy-umrah": "quad",
      "deluxe-umrah": "quad",
      "luxury-5star-umrah": "quad",
      "ramadan-special-umrah": "quad"
    },
    estimator: {
      pkgId: "deluxe-umrah",
      sharing: "quad",
      cityId: "mumbai",
      month: CONFIG.departureMonths[0],
      adults: 2,
      children: 0,
      infants: 0
    },
    faqOpenIndex: 0,
    mobileMenuOpen: false
  };

  // SVG Icons
  const Icons = {
    whatsapp: `<svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/></svg>`,
    check: `<svg class="w-4 h-4 text-[#0C3B2E] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3" d="M5 13l4 4L19 7"/></svg>`,
    sparkle: `<svg class="w-3.5 h-3.5 text-[#C5A059] fill-current shrink-0" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`
  };

  const generalWhatsAppUrl = getWhatsAppUrl(
    `Assalamu Alaikum ${CONFIG.agency.fullName}, I am visiting ${CONFIG.agency.primaryDomain} and would like serene guidance regarding your upcoming Umrah & Hajj packages.`
  );

  // Render Full Application UI
  function renderApp() {
    const root = document.getElementById("root");
    if (!root) return;

    root.innerHTML = `
      <div class="min-h-screen flex flex-col bg-[#FBF9F5] text-[#17231F]">
        ${renderTopBar()}
        ${renderNavbar()}
        <main class="flex-grow">
          ${renderHero()}
          ${renderPeacePhilosophy()}
          ${renderPackagesSection()}
          ${renderCostEstimator()}
          ${renderSpecialServices()}
          ${renderPilgrimStories()}
          ${renderDocumentsAndFAQ()}
          ${renderConciergeCallback()}
        </main>
        ${renderFooter()}
        ${renderFloatingWhatsApp()}
      </div>
    `;

    bindEvents();
  }

  // Safe branch cities formatting
  function getBranchCitiesText() {
    if (Array.isArray(CONFIG.agency.branchCities)) {
      return CONFIG.agency.branchCities.slice(0, 6).join(" • ");
    }
    return String(CONFIG.agency.branchCities || "Mumbai • New Delhi • Hyderabad • Bengaluru • Ahmedabad • Lucknow");
  }

  // 1. Top Spiritual Bar
  function renderTopBar() {
    return `
      <div class="bg-[#07231B] text-[#EAE3D5] border-b border-[#C5A059]/25 text-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <span class="font-arabic text-[#E5CFA0] text-sm md:text-base tracking-wider">${CONFIG.agency.arabicBismillah}</span>
            <span class="hidden md:inline-block text-[#C5A059]/40">•</span>
            <span class="hidden md:inline-block text-[#EAE3D5]/80 font-light">
              Pan-India Departures: <strong class="text-[#E5CFA0] font-medium">${getBranchCitiesText()}</strong>
            </span>
          </div>
          <div class="flex items-center gap-4 ml-auto">
            <a href="tel:${CONFIG.agency.displayPhonePrimary.replace(/\s+/g, "")}" class="hover:text-[#E5CFA0] transition font-medium flex items-center gap-1.5">
              <span class="text-[#C5A059]">✆</span>
              <span>${CONFIG.agency.displayPhonePrimary}</span>
            </a>
            <span class="text-[#C5A059]/30">|</span>
            <span class="text-[#E5CFA0] font-medium hidden sm:inline">Reserve Seat with ₹20,000 Deposit</span>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Translucent Alabaster Navbar
  function renderNavbar() {
    return `
      <header class="sticky top-0 z-50 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#C5A059]/25 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <a href="#" class="flex items-center gap-3.5 group">
            <div class="w-11 h-11 rounded-full bg-[#0C3B2E] border border-[#C5A059] flex items-center justify-center text-[#E5CFA0] shadow-sm group-hover:scale-105 transition">
              <span class="font-arabic text-lg leading-none">أمة</span>
            </div>
            <div>
              <div class="text-lg md:text-xl font-bold font-display-serif tracking-wider text-[#07231B]">
                UMMAT <span class="text-[#9E7B36]">HAJJ UMRAH</span>
              </div>
              <div class="text-[10px] uppercase tracking-[0.22em] text-[#556660] font-semibold">
                Tours &amp; Travels • India
              </div>
            </div>
          </a>

          <nav class="hidden xl:flex items-center gap-6 text-[13px] font-semibold text-[#17231F]/85">
            <a href="#peace-philosophy" class="hover:text-[#0C3B2E] transition py-1">Our Philosophy</a>
            <a href="#umrah-packages" class="hover:text-[#0C3B2E] transition py-1">Umrah Sanctuaries</a>
            <a href="#cost-estimator" class="hover:text-[#0C3B2E] transition flex items-center gap-1.5 py-1">
              <span>Cost Estimator</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-[#0C3B2E]/10 text-[#0C3B2E] font-bold">Live</span>
            </a>
            <a href="#hajj-custom-tours" class="hover:text-[#0C3B2E] transition py-1">Hajj &amp; Private Tours</a>
            <a href="#pilgrim-stories" class="hover:text-[#0C3B2E] transition py-1">Pilgrim Stories</a>
            <a href="#documents-faq" class="hover:text-[#0C3B2E] transition py-1">Guidance &amp; FAQ</a>
            <a href="#callback-section" class="hover:text-[#0C3B2E] transition py-1">Concierge</a>
          </nav>

          <div class="hidden sm:flex items-center gap-2.5">
            <a href="${generalWhatsAppUrl}" target="_blank" rel="noopener noreferrer"
               class="px-4 py-2.5 rounded-full bg-[#0C3B2E] hover:bg-[#07231B] text-[#FBF9F5] font-semibold text-xs flex items-center gap-2 shadow-sm transition">
              ${Icons.whatsapp}
              <span>WhatsApp Concierge</span>
            </a>
            <a href="#callback-section" class="px-4 py-2.5 rounded-full bg-champagne-gradient text-[#07231B] font-bold text-xs shadow-sm transition">
              Request Callback
            </a>
          </div>

          <button id="nav-toggle-btn" type="button" aria-label="Toggle Navigation"
                  class="xl:hidden p-2.5 rounded-xl bg-[#0C3B2E]/10 text-[#0C3B2E] border border-[#C5A059]/30">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>

        <div id="mobile-drawer" class="${State.mobileMenuOpen ? "" : "hidden"} xl:hidden bg-[#FBF9F5] border-t border-[#C5A059]/25 px-4 pt-3 pb-6 space-y-2 shadow-xl">
          <a href="#peace-philosophy" class="mobile-nav-link block py-2.5 px-3 rounded-xl hover:bg-[#0C3B2E]/5 font-semibold text-sm text-[#07231B]">Our Philosophy</a>
          <a href="#umrah-packages" class="mobile-nav-link block py-2.5 px-3 rounded-xl hover:bg-[#0C3B2E]/5 font-semibold text-sm text-[#07231B]">Umrah Sanctuaries (From ₹78,000)</a>
          <a href="#cost-estimator" class="mobile-nav-link block py-2.5 px-3 rounded-xl hover:bg-[#0C3B2E]/5 font-semibold text-sm text-[#07231B]">Interactive Family Cost Estimator</a>
          <a href="#hajj-custom-tours" class="mobile-nav-link block py-2.5 px-3 rounded-xl hover:bg-[#0C3B2E]/5 font-semibold text-sm text-[#07231B]">Hajj 2027 &amp; Private Family Umrah</a>
          <a href="#pilgrim-stories" class="mobile-nav-link block py-2.5 px-3 rounded-xl hover:bg-[#0C3B2E]/5 font-semibold text-sm text-[#07231B]">Pilgrim Testimonials &amp; Welcome Kit</a>
          <a href="#documents-faq" class="mobile-nav-link block py-2.5 px-3 rounded-xl hover:bg-[#0C3B2E]/5 font-semibold text-sm text-[#07231B]">Required Documents &amp; FAQ</a>
          <a href="#callback-section" class="mobile-nav-link block py-2.5 px-3 rounded-xl hover:bg-[#0C3B2E]/5 font-semibold text-sm text-[#07231B]">Concierge &amp; Office Contact</a>
        </div>
      </header>
    `;
  }

  // 3. Hero Section
  function renderHero() {
    return `
      <section class="relative bg-sanctuary-light overflow-hidden pt-10 pb-16 lg:py-20 border-b border-[#C5A059]/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            <div class="lg:col-span-7 space-y-6">
              <div class="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0C3B2E]/5 border border-[#C5A059]/40 text-[#0C3B2E] text-xs font-semibold">
                <span class="w-2 h-2 rounded-full bg-[#C5A059] animate-ping"></span>
                <span>World-Standard Sanctuary • 2026–2027 Sacred Departures Open</span>
              </div>

              <div class="space-y-2">
                <p class="font-arabic text-2xl sm:text-3xl text-[#9E7B36] tracking-wide">${CONFIG.agency.arabicTalbiyah}</p>
                <p class="text-xs italic text-[#556660] font-serif">${CONFIG.agency.talbiyahTranslation}</p>
              </div>

              <h1 class="text-4xl sm:text-5xl lg:text-[56px] font-bold font-editorial text-[#07231B] leading-[1.08] tracking-tight">
                Answer the Sacred Call with <span class="italic font-normal text-[#0C3B2E] underline decoration-[#C5A059]/50 decoration-1 underline-offset-8">Stillness of Heart</span> &amp; Complete Care.
              </h1>

              <p class="text-base sm:text-lg text-[#556660] max-w-2xl leading-relaxed font-normal">
                We remove every worldly distraction from your pilgrimage. Experience <strong class="text-[#07231B] font-semibold">steps-from-Haram sanctuaries</strong> in Makkah and Madinah, direct flights from 9+ Indian cities, comforting Indian meals, and gentle Sunnah guidance for your parents and family.
              </p>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div class="p-3 rounded-2xl bg-white/90 border border-[#C5A059]/25 shadow-sm">
                  <div class="text-[11px] uppercase tracking-wider text-[#556660] font-semibold">Haram Proximity</div>
                  <div class="text-xs sm:text-sm font-bold text-[#07231B] mt-0.5">0m to 350m Walk</div>
                </div>
                <div class="p-3 rounded-2xl bg-white/90 border border-[#C5A059]/25 shadow-sm">
                  <div class="text-[11px] uppercase tracking-wider text-[#556660] font-semibold">All-Inclusive</div>
                  <div class="text-xs sm:text-sm font-bold text-[#07231B] mt-0.5">Flights • Visa • Meals</div>
                </div>
                <div class="p-3 rounded-2xl bg-white/90 border border-[#C5A059]/25 shadow-sm">
                  <div class="text-[11px] uppercase tracking-wider text-[#556660] font-semibold">Indian Dining</div>
                  <div class="text-xs sm:text-sm font-bold text-[#07231B] mt-0.5">3x Daily Fresh Buffet</div>
                </div>
                <div class="p-3 rounded-2xl bg-white/90 border border-[#C5A059]/25 shadow-sm">
                  <div class="text-[11px] uppercase tracking-wider text-[#556660] font-semibold">Calm Booking</div>
                  <div class="text-xs sm:text-sm font-bold text-[#07231B] mt-0.5">₹20,000 Seat Deposit</div>
                </div>
              </div>

              <div class="pt-3 flex flex-wrap items-center gap-4">
                <a href="#umrah-packages" class="px-7 py-4 rounded-full bg-[#0C3B2E] hover:bg-[#07231B] text-[#FBF9F5] font-semibold text-sm shadow-lg hover:shadow-xl transition flex items-center gap-2.5">
                  <span>Explore Serene Packages (From ₹78,000)</span>
                  <span>→</span>
                </a>
                <a href="#cost-estimator" class="px-6 py-4 rounded-full bg-white hover:bg-[#F4F0E8] text-[#07231B] border border-[#C5A059]/50 font-semibold text-sm shadow-sm transition">
                  Calculate Family Estimate
                </a>
              </div>
            </div>

            <!-- Architectural Mihrab Arch Window -->
            <div class="lg:col-span-5">
              <div class="relative mx-auto max-w-md">
                <div class="absolute -inset-4 rounded-t-[200px] rounded-b-3xl bg-gradient-to-b from-[#C5A059]/20 via-[#0C3B2E]/10 to-transparent blur-2xl animate-serene-glow -z-10"></div>
                <div class="mihrab-arch bg-white p-3 border-2 border-[#C5A059]/45 shadow-2xl">
                  <div class="mihrab-arch relative overflow-hidden bg-[#07231B] text-white">
                    <img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=85"
                         alt="Masjid al-Haram Kaaba" class="w-full h-64 sm:h-72 object-cover opacity-55 scale-105" />
                    <div class="absolute inset-0 bg-gradient-to-t from-[#07231B] via-[#07231B]/55 to-transparent"></div>

                    <div class="absolute top-6 inset-x-0 text-center">
                      <span class="inline-block px-4 py-1 rounded-full bg-[#07231B]/75 backdrop-blur-md border border-[#C5A059]/40 font-arabic text-lg text-[#E5CFA0]">
                        ضُيُوفُ الرَّحْمَٰن
                      </span>
                    </div>

                    <div class="relative p-6 sm:p-7 -mt-14 space-y-4">
                      <div class="flex items-center justify-between">
                        <span class="text-[11px] uppercase tracking-[0.2em] text-[#E5CFA0] font-semibold">Signature Family Sanctuary</span>
                        <span class="text-xs px-2.5 py-0.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#E5CFA0]">15 Days / 14 Nights</span>
                      </div>

                      <h2 class="text-2xl sm:text-3xl font-editorial font-bold text-white leading-snug">
                        Super Deluxe Haram-Walk Sanctuary
                      </h2>

                      <p class="text-xs text-[#EAE3D5]/85 leading-relaxed">
                        Stay just <strong class="text-[#E5CFA0]">300m in Makkah</strong> &amp; <strong class="text-[#E5CFA0]">150m in Madinah</strong> (steps from Ladies Gate 25). Designed so your parents never need a shuttle or taxi.
                      </p>

                      <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-[#C5A059]/30 flex items-center justify-between">
                        <div>
                          <div class="text-[11px] text-[#EAE3D5]/80 uppercase tracking-wider">All-Inclusive Starting Rate</div>
                          <div class="text-2xl sm:text-3xl font-extrabold text-[#E5CFA0] mt-0.5">₹95,000 <span class="text-xs font-normal text-[#EAE3D5]">/ guest</span></div>
                        </div>
                        <div class="text-right text-[11px] text-[#EAE3D5]/85">
                          <div class="font-semibold text-white">Economy Tier</div>
                          <div>From ₹78,000</div>
                        </div>
                      </div>

                      <a href="${generalWhatsAppUrl}" target="_blank" rel="noopener noreferrer"
                         class="w-full py-3.5 px-5 rounded-full bg-champagne-gradient text-[#07231B] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition">
                        ${Icons.whatsapp}
                        <span>Speak with a Serene Umrah Advisor</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Stats Strip -->
          <div class="mt-14 pt-10 border-t border-[#C5A059]/25 grid grid-cols-2 lg:grid-cols-4 gap-6">
            ${CONFIG.agency.stats.map(st => `
              <div class="bg-white/80 rounded-2xl p-5 border border-[#C5A059]/20 text-center shadow-sm">
                <div class="text-3xl sm:text-4xl font-bold font-editorial text-[#0C3B2E]">${st.value}</div>
                <div class="text-xs sm:text-sm font-bold text-[#07231B] mt-1">${st.label}</div>
                <div class="text-[11px] text-[#556660] mt-0.5">${st.detail}</div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  }

  // 4. Peace Philosophy Section
  function renderPeacePhilosophy() {
    return `
      <section id="peace-philosophy" class="py-16 md:py-24 bg-[#F4F0E8] border-b border-[#C5A059]/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-14">
            <div class="peace-divider text-[#9E7B36] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              <span>Khidmat with Sakinah (Tranquility)</span>
            </div>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#07231B]">
              Designed for Devotion, Not Commercial Rush
            </h2>
            <p class="text-sm sm:text-base text-[#556660] mt-3 leading-relaxed">
              A pilgrimage should feel like a deep spiritual exhale. We limit our batch sizes and handle every detail with quiet reverence.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${CONFIG.peacePillars.map(pillar => `
              <div class="bg-[#FBF9F5] rounded-3xl p-7 sm:p-8 border border-[#C5A059]/30 shadow-sm flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div class="flex items-center justify-between mb-6">
                    <span class="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#0C3B2E]/10 text-[#0C3B2E]">
                      Pillar ${pillar.step}
                    </span>
                    <span class="font-arabic text-xl text-[#9E7B36]">${pillar.arabic}</span>
                  </div>
                  <h3 class="text-2xl font-bold font-editorial text-[#07231B] leading-snug">${pillar.title}</h3>
                  <p class="text-xs sm:text-sm text-[#556660] mt-3 leading-relaxed">${pillar.description}</p>
                </div>
                <div class="mt-6 pt-4 border-t border-[#C5A059]/15 flex items-center gap-2 text-xs font-semibold text-[#0C3B2E]">
                  ${Icons.sparkle}
                  <span>Ummat Sanctuary Standard</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  }

  // 5. Umrah Packages Section
  function renderPackagesSection() {
    return `
      <section id="umrah-packages" class="py-16 md:py-24 bg-sanctuary-light">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-14">
            <div class="peace-divider text-[#9E7B36] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              <span>100% Transparent • Zero Hidden Charges</span>
            </div>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#07231B]">
              Choose Your Umrah Sanctuary Tier
            </h2>
            <p class="text-sm sm:text-base text-[#556660] mt-3">
              Toggle between <strong class="text-[#07231B]">Quad (4)</strong>, <strong class="text-[#07231B]">Triple (3)</strong>, and <strong class="text-[#07231B]">Private Double (2)</strong> on any sanctuary card to view instant per-person pricing in INR.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
            ${CONFIG.umrahPackages.map(pkg => renderPackageCard(pkg)).join("")}
          </div>

          <div class="mt-10 bg-white rounded-3xl p-6 border border-[#C5A059]/35 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-[#0C3B2E] text-[#E5CFA0] flex items-center justify-center text-xl shrink-0">🕌</div>
              <div>
                <h4 class="font-bold font-editorial text-xl text-[#07231B]">Planning for an Extended Family or Masjid Jamat of 10+ Pilgrims?</h4>
                <p class="text-xs sm:text-sm text-[#556660]">We arrange dedicated adjacent rooms on the same hotel floor and offer special family-head concessions.</p>
              </div>
            </div>
            <a href="${generalWhatsAppUrl}" target="_blank" rel="noopener noreferrer"
               class="px-5 py-3 rounded-full bg-champagne-gradient text-[#07231B] font-bold text-xs shrink-0 shadow-sm transition">
              Request Family Group Quote →
            </a>
          </div>
        </div>
      </section>
    `;
  }

  function renderPackageCard(pkg) {
    const activeSharing = State.packageSharing[pkg.id] || "quad";
    const sharingObj = CONFIG.sharingTypes[activeSharing] || CONFIG.sharingTypes.quad;
    const currentPrice = pkg.basePriceQuad + sharingObj.priceAddon;
    const currentOriginal = pkg.originalPrice + sharingObj.priceAddon;

    const waMsg = `Assalamu Alaikum ${CONFIG.agency.fullName},\n\nI would like serene guidance on your Umrah Sanctuary package:\n• *Package:* ${pkg.title} (${pkg.duration})\n• *Room Sharing:* ${sharingObj.label}\n• *Displayed All-Inclusive Rate:* ${formatINR(currentPrice)} per person\n• *Makkah Sanctuary:* ${pkg.makkahHotel.distance}\n• *Madinah Sanctuary:* ${pkg.madinahHotel.distance}\n\nPlease share upcoming batch dates and booking details.`;
    const waUrl = getWhatsAppUrl(waMsg);

    return `
      <article class="sanctuary-card rounded-3xl overflow-hidden flex flex-col justify-between ${pkg.featured ? "sanctuary-card-featured ring-1 ring-[#C5A059]" : ""}">
        <div>
          <!-- Atmospheric Image Header -->
          <div class="relative h-44 bg-[#07231B] overflow-hidden">
            <img src="${pkg.image}" alt="${pkg.title}" class="w-full h-full object-cover opacity-55 hover:scale-105 transition duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#07231B] via-[#07231B]/45 to-transparent"></div>

            <div class="absolute top-3.5 inset-x-4 flex items-center justify-between gap-2">
              <span class="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider px-3 py-1 rounded-full font-bold ${pkg.featured ? "bg-champagne-gradient text-[#07231B]" : "bg-[#07231B]/80 text-[#E5CFA0] border border-[#C5A059]/40 backdrop-blur-md"}">
                ${Icons.sparkle}
                <span>${pkg.badge}</span>
              </span>
              <span class="text-[11px] font-medium bg-black/50 backdrop-blur-md text-[#EAE3D5] px-2.5 py-1 rounded-full border border-white/15">
                ${pkg.duration}
              </span>
            </div>

            <div class="absolute bottom-3.5 inset-x-5">
              <div class="text-[10px] uppercase tracking-[0.2em] text-[#E5CFA0] font-semibold">${pkg.tier}</div>
              <h3 class="text-2xl font-bold font-editorial text-white leading-tight">${pkg.title}</h3>
            </div>
          </div>

          <!-- Room Sharing Switcher & Live Price -->
          <div class="p-5 bg-gradient-to-b from-[#F7F1E3]/70 to-white border-b border-[#EAE3D5]">
            <div class="flex items-center justify-between text-xs mb-2">
              <span class="font-bold uppercase tracking-wider text-[#556660] text-[11px]">Room Sharing:</span>
              <span class="font-semibold text-[#0C3B2E] text-[11px]">${sharingObj.pillSub}</span>
            </div>

            <div class="grid grid-cols-3 gap-1.5 bg-[#EAE3D5]/70 p-1 rounded-xl">
              ${Object.values(CONFIG.sharingTypes).map(tab => {
                const isActive = activeSharing === tab.id;
                return `
                  <button type="button" data-pkg-id="${pkg.id}" data-sharing="${tab.id}"
                          class="pkg-sharing-tab py-2 px-2 rounded-lg text-xs font-bold transition cursor-pointer ${isActive ? "bg-[#0C3B2E] text-white shadow-sm" : "text-[#556660] hover:text-[#07231B]"}">
                    ${tab.shortLabel}
                  </button>
                `;
              }).join("")}
            </div>

            <div class="mt-4 pt-3 border-t border-[#EAE3D5] flex items-baseline justify-between flex-wrap gap-2">
              <div>
                <span class="text-[11px] uppercase tracking-wider text-[#556660] block font-medium">All-Inclusive Per Guest</span>
                <div class="flex items-baseline gap-2 mt-0.5">
                  <span class="text-3xl font-extrabold text-[#07231B] tracking-tight">${formatINR(currentPrice)}</span>
                  <span class="text-xs text-[#556660]/70 line-through font-medium">${formatINR(currentOriginal)}</span>
                </div>
              </div>
              <div class="text-right">
                <span class="inline-block bg-[#E9F1EE] text-[#0C3B2E] text-[11px] font-bold px-2.5 py-1 rounded-full">
                  ${pkg.nightsSplit.split("•")[0].trim()}
                </span>
                <span class="block text-[11px] text-[#9E7B36] font-semibold mt-1">Lock Seat w/ ₹20,000</span>
              </div>
            </div>
          </div>

          <!-- Haram Distance & Inclusions -->
          <div class="p-5 space-y-3.5">
            <div class="p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#C5A059]/30">
              <div class="flex items-start gap-2.5">
                <span class="text-base mt-0.5">🕋</span>
                <div class="text-xs">
                  <div class="font-bold text-[#07231B] uppercase tracking-wide">Makkah • <span class="text-[#9E7B36]">${pkg.makkahHotel.distance}</span></div>
                  <div class="text-[#556660] font-medium mt-0.5">${pkg.makkahHotel.name}</div>
                  <div class="text-[#0C3B2E] text-[11px] font-semibold mt-0.5">${pkg.makkahHotel.walkTime}</div>
                </div>
              </div>
            </div>

            <div class="p-3.5 rounded-2xl bg-[#FBF9F5] border border-[#C5A059]/30">
              <div class="flex items-start gap-2.5">
                <span class="text-base mt-0.5">🕌</span>
                <div class="text-xs">
                  <div class="font-bold text-[#07231B] uppercase tracking-wide">Madinah • <span class="text-[#0C3B2E]">${pkg.madinahHotel.distance}</span></div>
                  <div class="text-[#556660] font-medium mt-0.5">${pkg.madinahHotel.name}</div>
                  <div class="text-[#0C3B2E] text-[11px] font-semibold mt-0.5">${pkg.madinahHotel.walkTime}</div>
                </div>
              </div>
            </div>

            <div class="text-xs space-y-1.5 pt-1 text-[#556660]">
              <div class="flex items-start gap-2">
                <span class="font-bold text-[#07231B] shrink-0">✈️ Flights:</span>
                <span>${pkg.flights}</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="font-bold text-[#07231B] shrink-0">🍛 Dining:</span>
                <span>${pkg.meals}</span>
              </div>
            </div>

            <div class="pt-3 border-t border-[#EAE3D5]">
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#556660] mb-2">Sanctuary Inclusions:</div>
              <ul class="space-y-1.5 text-xs text-[#17231F]/90">
                ${pkg.highlights.map(h => `
                  <li class="flex items-start gap-2">
                    ${Icons.check}
                    <span>${h}</span>
                  </li>
                `).join("")}
              </ul>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-5 pt-3 border-t border-[#EAE3D5] bg-[#FBF9F5]/60 space-y-2">
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer"
             class="w-full py-3 px-4 rounded-xl bg-[#0C3B2E] hover:bg-[#07231B] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition">
            ${Icons.whatsapp}
            <span>Enquire on WhatsApp</span>
          </a>
          <button type="button" data-calc-pkg="${pkg.id}" data-calc-sharing="${activeSharing}"
                  class="calc-select-btn w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F4F0E8] text-[#07231B] border border-[#C5A059]/40 font-semibold text-xs transition cursor-pointer">
            Calculate Family Total for This Tier ↓
          </button>
        </div>
      </article>
    `;
  }

  // 6. Interactive Cost Estimator
  function renderCostEstimator() {
    const est = State.estimator;
    const pkg = CONFIG.umrahPackages.find(p => p.id === est.pkgId) || CONFIG.umrahPackages[1];
    const sharing = CONFIG.sharingTypes[est.sharing] || CONFIG.sharingTypes.quad;
    const city = CONFIG.departureCities.find(c => c.id === est.cityId) || CONFIG.departureCities[0];

    const perAdultRate = pkg.basePriceQuad + sharing.priceAddon + city.addon;
    const perChildRate = Math.round(perAdultRate * CONFIG.passengerPricing.childWithBedRatio);
    const perInfantRate = CONFIG.passengerPricing.infantFlatFee;

    const adultsTotal = est.adults * perAdultRate;
    const childrenTotal = est.children * perChildRate;
    const infantsTotal = est.infants * perInfantRate;
    const grandTotal = adultsTotal + childrenTotal + infantsTotal;
    const totalPilgrims = est.adults + est.children + est.infants;
    const depositTotal = (est.adults + est.children) * 20000;

    const quoteMsg = `Assalamu Alaikum ${CONFIG.agency.fullName},\n\nI prepared a family estimate on your website (${CONFIG.agency.primaryDomain}) and would appreciate your official quote:\n\n• *Sanctuary Tier:* ${pkg.title} (${pkg.duration})\n• *Room Sharing:* ${sharing.label}\n• *Departure Gateway:* ${city.name}\n• *Preferred Batch:* ${est.month}\n• *Pilgrims:* ${est.adults} Adult(s)${est.children > 0 ? `, ${est.children} Child(ren)` : ""}${est.infants > 0 ? `, ${est.infants} Infant(s)` : ""}\n• *Estimated Total:* ${formatINR(grandTotal)}\n\nPlease guide us on seat availability and family concessions.`;
    const quoteUrl = getWhatsAppUrl(quoteMsg);

    return `
      <section id="cost-estimator" class="py-16 md:py-24 bg-[#07231B] bg-sanctuary-emerald text-white relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-14">
            <div class="peace-divider text-[#E5CFA0] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              <span>Interactive Sanctuary Planner</span>
            </div>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-white">
              Plan Your Family’s Pilgrimage Budget in Peace
            </h2>
            <p class="text-sm sm:text-base text-[#EAE3D5]/80 mt-3">
              Customize your sanctuary tier, room privacy, departure airport in India, and family size for an instant, transparent breakdown.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <!-- Controls -->
            <div class="lg:col-span-7 bg-[#FBF9F5] text-[#17231F] rounded-3xl p-6 sm:p-9 shadow-2xl border border-[#C5A059]/40 space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-[#0C3B2E] mb-2">1. Sanctuary Tier</label>
                  <select id="est-pkg-select" class="w-full rounded-xl border border-[#C5A059]/40 bg-white px-4 py-3 text-sm font-semibold text-[#07231B] focus:outline-none focus:ring-2 focus:ring-[#0C3B2E]">
                    ${CONFIG.umrahPackages.map(p => `
                      <option value="${p.id}" ${p.id === est.pkgId ? "selected" : ""}>${p.title} (From ${formatINR(p.basePriceQuad)})</option>
                    `).join("")}
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-[#0C3B2E] mb-2">2. Room Privacy / Sharing</label>
                  <select id="est-sharing-select" class="w-full rounded-xl border border-[#C5A059]/40 bg-white px-4 py-3 text-sm font-semibold text-[#07231B] focus:outline-none focus:ring-2 focus:ring-[#0C3B2E]">
                    ${Object.values(CONFIG.sharingTypes).map(sh => `
                      <option value="${sh.id}" ${sh.id === est.sharing ? "selected" : ""}>${sh.label} ${sh.priceAddon > 0 ? `(+${formatINR(sh.priceAddon)})` : "(Base Rate)"}</option>
                    `).join("")}
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-[#0C3B2E] mb-2">3. Indian Departure Airport</label>
                  <select id="est-city-select" class="w-full rounded-xl border border-[#C5A059]/40 bg-white px-4 py-3 text-sm font-semibold text-[#07231B] focus:outline-none focus:ring-2 focus:ring-[#0C3B2E]">
                    ${CONFIG.departureCities.map(c => `
                      <option value="${c.id}" ${c.id === est.cityId ? "selected" : ""}>${c.name} — ${c.airline} ${c.addon > 0 ? `(+${formatINR(c.addon)})` : ""}</option>
                    `).join("")}
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-[#0C3B2E] mb-2">4. Preferred Season / Batch</label>
                  <select id="est-month-select" class="w-full rounded-xl border border-[#C5A059]/40 bg-white px-4 py-3 text-sm font-semibold text-[#07231B] focus:outline-none focus:ring-2 focus:ring-[#0C3B2E]">
                    ${CONFIG.departureMonths.map(m => `
                      <option value="${m}" ${m === est.month ? "selected" : ""}>${m}</option>
                    `).join("")}
                  </select>
                </div>
              </div>

              <!-- Pilgrim Counter Steppers -->
              <div class="pt-4 border-t border-[#EAE3D5]">
                <span class="block text-xs font-bold uppercase tracking-wider text-[#0C3B2E] mb-3">5. Number of Family Members</span>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <!-- Adults -->
                  <div class="p-3.5 rounded-2xl bg-white border border-[#C5A059]/35 flex items-center justify-between">
                    <div>
                      <div class="text-xs font-bold text-[#07231B]">Adults</div>
                      <div class="text-[11px] text-[#556660]">12+ Years</div>
                    </div>
                    <div class="flex items-center gap-2">
                      <button type="button" data-delta-target="adults" data-delta="-1" class="stepper-btn w-8 h-8 rounded-lg bg-[#F4F0E8] font-bold text-[#07231B] hover:bg-[#EAE3D5] cursor-pointer">−</button>
                      <span class="w-6 text-center font-extrabold text-sm text-[#07231B]">${est.adults}</span>
                      <button type="button" data-delta-target="adults" data-delta="1" class="stepper-btn w-8 h-8 rounded-lg bg-[#0C3B2E] text-white font-bold hover:bg-[#07231B] cursor-pointer">+</button>
                    </div>
                  </div>

                  <!-- Children -->
                  <div class="p-3.5 rounded-2xl bg-white border border-[#C5A059]/35 flex items-center justify-between">
                    <div>
                      <div class="text-xs font-bold text-[#07231B]">Children</div>
                      <div class="text-[11px] text-[#556660]">2–11 Yrs (15% Off)</div>
                    </div>
                    <div class="flex items-center gap-2">
                      <button type="button" data-delta-target="children" data-delta="-1" class="stepper-btn w-8 h-8 rounded-lg bg-[#F4F0E8] font-bold text-[#07231B] hover:bg-[#EAE3D5] cursor-pointer">−</button>
                      <span class="w-6 text-center font-extrabold text-sm text-[#07231B]">${est.children}</span>
                      <button type="button" data-delta-target="children" data-delta="1" class="stepper-btn w-8 h-8 rounded-lg bg-[#0C3B2E] text-white font-bold hover:bg-[#07231B] cursor-pointer">+</button>
                    </div>
                  </div>

                  <!-- Infants -->
                  <div class="p-3.5 rounded-2xl bg-white border border-[#C5A059]/35 flex items-center justify-between">
                    <div>
                      <div class="text-xs font-bold text-[#07231B]">Infants</div>
                      <div class="text-[11px] text-[#556660]">Under 2 Yrs</div>
                    </div>
                    <div class="flex items-center gap-2">
                      <button type="button" data-delta-target="infants" data-delta="-1" class="stepper-btn w-8 h-8 rounded-lg bg-[#F4F0E8] font-bold text-[#07231B] hover:bg-[#EAE3D5] cursor-pointer">−</button>
                      <span class="w-6 text-center font-extrabold text-sm text-[#07231B]">${est.infants}</span>
                      <button type="button" data-delta-target="infants" data-delta="1" class="stepper-btn w-8 h-8 rounded-lg bg-[#0C3B2E] text-white font-bold hover:bg-[#07231B] cursor-pointer">+</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="p-4 rounded-2xl bg-[#F4F0E8] border border-[#C5A059]/30 text-xs text-[#07231B] flex items-start gap-3">
                <span class="text-base">🕊️</span>
                <div>
                  <strong>Peace-of-Mind All-Inclusive Promise:</strong> Includes Return Flights, Saudi Umrah Visa &amp; Health Insurance, Makkah &amp; Madinah Sanctuaries, 3x Daily Fresh Indian Buffet Meals, AC Transfers, Guided Ziyarat, Welcome Kit &amp; 5L Zamzam.
                </div>
              </div>
            </div>

            <!-- Receipt Card -->
            <div class="lg:col-span-5 bg-[#07231B]/95 rounded-3xl p-6 sm:p-8 border-2 border-[#C5A059]/60 shadow-2xl space-y-5">
              <div class="flex items-start justify-between border-b border-white/15 pb-4 gap-2">
                <div>
                  <span class="text-[11px] uppercase tracking-[0.2em] text-[#E5CFA0] font-semibold">Your Pilgrimage Estimate</span>
                  <h3 class="text-2xl font-bold font-editorial text-white mt-0.5">${pkg.title}</h3>
                  <p class="text-xs text-[#EAE3D5]/80 mt-0.5">${pkg.duration} • ${sharing.label}</p>
                </div>
                <span class="px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#E5CFA0] text-xs font-bold shrink-0">
                  ${totalPilgrims} ${totalPilgrims > 1 ? "Pilgrims" : "Pilgrim"}
                </span>
              </div>

              <div class="space-y-3 text-sm">
                <div class="flex items-center justify-between text-xs text-[#EAE3D5]/80">
                  <span>Departure Gateway:</span>
                  <span class="font-semibold text-white">${city.name}</span>
                </div>
                <div class="flex items-center justify-between text-xs text-[#EAE3D5]/80">
                  <span>Makkah / Madinah Walk:</span>
                  <span class="font-semibold text-[#E5CFA0]">${pkg.makkahHotel.distance.split(" ")[0]} / ${pkg.madinahHotel.distance.split(" ")[0]}</span>
                </div>

                <div class="flex items-center justify-between py-2.5 border-t border-white/10">
                  <span class="text-[#EAE3D5]">${est.adults} ${est.adults > 1 ? "Adults" : "Adult"} × ${formatINR(perAdultRate)}</span>
                  <span class="font-bold text-white">${formatINR(adultsTotal)}</span>
                </div>

                ${est.children > 0 ? `
                  <div class="flex items-center justify-between py-2 border-t border-white/10">
                    <span class="text-[#EAE3D5]">${est.children} ${est.children > 1 ? "Children" : "Child"} × ${formatINR(perChildRate)}</span>
                    <span class="font-bold text-white">${formatINR(childrenTotal)}</span>
                  </div>
                ` : ""}

                ${est.infants > 0 ? `
                  <div class="flex items-center justify-between py-2 border-t border-white/10">
                    <span class="text-[#EAE3D5]">${est.infants} ${est.infants > 1 ? "Infants" : "Infant"} × ${formatINR(perInfantRate)}</span>
                    <span class="font-bold text-white">${formatINR(infantsTotal)}</span>
                  </div>
                ` : ""}
              </div>

              <div class="p-5 rounded-2xl bg-white/5 border border-[#C5A059]/40">
                <div class="flex items-baseline justify-between">
                  <span class="text-xs uppercase tracking-wider text-[#EAE3D5]/85 font-semibold">Estimated Family Total</span>
                  <span class="text-3xl font-extrabold text-[#E5CFA0]">${formatINR(grandTotal)}</span>
                </div>
                <div class="mt-2.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-[#EAE3D5]/85">
                  <span>Initial Seat Deposit (₹20,000/person):</span>
                  <strong class="text-white font-bold">${formatINR(depositTotal)}</strong>
                </div>
              </div>

              ${est.adults + est.children >= 4 ? `
                <div class="p-3 rounded-xl bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#E5CFA0] text-xs text-center font-medium">
                  ✦ <strong>Family Group Blessing:</strong> For ${est.adults + est.children} family members, ask our advisor on WhatsApp for your special family concession.
                </div>
              ` : ""}

              <a href="${quoteUrl}" target="_blank" rel="noopener noreferrer"
                 class="w-full py-4 px-5 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-xl transition cursor-pointer">
                ${Icons.whatsapp}
                <span>Receive Official Quote on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // 7. Special Services Section
  function renderSpecialServices() {
    return `
      <section id="hajj-custom-tours" class="py-16 md:py-24 bg-[#F4F0E8] border-b border-[#C5A059]/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-14">
            <div class="peace-divider text-[#9E7B36] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              <span>Beyond Group Schedules</span>
            </div>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#07231B]">
              Hajj 1448H Sanctuaries &amp; Private Family Journeys
            </h2>
            <p class="text-sm sm:text-base text-[#556660] mt-3">
              Whether preparing for the sacred days of Hajj or planning a private family Umrah on your own dates with wheelchair assistance, our concierge crafts every step.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${CONFIG.specialServices.map(srv => {
              const waUrl = getWhatsAppUrl(srv.whatsappPrompt);
              return `
                <div class="sanctuary-card rounded-3xl p-7 flex flex-col justify-between bg-[#FBF9F5]">
                  <div>
                    <div class="flex items-center justify-between gap-2 mb-5">
                      <span class="text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#0C3B2E] text-[#E5CFA0]">
                        ${srv.tag}
                      </span>
                      <span class="font-arabic text-xl text-[#9E7B36]">${srv.arabic}</span>
                    </div>

                    <h3 class="text-2xl font-bold font-editorial text-[#07231B]">${srv.title}</h3>
                    <p class="text-xs sm:text-sm text-[#556660] mt-2.5 leading-relaxed">${srv.description}</p>

                    <ul class="mt-5 pt-4 border-t border-[#EAE3D5] space-y-2 text-xs text-[#17231F]/90">
                      ${srv.features.map(f => `
                        <li class="flex items-start gap-2">
                          <span class="text-[#9E7B36] font-bold">✦</span>
                          <span>${f}</span>
                        </li>
                      `).join("")}
                    </ul>
                  </div>

                  <div class="mt-6 pt-4 border-t border-[#EAE3D5] flex items-center justify-between gap-3">
                    <span class="text-xs font-semibold text-[#0C3B2E]">${srv.startingHint}</span>
                    <a href="${waUrl}" target="_blank" rel="noopener noreferrer"
                       class="px-4 py-2.5 rounded-full bg-[#0C3B2E] hover:bg-[#07231B] text-[#E5CFA0] font-bold text-xs transition shrink-0">
                      Enquire →
                    </a>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </section>
    `;
  }

  // 8. Pilgrim Stories & Kit
  function renderPilgrimStories() {
    return `
      <section id="pilgrim-stories" class="py-16 md:py-24 bg-sanctuary-light border-b border-[#C5A059]/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div>
            <div class="text-center max-w-3xl mx-auto mb-12">
              <div class="peace-divider text-[#9E7B36] text-xs font-bold uppercase tracking-[0.2em] mb-3">
                <span>Voices of Tranquility</span>
              </div>
              <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#07231B]">
                Reflections from Indian Families We Served
              </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-7">
              ${CONFIG.testimonials.map(t => `
                <div class="bg-white rounded-3xl p-7 border border-[#C5A059]/30 shadow-sm flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-1 text-[#C5A059] mb-4">
                      ${Array(t.rating).fill(Icons.sparkle).join("")}
                    </div>
                    <p class="text-sm sm:text-base font-editorial italic text-[#17231F] leading-relaxed">
                      “${t.quote}”
                    </p>
                  </div>
                  <div class="mt-6 pt-4 border-t border-[#EAE3D5]">
                    <div class="font-bold text-sm text-[#07231B]">${t.author}</div>
                    <div class="text-xs text-[#9E7B36] font-medium mt-0.5">${t.city}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Welcome Kit Card -->
          <div class="bg-[#07231B] bg-sanctuary-emerald text-white rounded-3xl p-8 sm:p-12 border border-[#C5A059]/50 shadow-2xl">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div class="lg:col-span-5 space-y-4">
                <span class="inline-block px-3.5 py-1 rounded-full bg-champagne-gradient text-[#07231B] font-bold text-xs uppercase tracking-wider">
                  Gifted with Every Reservation
                </span>
                <h3 class="text-3xl sm:text-4xl font-bold font-editorial text-white leading-tight">
                  The Ummat Pilgrim Welcome Kit &amp; 5L Blessed Zamzam
                </h3>
                <p class="text-xs sm:text-sm text-[#EAE3D5]/85 leading-relaxed">
                  Delivered to your home or handed over during our serene Pre-Departure Orientation Seminar so you pack without stress.
                </p>
              </div>

              <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-[#C5A059]/30 space-y-1.5">
                  <div class="text-xl">🧣</div>
                  <div class="font-bold text-sm text-[#E5CFA0]">Pure Cotton Ihram &amp; Ladies Prayer Kit</div>
                  <p class="text-xs text-[#EAE3D5]/80 leading-relaxed">Soft, breathable cotton towel Ihram for gentlemen &amp; modest prayer scarf + pouch for ladies.</p>
                </div>
                <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-[#C5A059]/30 space-y-1.5">
                  <div class="text-xl">📖</div>
                  <div class="font-bold text-sm text-[#E5CFA0]">Multilingual Pocket Dua &amp; Umrah Guide</div>
                  <p class="text-xs text-[#EAE3D5]/80 leading-relaxed">Step-by-step Tawaf &amp; Sa'i supplications in Arabic with Urdu, Hindi &amp; English transliteration.</p>
                </div>
                <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-[#C5A059]/30 space-y-1.5">
                  <div class="text-xl">🎒</div>
                  <div class="font-bold text-sm text-[#E5CFA0]">Sanctuary Travel &amp; Haram Shoe Bags</div>
                  <p class="text-xs text-[#EAE3D5]/80 leading-relaxed">Coordinated cabin duffle, anti-theft neck pouch for passport, and clean drawstring shoe bag.</p>
                </div>
                <div class="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-[#C5A059]/30 space-y-1.5">
                  <div class="text-xl">💧</div>
                  <div class="font-bold text-sm text-[#E5CFA0]">5 Liters Official Sealed Zamzam</div>
                  <p class="text-xs text-[#EAE3D5]/80 leading-relaxed">Airline-approved 5-liter Zamzam water pack presented to every pilgrim at Jeddah/Madinah airport.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // 9. Documents & FAQ Section
  function renderDocumentsAndFAQ() {
    return `
      <section id="documents-faq" class="py-16 md:py-24 bg-[#F4F0E8]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div>
            <div class="text-center max-w-2xl mx-auto mb-12">
              <div class="peace-divider text-[#9E7B36] text-xs font-bold uppercase tracking-[0.2em] mb-3">
                <span>Effortless Documentation</span>
              </div>
              <h2 class="text-3xl sm:text-4xl font-bold font-editorial text-[#07231B]">
                4 Simple Steps to Begin Your Journey
              </h2>
              <p class="text-xs sm:text-sm text-[#556660] mt-2">
                Share clear photos on WhatsApp or visit our sanctuary lounge in person.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              ${CONFIG.documentsRequired.map(doc => `
                <div class="bg-[#FBF9F5] p-6 rounded-3xl border border-[#C5A059]/30 shadow-sm">
                  <div class="w-10 h-10 rounded-full bg-[#0C3B2E] text-[#E5CFA0] font-bold text-xs flex items-center justify-center mb-4">
                    ${doc.step}
                  </div>
                  <h4 class="font-bold font-editorial text-xl text-[#07231B]">${doc.title}</h4>
                  <p class="text-xs text-[#556660] mt-1.5 leading-relaxed">${doc.detail}</p>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Interactive Accordion FAQ -->
          <div class="max-w-3xl mx-auto">
            <div class="text-center mb-10">
              <div class="peace-divider text-[#9E7B36] text-xs font-bold uppercase tracking-[0.2em] mb-3">
                <span>Clarity &amp; Reassurance</span>
              </div>
              <h2 class="text-3xl sm:text-4xl font-bold font-editorial text-[#07231B]">
                Frequently Asked Questions
              </h2>
            </div>

            <div class="space-y-3">
              ${CONFIG.faqs.map((faq, idx) => {
                const isOpen = State.faqOpenIndex === idx;
                return `
                  <div class="bg-[#FBF9F5] rounded-2xl border border-[#C5A059]/30 overflow-hidden transition">
                    <button type="button" data-faq-index="${idx}"
                            class="faq-btn w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-white transition cursor-pointer">
                      <span class="font-bold font-editorial text-lg sm:text-xl text-[#07231B]">${faq.question}</span>
                      <span class="w-7 h-7 rounded-full ${isOpen ? "bg-[#0C3B2E] text-white rotate-180" : "bg-[#0C3B2E]/10 text-[#0C3B2E]"} flex items-center justify-center text-sm font-bold transition-transform">
                        ↓
                      </span>
                    </button>
                    <div class="${isOpen ? "" : "hidden"} px-6 pb-5 pt-2 text-xs sm:text-sm text-[#556660] leading-relaxed border-t border-[#EAE3D5]">
                      ${faq.answer}
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // 10. Concierge Callback Form
  function renderConciergeCallback() {
    return `
      <section id="callback-section" class="py-16 md:py-24 bg-sanctuary-light border-t border-[#C5A059]/25">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div class="lg:col-span-5 space-y-6">
              <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0C3B2E] bg-[#0C3B2E]/10 px-3.5 py-1 rounded-full">
                <span>Personal Pilgrimage Concierge</span>
              </div>
              <h2 class="text-3xl sm:text-4xl font-bold font-editorial text-[#07231B]">
                Speak with Our Advisors or Visit Our Sanctuary Lounge
              </h2>
              <p class="text-sm text-[#556660] leading-relaxed">
                We take the time to listen to your family’s needs—whether you are arranging wheelchair assistance for elderly parents or choosing the closest hotel to Ladies Gate 25.
              </p>

              <div class="space-y-4 pt-2">
                <div class="p-4 rounded-2xl bg-white border border-[#C5A059]/30 flex items-start gap-4">
                  <div class="w-10 h-10 rounded-full bg-[#0C3B2E] text-[#E5CFA0] flex items-center justify-center shrink-0">✆</div>
                  <div>
                    <div class="text-[11px] font-bold uppercase tracking-wider text-[#556660]">Direct Pilgrim Helpline</div>
                    <div class="mt-0.5 flex flex-wrap gap-3 font-bold text-[#07231B] text-base">
                      <a href="tel:${CONFIG.agency.displayPhonePrimary.replace(/\s+/g, "")}">${CONFIG.agency.displayPhonePrimary}</a>
                      <span class="text-[#C5A059]">•</span>
                      <a href="tel:${CONFIG.agency.displayPhoneSecondary.replace(/\s+/g, "")}">${CONFIG.agency.displayPhoneSecondary}</a>
                    </div>
                  </div>
                </div>

                <div class="p-4 rounded-2xl bg-white border border-[#C5A059]/30 flex items-start gap-4">
                  <div class="w-10 h-10 rounded-full bg-[#0C3B2E] text-[#E5CFA0] flex items-center justify-center shrink-0">📍</div>
                  <div>
                    <div class="text-[11px] font-bold uppercase tracking-wider text-[#556660]">Head Sanctuary Office</div>
                    <p class="text-xs sm:text-sm font-medium text-[#17231F] mt-0.5 leading-relaxed">${CONFIG.agency.address}</p>
                  </div>
                </div>

                <div class="p-4 rounded-2xl bg-white border border-[#C5A059]/30 flex items-start gap-4">
                  <div class="w-10 h-10 rounded-full bg-[#0C3B2E] text-[#E5CFA0] flex items-center justify-center shrink-0">🕒</div>
                  <div>
                    <div class="text-[11px] font-bold uppercase tracking-wider text-[#556660]">Visiting Hours &amp; Email</div>
                    <p class="text-xs sm:text-sm font-medium text-[#17231F] mt-0.5">${CONFIG.agency.workingHours}</p>
                    <a href="mailto:${CONFIG.agency.email}" class="text-xs text-[#0C3B2E] font-bold underline mt-1 inline-block">${CONFIG.agency.email}</a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Controlled Form -->
            <div class="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-10 border border-[#C5A059]/40 shadow-xl">
              <h3 class="text-2xl sm:text-3xl font-bold font-editorial text-[#07231B]">
                Request a Calm Callback &amp; PDF Itinerary
              </h3>
              <p class="text-xs sm:text-sm text-[#556660] mt-1 mb-6">
                Enter your details below to receive our complete hotel distance guide &amp; connect with our advisor on WhatsApp.
              </p>

              <form id="concierge-form" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="form-name" class="block text-xs font-bold uppercase tracking-wider text-[#07231B] mb-1.5">Your Full Name *</label>
                    <input id="form-name" type="text" required placeholder="e.g. Haji Mohammed Irfan"
                           class="w-full rounded-xl border border-[#C5A059]/40 bg-[#FBF9F5] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3B2E]" />
                  </div>
                  <div>
                    <label for="form-phone" class="block text-xs font-bold uppercase tracking-wider text-[#07231B] mb-1.5">10-Digit Mobile / WhatsApp *</label>
                    <input id="form-phone" type="tel" required placeholder="e.g. 98765 43210"
                           class="w-full rounded-xl border border-[#C5A059]/40 bg-[#FBF9F5] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3B2E]" />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label for="form-city" class="block text-xs font-bold uppercase tracking-wider text-[#07231B] mb-1.5">Your City *</label>
                    <input id="form-city" type="text" required placeholder="Mumbai / Delhi / Hyd"
                           class="w-full rounded-xl border border-[#C5A059]/40 bg-[#FBF9F5] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3B2E]" />
                  </div>

                  <div>
                    <label for="form-service" class="block text-xs font-bold uppercase tracking-wider text-[#07231B] mb-1.5">Preferred Sanctuary</label>
                    <select id="form-service" class="w-full rounded-xl border border-[#C5A059]/40 bg-[#FBF9F5] px-3 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0C3B2E]">
                      <option value="Super Deluxe Haram-Walk (₹95,000)">Super Deluxe Walk (₹95,000)</option>
                      <option value="Serene Economy Umrah (₹78,000)">Serene Economy (₹78,000)</option>
                      <option value="5-Star Haram View & Bullet Train (₹1,38,000)">5-Star Courtyard (₹1,38,000)</option>
                      <option value="Blessed Ramadan Sanctuary (₹1,15,000)">Ramadan Sanctuary (₹1,15,000)</option>
                      <option value="Hajj 2027 Pre-Registration">Hajj 2027 Sanctuary</option>
                      <option value="Private Custom Family Umrah">Private Custom Family Umrah</option>
                    </select>
                  </div>

                  <div>
                    <label for="form-pilgrims" class="block text-xs font-bold uppercase tracking-wider text-[#07231B] mb-1.5">Family Size</label>
                    <select id="form-pilgrims" class="w-full rounded-xl border border-[#C5A059]/40 bg-[#FBF9F5] px-3 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0C3B2E]">
                      <option value="1 Pilgrim">1 Pilgrim</option>
                      <option value="2 Pilgrims (Couple)">2 Pilgrims (Couple)</option>
                      <option value="3 – 4 Family Members" selected>3 – 4 Family Members</option>
                      <option value="5 – 9 Family Members">5 – 9 Family Members</option>
                      <option value="10+ Extended Family / Jamat">10+ Family / Jamat</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label for="form-notes" class="block text-xs font-bold uppercase tracking-wider text-[#07231B] mb-1.5">Special Care Notes for Elders or Dates (Optional)</label>
                  <textarea id="form-notes" rows="2" placeholder="e.g. Travelling with elderly parents, prefer flat walk near Ladies Gate 25..."
                            class="w-full rounded-xl border border-[#C5A059]/40 bg-[#FBF9F5] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3B2E]"></textarea>
                </div>

                <button type="submit"
                        class="w-full py-4 px-6 rounded-full bg-[#0C3B2E] hover:bg-[#07231B] text-[#E5CFA0] font-bold text-sm shadow-lg transition flex items-center justify-center gap-2 cursor-pointer">
                  ${Icons.whatsapp}
                  <span>Request Callback &amp; Brochure via WhatsApp</span>
                </button>

                <div id="form-status-banner" class="hidden"></div>
              </form>
            </div>

          </div>
        </div>
      </section>
    `;
  }

  // 11. Footer
  function renderFooter() {
    return `
      <footer class="bg-[#07231B] text-[#EAE3D5]/80 border-t border-[#C5A059]/30 pt-14 pb-10 text-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 pb-10 border-b border-white/10">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-[#0C3B2E] border border-[#C5A059] flex items-center justify-center text-[#E5CFA0] font-arabic text-base">أمة</div>
                <div>
                  <div class="font-bold font-display-serif text-white text-sm tracking-wider">UMMAT HAJJ UMRAH</div>
                  <div class="text-[10px] text-[#E5CFA0] uppercase tracking-widest">Tours &amp; Travels • India</div>
                </div>
              </div>
              <p class="text-xs text-[#EAE3D5]/70 leading-relaxed">
                Serving the Guests of Allah across India with peaceful, walking-distance sanctuaries, transparent INR pricing, and authentic Sunnah guidance.
              </p>
              <div class="text-[11px] text-[#E5CFA0] font-medium">
                🌐 Official Domains: <span class="underline">${CONFIG.agency.primaryDomain}</span> &amp; <span class="underline">${CONFIG.agency.secondaryDomain}</span>
              </div>
            </div>

            <div>
              <h4 class="font-bold font-display-serif text-[#E5CFA0] text-xs uppercase tracking-widest mb-3">Umrah Sanctuaries</h4>
              <ul class="space-y-2">
                ${CONFIG.umrahPackages.map(p => `
                  <li><a href="#umrah-packages" class="hover:text-[#E5CFA0] transition">${p.title} (${formatINR(p.basePriceQuad)})</a></li>
                `).join("")}
              </ul>
            </div>

            <div>
              <h4 class="font-bold font-display-serif text-[#E5CFA0] text-xs uppercase tracking-widest mb-3">Indian Gateways</h4>
              <ul class="space-y-2 text-[#EAE3D5]/75">
                ${CONFIG.departureCities.slice(0, 5).map(c => `<li>✈️ ${c.name}</li>`).join("")}
              </ul>
            </div>

            <div>
              <h4 class="font-bold font-display-serif text-[#E5CFA0] text-xs uppercase tracking-widest mb-3">24/7 Pilgrim Care</h4>
              <p class="text-[#EAE3D5]/75 leading-relaxed mb-2">${CONFIG.agency.address}</p>
              <p class="font-bold text-white">
                Helpline: <a href="tel:${CONFIG.agency.displayPhonePrimary.replace(/\s+/g, "")}" class="text-[#E5CFA0] hover:underline">${CONFIG.agency.displayPhonePrimary}</a>
              </p>
              <p class="mt-1">
                Email: <a href="mailto:${CONFIG.agency.email}" class="text-[#E5CFA0] hover:underline">${CONFIG.agency.email}</a>
              </p>
            </div>
          </div>

          <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#EAE3D5]/60">
            <div>© 2026–2027 <strong class="text-white">${CONFIG.agency.fullName} (India)</strong> • Serene Sanctuary Edition</div>
            <div>All package rates are transparent in INR (₹) and subject to airline/hotel availability at confirmation.</div>
          </div>
        </div>
      </footer>
    `;
  }

  // 12. Floating WhatsApp Pill
  function renderFloatingWhatsApp() {
    return `
      <a href="${generalWhatsAppUrl}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Concierge"
         class="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 bg-[#0C3B2E] hover:bg-[#07231B] text-[#FBF9F5] font-semibold px-4 py-3 rounded-full shadow-2xl border border-[#C5A059]/60 transition hover:scale-105">
        <span class="w-2 h-2 rounded-full bg-[#25D366] animate-ping"></span>
        ${Icons.whatsapp}
        <span class="text-xs pr-1 hidden sm:inline">Serene WhatsApp Desk</span>
      </a>
    `;
  }

  // Event Bindings
  function bindEvents() {
    // 1. Mobile Menu Toggle
    const navBtn = document.getElementById("nav-toggle-btn");
    const drawer = document.getElementById("mobile-drawer");
    if (navBtn && drawer) {
      navBtn.addEventListener("click", () => {
        State.mobileMenuOpen = !State.mobileMenuOpen;
        drawer.classList.toggle("hidden", !State.mobileMenuOpen);
      });
      drawer.querySelectorAll(".mobile-nav-link").forEach(link => {
        link.addEventListener("click", () => {
          State.mobileMenuOpen = false;
          drawer.classList.add("hidden");
        });
      });
    }

    // 2. Package Sharing Tabs
    document.querySelectorAll(".pkg-sharing-tab").forEach(btn => {
      btn.addEventListener("click", function () {
        const pkgId = this.getAttribute("data-pkg-id");
        const sharing = this.getAttribute("data-sharing");
        if (pkgId && sharing) {
          State.packageSharing[pkgId] = sharing;
          renderApp();
        }
      });
    });

    // 3. Jump from Package Card to Calculator
    document.querySelectorAll(".calc-select-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const pkgId = this.getAttribute("data-calc-pkg");
        const sharing = this.getAttribute("data-calc-sharing");
        if (pkgId) State.estimator.pkgId = pkgId;
        if (sharing) State.estimator.sharing = sharing;
        renderApp();
        const calcEl = document.getElementById("cost-estimator");
        if (calcEl) calcEl.scrollIntoView({ behavior: "smooth" });
      });
    });

    // 4. Calculator Dropdowns
    const pkgSelect = document.getElementById("est-pkg-select");
    if (pkgSelect) {
      pkgSelect.addEventListener("change", function () {
        State.estimator.pkgId = this.value;
        renderApp();
      });
    }

    const sharingSelect = document.getElementById("est-sharing-select");
    if (sharingSelect) {
      sharingSelect.addEventListener("change", function () {
        State.estimator.sharing = this.value;
        renderApp();
      });
    }

    const citySelect = document.getElementById("est-city-select");
    if (citySelect) {
      citySelect.addEventListener("change", function () {
        State.estimator.cityId = this.value;
        renderApp();
      });
    }

    const monthSelect = document.getElementById("est-month-select");
    if (monthSelect) {
      monthSelect.addEventListener("change", function () {
        State.estimator.month = this.value;
        renderApp();
      });
    }

    // 5. Calculator Steppers (+ / −)
    document.querySelectorAll(".stepper-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const target = this.getAttribute("data-delta-target");
        const delta = parseInt(this.getAttribute("data-delta"), 10) || 0;
        if (target === "adults") {
          State.estimator.adults = Math.max(1, Math.min(25, State.estimator.adults + delta));
        } else if (target === "children") {
          State.estimator.children = Math.max(0, Math.min(15, State.estimator.children + delta));
        } else if (target === "infants") {
          State.estimator.infants = Math.max(0, Math.min(10, State.estimator.infants + delta));
        }
        renderApp();
      });
    });

    // 6. FAQ Accordion
    document.querySelectorAll(".faq-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const idx = parseInt(this.getAttribute("data-faq-index"), 10);
        State.faqOpenIndex = State.faqOpenIndex === idx ? -1 : idx;
        renderApp();
      });
    });

    // 7. Concierge Form Submission
    const form = document.getElementById("concierge-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("form-name")?.value.trim() || "";
        const phone = document.getElementById("form-phone")?.value.trim() || "";
        const city = document.getElementById("form-city")?.value.trim() || "";
        const service = document.getElementById("form-service")?.value || "";
        const pilgrims = document.getElementById("form-pilgrims")?.value || "";
        const notes = document.getElementById("form-notes")?.value.trim() || "";

        if (!name || !phone) return;

        const msg = `Assalamu Alaikum ${CONFIG.agency.fullName},\n\nPlease arrange a serene callback & send your Umrah brochure:\n• *Name:* ${name}\n• *Phone:* ${phone}\n• *City:* ${city}\n• *Sanctuary Tier:* ${service}\n• *Family Size:* ${pilgrims}\n${notes ? `• *Special Note:* ${notes}\n` : ""}\nJazakAllah Khair.`;
        const waUrl = getWhatsAppUrl(msg);

        const banner = document.getElementById("form-status-banner");
        if (banner) {
          banner.classList.remove("hidden");
          banner.innerHTML = `
            <div class="p-4 rounded-2xl bg-[#E9F1EE] border border-[#0C3B2E]/30 text-[#07231B] text-xs">
              <strong>JazakAllah Khair, ${name}!</strong> Opening WhatsApp to connect you directly with our Umrah advisor.
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="underline font-bold text-[#0C3B2E] block mt-1">
                Click here if WhatsApp did not open automatically →
              </a>
            </div>
          `;
        }

        window.open(waUrl, "_blank", "noopener,noreferrer");
      });
    }
  }

  // Mount Application on DOM Ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderApp);
  } else {
    renderApp();
  }
})();
