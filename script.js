const cursorCircle = document.querySelector(".cursor-circle");
const cursor = document.querySelector(".cursor");
const cursorClick = document.querySelector(".cursor-click");
const link = document.querySelectorAll(".link");

const mainHead = document.querySelectorAll(".mainHeadEl");
const boxHead = document.querySelector(".boxHead");
const revelaHead = document.querySelectorAll(".revelaHead");
const burger = document.querySelector(".burger");
const span = document.querySelectorAll(".spanNav");
const linkList = document.querySelector(".link-list");
const whiteMenu = document.querySelector(".whiteMenu");
const logo = document.querySelector(".logo");
const wavyClass = document.querySelectorAll(".Textureimg");
const filterEl = document.querySelector("#turbulence");
const contImg = document.querySelector(".Contimg1");

const iconMainCont = document.querySelectorAll(".iconMainCont");

gsap.registerPlugin(ScrollTrigger);

// Locomotive scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".web-wrapper"),
  smooth: true,
  smoothMobile: true,
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".web-wrapper", {
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

  pinType: document.querySelector(".web-wrapper").style.transform
    ? "transform"
    : "fixed",
});

//// skew

let proxy = { skew: 0 },
  skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
  clamp = gsap.utils.clamp(-8, 8);

ScrollTrigger.create({
  scroller: ".web-wrapper",
  trigger: "#root",

  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -300);

    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, {
        skew: 0,
        duration: 0.4,
        ease: "power3",
        overwrite: true,
        onUpdate: () => skewSetter(proxy.skew),
      });
    }
  },
});

// make the right edge "stick" to the scroll bar. force3D: true improves performance
// gsap.set(".skewElem", { transformOrigin: "right center", force3D: true });

//// Asscent Color
let asscentColorsArray = [
  "#e89f4c",
  "#66fcf1",
  // "#F2DB14",
  "#F7E018",
  "#F27B70",
  // "#8a2be2",
];
let prevAsscentColor =
  localStorage.getItem("asscentColor") === null
    ? null
    : localStorage.getItem("asscentColor");

let randAsscent =
  asscentColorsArray[Math.floor(Math.random() * asscentColorsArray.length)];

let newAsscent = "";

// console.log(asscentColorsArray.findIndex((el) => el == `${randAsscent}`));
(function () {
  let val = null;
  if (randAsscent !== prevAsscentColor) {
    val = randAsscent;
  } else {
    let currInd = asscentColorsArray.findIndex((el) => el == `${randAsscent}`);
    // console.log(currInd);
    if (asscentColorsArray[currInd + 1] != undefined) {
      val = asscentColorsArray[currInd + 1];
    } else {
      val = asscentColorsArray[currInd - 1];
    }
  }
  newAsscent = val;
})();

if (prevAsscentColor == newAsscent) {
  console.log("caught");
}

localStorage.setItem("asscentColor", newAsscent);

// console.log(newAsscent);
const root = document.documentElement;
root.style.setProperty("--color-primary", newAsscent);

///// Scroll to Top

if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}

//////////////

window.mobileAndTabletCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

//////// page Reload Local Storage
let prevTimeStamp = null;
let currTimeStamp = null;

let shouldReloadSmall = null;
if (localStorage.getItem("shouldReloadSmall") == null) {
  if (window.innerWidth > 450) {
    localStorage.setItem("shouldReloadSmall", true);
  }
}

let shouldReloadLarge = null;
if (localStorage.getItem("shouldReloadLarge") == null) {
  if (window.innerWidth < 450) {
    localStorage.setItem("shouldReloadLarge", true);
  }
}

