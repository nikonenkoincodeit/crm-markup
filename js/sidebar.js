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
  const toggleLeftSidebar = leftSidebar.find(".toggle-sidebar");
  const toggleRightSidebar = rightSidebar.find(".toggle-sidebar");

  let openLeftSidebar = false;
  let openRightSidebar = false;

  const sidebarLeftControl = (e, openSidebar) =>
    $(e.target).hasClass("toggle-sidebar") || openSidebar;

  toggleLeftSidebar.on("click", () => {
    openLeftSidebar = leftSidebar[0].classList.toggle("show");
  });

  iconMenu.on("click", () => {
    openLeftSidebar = leftSidebar[0].classList.toggle("show");
  });

  toggleRightSidebar.on("click", () => {
    openRightSidebar = rightSidebar[0].classList.toggle("show");
  });

  leftSidebar.on("mouseenter", (e) => {
    if (sidebarLeftControl(e, openLeftSidebar)) return;
    leftSidebar.addClass("show");
  });

  leftSidebar.on("mouseleave", (e) => {
    if (sidebarLeftControl(e, openLeftSidebar)) return;
    leftSidebar.removeClass("show");
  });

  rightSidebar.on("mouseenter", (e) => {
    if (sidebarLeftControl(e, openRightSidebar)) return;
    rightSidebar.addClass("show");
  });

  rightSidebar.on("mouseleave", (e) => {
    if (sidebarLeftControl(e, openRightSidebar)) return;
    rightSidebar.removeClass("show");
  });
});
