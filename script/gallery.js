let slides = [];
let current = 0;
let urls = [];
let items = []; 
const MAX_ZOOM = 3;
const MIN_ZOOM = 0.5;
const ZOOM_STEP = 0.2;

function showLoader() {
    document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

async function preloadImages(urlList) {

    const loaders = urlList.map(async (url) => {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load " + url);
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const img = new Image();
        img.src = blobUrl;

        // Wait for decode (fallback to onload where not supported)
        if (img.decode) {
            await img.decode();
        } else {
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
        }

        return { img, blobUrl };
    });

    return Promise.all(loaders);
}

async function loadGallery() {
    showLoader()
    const params = new URLSearchParams(window.location.search);
    const loginParem = params.get("login");
    if (loginParem) {

        localStorage.setItem("loginToken", loginParem);
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
    }
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
        console.log("Login token:", loginToken);

      } else {
            hideLoader(); // Hide loader when done
            showError("🔒 This gallery is protected by Darshan. You need a valid URL with a token to view the images."); return;
    
      }
    
    try {
        const res = await fetch("https://verbose-spoon-x5rw67g4v7v525qp-8080.app.github.dev/signed-list?login=" + loginToken);
        if (!res.ok) {
            hideLoader(); // Hide loader when done
            showError("Invalid Token \n\n"+ loginToken + "\n\n\n\n🚫 Access Denied! This gallery is protected by Darshan. Only users with a valid token URL can see the images."); return;
        }
        urls = await res.json();
        if (!urls || urls.length === 0) {
            hideLoader(); // Hide loader when done
            showError("⚠️ No images."); return;
        }


        // ✅ Download each image ONCE
        items = await preloadImages(urls);

        // Build grid from already-loaded images
        const gallery = document.getElementById("gallery");
        items.forEach(({ img }, i) => {
            const canvas = document.createElement("canvas");
            canvas.width = 200; canvas.height = 150;
            gallery.appendChild(canvas);
            const ctx = canvas.getContext("2d");
            drawImageOnCanvas(ctx, img, canvas.width, canvas.height, 1);
            // watermark
            ctx.font = "12px Arial";
            ctx.fillStyle="rgba(255,255,255,0.4)";
          
            canvas.addEventListener("click", () => openViewer(i));
        });
        hideLoader(); // Hide loader when done
    } catch (e) {
        console.error(e);
        hideLoader(); // Hide loader when done
        localStorage.removeItem("loginToken")
        showError("❌ This gallery is protected. To access this you need to contact the administrator.");
    }
}

function drawImageOnCanvas(ctx, img, cw, ch, zoom) {
    ctx.clearRect(0, 0, cw, ch);
    const ratio = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * ratio * zoom;
    const h = img.naturalHeight * ratio * zoom;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;
    ctx.drawImage(img, x, y, w, h);
    ctx.font="20px Arial"; 
    ctx.fillStyle="rgba(255,255,255,0.4)";
    ctx.fillText("© 1111darsh.com",40,40);
}

