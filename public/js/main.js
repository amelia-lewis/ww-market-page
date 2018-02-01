var header = $("header");
var marketPageIntro = $(".market-page-intro");
var filterBar = $(".filter-bar");
var filterBarSpacer = $(".filter-bar-spacer");
var resultsBar = $(".results-bar");
var filterBtn = $("#btn-market-filters");
var filterBtnClose = $(".btn-market-filters-close");
var filters = $(".market-filters");
var map = $(".map");

$(window).on("scroll", function(e) {
  if ($(window).scrollTop() > ($(header).outerHeight() + $(marketPageIntro).outerHeight())) {
    filterBar.addClass("fixed");
    filterBarSpacer.show();
  } else {
    filterBar.removeClass("fixed");
    filterBarSpacer.hide();
  }
});

$(window).on("scroll", function(e) {
  if ($(window).scrollTop() > ($(header).outerHeight() + $(marketPageIntro).outerHeight() + $(resultsBar).outerHeight() - 16) && $(window).width() > 1024) {
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