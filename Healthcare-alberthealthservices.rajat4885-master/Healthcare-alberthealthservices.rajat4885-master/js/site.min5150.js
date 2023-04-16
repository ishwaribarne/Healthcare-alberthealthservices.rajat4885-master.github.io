/* site.min.js - last updated: Tue, 20 Jul 2021 13:26:33 -0700 */
$(document).ready(function() {

    //changing datatable's filter text 
    var tableSelector = $( "table.wb-tables" );
    if(tableSelector.length > 0){
        var json = {};
        if(tableSelector.attr("data-wb-tables") != undefined){
           json = JSON.parse(tableSelector.attr("data-wb-tables"));   
        }
        json["oLanguage"] = {"sSearch": "Search:" };  
        json = JSON.stringify(json);
        tableSelector.attr("data-wb-tables",json);
    }

    if ($("#homepage-listing").length) {
        var detailitems = parseInt($("#homepage-listing").data("detailitems"));
        var totalitems = parseInt($("#homepage-listing").data("totalitems"));
        var mobileitems = parseInt($("#homepage-listing").data("mobileitems"));
        $('#site_home_page_news .home-keyword:contains("listing-home-news")').text('News | ');
        $('#site_home_page_news .home-keyword:contains("listing-home-advisory")').text('Advisory | ');
        $('#site_home_page_news .home-keyword:contains("listing-home-editorial")').text('Editorial | ');
        $('#site_home_page_news .home-keyword:contains("listing-home-video")').text('Video | ');
        $('#site_home_page_news .home-keyword:contains("listing-home-podcast")').text('Podcast | ');
        $('#site_home_page_news .home-keyword:contains("listing-home-apple-magazine")').text('Apple Magazine | ');
        $('#homepage-listing-features .homepage-listing:first').removeClass("hidden-xs");
        for (i = 1; i <= detailitems; i++) {
            $("#homepage-listing #homepage-listing-features .homepage-listing:nth-child(" + i + ")").find(".home-thumb-link").removeClass("hidden");
            $("#homepage-listing #homepage-listing-features .homepage-listing:nth-child(" + i + ")").find(".home-title").css("min-height", "auto");
            $("#homepage-listing #homepage-listing-features .homepage-listing:nth-child(" + i + ")").find(".home-title").css("margin-bottom", "0px");
            $("#homepage-listing #homepage-listing-features .homepage-listing:nth-child(" + i + ")").find(".home-teaser").removeClass("hidden");
            $("#homepage-listing #homepage-listing-features .homepage-listing:nth-child(" + i + ")").find(".home-teaser").css("margin-top", "0px");
            $("#site_home_page_newsadvisories .homepage-listing:nth-child(" + i + ")").removeClass("hidden-xs");
        };
        $('#homepage-listing-features .homepage-listing:first').removeClass("hidden-xs");
        $('#btn_more_news').click(function() {
            $('#homepage-listing-features .homepage-listing:not(:first)').toggleClass('hidden-xs');
            if ($('#btn_more_news').html() == 'More <span class="glyphicon glyphicon-chevron-down"></span>') {
                $('#btn_more_news').html('Less <span class="glyphicon glyphicon-chevron-up"></span>');
            } else {
                $('#btn_more_news').html('More <span class="glyphicon glyphicon-chevron-down"></span>');
            }
        });
        $('#btn_more_advisory').click(function() {
            for (i = detailitems + 1; i <= totalitems - mobileitems; i++) {
                $("#site_home_page_newsadvisories .homepage-listing:nth-child(" + i + ")").toggleClass('hidden-xs');
            };
            if ($('#btn_more_advisory').html() == 'More <span class="glyphicon glyphicon-chevron-down"></span>') {
                $('#btn_more_advisory').html('Less <span class="glyphicon glyphicon-chevron-up"></span>');
            } else {
                $('#btn_more_advisory').html('More <span class="glyphicon glyphicon-chevron-down"></span>');
            }
        });
    };
    if ($(".site_search_embedfrm").length) {
        $("#wb-srch").empty();
        $("#wb-srch").addClass("gsa-search-empty");
        $("#wb-glb-mn > ul > li > a > span:first-child").removeClass("glyphicon glyphicon-search");
        if ($(".gsa-total-results").length) {
            $(".gsa-total-results").text(($(".gsa-total-results").text()).replace(/(\d)(?=(\d{3})+$)/g, '$1,'));
        };
        if ($(".gsa-pagination").length) {
            if ($(".pagination li.active").index() > 0) {
                $(".pagination li:nth-child(" + parseInt($(".pagination li.active").index()) + ")").removeClass("hidden-xs hidden-sm");
                $(".pagination li:nth-child(" + (parseInt($(".pagination li.active").index()) + 2) + ")").removeClass("hidden-xs hidden-sm");
            } else {
                for (i = 1; $(".pagination li").length > i; i++) {
                    $(".pagination li:nth-child(" + i + ")").removeClass("hidden-xs hidden-sm");
                }
            }
            $("#gsa-prev-button").empty();
            $("#gsa-next-button").empty();
        };
    };
    if ($(".wb-share").length) {
        $(document).on("wb-ready.wb-share", ".wb-share", function(event) {
            $(".site_share_link").attr('id', $(".wb-share .shr-opn").attr("id"));
        });
    };
    if ($("#informab").length) {
        $.getScript("/js/informab.min.js");
    };
    if ($(".tile-home").length) {
        $("#home_main").css("background", "url(" + $(".tile-home").data("background") + ")");
        $("#home_main").css("background-size", "100% 410px");
        $("#home_main").css("background-repeat", "no-repeat");
    };
    if (window.location.pathname.toLowerCase().split("/")[1] == "maz") {
        $("head").append('<link rel="stylesheet" href="/css/site-maz.min.css" type="text/css" />');
    };
 if($('.languages').length) {
        $('.languages a').rotaterator({
            fadeSpeed: 1300,
            pauseSpeed: 300
        });
    }
});
$(document).on("wb-ready.wb", function(event) {
    $(".wb-data-ajax-append-inited .wb-toggle").trigger("wb-init.wb-toggle").trigger("wb-init.wb-details");
    $(".wb-data-ajax-append-inited .wb-tabs").trigger("wb-init.wb-tabs");
});
(function($) {
    $.fn.extend({
        rotaterator: function(options) {

            var defaults = {
                fadeSpeed: 1300,
                pauseSpeed: 300,
                child: null
            };

            var options = $.extend(defaults, options);

            return this.each(function() {
                var o = options;
                var obj = $(this);
                var items = $(obj.children(), obj);
                items.each(function() {
                    $(this).hide();
                })
                if (!o.child) {
                    var next = $(obj).children(':first');
                } else {
                    var next = o.child;
                }
                $(next).fadeIn(o.fadeSpeed, function() {
                    $(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function() {
                        var next = $(this).next();
                        if (next.length == 0) {
                            next = $(obj).children(':first');
                        }
                        $(obj).rotaterator({
                            child: next,
                            fadeSpeed: o.fadeSpeed,
                            pauseSpeed: o.pauseSpeed
                        });
                    })
                });
            });
        }
    });
})(jQuery);