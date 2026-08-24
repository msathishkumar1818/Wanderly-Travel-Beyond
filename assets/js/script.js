// <!-- ========================================================= -->
//     <!-- JAVASCRIPT -->
//     <!-- ========================================================= -->

    


        /* =========================================================
           INITIALIZE ICONS
        ========================================================= */

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }


        /* Keep the page usable even if a third-party resource is slow. */
        function hidePageLoader() {
            const pageLoader = document.getElementById("pageLoader");

            if (pageLoader) {
                pageLoader.classList.add("loader-hidden");
                pageLoader.setAttribute("aria-hidden", "true");
            }
        }

        function installScrollToTop() {
            if (document.getElementById("scrollToTop")) return;

            const scrollToTop = document.createElement("button");
            scrollToTop.id = "scrollToTop";
            scrollToTop.type = "button";
            scrollToTop.className = "scroll-to-top";
            scrollToTop.setAttribute("aria-label", "Back to top");
            scrollToTop.setAttribute("title", "Back to top");
            scrollToTop.innerHTML = "&#8593;";
            document.body.appendChild(scrollToTop);

            const toggleScrollButton = () => {
                scrollToTop.classList.toggle("is-visible", window.scrollY > 360);
            };

            window.addEventListener("scroll", toggleScrollButton, { passive: true });
            toggleScrollButton();
            scrollToTop.addEventListener("click", () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }

        function setActiveNavigation() {
            const currentPage = window.location.pathname.split("/").pop() || "index.html";
            const isHomePage = currentPage === "index.html" || currentPage === "home2.html";

            document.querySelectorAll(".nav-link").forEach(link => {
                link.classList.remove("active");
                link.removeAttribute("aria-current");

                if (link.tagName === "A") {
                    const linkPage = new URL(link.href, window.location.href).pathname.split("/").pop();
                    if (linkPage === currentPage) {
                        link.classList.add("active");
                        link.setAttribute("aria-current", "page");
                    }
                }
            });

            const homeNav = document.querySelector(".home-dropdown-wrapper .nav-link");
            if (homeNav && isHomePage) {
                homeNav.classList.add("active");
                homeNav.setAttribute("aria-current", "page");
            }

            document.querySelectorAll("#mobileMenu a.mobile-link").forEach(link => {
                const linkPage = new URL(link.href, window.location.href).pathname.split("/").pop();
                link.classList.toggle("mobile-active", linkPage === currentPage);
            });

            const mobileHomeNav = document.getElementById("mobileHomeToggle");
            if (mobileHomeNav) mobileHomeNav.classList.toggle("mobile-active", isHomePage);

            /* The dashboard is the single destination for every dashboard action. */
            document.querySelectorAll(".my-trips-link").forEach(link => {
                const linkPage = new URL(link.href, window.location.href).pathname.split("/").pop();
                const isCurrent = linkPage === currentPage;
                link.classList.toggle("is-current", isCurrent);
                link.toggleAttribute("aria-current", isCurrent);
            });
        }

        function configureHeaderActions() {
            const header = document.getElementById("siteHeader");
            if (!header) return;

            /*
               Keep the dashboard wording consistent everywhere and remove
               the retired "Plan My Trip" button from every page section,
               including the mobile menu and footer CTA.
            */
            document.querySelectorAll("a").forEach(link => {
                const label = link.textContent.replace(/\s+/g, " ").trim();

                /* Remove the old CTA in both header and page layouts. */
                if (label.includes("Plan My Trip")) {
                    link.remove();
                    return;
                }

                if (label.includes("My Trips")) {
                    link.classList.add("my-trips-link");
                    link.setAttribute("aria-label", "Open dashboard");

                    link.querySelectorAll("span").forEach(span => {
                        if (span.children.length === 0 && span.textContent.includes("My Trips")) {
                            span.textContent = "Dashboard";
                        }
                    });

                    link.childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("My Trips")) {
                            node.textContent = node.textContent.replace("My Trips", "Dashboard");
                        }
                    });
                }
            });
        }

        document.addEventListener("DOMContentLoaded", () => {
            installScrollToTop();
            configureHeaderActions();
            setActiveNavigation();
            window.setTimeout(hidePageLoader, 250);
        });

        window.addEventListener("load", () => {
            window.setTimeout(hidePageLoader, 500);
        });


        /* =========================================================
           ELEMENTS
        ========================================================= */

        const html =
            document.documentElement;

        const body =
            document.body;


        const siteHeader =
            document.getElementById(
                "siteHeader"
            );


        const themeToggle =
            document.getElementById(
                "themeToggle"
            );


        const mobileThemeToggle =
            document.getElementById(
                "mobileThemeToggle"
            );


        const themeIcon =
            document.getElementById(
                "themeIcon"
            );


        const mobileThemeIcon =
            document.getElementById(
                "mobileThemeIcon"
            );


        const rtlToggle =
            document.getElementById(
                "rtlToggle"
            );


        const mobileRtlToggle =
            document.getElementById(
                "mobileRtlToggle"
            );


        const rtlArrow =
            document.getElementById(
                "rtlArrow"
            );


        const mobileRtlArrow =
            document.getElementById(
                "mobileRtlArrow"
            );


        const menuToggle =
            document.getElementById(
                "menuToggle"
            );


        const mobileMenu =
            document.getElementById(
                "mobileMenu"
            );


        const menuIcon =
            document.getElementById(
                "menuIcon"
            );


        const mobileHomeToggle =
            document.getElementById(
                "mobileHomeToggle"
            );


        const mobileHomePanel =
            document.getElementById(
                "mobileHomePanel"
            );


        const homeChevron =
            document.getElementById(
                "homeChevron"
            );


        /* =========================================================
           THEME
        ========================================================= */

        function updateThemeIcons() {

            const isDark =
                html.classList.contains(
                    "dark"
                );


            const icon =
                isDark
                    ? "sun"
                    : "moon";


            if (themeIcon) {
                themeIcon.setAttribute("data-lucide", icon);
            }

            if (mobileThemeIcon) {
                mobileThemeIcon.setAttribute("data-lucide", icon);
            }

            if (typeof lucide !== "undefined") {
                lucide.createIcons();
            }

        }


        function setTheme(theme) {

            if (
                theme === "dark"
            ) {

                html.classList.add(
                    "dark"
                );

            } else {

                html.classList.remove(
                    "dark"
                );

            }


            localStorage.setItem(
                "wanderly-theme",
                theme
            );


            updateThemeIcons();

        }


        function toggleTheme() {

            const isDark =
                html.classList.contains(
                    "dark"
                );


            setTheme(
                isDark
                    ? "light"
                    : "dark"
            );

        }


        if (themeToggle) {

            themeToggle.addEventListener(
                "click",
                toggleTheme
            );

        }


        if (mobileThemeToggle) {

            mobileThemeToggle.addEventListener(
                "click",
                toggleTheme
            );

        }


        const savedTheme =
            localStorage.getItem(
                "wanderly-theme"
            );


        if (savedTheme) {

            setTheme(
                savedTheme
            );

        } else {

            const systemDark =
                window.matchMedia(
                    "(prefers-color-scheme: dark)"
                ).matches;


            setTheme(
                systemDark
                    ? "dark"
                    : "light"
            );

        }


        /* =========================================================
           RTL
        ========================================================= */

        function updateRTLButtons() {

            const direction =
                html.getAttribute(
                    "dir"
                ) || "ltr";


            if (
                direction === "rtl"
            ) {

                if (rtlArrow) rtlArrow.textContent = "←";
                if (mobileRtlArrow) mobileRtlArrow.textContent = "←";

            } else {

                if (rtlArrow) rtlArrow.textContent = "→";
                if (mobileRtlArrow) mobileRtlArrow.textContent = "→";

            }

        }


        function setDirection(
            direction
        ) {

            html.setAttribute(
                "dir",
                direction
            );


            localStorage.setItem(
                "wanderly-direction",
                direction
            );


            updateRTLButtons();

        }


        function toggleDirection() {

            const current =
                html.getAttribute(
                    "dir"
                ) || "ltr";


            setDirection(
                current === "ltr"
                    ? "rtl"
                    : "ltr"
            );

        }


        if (rtlToggle) {

            rtlToggle.addEventListener(
                "click",
                toggleDirection
            );

        }


        if (mobileRtlToggle) {

            mobileRtlToggle.addEventListener(
                "click",
                toggleDirection
            );

        }


        const savedDirection =
            localStorage.getItem(
                "wanderly-direction"
            );


        setDirection(
            savedDirection || "ltr"
        );


        /* =========================================================
           MOBILE MENU
        ========================================================= */

        let menuOpen = false;


        function openMenu() {

            menuOpen = true;


            mobileMenu.classList.add(
                "active"
            );


            body.classList.add(
                "menu-open"
            );


            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );


            menuToggle.setAttribute(
                "aria-label",
                "Close menu"
            );


            menuIcon.setAttribute(
                "data-lucide",
                "x"
            );


            lucide.createIcons();

        }


        function closeMenu() {

            menuOpen = false;


            mobileMenu.classList.remove(
                "active"
            );


            body.classList.remove(
                "menu-open"
            );


            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );


            menuIcon.setAttribute(
                "data-lucide",
                "menu"
            );


            closeHomePanel();


            lucide.createIcons();

        }


        function toggleMenu() {

            if (menuOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        }


        if (menuToggle && mobileMenu && menuIcon) {
            menuToggle.addEventListener("click", toggleMenu);
        }


        /* =========================================================
           MOBILE HOME DROPDOWN
        ========================================================= */

        function openHomePanel() {

            mobileHomePanel.classList.add(
                "active"
            );


            homeChevron.setAttribute(
                "data-lucide",
                "minus"
            );


            lucide.createIcons();

        }


        function closeHomePanel() {

            mobileHomePanel.classList.remove(
                "active"
            );


            homeChevron.setAttribute(
                "data-lucide",
                "plus"
            );


            lucide.createIcons();

        }


        if (mobileHomeToggle && mobileHomePanel && homeChevron) {
            mobileHomeToggle.addEventListener(
                "click",
                () => {

                const opened =
                    mobileHomePanel.classList.contains(
                        "active"
                    );


                if (opened) {

                    closeHomePanel();

                } else {

                    openHomePanel();

                }

                }
            );
        }


        /* =========================================================
           MOBILE LINK CLICK
        ========================================================= */

        document
            .querySelectorAll(
                "#mobileMenu a"
            )
            .forEach(
                link => {

                    link.addEventListener(
                        "click",
                        closeMenu
                    );

                }
            );


        /* =========================================================
           ESCAPE
        ========================================================= */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    menuOpen
                ) {

                    closeMenu();

                }

            }
        );


        /* =========================================================
           HEADER SCROLL
        ========================================================= */

        function handleHeaderScroll() {

            if (!siteHeader) return;

            if (
                window.scrollY > 30
            ) {

                siteHeader.classList.add(
                    "shadow-[0_12px_40px_rgba(0,0,0,.08)]"
                );


                siteHeader.classList.add(
                    "py-3"
                );

            } else {

                siteHeader.classList.remove(
                    "shadow-[0_12px_40px_rgba(0,0,0,.08)]"
                );


                siteHeader.classList.remove(
                    "py-3"
                );

            }

        }


        window.addEventListener(
            "scroll",
            handleHeaderScroll,
            {
                passive: true
            }
        );


        handleHeaderScroll();


        /* =========================================================
           RESIZE
        ========================================================= */

        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth >= 1280 &&
                    menuOpen
                ) {

                    closeMenu();

                }

            }
        );

    





 // =========================================================
    // PAGE LOADER
    // =========================================================

    window.addEventListener("load", hidePageLoader);








