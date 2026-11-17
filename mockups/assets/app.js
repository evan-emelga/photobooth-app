// Shared helpers and demo data for the PhotoStudio System mockup. No backend: everything is fake.
const DEMO = {
  settings: { dpPercent: 50, galleryDays: 30, muaLeadMin: 60, bufferMin: 15, maxFavorites: 20 },
  rooms: [
    { id: "putih", name: "Studio Putih", desc: "Daylight, minimalis, cocok untuk graduation", cap: 6, perHour: 400000, img: "https://images.unsplash.com/photo-1726650680145-d441d5882bdb" },
    { id: "rose", name: "Studio Rose", desc: "Hangat, vintage, favorit prewedding", cap: 4, perHour: 450000, img: "https://images.unsplash.com/photo-1647427854253-b92bb40c9330" },
    { id: "hitam", name: "Studio Hitam", desc: "Low-key, dramatis, untuk konsep editorial", cap: 8, perHour: 350000, img: "https://images.unsplash.com/photo-1634148739677-a5bb54df2611" },
  ],
  sessions: [
    { id: "prewed", name: "Prewedding", hours: 3, desc: "3 jam, 2 konsep baju", img: "https://images.unsplash.com/photo-1554384032-56ff486b6cd4" },
    { id: "grad", name: "Graduation", hours: 1, desc: "1 jam, sampai 6 orang", img: "https://images.unsplash.com/photo-1551728339-499b333c5c43" },
    { id: "family", name: "Family / Personal", hours: 1, desc: "1 jam, bebas konsep", img: "https://images.unsplash.com/photo-1760328249117-18488466e34c" },
    { id: "rent", name: "Sewa studio saja", hours: 2, desc: "Bawa tim sendiri, per jam", img: "https://images.unsplash.com/photo-1736580602204-b940bb0423ec" },
  ],
  addons: [
    { id: "foto", name: "Fotografer", price: 800000, note: "Termasuk 30 foto edit" },
    { id: "mua", name: "MUA (makeup & hair)", price: 650000, note: "Datang 1 jam sebelum sesi" },
    { id: "stylist", name: "Stylist", price: 450000, note: "Bantu pilih dan atur baju" },
  ],
};

// Stock photos: Unsplash License (free to use). Demo gallery for the "Nadia & Raka" booking.
DEMO.gallery = ["1554384032-56ff486b6cd4", "1578359219991-efe67fa63626", "1740674570372-068c47883fc5", "1553465528-5a213ccc0c7b",
  "1733122870089-46d9320cf5e4", "1635912369152-144ee6994787", "1551728339-499b333c5c43", "1760328249117-18488466e34c"];
