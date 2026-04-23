/* ============================================================
   ZeroEmiWorks — script.js  (Netlify直置き版)
   全ページ共通JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Custom Cursor ---------- */
  var cursor = document.getElementById('cursor');
  var ring   = document.getElementById('cursorRing');
  if (cursor && ring) {
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });
    (function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();
    document.querySelectorAll('a, button, .faq-q, .faq-cat-btn').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.style.transform = 'translate(-50%,-50%) scale(2)';
        ring.style.width  = '48px';
        ring.style.height = '48px';
        ring.style.borderColor = 'rgba(93,216,138,0.6)';
      });
      el.addEventListener('mouseleave', function () {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.width  = '32px';
        ring.style.height = '32px';
        ring.style.borderColor = 'rgba(93,216,138,0.4)';
      });
    });
  }

  /* ---------- Nav Scroll ---------- */
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  /* ---------- Hamburger Menu ---------- */
  var hamburger  = document.getElementById('navHamburger');
  var mobileMenu = document.getElementById('navMobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Scroll Reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    /* IntersectionObserver非対応ブラウザはすべて表示 */
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
      });
      if (!wasOpen) { item.classList.add('open'); }
    });
  });

  /* ---------- FAQ Category Filter ---------- */
  document.querySelectorAll('.faq-cat-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.faq-cat-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      var cat = btn.dataset.cat;
      document.querySelectorAll('.faq-item').forEach(function (item) {
        if (cat === 'all' || item.dataset.cat === cat) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ---------- Contact Form ---------- */
  var submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      var nameEl  = document.getElementById('fname');
      var emailEl = document.getElementById('femail');
      var catEl   = document.getElementById('fcategory');
      var name  = nameEl  ? nameEl.value.trim()  : '';
      var email = emailEl ? emailEl.value.trim() : '';
      var cat   = catEl   ? catEl.value          : '';
      if (!name) {
        alert('お名前をご入力ください。');
        return;
      }
      if (!email || email.indexOf('@') === -1) {
        alert('有効なメールアドレスをご入力ください。');
        return;
      }
      if (!cat) {
        alert('ご相談の種類を選択してください。');
        return;
      }
      var form   = document.getElementById('contactForm');
      var thanks = document.getElementById('thanksState');
      if (form)   { form.style.display = 'none'; }
      if (thanks) { thanks.classList.add('visible'); }
    });
  }

  /* ---------- Active Nav Link ---------- */
  var path = window.location.pathname;
  var currentFile = path.split('/').pop() || 'index.html';
  if (currentFile === '') currentFile = 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile-menu a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === currentFile) {
      a.classList.add('active');
    }
  });

});
