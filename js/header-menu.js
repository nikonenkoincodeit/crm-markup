jQuery(document).ready(function ($) {
  function calcWidth() {
    var navwidth = 0;
    var morewidth = $(".site-nav-list .more").outerWidth(true);
    $(".site-nav-list > li:not(.more)").each(function () {
      navwidth += $(this).outerWidth(true);
    });
    var availablespace = $(".site-nav-list").outerWidth(true) - morewidth;

    if (navwidth < availablespace) {
      var lastItem = $(".site-nav-list > li:not(.more)").last();
      lastItem.attr("data-width", lastItem.outerWidth(true));
      lastItem.prependTo($(".site-nav-list .more ul"));

      calcWidth();
    } else {
      var firstMoreElement = $(".site-nav-list li.more li").first();
      if (navwidth + firstMoreElement.data("width") < availablespace) {
        firstMoreElement.insertBefore($(".site-nav-list .more"));
      }
    }

    if ($(".more li").length > 0) {
      $(".more").css("display", "block");
    } else {
      $(".more").css("display", "none");
    }
  }
  // $(window).on("resize load", function () {
  //   calcWidth();
  // });
});
