
"use strict";


document.addEventListener('DOMContentLoaded', () => {



    //Language

    function languageClick() {
        const header = document.querySelector('.header');
        const languageHead = document.querySelector('.header__language-head');
        const languageHeadText = document.querySelector('.header__language-head p');
        const languageBody = document.querySelector('.header__language-body');
        const languageItems = document.querySelectorAll('.header__language-body a');

        const div = document.createElement('div');
        div.classList.add('div-click');

        if (languageHead) {
            languageHead.addEventListener('click', () => {
                languageBody.classList.toggle('_active');
                if (languageBody.classList.contains('_active')) {
                    header.appendChild(div);
                } else {
                    div.remove();
                }
            });

            div.addEventListener('click', () => {
                languageBody.classList.remove('_active');
                div.remove();
            });

            for (let index = 0; index < languageItems.length; index++) {
                const element = languageItems[index];
                if (element.closest('.current-lang')) {
                    languageHeadText.textContent = element.textContent;
                }
                // element.addEventListener('click', () => {
                //     languageBody.classList.remove('_active');
                //     languageHeadText.textContent = element.textContent;
                //     div.remove();
                // });
            }
        }
    }

    languageClick();



    //=========================================================



    //Burger


    function burgerClick() {
        const burger = document.querySelector('.header__burger');
        const header = document.querySelector('.header');
        const btn = document.querySelector('.header__btn');
        const menu = document.querySelector('.header__nav');
        const body = document.querySelector('.body');

        const menuMobile = document.createElement('div');
        menuMobile.classList.add('menu-mobile');

        if (burger) {
            burger.addEventListener('click', () => {
                burger.classList.toggle('_active');
                body.classList.toggle('_active');
                header.classList.toggle('_active');
                menuMobile.classList.toggle('_active');
            });

            if (document.documentElement.clientWidth <= 920) {
                burger.insertAdjacentElement('afterend', menuMobile);
                menuMobile.insertAdjacentElement('beforeend', menu);
            }

            if (document.documentElement.clientWidth <= 730) {
                menuMobile.insertAdjacentElement('beforeend', btn);
            }
        }
    }

    burgerClick();

    //==============================================================





    //Tab Contacts

    function tabContactsHidden(tabItem) {
        for (let index = 0; index < tabItem.length; index++) {
            const element = tabItem[index];
            element.classList.remove('_active');
        }
    }

    function contentTabItemHidden(contentTabItem) {
        for (let index = 0; index < contentTabItem.length; index++) {
            const element = contentTabItem[index];
            element.classList.add('_hide');
            element.classList.add('_none');
        }
    }

    function contentTabItemShow(contentTabItem, dataItem) {
        for (let index = 0; index < contentTabItem.length; index++) {
            const element = contentTabItem[index];

            if (dataItem.dataset.tab === element.dataset.content) {
                element.classList.remove('_none');
                element.classList.remove('_hide');
            }
        }
    }

    function firstItemTabActive(tabItem, contentTabItem, i = 0) {
        tabItem[i].classList.add('_active');

        for (let index = 0; index < contentTabItem.length; index++) {
            const element = contentTabItem[index];

            if (tabItem[i].dataset.tab === element.dataset.content) {
                element.classList.remove('_none');
                element.classList.remove('_hide');
            }
        }
    }

    function clickTabContacts() {
        const tabItem = document.querySelectorAll('.tab-office-contacts__item');
        const contentTabItem = document.querySelectorAll('.content-office-contacts__item');

        if (tabItem.length > 0 || contentTabItem.length > 0) {
            contentTabItemHidden(contentTabItem);
            firstItemTabActive(tabItem, contentTabItem);

            for (let index = 0; index < tabItem.length; index++) {
                const element = tabItem[index];
                element.addEventListener('click', () => {
                    tabContactsHidden(tabItem);
                    element.classList.add('_active');
                    contentTabItemHidden(contentTabItem);
                    contentTabItemShow(contentTabItem, element);
                });
            }
        }
    }

    clickTabContacts();


    //======================================================================================================





    // Parallax Footer
    function getCoords(elem) {
        let box = elem.getBoundingClientRect();

        return {
            top: box.top + window.pageYOffset,
            left: box.left + window.pageXOffset
        };
    }

    function parallaxFooter() {
        const footer = document.querySelector('.footer');
        const footerWrap = document.querySelector('.footer__wrap');
        const page404 = document.querySelector('.offer-404');

        if (footer) {
            if (document.documentElement.clientWidth >= 992) {
                const heightFooter = footerWrap.scrollHeight;
                const windowHeight = document.documentElement.clientHeight;
                footer.style.height = `${heightFooter}px`;
                console.log(heightFooter);

                window.addEventListener('scroll', () => {
                    const positionF = footer.getBoundingClientRect().top;
                    const elementPosition = positionF + window.pageYOffset;

                    if (page404) {
                        footerWrap.classList.add('_404');
                    }
                    if (window.pageYOffset + windowHeight >= elementPosition) {
                        footerWrap.classList.add('_active');
                    } else {
                        footerWrap.classList.remove('_active');
                    }

                    if (window.pageYOffset >= elementPosition) {
                        footerWrap.classList.add('_scroll');
                    } else {
                        footerWrap.classList.remove('_scroll');
                    }
                });
            }
        }
    }

    parallaxFooter();


    //=========================================================================================================




    // Number Index

    function numberIndex(selectorItem, stop = false) {
        const numberItem = document.querySelectorAll(selectorItem);

        if (numberItem.length > 0) {
            if (stop === false) {
                for (let index = 0; index < numberItem.length; index++) {
                    const element = numberItem[index];
                    const dataNum = Number(element.dataset.number);
                    let i = 0;

                    let timer = setInterval(() => {
                        if (i <= dataNum) {
                            element.textContent = i++;
                        }
                        if (i === (dataNum + 1)) {
                            clearInterval(timer);
                        }
                    }, 1);
                }
            }
        }
    }

    function animatedNumbersIndex() {
        const realize = document.querySelector('.realize-index');
        const adventages = document.querySelector('.adventages-index');

        if (realize && adventages) {
            const elementPositionRealize = realize.offsetTop;
            const elementPositionAdventages = adventages.offsetTop;
            const windowHeight = document.documentElement.clientHeight;
            let number = windowHeight / 100 * 20;

            window.addEventListener('scroll', () => {
                if (window.pageYOffset + number >= elementPositionRealize) {
                    if (!realize.classList.contains('_stop')) {
                        numberIndex('.realize-index__number span');
                    }
                    realize.classList.add('_stop');
                } else {
                    realize.classList.remove('_stop');

                }

                if (document.documentElement.clientWidth >= 500) {
                    if (window.pageYOffset + (number - 600) >= elementPositionAdventages) {
                        if (!adventages.classList.contains('_stop')) {
                            numberIndex('.number-adventages-index__number');
                        }
                        adventages.classList.add('_stop');
                    } else {
                        adventages.classList.remove('_stop');
                    }
                } else {
                    if (window.pageYOffset + (number - 900) >= elementPositionAdventages) {
                        if (!adventages.classList.contains('_stop')) {
                            numberIndex('.number-adventages-index__number');
                        }
                        adventages.classList.add('_stop');
                    } else {
                        adventages.classList.remove('_stop');
                    }
                }
            });
        }
    }

    animatedNumbersIndex();

    //===============================================================================================================





    // Parallax 404 PAge


    function parallax404() {
        const page = document.querySelector('.offer-404');

        if (page) {
            const img = 7;
            const speed = 0.05;

            let coordX = 0;
            let coordY = 0;
            let coordXProcent = 0;
            let coordYProcent = 0;

            const distX = coordXProcent - coordX;
            const distY = coordYProcent - coordY;

            coordX = coordX + (distX * speed);
            coordY = coordY + (distY * speed);

            page.addEventListener('mousemove', (e) => {
                const pageX = page.offsetWidth;
                const pageY = page.offsetHeight;

                const positionX = e.screenX - pageX / 2;
                const positionY = e.screenY - pageY / 2;

                coordXProcent = positionX / pageX * 100;
                coordYProcent = positionY / pageY * 100;

                page.style.backgroundPosition = `${50 + coordXProcent / img}% ${50 + coordYProcent / img}%, ${50 + coordXProcent / img}% ${50 + coordYProcent / img}%, ${50 + coordXProcent / img}% ${50 + coordYProcent / img}%`;
            });
        }
    }

    parallax404();


    //=======================================================================================================================




    // Request BTN

    function goToLink(selectorElement) {
        const scrollTarget = document.querySelector(selectorElement);
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition;
        window.scrollBy({
            top: offsetPosition,
            behavior: "smooth",
        });
    }

    function requestBtnClick() {
        const requestBtn = document.querySelector('.header__btn');
        const burger = document.querySelector('.header__burger');
        const header = document.querySelector('.header');
        const menuMobile = document.querySelector('.menu-mobile');
        const body = document.querySelector('.body');
        if (requestBtn) {
            requestBtn.addEventListener('click', (e) => {
                e.preventDefault();
                burger.classList.remove('_active');
                body.classList.remove('_active');
                header.classList.remove('_active');
                menuMobile.classList.remove('_active');

                goToLink('.footer');
            });
        }
    }

    requestBtnClick();

    //==========================================================================================================================














});