$(document).ready(function () {
  //  SLIDER
  var slider = $("#slider-wp .section-detail");
  slider.owlCarousel({
    autoPlay: 4500,
    navigation: false,
    navigationText: false,
    paginationNumbers: false,
    pagination: true,
    items: 1, //10 items above 1000px browser width
    itemsDesktop: [1000, 1], //5 items between 1000px and 901px
    itemsDesktopSmall: [900, 1], // betweem 900px and 601px
    itemsTablet: [600, 1], //2 items between 600 and 0
    itemsMobile: true, // itemsMobile disabled - inherit from itemsTablet option
  });

  //  LIST THUMB
  var list_thumb = $("#list-thumb");
  list_thumb.owlCarousel({
    navigation: true,
    navigationText: false,
    paginationNumbers: false,
    pagination: false,
    stopOnHover: true,
    items: 5, //10 items above 1000px browser width
    itemsDesktop: [1000, 5], //5 items between 1000px and 901px
    itemsDesktopSmall: [900, 5], // betweem 900px and 601px
    itemsTablet: [768, 5], //2 items between 600 and 0
    itemsMobile: true, // itemsMobile disabled - inherit from itemsTablet option
  });

  //  FEATURE PRODUCT
  var feature_product = $("#feature-product-wp .list-item");
  feature_product.owlCarousel({
    autoPlay: true,
    navigation: true,
    navigationText: false,
    paginationNumbers: false,
    pagination: false,
    stopOnHover: true,
    items: 4, //10 items above 1000px browser width
    itemsDesktop: [1000, 4], //5 items between 1000px and 901px
    itemsDesktopSmall: [800, 3], // betweem 900px and 601px
    itemsTablet: [600, 2], //2 items between 600 and 0
    itemsMobile: [375, 1], // itemsMobile disabled - inherit from itemsTablet option
  });

  //  SAME CATEGORY
  var same_category = $("#same-category-wp .list-item");
  same_category.owlCarousel({
    autoPlay: true,
    navigation: true,
    navigationText: false,
    paginationNumbers: false,
    pagination: false,
    stopOnHover: true,
    items: 4, //10 items above 1000px browser width
    itemsDesktop: [1000, 4], //5 items between 1000px and 901px
    itemsDesktopSmall: [800, 3], // betweem 900px and 601px
    itemsTablet: [600, 2], //2 items between 600 and 0
    itemsMobile: [375, 1], // itemsMobile disabled - inherit from itemsTablet option
  });

  //  SCROLL TOP
  $(window).scroll(function () {
    if ($(this).scrollTop() != 0) {
      $("#btn-top").stop().fadeIn(150);
    } else {
      $("#btn-top").stop().fadeOut(150);
    }
  });
  $("#btn-top").click(function () {
    $("body,html").stop().animate({ scrollTop: 0 }, 800);
  });
  var value = parseInt($("#num-order").attr("value"));
  $("#plus").click(function () {
    value++;
    $("#num-order").attr("value", value);
    update_href(value);
  });
  $("#minus").click(function () {
    if (value > 1) {
      value--;
      $("#num-order").attr("value", value);
    }
    update_href(value);
  });
});