window.onresize = function (e) {
  prevTimeStamp = e.timeStamp;
  const timer = setInterval(() => {
    currTimeStamp = e.timeStamp;
    if (prevTimeStamp == currTimeStamp) {
      if (
        e.srcElement.innerWidth > 451 &&
        JSON.parse(localStorage.getItem("shouldReloadLarge"))
      ) {
        localStorage.setItem("shouldReloadSmall", true);
        localStorage.setItem("shouldReloadLarge", false);
        location.reload();
      }
      if (
        e.srcElement.innerWidth <= 450 &&
        JSON.parse(localStorage.getItem("shouldReloadSmall"))
      ) {
        localStorage.setItem("shouldReloadSmall", false);
        localStorage.setItem("shouldReloadLarge", true);
        location.reload();
      }
    }
  }, 500);
  // if (e.srcElement.innerWidth <= 450) {

  // }
};

// window.onresize = function (e) {
//   setInterval(() => {
//     location.reload();
//   }, 1500);
// };
let mobForCursor = window.matchMedia("(max-width: 450px)");
let myImgNodeList = contImg.attributes;
// console.log(mobForCursor.matches);
// && value.nodeName !== "style"
if (mobileAndTabletCheck() || mobForCursor.matches) {
  cursorCircle.classList.add("hide");
  cursorClick.classList.add("hide");
  cursor.classList.add("hide");

  contImg.vanillaTilt.destroy();
  // VanillaTilt.init(contImg);
  // console.log(myImgNodeList);
}
// let myImgNodeList = contImg.attributes;
// // myImgNodeList.forEach((el) => {
// //   console.log(el);
// // });

// for (const [_, value] of Object.entries(myImgNodeList)) {
//   // console.log(value);
//   // console.log(value.nodeName == "class");
//   if (value.nodeName !== "class" && value.nodeName !== "style") {
//     contImg.removeAttribute(value.nodeName);
//   }
// }

// console.log(contImg.attributes);
document.addEventListener("mousemove", (e) => {
  cursorCircle.setAttribute("style", `top: ${e.pageY}px; left: ${e.pageX}px`);
  cursorClick.setAttribute("style", `top: ${e.pageY}px; left: ${e.pageX}px`);

  cursor.setAttribute(
    "style",
    `top: ${e.pageY + 8.8}px; left: ${e.pageX + 8.8}px`
  );
});

document.addEventListener("click", () => {
  cursorClick.classList.add("expand");

  setTimeout(() => {
    cursorClick.classList.remove("expand");
  }, 500);

  cursorCircle.classList.add("shrink");

  setTimeout(() => {
    cursorCircle.classList.remove("shrink");
  }, 500);
});

// link.forEach((el, i) => {
//   el.addEventListener("mouseover", () => {
//     gsap.to(`.cursor`, {
//       scale: 7,
//     });
//   });
// });

boxHead.addEventListener("mouseenter", () => {
  // cursorCircle.classList.add("hide");
  // cursorClick.classList.add("hide");
  cursor.classList.add("cursorGrow");
  // gsap.to(`.cursor`, {
  //   scale: 17,
  // });
});
boxHead.addEventListener("mouseleave", () => {
  setTimeout(() => {
    cursor.classList.remove("cursorGrow");
    // cursorCircle.classList.remove("hide");
    // cursorClick.classList.remove("hide");
  }, 1000);
  // gsap.to(`.cursor`, {
  //   scale: 1,
  // });
});

function enlargeCursor(val = "cursorGrow") {
  // cursorCircle.classList.add("hide");
  // cursorClick.classList.add("hide");
  cursor.classList.add(`${val}`);
}
function shrinkCursor(val = "cursorGrow") {
  cursor.classList.remove(`${val}`);
  // cursorCircle.classList.remove("hide");
  // cursorClick.classList.remove("hide");
}
revelaHead.forEach((el) => {
  el.addEventListener("mouseover", () => {
    enlargeCursor();
  });
  el.addEventListener("mouseleave", () => {
    setTimeout(() => {
      shrinkCursor();
    }, 1000);
  });
});

//////// prevent Scrolling

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

///////////
let t1 = gsap.timeline();
let t2 = gsap.timeline();
// t1.addPause(2);
t1.play();

