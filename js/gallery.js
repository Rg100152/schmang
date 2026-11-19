/* Campus Gallery — lightbox and filters */
(function () {
    "use strict";
    const grid = document.getElementById("galleryGrid");
    if (!grid) return;
    const allItems = Array.from(grid.querySelectorAll(".gallery-item"));
    const filters = Array.from(document.querySelectorAll(".gallery-filter"));
    const box = document.getElementById("lightbox");
    const image = document.getElementById("lbImage");
    let visible = allItems.slice();
    let current = 0;

    function applyFilter(key) {
        allItems.forEach(item => { item.hidden = key !== "all" && item.dataset.category !== key; });
        visible = allItems.filter(item => !item.hidden);
        filters.forEach(btn => btn.classList.toggle("active", btn.dataset.filter === key));
    }
    filters.forEach(btn => btn.addEventListener("click", () => applyFilter(btn.dataset.filter)));

    function render() {
        const item = visible[current];
        if (!item) return;
        image.src = item.dataset.full;
        image.alt = item.querySelector("img").alt;
        document.getElementById("lbTitle").textContent = item.dataset.title;
        document.getElementById("lbCategory").textContent = item.dataset.categoryLabel + " Collection";
        document.getElementById("lbCounter").textContent = (current + 1) + " / " + visible.length;
        document.getElementById("lbOriginal").href = item.dataset.full;
    }
    function openBox(item) {
        const at = visible.indexOf(item);
        current = at >= 0 ? at : 0;
        render();
        box.hidden = false;
        document.body.style.overflow = "hidden";
        document.getElementById("lbClose").focus({ preventScroll: true });
    }
    function closeBox() {
        box.hidden = true;
        document.body.style.overflow = "";
        const item = visible[current];
        if (item) item.focus({ preventScroll: true });
    }
    function step(dir) {
        if (!visible.length) return;
        current = (current + dir + visible.length) % visible.length;
        render();
    }
    allItems.forEach(item => item.addEventListener("click", () => openBox(item)));
    document.getElementById("lbClose").addEventListener("click", closeBox);
    document.getElementById("lbPrev").addEventListener("click", () => step(-1));
    document.getElementById("lbNext").addEventListener("click", () => step(1));
    box.addEventListener("click", e => { if (e.target === box) closeBox(); });
    document.addEventListener("keydown", e => {
        if (box.hidden) return;
        if (e.key === "Escape") closeBox();
        else if (e.key === "ArrowRight") step(1);
        else if (e.key === "ArrowLeft") step(-1);
    });
})();
