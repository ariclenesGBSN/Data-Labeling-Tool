$(function () {
    $(".related-article").click(function () {
        if ($(this).hasClass("selected")) {} else {
            $(".related-article").removeClass("selected");
            $(this).addClass("selected");
        }
    });

    $(".related-article").draggable({
        revert: "invalid",
        revertDuration: 200,
        start: function (event, ui) {
            $(".related-article").removeClass("selected");
            $(this).addClass("selected");
        }
    });

    $("#schedule-cancel").click(function () {
        $(".related-article.selected").fadeIn(200);
    });

    $(".schedule-color-block").click(function () {
        $(".schedule-color-block").removeClass("selected");
        $(this).addClass("selected");
        $("#schedule-color").val($(".schedule-color-block.selected")[0].classList[1]);
    });

    $("#edit-scheduling").click(function () {
        $("#sch-article-title").html($("#event-title").text());
        var date = $("#article-target-date").text().split(" ")[0] + " " + $("#article-target-date").text().split(" ")[1] + " " + $("#article-target-date").text().split(" ")[2];
        var time = $("#article-target-date").text().split(" ")[3];
        console.log(time);
        $("#sch-target-date").html(date);
        var timepicker = flatpickr("#schedule-time-picker", {
            defaultDate: time,
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i"
        });
        $(".schedule-color-block").removeClass("selected");
        $(".schedule-color-block." + $("#eventModal").data("colorclass")).addClass("selected");
        $("#scheduleModal").modal("show");
    });

    var timepicker = flatpickr("#schedule-time-picker", {
        defaultDate: new Date(),
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i"
    });

    $('#calendar').fullCalendar({
        aspectRatio: 1.2,
        header: {
            right: 'listWeek month prev,next'
        },
        buttonText: {
            today: 'TODAY',
            month: 'MONTH',
            week: 'WEEK',
            day: 'DAY',
            list: 'LIST'
        },
        viewRender: function (view, element) {
            $(".fc button").addClass("gbsn-small-btn");
        },
        dayClick: function (date, jsEvent, view) {
            console.log($(this));
            $(".fc-day").removeClass("clicked-day");
            $(this).addClass("clicked-day");
        },
        droppable: true,
        drop: function (date) {
            console.log("Dropped on " + date.format());
            $(".related-article.selected").fadeOut(200);
            $("#sch-article-title").html($(".related-article.selected").find("h4").text());
            $("#schedule-date").val(date);
            $("#sch-target-date").html(date.format("MMMM Do, YYYY"));
            $("#scheduleModal").modal("show");
        },
        events: [
            {
                title: 'Top 10 Anime Betrayals',
                start: '2018-05-31',
                editable: true,
                className: "pri-4"
            },
            {
                title: 'Cotonetes em vias de extincao',
                start: '2018-06-01',
                editable: true,
                className: "pri-6"
            }
        ],
        eventClick: function (event, jsEvent, view) {
            console.log(event);
            $("#eventModal").modal("show");
            $("#eventModal").data("colorclass", event.className[0]);
        },
        noEventsMessage: "No scheduled articles this week"
    });


});
