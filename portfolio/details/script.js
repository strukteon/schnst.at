let previewImagesDiv = document.querySelector(".preview-images");
let previewImages = document.querySelectorAll(".preview-images .image");
let imageOverlay = document.querySelector(".image-overlay");

let previewImagesClones = []

previewImages.forEach(image => {
    let clone = image.cloneNode(true);
    previewImagesClones.push(clone)
    let maxHeight = 0.9;
    image.addEventListener("click", e => {
        let boundingRect = image.getBoundingClientRect();

        
        document.body.appendChild(clone);
        setImageClonePos(image, clone, 0);
        clone.style.position = "fixed";

        return;
        if (! image.classList.contains("focused-big")) {
            
        } else {
            image.classList.remove("focused-big");
            anim_wrapper.classList.remove("visible");
            setTimeout(() => {
                console.log(Number(image.getAttribute("data-index")))
                previewImagesDiv.insertBefore(image, previewImagesDiv.childNodes[Number(image.getAttribute("data-index"))]);
                image.style.position = null;
                image.style.top = null;
                image.style.left = null;
                image.style.zIndex = null;
                imageOverlay.style.zIndex = null;
            }, 500);
        }
    })
})


let tween = (start, end, progress) => start + (end - start) * progress;

function setImageClonePos(orig, clone, progress) {
    let boundingRect = orig.getBoundingClientRect();
    let max_scale = (window.innerHeight * .9) / boundingRect.height;
    clone.style.top = tween(boundingRect.top, window.innerHeight / 2 - boundingRect.height * max_scale / 2)  + "px";
    clone.style.left = boundingRect.left + "px";
}