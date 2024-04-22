// if (location.pathname.endsWith('.html')) {
//     history.replaceState({}, '', location.pathname.slice(0, -5));
// }

gsap.registerPlugin(ScrollTrigger);

$(document).ready(function () {
  $(window).scroll(function () {
    // sticky navbar on scroll script
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    // scroll-up button show/hide script
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  // slide-up script
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    // removing smooth scroll on slide-up button click
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    // applying again smooth scroll on menu items click
    $("html").css("scrollBehavior", "smooth");
  });

  // toggle menu/navbar script
  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
    // gsap.from("a.menu-btn", {
    //   x: -100,
    //   duration: 0.5,
    //   delay: 0.1,
    //   opacity: 0,
    //   stagger: 0.1,
    // });
    // gsap.to("a.menu-btn", {
    //   x: 0,
    // });
  });

  // typing text animation script
  var typed = new Typed(".typing", {
    strings: ["Programmer", "Web Developer", "Designer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  var typed = new Typed(".typing-2", {
    strings: ["Programmer", "Web Developer", "Designer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  // owl carousel script
  $(".carousel").owlCarousel({
    // strings: ["Programmer", "Web Developer", "Designer"],
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeout: 1200,
    // dots:true,
    // nav:true,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        nav: false,
      },
      // 1000:{
      //     items: 3,
      //     nav: false
      // }
    },
  });

  gsap.from(".logo , a.menu-btn", {
    y: -100,
    duration: 0.5,
    delay: 0.3,
    opacity: 0,
    stagger: 0.1,
  });

  //   let navHeight;
  //   $(window).scroll(function () {
  //     if (this.scrollY > 20%)
  //       var navHeight = document.querySelector("nav").offsetHeight;
  //   });
  let navHeight = document.querySelector("nav").offsetHeight;

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "h1",
      start: `bottom +=${navHeight}`,
      end: `bottom +=${navHeight}`,
      // markers: true,
      scrub: 1,
    },
  });
  tl.to(
    ".logo",
    {
      y: -200,
      duration: 0.5,
    }
    // "anim"
  );
  tl.from(
    ".niladri",
    {
      opacity: 0,
      y: 200,
      // duration: 0.5,
    },
    "anim"
  );
  tl.to(
    ".niladri",
    {
      opacity: 1,
      y: 0,
      // duration: 0.5,
    },
    "anim"
  );
});
