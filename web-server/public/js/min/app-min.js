!(function ($, n, a) {
  $(n).ready(function () {
    $(".mobile-navigation").append($(".main-navigation .menu").clone()),
      $(".menu-toggle").click(function () {
        $(".mobile-navigation").slideToggle();
      });
    var n = $(".map"),
      a = n.data("latitude"),
      o = n.data("longitude");
    n.length &&
      n.gmap3({
        map: { options: { center: [a, o], zoom: 15, scrollwheel: !1 } },
        marker: { latLng: [a, o] },
      });
  }),
    $(a).load(function () {});
})(jQuery, document, window);
