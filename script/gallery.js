let slides = [], current = 0, urls = [], items = [];
const MIN_ZOOM = 0.5, MAX_ZOOM = 4, ZOOM_STEP = 0.1;

// --- Loader ---
const showLoader = () => {
    document.getElementById("loader").style.display = "flex";
    document.getElementById("progress").style.display = "block";
};
const hideLoader = () => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("progress").style.display = "none";
};
const updateProgress = (done, total) => {
    const bar = document.getElementById("progressBar");
    if (!bar) return;
    const percent = Math.round((done / total) * 100);
    bar.style.width = percent + "%";
    bar.innerText = percent + "%";
};

function updateLogoutButton() {
    const logoutBtn = document.getElementById("logout");
    const loginToken = getCookieByName("loginToken");

    if (loginToken && !document.getElementById("overlay").classList.contains("active")) {
        logoutBtn.style.display = "block";
    } else {
        logoutBtn.style.display = "none";
    }
}

// --- Normalize URL to cache key ---
function getCacheKey(url) {
    const u = new URL(url);
    const file = u.searchParams.get("file");
    return file ? "gallery-file-" + file : url;
}

// --- Cache fetch ---
async function fetchWithCache(url) {
    const cache = await caches.open("gallery-cache");
    const cacheKey = getCacheKey(url);

    let response = await cache.match(cacheKey);
    if (response) return response;

        response = await fetch(url);
        if (response.ok) await cache.put(cacheKey, response.clone());
    return response;
}


// --- Clear all gallery cache ---
async function clearGalleryCache() {
    const cacheNames = await caches.keys();
    for (const name of cacheNames) {
        if (name === "gallery-cache") {
            await caches.delete(name);
            console.log("Gallery cache cleared!");
        }
    }
}
//
// --- Preload images ---
async function preloadImages(urlList) {
    let done = 0;
    return Promise.all(urlList.map(async (url) => {
        const res = await fetchWithCache(url);
        if (!res?.ok) throw new Error("Failed to load " + url);
        
        const blobUrl = URL.createObjectURL(await res.blob());
        const img = new Image();
        img.src = blobUrl;
        try {
            if (img.decode) {
                await img.decode();
                
            } else {
                console.log(img.src)
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = (e) => {
                        console.error("Image failed to load:", e);
                        reject(e);
                    };
                });
            }
        } catch (err) {
            console.error("Error decoding image:", err);
        }


        updateProgress(++done, urlList.length);
        return { img, blobUrl };
    }));
}

