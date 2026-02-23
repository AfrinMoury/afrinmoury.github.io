/* ================================================
   AFRIN MOURY — SHARED PARTIALS
   Injects header and footer into every page.
   Works on file://, GitHub Pages, and any server.
   ================================================ */

(function () {
    'use strict';

    /* Detect if we are inside the /projects/ sub-folder */
    var path = window.location.pathname.replace(/\\/g, '/');
    var inProjects = path.indexOf('/projects/') !== -1;

    /* root → back to src root   |   proj → path to projects/ */
    var root = inProjects ? '../' : '';
    var proj = inProjects ? '' : 'projects/';

    /* ---- BUILD HEADER ---- */
    var headerEl = document.getElementById('site-header');
    if (headerEl) {
        headerEl.outerHTML =
            '<header class="header">\n' +
            '    <div class="header__content">\n' +
            '        <a href="' + root + 'index.html" class="header__title">Afrin Moury</a>\n' +
            '        <p class="header__tagline">Architecture Graduate</p>\n' +
            '\n' +
            '        <div class="menu">\n' +
            '            <div class="menu__toggle js-menu-toggle"><div class="menu__toggle__icon"><span></span></div></div>\n' +
            '            <div class="menu__wrap">\n' +
            '                <ul class="menu__list">\n' +
            '                    <li class="menu__list__item"><a href="' + root + 'index.html" class="menu__list__item__link">Projects</a></li>\n' +
            '                    <li class="menu__list__item"><a href="' + root + 'about.html" class="menu__list__item__link">About</a></li>\n' +
            '                    <li class="menu__list__item"><a href="' + root + 'contact.html" class="menu__list__item__link">Contact</a></li>\n' +
            '                </ul>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '\n' +
            '        <div class="projects-menu">\n' +
            '            <ul class="menu__list">\n' +
            '                <li class="menu__list__item"><a href="' + proj + 'recycle-park.html" class="menu__list__item__link">Recycling Park</a></li>\n' +
            '                <li class="menu__list__item"><a href="' + proj + 'ember-negative.html" class="menu__list__item__link">Ember Negative</a></li>\n' +
            '                <li class="menu__list__item"><a href="' + proj + 'floating-horizon.html" class="menu__list__item__link">Floating Horizon</a></li>\n' +
            '                <li class="menu__list__item"><a href="' + proj + 'skywalker.html" class="menu__list__item__link">Skywalker</a></li>\n' +
            '                <li class="menu__list__item"><a href="' + proj + 'nautical.html" class="menu__list__item__link">Nautical</a></li>\n' +
            '                <li class="menu__list__item"><a href="' + proj + 'interplay.html" class="menu__list__item__link">Interplay</a></li>\n' +
            '                <li class="menu__list__item"><a href="' + proj + 'medtech.html" class="menu__list__item__link">Medtech</a></li>\n' +
            '                <li class="menu__list__item"><a href="' + proj + 'professional-work.html" class="menu__list__item__link">Professional Work</a></li>\n' +
            '            </ul>\n' +
            '        </div>\n' +
            '\n' +
            '        <div class="header__lower">\n' +
            '            <div class="theme-row">\n' +
            '                <span class="theme-label">Click to change theme</span>\n' +
            '                <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode"><i class="fas fa-moon"></i></button>\n' +
            '            </div>\n' +
            '            <ul class="socials">\n' +
            '                <li class="socials__item"><a href="https://www.linkedin.com" target="_blank" rel="noopener" class="socials__item__link" title="LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a></li>\n' +
            '                <li class="socials__item"><a href="https://www.instagram.com" target="_blank" rel="noopener" class="socials__item__link" title="Instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a></li>\n' +
            '                <li class="socials__item"><a href="mailto:afrinjahan021019@gmail.com" class="socials__item__link" title="Email"><i class="fas fa-envelope" aria-hidden="true"></i></a></li>\n' +
            '            </ul>\n' +
            '            <div class="footer__copyright"><span>\u00a9 2026 Afrin Moury</span></div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</header>';
    }

    /* ---- BUILD FOOTER ---- */
    var footerEl = document.getElementById('site-footer');
    if (footerEl) {
        footerEl.outerHTML =
            '<footer class="footer">\n' +
            '    <ul class="socials">\n' +
            '        <li class="socials__item"><a href="https://www.linkedin.com" target="_blank" rel="noopener" class="socials__item__link" title="LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a></li>\n' +
            '        <li class="socials__item"><a href="https://www.instagram.com" target="_blank" rel="noopener" class="socials__item__link" title="Instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a></li>\n' +
            '        <li class="socials__item"><a href="mailto:afrinjahan021019@gmail.com" class="socials__item__link" title="Email"><i class="fas fa-envelope" aria-hidden="true"></i></a></li>\n' +
            '    </ul>\n' +
            '    <div class="footer__copyright"><span>\u00a9 2026 Afrin Moury</span></div>\n' +
            '</footer>';
    }

})();
