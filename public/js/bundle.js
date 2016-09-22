$(document).ready(function() {


    date = getDate();
    var eventsData = [];
    if (typeof(Storage) !== "undefined") {
        eventsData = JSON.parse(localStorage.getItem("details"));
        if (eventsData === null) {
            eventsData = [];
        } else if (eventsData.length === undefined) {
            eventsData = [eventsData];
        }
    } else {
        //sorry storage not supported
    }
    $('#calendar').draggable();
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'month'
        },
        defaultDate: date,
        editable: false,
        eventLimit: true, // allow "more" link when too many events
        events: eventsData
    });
    $('#txtDates').datepicker({
        autoSize: true
    });
    initialize();
});
var calendarRefresh = function() {
    var eventsData = [];
    if (typeof(Storage) !== "undefined") {
        eventsData = JSON.parse(localStorage.getItem("details"));
        if (eventsData === null) {
            eventsData = [];
        } else if (eventsData.length === undefined) {
            eventsData = [eventsData];
        }
    } else {
        //sorry storage not supported
    }
    $('#calendar').fullCalendar('removeEvents');
    $('#calendar').fullCalendar('addEventSource', eventsData);
};

function callingAjax(t, u, s, e) {
    $.ajax({
        type: t,
        url: u,
        success: s,
        error: e
    });
}
var initialize = function() {
    $('#btnAdd').click(function() {
        if (typeof(Storage) !== "undefined") {

            // Code for localStorage/sessionStorage.
            var dat = $('#txtDates').val();
            dat = new Date(dat);
            if (dat == "Invalid Date") {
                $('#txtDates').val("Select date");
                return false;
            }
            var obj = JSON.parse(localStorage.getItem("details"));

            if (obj !== null) {
                console.log(obj);
                if (obj.length !== undefined) {
                    obj.push({
                        title: $('#txtEvents').val(),
                        start: getDate($('#txtDates').val()),
                        backgroundColor: "red"
                    });
                    localStorage.setItem("details", JSON.stringify(obj));
                } else {
                    var ind = [obj, {
                        title: $('#txtEvents').val(),
                        start: getDate($('#txtDates').val()),
                        backgroundColor: "red"
                    }];
                    localStorage.setItem("details", JSON.stringify(ind));
                }
            } else {
                obj = {
                    title: $('#txtEvents').val(),
                    start: getDate($('#txtDates').val()),
                    backgroundColor: "red"
                };
                localStorage.setItem("details", JSON.stringify(obj));
            }
            calendarRefresh();

        } else {
            alert('Sorry it seems there is no local storage supported in your browser!!');

        }

    });
};
var getDate = function(dt) {

    var d = new Date();
    if (dt !== undefined) {
        d = new Date(dt);
    }
    var yr = d.getFullYear();
    var mn = d.getMonth() + 1;
    var day = d.getDate();
    var date = yr + "-";
    if (mn < 10) {
        date += "0";
    }
    date += mn + "-";
    if (day < 10) {
        date += "0";
    }
    date += day;
    return date;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuICAgIGRhdGUgPSBnZXREYXRlKCk7XHJcbiAgICB2YXIgZXZlbnRzRGF0YSA9IFtdO1xyXG4gICAgaWYgKHR5cGVvZihTdG9yYWdlKSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIGV2ZW50c0RhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZGV0YWlsc1wiKSk7XHJcbiAgICAgICAgaWYgKGV2ZW50c0RhdGEgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgZXZlbnRzRGF0YSA9IFtdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzRGF0YS5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBldmVudHNEYXRhID0gW2V2ZW50c0RhdGFdO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy9zb3JyeSBzdG9yYWdlIG5vdCBzdXBwb3J0ZWRcclxuICAgIH1cclxuICAgICQoJyNjYWxlbmRhcicpLmRyYWdnYWJsZSgpO1xyXG4gICAgJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKHtcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgbGVmdDogJ3ByZXYsbmV4dCcsXHJcbiAgICAgICAgICAgIGNlbnRlcjogJ3RpdGxlJyxcclxuICAgICAgICAgICAgcmlnaHQ6ICdtb250aCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlZmF1bHREYXRlOiBkYXRlLFxyXG4gICAgICAgIGVkaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICBldmVudExpbWl0OiB0cnVlLCAvLyBhbGxvdyBcIm1vcmVcIiBsaW5rIHdoZW4gdG9vIG1hbnkgZXZlbnRzXHJcbiAgICAgICAgZXZlbnRzOiBldmVudHNEYXRhXHJcbiAgICB9KTtcclxuICAgICQoJyN0eHREYXRlcycpLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgIGF1dG9TaXplOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIGluaXRpYWxpemUoKTtcclxufSk7XHJcbnZhciBjYWxlbmRhclJlZnJlc2ggPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBldmVudHNEYXRhID0gW107XHJcbiAgICBpZiAodHlwZW9mKFN0b3JhZ2UpICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgZXZlbnRzRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJkZXRhaWxzXCIpKTtcclxuICAgICAgICBpZiAoZXZlbnRzRGF0YSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBldmVudHNEYXRhID0gW107XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNEYXRhLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGV2ZW50c0RhdGEgPSBbZXZlbnRzRGF0YV07XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvL3NvcnJ5IHN0b3JhZ2Ugbm90IHN1cHBvcnRlZFxyXG4gICAgfVxyXG4gICAgJCgnI2NhbGVuZGFyJykuZnVsbENhbGVuZGFyKCdyZW1vdmVFdmVudHMnKTtcclxuICAgICQoJyNjYWxlbmRhcicpLmZ1bGxDYWxlbmRhcignYWRkRXZlbnRTb3VyY2UnLCBldmVudHNEYXRhKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNhbGxpbmdBamF4KHQsIHUsIHMsIGUpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogdCxcclxuICAgICAgICB1cmw6IHUsXHJcbiAgICAgICAgc3VjY2VzczogcyxcclxuICAgICAgICBlcnJvcjogZVxyXG4gICAgfSk7XHJcbn1cclxudmFyIGluaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcclxuICAgICQoJyNidG5BZGQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodHlwZW9mKFN0b3JhZ2UpICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBDb2RlIGZvciBsb2NhbFN0b3JhZ2Uvc2Vzc2lvblN0b3JhZ2UuXHJcbiAgICAgICAgICAgIHZhciBkYXQgPSAkKCcjdHh0RGF0ZXMnKS52YWwoKTtcclxuICAgICAgICAgICAgZGF0ID0gbmV3IERhdGUoZGF0KTtcclxuICAgICAgICAgICAgaWYgKGRhdCA9PSBcIkludmFsaWQgRGF0ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjdHh0RGF0ZXMnKS52YWwoXCJTZWxlY3QgZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgb2JqID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImRldGFpbHNcIikpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9iaiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cob2JqKTtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAkKCcjdHh0RXZlbnRzJykudmFsKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBnZXREYXRlKCQoJyN0eHREYXRlcycpLnZhbCgpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJkZXRhaWxzXCIsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kID0gW29iaiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJCgnI3R4dEV2ZW50cycpLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZ2V0RGF0ZSgkKCcjdHh0RGF0ZXMnKS52YWwoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1dO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZGV0YWlsc1wiLCBKU09OLnN0cmluZ2lmeShpbmQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJCgnI3R4dEV2ZW50cycpLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBnZXREYXRlKCQoJyN0eHREYXRlcycpLnZhbCgpKSxcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmVkXCJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImRldGFpbHNcIiwgSlNPTi5zdHJpbmdpZnkob2JqKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FsZW5kYXJSZWZyZXNoKCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdTb3JyeSBpdCBzZWVtcyB0aGVyZSBpcyBubyBsb2NhbCBzdG9yYWdlIHN1cHBvcnRlZCBpbiB5b3VyIGJyb3dzZXIhIScpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcbnZhciBnZXREYXRlID0gZnVuY3Rpb24oZHQpIHtcclxuXHJcbiAgICB2YXIgZCA9IG5ldyBEYXRlKCk7XHJcbiAgICBpZiAoZHQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGQgPSBuZXcgRGF0ZShkdCk7XHJcbiAgICB9XHJcbiAgICB2YXIgeXIgPSBkLmdldEZ1bGxZZWFyKCk7XHJcbiAgICB2YXIgbW4gPSBkLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgdmFyIGRheSA9IGQuZ2V0RGF0ZSgpO1xyXG4gICAgdmFyIGRhdGUgPSB5ciArIFwiLVwiO1xyXG4gICAgaWYgKG1uIDwgMTApIHtcclxuICAgICAgICBkYXRlICs9IFwiMFwiO1xyXG4gICAgfVxyXG4gICAgZGF0ZSArPSBtbiArIFwiLVwiO1xyXG4gICAgaWYgKGRheSA8IDEwKSB7XHJcbiAgICAgICAgZGF0ZSArPSBcIjBcIjtcclxuICAgIH1cclxuICAgIGRhdGUgKz0gZGF5O1xyXG4gICAgcmV0dXJuIGRhdGU7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
