$(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $(".manager-completion-bar:not(.manage-workstream-info-complete)").each(function () {
        var cWidth = $(this).parent().siblings().find("strong").text().trim();
        $(this).animate({
            width: cWidth
        }, 300, function () {
            if ($(this).width() > 0)
                $(this).css("width", $(this).width() + 2);
        });
    });

    $(".manager-completion-bar.manage-workstream-info-complete").each(function () {
        var cWidth = $(this).parent().siblings("p").text().trim();
        $(this).animate({
            width: cWidth
        }, 300, function () {
            if ($(this).width() > 0)
                $(this).css("width", $(this).width() + 2);
        });
    });

    $("#project-create-milestone-add-btn").click(function () {
        $("#project-create-milestone-group").append('<div class="project-create-milestone"><div class="form-group"><label class="small-text font-weight-bold mb-0">Milestone name</label><div class=" d-flex align-items-center"><input type="text" class="gbsn-input w-100" placeholder="Milestone name" /><div class="project-create-milestone-handle d-flex" title="Click and drag to re-order"><i class="fa fa-arrows-v m-auto"></i></div></div></div><div class="project-create-milestone-body"><div class="form-group"><label class="small-text font-weight-bold mb-0">Milestone description</label><textarea class="gbsn-input w-100" rows="2" placeholder="Milestone description"></textarea></div><div class="row"><div class="col col-lg-6"><div class="form-group"><label class="small-text font-weight-bold mb-0">Start date</label><input type="date" class="gbsn-input w-100 start-date" /></div></div><div class="col col-lg-6"><div class="form-group"><label class="small-text font-weight-bold mb-0">End date</label><input type="date" class="gbsn-input w-100 end-date" /></div></div></div></div></div>');
        $(".gbsn-input.start-date[type='date']").each(function () {
            flatpickr(this, {
                enableTime: true,
                dateFormat: "d-m-Y H:i",
                altInput: true,
                altFormat: "F j, Y at H:i",
                defaultDate: new Date()
            });
        });
        $(".gbsn-input.end-date[type='date']").each(function () {
            var firstDay = new Date();
            flatpickr(this, {
                enableTime: true,
                dateFormat: "d-m-Y H:i",
                altInput: true,
                altFormat: "F j, Y at H:i",
                defaultDate: new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000)
            });
        });
    });

    $("#project-create-deliverable-add-btn").click(function () {
        $(this).siblings("div").append('<div class="project-create-deliverable-row mb-2"><div class="d-flex align-items-center mb-2"><h4 class="mb-0 mr-2">' + ($(this).siblings("div").children().length + 1) + '</h4><input type="text" class="gbsn-input w-100" placeholder="Deliverable name" /><button type="button" class="project-create-deliverable-delete ml-2"><i class="fa fa-times"></i></button></div><div class="row pl-3"><div class="col col-lg-6"><div class="form-group mb-0"><label class="small-text font-weight-bold mb-0">Start date</label><input type="date" class="gbsn-input w-100 start-date" /></div></div><div class="col col-lg-6"><div class="form-group mb-0"><label class="small-text font-weight-bold mb-0">End date</label><input type="date" class="gbsn-input w-100 end-date" /></div></div></div></div>');
        $(".gbsn-input.start-date[type='date']").each(function () {
            flatpickr(this, {
                enableTime: true,
                dateFormat: "d-m-Y H:i",
                altInput: true,
                altFormat: "F j, Y at H:i",
                defaultDate: new Date()
            });
        });
        $(".gbsn-input.end-date[type='date']").each(function () {
            var firstDay = new Date();
            flatpickr(this, {
                enableTime: true,
                dateFormat: "d-m-Y H:i",
                altInput: true,
                altFormat: "F j, Y at H:i",
                defaultDate: new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000)
            });
        });

    });

    $(document).on("click", ".project-create-deliverable-delete", function () {
        $(this).parent().parent().remove();
        var order = 1;
        $(".project-create-deliverable-row").each(function () {
            $(this).find("h4").html(order);
            console.log(order);
            order++;
        });
    });

    $(".gbsn-input").focus(function () {
        $(this).removeClass("input-error");
    });

    $(".manage-email-input").keyup(function () {
        if ($(this).val().trim().length > 0) {
            $(this).parent().siblings(".modal-footer").children(".orange").prop("disabled", false);
        } else {
            $(this).parent().siblings(".modal-footer").children(".orange").prop("disabled", true);
        }
    });

    $("#project-create-submit").click(function (e) {
        var pass = "true";
        $(".project-create-error-message").html("").hide();
        console.log($(".project-create-error-message"));
        $("input[type='text']:not(.flatpickr-input):not(.numInput)").each(function () {
            if ($(this).val() == "") {
                $(this).addClass("input-error");
                if ($(".message-1").length < 1)
                    $(".project-create-error-message").append('<p class="project-create-error-message-row message-1">There are empty fields.</p>');

                $(".project-create-error-message").css("display", "inline-block");
                pass = false;
            }
            console.log($(this));
            if ($(this).val().length < 3) {
                $(this).addClass("input-error");
                if ($(".message-2").length < 1)
                    $(".project-create-error-message").append('<p class="project-create-error-message-row message-2">Project/Milestone name must be at least 3 characters long.</p>');

                $(".project-create-error-message").css("display", "inline-block");
                pass = false;
            }
        });

        $("textarea").each(function () {
            if ($(this).val().trim() == "") {
                $(this).addClass("input-error");
                if ($(".message-1").length < 1)
                    $(".project-create-error-message").append('<p class="project-create-error-message-row message-1">There are empty fields.</p>');

                $(".project-create-error-message").css("display", "inline-block");
                pass = false;
            }
        });

        $("select").each(function () {
            if ($(this).val() == null) {
                $(this).addClass("input-error");
                if ($(".message-1").length < 1)
                    $(".project-create-error-message").append('<p class="project-create-error-message-row message-1">There are empty fields.</p>');

                $(".project-create-error-message").css("display", "inline-block");
                pass = false;
            }
        });

        if (!pass) {
            e.preventDefault();
            $("html").animate({
                scrollTop: 0
            }, 200);
        }
    });

    if ($(".gbsn-input[type='date']").length > 0) {
        var today = new Date();
        var monthAgo = today.setDate(today.getDate() - 30);
        $(".gbsn-input.start-date[type='date']").each(function () {
            flatpickr(this, {
                enableTime: true,
                dateFormat: "d-m-Y H:i",
                altInput: true,
                altFormat: "F j, Y at H:i",
                defaultDate: new Date()
            });
        });
        $(".gbsn-input.end-date[type='date']").each(function () {
            var firstDay = new Date();
            flatpickr(this, {
                enableTime: true,
                dateFormat: "d-m-Y H:i",
                altInput: true,
                altFormat: "F j, Y at H:i",
                defaultDate: new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000)
            });
        });
        if ($(".gbsn-thistory-date").length > 0) {
            flatpickr($(".gbsn-thistory-date")[0], {
                mode: "range",
                maxDate: "today",
                dateFormat: "d-m-Y",
                altInput: true,
                altFormat: "F j, Y",
                defaultDate: [monthAgo, "today"]
            });
        }
    }

    if ($("#project-create-milestone-group").length > 0) {
        var sortable = new Sortable($("#project-create-milestone-group")[0], {
            handle: ".project-create-milestone-handle",
            animation: 100,
            scroll: true,
            onStart: function (e) {
                $(".project-create-milestone-body").slideUp(200);
            },
            onEnd: function (e) {
                $(".project-create-milestone-body").slideDown(200);
            },
        });
    }

    $(".manage-workstream-side-tab").click(function () {
        var tabName = $(this).text().trim().toLowerCase();

        $(".manage-workstream-side-tab").removeClass("active");
        $(this).addClass("active");

        $(".manage-workstream-side-content").children().hide();
        $("#manage-workstream-side-" + tabName).show();
    });

    $("#manage-workstream-search-btn").click(function () {
        var $input = $(this).siblings();
        if ($input.is(":visible")) {
            if ($input.val().trim() == "") {
                $input.animate({
                    opacity: 0
                }, 100);
                setTimeout(function () {
                    $input.hide();
                }, 150);
            } else {
                $(".manage-workstream-side-search-header").show();
                $(".manage-workstream-side-content").children().each(function () {
                    if ($(this).is(":visible")) {
                        $(this).addClass("manage-workstream-side-previous");
                    }
                });
                $(".manage-workstream-side-content").children().hide();
                $("#manage-workstream-side-search").slideDown(200);
            }

        } else {
            $input.show().css("opacity", 0).animate({
                opacity: 1
            }, 50);
        }
    });

    $("#manage-workstream-search-input").keyup(function (e) {
        if (e.keyCode == 13) {
            $(".manage-workstream-side-search-header").show();
            $(".manage-workstream-side-content").children().each(function () {
                if ($(this).is(":visible")) {
                    $(this).addClass("manage-workstream-side-previous");
                }
            });
            $(".manage-workstream-side-content").children().hide();
            $("#manage-workstream-side-search").slideDown(200);
        }
    });

    $("#manage-workstream-search-input").blur(function () {
        var $input = $(this);
        if ($input.val().trim() == "") {
            $input.animate({
                opacity: 0
            }, 100);
            setTimeout(function () {
                $input.hide();
            }, 150);
        }
    });

    $("#manage-workstream-plus-btn").click(function () {
        var $input = $(this).siblings();
        $input.click();
    });

    $("#manage-workstream-plus-input").change(function () {
        $("#uploadFile").modal("show");
        var input = $(this)[0];
        if (input.files && input.files[0] && input.files[0].type.split("/")[0] == "image") {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.workstream-file-upload-preview').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
        //           workstream-file-upload-preview
    });

    $(".manage-workstream-side-opt-btn").click(function (e) {
        e.preventDefault();
    });

    $(".manage-workstream-message, .manage-workstream-side-file").hover(function () {
        $(this).find(".manage-workstream-message-opt-btn").animate({
            opacity: 0.67
        }, 100);
    }, function () {
        var $dropdown = $(this).find(".manage-workstream-message-opt-dropdown");
        if ($dropdown.is(":visible")) {

        } else {
            $(this).find(".manage-workstream-message-opt-btn").animate({
                opacity: 0
            }, 100);
        }

    });

    $(".manage-workstream-message-opt-btn").blur(function () {
        var $dropdown = $(this).siblings(".manage-workstream-message-opt-dropdown");
        $(this).stop().animate({
            opacity: 0
        }, 100);
        $dropdown.stop().fadeOut(100);
    })

    $(".manage-workstream-message-opt-btn").click(function () {
        var $dropdown = $(this).siblings(".manage-workstream-message-opt-dropdown");
        if ($dropdown.is(":visible")) {
            $dropdown.stop().fadeOut(100);
        } else {
            $dropdown.stop().fadeIn(100);
        }
    });

    $(".manage-workstream-message-opt-dropdown").children(".pin").click(function () {
        if ($(this).text().trim() == "Pin") {
            $(this).html('<i class="fa fa-thumb-tack"></i> Unpin');
            //ajax
            $(this).parent().parent().siblings(".manage-workstream-message-thumb-col").append('<i class="fa fa-thumb-tack manage-workstream-pin-icon"></i>');
        } else {
            $(this).html('<i class="fa fa-thumb-tack"></i> Pin');
            //ajax
            $(this).parent().parent().siblings(".manage-workstream-message-thumb-col").html("");
        }
    });

    $(".manage-workstream-message-opt-dropdown").children(".quote").click(function () {
        var name = $(this).parent().parent().parent().data("by");
        $(".manage-workstream-quoting").find("strong").html(name);
        $(".manage-workstream-quoting").fadeIn(200);
        $(".manage-workstream-message-container").animate({
            scrollTop: $(".manage-workstream-message-container")[0].scrollHeight + 100
        });
    });

    $(".manage-workstream-alert").find("a").click(function () {
        var $this = $(this).parent().parent();
        $(".manage-workstream-message-container").animate({
            scrollTop: $(".manage-workstream-message-container")[0].scrollHeight
        }, function () {
            $this.fadeOut(100);
        });
    });

    $(".manage-workstream-alert").find("button").click(function () {
        $(this).parent().parent().fadeOut(100);
    });

    $(".manage-workstream-quoting").find("button").click(function () {
        $(this).parent().parent().fadeOut(100);
    });

    $("#manage-workstream-search-close").click(function (e) {
        $(".manage-workstream-side-search-header").hide();
        $(".manage-workstream-side-content").children(".manage-workstream-side-previous").show().removeClass("manage-workstream-side-previous");
        $("#manage-workstream-side-search").slideUp(200);
    });

    $(".manage-project-milestone-header").click(function (e) {
        e.preventDefault();
        var $hidden = $(this).parent().siblings(".hidden");
        if ($hidden.is(":visible")) {
            $hidden.stop().slideUp(300);
        } else {
            $hidden.stop().slideDown(300);
        }
    });

    if ($(".manage-project-milestone").length > 0) {
        var $hidden = $(".manage-project-milestone:not(.complete)").first().find(".hidden");
        $hidden.stop().slideDown(300);
    }

    $("#from-deliverable-input").change(function () {
        if ($(this).is(":checked")) {
            $("#add-milestone-scratch").hide();
            $("#add-milestone-deliverable").show();
        } else {
            $("#add-milestone-deliverable").hide();
            $("#add-milestone-scratch").show();
        }
    });

    $(".manage-project-add-list-row").click(function () {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
            $(this).children("i").removeClass("fa-check").addClass("fa-plus");
        } else {
            $(this).addClass("selected");
            $(this).children("i").removeClass("fa-plus").addClass("fa-check");
        }
    });

    $("#manage-project-add-all").click(function () {
        $(".manage-project-add-list-row").addClass("selected");
        $(".manage-project-add-list-row").children("i").removeClass("fa-plus").addClass("fa-check");
    });

    $('#addPeopleModal').on('hidden.bs.modal', function (e) {
        $(".manage-project-add-list-row").removeClass("selected");
        $(".manage-project-add-list-row").children("i").removeClass("fa-check").addClass("fa-plus");
    });

    var accSettings = [];
    var projSettings = [];

    if ($("#manage-account-settings-form").length > 0) {
        $("#manage-account-settings-form").find("input:not([type='checkbox'])").each(function () {
            accSettings.push($(this).val());
        });
        $("#manage-account-settings-form").find("input[type='checkbox']").each(function () {
            accSettings.push($(this).is(":checked"));
        });
        console.log(accSettings);
    }

    if ($("#manage-project-edit-form").length > 0) {
        $("#manage-project-edit-form").find(":input").each(function () {
            projSettings.push($(this).val());
        });
        console.log(projSettings);
    }

    $("#manage-account-settings-form").find("input").change(function () {
        var i = 0;
        var $this = $(this);
        var index = 0;
        $("#manage-account-settings-form").find("input").each(function () {
            if ($(this).is($this)) {
                index = i;
            } else {
                i++;
            }
        });
        console.log(index);
        console.log(accSettings[index]);
        if ($this.prop("type") == "checkbox") {
            if ($this.is(":checked") != accSettings[index]) {
                $("#manage-account-save").prop("disabled", false);
            } else {
                $("#manage-account-save").prop("disabled", true);
            }
        } else {
            if ($this.val().trim() != accSettings[index]) {
                $("#manage-account-save").prop("disabled", false);
            } else {
                $("#manage-account-save").prop("disabled", true);
            }
        }
    });

    $("#manage-project-edit-form").find(":input").change(function () {
        var i = 0;
        var $this = $(this);
        var index = 0;
        $("#manage-project-edit-form").find(":input").each(function () {
            if ($(this).is($this)) {
                index = i;
            } else {
                i++;
            }
        });
        console.log(index);
        console.log(projSettings[index]);
        if ($this.val().trim() != projSettings[index]) {
            $("#manage-project-edit-save").prop("disabled", false);
        } else {
            $("#manage-project-edit-save").prop("disabled", true);
        }
    });

    $("#edit-costume-estimate").click(function () {
        $("#costEstimateModal").modal("hide");
    });

    $(".manage-all-projects-tab").click(function () {
        $(this).next().slideToggle(400);
    });

    $(".manage-all-projects-tab").last().click();

    $(".gbsn-thistory-tab").click(function () {
        $(".gbsn-thistory-tab").removeClass("selected");
        $(this).addClass("selected");
        if ($(this).text() == "CHOOSE CLIENT...")
            $(this).siblings("select").show();
        else
            $(this).siblings("select").hide();
    });

    $(".gbsn-thistory-table-row").click(function () {
        if ($(this).siblings().is(":visible")) {
            $(this).siblings().slideUp(300);
            $(this).parent().removeClass("active");
        } else {
            $(this).siblings().slideDown(300);
            $(this).parent().addClass("active");
        }
    });
});