/////////////////////////////////////
// disableScroll();
// locoScroll.stop();
// t2.from(".signature", {
//   y: "-100%",
//   opacity: 0,
//   delay: 0.3,
//   duration: 0.5,
// });
// t2.from(".signatureDesig", {
//   // y: "100%",
//   opacity: 0,
//   duration: 0.8,
// });
// t2.to(".firstLayer", {
//   y: "100%",
//   duration: 1,
//   delay: 0.8,
//   opacity: 0,
//   display: "none",
//   // onComplete: () =>
//   //   document
//   //     .querySelector(".everySectionWrapper")
//   //     .classList.remove("is-loading"),
// });

// t2.eventCallback("onComplete", function () {
//   // enableScroll();
//   locoScroll.start();
//   t1.play();
// });
const firstLayer = document.querySelector(".firstLayer");

t1.to(".revelaHead", { y: "0%", duration: 0.7, stagger: 0.2 });
t1.from(".freelanceTit", {
  y: 20,
  opacity: 0,
});
// const axisArr = ["x", "y"];
// let randAxis = axisArr[Math.floor(Math.random() * axisArr.length)];
// console.log(randAxis);
// iconMainCont.forEach((el, i) => {
//   t1.from(el, {
//     width: 0,
//     height: 0,
//     duration: 1.5,
//     opacity: 0,
//   });
// });
// let randNum = Math.round(Math.random() * (14 - 9) + 9);

// t1.to(".htmlIcon", {
//   y: randNum,
//   yoyo: true,
//   repeat: -1,
//   duration: 1,
//   ease: "power2.out",
// }).to(
//   ".cssIcon",
//   {
//     x: randNum,
//     yoyo: true,
//     repeat: -1,
//     duration: 1,
//     ease: "power2.out",
//     delay: -2,
//   },
//   "-=2"
// );
t1.from(
  ".textCircle",
  {
    x: 30,
    opacity: 0,
  },
  "-=0.5"
);
t1.from(
  ".circle",
  {
    x: -30,
    opacity: 0,
  },
  "-=0.7"
);

// let bt = gsap.timeline({ paused: true, defaults: { delay: 0 } });
// let burgerClicked = false;
// // let timelineStarted = false;
// bt.to(".span1", {
//   transformOrigin: "bottom",
//   rotateZ: "45deg",
//   translateX: "8",
// });
// bt.to(".span3", {
//   transformOrigin: "bottom",
//   width: "50%",
//   translateX: "17",
//   translateY: "-11",
//   rotateZ: "45deg",
// });
// bt.to(".span2", {
//   transformOrigin: "top",
//   rotateZ: "-45deg",
// });
let mob = window.matchMedia("(max-width: 900px)");
burger.addEventListener("click", () => {
  linkList.classList.toggle("inToView");
  whiteMenu.classList.toggle("inToView");

  link.forEach((el) => {
    el.addEventListener("mouseover", () => {
      mob = window.matchMedia("(max-width: 900px)");
      if (mob.matches) {
        enlargeCursor("cursorGrowSmall");
        // console.log(mob);
      }
    });
    el.addEventListener("mouseleave", () => {
      mob = window.matchMedia("(max-width: 900px)");
      setTimeout(() => {
        if (mob.matches) {
          shrinkCursor("cursorGrowSmall");
        }
      }, 1000);
    });
  });

  span.forEach((el) => {
    el.classList.toggle("open");
  });

  // console.log("ok");
});

gsap.to(".circle ", {
  y: 14,
  yoyo: true,
  repeat: -1,
  ease: "power1.inOut",
  delay: 2,
  duration: 1.5,
});