// <!-- ========================================================= -->
// <!-- TRAVEL COMPASS STYLES -->
// <!-- ========================================================= -->




    document.addEventListener("DOMContentLoaded", () => {

    const destinations = {

        kerala: {
            name: "Kerala",
            region: "South India",
            image: "../assets/images/p86.jpg",
            description: "Backwaters, misty hills and slow mornings.",
            ideal: "5–7 days",
            mood: "Slow",
            price: "₹18K",
            rotation: "0deg"
        },

        rajasthan: {
            name: "Rajasthan",
            region: "North West India",
            image: "../assets/images/p40.jpg",
            description: "Golden forts, royal stays and desert skies.",
            ideal: "6–8 days",
            mood: "Royal",
            price: "₹24K",
            rotation: "72deg"
        },

        goa: {
            name: "Goa",
            region: "West India",
            image: "../assets/images/p14.jpg",
            description: "Coastal roads, hidden beaches and easy days.",
            ideal: "4–6 days",
            mood: "Free",
            price: "₹15K",
            rotation: "144deg"
        },

        himachal: {
            name: "Himachal",
            region: "North India",
            image: "../assets/images/p40.jpg",
            description: "Mountain trails, pine forests and quiet escapes.",
            ideal: "6–9 days",
            mood: "Wild",
            price: "₹22K",
            rotation: "216deg"
        },

        meghalaya: {
            name: "Meghalaya",
            region: "North East India",
            image: "../assets/images/p86.jpg",
            description: "Waterfalls, living roots and mist-covered valleys.",
            ideal: "5–7 days",
            mood: "Mystic",
            price: "₹21K",
            rotation: "288deg"
        }

    };


    const buttons = document.querySelectorAll(".destination-btn");
    const searchOptions = document.querySelectorAll(".search-option");

    const compassFace =
        document.getElementById("compassFace");

    const destinationImage =
        document.getElementById("destinationImage");

    const destinationName =
        document.getElementById("destinationName");

    const destinationRegion =
        document.getElementById("destinationRegion");

    const destinationDescription =
        document.getElementById("destinationDescription");

    const destinationIdeal =
        document.getElementById("destinationIdeal");

    const destinationMood =
        document.getElementById("destinationMood");

    const destinationPrice =
        document.getElementById("destinationPrice");

    const search =
        document.getElementById("destinationSearch");

    const searchResult =
        document.getElementById("searchResult");

    const compassReset =
        document.getElementById("compassReset");


    let currentRotation = 0;


    function updateDestination(key) {

        const data = destinations[key];

        if (!data) return;


        /* ----------------------------------------- */
        /* ACTIVE BUTTON */
        /* ----------------------------------------- */

        buttons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.destination === key
            );

        });


        /* ----------------------------------------- */
        /* COMPASS ROTATION */
        /* ----------------------------------------- */

        currentRotation = parseInt(
            data.rotation.replace("deg", "")
        );

        compassFace.style.transform =
            `rotate(${currentRotation}deg)`;


        /* ----------------------------------------- */
        /* IMAGE TRANSITION */
        /* ----------------------------------------- */

        destinationImage.style.opacity = "0";

        setTimeout(() => {

            destinationImage.src = data.image;

            destinationImage.alt =
                `${data.name} destination`;

            destinationName.textContent =
                data.name;

            destinationRegion.textContent =
                data.region;

            destinationDescription.textContent =
                data.description;

            destinationIdeal.textContent =
                data.ideal;

            destinationMood.textContent =
                data.mood;

            destinationPrice.textContent =
                data.price;

            destinationImage.style.opacity = "1";

        }, 180);

    }


    /* ----------------------------------------- */
    /* DESTINATION BUTTONS */
    /* ----------------------------------------- */

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            updateDestination(
                button.dataset.destination
            );

        });

    });


    /* ----------------------------------------- */
    /* SEARCH */
    /* ----------------------------------------- */

    search.addEventListener("focus", () => {

        searchResult.classList.remove("hidden");

    });


    search.addEventListener("input", () => {

        const value =
            search.value.toLowerCase().trim();

        const options =
            document.querySelectorAll(".search-option");

        options.forEach(option => {

            const text =
                option.textContent.toLowerCase();

            option.style.display =
                text.includes(value)
                    ? "block"
                    : "none";

        });

        searchResult.classList.remove("hidden");

    });


    searchOptions.forEach(option => {

        option.addEventListener("click", () => {

            const key =
                option.dataset.destination;

            const data =
                destinations[key];

            search.value =
                data.name;

            updateDestination(key);

            searchResult.classList.add("hidden");

        });

    });


    /* ----------------------------------------- */
    /* CLOSE SEARCH */
    /* ----------------------------------------- */

    document.addEventListener("click", event => {

        if (
            !search.contains(event.target) &&
            !searchResult.contains(event.target)
        ) {

            searchResult.classList.add("hidden");

        }

    });


    /* ----------------------------------------- */
    /* RESET COMPASS */
    /* ----------------------------------------- */

    compassReset.addEventListener("click", () => {

        compassFace.style.transform =
            "rotate(0deg)";

        currentRotation = 0;

    });


    /* ----------------------------------------- */
    /* INITIAL */
    /* ----------------------------------------- */

    updateDestination("kerala");

});





