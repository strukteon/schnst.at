let previewImagesDiv = document.querySelector(".preview-images");
let previewImages = document.querySelectorAll(".preview-images .image");
let imageOverlay = document.querySelector(".image-overlay");
imageOverlay.childNodes.forEach(c => c.addEventListener("click", e => e.stopPropagation()));

let previewImagesClones = [];
let visible_index = -1;
let [btn_prev, btn_next] = document.querySelectorAll(".image-overlay button");

previewImages.forEach(image => {
    let clone = image.cloneNode(true);
    imageOverlay.appendChild(clone);
    previewImagesClones.push(clone);

    clone.style.setProperty("--device-scale", window.innerHeight * 0.9 / Number(clone.style.getPropertyValue("--device-height").split("px")[0]))
    clone.addEventListener("click", e => e.stopPropagation())

    image.addEventListener("click", e => {
        open_image_clone(clone);
    });
});

addEventListener("resize", () => {
    previewImagesClones.forEach(c => 
        c.style.setProperty("--device-scale",
          window.innerHeight * 0.9 / 
          Number(c.style.getPropertyValue("--device-height") .split("px")[0])))
});

function open_image_clone(imgc) {
    imageOverlay.classList.add("visible");
    previewImagesClones.forEach(n => n.classList.remove("is-visible"));
    imgc.classList.add("is-visible");
    visible_index = previewImagesClones.indexOf(imgc);
    btn_prev.disabled = visible_index == 0;
    btn_next.disabled = visible_index == previewImagesClones.length - 1;
}
imageOverlay.addEventListener("click", () => {
    imageOverlay.classList.remove("visible");
})

btn_prev.addEventListener("click", e => open_image_clone(previewImagesClones[visible_index - 1]));
btn_next.addEventListener("click", e => open_image_clone(previewImagesClones[visible_index + 1]));