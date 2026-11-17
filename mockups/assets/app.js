// Shared helpers and demo data for the Mawar Studio mockup. No backend: everything is fake.
const MAWAR = {
  settings: { dpPercent: 50, galleryDays: 30, muaLeadMin: 60, bufferMin: 15, maxFavorites: 20 },
  rooms: [
    { id: "putih", name: "Studio Putih", desc: "Daylight, minimalis, cocok untuk graduation", cap: 6, perHour: 400000, bg: "radial-gradient(ellipse at 50% 85%, #ffffff 0 30%, transparent 60%), linear-gradient(180deg, #f4f1ec 0 62%, #e6e0d7 62% 100%)" },
    { id: "rose", name: "Studio Rose", desc: "Hangat, vintage, favorit prewedding", cap: 4, perHour: 450000, bg: "radial-gradient(ellipse at 30% 30%, #f3d3d3 0 25%, transparent 55%), linear-gradient(180deg, #d9a3a3 0 62%, #b98078 62% 100%)" },
    { id: "hitam", name: "Studio Hitam", desc: "Low-key, dramatis, untuk konsep editorial", cap: 8, perHour: 350000, bg: "radial-gradient(ellipse at 70% 35%, #5a5550 0 12%, transparent 45%), linear-gradient(180deg, #2a2725 0 62%, #1b1918 62% 100%)" },
  ],
  sessions: [
    { id: "prewed", name: "Prewedding", hours: 3, desc: "3 jam, 2 konsep baju" },
    { id: "grad", name: "Graduation", hours: 1, desc: "1 jam, sampai 6 orang" },
    { id: "family", name: "Family / Personal", hours: 1, desc: "1 jam, bebas konsep" },
    { id: "rent", name: "Sewa studio saja", hours: 2, desc: "Bawa tim sendiri, per jam" },
  ],
  addons: [
    { id: "foto", name: "Fotografer", price: 800000, note: "Termasuk 30 foto edit" },
    { id: "mua", name: "MUA (makeup & hair)", price: 650000, note: "Datang 1 jam sebelum sesi" },
    { id: "stylist", name: "Stylist", price: 450000, note: "Bantu pilih dan atur baju" },
  ],
};

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

// Midtrans Snap simulation. Calls onPaid(method) when the user taps "bayar berhasil".
function openSnap(amount, label, onPaid) {
  let m = document.getElementById("snap");
  if (!m) {
    m = document.createElement("div");
    m.id = "snap";
    m.className = "modal";
    m.setAttribute("role", "dialog");
    m.setAttribute("aria-modal", "true");
    m.innerHTML = `
      <div class="sheet">
        <div class="top row between">
          <div><b>Mawar Studio</b><br><small data-label></small></div>
          <div style="text-align:right"><small>Total</small><br><b data-amount></b></div>
        </div>
        <div class="body">
          <div data-list>
            <p class="muted" style="font-size:13px">Simulasi Midtrans Snap. Pilih metode bayar:</p>
            <button class="method" data-m="QRIS">QRIS <span class="muted">semua e-wallet &amp; m-banking</span></button>
            <button class="method" data-m="GoPay">GoPay <span class="muted">›</span></button>
            <button class="method" data-m="VA BCA">Virtual Account BCA <span class="muted">›</span></button>
            <button class="method" data-m="VA Mandiri">Virtual Account Mandiri <span class="muted">›</span></button>
            <button class="method" data-m="Kartu kredit">Kartu kredit / debit <span class="muted">›</span></button>
          </div>
          <div data-pay class="hide" style="text-align:center">
            <p><b data-mname></b></p>
            <div class="qr" aria-label="Contoh kode QR"></div>
            <p class="muted" style="font-size:13px">Di sistem asli, Midtrans memberi tahu sistem otomatis begitu customer bayar. Admin tidak perlu cek mutasi rekening.</p>
            <button class="btn green block" data-ok>Simulasikan bayar berhasil</button>
          </div>
          <button class="btn ghost block mt" data-close>Batal</button>
        </div>
      </div>`;
    document.body.appendChild(m);
    m.addEventListener("click", (e) => { if (e.target === m || e.target.closest("[data-close]")) m.classList.remove("open"); });
    m.querySelectorAll(".method").forEach((b) => b.addEventListener("click", () => {
      m.querySelector("[data-list]").classList.add("hide");
      m.querySelector("[data-pay]").classList.remove("hide");
      m.querySelector("[data-mname]").textContent = b.dataset.m;
      m.dataset.method = b.dataset.m;
    }));
    m.querySelector("[data-ok]").addEventListener("click", () => {
      m.classList.remove("open");
      m._onPaid && m._onPaid(m.dataset.method);
    });
  }
  m.querySelector("[data-label]").textContent = label;
  m.querySelector("[data-amount]").textContent = rupiah(amount);
  m.querySelector("[data-list]").classList.remove("hide");
  m.querySelector("[data-pay]").classList.add("hide");
  m._onPaid = onPaid;
  m.classList.add("open");
  m.querySelector(".method").focus();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") document.querySelectorAll(".modal.open").forEach((m) => m.classList.remove("open"));
});

// Admin sidebar, shared by every admin page. Call adminNav("jadwal") etc.
function adminNav(active) {
  const items = [["index.html", "jadwal", "Jadwal"], ["laporan.html", "laporan", "Booking & laporan"], ["freelancer.html", "freelancer", "Freelancer"], ["pengaturan.html", "pengaturan", "Pengaturan"]];
  document.getElementById("side").innerHTML =
    `<a class="brand" href="index.html"><span class="dot"></span> Mawar Admin</a><nav>` +
    items.map(([href, key, label]) => `<a href="${href}" class="${key === active ? "on" : ""}">${label}</a>`).join("") +
    `</nav><div class="who">Masuk sebagai<br><b style="color:#e9e1d8">Admin Mawar</b></div>`;
}