// --- Cookies ---
function getCookieByName(name) {
    const nameEQ = name + "=", cookies = document.cookie.split(';');
    for (let c of cookies) {
        c = c.trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

// --- Draw Image with single watermark ---
function drawImageWithWatermark(ctx, img, cw, ch, zoomLevel = 1) {
    ctx.clearRect(0, 0, cw, ch);

    // Fit image fully inside canvas (cover mobile properly)
    const ratio = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * ratio * zoomLevel;
    const h = img.naturalHeight * ratio * zoomLevel;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);

    // Single watermark
    ctx.font = "20px Arial";
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fillText("© 1111darsh.com", 40, 40);
}


// --- Gallery thumbnails & viewer canvas adjust for mobile ---
function adjustCanvasSizes() {
    const gallery = document.getElementById("gallery");
    gallery.querySelectorAll("canvas").forEach((canvas, idx) => {
        // Desktop larger thumbnails
        canvas.width = window.innerWidth > 600 ? 250 : canvas.clientWidth;
        canvas.height = window.innerWidth > 600 ? 180 : canvas.clientHeight;

        drawImageWithWatermark(canvas.getContext("2d"), items[idx].img, canvas.width, canvas.height);
    });

    slides.forEach(s => {
        s.canvas.width = s.canvas.clientWidth;
        s.canvas.height = s.canvas.clientHeight;
        drawImageWithWatermark(s.ctx, s.img, s.canvas.width, s.canvas.height, s.slideState.zoom);
    });
}

window.addEventListener("resize", adjustCanvasSizes);

// --- Gallery ---
async function loadGallery() {
    updateLogoutButton();
    showLoader();
    const params = new URLSearchParams(window.location.search);
    const loginParam = params.get("login");
    if (loginParam) {
        const cleanUrl = window.location.origin + window.location.pathname;
        document.cookie = "loginToken=" + loginParam + "; max-age=1000; path=/;";
        window.history.replaceState({}, document.title, cleanUrl);
    }
    const loginToken = getCookieByName("loginToken");
    if (!loginToken) return (hideLoader(), showError("🔒 Protected! You need a valid token from Darshan or an authorized user to view this gallery."));

    try {
        const res = await fetch("https://gallery.1111darsh.com/signed-list?login=" + loginToken);
        if (!res.ok) return (hideLoader(), showError("🚫  Oops! Your access token has expired.\n\n 🔑 Please reach out to Darshan or an authorized user to get a fresh URL.\n\n Once you have it, you can continue exploring the gallery!\n\nInvalid token: " + loginToken));
        urls = await res.json();
        if (!urls?.length) return (hideLoader(), showError("⚠️ No images."));

        items = await preloadImages(urls);
        const gallery = document.getElementById("gallery");
        gallery.innerHTML = "";
        items.forEach(({ img }, i) => {
            const canvas = document.createElement("canvas");
            canvas.width = window.innerWidth > 600 ? 250 : 200;
            canvas.height = window.innerWidth > 600 ? 180 : 150;
            gallery.appendChild(canvas);
            const ctx = canvas.getContext("2d");
            drawImageWithWatermark(ctx, img, canvas.width, canvas.height);
            canvas.addEventListener("click", () => openViewer(i));
        });
        hideLoader();
        updateLogoutButton();
    } catch (e) {
        console.error(e);
        hideLoader();
        showError("🔒 Protected! Please contact Darshan for access.");
    }
}

// --- Viewer ---
function openViewer(index) {
    const overlay = document.getElementById("overlay"),
        viewer = document.getElementById("viewer"),
        thumbBar = document.getElementById("thumbBar"),
        logoutBtn = document.getElementById("logout");

    overlay.classList.add("active");
    overlay.style.display = "flex";
    logoutBtn.style.display = "none";

    viewer.innerHTML = "";
    thumbBar.innerHTML = "";
    slides = [];
    current = index;

    items.forEach(({ img }, i) => {
        const div = document.createElement("div");
        div.className = "slide";
        div.style.transform = (i === index) ? "translateX(0)" : "translateX(100%)";
        const canvas = document.createElement("canvas");
        canvas.width = 900; canvas.height = 600;
        div.appendChild(canvas);
        viewer.appendChild(div);
        const ctx = canvas.getContext("2d");

        // --- Slide state ---
        const slideState = { zoom: 1, offsetX: 0, offsetY: 0 };

        const drawImage = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(slideState.offsetX, slideState.offsetY);
            ctx.scale(slideState.zoom, slideState.zoom);

            const ratio = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
            const w = img.naturalWidth * ratio;
            const h = img.naturalHeight * ratio;
            ctx.drawImage(img, (canvas.width / 2 - w / 2) / slideState.zoom, (canvas.height / 2 - h / 2) / slideState.zoom, w, h);

            // --- Single watermark ---
            ctx.font = "20px Arial";
            ctx.fillStyle = "rgba(255,255,255,0.4)";
            ctx.fillText("© 1111darsh.com", 40, 40);

            ctx.restore();
        };

        // --- Wheel zoom ---
        canvas.addEventListener("wheel", (e) => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect(),
                mouseX = e.clientX - rect.left,
                mouseY = e.clientY - rect.top,
                zoomDir = e.deltaY < 0 ? 1 : -1,
                newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, slideState.zoom + zoomDir * ZOOM_STEP));
            slideState.offsetX = mouseX - (mouseX - slideState.offsetX) * (newZoom / slideState.zoom);
            slideState.offsetY = mouseY - (mouseY - slideState.offsetY) * (newZoom / slideState.zoom);
            slideState.zoom = newZoom; drawImage();
        }, { passive: false });

        // --- Mouse drag ---
        let isDragging = false, startX, startY;
        canvas.addEventListener("mousedown", (e) => { isDragging = true; startX = e.clientX - slideState.offsetX; startY = e.clientY - slideState.offsetY; });
        canvas.addEventListener("mousemove", (e) => { if (isDragging) { slideState.offsetX = e.clientX - startX; slideState.offsetY = e.clientY - startY; drawImage(); } });
        ["mouseup", "mouseleave"].forEach(ev => canvas.addEventListener(ev, () => isDragging = false));

        let initialDistance = 0, initialZoom = 1;
        canvas.addEventListener("touchstart", (e) => {
            if (e.touches.length === 1) { isDragging = true; startX = e.touches[0].clientX - slideState.offsetX; startY = e.touches[0].clientY - slideState.offsetY; }
            else if (e.touches.length === 2) { initialDistance = getDistance(e.touches[0], e.touches[1]); initialZoom = slideState.zoom; }
        }, { passive: false });
        canvas.addEventListener("touchmove", (e) => {
            if (e.touches.length === 1 && isDragging) { slideState.offsetX = e.touches[0].clientX - startX; slideState.offsetY = e.touches[0].clientY - startY; drawImage(); }
            else if (e.touches.length === 2) { e.preventDefault(); slideState.zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, initialZoom * (getDistance(e.touches[0], e.touches[1]) / initialDistance))); drawImage(); }
        }, { passive: false });
        canvas.addEventListener("touchend", () => { isDragging = false; });

        slides.push({ div, canvas, ctx, img, slideState });

        const t = document.createElement("canvas");
        t.width = 80; t.height = 60;
        drawImageWithWatermark(t.getContext("2d"), img, t.width, t.height);
        if (i === index) t.classList.add("active");
        t.addEventListener("click", () => jumpToSlide(i));
        thumbBar.appendChild(t);

        drawImage();
    });
}

