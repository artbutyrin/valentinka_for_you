/**
 * @author Đông Ngô <dongngo.2000@gmail.com>
 * 
 */

// Курсор-картинка: встановлюємо через JS, щоб шлях завжди був правильним
(function setCursor() {
  var base = window.location.href.replace(/[#?].*$/, "").replace(/[^/]+$/, "");
  var cursorUrl = base + "assets/image/cat_3.png";
  var style = document.createElement("style");
  style.textContent = "body, body * { cursor: url(\"" + cursorUrl + "\") 16 16, auto !important; } a, button, .btn { cursor: url(\"" + cursorUrl + "\") 16 16, pointer !important; }";
  (document.head || document.documentElement).appendChild(style);
})();

// Không được thay đổi ở đây - Not to change
$(document).ready(function () {
  setTimeout(function () {
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({ overflow: "visible" });
  }, 600);
});

function start() {
  var btnYes = document.querySelector(".btn--yes");
  var btnNo = document.querySelector(".btn--no");
  var popup = document.querySelector(".modal");
  var overlay = document.querySelector(".modal__overlay");
  var btnClose = document.querySelector(".btn-close");
  var headerModar = document.querySelector(".heading-name");
  var desccriptionModar = document.querySelector(".message");

  var musicEl = document.querySelector(".music");
  var startScreen = document.getElementById("start-screen");

  function tryPlayMusic() {
    if (!musicEl) return;
    musicEl.volume = 1;
    var p = musicEl.play();
    if (p && p.catch) p.catch(function () {});
  }

  function onStartKey(e) {
    if (e.key === " " || e.keyCode === 32) {
      e.preventDefault();
      if (!startScreen || startScreen.classList.contains("is-hidden")) return;
      startScreen.classList.add("is-hidden");
      tryPlayMusic();
      window.removeEventListener("keydown", onStartKey);
    }
  }
  window.addEventListener("keydown", onStartKey);

  document.querySelector(".header").innerHTML = `
        <h1 class="header-name">
            ${CONFIGDATA.titleHeader}
            <i class="ti-heart"></i>
        </h1>
        <p class="header-description">${CONFIGDATA.descriptionHeader}
            <i class="ti-face-smile"></i>
        </p>`;
  btnYes.innerHTML = `<i class="ti-thumb-up"></i> ${CONFIGDATA.buttonYes}`;
  btnNo.innerHTML = `<i class="ti-thumb-down"></i> ${CONFIGDATA.buttonNo}`;
  headerModar.innerHTML = `${CONFIGDATA.titleModar} <i class="ti-heart"></i>`;
  desccriptionModar.innerHTML = `${CONFIGDATA.descriptionModar}`;

  btnYes.onclick = () => {
    popup.classList.add("show");
  };
  btnClose.onclick = () => {
    popup.classList.remove("show");
  };

  overlay.onclick = () => {
    popup.classList.remove("show");
  };

  var btnNoScale = 1;
  var minScale = 0.35;

  btnNo.onclick = function () {
    moveBtnNoAway(btnNo, 0, 0);
  };

  function shrinkBtnNo(btn) {
    btnNoScale = Math.max(minScale, btnNoScale * 0.88);
    btn.style.transform = "scale(" + btnNoScale + ")";
  }

  function moveBtnNoAway(btn, cursorX, cursorY) {
    var parent = btn.closest(".answer-question") || document.body;
    var rect = parent.getBoundingClientRect();
    var btnRect = btn.getBoundingClientRect();
    var cx = cursorX || (rect.left + rect.width / 2);
    var cy = cursorY || (rect.top + rect.height / 2);
    var bx = btnRect.left + btnRect.width / 2;
    var by = btnRect.top + btnRect.height / 2;
    var dx = bx - cx;
    var dy = by - cy;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    var step = 320;
    var nx = bx + (dx / len) * step;
    var ny = by + (dy / len) * step;
    var padding = 40;
    nx = Math.max(rect.left + btnRect.width / 2 + padding, Math.min(rect.right - btnRect.width / 2 - padding, nx));
    ny = Math.max(rect.top + btnRect.height / 2 + padding, Math.min(rect.bottom - btnRect.height / 2 - padding, ny));
    var leftPx = nx - rect.left - btnRect.width / 2;
    var topPx = ny - rect.top - btnRect.height / 2;
    btn.style.right = "auto";
    btn.style.left = leftPx + "px";
    btn.style.top = topPx + "px";
    shrinkBtnNo(btn);
  }

  var lastMove = 0;
  btnNo.addEventListener("mouseenter", function (e) {
    moveBtnNoAway(btnNo, e.clientX, e.clientY);
  });
  btnNo.addEventListener("mousemove", function (e) {
    var now = Date.now();
    if (now - lastMove < 80) return;
    lastMove = now;
    var r = btnNo.getBoundingClientRect();
    if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
      moveBtnNoAway(btnNo, e.clientX, e.clientY);
    }
  });
}

start();