// <!-- ========================================================= -->
// <!-- LUCIDE ICONS -->
// <!-- ========================================================= -->




    /* =========================================================
   SCROLL TO TOP
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    installScrollToTop();
});








 const revealItems =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    revealItems.forEach(item => {

        revealObserver.observe(item);

    });













//     <!-- ========================================================= -->
// <!-- SECTION SCRIPT -->
// <!-- ========================================================= -->



document.addEventListener("DOMContentLoaded", function () {

    const revealElements =
        document.querySelectorAll(".section-reveal");


    /* --------------------------------------------- */
    /* INTERSECTION OBSERVER */
    /* --------------------------------------------- */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(function (element) {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("is-visible");

        });

    }


    /* --------------------------------------------- */
    /* IMAGE ERROR FALLBACK */
    /* --------------------------------------------- */

    document
        .querySelectorAll(".mood-image-card img")
        .forEach(function (img) {

            img.addEventListener("error", function () {

                console.warn(
                    "Image not found:",
                    img.getAttribute("src")
                );

                img.style.display = "none";

            });

        });

});





// <!-- ========================================================= -->
// <!-- DESTINATION SWITCH SCRIPT -->
// <!-- ========================================================= -->



document.addEventListener("DOMContentLoaded", function () {

    const destinationData = {

        bali: {
            image: "../assets/images/p23.jpg",
            title: "Bali",
            location: "Bali, Indonesia",
            rating: "4.9",
            description:
                "A place where tropical beaches, ancient temples, lush landscapes, and slow island living come together.",
            price: "From ₹48,999",
            button: "Explore Bali"
        },

        switzerland: {
            image: "../assets/images/p24.jpg",
            title: "Switzerland",
            location: "Swiss Alps, Europe",
            rating: "4.8",
            description:
                "Snow-covered mountains, peaceful villages, crystal lakes and scenic journeys create an unforgettable escape.",
            price: "From ₹72,999",
            button: "Explore Switzerland"
        },

        maldives: {
            image: "../assets/images/p25.jpg",
            title: "Maldives",
            location: "Maldives, Indian Ocean",
            rating: "4.9",
            description:
                "Turquoise waters, private islands and slow days beside the ocean make this a perfect tropical getaway.",
            price: "From ₹64,999",
            button: "Explore Maldives"
        },

        dubai: {
            image: "../assets/images/p26.jpg",
            title: "Dubai",
            location: "Dubai, UAE",
            rating: "4.8",
            description:
                "A vibrant mix of modern architecture, desert adventures, luxury experiences and unforgettable city nights.",
            price: "From ₹42,999",
            button: "Explore Dubai"
        },

        kyoto: {
            image: "../assets/images/p27.jpg",
            title: "Kyoto",
            location: "Kyoto, Japan",
            rating: "4.9",
            description:
                "Quiet temples, traditional streets, seasonal gardens and local cafés reveal the timeless beauty of Kyoto.",
            price: "From ₹79,999",
            button: "Explore Kyoto"
        }

    };


    const destinationItems =
        document.querySelectorAll(".destination-item");

    const destinationImage =
        document.getElementById("destinationImage");

    const destinationTitle =
        document.getElementById("destinationTitle");

    const destinationLocation =
        document.getElementById("destinationLocation");

    const destinationRating =
        document.getElementById("destinationRating");

    const destinationDescription =
        document.getElementById("destinationDescription");

    const destinationPrice =
        document.getElementById("destinationPrice");

    const destinationButtonText =
        document.getElementById("destinationButtonText");


    function updateDestination(destinationName) {

        const data =
            destinationData[destinationName];

        if (!data) return;


        /* ========================================= */
        /* IMAGE FADE OUT */
        /* ========================================= */

        destinationImage.classList.add(
            "opacity-0",
            "scale-105"
        );


        /* ========================================= */
        /* CONTENT FADE */
        /* ========================================= */

        destinationTitle.classList.add("opacity-0");
        destinationDescription.classList.add("opacity-0");


        setTimeout(function () {

            /* IMAGE */

            destinationImage.src = data.image;
            destinationImage.alt =
                data.title + " destination";


            /* CONTENT */

            destinationTitle.textContent =
                data.title;

            destinationLocation.textContent =
                data.location;

            destinationDescription.textContent =
                data.description;

            destinationPrice.textContent =
                data.price;

            destinationButtonText.textContent =
                data.button;


            destinationRating.innerHTML = `
                <i class="fa-solid fa-star text-[9px]"></i>
                ${data.rating}
            `;


            /* RESTORE */

            destinationImage.classList.remove(
                "opacity-0",
                "scale-105"
            );

            destinationTitle.classList.remove(
                "opacity-0"
            );

            destinationDescription.classList.remove(
                "opacity-0"
            );

        }, 250);


        /* ========================================= */
        /* ACTIVE LEFT ITEM */
        /* ========================================= */

        destinationItems.forEach(function (item) {

            const arrow =
                item.querySelector(".destination-arrow");


            if (
                item.dataset.destination ===
                destinationName
            ) {

                item.classList.add(
                    "bg-[#1C1C1A]",
                    "dark:bg-white",
                    "text-white",
                    "dark:text-black"
                );

                item.classList.remove(
                    "text-[#1C1C1A]",
                    "dark:text-white"
                );


                if (arrow) {

                    arrow.classList.remove(
                        "opacity-0",
                        "-translate-x-2"
                    );

                }

            } else {

                item.classList.remove(
                    "bg-[#1C1C1A]",
                    "dark:bg-white",
                    "text-white",
                    "dark:text-black"
                );

                item.classList.add(
                    "text-[#1C1C1A]",
                    "dark:text-white"
                );


                if (arrow) {

                    arrow.classList.add(
                        "opacity-0",
                        "-translate-x-2"
                    );

                }

            }

        });

    }


    /* ========================================= */
    /* CLICK EVENTS */
    /* ========================================= */

    destinationItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                updateDestination(
                    this.dataset.destination
                );

            }
        );

    });


    /* ========================================= */
    /* INITIAL STATE */
    /* ========================================= */

    updateDestination("bali");

});



