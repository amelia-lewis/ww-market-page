var header = $("header");
var marketPageIntro = $(".market-page-intro");
var filterBar = $(".filter-bar");
var filterBarSpacer = $(".filter-bar-spacer");
var resultsBar = $(".results-bar");
var filterBtn = $(".btn-market-filters");
var filterBtnClose = $(".btn-market-filters-close");
var filterBtnClear = $(".btn-market-filters-clear");
var filters = $(".market-filters");
var map = $(".map");
var toggleListView = $("#list-view");
var toggleMapView = $("#map-view");
var marketBuildingContainer = $(".market-building-container");
var marketMapContainer = $(".market-map-container");
var tooltip = $(".tooltip");


$(window).on("load", function(e) {
	tooltip.addClass("show");
	$(".switch-text-group .label--switch-text:first-of-type").addClass("selected");
});

$(window).on("scroll", function(e) {
	if ($(window).scrollTop() > ($(header).outerHeight() + $(marketPageIntro).outerHeight())) {
		filterBar.addClass("fixed");
		filterBarSpacer.show();
		tooltip.removeClass("show");
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

$("input:checkbox").change(function(){
	if($(this).is(":checked")) {
		$(this).parent().addClass("selected"); 
	} else {
		$(this).parent().removeClass("selected")
	}
 });

$("input:radio").change(function(){
	if($(this).is(":checked")) {
		$(this).parent().addClass('selected'); 
		$(this).parent().siblings().removeClass("selected"); 
	} else {
		$(this).parent().removeClass("selected")
	}
 });

filterBtn.on("click", function(e) {
	filters.addClass("show");
	$("html, body").css({overflow: "hidden"});
	tooltip.removeClass("show");
});

$(".filter-results li").on("click", function(e) {
	filters.addClass("show");
	$("html, body").css({overflow: "hidden"});
	tooltip.removeClass("show");
});

filterBtnClose.on("click", function(e) {
	filters.removeClass("show");
	$("html, body").css({overflow: "auto"});

	if($("input:radio").parent().hasClass("selected") || $("input:checkbox").parent().hasClass("selected") || $("#desk-number").val()) {
		marketBuildingContainer.addClass("filtered");
		filterBtnClear.show();
		$(".results-bar p span").text("Viewing 6 of 49 locations");
	}

	if($("input:radio[name=when]").parent().hasClass("selected")) {
		$(".move-in-result").show();
		$(".move-in-result span").text($('input[name=when]:checked').val());
	}

	if($("input:checkbox").parent().hasClass("selected")) {
		$(".area-result").show();
		$(".area-result span").text($(':input[type="checkbox"]:checked').length);
	}

	if($("#desk-number").val()) {
		$(".desks-result").show();
		$(".desks-result span").text($('#desk-number').val());
	}

	if($("input:radio[name=company-size]").parent().hasClass("selected")) {
		$(".company-size-result").show();
		$(".company-size-result span").text($('input[name=company-size]:checked').val());
	}

	if($('#desk-number').val() > 10 && $('#desk-number').val() < 99) {
		$(".sales-callout-mid-market").show();
		$(".sales-callout-custom-space").hide();
		$(".sales-callout-enterprise").hide();
	}

	if($('#desk-number').val() > 100 && $('#desk-number').val() < 999) {
		$(".sales-callout-mid-market").hide();
		$(".sales-callout-custom-space").show();
		$(".sales-callout-enterprise").hide();
	}

	if($('#desk-number').val() > 1000) {
		$(".sales-callout-mid-market").hide();
		$(".sales-callout-enterprise").show();
		$(".sales-callout-custom-space").hide();
	}
});

filterBtnClear.on("click", function(e) {
	marketBuildingContainer.removeClass("filtered");
	filterBtnClear.hide();
	$('input:radio').prop('checked', false);
	$('input:checkbox').prop('checked', false);
	$("input:radio").parent().removeClass("selected");
	$("input:checkbox").parent().removeClass("selected");
	$(".results-bar p").text("Viewing 49 of 49 locations in New York City");
	$("#desk-number").val('');
	$(".company-size-result").hide();
	$(".move-in-result").hide();
	$(".area-result").hide();
	$(".desks-result").hide();
	$(".sales-callout-mid-market").hide();
	$(".sales-callout-enterprise").hide();
	$(".sales-callout-custom-space").hide();
});

$(document).keydown(function(e){
	if(e.keyCode == 27) {
		if (filters.hasClass('show')) {
			filters.removeClass('show');
		}
	}
});

toggleMapView.on("click", function(e) {
	if ($(window).width() < 1024) {
		marketBuildingContainer.hide();
		marketMapContainer.show();
	}
});

toggleListView.on("click", function(e) {
	if ($(window).width() < 1024) {
		marketBuildingContainer.show();
		marketMapContainer.hide();
	}
});

tooltip.on("click", function(e) {
	tooltip.removeClass("show");
});