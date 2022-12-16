let previewImagesDiv = document.querySelector(".preview-images");
let previewImages = document.querySelectorAll(".preview-images .image");
previewImages.forEach(image => {
    image.addEventListener("click", e => {
        let boundingRect = image.getBoundingClientRect();
        console.log(boundingRect)
        anim_wrapper.appendChild(image);
        let scale = 2;
       /* const html = new mojs.Html({
            el: image,
            x: {[boundingRect.x + "px"]: (window.innerWidth / 2 - boundingRect.width / 2) + "px"},
            y: {[boundingRect.y + "px"]: (window.innerHeight / 2 - boundingRect.height / 2) + "px"},
            scale: {1: 2}
        })*/
        image.style.position = "absolute";
        image.style.top = boundingRect.top + 28 + "px";
        image.style.left = boundingRect.left + 32 + "px";
        anim_wrapper.style.zIndex = "10";
//        image.style.transform = "translateX(" + boundingRect.top + 28 + "px" +") translateY(" +boundingRect.left + 32 + "px" + ") scale(2)";

  //      image.style.transform = "translateX(calc(50vh - 50%)) translateY(calc(50vw - 50%)) scale(2)";
        setTimeout(() =>     image.classList.add("focused-big"), 200        )
  anim_wrapper.style.backdropFilter = "blur(4px)";
       // html.play()
    })
    console.log(image)
})