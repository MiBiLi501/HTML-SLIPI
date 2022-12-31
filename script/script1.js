var $dropdown_menu = $(".dropdown-menu");
$dropdown_menu.hide();
const $window = $(window)


$window.resize(function(){
    if($(".nav-item").css("display") !== "none") $dropdown_menu.hide();
    else if($dropdown_menu.data("toggle") === "false") $dropdown_menu.show();
})

$(".hamburger").click(function(){
    if ($dropdown_menu.data("toggle") === "false"){
        $dropdown_menu.slideUp();
        $dropdown_menu.data("toggle", "true");
    }

    else{
        $dropdown_menu.slideDown();
        $dropdown_menu.data("toggle", "false");
    }
})