gsap.to(".textCircle", {
  rotate: 360,
  repeat: -1,
  ease: "power1.inOut",
  duration: 10,
  paused: false,
  repeatDelay: 0,
  delay: 0,
});
gsap.from(".gtAbout", {
  x: "-100%",
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".aboutMe",
    // markers: true,
    start: "top 55%",
    end: "bottom 98%",
    scroller: ".web-wrapper",
    scrub: 1,
    // toggleActions: "play complete restart reverse",
  },
});
gsap.from(".Contimg1", {
  x: "100%",
  opacity: 0.5,
  duration: 1,
  scrollTrigger: {
    trigger: ".aboutMe",
    // markers: true,
    start: "top 55%",
    end: "bottom 98%",
    scroller: ".web-wrapper",
    scrub: 1,
  },
});

// const techimg = document.querySelectorAll(".techimg");
// techimg.forEach((el) => {
//   el.addEventListener("mouseover", () => {
//     gsap.to(el, {
//       scale: 1.1,
//       ease: "power1.inOut",
//     });
//   });
//   el.addEventListener("mouseleave", () => {
//     gsap.to(el, {
//       scale: 1,
//       ease: "power1.inOut",
//     });
//   });
// });

gsap.to(".boxHead", {
  y: "30%",
  duration: 0.1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".aboutMe",
    // markers: true,
    start: "top 85%",
    end: "bottom 98%",
    scroller: ".web-wrapper",
    scrub: 1,
  },
});

