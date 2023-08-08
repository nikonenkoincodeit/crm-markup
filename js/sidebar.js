$(document).ready(function () {
  const leftSidebarLink = $("left-sidebar a");

  leftSidebarLink.on("click", (e) => {
    const menu = $(e.target).closest(".item").find(".nested-menu");
    if (!menu.length) return;
    menu.toggleClass("show");
  });

  const leftSidebar = $("left-sidebar");
  const toggleLeftSidebar = $(".toggle-sidebar");
  let openLeftSidebar = false;

  const sidebarControl = (e) =>
    $(e.target).hasClass("toggle-sidebar") || openLeftSidebar;

  toggleLeftSidebar.on("click", onToggleLeftSidebar);
  leftSidebar.on("mouseenter", (e) => {
    if (sidebarControl(e)) return;
    leftSidebar.addClass("show");
  });

  leftSidebar.on("mouseleave", (e) => {
    if (sidebarControl(e)) return;
    leftSidebar.removeClass("show");
  });

  function onToggleLeftSidebar() {
    openLeftSidebar = leftSidebar[0].classList.toggle("show");
  }
});
