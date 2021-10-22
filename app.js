
const filterContainer = document.querySelector(".portfolio__filter");
const portfolioItemsContainer = document.querySelector(".portfolio__items");
const portfolioItems = document.querySelectorAll(".portfolio__item");

//navigation menu
(() => {
    const hamburgerBtn = document.querySelector('.hambuger__btn'),
    navMenu = document.querySelector('.nav__menu'),
    closeNavBtn = navMenu.querySelector('.close__nav__menu')

    hamburgerBtn.addEventListener('click', showNavMenu);
    closeNavBtn.addEventListener('click', hideNavMenu)

    function showNavMenu() {
        navMenu.classList.add('open')
    }

    function hideNavMenu() {
        navMenu.classList.remove('open')
        fadeOutEffect();
    }

    function fadeOutEffect() {
        document.querySelector(".fade__out__effect").classList.add('active');
        setTimeout(() => {
            document.querySelector('.fade__out__effect').classList.remove('active');
        }, 300)
    }
    
    //attach an event handler to document
    document.addEventListener('click', (e) => {
        if(e.target.classList.contains('link__item')) {
        //make sure event.target.has has a value before overriding default state
            if(e.target.hash !== "") {
                e.preventDefault();
                const hash = e.target.hash;
                console.log(`I am a ${hash}`)
                //deactivate existing active section
                document.querySelector('.section.active').classList.add('hide');
                document.querySelector('.section.active').classList.remove('active');
                //active new section
                document.querySelector(hash).classList.add('active')
                document.querySelector(hash).classList.remove('hide')
                //deactivate existing active navigation menu 
                navMenu.querySelector('.active').classList.add('outer__shadow', 'hover__in__shadow');
                navMenu.querySelector('.active').classList.remove('active', 'inner__shadow');
                if(navMenu.classList.contains('open')) {
                    //activate new nav menu
                    e.target.classList.add('active', 'inner__shadow');
                    e.target.classList.remove('outer__shadow', 'hover__in__shadow');
                    //hide nav menu
                    hideNavMenu();
                } else {
                    let navItems = navMenu.querySelectorAll('.link__item')
                    navItems.forEach((item) => {
                        if(hash === item.hash) {
                            //activate new nav menu
                            item.classList.add('active', 'inner__shadow');
                            item.classList.add('outer__shadow', 'hover__in__shadow');
                        }
                    })
                        fadeOutEffect();
                }
                window.location.hash = hash;
            }
        }
    })
    

    /*filter portfolio items*/
    filterContainer.addEventListener("click", (e) => {
        if(e.target.classList.contains('filter__item') && !e.target.classList.contains('active')) {
            filterContainer.querySelector('.active').classList.remove('outer__shadow', 'active');
            e.target.classList.add('active', 'outer__shadow');
            const target = e.target.getAttribute('data-target')
            portfolioItems.forEach((item) => {
                if(target === item.getAttribute("data-category") || target === 'all') {
                    item.classList.remove('hide');
                    item.classList.add('show')
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide')
                }
            })
        }
    })

})();


/*hide all section except active*/
(() => {

    const sections = document.querySelectorAll('.section')
    sections.forEach((section) => {
        if(!section.classList.contains('active')) {
            section.classList.add('hide')
        }
    })

})();

window.addEventListener('load', () => {
    //preloader
    document.querySelector('.preloader').classList.add('fade__out');
    setTimeout(() => {
        document.querySelector('.preloader').style.display="none"
    }, 600)
})