function openViewer(index) {
    const overlay = document.getElementById("overlay");
    const viewer = document.getElementById("viewer");
    const thumbBar = document.getElementById("thumbBar");

    overlay.style.display = "flex";
    viewer.innerHTML = "";
    thumbBar.innerHTML = "";
    slides = [];
    current = index;

    // Build slides using the same Image objects (no extra downloads)
    items.forEach(({ img }, i) => {
        const div = document.createElement("div");
        div.className = "slide";
        div.style.transform = (i === index) ? "translateX(0)" : "translateX(100%)";

        const canvas = document.createElement("canvas");
        canvas.width = 900;
        canvas.height = 600;
        div.appendChild(canvas);
        viewer.appendChild(div);

        const ctx = canvas.getContext("2d");
        let zoom = 1;
        drawImageOnCanvas(ctx, img, canvas.width, canvas.height, zoom);

        // Wheel zoom
        canvas.addEventListener("wheel", (e) => {
            e.preventDefault();
            zoom += e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
            zoom = Math.max(MIN_ZOOM, Math.min(zoom, MAX_ZOOM));
            drawImageOnCanvas(ctx, img, canvas.width, canvas.height, zoom);
        }, { passive: false });

        // Pinch zoom
        let startDist = null;
        canvas.addEventListener("touchstart", (e) => {
            if (e.touches.length === 2) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                startDist = Math.hypot(dx, dy);
            }
        }, { passive: true });

        canvas.addEventListener("touchmove", (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const dist = Math.hypot(dx, dy);
                if (startDist) {
                    const scale = dist / startDist;
                    zoom *= scale;
                    zoom = Math.max(MIN_ZOOM, Math.min(zoom, MAX_ZOOM));
                    drawImageOnCanvas(ctx, img, canvas.width, canvas.height, zoom);
                }
                startDist = dist;
            }
        }, { passive: false });

        canvas.addEventListener("touchend", () => { startDist = null; });

        slides.push({ div, canvas, ctx, img, zoom });

        // Thumbnails (use canvas to avoid extra <img src> network requests)
        const t = document.createElement("canvas");
        t.width = 80; t.height = 60;
        const tctx = t.getContext("2d");
        drawImageOnCanvas(tctx, img, t.width, t.height, 1);
        if (i === index) t.classList.add("active");
        t.addEventListener("click", () => jumpToSlide(i));
        thumbBar.appendChild(t);
    });

    addSwipeSupport(viewer);
}

function closeViewer() {
    document.getElementById("overlay").style.display = "none";
}

function showSlide(nextIndex, direction) {
    if (nextIndex < 0 || nextIndex >= slides.length) return;

    const currentSlide = slides[current].div;
    const nextSlide = slides[nextIndex].div;

    // Keep original animation: translateX + rotateY
    nextSlide.style.transition = "none";
    nextSlide.style.transform = `translateX(${direction * 100}%) rotateY(${-direction * 90}deg)`;

    setTimeout(() => {
        currentSlide.style.transition = "transform 1s ease-in-out";
        nextSlide.style.transition = "transform 1s ease-in-out";
        currentSlide.style.transform = `translateX(${-direction * 100}%) rotateY(${direction * 90}deg)`;
        nextSlide.style.transform = "translateX(0%) rotateY(0deg)";
    }, 50);

    current = nextIndex;
    updateThumbnails(nextIndex);
}

function jumpToSlide(i) {
    if (i === current) return;
    const direction = i > current ? 1 : -1;
    showSlide(i, direction);
}

function updateThumbnails(newIndex) {
    document.querySelectorAll("#thumbBar canvas").forEach((thumb, idx) => {
        thumb.classList.toggle("active", idx === newIndex);
    });
}

function addSwipeSupport(element) {
    let startX = 0;
    element.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1) startX = e.touches[0].clientX;
    }, { passive: true });

    element.addEventListener("touchend", (e) => {
        if (e.changedTouches.length === 1) {
            const endX = e.changedTouches[0].clientX;
            const diff = endX - startX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) showSlide(current - 1, -1);
                else showSlide(current + 1, 1);
            }
        }
    }, { passive: true });
}

function showError(msg) {
    document.getElementById("gallery").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    const errorDiv = document.getElementById("error");
    errorDiv.innerText = msg;
    errorDiv.style.display = "block";
}

// Buttons & keys
document.getElementById("prev").addEventListener("click", () => showSlide(current - 1, -1));
document.getElementById("next").addEventListener("click", () => showSlide(current + 1, 1));
document.getElementById("close").addEventListener("click", closeViewer);
document.addEventListener("keydown", (e) => {
    if (document.getElementById("overlay").style.display === "flex") {
        if (e.key === "ArrowRight") showSlide(current + 1, 1);
        if (e.key === "ArrowLeft") showSlide(current - 1, -1);
        if (e.key === "Escape") closeViewer();
    }
});

// Block default saving/dragging
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("dragstart", (e) => e.preventDefault());

// Free blob URLs on unload (optional)
window.addEventListener("beforeunload", () => {
    items.forEach(({ blobUrl }) => URL.revokeObjectURL(blobUrl));
});


    loadGallery();
