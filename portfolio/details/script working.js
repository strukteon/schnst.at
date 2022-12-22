let previewImagesDiv = document.querySelector(".preview-images");
let previewImages = document.querySelectorAll(".preview-images .image");
let imageOverlay = document.querySelector(".image-overlay");
previewImages.forEach(image => {
    image.addEventListener("click", e => {
        let boundingRect = image.getBoundingClientRect();

        if (! image.classList.contains("focused-big")) {
            image.setAttribute("data-index", Array.from(previewImagesDiv.children).indexOf(image));
            imageOverlay.classList.add("visible")
            imageOverlay.style.zIndex = "10";
            imageOverlay.appendChild(image);
            image.style.zIndex = "10";
            image.style.position = "absolute";
            image.style.top = boundingRect.top + "px";
            image.style.left = boundingRect.left + "px";
            image.style.setProperty("--zoom-factor", (window.innerHeight * .9) / boundingRect.height)
            setTimeout(() => image.classList.add("focused-big"), 10);
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