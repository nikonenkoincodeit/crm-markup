$(document).ready(function () {
  const leftSidebarLink = $("left-sidebar a");

  leftSidebarLink.on("click", (e) => {
    const menu = $(e.target).closest(".item").find(".nested-menu");
    if (!menu.length) return;
    menu.toggleClass("show");
  });
});
