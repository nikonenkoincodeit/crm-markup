$(document).ready(function () {
  const leftSidebarLink = $("left-sidebar a");

  leftSidebarLink.on("click", (e) => {
    const menu = $(e.target).closest(".item").find(".nested-menu");
    if (!menu.length) return;
    menu.toggleClass("show");
  });

  const leftSidebar = $("left-sidebar");
  const rightSidebar = $("right-sidebar");

  const iconMenu = $(".icon-menu");
  const iconMenuRight = $(".icon-menu-right");
  const app = $(".app");
  const toggleLeftSidebar = leftSidebar.find(".toggle-sidebar");
  const toggleRightSidebar = rightSidebar.find(".toggle-sidebar");

  const sidebarLeftCon = leftSidebar.find(".sidebar-content");
  const sidebarRightCon = rightSidebar.find(".sidebar-content");

  let openLeftSidebar = false;
  let openRightSidebar = false;

  const sidebarLeftControl = (e, openSidebar) =>
    $(e.target).hasClass("toggle-sidebar") || openSidebar;

  toggleLeftSidebar.on("click", () => {
    console.log("click");
    openLeftSidebar = leftSidebar.toggleClass("show");
  });

  iconMenu.on("click", () => {
    openLeftSidebar = leftSidebar.toggleClass("show");
  });

  iconMenuRight.on("click", () => {
    openRightSidebar = rightSidebar.toggleClass("show");
  });

  toggleRightSidebar.on("click", () => {
    openRightSidebar = rightSidebar.toggleClass("show");
  });

  if ($(window).width() > 700) {
    let flagL = null;
    sidebarLeftCon.on("mouseenter", (e) => {
      if (sidebarLeftControl(e, openLeftSidebar) || flagL) return;
      flagL = true;
      leftSidebar.addClass("hover-over");
      leftSidebar.css("position", "fixed");
      app.css("margin-left", "30px");
    });

    sidebarLeftCon.on("mouseleave", (e) => {
      if (sidebarLeftControl(e)) return;
      leftSidebar.removeClass("hover-over");
      setTimeout(() => {
        leftSidebar.css("position", "relative");
        app.css("margin-left", "0");
        flagL = false;
      }, 1100);
    });

    let flagR = null;
    sidebarRightCon.on("mouseenter", (e) => {
      if (sidebarLeftControl(e, openRightSidebar) || flagR) return;
      flagR = true;
      rightSidebar.addClass("hover-over");
      rightSidebar.css("position", "fixed");
      app.css("margin-right", "30px");
    });

    sidebarRightCon.on("mouseleave", (e) => {
      if (sidebarLeftControl(e, openRightSidebar)) return;
      rightSidebar.removeClass("hover-over");
      setTimeout(() => {
        flagR = false;
        rightSidebar.css("position", "relative");
        app.css("margin-right", "0");
      }, 1100);
    });
  }
  const footerBtn = $(".footer-btn");
  const conFluid = $(".container-fluid");

  footerBtn.on("click", () => {
    rightSidebar.toggleClass("hide-element");
    leftSidebar.toggleClass("hide-element");
    conFluid.toggleClass("fluid");
  });

  const resizeSidebar = $(".resize-sidebar");

  let f = false;
  let sidebar = "";
  resizeSidebar.on("mousedown", (e) => {
    sidebar = e.currentTarget.dataset.sidebar;

    f = true;
  });

  window.addEventListener("mousemove", (e) => {
    if (f) {
      const el = $(sidebar + "-sidebar");
      const { x } = e.target.getBoundingClientRect();
      const { width } = el[0].getBoundingClientRect();

      console.log(e.pageX);
      el.width(e.pageX);
      // let res = 270 - e.pageX;
      // if (res < 0) res = 0;
      // el.css("margin-left", res + "px");
    }
    // f = false;
  });

  window.addEventListener("mouseup", stopResize);
  function stopResize(e) {
    f = false;
    console.log("f ", f);
  }

  // $("left-sidebar").resizable();
});
