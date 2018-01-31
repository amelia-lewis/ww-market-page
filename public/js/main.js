var filterBar = $(".filter-bar");
var filterBarSpacer = $(".filter-bar-spacer");
var filterBtn = $("#btn-market-filters");
var filterBtnClose = $("#btn-market-filters-close");
var filters = $(".market-filters");

$(window).on("scroll", function(e) {
  if ($(window).scrollTop() > 446) {
    filterBar.addClass("fixed");
    filterBarSpacer.show();
  } else {
    filterBar.removeClass("fixed");
    filterBarSpacer.hide();
  }
});

filterBtn.on("click", function(e) {
  filters.addClass("show");
});

filterBtnClose.on("click", function(e) {
  filters.removeClass("show");
});