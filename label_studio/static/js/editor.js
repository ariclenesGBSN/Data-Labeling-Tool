var typingTimer; //timer identifier
var doneTypingInterval = 2000; //time in ms (5 seconds)
var inProgress = false;

$(function () {

    if ($("#texteditor").length > 0)
        $("#texteditor").textEditor();

    $(".insights-create-option-tab").click(function () {
        var $dropdown = $(this).siblings();
        var $icon = $(this).children("i");
        console.log($icon);
        if ($dropdown.is(":visible")) {
            $dropdown.slideUp(200);
            $icon.css("transform", "rotate(0deg)");
        } else {
            $dropdown.slideDown(200);
            $icon.css("transform", "rotate(180deg)");
        }
    });

    $("#article-title").keyup(function () {
        var value = $(this).val().trim();
        var slug = "/" + value.toLowerCase().replace(/ /g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^\w-]+/g, '') + "/";
        $("#article-slug").val(slug);
    });

    var $articleCategory = $("#article-category").select2({
        placeholder: "Article Category",
        tags: true
    });
    console.log($articleCategory.data("select2"));
    $articleCategory.data("select2").$container.addClass("gbsn-input w-100");

    $("#article-tags").keyup(function (e) {
        if (e.keyCode == 13 && $(this).val().trim().length > 0) {
            var duplicate = false;
            var newTopic = capitalizeFirstLetter($(this).val().trim());

            $(".gbsn-quote-topic-tag").each(function () {
                if ($(this).text().trim().toLowerCase() == newTopic.toLowerCase()) {
                    duplicate = true;
                    return false;
                }
            });

            if (!duplicate) {
                $(".gbsn-quote-topic-list").children("div").append('<div class="gbsn-quote-topic-tag"><span>' + newTopic + '</span><button type="button" class="gbsn-quote-topic-tag-rm"><i class="fa fa-times"></i></button> </div> <input type="hidden" name="quotetag[]" value="' + newTopic + '" />');
            }

            $(this).val("");

        }
    });

    $("#article-featured").change(function () {
        var input = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.article-featured-preview').children("div").css('backgroundImage', "url(" + e.target.result + ")");
                $('.article-featured-preview').slideDown(400);
            }

            reader.readAsDataURL(input.files[0]);
        }
    });

    $(".related-article").click(function () {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
            $(this).children("input").val(0);
        } else {
            $(this).addClass("selected");
            $(this).children("input").val(1);
        }
    });

    $("#open-preview").click(function () {
        $("html, body").addClass("no-overflow");
        $("#article-preview").fadeIn(400);
        var articleTitle = $("#article-title").val().trim();
        var articleIntroduction = $("#article-intro").val().trim();
        var articleCategory = $("#article-category").val();
        var articleContent = $("#text-editor-content").html();
        var articleTags = [];
        $(".article-tags").children().children("input").each(function () {
            articleTags.push($(this).val());
        });

        if ($(".article-featured-preview").children().css("backgroundImage") != "none")
            var articleImage = $(".article-featured-preview").children().css("backgroundImage").split('url("')[1].split('")')[0];

        var contentWordCount = articleContent.split(' ').filter(Boolean).length + articleIntroduction.split(' ').filter(Boolean).length;
        var contentReadTime = contentWordCount / 300;
        //        console.log(articleContent.split(' ').filter(Boolean));
        //        console.log(articleIntroduction.split(' ').filter(Boolean));
        contentReadTime = Math.ceil(contentReadTime);

        var $title = $("#title");
        var $intro = $(".insights-article-introduction").children("p");
        var $category = $("#category");
        var $content = $(".insights-article-content");
        var $image = $("#featured-image");
        var $readTime = $("#read-time");

        $title.html(articleTitle);
        $intro.html(articleIntroduction);
        $category.html(articleCategory);
        $content.html(articleContent);
        $image.attr("src", articleImage);
        if (contentReadTime == 0)
            $readTime.html("Less than a minute read");
        else
            $readTime.html(contentReadTime + " minute read");

        $content.find("img").removeClass("text-editor-selectable");
    });

    $(".article-preview-close").click(function () {
        $("html, body").removeClass("no-overflow");
        $("#article-preview").fadeOut(400);
    });

    $("#preview-top").click(function () {
        $("#article-preview").animate({
            scrollTop: 0
        }, 700);
    });

    $(".apply-warning-dismiss").click(function () {
        $(this).parent().parent().slideUp(200);
    });


});

function doneTyping() {
    if (!inProgress) {
        if ($('#siddraftid').length) {
            inProgress = true;
            $("#text-editor-textarea").val($("#text-editor-content").html());
            console.log("initial draft:" + $('#siddraftid').val());
            var formData = new FormData($("#dtzform")[0]);
            $.ajax({
                type: "POST",
                processData: false,
                contentType: false,
                url: "draftsave.php",
                data: formData,
                success: function (data) {
                    console.log("success");
                    draftsid = data;
                    $('#siddraftid').attr('value', draftsid);
                    d = new Date();
                    datetext = d.toTimeString().split(' ')[0];
                    $('#dtzchanges').text("Changes saved at " + datetext);
                    console.log("final draft:" + draftsid);
                    iDependOnMyParameter();
                }
            });

        }
    }
}
