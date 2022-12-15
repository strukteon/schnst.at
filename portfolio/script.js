let screenTransitionLink = document.querySelectorAll("a.screen-transition");

screenTransitionLink.forEach(l => {
    l.addEventListener("click", e => {
        e.preventDefault();

        let shape = new mojs.Shape({
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
        });
        l.style.position = "relative";
        l.style.zIndex = "100";
        document.querySelector(".anim-wrapper").style.zIndex = "99";
        document.querySelector(".mouse-circle").style.display = "none";
        shape.play();
    })
});