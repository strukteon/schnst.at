let previewImagesDiv = document.querySelector(".preview-images");
let previewImages = document.querySelectorAll(".preview-images .image");
let imageOverlay = document.querySelector(".image-overlay");
imageOverlay.childNodes.forEach(c => c.addEventListener("click", e => e.stopPropagation()));

let previewImagesClones = [];
let visible_index = -1;
let [btn_prev, btn_next] = document.querySelectorAll(".image-overlay button");
document.body.style.setProperty("--window-width", String(window.innerWidth));

previewImages.forEach(image => {
    let clone = image.cloneNode(true);
    imageOverlay.appendChild(clone);
    previewImagesClones.push(clone);

    clone.style.setProperty("--device-scale", calc_clone_scale(clone))
    clone.addEventListener("click", e => e.stopPropagation())

    image.addEventListener("click", e => {
        open_image_clone(clone);
    });
});

addEventListener("resize", () => {
    document.body.style.setProperty("--window-width", String(window.innerWidth));
    previewImagesClones.forEach(c => 
        c.style.setProperty("--device-scale", calc_clone_scale(c)))
});

function open_image_clone(imgc) {
    imageOverlay.classList.add("visible");
    previewImagesClones.forEach(n => n.classList.remove("is-visible"));
    imgc.classList.add("is-visible");
    visible_index = previewImagesClones.indexOf(imgc);
    btn_prev.disabled = visible_index == 0;
    btn_next.disabled = visible_index == previewImagesClones.length - 1;
}
function calc_clone_scale(clone) {
    let [h, w] = [Number(clone.style.getPropertyValue("--device-height") .split("px")[0]), Number(clone.style.getPropertyValue("--device-width") .split("px")[0])];
    let [h_max, w_max] = [0.9, 0.7];
    let h_scale = window.innerHeight * h_max / h;
    let w_scale = window.innerWidth * w_max /  w;
    console.log({h_scale, w_scale, h_max, w_max})
    if (h * w_scale > window.innerHeight * h_max) return h_scale;
    return w_scale;

}
imageOverlay.addEventListener("click", () => {
    imageOverlay.classList.remove("visible");
})

btn_prev.addEventListener("click", e => open_image_clone(previewImagesClones[visible_index - 1]));
btn_next.addEventListener("click", e => open_image_clone(previewImagesClones[visible_index + 1]));