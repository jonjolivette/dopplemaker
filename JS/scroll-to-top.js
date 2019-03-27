/*
 * ----------------------------------------------------------------------------------------
 *  SCROOL TO UP JS
 * ----------------------------------------------------------------------------------------
 */
$(window).scroll(function() {
  if ($(this).scrollTop() > 50) {
    $(".scrollup").fadeIn();
  } else {
    $(".scrollup").fadeOut();
  }
});
$(".scrollup").on("click", function() {
  $("html, body").animate(
    {
      scrollTop: 0
    },
    800
  );
  return false;
});
