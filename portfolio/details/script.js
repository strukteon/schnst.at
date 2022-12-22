let previewImagesDiv = document.querySelector(".preview-images");
let previewImages = document.querySelectorAll(".preview-images .image");
previewImages.forEach(image => {
    image.addEventListener("click", e => {
        let boundingRect = image.getBoundingClientRect();

        if (! image.classList.contains("focused-big")) {
            image.setAttribute("data-index", Array.from(previewImagesDiv.children).indexOf(image));
            anim_wrapper.classList.add("overlay")
            anim_wrapper.style.zIndex = "10";
            anim_wrapper.appendChild(image);
            image.style.zIndex = "10";
            image.style.position = "absolute";
            image.style.top = boundingRect.top + "px";
            image.style.left = boundingRect.left + "px";
            image.style.setProperty("--zoom-factor", (window.innerHeight * .9) / boundingRect.height)
            setTimeout(() => image.classList.add("focused-big"), 10);
        } else {
            image.classList.remove("focused-big");
            anim_wrapper.classList.remove("overlay");
            setTimeout(() => {
                console.log(Number(image.getAttribute("data-index")))
                previewImagesDiv.insertBefore(image, previewImagesDiv.childNodes[Number(image.getAttribute("data-index"))]);
                image.style.position = null;
                image.style.top = null;
                image.style.left = null;
                image.style.zIndex = null;
                anim_wrapper.style.zIndex = null;
            }, 500);
        }
    })
})
/*VANTA.NET({
    el: "#your-element-selector",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 100.00,
    minWidth: 100.00,
    scale: 1.0,
    scaleMobile: 1.00,
    color: 0x343434,
    backgroundColor: 0x111111,
    maxDistance: 14.00,
    spacing: 10.00,
    showDots: false
  })/* */
