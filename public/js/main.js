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

// On load
$(window).on("load", function(e) {
	tooltip.addClass("show");
	$(".switch-text-group .label--switch-text:first-of-type").addClass("selected");
	filterBarSpacer.height(filterBar.outerHeight());

	$(".area-result").show();
	$(".area-result span").text('All');

	$(".desks-result").show();
	$(".desks-result span").text('1');

	$('#desk-number').val('1');
});

// Sticky bar on scroll
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
	if ($(window).scrollTop() > ($(header).outerHeight() + $(marketPageIntro).outerHeight()) && $(window).width() > 1024) {
		map.addClass("fixed");
	} else {
		map.removeClass("fixed");
	}
});

// Checkboxes and radios
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

// Open filters
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

// Close and apply filters
filterBtnClose.on("click", function(e) {
	filters.removeClass("show");
	$("html, body").css({overflow: "auto"});

	if($("input:radio").parent().hasClass("selected") || $("input:checkbox").parent().hasClass("selected") || $("#desk-number").val()) {
		marketBuildingContainer.addClass("filtered");
		filterBtnClear.show();
		$(".results-bar p span").text("12 buildings match your criteria");
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

	if($('#desk-number').val() >= 100 && $('#desk-number').val() < 999) {
		$(".sales-callout-mid-market").hide();
		$(".sales-callout-custom-space").show();
		$(".sales-callout-enterprise").hide();
	}

	if($('#desk-number').val() >= 1000) {
		$(".sales-callout-mid-market").hide();
		$(".sales-callout-enterprise").show();
		$(".sales-callout-custom-space").hide();
	}

	if($('input:radio[name=company-size]:checked').val() == "1–19" || $('input:radio[name=company-size]:checked').val() == "10–999") {
		$(".sales-callout-mid-market").hide();
		$(".sales-callout-custom-space").hide();
		$(".sales-callout-enterprise").hide();
		console.log("poop");
	}

	if($('input:radio[name=company-size]:checked').val() == "100–999") {
		$(".sales-callout-mid-market").hide();
		$(".sales-callout-custom-space").show();
		$(".sales-callout-enterprise").hide();
		console.log("poop");
	}

	if($('input:radio[name=company-size]:checked').val() == "1000+") {
		$(".sales-callout-mid-market").hide();
		$(".sales-callout-custom-space").hide();
		$(".sales-callout-enterprise").show();
	}

	$(".market-building-container").randomize(".col-xs-12.col-sm-6", ".building-card");
});

// Clear filters
filterBtnClear.on("click", function(e) {
	marketBuildingContainer.removeClass("filtered");
	filterBtnClear.hide();
	$('input:radio').prop('checked', false);
	$('input:checkbox').prop('checked', false);
	$("input:radio").parent().removeClass("selected");
	$("input:checkbox").parent().removeClass("selected");
	$(".results-bar p span").text("Viewing 25 of 25 locations");
	$("#desk-number").val('');
	$(".company-size-result").hide();
	$(".move-in-result").hide();
	$(".area-result").hide();
	$(".desks-result").hide();
	$(".sales-callout-mid-market").hide();
	$(".sales-callout-enterprise").hide();
	$(".sales-callout-custom-space").hide();

	$(".area-result").show();
	$(".area-result span").text('All');
});

// Close filters with escape key
$(document).keydown(function(e){
	if(e.keyCode == 27) {
		if (filters.hasClass('show')) {
			filters.removeClass('show');
			$("html, body").css({overflow: "auto"});
		}
	}
});

// Toggle between list and map view
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

// Map card
map.on("click", function(e) {
	map.toggleClass("show-card");
});

// Hide tooltip
tooltip.on("click", function(e) {
	tooltip.removeClass("show");
});

// Randomize function
(function($) {
  $.fn.randomize = function(tree, childElem) {
    return this.each(function() {
      var $this = $(this);
      if (tree) $this = $(this).find(tree);
      var unsortedElems = $this.children(childElem);
      var elems = unsortedElems.clone();
      
      elems.sort(function() { return (Math.round(Math.random())-0.5); });  

      for(var i=0; i < elems.length; i++)
        unsortedElems.eq(i).replaceWith(elems[i]);
    });    
  };
})(jQuery);