gsap.from(".gtIUse", {
  x: "-100%",
  opacity: 0,
  scrollTrigger: {
    trigger: ".iUseSec",
    // markers: true,
    start: "top 55%",
    end: "bottom 98%",
    scroller: ".web-wrapper",
    scrub: 1,
  },
});
if (mob.matches) {
  const expTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ipadSeoC",
      // markers: true,
      start: "top 100%",
      end: "bottom 90%",
      scroller: ".web-wrapper",
      scrub: 1,
      // pin: true,
      // pinspacing: true,
    },
  });
  expTl.from(".nameTxtC1", {
    x: "-100%",
    opacity: 0,
  });
  expTl.from(
    ".Seo1Img",
    {
      y: "100%",
      duration: 1,
      opacity: 0,
    },
    "+=0.4"
  );
  const expTl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".TrackOutC",
      // markers: true,
      start: "top 100%",
      end: "bottom 90%",
      scroller: ".web-wrapper",
      scrub: 1,
      // pin: true,
      // pinspacing: true,
    },
  });
  expTl2.from(".nameTxtC2", {
    x: "100%",
    opacity: 0,
  });
  expTl2.from(
    ".TrackOutImg",
    {
      y: "100%",
      duration: 1,
      opacity: 0,
    },
    "+=0.4"
  );
}
if (!mob.matches) {
  const TrackOutImg = document.querySelector(".TrackOutImg");
  TrackOutImg.addEventListener("mouseover", () => {
    gsap.to(TrackOutImg, {
      rotateY: "0deg",
    });
  });
  TrackOutImg.addEventListener("mouseleave", () => {
    gsap.to(TrackOutImg, {
      rotateY: "35deg",
    });
  });
  const Seo1Img = document.querySelector(".Seo1Img");
  Seo1Img.addEventListener("mouseover", () => {
    gsap.to(Seo1Img, {
      rotateY: "0deg",
    });
  });
  Seo1Img.addEventListener("mouseleave", () => {
    gsap.to(Seo1Img, {
      rotateY: "-35deg",
    });
  });
  const expTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ipadSeoC",
      // markers: true,
      start: "top 60%",
      end: "bottom 90%",
      scroller: ".web-wrapper",
      scrub: 1,
    },
  });
  expTl.fromTo(
    ".Seo1Img",
    {
      xPercent: -40,
      // rotateY: "10deg",
      // rotateX: "30deg",
      scale: 1,
    },
    {
      // xPercent: -60,
      rotateY: "0deg",
      // rotateX: "0deg",
      scale: 0.8,
      duration: 0.4,
    }
  );
  expTl.to(".Seo1Img", {
    x: "45%",
    duration: 0.4,
  });
  expTl.to(".Seo1Img", {
    rotateY: "-35deg",
    duration: 0.4,
  });
  expTl.fromTo(
    ".nameTxtC1",
    {
      x: "-100%",
      opacity: 0,
    },
    {
      x: "10%",
      opacity: 1,
    }
  );

  const expTl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".TrackOutC",
      // markers: true,
      start: "top 80%",
      end: "bottom 110%",
      scroller: ".web-wrapper",
      scrub: 1,
    },
  });
  expTl2.fromTo(
    ".TrackOutImg",
    {
      xPercent: 30,
      // rotateY: "10deg",
      // rotateX: "30deg",
      scale: 1,
    },
    {
      // xPercent: 0,
      // xPercent: -60,
      rotateY: "0deg",
      // rotateX: "0deg",
      scale: 0.8,
      duration: 0.4,
    }
  );
  expTl2.to(".TrackOutImg", {
    x: "-40%",
    duration: 0.4,
  });
  expTl2.to(".TrackOutImg", {
    rotateY: "33deg",
    duration: 0.4,
  });
  expTl2.fromTo(
    ".nameTxtC2",
    {
      x: "100%",
      opacity: 0,
    },
    {
      x: "-10%",
      opacity: 1,
    }
  );
  gsap.to(".cont-aboutMe", {
    y: "38%",
    duration: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".iUseSec",
      // markers: true,
      start: "top 85%",
      end: "bottom 98%",
      scroller: ".web-wrapper",
      scrub: 1,
    },
  });
}
let tilesTl = gsap.timeline({
  // duration: 0.5,
  // delay: 0,
  scrollTrigger: {
    trigger: ".iUseSec",
    // markers: true,
    start: "top 20%",
    end: "bottom 98%",
    scroller: ".web-wrapper",
    scrub: 1,
  },
});
tilesTl.from(".gsapImg", {
  // y: "38%",
  x: "-49%",
  ease: "power3.out",
});
tilesTl.from(
  ".cssImg",
  {
    y: "-58%",
    x: "-39%",
    ease: "power3.out",
  },
  0
);
tilesTl.from(
  ".photoshopImg",
  {
    y: "58%",
    x: "-39%",
    ease: "power3.out",
  },
  0
);
tilesTl.from(
  ".htmlImg",
  {
    y: "-48%",
    //  x: "-39%",
    ease: "power3.out",
  },
  0
);
tilesTl.from(
  ".javascriptImg",
  {
    scale: 0.6,
    // opacity: 0.6,
    //  x: "-39%",
    ease: "power3.out",
  },
  0
);
tilesTl.from(
  ".reactImg",
  {
    y: "39%",
    ease: "power3.out",
  },
  0
);
tilesTl.from(
  ".scssImg",
  {
    x: "39%",
    y: "-39%",
    ease: "power3.out",
  },
  0
);
tilesTl.from(
  ".illuImg",
  {
    x: "39%",
    y: "39%",
    ease: "power3.out",
  },
  0
);
tilesTl.from(
  ".pythonImg",
  {
    x: "49%",
    // y: "39%",
    ease: "power3.out",
  },
  0
);
// const ipadSeo = document.querySelector(".ipadSeo");

// const seoTl = gsap.timeline({
//   // defaults: { ease: "power3.out" },
//   scrollTrigger: {
//     trigger: ".work1",
//     markers: true,
//     start: "top 30%",
//     end: "bottom 10%",
//     scrub: 1,
//     pin: true,
//     // pinspacing: false,
//   },
// });

// seoTl.to(".seoNinjaPng", {
//   y: "-100%",
//   ease: "power1.inOut",
//   duration: 5,
// });
// seoTl.to(
//   ".seoNinjaPng2",
//   {
//     y: "-150%",
//     ease: "power1.inOut",
//     duration: 6,
//   },
//   0.5
// );
// seoTl.to(
//   ".nameTxtC1",
//   {
//     y: "-150%",
//     ease: "power1.inOut",
//     duration: 6,
//   },
//   0.5
// );
///locomotive scroll

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