document.addEventListener("DOMContentLoaded", function () {

            const slider =
                document.getElementById("destinationSlider");

            if (!slider) return;


            /* ==============================================
               DRAG STATE
            ============================================== */

            let isDown = false;
            let startX = 0;
            let scrollStart = 0;


            /* ==============================================
               MOUSE DOWN
            ============================================== */

            slider.addEventListener(
                "mousedown",
                function (e) {

                    isDown = true;

                    slider.style.cursor = "grabbing";

                    startX =
                        e.pageX -
                        slider.getBoundingClientRect().left;

                    scrollStart =
                        slider.scrollLeft;

                }
            );


            /* ==============================================
               MOUSE UP
            ============================================== */

            function stopDragging() {

                isDown = false;

                slider.style.cursor = "grab";

            }


            slider.addEventListener(
                "mouseup",
                stopDragging
            );

            slider.addEventListener(
                "mouseleave",
                stopDragging
            );


            /* ==============================================
               MOUSE MOVE
            ============================================== */

            slider.addEventListener(
                "mousemove",
                function (e) {

                    if (!isDown) return;

                    e.preventDefault();

                    const currentX =
                        e.pageX -
                        slider.getBoundingClientRect().left;

                    const distance =
                        (currentX - startX) * 1.5;

                    slider.scrollLeft =
                        scrollStart - distance;

                }
            );


            /* ==============================================
               MOUSE WHEEL
            ============================================== */

            slider.addEventListener(
                "wheel",
                function (e) {

                    /*
                     * Vertical mouse wheel
                     * becomes horizontal movement.
                     */

                    if (
                        Math.abs(e.deltaY) >
                        Math.abs(e.deltaX)
                    ) {

                        e.preventDefault();

                        slider.scrollLeft +=
                            e.deltaY;

                    }

                },
                {
                    passive: false
                }
            );


            /* ==============================================
               TOUCH SUPPORT
            ============================================== */

            let touchStartX = 0;
            let touchScroll = 0;


            slider.addEventListener(
                "touchstart",
                function (e) {

                    touchStartX =
                        e.touches[0].pageX;

                    touchScroll =
                        slider.scrollLeft;

                },
                {
                    passive: true
                }
            );


            slider.addEventListener(
                "touchmove",
                function (e) {

                    const currentX =
                        e.touches[0].pageX;

                    const distance =
                        currentX - touchStartX;

                    slider.scrollLeft =
                        touchScroll - distance;

                },
                {
                    passive: true
                }
            );


            /* ==============================================
               KEYBOARD SUPPORT
            ============================================== */

            slider.addEventListener(
                "keydown",
                function (e) {

                    if (e.key === "ArrowRight") {

                        slider.scrollBy({
                            left: 430,
                            behavior: "smooth"
                        });

                    }

                    if (e.key === "ArrowLeft") {

                        slider.scrollBy({
                            left: -430,
                            behavior: "smooth"
                        });

                    }

                }
            );

        });


    //     <!-- ===================================================== -->
    // <!-- MAGNETIC MOUSE ANIMATION -->
    // <!-- ===================================================== -->


    

        document.addEventListener(
            "DOMContentLoaded",
            function () {

                const wall =
                    document.getElementById(
                        "destinationWallItems"
                    );

                if (!wall) return;


                const items =
                    wall.querySelectorAll(
                        ".wall-item"
                    );


                let mouseX = 0;
                let mouseY = 0;

                let currentX = 0;
                let currentY = 0;


                /* ==========================================
                   MOUSE POSITION
                ========================================== */

                wall.addEventListener(
                    "mousemove",
                    function (e) {

                        const rect =
                            wall.getBoundingClientRect();

                        mouseX =
                            (e.clientX -
                                rect.left -
                                rect.width / 2) /
                            rect.width;

                        mouseY =
                            (e.clientY -
                                rect.top -
                                rect.height / 2) /
                            rect.height;

                    }
                );


                /* ==========================================
                   SMOOTH MAGNETIC MOVEMENT
                ========================================== */

                function animateWall() {

                    currentX +=
                        (mouseX - currentX) * 0.06;

                    currentY +=
                        (mouseY - currentY) * 0.06;


                    items.forEach(
                        function (item) {

                            const x =
                                Number(
                                    item.dataset.x
                                );

                            const y =
                                Number(
                                    item.dataset.y
                                );


                            item.style.transform =
                                `translate3d(
                                    ${currentX * x}px,
                                    ${currentY * y}px,
                                    0
                                )`;

                        }
                    );


                    requestAnimationFrame(
                        animateWall
                    );

                }


                animateWall();


                /* ==========================================
                   TOUCH DEVICES
                ========================================== */

                if (
                    window.matchMedia(
                        "(hover: none)"
                    ).matches
                ) {

                    items.forEach(
                        function (item) {

                            item.style.transform =
                                "none";

                        }
                    );

                }

            }
        );

    // <!-- ================================================= -->
    // <!-- SCROLL REVEAL -->
    // <!-- ================================================= -->


        document.addEventListener(
            "DOMContentLoaded",
            function () {

                const cards =
                    document.querySelectorAll(
                        "#chooseEscape .escape-card"
                    );


                const observer =
                    new IntersectionObserver(
                        function (entries) {

                            entries.forEach(
                                function (entry) {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        entry.target.classList.add(
                                            "escape-visible"
                                        );

                                    }

                                }
                            );

                        },
                        {
                            threshold: 0.15
                        }
                    );


                cards.forEach(
                    function (card) {

                        observer.observe(card);

                    }
                );

            }
        );
        




// <!-- ========================================================= -->
// <!-- WORLD DESTINATION JAVASCRIPT -->
// <!-- ========================================================= -->


