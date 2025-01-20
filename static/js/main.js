Splitting();
ScrollOut({
  targets: "[data-splitting]",
});

//text animation
const textrev = gsap.timeline();
textrev.from(".line span", 1.8, {
  y: 200,
  ease: "power4.out",
  delay: 1,
  skewY: 10,
  stagger: {
    amount: 0.4,
  },
});

//Couter Up Animation
var config = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};

function callback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      var $this = $(entry.target),
        countTo = $this.attr("data-count"),
        symbol = $this.attr("data-symbol") || "";

      $this
        .prop({
          countNum: 0,
        })
        .animate(
          {
            countNum: countTo,
          },
          {
            duration: 1000,
            easing: "swing",
            step: function () {
              $this.text(Math.floor(this.countNum) + symbol);
            },
            complete: function () {
              var localNum = this.countNum.toLocaleString();
              $this.text(localNum + symbol);
            },
          }
        );
      observer.unobserve(entry.target);
    }
  });
}
var observer = new IntersectionObserver(callback, config);
var counters = document.querySelectorAll(".counter-value");
counters.forEach((counter) => {
  observer.observe(counter);
});

// owlCarousel
$("#clients-slider").owlCarousel({
  margin: 25,
  smartSpeed: 1000,
  nav: false,
  loop: true,
  dots: true,
  dotsEach: true,
  autoplay: true,
  mouseDrag: true,
  touchDrag: true,
  responsive: {
    0: {
      items: 2.6,
    },
    600: {
      items: 4.6,
    },
    1000: {
      items: 6.6,
    },
  },
});

//Button effect
document.querySelectorAll(".button").forEach((button) => {
  let div = document.createElement("div"),
    letters = button.textContent.trim().split("");

  function elements(letter, index, array) {
    let element = document.createElement("span"),
      part = index >= array.length / 2 ? -1 : 1,
      position = index >= array.length / 2 ? array.length / 2 - index + (array.length / 2 - 1) : index,
      move = position / (array.length / 2),
      rotate = 1 - move;

    element.innerHTML = !letter.trim() ? "&nbsp;" : letter;
    element.style.setProperty("--move", move);
    element.style.setProperty("--rotate", rotate);
    element.style.setProperty("--part", part);

    div.appendChild(element);
  }

  letters.forEach(elements);

  button.innerHTML = div.outerHTML;

  button.addEventListener("mouseenter", (e) => {
    if (!button.classList.contains("out")) {
      button.classList.add("in");
    }
  });

  button.addEventListener("mouseleave", (e) => {
    if (button.classList.contains("in")) {
      button.classList.add("out");
      setTimeout(() => button.classList.remove("in", "out"), 950);
    }
  });
});

//background animation
var tl = gsap.timeline();
tl.to("#style_container", { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", duration: 1.3, delay: 0.2 });

tl.from(".animate-this", { duration: 1, x: -30, opacity: 0, stagger: 1, delay: 0.3 });

//ScrollTriger
window.addEventListener("load", function () {
  let revealText = document.querySelectorAll(".reveal-text");
  let results = Splitting({ target: revealText, by: "lines" });

  results.forEach((splitResult) => {
    const wrappedLines = splitResult.lines
      .map(
        (wordsArr) => `
        <span class="line"><div>
          ${wordsArr
            .map(
              (word) => `${word.outerHTML}<span class="whitespace"> 
         </span>`
            )
            .join("")}
        </div></span>`
      )
      .join("");
    splitResult.el.innerHTML = wrappedLines;
  });

  gsap.registerPlugin(ScrollTrigger);
  let revealLines = revealText.forEach((element) => {
    const lines = element.querySelectorAll(".line div");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 100%",
      },
    });
    tl.set(lines, { autoAlpha: 1 });
    tl.from(lines, 1, {
      yPercent: 100,
      ease: Power3.out,
      stagger: 0.25,
      delay: 0.1,
    });
  });
});

//Smooth Scroll effect
{
  const MathUtils = {
    lineEq: (y2, y1, x2, x1, currentVal) => {
      const m = (y2 - y1) / (x2 - x1);
      const b = y1 - m * x1;
      return m * currentVal + b;
    },
    lerp: (a, b, n) => (1 - n) * a + n * b,
    getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2),
  };
  const body = document.body;
  const docEl = document.documentElement;

  let winsize;
  const calcWinsize = () => (winsize = { width: window.innerWidth, height: window.innerHeight });
  calcWinsize();
  window.addEventListener("resize", calcWinsize);

  // Gets the mouse position. From http://www.quirksmode.org/js/events_properties.html#position
  const getMousePos = (ev) => {
    let posx = 0;
    let posy = 0;
    if (!ev) e = window.event;
    if (ev.pageX || ev.pageY) {
      posx = ev.pageX;
      posy = ev.pageY;
    } else if (ev.clientX || ev.clientY) {
      posx = ev.clientX + body.scrollLeft + docEl.scrollLeft;
      posy = ev.clientY + body.scrollTop + docEl.scrollTop;
    }
    return { x: posx, y: posy };
  };
  let mousepos = { x: winsize.width / 2, y: winsize.height / 2 };
  window.addEventListener("mousemove", (ev) => (mousepos = getMousePos(ev)));

  let activeTilt = {
    columns: true,
    letters: true,
  };

  // Custom cursor
  class Cursor {
    constructor(el) {
      this.DOM = { el: el };
      this.DOM.circle = this.DOM.el.querySelector(".cursor__inner--circle");
      this.bounds = this.DOM.circle.getBoundingClientRect();
      this.lastMousePos = { x: 0, y: 0 };
      this.scale = 1;
      this.lastScale = 1;
      this.lastY = 0;
      requestAnimationFrame(() => this.render());
    }
    render() {
      this.lastMousePos.x = MathUtils.lerp(this.lastMousePos.x, mousepos.x - this.bounds.width / 2, 0.15);
      this.lastMousePos.y = MathUtils.lerp(this.lastMousePos.y, mousepos.y - this.bounds.height / 2, 0.15);
      this.direction = this.lastY - mousepos.y > 0 ? "up" : "down";
      this.lastScale = MathUtils.lerp(this.lastScale, this.scale, 0.15);
      this.DOM.circle.style.transform = `translateX(${this.lastMousePos.x}px) translateY(${this.lastMousePos.y}px) scale(${this.lastScale})`;
      this.lastY = mousepos.y;
      requestAnimationFrame(() => this.render());
    }
    enter() {
      this.scale = 2.5;
    }
    leave() {
      this.scale = 1;
    }
    click() {
      this.lastScale = 0.4;
    }
  }

  // Custom mouse cursor
  const cursor = new Cursor(document.querySelector(".cursor"));

  // Activate the enter/leave/click methods of the custom cursor when hovering in/out on every <a> and when clicking anywhere
  [...document.querySelectorAll("a")].forEach((link) => {
    link.addEventListener("mouseenter", () => cursor.enter());
    link.addEventListener("mouseleave", () => cursor.leave());
  });
  document.addEventListener("click", () => cursor.click());
}

$(document).ready(function () {
  // Close mobile nav when clicking links
  $(".nav-link, .navbar-brand, #track_shipment").click(function () {
    $("#navbarSupportedContent").collapse("hide");
  });

  // ScrollSpy
  $("body").scrollspy({
    target: "#mainNav",
    offset: 70,
  });

  // Navbar shrink effect
  $(window).scroll(function () {
    var sc = $(window).scrollTop();
    if (sc > 0) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });
});
