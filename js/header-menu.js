jQuery(document).ready(function ($) {
  $(".site-nav-list-hide").sortable({
    handle: ".icon-drag",
  });

  const siteNavHide = $(".site-nav-hide");
  const closeBtn = $(".close-btn");

  $(".toggle-nav").on("click", (e) => {
    if (e.target.closest(".close-btn")) return;
    siteNavHide.removeClass("is-hidden");
  });

  closeBtn.on("click", () => {
    siteNavHide.addClass("is-hidden");
  });
});