const photo = (id, w, h) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=faces,entropy&q=70&auto=format`;
const roomImg = (r, w = 600, h = 450) => `${r.img}?w=${w}&h=${h}&fit=crop&q=70&auto=format`;

// Themes. Default comes from the impeccable direction roll; "klasik" is the category-standard look.
const THEMES = [
  ["cetak", "Amplop Cuci Cetak", "Hijau lab foto, kotak formulir, cap stempel", ["#0b7a3b", "#ffd100", "#d3261b", "#fbfbf7"]],
  ["film", "Meja Potong Film", "Oranye di atas hitam, rel perforasi film", ["#0c0c0b", "#ff6a13", "#ffffff", "#3a3833"]],
  ["pola", "Pola Jahit", "Kertas pola manila, garis putus, merah penjahit", ["#ecdfbd", "#1b1a17", "#c41e3a", "#f6eed9"]],
  ["klasik", "Klasik", "Krem, serif, aksen rose (gaya standar)", ["#faf7f2", "#1f1b18", "#a8434f", "#efe7dc"]],
];
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem("ps-theme", t); } catch (e) {}
  document.querySelectorAll("[data-theme-select]").forEach((s) => (s.value = t));
  document.dispatchEvent(new CustomEvent("themechange", { detail: t }));
}
document.addEventListener("DOMContentLoaded", () => {
  const bar = document.querySelector(".mock-bar");
  if (!bar) return;
  const wrap = document.createElement("label");
  wrap.className = "theme-pick";
  wrap.innerHTML = `<span>Tema</span><select data-theme-select aria-label="Pilih tema">${THEMES.map(([k, n]) => `<option value="${k}">${n}</option>`).join("")}</select>`;
  bar.appendChild(wrap);
  const sel = wrap.querySelector("select");
  sel.value = document.documentElement.dataset.theme || "cetak";
  sel.addEventListener("change", () => setTheme(sel.value));
});

const rupiah = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

function toast(text) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    document.body.appendChild(t);
  }
  t.textContent = text;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2200);
}

// Asset folder, resolved from this script so it works from mockups/ and mockups/admin/.
const ASSETS = (document.currentScript && document.currentScript.src) ? new URL(".", document.currentScript.src).href : "assets/";
const logo = (f, alt, h = 22) => `<img src="${ASSETS}logos/${f}.svg" alt="${alt}" style="height:${h}px;width:auto;display:inline-block">`;

// Manual payment sheet: static QRIS or BCA transfer, customer uploads proof, admin verifies.
// Calls onSent(method) when the customer sends the proof. tab = "qris" | "bca".
function openPay(amount, label, onSent, tab = "qris") {
  let m = document.getElementById("pay");
  if (!m) {
    m = document.createElement("div");
    m.id = "pay";
    m.className = "modal";
    m.setAttribute("role", "dialog");
    m.setAttribute("aria-modal", "true");
    m.setAttribute("aria-label", "Pembayaran");
    m.innerHTML = `
      <div class="sheet">
        <div class="top row between">
          <div><b>Nama Studio</b><br><small data-label></small></div>
          <div style="text-align:right"><small>Total</small><br><b data-amount></b></div>
        </div>
        <div class="body">
          <div class="paytabs" role="tablist">
            <button role="tab" data-tab="qris">${logo("qris", "QRIS", 18)}<span>QRIS</span></button>
            <button role="tab" data-tab="bca">${logo("bca", "BCA", 16)}<span>Transfer BCA</span></button>
          </div>
          <div data-panel="qris" style="text-align:center">
            <img class="qr-img" src="${ASSETS}qr-demo.svg" alt="Contoh QRIS statis, bukan pembayaran asli">
            <p class="muted" style="font-size:12px;margin:0 0 4px">NMID: ID1026xxxxxx · Nama Studio</p>
            <p style="font-size:13px;margin:0">Scan pakai e-wallet atau m-banking apa saja, lalu masukkan nominal <b data-amount></b>.</p>
          </div>
          <div data-panel="bca" class="hide">
            <div class="acct">
              <small class="muted">Nomor rekening BCA</small>
              <div class="row between"><b class="acct-no">123 456 7890</b><button class="btn ghost sm" data-copy>Salin</button></div>
              <small class="muted">Atas nama</small><div><b>Nama Studio</b></div>
            </div>
            <p style="font-size:13px;margin:8px 0 0">Transfer tepat <b data-amount></b> supaya mudah dicek.</p>
          </div>
          <label class="upload mt">
            <span><b>Upload bukti bayar</b><br><small class="muted" data-file>Foto atau screenshot bukti transfer</small></span>
            <span class="btn ghost sm" aria-hidden="true">Pilih file</span>
            <input type="file" accept="image/*,application/pdf" class="hide" data-input>
          </label>
          <button class="btn rose block mt" data-send>Kirim bukti bayar</button>
          <p class="hint" style="text-align:center">Admin memverifikasi pembayaran, lalu konfirmasi dikirim lewat WhatsApp.</p>
          <button class="btn ghost block" data-close>Batal</button>
        </div>
      </div>`;
    document.body.appendChild(m);
    m.addEventListener("click", (e) => { if (e.target === m || e.target.closest("[data-close]")) m.classList.remove("open"); });
    m.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => m._tab(b.dataset.tab)));
    m._tab = (t) => {
      m.dataset.method = t === "bca" ? "Transfer BCA" : "QRIS";
      m.querySelectorAll("[data-tab]").forEach((b) => b.setAttribute("aria-selected", b.dataset.tab === t));
      m.querySelectorAll("[data-panel]").forEach((p) => p.classList.toggle("hide", p.dataset.panel !== t));
    };
    m.querySelector("[data-copy]").addEventListener("click", () => toast("Nomor rekening disalin"));
    m.querySelector("[data-input]").addEventListener("change", (e) => {
      const f = e.target.files[0];
      m.querySelector("[data-file]").textContent = f ? f.name : "Foto atau screenshot bukti transfer";
    });
    m.querySelector("[data-send]").addEventListener("click", () => {
      m.classList.remove("open");
      m._onSent && m._onSent(m.dataset.method);
    });
  }
  m.querySelector("[data-label]").textContent = label;
  m.querySelectorAll("[data-amount]").forEach((el) => (el.textContent = rupiah(amount)));
  m._onSent = onSent;
  m._tab(tab);
  m.classList.add("open");
  m.querySelector(`[data-tab="${tab}"]`).focus();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") document.querySelectorAll(".modal.open").forEach((m) => m.classList.remove("open"));
});

// Admin sidebar, shared by every admin page. Call adminNav("jadwal") etc.
function adminNav(active) {
  const items = [["index.html", "jadwal", "Jadwal"], ["laporan.html", "laporan", "Booking & laporan"], ["freelancer.html", "freelancer", "Freelancer"], ["pengaturan.html", "pengaturan", "Pengaturan"]];
  document.getElementById("side").innerHTML =
    `<a class="brand" href="index.html"><span class="dot"></span> Admin Studio</a><nav>` +
    items.map(([href, key, label]) => `<a href="${href}" class="${key === active ? "on" : ""}">${label}</a>`).join("") +
    `</nav><div class="who">Masuk sebagai<br><b style="color:#e9e1d8">Admin Studio</b></div>`;
}
