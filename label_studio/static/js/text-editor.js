$(function () {

    $.fn.textEditor = function () {
        var $this = $(this);
        $this.append('<div class="text-editor"></div>');
        $this.children().append('<div class="text-editor"> <div class="text-editor-header d-flex align-items-center flex-wrap"> <div class="d-flex align-items-center"> <button type="button" class="text-editor-header-btn" id="bold" title="Bold"><img src="/img/text-editor-imgs/bold.svg"/></button> <button type="button" class="text-editor-header-btn" id="italic" title="Italic"><img src="/img/text-editor-imgs/italic.svg"/></button> <button type="button" class="text-editor-header-btn" id="underline" title="Underline"><img src="/img/text-editor-imgs/underline.svg"/></button> <button type="button" class="text-editor-header-btn" id="strikeThrough" title="Strike through"><img src="/img/text-editor-imgs/strikethrough.svg"/></button> </div><div class="d-flex align-items-center"> <button type="button" class="text-editor-header-btn" id="insertOrderedList" title="Ordered List"><img src="/img/text-editor-imgs/ordered-list.svg"/></button> <button type="button" class="text-editor-header-btn" id="insertUnorderedList" title="Unordered List"><img src="/img/text-editor-imgs/unordered-list.svg"/></button> </div><div class="d-flex align-items-center"> <button type="button" class="text-editor-header-btn" id="justifyLeft" title="Justify Left"><img src="/img/text-editor-imgs/justify-left.svg"/></button> <button type="button" class="text-editor-header-btn" id="justifyCenter" title="Justify Center"><img src="/img/text-editor-imgs/justify-center.svg"/></button> <button type="button" class="text-editor-header-btn" id="justifyRight" title="Justify Right"><img src="/img/text-editor-imgs/justify-right.svg"/></button> <button type="button" class="text-editor-header-btn" id="justifyFull" title="Justify Full"><img src="/img/text-editor-imgs/justify-full.svg"/></button> </div><div class="d-flex align-items-center"> <button type="button" class="text-editor-header-btn" id="h1" title="Heading 1"><img src="/img/text-editor-imgs/h1.svg"/></button> <button type="button" class="text-editor-header-btn" id="h2" title="Heading 2"><img src="/img/text-editor-imgs/h2.svg"/></button><button type="button" class="text-editor-header-btn" id="h3" title="Heading 3"><img src="/img/text-editor-imgs/h3.svg"/></button><button type="button" class="text-editor-header-btn" id="h4" title="Heading 4"><img src="/img/text-editor-imgs/h4.svg"/></button><button type="button" class="text-editor-header-btn" id="h5" title="Heading 5"><img src="/img/text-editor-imgs/h5.svg"/></button><button type="button" class="text-editor-header-btn" id="paragraph" title="Paragraph"><img src="/img/text-editor-imgs/p.svg"/></button> </div><div class="d-flex align-items-center"> <button type="button" class="text-editor-header-btn" id="img" title="Insert Image" data-toggle="modal" data-target="#imageModal2"><img src="/img/text-editor-imgs/image.svg"/></button> <button type="button" class="text-editor-header-btn" id="link" title="Insert Hyperlink" data-toggle="modal" data-target="#linkModal"><img src="/img/text-editor-imgs/link.svg"/></button> <button type="button" class="text-editor-header-btn" id="video" title="Insert Video" data-toggle="modal" data-target="#videoModal"><img src="/img/text-editor-imgs/video.svg"/></button> <button type="button" class="text-editor-header-btn" id="post" title="Insert Post" data-toggle="modal" data-target="#postModal"><img src="/img/text-editor-imgs/post.svg"/></button> </div></div><textarea id="text-editor-textarea" name="editordata" class="d-none"></textarea> <div class="text-editor-content" contenteditable="true" id="text-editor-content"> <div class="current-div"><br></div></div></div>');

        var $container = $(".text-editor-content");
        var stickyHeader = $('.text-editor-header').offset().top;
        var stickyHeaderWidth = $('.text-editor-header').width();
        var $lastParagraph;

        $container.click(function (e) {
            var $this = $(this);
            console.log(e.target);
            if ($(e.target).is("twitterwidget")) {
                e.preventDefault();
            }
            if ($(e.target).is("img")) {
                setTimeout(function () {
                    var el = $container[0];
                    var range = document.createRange();
                    var sel = window.getSelection();
                    console.log($(".text-editor-selected"));
                    range.setStart($(".text-editor-selected")[0], 0);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }, 100);
            }
            if ($this.children().length == 1) {
                $this.children().addClass("current-div");
            }
            if ($(e.target).is("div:not(.text-editor-content)")) {
                $container.find("*").removeClass("current-div");
                $(e.target).addClass("current-div");
            }

            //        if ($(e.target).is($this)) {
            //            if ($this.children().length == 0) {
            //                $this.append('<p><br></p>');
            //                console.log($this.children("p").last()[0]);
            //                $this.children("p").last()[0].focus();
            //                console.log("tava empty");
            //            } else {
            //                $this.children("p").last()[0].focus();
            //                console.log("fuck off");
            //            }
            //        }
        });

        $(".text-editor-header").find("button").click(function () {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
            $('#dtzchanges').html("Saving...");
        });

        $(window).scroll(function () {
            if ($(window).scrollTop() > stickyHeader) {
                $('.text-editor-header').addClass('affix').css("width", stickyHeaderWidth + 8);
            } else {
                $('.text-editor-header').removeClass('affix').css("width", "100%");;
            }
        });

        $(document).on("keyup", ".text-editor-content", function (e) {
            var parentNode = getSelection().getRangeAt(0).commonAncestorContainer.parentNode;
            if (parentNode.classList.length == 0) {
                $container.find("*").removeClass("current-div");
                $(parentNode).addClass("current-div");
            } else if ($(parentNode).hasClass("text-editor-content")) {
                console.log("wew");
                $container.find("*").removeClass("current-div");
                $(getSelection().getRangeAt(0).commonAncestorContainer).addClass("current-div");
            }
            if (e.keyCode == 13) {
                $container.find(".current-div:not(:last-child)").removeClass("current-div");
                $container.children(".current-div").last().addClass("current-div");
            }
            if (e.keyCode == 8) {
                console.log($(this).children().length == 1);
                if ($(this).children().length == 0) {
                    $(this).append('<div class="current-div"><br></div>');
                }
                if ($(this).children().length == 2 && $(this).children().first().text().length == 0 && $(this).children().first().is("h1")) {
                    $(this).append('<div><br></div>');
                    $(this).children("h1").remove();
                }
                if ($(this).children().length == 2 && $(this).children().first().text().length == 0 && $(this).children().first().is("h2")) {
                    $(this).append('<div><br></div>');
                    $(this).children("h2").remove();
                }
            }
            clearTimeout(typingTimer);
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
            $('#dtzchanges').html("Saving...");
        });

        $(document).mouseup(function (e) {
            if (!$(".text-editor-selectable").is(e.target) && $(".text-editor-image-menu").has(e.target).length === 0) {
                $(".text-editor-image-menu").hide();
                $(".text-editor-selectable").removeClass("text-editor-selected");
            }
        });

        $(document).on("paste", ".text-editor-content", function (e) {
            //        var pastedData = e.originalEvent.clipboardData.getData('text');
            var pastedData = e.originalEvent.clipboardData.getData('text/plain');
            console.log(pastedData);
            if (pastedData != "") {
                e.preventDefault();
                document.execCommand("insertText", false, pastedData);
                $container.find("div").each(function () {
                    if ($(this).contents()[0].length == 1) {
                        $(this).html("<br>");
                    }
                });
            }
            setTimeout(function () {
                console.log($container.find($("img:not(:visible):not(.text-editor-upload-preview)")));
                if (pastedData == "") {
                    $("#imageModal").modal("show");
                    $container.find($("img:not(:visible):not(.text-editor-upload-preview)")).css("width", "100%");
                    $("#imageModal").find("img").prop("src", $container.find($("img:not(:visible):not(.text-editor-upload-preview)")).last().prop("src"));
                }
            }, 100);
        });

        $(document).on("click", "#imageModalCancel", function (e) {
            $container.find($("img:not(:visible)")).last().remove();
        });

        $(document).on("click", "#insertImage", function (e) {
            if ($("#imageModal").find("input, textarea").val().length > 0) {
                var $img = $container.find($("img:not(:visible)")).last();
                $img.attr("title", $("#img-upload-title").val().trim());
                $img.attr("data-caption", $("#img-upload-caption").val().trim());
                $img.attr("data-desc", $("#img-upload-desc").val().trim());
                $img.attr("alt", $("#img-upload-alt").val().trim());

                $img.addClass("text-editor-selectable").show();
                $("#imageModal").modal("hide");
                setTimeout(function () {
                    $container.focus();

                    $img.parent().append('<div class="d-flex justify-content-between flex-wrap text-editor-img-text" contenteditable="false"><span contenteditable="false">' + $img.attr("data-caption") + '</span><span contenteditable="false">Copyright?</span></div>');

                    $("<div><br></div>").insertAfter($img.parent());

                    $("html").animate({
                        scrollTop: $img.offset().top - 200
                    }, 700);

                    clearTimeout(typingTimer);
                    typingTimer = setTimeout(doneTyping, doneTypingInterval);
                    $('#dtzchanges').html("Saving...");

                }, 200);
            } else {
                alert("Please fill in all fields before uploading the image");
            }
        });

        $(document).on("click", "#insertImage2", function (e) {
            if ($(".current-div").length == 0) {
                $container.children("div").last().addClass("current-div");
            }
            $('<div><img class="img-insert-hidden" src="" width="100%" /></div>').insertAfter(".current-div");
            var $img = $container.find($(".img-insert-hidden")).last();

            if ($("#imageModal2").find("input[type='text'], textarea").val().length > 0) {
                var input = $("#imageModalInput")[0];

                if (input.files && input.files[0]) {

                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $img.attr('src', e.target.result);
                        console.log($container.find($(".img-insert-hidden")).last());
                    }

                    reader.readAsDataURL(input.files[0]);

                } else {
                    $img.attr("src", $("#imageModalURLInput").val().trim());
                }
                $img.attr("title", $("#img-upload-title2").val().trim());
                $img.attr("data-caption", $("#img-upload-caption2").val().trim());
                $img.attr("data-desc", $("#img-upload-desc2").val().trim());
                $img.attr("alt", $("#img-upload-alt2").val().trim());

                $img.removeClass("img-insert-hidden").addClass("text-editor-selectable").show();

                $("#imageModal2").modal("hide");
                setTimeout(function () {
                    $container.focus();

                    $img.parent().append('<div class="d-flex justify-content-between flex-wrap text-editor-img-text" contenteditable="false"><span contenteditable="false">' + $img.attr("data-caption") + '</span><span contenteditable="false">Copyright?</span></div>');

                    $("<div><br></div>").insertAfter($img.parent());

                    $("html").animate({
                        scrollTop: $img.offset().top - 200
                    }, 700);

                    clearTimeout(typingTimer);
                    typingTimer = setTimeout(doneTyping, doneTypingInterval);
                    $('#dtzchanges').html("Saving...");

                }, 200);

            } else {
                alert("Please fill in all fields before uploading the image");
                $img.remove();
            }
        });

        $("#imageModal").on("hidden.bs.modal", function () {
            $(this).find("form")[0].reset();
            $container.find("img:not(.text-editor-selectable)").remove();
        });

        $(document).on("change", "#imageModalInput", function (e) {
            var input = $(this)[0];
            if (input.files.length > 0) {
                $("#image-modal-url-group").slideUp(200);
                $("#imageModal2").find(".hidden").slideDown(400);
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $('#imageModal2').find("img").attr('src', e.target.result);
                    }

                    reader.readAsDataURL(input.files[0]);
                }
            } else
                $("#imageModal2").find(".hidden").slideUp(400);
        });

        $(document).on("change", "#imageModalURLInput", function (e) {
            if ($(this).val().trim().length > 0 && isUrlValid($(this).val().trim())) {
                $("#image-modal-upload-group").slideUp(200);
                $("#imageModal2").find(".hidden").slideDown(400);
                $('#imageModal2').find("img").attr('src', $(this).val().trim());
            } else {
                alert("Please insert a valid URL");
            }
        });

        $("#imageModal2").on("hidden.bs.modal", function () {
            $(this).find("form")[0].reset();
            $(this).find(".hidden").slideUp(400);
            $("#image-modal-upload-group").show();
            $("#image-modal-url-group").show();
        });

        $("#linkModal").find("input").keyup(function () {
            if ($("#linkModal").find("input[type='text']").val().trim().length > 0 && $("#linkModal").find("input[type='url']").val().trim().length > 0 && isUrlValid($("#linkModal").find("input[type='url']").val().trim())) {
                $("#insertLink").prop("disabled", false);
            } else {
                $("#insertLink").prop("disabled", true);
            }
        });

        $(document).on("click", "#insertLink", function (e) {
            var $text = $("#linkModal").find("input[type='text']");
            var $url = $("#linkModal").find("input[type='url']");
            if ($text.val().trim().length > 0 && $url.val().trim().length > 0 && isUrlValid($url.val().trim())) {
                $container.find("div").last().append('<a href="' + $url.val().trim() + '" >' + $text.val().trim() + '</a>');
                $("linkModal").modal("hide");
            }
            $("#linkModal").modal("hide");
        });

        $("#linkModal").on("hidden.bs.modal", function () {
            $(this).find("form")[0].reset();
        });

        $("#videoModal").find("input, textarea").keyup(function () {
            if ($(this).val().trim().length > 0) {
                $(this).parent().siblings().slideUp(200);
            } else {
                $(this).parent().siblings().slideDown(200);
            }
            if (($("#videoModal").find("input").val().trim().length > 0 && isUrlValid($("#videoModal").find("input").val().trim())) || $("#videoModal").find("textarea").val().trim().length > 0) {
                $("#insertVideo").prop("disabled", false);
            } else {
                $("#insertVideo").prop("disabled", true);
            }
        });

        $(document).on("click", "#insertVideo", function (e) {
            var link = $("#videoModal").find("input").val().trim();
            var embed = $("#videoModal").find("textarea").val().trim();
            if (link.length > 0) {
                if (~link.indexOf("youtube") || ~link.indexOf("youtu.be")) {
                    console.log("youtube link");
                    var videoCode = link.substr(link.lastIndexOf("/") + 1, link.length);
                    if (~videoCode.indexOf("watch")) {
                        videoCode = videoCode.substr(videoCode.lastIndexOf("=") + 1, videoCode.length);
                    }
                    console.log(videoCode);
                    link = "https://www.youtube.com/embed/" + videoCode;
                } else if (~link.indexOf("dailymotion") || ~link.indexOf("dai.ly")) {
                    console.log("dailymotion link");
                    var videoCode = link.substr(link.lastIndexOf("/") + 1, link.length);
                    console.log(videoCode);
                    link = "https://www.dailymotion.com/embed/video/" + videoCode;
                }
                $container.append('<div><iframe  width="560" height="315" src="' + link + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>');
            } else {
                $container.append('<div></div>');
                $container.find("div").last().append(embed + '<br>');
            }
            $("#videoModal").modal("hide");
        });

        $("#videoModal").on("hidden.bs.modal", function () {
            $(this).find("form")[0].reset();
            $(this).find(".form-group").show();
        });

        $("#postModal").find("textarea").keyup(function () {
            if ($("#postModal").find("textarea").val().trim().length > 0) {
                $("#insertPost").prop("disabled", false);
            } else {
                $("#insertPost").prop("disabled", true);
            }
        });

        $(document).on("click", "#insertPost", function (e) {
            var link = $("#postModal").find("textarea").val().trim();
            $container.append('<div></div>');
            $container.find("div").last().append(link + '<br>');
            $("#postModal").modal("hide");
        });

        $("#postModal").on("hidden.bs.modal", function () {
            $(this).find("form")[0].reset();
        });

        $(document).on("click", ".text-editor-selectable", function (e) {
            if ($(this).hasClass("text-editor-selected")) {
                $(".text-editor-selectable").removeClass("text-editor-selected");
                $(".text-editor-image-menu").hide();
            } else {
                $(".text-editor-selectable").removeClass("text-editor-selected");
                $(this).addClass("text-editor-selected");
                var offsetTop = $(this).offset().top;
                var offsetLeft = $(this).offset().left;
                $(".text-editor-image-menu").show().css({
                    top: offsetTop,
                    left: offsetLeft
                });
            }
        });

        $container.find("a").click(function (e) {
            e.preventDefault();
        });

        $(document).on("change", "#editor-cta-file-input", function () {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
            $('#dtzchanges').html("Saving...");
        });

        $(document).on("keyup", "#editor-cta-desc", function () {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
            $('#dtzchanges').html("Saving...");
        });


        /* Image Buttons */
        $("#img-100").click(function (e) {
            $(".text-editor-selected").css("width", "100%");
            $(".text-editor-selected").siblings(".text-editor-img-text").css("width", "100%");
        });
        $("#img-50").click(function (e) {
            $(".text-editor-selected").css("width", "50%");
            $(".text-editor-selected").siblings(".text-editor-img-text").css("width", "50%");
        });
        $("#img-25").click(function (e) {
            $(".text-editor-selected").css("width", "25%");
            $(".text-editor-selected").siblings(".text-editor-img-text").css("width", "25%");
        });
        $("#img-remove").click(function (e) {
            var parent = $(".text-editor-selected").parent();
            $(".text-editor-selected").siblings().remove();
            $(".text-editor-selected").remove();
            $(".text-editor-image-menu").hide();
            parent.append("<br>");
            clearTimeout(typingTimer);
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
            $('#dtzchanges').html("Saving...");
        });
        /* Image Buttons End */


        /* Text Editor Buttons */
        $("#bold").click(function (e) {
            document.execCommand('bold');
            $container.focus();
        });

        $("#italic").click(function (e) {
            document.execCommand('italic');
            $container.focus();
        });

        $("#underline").click(function (e) {
            document.execCommand('underline');
            $container.focus();
        });

        $("#strikeThrough").click(function (e) {
            document.execCommand('strikeThrough');
            $container.focus();
        });

        $("#insertOrderedList").click(function (e) {
            document.execCommand('insertOrderedList');
            $container.focus();
        });

        $("#insertUnorderedList").click(function (e) {
            document.execCommand('insertUnorderedList');
            $container.focus();
        });

        $("#justifyLeft").click(function (e) {
            if ($(document.getSelection().anchorNode).is("li")) {
                setTimeout(function () {
                    var el = $container[0];
                    var range = document.createRange();
                    var sel = window.getSelection();
                    range.setStart(sel.anchorNode.parentNode.parentNode, 0);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    console.log(sel.focusNode);
                    $(sel.focusNode).css("text-align", "left");
                }, 100);
            } else if ($(document.getSelection().anchorNode.parentNode).is("li")) {
                setTimeout(function () {
                    var el = $container[0];
                    var range = document.createRange();
                    var sel = window.getSelection();
                    range.setStart(sel.anchorNode.parentNode.parentNode.parentNode, 0);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    console.log(sel.focusNode);
                    $(sel.focusNode).css("text-align", "left");
                }, 100);
            } else {
                document.execCommand('justifyLeft');
            }
            $container.focus();
        });

        $("#justifyCenter").click(function (e) {
            if ($(document.getSelection().anchorNode).is("li")) {
                setTimeout(function () {
                    var el = $container[0];
                    var range = document.createRange();
                    var sel = window.getSelection();
                    range.setStart(sel.anchorNode.parentNode.parentNode, 0);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    console.log(sel.focusNode);
                    $(sel.focusNode).css("text-align", "center");
                }, 100);
            } else if ($(document.getSelection().anchorNode.parentNode).is("li")) {
                setTimeout(function () {
                    var el = $container[0];
                    var range = document.createRange();
                    var sel = window.getSelection();
                    range.setStart(sel.anchorNode.parentNode.parentNode.parentNode, 0);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    console.log(sel.focusNode);
                    $(sel.focusNode).css("text-align", "center");
                }, 100);
            } else {
                document.execCommand('justifyCenter');
            }
            $container.focus();
        });

        $("#justifyRight").click(function (e) {
            if ($(document.getSelection().anchorNode).is("li")) {
                setTimeout(function () {
                    var el = $container[0];
                    var range = document.createRange();
                    var sel = window.getSelection();
                    range.setStart(sel.anchorNode.parentNode.parentNode, 0);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    console.log(sel.focusNode);
                    $(sel.focusNode).css("text-align", "right");
                }, 100);
            } else if ($(document.getSelection().anchorNode.parentNode).is("li")) {
                setTimeout(function () {
                    var el = $container[0];
                    var range = document.createRange();
                    var sel = window.getSelection();
                    range.setStart(sel.anchorNode.parentNode.parentNode.parentNode, 0);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    console.log(sel.focusNode);
                    $(sel.focusNode).css("text-align", "right");
                }, 100);
            } else {
                document.execCommand('justifyRight');
            }
            $container.focus();
        });

        $("#justifyFull").click(function (e) {
            if ($(document.getSelection().anchorNode).is("li")) {
                setTimeout(function () {
                    var el = $container[0];
                    var range = document.createRange();
                    var sel = window.getSelection();
                    range.setStart(sel.anchorNode.parentNode.parentNode, 0);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    console.log(sel.focusNode);
                    $(sel.focusNode).css("text-align", "justify");
                }, 100);
            } else if ($(document.getSelection().anchorNode.parentNode).is("li")) {
                setTimeout(function () {
                    var el = $container[0];
                    var range = document.createRange();
                    var sel = window.getSelection();
                    range.setStart(sel.anchorNode.parentNode.parentNode.parentNode, 0);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    console.log(sel.focusNode);
                    $(sel.focusNode).css("text-align", "justify");
                }, 100);
            } else {
                document.execCommand('justifyFull');
            }
            $container.focus();
        });

        $("#h1").click(function (e) {
            var sel = window.getSelection();
            console.log(sel);
            if (($(sel.anchorNode).parent().is("h2")) || ($(sel.anchorNode).is("h2"))) {
                document.execCommand('formatBlock', false, '<div>');
            } else
                document.execCommand('formatBlock', false, '<h2>');
            $container.focus();
        });

        $("#h2").click(function (e) {
            var sel = window.getSelection();
            console.log(sel);
            if (($(sel.anchorNode).parent().is("h3")) || ($(sel.anchorNode).is("h3"))) {
                document.execCommand('formatBlock', false, '<div>');
            } else
                document.execCommand('formatBlock', false, '<h3>');
            $container.focus();
        });

        $("#h3").click(function (e) {
            var sel = window.getSelection();
            console.log(sel);
            if (($(sel.anchorNode).parent().is("h4")) || ($(sel.anchorNode).is("h4"))) {
                document.execCommand('formatBlock', false, '<div>');
            } else
                document.execCommand('formatBlock', false, '<h4>');
            $container.focus();
        });

        $("#h4").click(function (e) {
            var sel = window.getSelection();
            console.log(sel);
            if (($(sel.anchorNode).parent().is("h5")) || ($(sel.anchorNode).is("h5"))) {
                document.execCommand('formatBlock', false, '<div>');
            } else
                document.execCommand('formatBlock', false, '<h5>');
            $container.focus();
        });

        $("#h5").click(function (e) {
            var sel = window.getSelection();
            console.log(sel);
            if (($(sel.anchorNode).parent().is("h6")) || ($(sel.anchorNode).is("h6"))) {
                document.execCommand('formatBlock', false, '<div>');
            } else
                document.execCommand('formatBlock', false, '<h6>');
            $container.focus();
        });

        $("#paragraph").click(function (e) {
            document.execCommand('formatBlock', false, '<div>');
            $container.focus();
        });
        /* Text Editor Buttons End */

    };
});

function isUrlValid(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

function getCaretPosition(editableDiv) {
    var caretPos = 0,
        sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            if (range.commonAncestorContainer.parentNode == editableDiv) {
                caretPos = range.endOffset;
            }
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        if (range.parentElement() == editableDiv) {
            var tempEl = document.createElement("span");
            editableDiv.insertBefore(tempEl, editableDiv.firstChild);
            var tempRange = range.duplicate();
            tempRange.moveToElementText(tempEl);
            tempRange.setEndPoint("EndToEnd", range);
            caretPos = tempRange.text.length;
        }
    }
    return caretPos;
}
