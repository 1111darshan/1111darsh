let slides = [], current = 0, urls = [], items = [];
const MIN_ZOOM = 0.5, MAX_ZOOM = 4, ZOOM_STEP = 0.1;
var imgerr= []

const BACKENDHOST="https://gallery.1111darsh.com"
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
        if (name === "gallery-cache") await caches.delete(name);
    }
}

// --- Cookie helper ---
function getCookieByName(name) {
    const nameEQ = name + "=", cookies = document.cookie.split(';');
    for (let c of cookies) {
        c = c.trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

// --- Draw image with watermark ---
function drawImageWithWatermark(ctx, img, cw, ch, zoomLevel = 1, offsetX = 0, offsetY = 0) {
    ctx.clearRect(0, 0, cw, ch);
    const ratio = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * ratio * zoomLevel;
    const h = img.naturalHeight * ratio * zoomLevel;
    ctx.drawImage(img, (cw - w) / 2 + offsetX, (ch - h) / 2 + offsetY, w, h);

    ctx.font = "20px Arial";
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fillText("© 1111darsh.com", 40, 40);
}

// --- Preload images ---
async function preloadImagesInBatches(urlList, batchSize = 3) {
    let done = 0;
    const gallery = document.getElementById("gallery");
    const results = [];  
    for (let i = 0; i < urlList.length; i += batchSize) {
        const batch = urlList.slice(i, i + batchSize);
        const loadedBatch = await Promise.all(batch.map(async (url) => {
            const res = await fetchWithCache(url);
            if (!res?.ok) throw new Error("Failed to load " + url);
            const blobUrl = URL.createObjectURL(await res.blob());
            const img = new Image();
            img.src = blobUrl;

            try {
                if (img.decode) await img.decode();
                else await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                });
            } catch (err) {
                imgerr.push(getCacheKey(url));
                console.error("Error decoding image:", err);
            }

            updateProgress(++done, urlList.length);

            // Add image to items array and append thumbnail immediately
            items.push({ img, blobUrl });
            const canvas = document.createElement("canvas");
            canvas.width = window.innerWidth > 600 ? 250 : 200;
            canvas.height = window.innerWidth > 600 ? 180 : 150;
            gallery.appendChild(canvas);
            const ctx = canvas.getContext("2d");
            drawImageWithWatermark(ctx, img, canvas.width, canvas.height);
            canvas.addEventListener("click", () => openViewer(items.length - 1));

            return { img, blobUrl };
        }));

        results.push(...loadedBatch);
    }

    return results;
}

// --- Load gallery ---
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
        const res = await fetch(BACKENDHOST+"/signed-list?login=" + loginToken);
        if (!res.ok) return (hideLoader(), showError("🚫  Oops! Your access token has expired.\n\n 🔑 Please reach out to Darshan or an authorized user to get a fresh URL.\n\n Once you have it, you can continue exploring the gallery!\n\nInvalid token: " + loginToken));
        urls = await res.json();
        if (!urls?.length) return (hideLoader(), showError("⚠️ No images."));

        // ✅ Batch preload images
        items = await preloadImagesInBatches(urls, 3);

        console.log(imgerr);

        // Build gallery thumbnails (DOM)
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
        canvas.width = viewer.clientWidth;
        canvas.height = viewer.clientHeight;
        div.appendChild(canvas);
        viewer.appendChild(div);
        const ctx = canvas.getContext("2d");

        const slideState = { zoom: 1, offsetX: 0, offsetY: 0 };

        const drawImage = () => {
            const ratio = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
            const w = img.naturalWidth * ratio * slideState.zoom;
            const h = img.naturalHeight * ratio * slideState.zoom;
            const offsetX = slideState.offsetX;
            const offsetY = slideState.offsetY;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, (canvas.width - w) / 2 + offsetX, (canvas.height - h) / 2 + offsetY, w, h);

            ctx.font = "20px Arial";
            ctx.fillStyle = "rgba(255,255,255,0.4)";
            ctx.fillText("© 1111darsh.com", 40, 40);
        };

        // --- Wheel zoom ---
        canvas.addEventListener("wheel", e => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect(),
                  mouseX = e.clientX - rect.left,
                  mouseY = e.clientY - rect.top,
                  zoomDir = e.deltaY < 0 ? 1 : -1,
                  newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, slideState.zoom + zoomDir * ZOOM_STEP));

            slideState.offsetX = mouseX - (mouseX - slideState.offsetX) * (newZoom / slideState.zoom);
            slideState.offsetY = mouseY - (mouseY - slideState.offsetY) * (newZoom / slideState.zoom);
            slideState.zoom = newZoom;
            drawImage();
        }, { passive: false });

        // --- Touch / Drag for mobile ---
        let isDragging = false, startX, startY;
        let initialDistance = 0, initialZoom = 1;

        canvas.addEventListener("touchstart", e => {
            if (e.touches.length === 1) {
                isDragging = true;
                startX = e.touches[0].clientX - slideState.offsetX;
                startY = e.touches[0].clientY - slideState.offsetY;
            } else if (e.touches.length === 2) {
                initialDistance = Math.hypot(e.touches[1].clientX - e.touches[0].clientX,
                                             e.touches[1].clientY - e.touches[0].clientY);
                initialZoom = slideState.zoom;
            }
        }, { passive: false });

        canvas.addEventListener("touchmove", e => {
            if (e.touches.length === 1 && isDragging) {
                slideState.offsetX = e.touches[0].clientX - startX;
                slideState.offsetY = e.touches[0].clientY - startY;
                drawImage();
            } else if (e.touches.length === 2) {
                e.preventDefault();
                const dist = Math.hypot(e.touches[1].clientX - e.touches[0].clientX,
                                        e.touches[1].clientY - e.touches[0].clientY);
                slideState.zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, initialZoom * dist / initialDistance));
                drawImage();
            }
        }, { passive: false });

        canvas.addEventListener("touchend", () => { isDragging = false; });

        slides.push({ div, canvas, ctx, img, slideState });

        // Thumbnail
        const t = document.createElement("canvas");
        t.width = 80; t.height = 60;
        drawImageWithWatermark(t.getContext("2d"), img, t.width, t.height);
        if (i === index) t.classList.add("active");
        t.addEventListener("click", () => jumpToSlide(i));
        thumbBar.appendChild(t);

        drawImage();
    });
}

