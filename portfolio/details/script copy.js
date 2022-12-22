let previewImagesDiv = document.querySelector(".preview-images");
let previewImages = document.querySelectorAll(".preview-images .image");
let imageOverlay = document.querySelector(".image-overlay");
let imagesAnims = [];

let onImageClick = (image) => (e) => {
    let boundingRect = image.getBoundingClientRect();
    set_image_overlay_open(! image.classList.contains("focused-big"));

    if (! image.classList.contains("focused-big")) {
        imagesAnims[Number(image.getAttribute("data-index"))].play();
        console.log("Start anim")
        image.classList.add("focused-big");
        /*image.style.zIndex = "10";
        image.style.position = "absolute";
        image.style.top = boundingRect.top + "px";
        image.style.left = boundingRect.left + "px";
        image.style.setProperty("--zoom-factor", (window.innerHeight * .9) / boundingRect.height)*/
    } else {
        image.classList.remove("focused-big");
        imageOverlay.classList.remove("visible");
        imagesAnims[Number(image.getAttribute("data-index"))].playBackward();
        setTimeout(() => {
            console.log(Number(image.getAttribute("data-index")))
            
            /*image.style.position = null;
            image.style.top = null;
            image.style.left = null;
            image.style.zIndex = null;*/
        }, 500);
    }
}

previewImages.forEach(image => {
    let boundingRect = image.getBoundingClientRect();
    image.setAttribute("data-index", Array.from(previewImagesDiv.children).indexOf(image));
    image.setAttribute("data-top", boundingRect.top);
    image.setAttribute("data-left", boundingRect.left);
    image.setAttribute("data-height", boundingRect.height);
    image.addEventListener("click", onImageClick(image));
    let fin_scale = () => (window.innerHeight * .9) / boundingRect.height;
    let start_left = () => boundingRect.left;
    let fin_left = () => (window.innerWidth / 2 - window.innerHeight * .9 / 2);
    console.log(fin_left())
    let tween = (start, end, progress) => start + (end - start) * progress;
    imagesAnims.push(new mojs.Html({
        el: image,
        duration: 1000,
        onStart(isForward) {
            if (isForward) {
                image.classList.add("focused-big");
                image.style.zIndex = 20;
                image.style.top = boundingRect.top + "px";
                image.style.left = start_left() + "px";
                image.style.position = "absolute";
                document.body.appendChild(image);
            } else {
                image.classList.remove("focused-big");
                image.style.zIndex = null;
                previewImagesDiv.insertBefore(image, previewImagesDiv.childNodes[Number(image.getAttribute("data-index"))]);
            }
        },
        onUpdate(ep, p) {
            image.style.left = tween(boundingRect.left, fin_left(), ep) + "px"
            image.style.transform = `scale(${tween(1, fin_scale(), ep)})`
        },
        onComplete(isForward) {
            if (isForward) {
               // imageOverlay.appendChild(image);
            } else {
            }
        }
    }))
})

function set_image_overlay_open(is_open) {
    if (is_open) {
        imageOverlay.classList.add("visible")
        imageOverlay.style.zIndex = "10";
    } else {
        imageOverlay.classList.remove("visible");
        setTimeout(() => {
            imageOverlay.style.zIndex = null;
        }, 500);
    }
}