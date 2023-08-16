$(document).ready(function () {
  const menuSidebarLink = $("menu-sidebar a");
  const menuSidebar = $("menu-sidebar");

  menuSidebarLink.on("click", (e) => {
    const menu = $(e.target).closest(".item").find(".nested-menu");
    if (!menu.length) return;
    menu.toggleClass("show");
  });

  $(".tog-btn").on("click", (e) => {
    $(e.target).toggleClass("show");
  });

  $("menu-sidebar .close-menu").on("click", (e) => {
    menuSidebar.addClass("is-hidden");
  });

  $(".logo").on("click mouseover", (e) => {
    menuSidebar.removeClass("is-hidden");
  });

  const leftSidebar = $("left-sidebar");
  const rightSidebar = $("right-sidebar");
  let calcWidthIndex = 0;

  const app = $(".app");

  const btnToggle = $(".toggle-sidebar");

  const getParentInfo = (el) => {
    const parentEl = el.parent();
    const pos = parentEl[0].tagName.toLowerCase().split("-")[0];
    const wEl = $(window).width() > 992 ? 300 : 400;
    const width = parentEl.attr("data-width") || wEl;
    return { parentEl, pos, width };
  };

  function toggleSidebar(parentEl, pos, width, method = "toggle") {
    const toggle = $(window).width() > 992;
    const classEl = $(window).width() > 992 ? "show" : "hover";
    const bool = parentEl[0].classList[method](classEl);

    if (toggle) {
      const offset = bool ? 0 : "-" + (width - 30) + "px";
      parentEl.css("margin-" + pos, offset);
    }

    let index = 0;
    let id = setInterval(() => {
      if (index <= 12) {
        calcWidthIndex = 0;
        calcWidth();
      } else {
        clearInterval(id);
      }
      index += 1;
    }, 100);
  }

  btnToggle.on("click", function () {
    const { parentEl, pos, width } = getParentInfo($(this));
    toggleSidebar(parentEl, pos, width);
  });

  const btnSidebarRight = $(".icon-menu-right");
  const btnSidebarLeft = $(".icon-left-sidebar");

  btnSidebarRight.on("click", function () {
    const { parentEl, pos, width } = getParentInfo(
      $("right-sidebar .toggle-sidebar")
    );
    toggleSidebar(parentEl, pos, width);
  });

  btnSidebarLeft.on("click", function () {
    const { parentEl, pos, width } = getParentInfo(
      $("left-sidebar .toggle-sidebar")
    );
    toggleSidebar(parentEl, pos, width);
  });

  if ($(window).width() > 992) {
    let idTimeout = null;

    $(".sidebar-content").hover(
      function (e) {
        if (e.target.closest(".coll-btn")) return;
        const { parentEl, pos } = getParentInfo($(this));
        if (parentEl.hasClass("show")) return;
        app.css("margin-" + pos, "30px");
        parentEl.addClass("hover p-fixed");
        parentEl.css("margin-" + pos, -1 + "px");
        clearTimeout(idTimeout);
      },
      function (e) {
        if (e.target.closest(".coll-btn")) return;
        const { parentEl, pos, width } = getParentInfo($(this));
        if (parentEl.hasClass("show")) return;
        parentEl.removeClass("hover");
        console.log("width ", width);
        parentEl.css("margin-" + pos, "-" + (width - 30) + "px");
        idTimeout = setTimeout(function () {
          parentEl.removeClass("p-fixed");

          app.css("margin-" + pos, 0);
        }, 1000);
      }
    );
  }
  // const footerBtn = $(".footer-btn");
  // const conFluid = $(".container-fluid");

  // footerBtn.on("click", () => {
  //   rightSidebar.toggleClass("hide-element");
  //   leftSidebar.toggleClass("hide-element");
  //   conFluid.toggleClass("fluid");
  // });

  const resizeSidebar = $(".resize-sidebar");

  let dragAndDrop = false;
  let sidebar = "";
  resizeSidebar.on("mousedown", (e) => {
    sidebar = e.currentTarget.dataset.sidebar;

    dragAndDrop = true;
  });

  window.addEventListener("mousemove", (e) => {
    if (!dragAndDrop) return;
    const el = $(sidebar + "-sidebar");
    let width = 0;
    if (sidebar === "left") {
      width = e.pageX;
    } else {
      width = $(window).width() - e.pageX;
    }
    el[0].style.width = width + "px";
    el.attr("data-width", width);
    calcWidthIndex = 0;
    calcWidth();
  });

  window.addEventListener("mouseup", stopResize);
  function stopResize(e) {
    dragAndDrop = false;
  }

  const collBtn = document.querySelectorAll("footer .coll-btn");

  [...collBtn].forEach((el) => el.addEventListener("click", closeSidebar));

  function closeSidebar(e) {
    const { parentEl, pos, width } = getParentInfo(
      $(e.target).closest(".sidebar-content")
    );
    toggleSidebar(parentEl, pos, width, "remove");
  }

  const closeSidebarLeft = $("left-sidebar .close-menu");
  const closeSidebarRight = $("right-sidebar .close-menu");

  closeSidebarLeft.on("click", (e) => {
    const { parentEl, pos, width } = getParentInfo($(e.currentTarget));
    toggleSidebar(parentEl, pos, width, "remove");
  });

  closeSidebarRight.on("click", (e) => {
    const { parentEl, pos, width } = getParentInfo($(e.currentTarget));
    toggleSidebar(parentEl, pos, width, "remove");
  });

  function calcWidth() {
    if ($(window).width() <= 576) return;
    var navwidth = 0;
    var morewidth = $(".more").outerWidth(true);

    $(".site-nav-list > li:not(.more)").each(function (e) {
      navwidth += $(this).outerWidth(true);
    });

    var availablespace = $(".site-nav-list").outerWidth(true) - morewidth;

    if (navwidth > availablespace) {
      const list = $(".site-nav-list > li:not('.more')");
      let lastItem = $(list[list.length - 1]);
      lastItem.attr("data-width", lastItem.outerWidth(true));
      $(".hide-list").append(lastItem.clone());
      lastItem.remove();

      if (calcWidthIndex <= 10) {
        calcWidth();
      }
      calcWidthIndex += 1;
    } else {
      var firstMoreElement = $(".hide-list li").last();
      if (navwidth + firstMoreElement.data("width") < availablespace) {
        $(".site-nav-list").append(firstMoreElement);
      }
    }
  }
  $(window).on("resize load", function () {
    calcWidthIndex = 0;
    calcWidth();
    hideSidebars();
  });

  function hideSidebars() {
    if ($(window).width() < 992) {
      leftSidebar.removeClass("hover d-flex").removeAttr("style");
      rightSidebar.removeClass("hover d-flex").removeAttr("style");
    }
  }

  const hideLeftSidebar = $(".hide-left-sidebar");
  const hideRightSidebar = $(".hide-right-sidebar");

  hideLeftSidebar.on("change", () => {
    leftSidebar.toggleClass("hide-element");
  });

  hideRightSidebar.on("change", () => {
    rightSidebar.toggleClass("hide-element");
  });
});
