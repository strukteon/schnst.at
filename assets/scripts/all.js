let anim_wrapper = document.querySelector(".anim-wrapper");

let mouse_x = 0,
    mouse_y = 0,
    circle_radius = 6,
    mouse_circle = document.querySelector(".mouse-circle");

document.onmousemove = (e) => {
    mouse_x = e.clientX;
    mouse_y = e.clientY;
}

let delay = 6,
    new_mouse_x = 0,
    new_mouse_y = 0;

function delayMouseFollow() {
    requestAnimationFrame(delayMouseFollow);

    new_mouse_x += (mouse_x - new_mouse_x) / delay;
    new_mouse_y += (mouse_y - new_mouse_y) / delay;

    mouse_circle.style.top = new_mouse_y - circle_radius + 'px';
    mouse_circle.style.left = new_mouse_x - circle_radius + 'px';
}

delayMouseFollow();

// mouse click effect
document.addEventListener('mouseup', function (e) {
    new mojs.Shape({
        parent: anim_wrapper,
        left: 0,
        top: 0,
        x: e.clientX,
        y: e.clientY,
        fill: getComputedStyle(mouse_circle).backgroundColor === "rgb(17, 17, 17)" ?
            "rgba(16, 16, 16, .3)" : "rgba(238, 238, 238, .3)",
        opacity: {.5: 0},
        radius: {6: 40},
        onComplete: function () {
            try {
                anim_wrapper.removeChild(this.el);
            } catch (e) {
                console.log(e)
            }
        }
    }).play();
});

let links = document.querySelectorAll("a:not(.no-hover-effect)");

links.forEach(l => {
    let hoverElem = document.createElement("span");
    hoverElem.innerText = l.innerText;
    hoverElem.classList.add("hover-elem");
    l.appendChild(hoverElem);
    let hoverElemAnim = new mojs.Html({
        el: hoverElem,
        top: {"100%": 0},
        isYoyo: true,
        onStart(isForward) {
            this.easing = isForward ? "bounce.out" : "linear.none";
        }
    })
    l.addEventListener("mouseenter", e => {
        hoverElemAnim.play();
    });
    l.addEventListener("mouseleave", e => {
        hoverElemAnim.playBackward();
    });
});

let switchScreenLink = document.querySelectorAll("a.switch-screen");

switchScreenLink.forEach(l => {
    l.addEventListener("click", e => {
        e.preventDefault();

        new mojs.Shape({
            parent: anim_wrapper,
            left: 0,
            top: 0,
            x: e.clientX,
            y: e.clientY,
            fill: "rgba(16, 16, 16, 1)",
            radius: {6: 2000},
            easing: 'bounce.out',
            duration: 1000,
            onComplete: function () {
                window.location.href = l.href;
            }
        }).play();
    })
});

[...document.querySelectorAll("a[href^='mailto:']")]
    .forEach(v => v.setAttribute("href", "mailto:" +
        v.getAttribute("href").split(":")[1]
        .split("").map(x => String.fromCharCode(x.charCodeAt() + 2)).join("")))