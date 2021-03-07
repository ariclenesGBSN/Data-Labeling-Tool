var toUpload = [];
var queue = [];

$(function () {
	if ($(".insights-article-progress-bar").length > 0) {
		$(document.body).on('touchmove', onScroll); // for mobile
		$(window).on('scroll', onScroll);
	}
	console.log(getCookie("popup"));

	if (getCookie("popup") == "" || getCookie("popup") == "true") {
		document.cookie = "popup=true";
		$("#popup").load("/loads/popup.html", function () {
			$("#popupModal").modal({
				backdrop: "static"
			});
			$("#popupModal").modal("show");
		});
	}

	headerImages();
	$(window).resize(headerImages);

	//    $("#notifications").load("/loads/notifications.html");

	//    $("#footer").load("/loads/footer.html");

	//    $("#breadcrumbs").load("/loads/breadcrumbs.html");

	//    if ($("#navbar").hasClass("manager-navbar")) {
	//        $("#navbar").load("/loads/manager-navbar.html");
	//    } else if ($("#navbar").hasClass("client-navbar")) {
	//        $("#navbar").load("/loads/client-navbar.html");
	//    } else {
	//        $("#navbar").load("/loads/navbar.html", function () {
	//            console.log("Loading: NAVBAR");

	$("div.gbsn-navbar-link").hover(function () {
		$(this).siblings().stop().slideDown(200);
		$(this).addClass("active");
	}, function () {
		$(this).siblings().stop().slideUp(200);
		$(this).removeClass("active");
	});

	$(".gbsn-navbar-dropdown").hover(function () {
		$(this).stop().slideDown(200);
		$(this).siblings(".gbsn-navbar-link").addClass("active");
	}, function () {
		$(this).stop().slideUp(200);
		$(this).siblings(".gbsn-navbar-link").removeClass("active");
	});

	$(document).on("click", ".gbsn-popup-close", function () {
		$(".gbsn-popup").animate({
			bottom: "-400px"
		}, function () {
			$(".gbsn-popup").remove();
		});
	});

	$('#toggle').click(function () {
		$(this).toggleClass('active');
		$('#overlay').toggleClass('open');
	});
	//        });
	//    }

	$(document).on("submit", "form", function (e) {
		$(this).find("button[type=submit]").prop("disabled", true);
		$(this).find("button[type=submit]").html('<img src="/img/loading-inverse.svg" width="16px" />');
	});

	$(document).on("click", "#gbsn-nav-collapse-btn", function () {
		$(".gbsn-nav-collapse").parent().toggleClass("align-items-center");
		$(".gbsn-nav-collapse").toggle();
		$(this).parent().toggleClass("ml-auto");
	});

	$("div.gbsn-navbar-link").hover(function () {
		$(this).siblings().stop().slideDown(200);
		$(this).addClass("active");
	}, function () {
		$(this).siblings().stop().slideUp(200);
		$(this).removeClass("active");
	});

	$(".gbsn-navbar-dropdown").hover(function () {
		$(this).stop().slideDown(200);
		$(this).siblings(".gbsn-navbar-link").addClass("active");
	}, function () {
		$(this).stop().slideUp(200);
		$(this).siblings(".gbsn-navbar-link").removeClass("active");
	});

	$(".gbsn-popup-close").click(function () {
		$(".gbsn-popup").fadeOut(200);
	});

	$(".gbsn-navbar-link.notifications.new").click(function () {
		$(this).removeClass("new");
	});

	$("#applyModal").find("input").keyup(function () {
		var empty = false;
		$("#applyModal").find("input").each(function () {
			if ($(this).val().trim() == "")
				empty = true;
		});

		$("#applyModal").find("input[type=checkbox]").each(function () {
			if (!$(this).is(":checked"))
				empty = true;
		});

		if (!empty)
			$("#applyModal").find("button[type='submit']").prop("disabled", false);
		else
			$("#applyModal").find("button[type='submit']").prop("disabled", true);
	});

	$("#applyModal").find("input").change(function () {
		var empty = false;
		$("#applyModal").find("input").each(function () {
			if ($(this).val().trim() == "")
				empty = true;
		});

		$("#applyModal").find("input[type=checkbox]").each(function () {
			if (!$(this).is(":checked"))
				empty = true;
		});

		if (!empty)
			$("#applyModal").find("button[type='submit']").prop("disabled", false);
		else
			$("#applyModal").find("button[type='submit']").prop("disabled", true);
	});

	$("#applyModal").find("input[type=checkbox]").change(function () {
		var empty = false;
		$("#applyModal").find("input").each(function () {
			if ($(this).val().trim() == "")
				empty = true;
		});

		$("#applyModal").find("input[type=checkbox]").each(function () {
			if (!$(this).is(":checked"))
				empty = true;
		});

		if (!empty)
			$("#applyModal").find("button[type='submit']").prop("disabled", false);
		else
			$("#applyModal").find("button[type='submit']").prop("disabled", true);
	});

	$(".insights-show-more").click(function (e) {
		e.preventDefault();
		if ($(this).siblings().children(".insights-hidden-tags").length > 0) {
			if ($(this).siblings().children(".insights-hidden-tags").is(":visible")) {
				$(this).siblings().children(".insights-hidden-tags").fadeOut(200);
				$(this).html("Show more...");
			} else {
				$(this).siblings().children(".insights-hidden-tags").fadeIn(200);
				$(this).html("Show less...");
			}
		} else {
			if ($(this).siblings(".insights-hidden-tags").is(":visible")) {
				$(this).siblings(".insights-hidden-tags").fadeOut(200);
				$(this).html("Show more...");
			} else {
				$(this).siblings(".insights-hidden-tags").fadeIn(200);
				$(this).html("Show less...");
			}
		}
	});

	$(".insights-article-rec-desc").each(function () {
		if ($(this).html().trim().length > 180) {
			$(this).html($(this).html().trim().substr(0, 178) + "...");
		}
	});

	$(".gbsn-radio-btn").click(function () {
		if (!$(this).hasClass("selected")) {
			$(this).siblings().removeClass("selected");
			$(this).addClass("selected");
			if ($(this).siblings("#deadlinecheck").length > 0) {
				if ($(this).attr("id") == "gbsn-radio-btn-yes")
					$(this).siblings("input[name=deadlinecheck]").val(1);
				else
					$(this).siblings("input[name=deadlinecheck]").val(0);
			}
			if ($(this).siblings("#software").length > 0) {
				if ($(this).attr("id") == "gbsn-radio-btn-excel")
					$(this).siblings("input[name=software]").val("Excel");
				else if ($(this).attr("id") == "gbsn-radio-btn-python")
					$(this).siblings("input[name=software]").val("Python");
				else
					$(this).siblings("input[name=software]").val("R");
			}
			if ($(this).attr("id") == "quote-reporting-other") {
				$(".gbsn-quote-reporting-other").slideDown(200);
			} else {
				$(".gbsn-quote-reporting-other").slideUp(200);
			}
			if ($(this).hasClass("report-type")) {
				$("input[name=reporttype]").val($(this).children("span").text());
			}
			if ($(this).hasClass("language-query")) {
				$("input[name=querytype]").val($(this).children("span").text());
			}
		}
		if ($(this).siblings(".gbsn-quote-hidden").length > 0) {
			if ($(this).find("span").text().trim() == "Yes")
				$(this).siblings(".gbsn-quote-hidden").slideDown(400);
			else
				$(this).siblings(".gbsn-quote-hidden").slideUp(400);
		}
	});

	$(".gbsn-checkb-btn").click(function () {
		if (!$(this).hasClass("selected")) {
			$(this).addClass("selected");
			if ($(this).hasClass("marketing-goals-check")) {
				var inputText = '<input type="hidden" name="marketinggoals[]" value="' + $(this).children("span").text() + '" />';
				$(inputText).insertAfter($(this));
			}
		} else {
			$(this).removeClass("selected");
			if ($(this).hasClass("marketing-goals-check"))
				$(this).next().remove();
		}
	});

	if ($(".manage-workstream-message-container").length > 0) {
		$(".manage-workstream-message-container").scrollTop($(".manage-workstream-message-container")[0].scrollHeight + 100);
	}

	if ($("#manage-project-edit-save").length > 0) {
		window.onbeforeunload = function (e) {

			if ($("#manage-project-edit-save").prop("disabled") == false || $("#manage-project-edit-save").prop("disabled") == "false") {
				e = e || window.event;
				if (e) {
					e.returnValue = 'Sure?';
				}
				return 'Sure?';
			}
		};
	}

	if ($(".gbsn-quote-file-container").length > 0) {

		Dropzone.autoDiscover = false;

		var myDropzone = new Dropzone("div.gbsn-quote-file-container", {
			url: "#",
			paramName: "",
			autoProcessQueue: false,
			autoQueue: false,
			createImageThumbnails: false,
			previewTemplate: "",
			clickable: false,
			dragenter: function (e) {
				console.log("Enter");
				$(".gbsn-quote-file-container").addClass("gbsn-hovering");
			},
			dragleave: function (e) {
				console.log("Leave");
				$(".gbsn-quote-file-container").removeClass("gbsn-hovering");
			},
			drop: function (e) {
				//e.preventDefault();
				// $("#gbsn-import-modal").modal("show");
				setTimeout(function () {

					for (var i = 0; i < myDropzone.files.length; i++) {
						myDropzone.files[i].dataid = (Math.floor(Math.random() * (9999 - 1 + 1)) + 1) + "" + myDropzone.files[i].size;
					}

					toUpload = myDropzone.files;
					//$("#gbsn-import-modal-title").children("span").html(toUpload.length);

					console.log(toUpload);

					if (toUpload.length > 0) {

						if ($(".gbsn-quote-file-container").children(".gbsn-quote-file-placeholder").is(":visible")) {
							$(".gbsn-quote-file-placeholder").hide();
						}

						for (var i = 0; i < toUpload.length; i++) {
							var currFile = toUpload[i];
							queue.push(currFile);
							$(".gbsn-quote-file-container").append('<div class="gbsn-quote-file d-flex flex-column" data-id="' + currFile.dataid + '"><button type="button" class="gbsn-quote-file-rm-btn"><i class="fa fa-times"></i></button><img src="/img/file-icon.png" /><h5>' + currFile.name + '</h5><p>' + currFile.name.split('.').pop().toUpperCase() + ' type file</p><p>' + bytesToSize(currFile.size) + '</p></div>');
						}
						console.log(queue);
					}
				}, 100);
			},
			addedfile: function (file) {
				return;
			}
		});

		$(".gbsn-quote-file-container").click(function (e) {
			if (e.target != e.currentTarget)
				return;
			$("#gbsn-quote-file-input").click();
		});

		$(".gbsn-quote-file-placeholder").click(function (e) {
			$("#gbsn-quote-file-input").click();
		});

		$("#gbsn-quote-file-input").change(function (e) {
			toUpload = [];

			for (var i = 0; i < $(this)[0].files.length; i++) {
				$(this)[0].files[i].dataid = (Math.floor(Math.random() * (9999 - 1 + 1)) + 1) + "" + $(this)[0].files[i].size;
			}

			toUpload = $(this)[0].files;

			console.log(toUpload);

			if (toUpload.length > 0) {

				if ($(".gbsn-quote-file-container").children(".gbsn-quote-file-placeholder").is(":visible")) {
					$(".gbsn-quote-file-placeholder").hide();
				}

				for (var i = 0; i < toUpload.length; i++) {
					var currFile = toUpload[i];
					queue.push(currFile);
					$(".gbsn-quote-file-container").append('<div class="gbsn-quote-file d-flex flex-column" data-id="' + currFile.dataid + '"><button type="button" class="gbsn-quote-file-rm-btn"><i class="fa fa-times"></i></button><img src="/img/file-icon.png" /><h5>' + currFile.name + '</h5><p>' + currFile.name.split('.').pop().toUpperCase() + ' type file</p><p>' + bytesToSize(currFile.size) + '</p></div>');
				}
			}

			console.log(queue);

			$("#gbsn-quote-hidden-file-input").val(queue);
		});
	}

	$(document).on("click", ".gbsn-quote-file-rm-btn", function (e) {
		var dataid = $(this).parent().data("id");
		console.log(dataid);

		for (var i = 0; i < queue.length; i++) {
			if (queue[i].dataid == dataid) {
				var index = queue.indexOf(queue[i]);
				if (index > -1) {
					queue.splice(index, 1);
				}
			}
		}

		$(this).parent().remove();
		if ($(".gbsn-quote-file-container").children().length == 1 && !$(".gbsn-quote-file-container").children(".gbsn-quote-file-placeholder").is(":visible")) {
			$(".gbsn-quote-file-placeholder").show();
		}

		console.log(queue);

		$("#gbsn-quote-hidden-file-input").val(queue);
	});

	$(document).on("change", "#gbsn-quote-agree-check", function (e) {
		if ($(this).is(":checked"))
			$("#gbsn-quote-submit-btn").prop("disabled", false);
		else
			$("#gbsn-quote-submit-btn").prop("disabled", true);
	});

	if ($(".gbsn-quote-hidden").length > 0) {
		var datepicker = flatpickr("#gbsn-quote-when-date", {
			altInput: true,
			minDate: new Date(),
			altFormat: "F j, Y",
			dateFormat: "Y-m-d",
			defaultDate: new Date()
		});
		var timepicker = flatpickr("#gbsn-quote-when-time", {
			enableTime: true,
			noCalendar: true,
			dateFormat: "H:i",
			defaultDate: "12:00"
		});
	}

	$("#gbsn-quote-topic-input").keyup(function (e) {
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
				$(".gbsn-quote-topic-list").children("div").append('<div class="gbsn-quote-topic-tag"><span>' + newTopic + '</span><button type="button" class="gbsn-quote-topic-tag-rm"><i class="fa fa-times"></i></button> </div> <input type="hidden" name="topics[]" value="' + newTopic + '" />');
			}

			$(this).val("");

		}
	});

	$(document).on("click", ".gbsn-quote-topic-tag-rm", function () {
		$(this).parent().remove();
	});

	$(document).on("click", ".gbsn-quote-add-language", function () {
		var empty = false;
		$(".gbsn-quote-language-group").find("input").each(function () {
			if ($(this).val().trim() == "")
				empty = true;
		});
		if (!empty) {
			$(this).remove();
			$(".gbsn-quote-language-group").append('<div class="d-flex align-items-center mb-2"><input type="text" class="gbsn-input" name="language[]" rows="3" placeholder="English" /><button type="button" class="gbsn-quote-add-language ml-3"><i class="fa fa-plus"></i></button></div>');
		}
	});

	$(document).on("click", ".gbsn-quote-add-location", function () {
		var empty = false;

		$(".gbsn-quote-location-group").find("select").each(function () {
			console.log($(this).val())
			if ($(this).val() == "default")
				empty = true;
		});

		if (!empty) {
			$(this).remove();
			$(".gbsn-quote-location-group").append('<div class="d-flex align-items-center mb-2"><select class="gbsn-input" name="country[]"><option selected value="default">Country</option><option>Alpha</option><option>Beta</option><option>Gamma</option></select><select class="gbsn-input ml-3" name="city[]"><option selected>Any State/City</option><option>Alpha</option><option>Beta</option><option>Gamma</option></select><button type="button" class="gbsn-quote-add-location ml-3"><i class="fa fa-plus"></i></button></div>');
		}
	});

	$(document).on("click", "#gbsn-popup-continue", function () {
		document.cookie = "popup=false";
		$(".gbsn-popup").animate({
			bottom: "-400px"
		}, function () {
			$(".gbsn-popup").remove();
		});
	});

	$(document).on("change", "#application-1-checkbox", function () {
		if ($(this).is(":checked"))
			$("#application-1-next").prop("disabled", false);
		else
			$("#application-1-next").prop("disabled", true);
	});

	$(document).on("click", "#application-1-next", function () {
		$("html, body").animate({
			scrollTop: 0
		}, 700, function () {
			$("#application-step-2").show();
			$("#application-step-1").hide();
			$(".application-progress-step").removeClass("current");
			$($(".application-progress-step")[1]).addClass("current");
			$(".application-progress-bar").css("left", "calc(33.333333% + 5px)");
		});
	});

	$(document).on("click", "#application-2-next", function () {
		$("html, body").animate({
			scrollTop: 0
		}, 700, function () {
			$("#application-step-3").show();
			$("#application-step-2").hide();
			$(".application-progress-step").removeClass("current");
			$($(".application-progress-step")[2]).addClass("current");
			$(".application-progress-bar").css("left", "calc(66.666666% - 5px)");
		});

	});

	$(document).on("click", "#test-next-1", function () {
		$("#test-1").animate({
			opacity: 0
		}, 300, function () {
			$(this).hide();
		});
		setTimeout(function () {
			$("#test-2").show().css("opacity", "0").animate({
				opacity: 1
			}, 300);
		}, 200);

	});

	$(document).on("click", "#test-next-2", function () {
		$("#test-2").animate({
			opacity: 0
		}, 300, function () {
			$(this).hide();
		});
		setTimeout(function () {
			$("#test-3").show().css("opacity", "0").animate({
				opacity: 1
			}, 300);
		}, 200);

	});

	$(document).on("click", "#application-start-test", function () {
		$(this).parent().fadeOut();

		// ajax start "timer"

		$.get("tests/data-scientist-test.html", function (data) {
			$("#application-test").html(data);
			$("html, body").animate({
				scrollTop: $("#application-test").offset().top - 150
			}, 700);
		});

	});

	$(document).on("click", ".settings-check-btn", function () {
		if ($(this).hasClass("off")) {
			$(this).parent().siblings("h4").html("On");
			$(this).parent().removeClass("off").addClass("on");
			$(this).removeClass("off").addClass("on");
		} else if ($(this).hasClass("on")) {
			$(this).parent().siblings("h4").html("Off");
			$(this).parent().removeClass("on").addClass("off");
			$(this).removeClass("on").addClass("off");
		}
	});

	$(".gateway-top-profile").click(function () {
		if ($(this).children(".gateway-top-profile-dropdown").is(":visible")) {
			$(this).removeClass("active");
			$(this).children(".gateway-top-profile-dropdown").slideUp(100);
		} else {
			$(this).addClass("active");
			$(this).children(".gateway-top-profile-dropdown").slideDown(100);
		}
	});

	$("#new-author-email").keyup(function () {
		if ($(this).val().length > 0) {
			$("#newAuthorModal").find("button[type=submit]").prop("disabled", false);
		} else {
			$("#newAuthorModal").find("button[type=submit]").prop("disabled", true);
		}
	});

	$(".careers-more").click(function () {
		if ($(this).text().trim() == "MORE INFORMATION") {
			$(this).html("LESS INFORMATION");
			$(this).parent().siblings(".careers-card-info").stop().slideDown(400);
		} else {
			$(this).html("MORE INFORMATION");
			$(this).parent().siblings(".careers-card-info").stop().slideUp(400);
		}
	});

});

function headerImages() {
	if (window.innerWidth > window.innerHeight) {
		$(".carousel-item img").removeClass("vertical").addClass("horizontal");
	} else {
		$(".carousel-item img").removeClass("horizontal").addClass("vertical");
	}
}

function onScroll() {
	var scrollTop = $(window).scrollTop();
	var fullHeight = $(document).height() - $(window).height();
	var percent = (scrollTop * 100) / (fullHeight - 500);
	$(".insights-article-progress-bar").css("width", percent + "%");
}

function initMap() {
	var uluru = {
		lat: 38.735950,
		lng: -9.147271
	};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: {
			lat: 38.739950,
			lng: -9.147271
		}
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}

function initMap2() {
	var uluru = {
		lat: 38.735950,
		lng: -9.147271
	};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: {
			lat: 38.735950,
			lng: -9.147271
		}
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}

function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
