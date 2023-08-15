$(document).ready(function () {
  const leftSidebarLink = $("left-sidebar a");

  leftSidebarLink.on("click", (e) => {
    const menu = $(e.target).closest(".item").find(".nested-menu");
    if (!menu.length) return;
    menu.toggleClass("show");
  });

  const leftSidebar = $("left-sidebar");
  const rightSidebar = $("right-sidebar");

  // const iconMenu = $(".icon-menu");
  // const iconMenuRight = $(".icon-menu-right");
  const app = $(".app");

  // const toggleLeftSidebar = leftSidebar.find(".toggle-sidebar");
  const btnToggle = $(".toggle-sidebar");

  const getParentInfo = (el) => {
    const parentEl = el.parent();
    const pos = parentEl[0].tagName.toLowerCase().split("-")[0];
    const width = parentEl.attr("data-width") || 300;
    return { parentEl, pos, width };
  };

  function toggleSidebar(parentEl, pos, width, method = "toggle") {
    const bool = parentEl[0].classList[method]("show");
    const offset = bool ? 0 : "-" + (width - 30) + "px";
    parentEl.css("margin-" + pos, offset);
  }

  btnToggle.on("click", function () {
    const { parentEl, pos, width } = getParentInfo($(this));
    toggleSidebar(parentEl, pos, width);
  });

  let idTimeout = null;

  $(".sidebar-content").hover(
    function () {
      const { parentEl, pos } = getParentInfo($(this));
      if (parentEl.hasClass("show")) return;
      app.css("margin-" + pos, "30px");
      parentEl.addClass("hover p-fixed");
      parentEl.css("margin-" + pos, -1 + "px");
      clearTimeout(idTimeout);
    },
    function () {
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

  const footerBtn = $(".footer-btn");
  const conFluid = $(".container-fluid");

  footerBtn.on("click", () => {
    rightSidebar.toggleClass("hide-element");
    leftSidebar.toggleClass("hide-element");
    conFluid.toggleClass("fluid");
  });

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
});