document.addEventListener("DOMContentLoaded", function () {

    /* =======================================================
       SCROLL REVEAL
    ======================================================= */

    const revealElements = document.querySelectorAll(
        ".world-intro, .world-title, .world-visual, .destination-selector"
    );

    const revealObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "world-section-visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });



    /* =======================================================
       DESTINATION SWITCHER
    ======================================================= */

    const destinations =
        document.querySelectorAll(
            ".world-destination"
        );

    const image =
        document.getElementById(
            "worldDestinationImage"
        );

    const place =
        document.getElementById(
            "worldDestinationPlace"
        );

    const country =
        document.getElementById(
            "worldDestinationCountry"
        );

    const number =
        document.getElementById(
            "worldDestinationNumber"
        );


    destinations.forEach(function (destination) {

        destination.addEventListener(
            "mouseenter",
            function () {

                changeDestination(
                    destination
                );

            }
        );


        destination.addEventListener(
            "focus",
            function () {

                changeDestination(
                    destination
                );

            }
        );


        destination.addEventListener(
            "click",
            function () {

                changeDestination(
                    destination
                );

            }
        );

    });


    function changeDestination(destination) {

        const newImage =
            destination.dataset.image;

        const newPlace =
            destination.dataset.place;

        const newCountry =
            destination.dataset.country;

        const newNumber =
            destination.dataset.number;


        /* Active state */

        destinations.forEach(function (item) {

            item.classList.remove(
                "active"
            );

        });

        destination.classList.add(
            "active"
        );


        /* Image animation */

        image.classList.add(
            "image-changing"
        );


        setTimeout(function () {

            image.src = newImage;

            image.alt = newPlace;

            place.textContent =
                newPlace;

            country.textContent =
                newCountry;

            number.textContent =
                newNumber;


            image.onload = function () {

                image.classList.remove(
                    "image-changing"
                );

            };

        }, 350);

    }

});




 document.addEventListener(
            "DOMContentLoaded",
            function () {

                const elements =
                    document.querySelectorAll(
                        ".dashboard-trip, .dashboard-info"
                    );

                const observer =
                    new IntersectionObserver(
                        function (entries) {

                            entries.forEach(
                                function (entry) {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        entry.target.classList.add(
                                            "show"
                                        );

                                        observer.unobserve(
                                            entry.target
                                        );

                                    }

                                }
                            );

                        },
                        {
                            threshold: 0.12
                        }
                    );


                elements.forEach(
                    function (element) {

                        observer.observe(element);

                    }
                );

            }
        );
        








        
        document.addEventListener(
            "DOMContentLoaded",
            function () {

                const stats =
                    document.querySelectorAll(
                        ".travel-stat"
                    );

                const timeline =
                    document.querySelectorAll(
                        ".timeline-item"
                    );


                const observer =
                    new IntersectionObserver(
                        function (entries) {

                            entries.forEach(
                                function (entry) {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        entry.target.classList.add(
                                            "show"
                                        );

                                        if (
                                            entry.target.classList.contains(
                                                "travel-stat"
                                            )
                                        ) {

                                            const counter =
                                                entry.target.querySelector(
                                                    ".counter"
                                                );

                                            if (counter) {

                                                animateCounter(
                                                    counter
                                                );

                                            }

                                        }

                                        observer.unobserve(
                                            entry.target
                                        );

                                    }

                                }
                            );

                        },
                        {
                            threshold: 0.15
                        }
                    );


                stats.forEach(function (item) {

                    observer.observe(item);

                });


                timeline.forEach(function (item) {

                    observer.observe(item);

                });



                function animateCounter(element) {

                    const target =
                        Number(
                            element.dataset.target
                        );

                    let current = 0;

                    const duration = 1400;

                    const start =
                        performance.now();


                    function update(time) {

                        const progress =
                            Math.min(
                                (time - start) / duration,
                                1
                            );

                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );

                        current =
                            Math.floor(
                                eased * target
                            );

                        element.textContent =
                            current.toLocaleString();


                        if (progress < 1) {

                            requestAnimationFrame(
                                update
                            );

                        } else {

                            element.textContent =
                                target.toLocaleString();

                        }

                    }


                    requestAnimationFrame(
                        update
                    );

                }

            }
        );



        



    // <!-- ================================================= -->
    // <!-- INTERSECTION ANIMATION -->
    // <!-- ================================================= -->

    

        document.addEventListener(
            "DOMContentLoaded",
            function () {

                const board =
                    document.querySelector(
                        "#travelMoodBoard .mood-board"
                    );


                if (!board) return;


                const observer =
                    new IntersectionObserver(
                        function (entries) {

                            entries.forEach(
                                function (entry) {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        board.classList.add(
                                            "active"
                                        );

                                        observer.unobserve(
                                            board
                                        );

                                    }

                                }
                            );

                        },
                        {
                            threshold: 0.15
                        }
                    );


                observer.observe(board);

            }
        );

    


    //     <!-- ===================================================== -->
    // <!-- JAVASCRIPT -->
    // <!-- ===================================================== -->

    

        document.addEventListener(
            "DOMContentLoaded",
            function () {


                const options =
                    document.querySelectorAll(
                        "#packageSelector .package-option"
                    );


                const image =
                    document.getElementById(
                        "packageImage"
                    );


                const title =
                    document.getElementById(
                        "packageTitle"
                    );


                const duration =
                    document.getElementById(
                        "packageDuration"
                    );


                const price =
                    document.getElementById(
                        "packagePrice"
                    );


                const description =
                    document.getElementById(
                        "packageDescription"
                    );


                const place =
                    document.getElementById(
                        "packagePlace"
                    );


                const style =
                    document.getElementById(
                        "packageStyle"
                    );


                const packages = {

                    essential: {

                        image:
                            "../assets/images/p53.jpg",

                        title:
                            "Essential",

                        duration:
                            "05 Days / 04 Nights",

                        price:
                            "From ₹48,000",

                        description:
                            "A beautifully balanced escape for travellers who want the essentials without rushing the experience.",

                        place:
                            "Kerala",

                        style:
                            "Slow Travel"

                    },


                    signature: {

                        image:
                            "../assets/images/p54.jpg",

                        title:
                            "Signature",

                        duration:
                            "07 Days / 06 Nights",

                        price:
                            "From ₹72,000",

                        description:
                            "A richer journey combining iconic places, hidden corners and carefully chosen stays.",

                        place:
                            "Rajasthan",

                        style:
                            "Cultural Escape"

                    },


                    private: {

                        image:
                            "../assets/images/p55.jpg",

                        title:
                            "Private",

                        duration:
                            "08 Days / 07 Nights",

                        price:
                            "From ₹96,000",

                        description:
                            "A private escape designed around comfort, flexibility and experiences reserved just for you.",

                        place:
                            "Himalayas",

                        style:
                            "Private Journey"

                    },


                    bespoke: {

                        image:
                            "../assets/images/p56.jpg",

                        title:
                            "Bespoke",

                        duration:
                            "10+ Days / Custom",

                        price:
                            "Tailored for you",

                        description:
                            "Nothing predefined. Tell us how you want to travel and we will shape the entire journey around you.",

                        place:
                            "Anywhere",

                        style:
                            "Made to Measure"

                    }

                };


                function updatePackage(
                    key
                ) {


                    const data =
                        packages[key];


                    if (!data) return;


                    options.forEach(
                        function (option) {

                            option.classList.remove(
                                "active"
                            );

                        }
                    );


                    document
                        .querySelector(
                            '[data-package="' +
                            key +
                            '"]'
                        )
                        .classList.add(
                            "active"
                        );


                    image.style.opacity =
                        "0";


                    image.style.transform =
                        "scale(1.05)";


                    setTimeout(
                        function () {


                            image.src =
                                data.image;

                            image.alt =
                                data.title +
                                " travel package";


                            title.textContent =
                                data.title;


                            duration.textContent =
                                data.duration;


                            price.textContent =
                                data.price;


                            description.textContent =
                                data.description;


                            place.textContent =
                                data.place;


                            style.textContent =
                                data.style;


                            image.style.opacity =
                                ".9";


                            image.style.transform =
                                "scale(1)";


                        },
                        220
                    );

                }


                options.forEach(
                    function (option) {


                        option.addEventListener(
                            "click",
                            function () {


                                const key =
                                    this.dataset.package;


                                updatePackage(
                                    key
                                );

                            }
                        );


                    }
                );


            }
        );

    


    //     <!-- ===================================================== -->
    // <!-- JAVASCRIPT -->
    // <!-- ===================================================== -->

    

        document.addEventListener(
            "DOMContentLoaded",
            function () {


                const section =
                    document.getElementById(
                        "packageJourney"
                    );


                if (!section) return;


                const items =
                    section.querySelectorAll(
                        ".journey-item"
                    );


                const observer =
                    new IntersectionObserver(
                        function (
                            entries
                        ) {


                            entries.forEach(
                                function (
                                    entry
                                ) {


                                    if (
                                        entry.isIntersecting
                                    ) {


                                        entry.target.classList.add(
                                            "visible"
                                        );


                                        observer.unobserve(
                                            entry.target
                                        );

                                    }

                                }
                            );

                        },
                        {
                            threshold:
                                0.18
                        }
                    );


                items.forEach(
                    function (
                        item
                    ) {

                        observer.observe(
                            item
                        );

                    }
                );

            }
        );

   



    //     <!-- ===================================================== -->
    // <!-- JAVASCRIPT -->
    // <!-- ===================================================== -->

   

        document.addEventListener(
            "DOMContentLoaded",
            function () {


                const section =
                    document.getElementById(
                        "packageInclusions"
                    );


                if (!section) return;


                const observer =
                    new IntersectionObserver(
                        function (
                            entries
                        ) {


                            entries.forEach(
                                function (
                                    entry
                                ) {


                                    if (
                                        entry.isIntersecting
                                    ) {


                                        section.classList.add(
                                            "active"
                                        );


                                        observer.unobserve(
                                            section
                                        );

                                    }

                                }
                            );

                        },
                        {
                            threshold:
                                0.15
                        }
                    );


                observer.observe(
                    section
                );

            }
        );

    



    //     <!-- ===================================================== -->
    // <!-- JAVASCRIPT -->
    // <!-- ===================================================== -->

        document.addEventListener(
            "DOMContentLoaded",
            function () {

                const section =
                    document.getElementById(
                        "packagePace"
                    );

                if (!section) return;


                const observer =
                    new IntersectionObserver(
                        function (entries) {

                            entries.forEach(
                                function (entry) {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        section.classList.add(
                                            "active"
                                        );

                                        observer.unobserve(
                                            section
                                        );

                                    }

                                }
                            );

                        },
                        {
                            threshold: 0.15
                        }
                    );


                observer.observe(section);

            }
        );




        
    // <!-- ===================================================== -->
    // <!-- JAVASCRIPT -->
    // <!-- ===================================================== -->

    

        document.addEventListener(
            "DOMContentLoaded",
            function () {

                const section =
                    document.getElementById(
                        "packageExperience"
                    );

                if (!section) return;


                const image =
                    document.getElementById(
                        "experienceImage"
                    );

                const location =
                    document.getElementById(
                        "experienceLocation"
                    );

                const caption =
                    document.getElementById(
                        "experienceCaption"
                    );

                const counter =
                    document.getElementById(
                        "experienceCounter"
                    );


                const options =
                    section.querySelectorAll(
                        ".experience-option"
                    );


                const experiences = [

                    {
                        image:
                            "../assets/images/p62.jpg",

                        location:
                            "Amalfi Coast · Italy",

                        caption:
                            "Slow afternoons beside the sea."
                    },

                    {
                        image:
                            "../assets/images/p63.jpg",

                        location:
                            "Swiss Alps · Switzerland",

                        caption:
                            "Higher roads. Wilder mornings."
                    },

                    {
                        image:
                            "../assets/images/p64.jpg",

                        location:
                            "Bali · Indonesia",

                        caption:
                            "Warm evenings that stay with you."
                    }

                ];


                function activateExperience(index) {

                    const item =
                        experiences[index];


                    options.forEach(
                        function (option, i) {

                            option.classList.toggle(
                                "active",
                                i === index
                            );

                        }
                    );


                    image.classList.add(
                        "experience-changing"
                    );


                    setTimeout(
                        function () {

                            image.src =
                                item.image;

                            location.textContent =
                                item.location;

                            caption.textContent =
                                item.caption;

                            counter.textContent =
                                `0${index + 1} / 03`;

                        },
                        250
                    );


                    setTimeout(
                        function () {

                            image.classList.remove(
                                "experience-changing"
                            );

                        },
                        700
                    );

                }


                options.forEach(
                    function (option, index) {

                        option.addEventListener(
                            "mouseenter",
                            function () {

                                activateExperience(
                                    index
                                );

                            }
                        );


                        option.addEventListener(
                            "click",
                            function () {

                                activateExperience(
                                    index
                                );

                            }
                        );

                    }
                );



                /* ================================================= */
                /* SCROLL REVEAL */
                /* ================================================= */

                const observer =
                    new IntersectionObserver(
                        function (entries) {

                            entries.forEach(
                                function (entry) {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        section.classList.add(
                                            "active"
                                        );

                                        observer.unobserve(
                                            section
                                        );

                                    }

                                }
                            );

                        },
                        {
                            threshold: 0.12
                        }
                    );


                observer.observe(section);

            }
        );

    



        
    // <!-- ================================================= -->
    // <!-- JAVASCRIPT -->
    // <!-- ================================================= -->

    

        document.addEventListener(
            "DOMContentLoaded",
            function () {

                const section =
                    document.getElementById(
                        "journeyUnfolded"
                    );

                if (!section) return;


                const image =
                    document.getElementById(
                        "journeyImage"
                    );

                const type =
                    document.getElementById(
                        "journeyType"
                    );

                const number =
                    document.getElementById(
                        "journeyNumber"
                    );

                const location =
                    document.getElementById(
                        "journeyLocation"
                    );

                const title =
                    document.getElementById(
                        "journeyTitle"
                    );

                const duration =
                    document.getElementById(
                        "journeyDuration"
                    );

                const best =
                    document.getElementById(
                        "journeyBest"
                    );

                const season =
                    document.getElementById(
                        "journeySeason"
                    );

                const progressNumber =
                    document.getElementById(
                        "journeyProgressNumber"
                    );

                const progress =
                    document.getElementById(
                        "journeyProgress"
                    );


                const next =
                    document.getElementById(
                        "journeyNext"
                    );

                const prev =
                    document.getElementById(
                        "journeyPrev"
                    );


                const journeys = [

                    {
                        image:
                            "../assets/images/p66.jpg",

                        type:
                            "Signature Journey",

                        location:
                            "Kyoto · Japan",

                        title:
                            "Between ancient moments.",

                        duration:
                            "07 Nights",

                        best:
                            "Culture",

                        season:
                            "Spring"
                    },

                    {
                        image:
                            "../assets/images/p67.jpg",

                        type:
                            "Wild Escape",

                        location:
                            "Patagonia · Chile",

                        title:
                            "Where the world feels endless.",

                        duration:
                            "09 Nights",

                        best:
                            "Adventure",

                        season:
                            "Autumn"
                    },

                    {
                        image:
                            "../assets/images/p68.jpg",

                        type:
                            "Slow Escape",

                        location:
                            "Amalfi · Italy",

                        title:
                            "A little longer by the sea.",

                        duration:
                            "06 Nights",

                        best:
                            "Relaxation",

                        season:
                            "Summer"
                    },

                    {
                        image:
                            "../assets/images/p69.jpg",

                        type:
                            "Private Escape",

                        location:
                            "Rajasthan · India",

                        title:
                            "Stories written in gold.",

                        duration:
                            "08 Nights",

                        best:
                            "Luxury",

                        season:
                            "Winter"
                    }

                ];


                let current =
                    0;


                function updateJourney(
                    index
                ) {

                    const item =
                        journeys[index];


                    current =
                        index;


                    image.classList.remove(
                        "journey-changing"
                    );


                    void image.offsetWidth;


                    image.classList.add(
                        "journey-changing"
                    );


                    image.src =
                        item.image;

                    type.textContent =
                        item.type;

                    number.textContent =
                        `0${index + 1}`;

                    location.textContent =
                        item.location;

                    title.textContent =
                        item.title;

                    duration.textContent =
                        item.duration;

                    best.textContent =
                        item.best;

                    season.textContent =
                        item.season;

                    progressNumber.textContent =
                        `0${index + 1} / 04`;


                    progress.style.width =
                        `${((index + 1) / journeys.length) * 100}%`;

                }


                next.addEventListener(
                    "click",
                    function () {

                        const nextIndex =
                            (current + 1)
                            % journeys.length;

                        updateJourney(
                            nextIndex
                        );

                    }
                );


                prev.addEventListener(
                    "click",
                    function () {

                        const prevIndex =
                            (current - 1 +
                             journeys.length)
                            % journeys.length;

                        updateJourney(
                            prevIndex
                        );

                    }
                );


                /* AUTO CHANGE */

                let autoPlay =
                    setInterval(
                        function () {

                            const nextIndex =
                                (current + 1)
                                % journeys.length;

                            updateJourney(
                                nextIndex
                            );

                        },
                        6500
                    );


                [next, prev].forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                clearInterval(
                                    autoPlay
                                );

                            }
                        );

                    }
                );


                /* SCROLL REVEAL */

                const observer =
                    new IntersectionObserver(
                        function (entries) {

                            entries.forEach(
                                function (entry) {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        section.classList.add(
                                            "active"
                                        );

                                        observer.unobserve(
                                            section
                                        );

                                    }

                                }
                            );

                        },
                        {
                            threshold:
                                0.12
                        }
                    );


                observer.observe(
                    section
                );

            }
        );

    



        
