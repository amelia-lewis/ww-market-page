var filterBar = $(".filter-bar");
var filterBarSpacer = $(".filter-bar-spacer");
var filterBtn = $("#btn-market-filters");
var filterBtnClose = $("#btn-market-filters-close");
var filters = $(".market-filters");
var map = $(".map");

$(window).on("scroll", function(e) {
  if ($(window).scrollTop() > 446) {
    filterBar.addClass("fixed");
    filterBarSpacer.show();
  } else {
    filterBar.removeClass("fixed");
    filterBarSpacer.hide();
  }
});

$(window).on("scroll", function(e) {
  if ($(window).scrollTop() > 528) {
    map.addClass("fixed");
  } else {
    map.removeClass("fixed");
  }
});

filterBtn.on("click", function(e) {
  filters.addClass("show");
});

filterBtnClose.on("click", function(e) {
  filters.removeClass("show");
});