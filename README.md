# Ummat Hajj Umrah Tours & Travels (India) — Website & Domain Guide

This project is a high-converting, zero-monthly-cost (`₹0/month` hosting) website built for **Ummat Hajj Umrah Tours & Travels (India)**, designed around your `.com` + `.in` dual-domain strategy (`~₹1,400/year` total cost).

---

## 1. Project Files

- [index.html](file:///Users/saniyashaikh/Documents/ummat%20hajj%20umrah/index.html) — Main single-page responsive website with SEO & WhatsApp OpenGraph preview tags.
- [js/config.js](file:///Users/saniyashaikh/Documents/ummat%20hajj%20umrah/js/config.js) — **Centralized Configuration File**. Edit this file to change your WhatsApp number, phone numbers, office address, departure cities, and Umrah/Hajj package prices.
- [js/main.js](file:///Users/saniyashaikh/Documents/ummat%20hajj%20umrah/js/main.js) — Renders the 4 Umrah package cards, live `Quad / Triple / Double` room-sharing price switcher, Interactive Umrah Cost Estimator, FAQ accordions, and pre-filled WhatsApp inquiry links.
- [css/styles.css](file:///Users/saniyashaikh/Documents/ummat%20hajj%20umrah/css/styles.css) — Royal Emerald Green (`#0B4F3A`), Deep Haram Green (`#062E22`), and Warm Kiswah Gold (`#D4AF37`) theme with Islamic geometric patterns.

---

## 2. How to Update Your Phone Number, Address & Package Prices

Open [js/config.js](file:///Users/saniyashaikh/Documents/ummat%20hajj%20umrah/js/config.js) in any text editor:

1. **Change Your WhatsApp & Phone Numbers** (lines 18–21):
   ```javascript
   whatsappNumber: "919876543210",          // 91 + your 10-digit WhatsApp number (no spaces or +)
   displayPhonePrimary: "+91 98765 43210",  // Shown on top bar, contact section & footer
   displayPhoneSecondary: "+91 98765 43211",
   email: "info@ummathajjumrah.com",
   address: "Your Full Office Address Here",
   ```
2. **Change Package Prices** (under `umrahPackages` in [js/config.js](file:///Users/saniyashaikh/Documents/ummat%20hajj%20umrah/js/config.js)):
   - Update `basePriceQuad` (e.g. `78000` for Economy, `95000` for Deluxe, `138000` for 5-Star, `115000` for Ramadan).
   - Triple and Double sharing rates are automatically calculated using `sharingTypes.triple.priceAddon` (`+₹9,000`) and `sharingTypes.double.priceAddon` (`+₹18,500`).

---

## 3. How to Host for ₹0/Month & Connect `.com` + `.in` (~₹1,400/Year Total)

### Step A: Buy Both `.com` and `.in` Domains (~₹1,400/Year)
1. Buy your primary `.com` domain (e.g., `ummathajjumrah.com`) from **Cloudflare Registrar**, **Porkbun**, or **Hostinger India** (`~₹850–₹950/year`).
2. Buy your brand-protection `.in` domain (e.g., `ummathajjumrah.in`) from **Hostinger India**, **Namecheap**, or **Porkbun** (`~₹450–₹550/year`).
3. Create a free account at **Cloudflare.com** and add both domains to Cloudflare's free DNS plan.

### Step B: Host the Website for ₹0/Month on Cloudflare Pages
1. In your Cloudflare dashboard, go to **Workers & Pages** → **Create** → **Pages** → **Upload Assets**.
2. Name your project `ummat-hajj-umrah` and drag-and-drop this entire project folder (`index.html`, `css/`, `js/`).
3. Click **Deploy Site**. Your website is now live globally with free HTTPS/SSL!
4. Go to the **Custom Domains** tab inside your Cloudflare Pages project and connect `ummathajjumrah.com` and `www.ummathajjumrah.com`.

### Step C: Redirect `.in` → `.com` for Free
1. In Cloudflare, select your `.in` domain (`ummathajjumrah.in`).
2. Under **DNS**, add a dummy proxied `A` record for `@` and `www` pointing to `192.0.2.1` (Orange Cloud / Proxied ON).
3. Go to **Rules** → **Redirect Rules** → **Create Rule**:
   - **When incoming requests match**: All incoming requests
   - **Then**: Dynamic / Static Redirect to `https://ummathajjumrah.com` with status code `301 (Permanent Redirect)`.
4. Now, anyone typing `ummathajjumrah.in` is automatically directed to `https://ummathajjumrah.com` at zero extra cost!
