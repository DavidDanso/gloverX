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
tl.to("#hero", { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", duration: 0.0, delay: 0.0 });

tl.from(".animate-this", { duration: 1, x: -30, opacity: 0, stagger: 1, delay: 0.3 });

// owl-Carousel
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
  /********************************************** Navigation ********************************************/
  //
  $(".nav-link").click(function () {
    $(".navbar-collapse").collapse("hide");
  });
  //
  $("body").scrollspy({
    target: "#mainNav",
    offset: 70,
  });

  //
  $(window).scroll(function () {
    var sc = $(window).scrollTop();
    if (sc > 0) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });
});

//Rellax
/*var rellax = new Rellax('.rellax');*/

/******************************************** Img-Smooth-Scroll Effect ************************************************/
{
  // helper functions
  const MathUtils = {
    // map number x from range [a, b] to [c, d]
    map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
    // linear interpolation
    lerp: (a, b, n) => (1 - n) * a + n * b,
    // Random float
    getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2),
  };

  // body element
  const body = document.body;

  // calculate the viewport size
  let winsize;
  const calcWinsize = () => (winsize = { width: window.innerWidth, height: window.innerHeight });
  calcWinsize();
  // and recalculate on resize
  window.addEventListener("resize", calcWinsize);

  // scroll position
  let docScroll;
  // for scroll speed calculation
  let lastScroll;
  let scrollingSpeed = 0;
  // scroll position update function
  const getPageYScroll = () => (docScroll = window.pageYOffset || document.documentElement.scrollTop);
  window.addEventListener("scroll", getPageYScroll);

  // Item
  class Item {
    constructor(el) {
      // the .item element
      this.DOM = { el: el };
      // the inner image
      this.DOM.image = this.DOM.el.querySelector(".content__item-img");
      this.DOM.imageWrapper = this.DOM.image.parentNode;
      this.DOM.title = this.DOM.el.querySelector(".content__item-title");
      this.renderedStyles = {
        // here we define which property will change as we scroll the page and the item is inside the viewport
        // in this case we will be:
        // - scaling the inner image
        // - translating the item's title
        // we interpolate between the previous and current value to achieve a smooth effect
        imageScale: {
          // interpolated value
          previous: 0,
          // current value
          current: 0,
          // amount to interpolate
          ease: 0.1,
          // current value setter
          setValue: () => {
            const toValue = 1.5;
            const fromValue = 1;
            const val = MathUtils.map(this.props.top - docScroll, winsize.height, -1 * this.props.height, fromValue, toValue);
            return Math.max(Math.min(val, toValue), fromValue);
          },
        },
        titleTranslationY: {
          previous: 0,
          current: 0,
          ease: 0.1,
          fromValue: Number(MathUtils.getRandomFloat(30, 400)),
          setValue: () => {
            const fromValue = this.renderedStyles.titleTranslationY.fromValue;
            const toValue = -1 * fromValue;
            const val = MathUtils.map(this.props.top - docScroll, winsize.height, -1 * this.props.height, fromValue, toValue);
            return fromValue < 0 ? Math.min(Math.max(val, fromValue), toValue) : Math.max(Math.min(val, fromValue), toValue);
          },
        },
      };
      // gets the item's height and top (relative to the document)
      this.getSize();
      // set the initial values
      this.update();
      // use the IntersectionObserver API to check when the element is inside the viewport
      // only then the element styles will be updated
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => (this.isVisible = entry.intersectionRatio > 0));
      });
      this.observer.observe(this.DOM.el);
      // init/bind events
      this.initEvents();
    }
    update() {
      // sets the initial value (no interpolation)
      for (const key in this.renderedStyles) {
        this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setValue();
      }
      // apply changes/styles
      this.layout();
    }
    getSize() {
      const rect = this.DOM.el.getBoundingClientRect();
      this.props = {
        // item's height
        height: rect.height,
        // offset top relative to the document
        top: docScroll + rect.top,
      };
    }
    initEvents() {
      window.addEventListener("resize", () => this.resize());
    }
    resize() {
      // gets the item's height and top (relative to the document)
      this.getSize();
      // on resize reset sizes and update styles
      this.update();
    }
    render() {
      // update the current and interpolated values
      for (const key in this.renderedStyles) {
        this.renderedStyles[key].current = this.renderedStyles[key].setValue();
        this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
      }

      // and apply changes
      this.layout();
    }
    layout() {
      // scale the image
      this.DOM.image.style.transform = `scale3d(${this.renderedStyles.imageScale.previous},${this.renderedStyles.imageScale.previous},1)`;
      // translate the title
      this.DOM.title.style.transform = `translate3d(0,${this.renderedStyles.titleTranslationY.previous}px,0)`;
    }
  }

  // SmoothScroll
  class SmoothScroll {
    constructor() {
      // the <main> element
      this.DOM = { main: document.querySelector("main") };
      // the scrollable element
      // we translate this element when scrolling (y-axis)
      this.DOM.scrollable = this.DOM.main.querySelector("div[data-scroll-one]");
      // the items on the page
      this.items = [];
      this.DOM.content = this.DOM.main.querySelector(".content");
      [...this.DOM.content.querySelectorAll(".content__item")].forEach((item) => this.items.push(new Item(item)));
      // here we define which property will change as we scroll the page
      // in this case we will be translating on the y-axis
      // we interpolate between the previous and current value to achieve the smooth scrolling effect
      this.renderedStyles = {
        translationY: {
          // interpolated value
          previous: 0,
          // current value
          current: 0,
          // amount to interpolate
          ease: 0.1,
          // current value setter
          // in this case the value of the translation will be the same like the document scroll
          setValue: () => docScroll,
        },
      };
      // set the body's height
      this.setSize();
      // set the initial values
      this.update();
      // the <main> element's style needs to be modified
      this.style();
      // init/bind events
      this.initEvents();
      // start the render loop
      requestAnimationFrame(() => this.render());
    }
    update() {
      // sets the initial value (no interpolation) - translate the scroll value
      for (const key in this.renderedStyles) {
        this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setValue();
      }
      // translate the scrollable element
      this.layout();
    }
    layout() {
      this.DOM.scrollable.style.transform = `translate3d(0,${-1 * this.renderedStyles.translationY.previous}px,0)`;
    }
    setSize() {
      // set the heigh of the body in order to keep the scrollbar on the page
      body.style.height = `${this.DOM.scrollable.scrollHeight}px`;
    }
    style() {
      // the <main> needs to "stick" to the screen and not scroll
      // for that we set it to position fixed and overflow hidden
      this.DOM.main.style.position = "fixed";
      this.DOM.main.style.width = this.DOM.main.style.height = "100%";
      this.DOM.main.style.top = this.DOM.main.style.left = 0;
      this.DOM.main.style.overflow = "hidden";
    }
    initEvents() {
      // on resize reset the body's height
      window.addEventListener("resize", () => this.setSize());
    }
    render() {
      // Get scrolling speed
      // Update lastScroll
      scrollingSpeed = Math.abs(docScroll - lastScroll);
      lastScroll = docScroll;

      // update the current and interpolated values
      for (const key in this.renderedStyles) {
        this.renderedStyles[key].current = this.renderedStyles[key].setValue();
        this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
      }
      // and translate the scrollable element
      this.layout();

      // for every item
      for (const item of this.items) {
        // if the item is inside the viewport call it's render function
        // this will update item's styles, based on the document scroll value and the item's position on the viewport
        if (item.isVisible) {
          if (item.insideViewport) {
            item.render();
          } else {
            item.insideViewport = true;
            item.update();
          }
        } else {
          item.insideViewport = false;
        }
      }

      // loop..
      requestAnimationFrame(() => this.render());
    }
  }

  /***********************************/
  /********** Preload stuff **********/

  // Preload images
  const preloadImages = () => {
    return new Promise((resolve, reject) => {
      imagesLoaded(document.querySelectorAll(".content__item-img"), { background: true }, resolve);
    });
  };

  // And then..
  preloadImages().then(() => {
    // Remove the loader
    document.body.classList.remove("loading");
    // Get the scroll position and update the lastScroll variable
    getPageYScroll();
    lastScroll = docScroll;
    // Initialize the Smooth Scrolling
    new SmoothScroll();
  });
}

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              // Checking if the target was focused
              return false;
            } else {
              $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          }
        );
      }
    }
  });