const getDistance = (t1, t2) => Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);

function closeViewer() {
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("active");
    overlay.style.display = "none";
    updateLogoutButton();
}

function showSlide(nextIndex, direction) {
    if (nextIndex < 0 || nextIndex >= slides.length) return;
    const cur = slides[current].div, next = slides[nextIndex].div;
    next.style.transition = "none";
    next.style.transform = `translateX(${direction * 100}%) rotateY(${direction * 90}deg) scale(0.8)`;
    setTimeout(() => { cur.style.transition = "transform 0.6s ease-in-out"; next.style.transition = "transform 0.6s ease-in-out"; cur.style.transform = `translateX(${-direction * 100}%) rotateY(${-direction * 90}deg) scale(0.8)`; next.style.transform = "translateX(0%) rotateY(0deg) scale(1)"; }, 50);
    current = nextIndex; updateThumbnails(nextIndex);
    const { slideState, ctx, canvas, img } = slides[nextIndex]; slideState.zoom = 1; slideState.offsetX = 0; slideState.offsetY = 0; ctx.clearRect(0, 0, canvas.width, canvas.height); drawImageWithWatermark(ctx, img, canvas.width, canvas.height);
}

function jumpToSlide(i) { if (i !== current) showSlide(i, i > current ? 1 : -1); }
function updateThumbnails(newIndex) { document.querySelectorAll("#thumbBar canvas").forEach((t, idx) => t.classList.toggle("active", idx === newIndex)); }
function showError(msg) { document.getElementById("gallery").style.display = "none"; document.getElementById("overlay").style.display = "none"; const e = document.getElementById("error"); e.innerText = msg; e.style.display = "block"; }

document.getElementById("prev").addEventListener("click", () => showSlide(current - 1, -1));
document.getElementById("next").addEventListener("click", () => showSlide(current + 1, 1));
document.getElementById("close").addEventListener("click", closeViewer);
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("dragstart", (e) => e.preventDefault());

document.getElementById("logout").addEventListener("click", async () => {
    await clearGalleryCache();
    document.cookie = "loginToken=; max-age=0; path=/;";
    updateLogoutButton();
    window.location.href = window.location.origin + window.location.pathname;
});

// --- Initialize ---
loadGallery();
