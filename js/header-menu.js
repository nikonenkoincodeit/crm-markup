jQuery(document).ready(function ($) {
  function calcWidth() {
    var navwidth = 0;
    var morewidth = $(".more").outerWidth(true);

    $(".site-nav-list > li:not(.more)").each(function () {
      navwidth += $(this).outerWidth(true);
    });
    var availablespace = $(".site-nav-list").outerWidth(true) - morewidth;

    if (navwidth > availablespace) {
      const list = $(".site-nav-list > li:not('.more')");
      let lastItem = $(list[list.length - 1]);
      lastItem.attr("data-width", lastItem.outerWidth(true));
      $(".hide-list").append(lastItem.clone());
      lastItem.remove();

      calcWidth();
    } else {
      var firstMoreElement = $(".hide-list li").last();
      if (navwidth + firstMoreElement.data("width") < availablespace) {
        $(".site-nav-list").append(firstMoreElement);
      }
    }
  }
  $(window).on("resize load", function () {
    calcWidth();
  });

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
