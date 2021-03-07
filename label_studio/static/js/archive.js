$(function () {

    $(".archive-ul li span").click(function () {
        if ($(this).parent().hasClass("archive-closed")) {
            $(this).parent().children("ul").finish().slideDown(200);
            $(this).children("i").removeClass("fa-folder").addClass("fa-folder-open");
            $(this).parent().removeClass("archive-closed").addClass("archive-open");
        } else {
            $(this).parent().children("ul").finish().slideUp(200);
            $(this).children("i").removeClass("fa-folder-open").addClass("fa-folder");
            $(this).parent().removeClass("archive-open").addClass("archive-closed");
        }
    });
});
