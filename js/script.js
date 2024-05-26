gsap.registerPlugin(ScrollTrigger);

var hoverMouse = function ($el) {
  $el.each(function () {
    var $self = $(this);
    var hover = false;
    var offsetHoverMax = $self.attr("offset-hover-max") || 0.7;
    var offsetHoverMin = $self.attr("offset-hover-min") || 0.5;

    var attachEventsListener = function () {
      $(window).on("mousemove", function (e) {
        //
        var hoverArea = hover ? offsetHoverMax : offsetHoverMin;

        // cursor
        var cursor = {
          x: e.clientX,
          y: e.clientY - $(window).scrollTop(),
        };

        // size
        var width = $self.outerWidth();
        var height = $self.outerHeight();

        // position
        var offset = $self.offset();
        var elPos = {
          x: offset.left + width / 2,
          y: offset.top + height / 2,
        };

        // comparaison
        var x = cursor.x - elPos.x;
        var y = cursor.y - elPos.y;

        // dist
        var dist = Math.sqrt(x * x + y * y);

        // mutex hover
        var mutHover = false;

        // anim
        if (dist < width * hoverArea) {
          mutHover = true;
          if (!hover) {
            hover = true;
          }
          onHover(x, y);
        }

        // reset
        if (!mutHover && hover) {
          onLeave();
          hover = false;
        }
      });
    };

    var onHover = function (x, y) {
      gsap.to($self, 0.4, {
        x: x * 0.8,
        y: y * 0.8,
        //scale: .9,
        rotation: x * 0.05,
        ease: Power2.easeOut,
        // backgroundColor: red
      });
    };
    var onLeave = function () {
      gsap.to($self, 0.7, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        // ease: Elastic.easeOut.config(1.2, 0.4),
        ease: "elastic(1.2, 0.4)",
      });
    };

    attachEventsListener();
  });
};

function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}

$(document).ready(function () {
  // init();

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

    // gsap.from(".navbar .menu li", {
    //   x: -100,
    //   duration: 0.5,
    //   delay: 0.2,
    //   opacity: 0,
    //   stagger: 0.1,
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

  const circleAnim = gsap.timeline({ repeat: -1 });
  circleAnim.to(".circle", { y: `-2rem`, duration: 0.5, yoyo: true });
  circleAnim.to(".circle", { y: 0, duration: 0.3, yoyo: true });

  const circleElem = document.querySelector(".circle");

  function pauseCircleAnimation() {
    circleAnim.pause();
  }

  function resumeCircleAnimation() {
    circleAnim.resume();
  }

  const isTouchDevice = "ontouchstart" in window;

  const createCursorFollower = () => {
    const $el = document.querySelector(".cursor-follower");
    // Each time the mouse coordinates are updated,
    // we need to pass the values to gsap in order
    // to animate the element
    window.addEventListener("mousemove", (e) => {
      const { target, x, y } = e;
      // Check if target is inside a link or button
      const isTargetLinkOrBtn =
        target?.closest("a") || target?.closest("button");
      // GSAP config
      gsap.to($el, {
        x: x - 1.7,
        y: y + 6,
        duration: 0.7,
        ease: "power4", // More easing options here: https://gsap.com/docs/v3/Eases/
        opacity: isTargetLinkOrBtn ? 0.6 : 1,
        transform: `scale(${isTargetLinkOrBtn ? 3 : 1})`,
      });
    });
    // Hidding the cursor element when the mouse cursor
    // is moved out of the page
    document.addEventListener("mouseleave", (e) => {
      gsap.to($el, {
        duration: 0.7,
        opacity: 0,
      });
    });
  };
  // Only invoke the function if isn't a touch device
  if (!isTouchDevice) {
    createCursorFollower();
    hoverMouse($(".circle"));

    circleElem.addEventListener("mouseenter", pauseCircleAnimation);
    circleElem.addEventListener("mouseleave", resumeCircleAnimation);
  }

  const navAnim = () => {
    return { y: -100, duration: 0.5, delay: 0.3, opacity: 0, stagger: 0.1 };
  };

  if (window.scrollY < 200) gsap.from(".logo.welcome", navAnim());
  gsap.from(" a.menu-btn", navAnim());


 // Animation for the h1
  gsap.from("h1", { x: -200, duration: 1, delay: 0.8, opacity: 0 });

  gsap.to(".scroll-up-btn", {
    y: -100,
    repeat: -1,
    duration: 0.4,
    yoyo: true,
    ease: "power4.out",
  });


  //welcome to niladri switch animation in navbar
  // navHeight : '70.8px';
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: "h1",
      start: "bottom 120",
      end: "bottom 70.8",
      //  markers: true,
      scrub: 1,
    },
  });

  tl1.to("h1", { y: -50 }, "anim");

  tl1.to(".logo.welcome", { y: -50 }, "anim");

  tl1.to(".logo.niladri", { y: 0, opacity: 1 }, "anim");


  // Skills logos animations
  const htmlAnim = gsap.timeline({ repeat: -1, repeatDelay: 1.4});
  htmlAnim.to(".logo-html", { rotation: 360, duration: 1.4});

  const cssAnim = gsap.timeline({ repeat: -1});
  cssAnim.to(".logo-css", { rotation: -360, duration: 1.4, delay: 1.4 });

  const sassAnim = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
  sassAnim.from(".logo-sass", { scale: 0, rotation: -360, duration: 2 });
  sassAnim.to(".logo-sass", {scale: 0,rotation: -360,duration: 2,delay: 1 });

  const jsAnime = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
  jsAnime.to(".logo-js", { rotation: 90, duration: 0.8 });
  jsAnime.to(".logo-js", { rotation: 180, duration: 0.8 });
  jsAnime.to(".logo-js", { rotation: 270, duration: 0.8 });
  jsAnime.to(".logo-js", { rotation: 360, duration: 0.8 });

  const phpAnime = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  phpAnime.to(".logo-php", { scale: 0, duration: 0.8 });
  phpAnime.to(".logo-php", { scale: 1, duration: 1.3 });

  const mysqlAnime = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
  mysqlAnime.to(".logo-mysql", { rotationY: 360, duration: 0.8 });

  const skillLogos = document.querySelectorAll(".skill-logo");

  // Skills logo play pause
  if (!isTouchDevice) {
    for(let i=0 ; i < skillLogos.length ; i++){
      skillLogos[0].addEventListener("mouseenter", function(){htmlAnim.pause();});
      skillLogos[0].addEventListener("mouseleave", function(){htmlAnim.resume();});
      skillLogos[1].addEventListener("mouseenter", function(){cssAnim.pause();});
      skillLogos[1].addEventListener("mouseleave", function(){cssAnim.resume();});
      skillLogos[2].addEventListener("mouseenter", function(){sassAnim.pause();});
      skillLogos[2].addEventListener("mouseleave", function(){sassAnim.resume();});
      skillLogos[3].addEventListener("mouseenter", function(){jsAnime.pause();});
      skillLogos[3].addEventListener("mouseleave", function(){jsAnime.resume();});
      skillLogos[4].addEventListener("mouseenter", function(){phpAnime.pause();});
      skillLogos[4].addEventListener("mouseleave", function(){phpAnime.resume();});
      skillLogos[5].addEventListener("mouseenter", function(){mysqlAnime.pause();});
      skillLogos[5].addEventListener("mouseleave", function(){mysqlAnime.resume();});
    }
  }
});
