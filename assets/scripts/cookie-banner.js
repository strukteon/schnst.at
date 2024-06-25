document.querySelector(".cookie-banner .cookie-buttons .decline").addEventListener("click", () => {
    document.querySelector(".cookie-banner").style.visibility = "hidden";
    localStorage.setItem("cookie_accepted", "false");
    mojs.stagger( mojs.ShapeSwirl )({
        parent: ".cookie-anim-wrapper",
        quantifier: 20,
        x:        { 0: "rand(-100, 100)", },
        y:        { "stagger(-100, 10)": "rand(-200, 200)"},
        fill: "#111",
        duration: 2000,
    }).play();

    new mojs.Html({
        // selector for HTMLElement
        el: '.cookie-anim-wrapper .half1',
        // animate translateX from 0 to 200 pixels
        // each delta object can have entire set of tween properties and callbacks
        // x: { 0: -200 },
        // y: { 0: 200, duration: 2000 },
        rotateZ: { 0: -20 },
        x: { 0: -25 },
        y: { 0: 300, delay: 600, duration: 1000, easing: "cubic.in" },
        easing: "quint.inout",
        duration: 200,
        // static properties
    }).play()

    new mojs.Html({
        // selector for HTMLElement
        el: '.cookie-anim-wrapper .half2',
        // animate translateX from 0 to 200 pixels
        // each delta object can have entire set of tween properties and callbacks
        // x: { 0: -200 },
        // y: { 0: 200, duration: 2000 },
        rotateZ: { 0: 20 },
        x: { 0: 25 },
        y: { 0: 300, delay: 600, duration: 1000, easing: "cubic.in" },
        easing: "quint.inout",
        duration: 200,
        // static properties
    }).play()


}, 1000)


document.querySelector(".cookie-banner .cookie-buttons .accept").addEventListener("click", () => {
    document.querySelector(".cookie-banner-wrapper").classList.add("hidden");
    document.dispatchEvent(new Event("cookie-accept"));
    localStorage.setItem("cookie_accepted", "true");
}, 1000);


document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("cookie_accepted")) {
        document.dispatchEvent(new Event("cookie-accept"));
        return;
    }

    document.querySelector(".cookie-banner-wrapper").classList.remove("hidden");

})