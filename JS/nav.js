(function($) {
  "use strict";

  jQuery(document).ready(function() {
    /*
     * ----------------------------------------------------------------------------------------
     *  CHANGE MENU BACKGROUND
     * ----------------------------------------------------------------------------------------
     */
    $(window).on("scroll", function() {
      if ($(window).scrollTop() > 200) {
        $(".header-top-area").addClass("menu-bg");
      } else {
        $(".header-top-area").removeClass("menu-bg");
      }
    });

    /*
     * ----------------------------------------------------------------------------------------
     *  FORCE NAV TO COLLAPSE (RESPONSIVENESS) "HAMBURGER"
     * ----------------------------------------------------------------------------------------
     */
    $(document).on("click", ".navbar-collapse.in", function(e) {
      if (
        $(e.target).is("a") &&
        $(e.target).attr("class") != "dropdown-toggle"
      ) {
        $(this).collapse("hide");
      }
    });
    $("body").scrollspy({
      target: ".navbar-collapse",
      offset: 195
    });
  });
})(jQuery);
