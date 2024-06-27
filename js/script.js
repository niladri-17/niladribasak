gsap.registerPlugin(ScrollTrigger);
var hoverMouse = function (e) {
  e.each(function () {
    var e = $(this),
      t = !1,
      o = e.attr("offset-hover-max") || 0.7,
      n = e.attr("offset-hover-min") || 0.5,
      r = function (t, o) {
        gsap.to(e, 0.4, {
          x: 0.8 * t,
          y: 0.8 * o,
          rotation: 0.05 * t,
          ease: Power2.easeOut,
        });
      },
      a = function () {
        gsap.to(e, 0.7, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          ease: "elastic(1.2, 0.4)",
        });
      };
    $(window).on("mousemove", function (l) {
      var i = t ? o : n,
        s = { x: l.clientX, y: l.clientY - $(window).scrollTop() },
        u = e.outerWidth(),
        c = e.outerHeight(),
        m = e.offset(),
        d = { x: m.left + u / 2, y: m.top + c / 2 },
        p = s.x - d.x,
        y = s.y - d.y,
        v = !1;
      Math.sqrt(p * p + y * y) < u * i && ((v = !0), t || (t = !0), r(p, y)),
        !v && t && (a(), (t = !1));
    });
  });
};
function init() {
  gsap.registerPlugin(ScrollTrigger);
  let e = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: !0,
  });
  e.on("scroll", ScrollTrigger.update),
    ScrollTrigger.scrollerProxy("main", {
      scrollTop(t) {
        return arguments.length
          ? e.scrollTo(t, 0, 0)
          : e.scroll.instance.scroll.y;
      },
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
      pinType: document.querySelector("main").style.transform
        ? "transform"
        : "fixed",
    }),
    ScrollTrigger.addEventListener("refresh", () => e.update()),
    ScrollTrigger.refresh();
}
$(document).ready(function () {
  $(window).scroll(function () {
    this.scrollY > 20
      ? $(".navbar").addClass("sticky")
      : $(".navbar").removeClass("sticky"),
      this.scrollY > 500
        ? $(".scroll-up-btn").addClass("show")
        : $(".scroll-up-btn").removeClass("show");
  }),
    $(".scroll-up-btn").click(function () {
      $("html").animate({ scrollTop: 0 }),
        $("html").css("scrollBehavior", "auto");
    }),
    $(".navbar .menu li a").click(function () {
      $("html").css("scrollBehavior", "smooth");
    }),
    $(".menu-btn").click(function () {
      $(".navbar .menu").toggleClass("active"),
        $(".menu-btn i").toggleClass("active");
    }),
    new Typed(".typing", {
      strings: ["Programmer", "Web Developer", "Designer"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: !0,
    }),
    new Typed(".typing-2", {
      strings: ["Programmer", "Web Developer", "Designer"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: !0,
    }),
    $(".carousel").owlCarousel({
      margin: 20,
      loop: !0,
      autoplay: !0,
      autoplayTimeout: 1200,
      autoplayHoverPause: !0,
      responsive: { 0: { items: 1, nav: !1 }, 600: { items: 3, nav: !1 } },
    });
  let e = gsap.timeline({ repeat: -1 });
  e.to(".circle", { y: "-2rem", duration: 0.5, yoyo: !0 }),
    e.to(".circle", { y: 0, duration: 0.3, yoyo: !0 });
  let t = document.querySelector(".circle"),
    o = "ontouchstart" in window;
  o ||
    ((() => {
      let e = document.querySelector(".cursor-follower");
      window.addEventListener("mousemove", (t) => {
        let { target: o, x: n, y: r } = t,
          a = o?.closest("a") || o?.closest("button");
        gsap.to(e, {
          x: n - 1.7,
          y: r + 6,
          duration: 0.7,
          ease: "power4",
          opacity: a ? 0.6 : 1,
          transform: `scale(${a ? 3 : 1})`,
        });
      }),
        document.addEventListener("mouseleave", (t) => {
          gsap.to(e, { duration: 0.7, opacity: 0 });
        });
    })(),
    hoverMouse($(".circle")),
    t.addEventListener("mouseenter", function t() {
      e.pause();
    }),
    t.addEventListener("mouseleave", function t() {
      e.resume();
    }));
  let n = () => ({
    y: -100,
    duration: 0.5,
    delay: 0.1,
    opacity: 0,
    stagger: 0.1,
  });
  window.scrollY < 200 && gsap.from(".logo.welcome", n()),
    gsap.from(" a.menu-btn", n()),
    gsap.from("h1", { x: -200, duration: 1, delay: 0.8, opacity: 0 }),
    gsap.to(".scroll-up-btn", {
      y: -100,
      repeat: -1,
      duration: 0.4,
      yoyo: !0,
      ease: "power4.out",
    });
  let r = gsap.timeline({
    scrollTrigger: {
      trigger: "h1",
      start: "bottom 120",
      end: "bottom 70.8",
      scrub: 1,
    },
  });
  r.to("h1", { y: -50 }, "anim"),
    r.to(".logo.welcome", { y: -50 }, "anim"),
    r.to(".logo.niladri", { y: 0, opacity: 1 }, "anim");
  let a = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
  a.to(".logo-html", { rotation: 360, duration: 1.4 });
  let l = gsap.timeline({ repeat: -1 });
  l.to(".logo-css", { rotation: -360, duration: 1.4, delay: 1.4 });
  let i = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
  i.from(".logo-sass", { scale: 0, rotation: -360, duration: 2 }),
    i.to(".logo-sass", { scale: 0, rotation: -360, duration: 2, delay: 1 });
  let s = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
  s.to(".logo-js", { rotation: 90, duration: 0.8 }),
    s.to(".logo-js", { rotation: 180, duration: 0.8 }),
    s.to(".logo-js", { rotation: 270, duration: 0.8 }),
    s.to(".logo-js", { rotation: 360, duration: 0.8 });
  let u = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  u.to(".logo-php", { scale: 0, duration: 0.8 }),
    u.to(".logo-php", { scale: 1, duration: 1.3 });
  let c = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
  c.to(".logo-mysql", { rotationY: 360, duration: 0.8 });
  let m = document.querySelectorAll(".skill-logo");
  if (!o)
    for (let d = 0; d < m.length; d++)
      m[0].addEventListener("mouseenter", function () {
        a.pause();
      }),
        m[0].addEventListener("mouseleave", function () {
          a.resume();
        }),
        m[1].addEventListener("mouseenter", function () {
          l.pause();
        }),
        m[1].addEventListener("mouseleave", function () {
          l.resume();
        }),
        m[2].addEventListener("mouseenter", function () {
          i.pause();
        }),
        m[2].addEventListener("mouseleave", function () {
          i.resume();
        }),
        m[3].addEventListener("mouseenter", function () {
          s.pause();
        }),
        m[3].addEventListener("mouseleave", function () {
          s.resume();
        }),
        m[4].addEventListener("mouseenter", function () {
          u.pause();
        }),
        m[4].addEventListener("mouseleave", function () {
          u.resume();
        }),
        m[5].addEventListener("mouseenter", function () {
          c.pause();
        }),
        m[5].addEventListener("mouseleave", function () {
          c.resume();
        });
});