// <!-- ============================================================= -->
// <!-- VALIDATION -->
// <!-- ============================================================= -->



document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");

    const name = document.getElementById("fullName");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    const nameStatus = document.getElementById("nameStatus");
    const emailStatus = document.getElementById("emailStatus");

    const messageCount = document.getElementById("messageCount");

    const submitBtn = document.getElementById("submitBtn");
    const submitText = document.getElementById("submitText");
    const submitIcon = document.getElementById("submitIcon");

    const success = document.getElementById("formSuccess");


    /* ========================================================= */
    /* MESSAGE COUNTER */
    /* ========================================================= */

    message.addEventListener("input", () => {

        messageCount.textContent =
            `${message.value.length} / 500`;

    });


    /* ========================================================= */
    /* ERROR */
    /* ========================================================= */

    function error(input, element, text) {

        input.classList.remove("border-transparent");
        input.classList.add("border-red-400");

        element.textContent = text;
        element.classList.remove("hidden");

    }


    function clear(input, element) {

        input.classList.remove("border-red-400");
        input.classList.add("border-transparent");

        element.textContent = "";
        element.classList.add("hidden");

    }


    /* ========================================================= */
    /* VALIDATE NAME */
    /* ========================================================= */

    function validateName() {

        const value = name.value.trim();

        if (!value) {

            error(
                name,
                nameError,
                "Please enter your name."
            );

            nameStatus.classList.add("hidden");

            return false;
        }


        if (value.length < 3) {

            error(
                name,
                nameError,
                "Enter at least 3 characters."
            );

            nameStatus.classList.add("hidden");

            return false;
        }


        clear(name, nameError);

        nameStatus.innerHTML =
            '<i data-lucide="circle-check" class="w-4 h-4 text-moss"></i>';

        nameStatus.classList.remove("hidden");

        if (window.lucide) {
            lucide.createIcons();
        }

        return true;

    }


    /* ========================================================= */
    /* VALIDATE EMAIL */
    /* ========================================================= */

    function validateEmail() {

        const value = email.value.trim();

        const pattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


        if (!value) {

            error(
                email,
                emailError,
                "Please enter your email."
            );

            emailStatus.classList.add("hidden");

            return false;
        }


        if (!pattern.test(value)) {

            error(
                email,
                emailError,
                "Enter a valid email address."
            );

            emailStatus.classList.add("hidden");

            return false;
        }


        clear(email, emailError);

        emailStatus.innerHTML =
            '<i data-lucide="circle-check" class="w-4 h-4 text-moss"></i>';

        emailStatus.classList.remove("hidden");

        if (window.lucide) {
            lucide.createIcons();
        }

        return true;

    }


    /* ========================================================= */
    /* VALIDATE MESSAGE */
    /* ========================================================= */

    function validateMessage() {

        const value = message.value.trim();


        if (!value) {

            error(
                message,
                messageError,
                "Please tell us a little about your enquiry."
            );

            return false;
        }


        if (value.length < 10) {

            error(
                message,
                messageError,
                "Please enter at least 10 characters."
            );

            return false;
        }


        clear(message, messageError);

        return true;

    }


    /* ========================================================= */
    /* LIVE VALIDATION */
    /* ========================================================= */

    name.addEventListener("blur", validateName);

    email.addEventListener("blur", validateEmail);

    message.addEventListener("blur", validateMessage);


    name.addEventListener("input", () => {

        if (name.value.trim().length >= 3) {
            clear(name, nameError);
        }

    });


    email.addEventListener("input", () => {

        if (
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
                .test(email.value.trim())
        ) {

            clear(email, emailError);

        }

    });


    message.addEventListener("input", () => {

        if (message.value.trim().length >= 10) {
            clear(message, messageError);
        }

    });


    /* ========================================================= */
    /* SUBMIT */
    /* ========================================================= */

    form.addEventListener("submit", (e) => {

        e.preventDefault();


        const validName = validateName();

        const validEmail = validateEmail();

        const validMessage = validateMessage();


        if (!validName || !validEmail || !validMessage) {

            const firstError =
                form.querySelector(".border-red-400");

            if (firstError) {
                firstError.focus();
            }

            return;

        }


        /* Loading */

        submitBtn.disabled = true;

        submitText.textContent = "Sending...";

        submitIcon.setAttribute(
            "data-lucide",
            "loader-circle"
        );

        submitIcon.classList.add("animate-spin");


        if (window.lucide) {
            lucide.createIcons();
        }


        /* Demo success */

        setTimeout(() => {

            form.reset();

            messageCount.textContent = "0 / 500";

            nameStatus.classList.add("hidden");

            emailStatus.classList.add("hidden");

            submitBtn.disabled = false;

            submitText.textContent = "Send Enquiry";

            submitIcon.classList.remove("animate-spin");

            submitIcon.setAttribute(
                "data-lucide",
                "arrow-up-right"
            );


            success.classList.remove("hidden");


            if (window.lucide) {
                lucide.createIcons();
            }


            setTimeout(() => {

                success.classList.add("hidden");

            }, 6000);


        }, 1200);

    });

});





    // <!-- ================================================= -->
    // <!-- JAVASCRIPT -->
    // <!-- ================================================= -->

    

        document.addEventListener(
            "DOMContentLoaded",
            function () {

                const grid =
                    document.querySelector(
                        "#travelJournal .journal-grid"
                    );


                if (!grid) return;


                const observer =
                    new IntersectionObserver(
                        function (entries) {

                            entries.forEach(
                                function (entry) {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        grid.classList.add(
                                            "active"
                                        );

                                        observer.unobserve(
                                            grid
                                        );

                                    }

                                }
                            );

                        },
                        {
                            threshold: 0.15
                        }
                    );


                observer.observe(grid);

            }
        );

    


        // <!-- ================================================= -->
        //     <!-- JAVASCRIPT -->
        //     <!-- ================================================= -->

            

                document.addEventListener(
                    "DOMContentLoaded",
                    function () {

                        const card =
                            document.querySelector(
                                "#upcomingJourney .journey-card"
                            );


                        if (!card) return;


                        const observer =
                            new IntersectionObserver(
                                function (entries) {

                                    entries.forEach(
                                        function (entry) {

                                            if (
                                                entry.isIntersecting
                                            ) {

                                                card.classList.add(
                                                    "active"
                                                );


                                                observer.unobserve(
                                                    card
                                                );

                                            }

                                        }
                                    );

                                },
                                {
                                    threshold: 0.2
                                }
                            );


                        observer.observe(card);

                    }
                );

            


    //              <!-- ================================================= -->
    // <!-- JAVASCRIPT -->
    // <!-- ================================================= -->

    

        document.addEventListener(
            "DOMContentLoaded",
            function () {

                const section =
                    document.querySelector(
                        "#travelTimeline"
                    );

                if (!section) return;


                const timeline =
                    section.querySelector(
                        ".timeline-wrap"
                    );

                const items =
                    section.querySelectorAll(
                        ".timeline-item"
                    );


                if (!timeline || !items.length) {
                    return;
                }


                /* ----------------------------------------- */
                /* ITEM OBSERVER */
                /* ----------------------------------------- */

                const itemObserver =
                    new IntersectionObserver(
                        function (entries) {

                            entries.forEach(
                                function (entry) {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        entry.target.classList.add(
                                            "visible"
                                        );

                                    }

                                }
                            );

                        },
                        {
                            threshold: 0.12
                        }
                    );


                items.forEach(
                    function (item) {

                        itemObserver.observe(item);

                    }
                );


                /* ----------------------------------------- */
                /* LINE OBSERVER */
                /* ----------------------------------------- */

                const timelineObserver =
                    new IntersectionObserver(
                        function (entries) {

                            entries.forEach(
                                function (entry) {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        timeline.classList.add(
                                            "active"
                                        );

                                        timelineObserver.unobserve(
                                            timeline
                                        );

                                    }

                                }
                            );

                        },
                        {
                            threshold: 0.08
                        }
                    );


                timelineObserver.observe(timeline);

            }
        );

   


            //         <!-- ================================================= -->
            // <!-- JAVASCRIPT -->
            // <!-- ================================================= -->

           

                document.addEventListener(
                    "DOMContentLoaded",
                    function () {

                        const grid =
                            document.querySelector(
                                "#journeyStats .stats-grid"
                            );


                        if (!grid) return;


                        const observer =
                            new IntersectionObserver(
                                function (entries) {

                                    entries.forEach(
                                        function (entry) {

                                            if (
                                                entry.isIntersecting
                                            ) {

                                                grid.classList.add(
                                                    "active"
                                                );

                                                observer.unobserve(
                                                    grid
                                                );

                                            }

                                        }
                                    );

                                },
                                {
                                    threshold: 0.15
                                }
                            );


                        observer.observe(grid);

                    }
                );

            



                
    document.addEventListener("DOMContentLoaded", function () {

        const scrollBtn =
            document.getElementById("scrollExploreBtn");

        if (scrollBtn) {

            scrollBtn.addEventListener("click", function () {

                const currentSection =
                    scrollBtn.closest("section");

                if (currentSection) {

                    const nextSection =
                        currentSection.nextElementSibling;

                    if (nextSection) {

                        nextSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }

            });

        }

    });




    
document.addEventListener("DOMContentLoaded", function () {

    const exploreBtn =
        document.getElementById("dragExploreBtn");

    if (exploreBtn) {

        exploreBtn.addEventListener("click", function () {

            const currentSection =
                exploreBtn.closest("section");

            if (currentSection) {

                const nextSection =
                    currentSection.nextElementSibling;

                if (nextSection) {

                    nextSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    }

});




// <!-- ========================================================= -->
// <!-- SCROLL OBSERVER -->
// <!-- ========================================================= -->



document.addEventListener(
    "DOMContentLoaded",
    function () {

        const section =
            document.getElementById(
                "destinationStories"
            );


        if (!section) return;


        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            section.classList.add(
                                "is-visible"
                            );


                            observer.unobserve(
                                section
                            );

                        }
                    );

                },
                {
                    threshold: 0.08
                }
            );


        observer.observe(section);

    }
);





// <!-- ========================================================= -->
// <!-- MARQUEE JAVASCRIPT -->
// <!-- ========================================================= -->



document.addEventListener("DOMContentLoaded", function () {

    const marquee =
        document.getElementById(
            "wanderlyMarquee"
        );

    const track =
        document.getElementById(
            "wanderlyMarqueeTrack"
        );

    if (!marquee || !track) return;


    let position = 0;

    let speed = 0.45;

    let paused = false;

    let firstGroupWidth = 0;


    /* ----------------------------------------------------- */
    /* FIND FIRST GROUP WIDTH */
    /* ----------------------------------------------------- */

    function calculateWidth() {

        const firstGroup =
            track.children[0];

        if (!firstGroup) return;

        firstGroupWidth =
            firstGroup.offsetWidth;

    }


    /* ----------------------------------------------------- */
    /* INITIAL CALCULATION */
    /* ----------------------------------------------------- */

    calculateWidth();


    window.addEventListener(
        "resize",
        calculateWidth
    );


    /* ----------------------------------------------------- */
    /* HOVER PAUSE */
    /* ----------------------------------------------------- */

    marquee.addEventListener(
        "mouseenter",
        function () {

            paused = true;

        }
    );


    marquee.addEventListener(
        "mouseleave",
        function () {

            paused = false;

        }
    );


    /* ----------------------------------------------------- */
    /* ANIMATION */
    /* ----------------------------------------------------- */

    function animate() {

        if (!paused && firstGroupWidth > 0) {

            position -= speed;


            /*
             * When first group completely
             * leaves the screen, reset position.
             */

            if (
                Math.abs(position)
                >= firstGroupWidth
            ) {

                position = 0;

            }


            track.style.transform =
                "translate3d("
                + position
                + "px, 0, 0)";

        }


        requestAnimationFrame(
            animate
        );

    }


    /* ----------------------------------------------------- */
    /* START */
    /* ----------------------------------------------------- */

    animate();

});




// <!-- ========================================================= -->
// <!-- SCROLL OBSERVER -->
// <!-- ========================================================= -->

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const section =
            document.getElementById(
                "destinationStories"
            );


        if (!section) return;


        /* ----------------------------------------------------- */
        /* INTERSECTION OBSERVER */
        /* ----------------------------------------------------- */

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                section.classList.add(
                                    "is-visible"
                                );

                                observer.unobserve(
                                    section
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.08
                }
            );


        observer.observe(section);

    }
);



