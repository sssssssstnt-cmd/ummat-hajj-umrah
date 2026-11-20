/**
 * ============================================================================
 * UMMAT HAJJ UMRAH TOURS & TRAVELS — INTERACTIVE FRONTEND ENGINE
 * Multilingual Support: English (en), Hindi (hi), Marathi (mr), Urdu (ur)
 * ============================================================================
 */

(function () {
  "use strict";

  const CONFIG = window.UMMAT_CONFIG;
  if (!CONFIG) {
    console.error("UMMAT_CONFIG is missing! Check js/config.js");
    return;
  }

  // Active language state (default: English, or persisted in localStorage)
  let currentLang = localStorage.getItem("ummat_lang") || "en";

  // Helper to safely fetch translation keys
  function getTranslation(path) {
    const dict = window.UMMAT_TRANSLATIONS?.[currentLang] || window.UMMAT_TRANSLATIONS?.en || {};
    return path.split(".").reduce((acc, part) => acc && acc[part], dict) || "";
  }

  // Track active sharing state per package card (default: quad)
  const cardSharingState = {};

  // Format number in Indian Rupee format (e.g. ₹1,38,000)
  function formatINR(amount) {
    const rounded = Math.round(Number(amount) || 0);
    return "₹" + rounded.toLocaleString("en-IN");
  }

  // Security Helper: Escape untrusted HTML characters to prevent DOM-based XSS
  function escapeHTML(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Build WhatsApp URL with pre-filled encoded message
  function buildWhatsAppURL(messageText) {
    const cleanPhone = (CONFIG.agency.whatsappNumber || "919405070008").replace(/\D/g, "");
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;
  }

  // Populate static agency details in header/hero/footer
  function hydrateAgencyMetadata() {
    document.querySelectorAll("[data-agency-phone-primary]").forEach((el) => {
      el.textContent = CONFIG.agency.displayPhonePrimary;
      if (el.tagName === "A") {
        el.href = `tel:${CONFIG.agency.displayPhonePrimary.replace(/\s+/g, "")}`;
      }
    });

    document.querySelectorAll("[data-agency-phone-secondary]").forEach((el) => {
      el.textContent = CONFIG.agency.displayPhoneSecondary;
      if (el.tagName === "A") {
        el.href = `tel:${CONFIG.agency.displayPhoneSecondary.replace(/\s+/g, "")}`;
      }
    });

    document.querySelectorAll("[data-agency-email]").forEach((el) => {
      el.textContent = CONFIG.agency.email;
      if (el.tagName === "A") {
        el.href = `mailto:${CONFIG.agency.email}`;
      }
    });

    document.querySelectorAll("[data-agency-address]").forEach((el) => {
      el.textContent = CONFIG.agency.address;
    });

    document.querySelectorAll("[data-agency-hours]").forEach((el) => {
      el.textContent = CONFIG.agency.workingHours;
    });

    document.querySelectorAll("[data-agency-branches]").forEach((el) => {
      if (el.hasAttribute("data-i18n")) {
        const trVal = getTranslation(el.getAttribute("data-i18n"));
        if (trVal) {
          el.textContent = trVal;
          return;
        }
      }
      el.textContent = CONFIG.agency.branchCities;
    });

    document.querySelectorAll("[data-whatsapp-general]").forEach((el) => {
      const msgs = {
        en: `Assalamu Alaikum Haji Aslam Jamkhed (${CONFIG.agency.fullName}), I visited your website and would like to enquire about your upcoming Hajj 2027 & Umrah packages.`,
        hi: `अस्सलामु अलैकुम हाजी असलम जामखेड (${CONFIG.agency.fullName}), मैं आपकी वेबसाइट से हज 2027 और उमरा पैकेज के संबंध में जानकारी चाहता हूं।`,
        mr: `अस्सलामु अलैकुम हाजी असलम जामखेड (${CONFIG.agency.fullName}), मी आपल्या संकेतस्थळावरून हज 2027 आणि उमरा पॅकेज संदर्भात माहिती विचारत आहे.`,
        ur: `السلام علیکم حاجی اسلم جامکھیڈ (${CONFIG.agency.fullName})، میں آپ کی ویب سائٹ دیکھ رہا ہوں اور حج ۲۰۲۷ اور عمرہ پیکیج کے متعلق معلومات چاہتا ہوں۔`
      };
      el.href = buildWhatsAppURL(msgs[currentLang] || msgs.en);
    });

    // Stats strip (fully localized)
    const statsContainer = document.getElementById("agency-stats-grid");
    if (statsContainer) {
      const s = getTranslation("stats") || {};
      const statsList = [
        { value: s.thousandsVal || "Thousands", label: s.thousandsLabel || "Of Pilgrims Served with Trust" },
        { value: s.minaVal || "Zone 2", label: s.minaLabel || "Category B Mina Luxury Tents" },
        { value: s.hiltonVal || "Hilton", label: s.hiltonLabel || "Makkah Sharif Tower Hotel" },
        { value: s.saudiVal || "Saudi Airlines", label: s.saudiLabel || "Direct Flights Included" }
      ];
      statsContainer.innerHTML = statsList
        .map(
          (st) => `
          <div class="text-center px-4 py-3">
            <div class="text-2xl md:text-3xl font-extrabold text-amber-300 font-serif-islamic">${st.value}</div>
            <div class="text-xs md:text-sm text-emerald-100/90 mt-1 font-medium">${st.label}</div>
          </div>
        `
        )
        .join("");
    }
  }

  // Switch Active Language and Update UI Text
  function setLanguage(lang) {
    if (!window.UMMAT_TRANSLATIONS?.[lang]) {
      lang = "en";
    }
    currentLang = lang;
    localStorage.setItem("ummat_lang", lang);

    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "ur" ? "rtl" : "ltr");

    // Update active state on language switcher buttons
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      if (btn.getAttribute("data-lang-btn") === lang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update all elements with data-i18n (supports safe inline markup)
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const text = getTranslation(key);
      if (text !== undefined && text !== null && text !== "") {
        if (typeof text === "string" && text.includes("<") && text.includes(">")) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // Update input placeholders with data-i18n-placeholder
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const text = getTranslation(key);
      if (text) {
        el.setAttribute("placeholder", text);
      }
    });

    hydrateAgencyMetadata();
    renderUmrahPackages();
    populateCostEstimatorDropdowns();
    populateCallbackFormDropdowns();
    renderSpecialServices();
    renderDocumentsAndFAQs();
    calculateUmrahEstimate();
  }

  // Active Sacred Journey Mode: 'umrah' (default) or 'hajj'
  let currentJourney = localStorage.getItem("ummat_journey") || "umrah";

  function setJourneyMode(mode, scrollToContent) {
    if (mode !== "hajj" && mode !== "umrah") {
      mode = "umrah";
    }
    currentJourney = mode;
    localStorage.setItem("ummat_journey", mode);

    // Update active class on all journey buttons
    document.querySelectorAll("[data-journey-btn]").forEach((btn) => {
      if (btn.getAttribute("data-journey-btn") === mode) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    const isHajj = mode === "hajj";

    // Toggle Hero contents with smooth generative transition
    const heroUmrah = document.getElementById("hero-content-umrah");
    const heroHajj = document.getElementById("hero-content-hajj");
    if (heroUmrah && heroHajj) {
      if (isHajj) {
        heroUmrah.classList.add("hidden");
        heroHajj.classList.remove("hidden");
        heroHajj.classList.remove("journey-view-transition");
        void heroHajj.offsetWidth; // Force DOM reflow for animation restart
        heroHajj.classList.add("journey-view-transition");
      } else {
        heroUmrah.classList.remove("hidden");
        heroUmrah.classList.remove("journey-view-transition");
        void heroUmrah.offsetWidth; // Force DOM reflow for animation restart
        heroUmrah.classList.add("journey-view-transition");
        heroHajj.classList.add("hidden");
      }
    }

    // Toggle Main Sections
    const umrahSec = document.getElementById("umrah-packages");
    const calcSec = document.getElementById("cost-estimator");
    const hajjSec = document.getElementById("hajj-2027-section");
    const hajjInvite = document.getElementById("hajj-switcher-invite");
    const umrahInvite = document.getElementById("umrah-switcher-invite");

    if (isHajj) {
      if (hajjSec) {
        hajjSec.classList.remove("hidden");
        hajjSec.classList.remove("journey-view-transition");
        void hajjSec.offsetWidth;
        hajjSec.classList.add("journey-view-transition");
      }
      if (umrahInvite) {
        umrahInvite.classList.remove("hidden");
        umrahInvite.classList.add("journey-view-transition");
      }
      if (umrahSec) umrahSec.classList.add("hidden");
      if (calcSec) calcSec.classList.add("hidden");
      if (hajjInvite) hajjInvite.classList.add("hidden");

      if (scrollToContent && hajjSec) {
        hajjSec.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      if (umrahSec) {
        umrahSec.classList.remove("hidden");
        umrahSec.classList.remove("journey-view-transition");
        void umrahSec.offsetWidth;
        umrahSec.classList.add("journey-view-transition");
      }
      if (calcSec) {
        calcSec.classList.remove("hidden");
        calcSec.classList.add("journey-view-transition");
      }
      if (hajjInvite) {
        hajjInvite.classList.remove("hidden");
        hajjInvite.classList.add("journey-view-transition");
      }
      if (hajjSec) hajjSec.classList.add("hidden");
      if (umrahInvite) umrahInvite.classList.add("hidden");

      if (scrollToContent && umrahSec) {
        umrahSec.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  // Render the 4 Umrah Package Cards with interactive Quad/Triple/Double tabs
  function renderUmrahPackages() {
    const grid = document.getElementById("umrah-packages-grid");
    if (!grid) return;

    const pkgI18n = window.UMMAT_PACKAGES_I18N || {};
    const ui = (pkgI18n.ui && (pkgI18n.ui[currentLang] || pkgI18n.ui.en)) || {};
    const langPkgs = (pkgI18n.packages && pkgI18n.packages[currentLang]) || {};

    grid.innerHTML = CONFIG.umrahPackages
      .map((pkg) => {
        cardSharingState[pkg.id] = "quad";
        const loc = langPkgs[pkg.id] || {};
        const viewPkg = {
          ...pkg,
          title: loc.title || pkg.title,
          subtitle: loc.subtitle || pkg.subtitle,
          badge: loc.badge || pkg.badge,
          duration: loc.duration || pkg.duration,
          nightsSplit: loc.nightsSplit || pkg.nightsSplit,
          makkahHotel: { ...pkg.makkahHotel, ...(loc.makkahHotel || {}) },
          madinahHotel: { ...pkg.madinahHotel, ...(loc.madinahHotel || {}) },
          flights: loc.flights || pkg.flights,
          meals: loc.meals || pkg.meals,
          highlights: loc.highlights || pkg.highlights
        };

        const badgeClass =
          pkg.badgeType === "gold"
            ? "bg-gold-gradient text-emerald-950 font-bold"
            : pkg.badgeType === "royal"
            ? "bg-amber-950 text-amber-200 border border-amber-400/50 font-semibold"
            : "bg-emerald-800 text-emerald-100 border border-emerald-600/50 font-semibold";

        const featuredBorder = pkg.featured ? "package-card-featured ring-2 ring-amber-400/70" : "";

        const defaultWhatsAppMsg = buildPackageWhatsAppMessage(viewPkg, "quad", pkg.basePriceQuad);

        return `
        <article id="card-${pkg.id}" class="package-card ${featuredBorder} bg-white rounded-2xl overflow-hidden flex flex-col justify-between relative shadow-md">
          <!-- Top Header Banner -->
          <div>
            <div class="bg-islamic-pattern text-white p-6 relative">
              <div class="flex items-center justify-between gap-2 mb-3">
                <span class="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider px-3 py-1 rounded-full ${badgeClass}">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ${viewPkg.badge}
                </span>
                <span class="text-xs font-medium bg-white/10 text-amber-200 px-2.5 py-1 rounded-md border border-white/15">
                  ${viewPkg.duration}
                </span>
              </div>
              <h3 class="text-xl md:text-2xl font-bold font-serif-islamic text-white leading-snug">${viewPkg.title}</h3>
              <p class="text-xs md:text-sm text-emerald-100/85 mt-1">${viewPkg.subtitle}</p>
              <div class="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-amber-300 font-medium">
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span>${viewPkg.nightsSplit}</span>
              </div>
            </div>

            <!-- Interactive Room Sharing Price Switcher -->
            <div class="p-6 pb-4 bg-gradient-to-b from-amber-50/60 to-white border-b border-slate-100">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${ui.selectSharing || "Select Room Sharing:"}</span>
                <span id="sharing-desc-${pkg.id}" class="text-xs text-emerald-800 font-semibold">${ui.bedsQuad || "4 Beds / Room"}</span>
              </div>
              <div class="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80" role="tablist">
                <button type="button" data-pkg-id="${pkg.id}" data-sharing="quad" class="sharing-pill active text-xs font-bold py-2 px-2 rounded-lg text-center cursor-pointer">
                  ${ui.quadTab || "Quad (4)"}
                </button>
                <button type="button" data-pkg-id="${pkg.id}" data-sharing="triple" class="sharing-pill text-xs font-bold py-2 px-2 rounded-lg text-slate-600 hover:text-emerald-900 text-center cursor-pointer">
                  ${ui.tripleTab || "Triple (3)"}
                </button>
                <button type="button" data-pkg-id="${pkg.id}" data-sharing="double" class="sharing-pill text-xs font-bold py-2 px-2 rounded-lg text-slate-600 hover:text-emerald-900 text-center cursor-pointer">
                  ${ui.doubleTab || "Double (2)"}
                </button>
              </div>

              <!-- Live Price Display -->
              <div class="mt-4 pt-3 border-t border-slate-200/60">
                <div class="flex items-center justify-between gap-2 mb-1">
                  <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">${ui.startingFrom || "Starting From (All-Inclusive)"}</span>
                  <span class="inline-block bg-emerald-100 text-emerald-900 text-[11px] font-bold px-2.5 py-0.5 rounded-md shrink-0">
                    ${ui.perPerson || "Per Person"}
                  </span>
                </div>
                <div class="flex items-baseline justify-between gap-2 flex-wrap">
                  <div class="flex items-baseline gap-2">
                    <span id="price-${pkg.id}" class="text-2xl sm:text-3xl font-extrabold text-emerald-900 tracking-tight">${formatINR(pkg.basePriceQuad)}</span>
                    <span id="orig-price-${pkg.id}" class="text-xs text-slate-400 line-through font-medium">${formatINR(pkg.originalPrice)}</span>
                  </div>
                  <span class="text-[11px] text-emerald-800 font-semibold">${ui.bookAdvance || "Book w/ ₹20,000"}</span>
                </div>
              </div>
            </div>

            <!-- Hotel Distance From Haram Box -->
            <div class="px-6 py-4 space-y-3 bg-white">
              <div class="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
                <div class="flex items-start gap-2.5">
                  <div class="w-7 h-7 rounded-lg bg-emerald-900 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    🕋
                  </div>
                  <div class="text-xs">
                    <div class="font-bold text-emerald-950 uppercase tracking-wide">${ui.makkahHotel || "Makkah Hotel"} • <span class="text-amber-700">${viewPkg.makkahHotel.distance}</span></div>
                    <div class="text-slate-700 font-medium mt-0.5">${viewPkg.makkahHotel.name}</div>
                    <div class="text-emerald-700 text-[11px] mt-0.5 font-semibold">${viewPkg.makkahHotel.shuttle}</div>
                  </div>
                </div>
              </div>

              <div class="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60">
                <div class="flex items-start gap-2.5">
                  <div class="w-7 h-7 rounded-lg bg-emerald-800 text-amber-200 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    🕌
                  </div>
                  <div class="text-xs">
                    <div class="font-bold text-emerald-950 uppercase tracking-wide">${ui.madinahHotel || "Madinah Hotel"} • <span class="text-emerald-800">${viewPkg.madinahHotel.distance}</span></div>
                    <div class="text-slate-700 font-medium mt-0.5">${viewPkg.madinahHotel.name}</div>
                    <div class="text-emerald-700 text-[11px] mt-0.5 font-semibold">${viewPkg.madinahHotel.shuttle}</div>
                  </div>
                </div>
              </div>

              <!-- Quick Logistics Summary -->
              <div class="grid grid-cols-1 gap-1.5 pt-1 text-xs text-slate-700">
                <div class="flex items-start gap-2">
                  <span class="text-emerald-700 font-bold shrink-0">${ui.flightsLabel || "✈️ Flights:"}</span>
                  <span class="font-medium">${viewPkg.flights}</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-emerald-700 font-bold shrink-0">${ui.mealsLabel || "🍛 Meals:"}</span>
                  <span class="font-medium">${viewPkg.meals}</span>
                </div>
              </div>

              <!-- Inclusions Checklist -->
              <div class="pt-3 border-t border-slate-100">
                <div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">${ui.inclusionsHeader || "Package Inclusions:"}</div>
                <ul class="space-y-1.5 text-xs text-slate-700">
                  ${viewPkg.highlights
                    .map(
                      (item) => `
                    <li class="flex items-start gap-2">
                      <svg class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3" d="M5 13l4 4L19 7"/>
                      </svg>
                      <span>${item}</span>
                    </li>
                  `
                    )
                    .join("")}
                </ul>
              </div>
            </div>
          </div>

          <!-- Card Footer CTA Buttons -->
          <div class="p-6 pt-3 bg-white border-t border-slate-100 flex flex-col gap-2">
            <a id="wa-btn-${pkg.id}" href="${defaultWhatsAppMsg}" target="_blank" rel="noopener noreferrer"
               class="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1DA851] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition cursor-pointer">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/></svg>
              <span>${ui.btnEnquireWa || "Enquire on WhatsApp"}</span>
            </a>
            <button type="button" data-select-calc="${pkg.id}"
               class="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer">
              <span>${ui.btnCalcTotal || "Calculate Family Total for This Package"}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>
        </article>
      `;
      })
      .join("");

    // Attach click listeners for room-sharing pills on each card
    grid.querySelectorAll(".sharing-pill").forEach((btn) => {
      btn.addEventListener("click", function () {
        const pkgId = this.getAttribute("data-pkg-id");
        const sharingKey = this.getAttribute("data-sharing");
        updatePackageCardSharing(pkgId, sharingKey);
      });
    });

    // Attach click listeners to jump to cost calculator with selected package
    grid.querySelectorAll("[data-select-calc]").forEach((btn) => {
      btn.addEventListener("click", function () {
        const pkgId = this.getAttribute("data-select-calc");
        const activeSharing = cardSharingState[pkgId] || "quad";
        const pkgSelect = document.getElementById("calc-package");
        const sharingSelect = document.getElementById("calc-sharing");

        if (pkgSelect) pkgSelect.value = pkgId;
        if (sharingSelect) sharingSelect.value = activeSharing;

        calculateUmrahEstimate();

        const calcSection = document.getElementById("cost-estimator");
        if (calcSection) {
          calcSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  function buildPackageWhatsAppMessage(pkg, sharingKey, calculatedPrice) {
    const sharingObj = CONFIG.sharingTypes[sharingKey] || CONFIG.sharingTypes.quad;
    const contactName = CONFIG.agency.contactPerson || CONFIG.agency.fullName;

    if (currentLang === "ur") {
      return buildWhatsAppURL(
        `السلام علیکم ${contactName}،\n\n` +
        `میں آپ کی ویب سائٹ پر عمرہ پیکیج دیکھ رہا ہوں اور درج ذیل پیکیج کے متعلق معلومات چاہتا ہوں:\n` +
        `• *پیکیج:* ${pkg.title} (${pkg.duration})\n` +
        `• *کمرے کی شیئرنگ:* ${sharingObj.label}\n` +
        `• *ویب سائٹ ریٹ:* ${formatINR(calculatedPrice)} فی کس\n` +
        `• *مکہ ہوٹل فاصلہ:* ${pkg.makkahHotel.distance}\n` +
        `• *مدینہ ہوٹل فاصلہ:* ${pkg.madinahHotel.distance}\n\n` +
        `براہِ کرم روانگی کی تاریخیں اور بکنگ کا طریقہ بتائیں۔`
      );
    } else if (currentLang === "mr") {
      return buildWhatsAppURL(
        `अस्सलामु अलैकुम ${contactName},\n\n` +
        `मी आपल्या संकेतस्थळावरून खालील पॅकेज संदर्भात माहिती विचारत आहे:\n` +
        `• *पॅकेज:* ${pkg.title} (${pkg.duration})\n` +
        `• *रूम शेअरिंग:* ${sharingObj.label}\n` +
        `• *किंमत:* ${formatINR(calculatedPrice)} प्रति व्यक्ती\n` +
        `• *मक्का अंतर:* ${pkg.makkahHotel.distance}\n` +
        `• *मदीना अंतर:* ${pkg.madinahHotel.distance}\n\n` +
        `कृपया पुढील तारखा आणि बुकिंग माहिती पाठवावी.`
      );
    } else if (currentLang === "hi") {
      return buildWhatsAppURL(
        `अस्सलामु अलैकुम ${contactName},\n\n` +
        `मैं आपकी वेबसाइट से इस पैकेज के संबंध में जानकारी चाहता हूं:\n` +
        `• *पैकेज:* ${pkg.title} (${pkg.duration})\n` +
        `• *रूम शेयरिंग:* ${sharingObj.label}\n` +
        `• *दिखाई गई दर:* ${formatINR(calculatedPrice)} प्रति व्यक्ति\n` +
        `• *मक्का दूरी:* ${pkg.makkahHotel.distance}\n` +
        `• *मदीना दूरी:* ${pkg.madinahHotel.distance}\n\n` +
        `कृपया आगामी रवानगी की तारीखें और बुकिंग विवरण साझा करें।`
      );
    }

    const msg =
      `Assalamu Alaikum ${contactName},\n\n` +
      `I would like to enquire about:\n` +
      `• *Package:* ${pkg.title} (${pkg.duration})\n` +
      `• *Room Sharing:* ${sharingObj.label}\n` +
      `• *Displayed Rate:* ${formatINR(calculatedPrice)} per person\n` +
      `• *Makkah Distance:* ${pkg.makkahHotel.distance}\n` +
      `• *Madinah Distance:* ${pkg.madinahHotel.distance}\n\n` +
      `Please share upcoming batch departure dates and booking details.`;
    return buildWhatsAppURL(msg);
  }

  function updatePackageCardSharing(pkgId, sharingKey) {
    const pkg = CONFIG.umrahPackages.find((p) => p.id === pkgId);
    const sharing = CONFIG.sharingTypes[sharingKey];
    if (!pkg || !sharing) return;

    cardSharingState[pkgId] = sharingKey;

    const card = document.getElementById(`card-${pkgId}`);
    if (!card) return;

    // Update active pill styling
    card.querySelectorAll(".sharing-pill").forEach((pill) => {
      if (pill.getAttribute("data-sharing") === sharingKey) {
        pill.classList.add("active");
        pill.classList.remove("text-slate-600");
      } else {
        pill.classList.remove("active");
        pill.classList.add("text-slate-600");
      }
    });

    const newPrice = pkg.basePriceQuad + sharing.priceAddon;
    const newOrigPrice = pkg.originalPrice + sharing.priceAddon;

    const priceEl = document.getElementById(`price-${pkgId}`);
    const origPriceEl = document.getElementById(`orig-price-${pkgId}`);
    const descEl = document.getElementById(`sharing-desc-${pkgId}`);
    const waBtn = document.getElementById(`wa-btn-${pkgId}`);

    if (priceEl) {
      priceEl.textContent = formatINR(newPrice);
      priceEl.classList.remove("price-animate");
      void priceEl.offsetWidth; // trigger reflow
      priceEl.classList.add("price-animate");
    }

    if (origPriceEl) {
      origPriceEl.textContent = formatINR(newOrigPrice);
    }

    if (descEl) {
      const ui = (window.UMMAT_PACKAGES_I18N?.ui && (window.UMMAT_PACKAGES_I18N.ui[currentLang] || window.UMMAT_PACKAGES_I18N.ui.en)) || {};
      const descMap = {
        quad: ui.bedsQuad || "4 Beds / Room",
        triple: ui.bedsTriple || "3 Beds / Room",
        double: ui.bedsDouble || "2 Beds / Room"
      };
      descEl.textContent = descMap[sharingKey] || "";
    }

    if (waBtn) {
      waBtn.href = buildPackageWhatsAppMessage(pkg, sharingKey, newPrice);
    }
  }

  // Initialize and bind Interactive Umrah Cost Estimator
    // Populate Cost Estimator Dropdowns with full localization
  function populateCostEstimatorDropdowns() {
    const pkgSelect = document.getElementById("calc-package");
    const sharingSelect = document.getElementById("calc-sharing");
    const citySelect = document.getElementById("calc-city");
    const monthSelect = document.getElementById("calc-month");

    if (!pkgSelect || !sharingSelect || !citySelect || !monthSelect) return;

    const savedPkg = pkgSelect.value;
    const savedSharing = sharingSelect.value;
    const savedCity = citySelect.value;
    const savedMonthIdx = monthSelect.selectedIndex >= 0 ? monthSelect.selectedIndex : 0;

    const pkgI18n = window.UMMAT_PACKAGES_I18N?.packages?.[currentLang] || {};
    const estOpts = getTranslation("estimatorOptions") || {};
    const sharingLabels = estOpts.sharing || {};
    const cityLabels = estOpts.cities || {};
    const monthsList = estOpts.months || CONFIG.departureMonths;
    const est = getTranslation("estimator") || {};
    const fromWord = est.fromPrefix || "From";

    pkgSelect.innerHTML = CONFIG.umrahPackages
      .map((pkg) => {
        const title = (pkgI18n[pkg.id] && pkgI18n[pkg.id].title) || pkg.title;
        return `<option value="${pkg.id}">${title} (${fromWord} ${formatINR(pkg.basePriceQuad)})</option>`;
      })
      .join("");
    if (savedPkg) pkgSelect.value = savedPkg;

    sharingSelect.innerHTML = Object.values(CONFIG.sharingTypes)
      .map((sh) => {
        const label = sharingLabels[sh.id] || sh.label;
        const addonTxt = sh.priceAddon > 0 ? `(+${formatINR(sh.priceAddon)}${est.perPersonSuffix || "/person"})` : (est.baseRate || "(Base Rate)");
        return `<option value="${sh.id}">${label} ${addonTxt}</option>`;
      })
      .join("");
    if (savedSharing) sharingSelect.value = savedSharing;

    citySelect.innerHTML = CONFIG.departureCities
      .map((city) => {
        const label = cityLabels[city.id] || `${city.name} — ${city.airline}${city.addon > 0 ? " (+" + formatINR(city.addon) + ")" : ""}`;
        return `<option value="${city.id}">${label}</option>`;
      })
      .join("");
    if (savedCity) citySelect.value = savedCity;

    monthSelect.innerHTML = monthsList
      .map((m) => `<option value="${m}">${m}</option>`)
      .join("");
    monthSelect.selectedIndex = (savedMonthIdx >= 0 && savedMonthIdx < monthSelect.options.length) ? savedMonthIdx : 0;
  }

  // Populate Callback Form Dropdowns with full localization
  function populateCallbackFormDropdowns() {
    const srvSelect = document.getElementById("cb-service");
    const plgSelect = document.getElementById("cb-pilgrims");
    if (!srvSelect || !plgSelect) return;

    const savedSrvIdx = srvSelect.selectedIndex >= 0 ? srvSelect.selectedIndex : 0;
    const savedPlgIdx = plgSelect.selectedIndex >= 0 ? plgSelect.selectedIndex : 2;

    const contactData = getTranslation("contact") || {};
    const pkgList = contactData.cbPackages || [
      "Super Deluxe Umrah Package (₹95,000)",
      "Economy Umrah Package (₹78,000)",
      "Royal 5-Star Haram View Umrah (₹1,38,000)",
      "Ramadan Special Umrah Package (₹1,15,000)",
      "Hajj 2027 Package (₹7,50,000)",
      "Custom Private Family Umrah"
    ];

    const plgList = contactData.cbPilgrims || [
      "1 Person",
      "2 Persons (Couple)",
      "3 – 4 Family Members",
      "5 – 9 Family Members",
      "10+ Group / Jamat"
    ];

    srvSelect.innerHTML = pkgList.map((p) => `<option value="${p}">${p}</option>`).join("");
    plgSelect.innerHTML = plgList.map((p) => `<option value="${p}">${p}</option>`).join("");

    if (savedSrvIdx < srvSelect.options.length) srvSelect.selectedIndex = savedSrvIdx;
    if (savedPlgIdx < plgSelect.options.length) plgSelect.selectedIndex = savedPlgIdx;
  }

  function initCostEstimator() {
    const pkgSelect = document.getElementById("calc-package");
    const sharingSelect = document.getElementById("calc-sharing");
    const citySelect = document.getElementById("calc-city");
    const monthSelect = document.getElementById("calc-month");
    const adultsInput = document.getElementById("calc-adults");
    const childrenInput = document.getElementById("calc-children");
    const infantsInput = document.getElementById("calc-infants");

    if (!pkgSelect || !sharingSelect || !citySelect || !monthSelect) return;

    // Populate dropdowns with localization
    populateCostEstimatorDropdowns();

    // Bind stepper buttons (+/-) for adults, children, infants
    document.querySelectorAll("[data-stepper-target]").forEach((btn) => {
      btn.addEventListener("click", function () {
        const targetId = this.getAttribute("data-stepper-target");
        const delta = parseInt(this.getAttribute("data-stepper-delta"), 10) || 0;
        const input = document.getElementById(targetId);
        if (!input) return;

        const min = parseInt(input.getAttribute("min"), 10) || 0;
        const max = parseInt(input.getAttribute("max"), 10) || 30;
        const nextVal = Math.min(max, Math.max(min, (parseInt(input.value, 10) || 0) + delta));
        input.value = nextVal;
        calculateUmrahEstimate();
      });
    });

    // Recalculate on any change
    [pkgSelect, sharingSelect, citySelect, monthSelect, adultsInput, childrenInput, infantsInput].forEach((el) => {
      if (el) {
        el.addEventListener("change", calculateUmrahEstimate);
        el.addEventListener("input", calculateUmrahEstimate);
      }
    });

    calculateUmrahEstimate();
  }

  function calculateUmrahEstimate() {
    const pkgId = document.getElementById("calc-package")?.value;
    const sharingId = document.getElementById("calc-sharing")?.value || "quad";
    const cityId = document.getElementById("calc-city")?.value || "mumbai";
    const monthVal = document.getElementById("calc-month")?.value || CONFIG.departureMonths[0];

    const adults = Math.max(1, parseInt(document.getElementById("calc-adults")?.value, 10) || 1);
    const children = Math.max(0, parseInt(document.getElementById("calc-children")?.value, 10) || 0);
    const infants = Math.max(0, parseInt(document.getElementById("calc-infants")?.value, 10) || 0);

    const pkg = CONFIG.umrahPackages.find((p) => p.id === pkgId) || CONFIG.umrahPackages[0];
    const sharing = CONFIG.sharingTypes[sharingId] || CONFIG.sharingTypes.quad;
    const city = CONFIG.departureCities.find((c) => c.id === cityId) || CONFIG.departureCities[0];

    const perAdultRate = pkg.basePriceQuad + sharing.priceAddon + city.addon;
    const perChildRate = Math.round(perAdultRate * CONFIG.passengerPricing.childWithBedRatio);
    const perInfantRate = CONFIG.passengerPricing.infantFlatFee;

    const adultsTotal = adults * perAdultRate;
    const childrenTotal = children * perChildRate;
    const infantsTotal = infants * perInfantRate;
    const grandTotal = adultsTotal + childrenTotal + infantsTotal;
    const totalPilgrims = adults + children + infants;
    const advanceAmount = (adults + children) * 20000;

    // Update UI summary elements with full localization
    const setElText = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };

    const est = getTranslation("estimator") || {};
    const pkgI18n = window.UMMAT_PACKAGES_I18N?.packages?.[currentLang] || {};
    const locPkgTitle = (pkgI18n[pkg.id] && pkgI18n[pkg.id].title) || pkg.title;
    const locDuration = (pkgI18n[pkg.id] && pkgI18n[pkg.id].duration) || pkg.duration;
    const estOpts = getTranslation("estimatorOptions") || {};
    const locSharingLabel = (estOpts.sharing && estOpts.sharing[sharingId]) || sharing.label;
    const locCityLabel = (estOpts.cities && estOpts.cities[cityId]) || `${city.name} (${city.airline})`;

    setElText("est-pkg-name", locPkgTitle);
    setElText("est-pkg-duration", `${locDuration} • ${locSharingLabel}`);
    setElText("est-city-name", locCityLabel);

    const adultWord = adults > 1 ? (est.adultPlural || "Adults") : (est.adult || "Adult");
    setElText("est-adult-line", `${adults} ${adultWord} × ${formatINR(perAdultRate)}`);
    setElText("est-adult-total", formatINR(adultsTotal));

    const childRow = document.getElementById("est-child-row");
    if (childRow) {
      if (children > 0) {
        childRow.classList.remove("hidden");
        const childWord = children > 1 ? (est.childPlural || "Children") : (est.child || "Child");
        setElText("est-child-line", `${children} ${childWord} (2–11 yrs) × ${formatINR(perChildRate)}`);
        setElText("est-child-total", formatINR(childrenTotal));
      } else {
        childRow.classList.add("hidden");
      }
    }

    const infantRow = document.getElementById("est-infant-row");
    if (infantRow) {
      if (infants > 0) {
        infantRow.classList.remove("hidden");
        const infantWord = infants > 1 ? (est.infantPlural || "Infants") : (est.infant || "Infant");
        setElText("est-infant-line", `${infants} ${infantWord} (<2 yrs) × ${formatINR(perInfantRate)}`);
        setElText("est-infant-total", formatINR(infantsTotal));
      } else {
        infantRow.classList.add("hidden");
      }
    }

    setElText("est-grand-total", formatINR(grandTotal));
    setElText("est-booking-advance", formatINR(advanceAmount));
    const pilgrimWord = totalPilgrims > 1 ? (est.pilgrimPlural || "Pilgrims") : (est.pilgrim || "Pilgrim");
    setElText("est-pilgrim-count", `${totalPilgrims} ${pilgrimWord}`);

    // Group discount hint for 4+ pilgrims
    const groupHint = document.getElementById("est-group-discount-badge");
    if (groupHint) {
      if (adults + children >= 4) {
        groupHint.classList.remove("hidden");
        if (est.groupDiscountText) groupHint.innerHTML = est.groupDiscountText;
      } else {
        groupHint.classList.add("hidden");
      }
    }

    // Build WhatsApp quote link
    const waQuoteBtn = document.getElementById("est-whatsapp-btn");
    if (waQuoteBtn) {
      const contactName = CONFIG.agency.contactPerson || CONFIG.agency.fullName;
      let msg = "";

      if (currentLang === "ur") {
        msg =
          `السلام علیکم ${contactName}،\n\n` +
          `میں نے آپ کی ویب سائٹ (${CONFIG.agency.primaryDomain}) پر عمرہ کوٹیشن تیار کی ہے اور باضابطہ فائنل ریٹ چاہتا ہوں:\n\n` +
          `• *منتخب پیکیج:* ${pkg.title} (${pkg.duration})\n` +
          `• *کمرے کی شیئرنگ:* ${sharing.label}\n` +
          `• *روانگی ہوائی اڈہ:* ${city.name}\n` +
          `• *پسندیدہ بیچ:* ${monthVal}\n` +
          `• *زائرین:* ${adults} بڑے${children > 0 ? `، ${children} بچے` : ""}${infants > 0 ? `، ${infants} شیر خوار` : ""}\n` +
          `• *کل متوقع رقم:* ${formatINR(grandTotal)}\n\n` +
          `براہِ کرم سیٹوں کی دستیابی اور فیملی ڈسکاؤنٹ بتائیں۔`;
      } else if (currentLang === "mr") {
        msg =
          `अस्सलामु अलैकुम ${contactName},\n\n` +
          `मी आपल्या संकेतस्थळावरून (${CONFIG.agency.primaryDomain}) खालील उमरा कोटेशन तयार केले आहे:\n\n` +
          `• *पॅकेज:* ${pkg.title} (${pkg.duration})\n` +
          `• *रूम शेअरिंग:* ${sharing.label}\n` +
          `• *प्रयाण विमानतळ:* ${city.name}\n` +
          `• *प्रवासाचा महिना:* ${monthVal}\n` +
          `• *प्रवासी:* ${adults} प्रौढ${children > 0 ? `, ${children} मुले` : ""}${infants > 0 ? `, ${infants} लहान बाळे` : ""}\n` +
          `• *एकूण अंदाजे खर्च:* ${formatINR(grandTotal)}\n\n` +
          `कृपया सीट उपलब्धता आणि ग्रुप डिस्काउंट सांगावा.`;
      } else if (currentLang === "hi") {
        msg =
          `अस्सलामु अलैकुम ${contactName},\n\n` +
          `मैंने आपकी वेबसाइट (${CONFIG.agency.primaryDomain}) पर उमरा कोटेशन तैयार किया है:\n\n` +
          `• *पैकेज:* ${pkg.title} (${pkg.duration})\n` +
          `• *रूम शेयरिंग:* ${sharing.label}\n` +
          `• *रवानगी हवाई अड्डा:* ${city.name}\n` +
          `• *पसंदीदा महीना:* ${monthVal}\n` +
          `• *यात्री:* ${adults} वयस्क${children > 0 ? `, ${children} बच्चे` : ""}${infants > 0 ? `, ${infants} शिशु` : ""}\n` +
          `• *कुल अनुमानित खर्च:* ${formatINR(grandTotal)}\n\n` +
          `कृपया सीट उपलब्धता और परिवार छूट की पुष्टि करें।`;
      } else {
        msg =
          `Assalamu Alaikum ${contactName},\n\n` +
          `I calculated an Umrah estimate on your website (${CONFIG.agency.primaryDomain}) and would like your best official quote:\n\n` +
          `• *Selected Package:* ${pkg.title} (${pkg.duration})\n` +
          `• *Room Sharing:* ${sharing.label}\n` +
          `• *Departure Airport:* ${city.name}\n` +
          `• *Preferred Batch:* ${monthVal}\n` +
          `• *Travelers:* ${adults} Adult(s)${children > 0 ? `, ${children} Child(ren)` : ""}${
            infants > 0 ? `, ${infants} Infant(s)` : ""
          }\n` +
          `• *Website Estimated Total:* ${formatINR(grandTotal)}\n\n` +
          `Please confirm seat availability and any family/group discount.`;
      }
      waQuoteBtn.href = buildWhatsAppURL(msg);
    }
  }

  // Render Hajj & Custom Services Cards (with full localization)
  function renderSpecialServices() {
    const container = document.getElementById("special-services-grid");
    if (!container) return;

    const iconMap = {
      kaaba: "🕋",
      family: "👨‍👩‍👧‍👦",
      globe: "🕌"
    };

    const srvList = getTranslation("specialServicesList") || CONFIG.specialServices || [];
    const btnEnquireText = getTranslation("specialServices.btnEnquire") || "Enquire Now";

    container.innerHTML = srvList
      .map((srv) => {
        const defaultPrompt = CONFIG.specialServices.find((s) => s.id === srv.id)?.whatsappPrompt || srv.title;
        const waUrl = buildWhatsAppURL(srv.whatsappPrompt || defaultPrompt);
        return `
        <div class="bg-white rounded-2xl p-6 md:p-7 border border-amber-500/25 shadow-sm hover:shadow-xl transition flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-4">
              <span class="w-12 h-12 rounded-xl bg-emerald-900 text-2xl flex items-center justify-center shadow-sm">
                ${iconMap[srv.icon] || "🕋"}
              </span>
              <span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60">
                ${srv.tag}
              </span>
            </div>
            <h3 class="text-xl font-bold font-serif-islamic text-emerald-950">${srv.title}</h3>
            <p class="text-sm text-slate-600 mt-2 leading-relaxed">${srv.description}</p>

            <ul class="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
              ${(srv.features || [])
                .map(
                  (f) => `
                <li class="flex items-start gap-2">
                  <span class="text-amber-600 font-bold">✦</span>
                  <span>${f}</span>
                </li>
              `
                )
                .join("")}
            </ul>
          </div>

          <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <span class="text-xs font-semibold text-emerald-800">${srv.startingHint}</span>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-bold text-xs transition shrink-0">
              <span>${btnEnquireText}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        </div>
      `;
      })
      .join("");
  }

  // Render Required Documents & FAQs (with full localization)
  function renderDocumentsAndFAQs() {
    const docsContainer = document.getElementById("documents-grid");
    const docsList = getTranslation("documentsList") || CONFIG.documentsRequired || [];
    if (docsContainer && Array.isArray(docsList)) {
      docsContainer.innerHTML = docsList
        .map(
          (doc, idx) => `
          <div class="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-sm flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-gold-gradient text-emerald-950 font-extrabold text-sm flex items-center justify-center shrink-0">
              0${idx + 1}
            </div>
            <div>
              <h4 class="font-bold text-emerald-950 text-base">${doc.title}</h4>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">${doc.detail}</p>
            </div>
          </div>
        `
        )
        .join("");
    }

    const faqContainer = document.getElementById("faq-accordion");
    const faqsList = getTranslation("faqsList") || CONFIG.faqs || [];
    if (faqContainer && Array.isArray(faqsList)) {
      faqContainer.innerHTML = faqsList
        .map(
          (item, index) => `
          <div class="faq-item ${index === 0 ? "open" : ""} bg-white rounded-2xl border border-slate-200/90 overflow-hidden transition">
            <button type="button" class="faq-toggle w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-emerald-50/40 transition cursor-pointer">
              <span class="font-bold text-emerald-950 text-sm md:text-base">${item.question}</span>
              <svg class="faq-chevron w-5 h-5 text-emerald-800 shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div class="faq-answer px-6">
              <p class="text-xs md:text-sm text-slate-600 pb-5 pt-1 leading-relaxed border-t border-slate-100">${item.answer}</p>
            </div>
          </div>
        `
        )
        .join("");

      faqContainer.querySelectorAll(".faq-toggle").forEach((btn) => {
        btn.addEventListener("click", function () {
          const parent = this.closest(".faq-item");
          if (!parent) return;
          const isOpen = parent.classList.contains("open");
          faqContainer.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("open"));
          if (!isOpen) parent.classList.add("open");
        });
      });
    }
  }

  // Handle Callback Request Form Submission (Instant WhatsApp + Optional Web3Forms Email)
  function initCallbackForm() {
    const form = document.getElementById("callback-request-form");
    const statusBanner = document.getElementById("callback-form-status");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const fullName = document.getElementById("cb-name")?.value.trim() || "";
      const phone = document.getElementById("cb-phone")?.value.trim() || "";
      const city = document.getElementById("cb-city")?.value.trim() || "";
      const service = document.getElementById("cb-service")?.value || "Deluxe Umrah Package";
      const pilgrims = document.getElementById("cb-pilgrims")?.value || "2";
      const notes = document.getElementById("cb-notes")?.value.trim() || "";

      if (!fullName || !phone) return;

      const cleanDigits = phone.replace(/\D/g, "");
      if (cleanDigits.length < 10) {
        if (statusBanner) {
          statusBanner.classList.remove("hidden");
          statusBanner.textContent = "";
          const warnBox = document.createElement("div");
          warnBox.className = "p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold";
          warnBox.textContent = "⚠️ Please enter a valid 10-digit mobile number so we can reach you on WhatsApp.";
          statusBanner.appendChild(warnBox);
        }
        return;
      }

      // Build structured WhatsApp Callback message (100% client-side, zero third-party API calls)
      const waMessage =
        `Assalamu Alaikum ${CONFIG.agency.fullName},\n\n` +
        `Please call me back regarding an Umrah/Hajj booking:\n` +
        `• *Name:* ${fullName}\n` +
        `• *Mobile:* ${phone}\n` +
        `• *City:* ${city || "India"}\n` +
        `• *Interested In:* ${service}\n` +
        `• *No. of Pilgrims:* ${pilgrims}\n` +
        (notes ? `• *Special Note:* ${notes}\n` : "") +
        `\nJazakAllah Khair.`;

      const waUrl = buildWhatsAppURL(waMessage);

      if (statusBanner) {
        statusBanner.classList.remove("hidden");
        statusBanner.textContent = "";
        const okBox = document.createElement("div");
        okBox.className = "p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs md:text-sm";

        const titleEl = document.createElement("strong");
        titleEl.className = "block font-bold text-emerald-900";
        titleEl.textContent = `JazakAllah Khair, ${fullName}!`;
        okBox.appendChild(titleEl);

        okBox.appendChild(
          document.createTextNode(
            "Opening WhatsApp to connect you directly with our Umrah counselor. If WhatsApp did not open automatically, "
          )
        );

        const linkEl = document.createElement("a");
        linkEl.href = waUrl;
        linkEl.target = "_blank";
        linkEl.rel = "noopener noreferrer";
        linkEl.className = "underline font-bold text-emerald-800";
        linkEl.textContent = "click here to send your message";
        okBox.appendChild(linkEl);
        okBox.appendChild(document.createTextNode("."));

        statusBanner.appendChild(okBox);
      }

      window.open(waUrl, "_blank", "noopener,noreferrer");
      form.reset();
    });
  }

  // Mobile Navbar Toggle
  function initMobileMenu() {
    const toggleBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu-panel");
    if (!toggleBtn || !mobileMenu) return;

    toggleBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // Boot application on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", function () {
    // Bind all Language Switcher buttons (top bar & mobile)
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      btn.addEventListener("click", function () {
        const lang = this.getAttribute("data-lang-btn");
        setLanguage(lang);
      });
    });

    // Bind all Journey Switcher buttons (Hero & Section invites)
    document.querySelectorAll("[data-journey-btn]").forEach((btn) => {
      btn.addEventListener("click", function () {
        const mode = this.getAttribute("data-journey-btn");
        setJourneyMode(mode, false);
      });
    });

    // Automatically switch journey mode when clicking corresponding nav links
    document.querySelectorAll('a[href="#hajj-2027-section"]').forEach((link) => {
      link.addEventListener("click", function () {
        setJourneyMode("hajj", true);
      });
    });

    document.querySelectorAll('a[href="#umrah-packages"], a[href="#cost-estimator"]').forEach((link) => {
      link.addEventListener("click", function () {
        setJourneyMode("umrah", true);
      });
    });

    hydrateAgencyMetadata();
    renderUmrahPackages();
    initCostEstimator();
    populateCallbackFormDropdowns();
    renderSpecialServices();
    renderDocumentsAndFAQs();
    initCallbackForm();
    initMobileMenu();

    // Check URL parameters e.g. ?journey=hajj or location hash
    const urlParams = new URLSearchParams(window.location.search);
    const paramJourney = urlParams.get("journey");
    if (paramJourney === "hajj" || window.location.hash.includes("hajj")) {
      currentJourney = "hajj";
    }

    // Initialize with active journey mode (Umrah or Hajj)
    setJourneyMode(currentJourney, false);

    // Initialize with active language (English, Hindi, Marathi, or Urdu)
    setLanguage(currentLang);
  });
})();
