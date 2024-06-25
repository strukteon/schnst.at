document.addEventListener("cookie-accept", () => {
    console.log("loading ga")
    let script = document.createElement('script');
    script.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-DHXP6DC9ZJ');
    };
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-DHXP6DC9ZJ";

    document.head.appendChild(script); //or something of the likes
    console.log(script)
})