function closeViewer() { 
    document.getElementById("overlay").classList.remove("active"); 
    document.getElementById("overlay").style.display = "none"; 
    updateLogoutButton(); 
}
function showSlide(nextIndex, direction) {
    if (nextIndex < 0 || nextIndex >= slides.length) return;
    const cur = slides[current].div, next = slides[nextIndex].div;
    next.style.transition = "none";
    next.style.transform = `translateX(${direction*100}%) scale(0.8)`;
    setTimeout(() => {
        cur.style.transition = "transform 0.6s ease-in-out";
        next.style.transition = "transform 0.6s ease-in-out";
        cur.style.transform = `translateX(${-direction*100}%) scale(0.8)`;
        next.style.transform = "translateX(0%) scale(1)";
    }, 50);
    current = nextIndex; updateThumbnails(nextIndex);
    const { slideState, ctx, canvas, img } = slides[nextIndex]; 
    slideState.zoom = 1; slideState.offsetX = 0; slideState.offsetY = 0; 
    drawImageWithWatermark(ctx, img, canvas.width, canvas.height);
}
function jumpToSlide(i) { if (i!==current) showSlide(i,i>current?1:-1); }
function updateThumbnails(newIndex) { document.querySelectorAll("#thumbBar canvas").forEach((t,idx)=>t.classList.toggle("active", idx===newIndex)); }
function showError(msg) { 
    document.getElementById("gallery").style.display="none";
    document.getElementById("overlay").style.display="none";
    const e = document.getElementById("error"); e.innerText=msg; e.style.display="block";
}

document.getElementById("prev").addEventListener("click", () => showSlide(current-1,-1));
document.getElementById("next").addEventListener("click", () => showSlide(current+1,1));
document.getElementById("close").addEventListener("click", closeViewer);
document.addEventListener("contextmenu", e=>e.preventDefault());
document.addEventListener("dragstart", e=>e.preventDefault());

document.getElementById("logout").addEventListener("click", async () => {
    await clearGalleryCache();
    document.cookie = "loginToken=; max-age=0; path=/;";
    updateLogoutButton();
    window.location.href = window.location.origin + window.location.pathname;
});

window.addEventListener("resize", () => {
    slides.forEach(s => {
        s.canvas.width = s.canvas.parentElement.clientWidth;
        s.canvas.height = s.canvas.parentElement.clientHeight;
        drawImageWithWatermark(s.ctx, s.img, s.canvas.width, s.canvas.height, s.slideState.zoom, s.slideState.offsetX, s.slideState.offsetY);
    });
});

// --- Initialize ---
loadGallery();