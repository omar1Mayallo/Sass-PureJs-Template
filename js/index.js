"use strict";
//Dynamic Functions
const addActiveClass = (items, e) => {
  items.forEach((el) => el.classList.remove("active"));
  e.target.classList.add("active");
};
//Navbar
const navbar = () => {
  const menuIcon = document.querySelector(".menu-icon");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarOverlay = document.querySelector(".nav-overlay");
  const toggleNavbarClass = () => {
    navbar.classList.toggle("toggle");
    navbarOverlay.classList.toggle("active");
  };
  const navLinkActivate = (e) => {
    addActiveClass(navLinks, e);
  };
  menuIcon.addEventListener("click", toggleNavbarClass);
  navbarOverlay.addEventListener("click", toggleNavbarClass);
  navLinks.forEach((el) => el.addEventListener("click", navLinkActivate));
};
navbar();
//Portfolio
const portfolio = () => {
  const portfolioTabs = document.querySelectorAll(".portfolio-tab");
  const portfolioItems = document.querySelectorAll(".all");
  const portfolioTabActivate = (e) => {
    addActiveClass(portfolioTabs, e);
  };
  function filteringItems() {
    //displayNone All Items
    portfolioItems.forEach((el) => (el.style.display = "none"));
    document.querySelectorAll(this.dataset.type).forEach((el) => {
      setTimeout(() => {
        el.style.display = "block";
      }, 1);
    });
  }
  portfolioTabs.forEach((el) => {
    el.addEventListener("click", portfolioTabActivate),
      el.addEventListener("click", filteringItems);
  });

  //Portfolio-LightBox
  const lightbox = document.querySelector(".light-box");
  // const lightBoxImg = document.querySelector(".all");
  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });
  portfolioItems.forEach((el) =>
    el.addEventListener("click", () => {
      lightbox.classList.add("active");
      const lightBoxImg = document.createElement("img");
      const portfolioImg = {...el.children};
      lightBoxImg.src = portfolioImg[0].src;
      while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild);
      }
      lightbox.appendChild(lightBoxImg);
    })
  );
};
portfolio();
//Testimonials-Carousel
const TestimonialsCarousel = () => {
  const carouselItems = document.querySelectorAll(".tesm-carousel-item");
  const carouselBtnLeft = document.querySelector(".carousel-btn--left");
  const carouselBtnRight = document.querySelector(".carousel-btn--right");
  const carouselDotsContainer = document.querySelector(".carousel-dots");

  const createDots = () => {
    carouselItems.forEach((_, i) => {
      carouselDotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dot-item" data-carousel="${i}"></button>`
      );
    });
  };

  const dotsActivate = (carouselNum) => {
    document.querySelectorAll(".dot-item").forEach((el) => {
      el.classList.remove("active");
    });
    document
      .querySelector(`.dot-item[data-carousel="${carouselNum}"]`)
      .classList.add("active");
  };
  const goToCarouselItem = (carouselNum) => {
    carouselItems.forEach((carItem, i) => {
      carItem.style.transform = `translateX(${100 * (i - carouselNum)}%)`;
    });
  };

  let curSlide = 0;
  const maxSlide = carouselItems.length;
  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToCarouselItem(curSlide);
    dotsActivate(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToCarouselItem(curSlide);
    dotsActivate(curSlide);
  };
  //Carousel Initial State
  const init = function () {
    goToCarouselItem(0);
    createDots();
    dotsActivate(0);
  };
  init();

  // Arrows Event handlers
  carouselBtnLeft.addEventListener("click", prevSlide);
  carouselBtnRight.addEventListener("click", nextSlide);
  // Dots Event handlers
  carouselDotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dot-item")) {
      const {carousel} = e.target.dataset;
      goToCarouselItem(carousel);
      dotsActivate(carousel);
    }
  });
};
TestimonialsCarousel();
