var DocMaster = {
    treeMenu: function() {
        $(".sidebar-nav > li > a").on('click', function(e) {
            $(this).siblings("ul").slideToggle();
            e.preventDefault();
        });
    },
    sideToggle: function() {
        $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("active");
        });
    },
    scrollToElement: function() {
        $('.sidebar-nav li a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    }
};
