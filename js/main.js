/* ================================================
   AFRIN MOURY — ARCHITECTURE PORTFOLIO
   Main JavaScript
   ================================================ */

(function () {
    'use strict';

    /* ---- DARK / LIGHT MODE ---- */
    var themeToggle = document.getElementById('theme-toggle');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            var icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }

    /* Apply saved theme on every page (also applied inline in <head> to prevent flash) */
    var savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme') || 'light';
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    /* ---- PAGE LOAD ANIMATION ---- */
    document.body.classList.add('loading');
    window.addEventListener('load', function () {
        document.body.classList.remove('loading');
    });

    /* ---- MOBILE MENU TOGGLE ---- */
    var menuToggle = document.querySelector('.js-menu-toggle');
    var menu = document.querySelector('.menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function () {
            menu.classList.toggle('menu--open');
        });
    }

    /* Close mobile menu when a nav link is clicked */
    var mobileLinks = document.querySelectorAll('.menu__wrap .menu__list__item__link');
    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (menu) menu.classList.remove('menu--open');
        });
    });

    /* ---- ACTIVE LINK HIGHLIGHTING ---- */
    var currentFilename = window.location.pathname.split('/').pop() || 'index.html';

    /* Main nav: Projects / About / Contact */
    var mainNavLinks = document.querySelectorAll('.menu__list__item__link');
    mainNavLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (!href) return;
        var linkFilename = href.split('/').pop();

        if (currentFilename === linkFilename) {
            link.classList.add('cc-active');
        }
        /* treat empty filename as index.html */
        if ((currentFilename === '' || currentFilename === 'index.html') &&
            (linkFilename === 'index.html' || link.textContent.trim() === 'Projects')) {
            link.classList.add('cc-active');
        }
    });

    /* Projects sidebar list */
    var projectLinks = document.querySelectorAll('.projects-menu .menu__list__item__link');
    projectLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (!href) return;
        if (currentFilename === href.split('/').pop()) {
            link.classList.add('active-link');
        }
    });

    /* ---- LIGHTBOX ---- */
    var galleryImages = document.querySelectorAll('.gallery-item img');
    if (galleryImages.length === 0) return;

    /* Build lightbox DOM */
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.innerHTML =
        '<button class="lightbox__close" aria-label="Close">&#10005;</button>' +
        '<button class="lightbox__prev" aria-label="Previous">&#8249;</button>' +
        '<img class="lightbox__img" src="" alt="" />' +
        '<button class="lightbox__next" aria-label="Next">&#8250;</button>';
    document.body.appendChild(lb);

    var lbImg   = lb.querySelector('.lightbox__img');
    var lbClose = lb.querySelector('.lightbox__close');
    var lbPrev  = lb.querySelector('.lightbox__prev');
    var lbNext  = lb.querySelector('.lightbox__next');
    var currentIdx = 0;
    var srcList = [];

    galleryImages.forEach(function (img) {
        srcList.push(img.src);
    });

    function openAt(idx) {
        currentIdx = (idx + srcList.length) % srcList.length;
        lbImg.src = srcList[currentIdx];
        lbImg.alt = galleryImages[currentIdx].alt || '';
        lb.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lb.classList.remove('is-active');
        lbImg.src = '';
        document.body.style.overflow = '';
    }

    galleryImages.forEach(function (img, i) {
        img.addEventListener('click', function () { openAt(i); });
    });

    lbClose.addEventListener('click', close);
    lb.addEventListener('click', function (e) {
        if (e.target === lb) close();
    });

    lbPrev.addEventListener('click', function (e) {
        e.stopPropagation();
        openAt(currentIdx - 1);
    });

    lbNext.addEventListener('click', function (e) {
        e.stopPropagation();
        openAt(currentIdx + 1);
    });

    document.addEventListener('keydown', function (e) {
        if (!lb.classList.contains('is-active')) return;
        if (e.key === 'Escape')      close();
        if (e.key === 'ArrowLeft')   openAt(currentIdx - 1);
        if (e.key === 'ArrowRight')  openAt(currentIdx + 1);
    });

})();
