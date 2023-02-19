// begin header styling with headroom 
let myElement = document.querySelector("header");
// construct an instance of Headroom, passing the element
let headroom  = new Headroom(myElement);
// initialise
headroom.init();

// settings pannel opened when clicking on icon
let settingsPannel = document.querySelector(".settings");
document.querySelector(".settings .icon").addEventListener("click", (e) => {
  settingsPannel.classList.toggle("opened");
});

// ***************** toggle menu  ************
let toggleMenu = document.querySelector("header .toggle-menu");
toggleMenu.onclick = (e) => {
    e.target.parentElement.parentElement.classList.toggle("show-nav");
}


// *************** begin main color changer *************
// main color
// check local storage
let colorOptions = document.querySelectorAll(".settings .colors .options li");
if (localStorage.getItem("main-color")) {
  mainColor = localStorage.getItem("main-color");
  document.documentElement.style.setProperty(
    "--main-color",
    "var(--" + mainColor + ")"
  );
  removeClass(colorOptions, "active");
  colorOptions.forEach((ele) => {
    if (ele.dataset.color == mainColor) {
      ele.classList.add("active");
    }
  });
} else {
  mainColor = colorOptions[0];
  document.documentElement.style.setProperty(
    "--main-color",
    "var(--" + mainColor + ")"
  );
  removeClass(colorOptions, "active");
  colorOptions.forEach((ele) => {
    if (ele.dataset.color == mainColor) {
      ele.classList.add("active");
    }
  });
}
// add event listner to change main color and save it to local storage
colorOptions.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    if (!ele.classList.contains("active")) {
      chnageColor(ele.dataset.color);
    }
  });
});
// change color function
function chnageColor(color) {
  document.documentElement.style.setProperty(
    "--main-color",
    "var(--" + color + ")"
  );
  removeClass(colorOptions, "active");
  colorOptions.forEach((ele) => {
    if (ele.dataset.color == color) {
      ele.classList.add("active");
    }
  });
  //   save to local storage
  localStorage.setItem("main-color", color);
}
// *************** End main color changer *************
// ******************************************************
// *************** Begin backgrounds  changer *************
// change landing page background
//  array of Images
let backgroundImgs = [
  "../imgs/01.jpg",
  "../imgs/02.jpg",
  "../imgs/03.jpg",
  "../imgs/04.jpg",
  "../imgs/05.jpg",
];
// landing page object
let landingPage = document.querySelector(".landing-page");
// duration in seconds
let duration = 10;
//
let backgroundsInterval;
// background state toggle switch from settings => static or dynamic
let changeBackgroundCheck = document.querySelector(
  ".background-state .toggle-checkbox"
);
let changeBackgroundSwitch = document.querySelector(
  ".background-state .toggle-switch"
);
// check local storage
changeBackgroundCheck.checked = false;
if (localStorage.getItem("backgrounds-state") != "static") {
  localStorage.setItem("backgrounds-state", "dynamic");
  changeBackground(landingPage, backgroundImgs, duration);
  changeBackgroundCheck.checked = true;
}

changeBackgroundSwitch.onclick = (e) => {
  if (changeBackgroundCheck.checked) {
    clearInterval(backgroundsInterval);
    localStorage.setItem("backgrounds-state", "static");
  } else {
    changeBackground(landingPage, backgroundImgs, duration);
    localStorage.setItem("backgrounds-state", "dynamic");
  }
};
//  change background function
function changeBackground(element, imgs, duration) {
  backgroundsInterval = setInterval(() => {
    element.style.backgroundImage =
      "url(" + imgs[Math.floor(Math.random() * imgs.length)] + ")";
  }, duration * 1000);
}

// *************** End Backgrounds changer *************
// ******************************************************
document.querySelector(".settings .reset-options").onclick = () => {
  // default Color
  chnageColor(colorOptions[0].dataset.color);
  //   default backgrounds state => dynamic
  if (localStorage.getItem("backgrounds-state") != "dynamic") {
    changeBackground(landingPage, backgroundImgs, duration);
    localStorage.setItem("backgrounds-state", "dynamic");
  }
};

// function to remove a classname from all elements of an array
function removeClass(elements, className) {
  elements.forEach((ele) => {
    ele.classList.remove(className);
  });
}

// skills section transition
let skillsSection = document.querySelector(".skills");
window.onscroll = () => {
  if (
    this.scrollY >
    skillsSection.offsetTop + skillsSection.offsetHeight - this.innerHeight
  ) {
    document
      .querySelectorAll(".skills .skill-progress span")
      .forEach((element) => {
        element.style.width = element.dataset.progress;
      });
  } else {
    document
      .querySelectorAll(".skills .skill-progress span")
      .forEach((element) => {
        element.style.width = 0;
      });
  }
};

// image pop up
// select images
let images = document.querySelectorAll(".gallery img");
// variable to check media query match
let x = window.matchMedia("(min-width: 760px)");
// false => pop not active yet
let imagePopUpStatus = false;
// if media matches and pop not active yet => activate
if (x.matches && !imagePopUpStatus) {
  // add event listener to pop images
  activateImagePopUp();
}
// check media matches when resizing window
window.onresize = () => {
  if (x.matches && !imagePopUpStatus) {
    // add event listener to pop images
    activateImagePopUp();
    imagePopUpStatus = true;
  }
};
function activateImagePopUp() {
  images.forEach((image) => {
    image.addEventListener("click", (e) => popUpImage(e));
  });
}
function popUpImage(e) {
  let popUpContainer = document.createElement("div");
  popUpContainer.classList.add(
    "pop-container",
    "position-fixed",
    "top-left-0",
    "w-100",
    "h-100",
    "bg-overlay",
    "z-index-top",
    "flex-center"
  );
  let popUp = document.createElement("div");
  popUp.classList.add("p-2", "w-70", "bg-white");
  let img = document.createElement("img");
  img.src = e.target.src;
  img.classList.add("mw-100");
  popUp.appendChild(img);
  popUpContainer.appendChild(popUp);
  document.body.appendChild(popUpContainer);

  // remove container when clicking outside
  popUpContainer.onclick = (e) => {
    if (e.target.classList.contains("pop-container")) {
      popUpContainer.remove();
    }
  };
}
