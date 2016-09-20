 $(document).ready(function () {


            date = getDate();
            var eventsData = [];
            if (typeof (Storage) !== "undefined") {
                eventsData = JSON.parse(localStorage.getItem("details"));
                if (eventsData === null) {
                    eventsData = [];
                }
                else if (eventsData.length === undefined) {
                    eventsData = [eventsData];
                }
            }
            else {
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
            $('#txtDates').datepicker({ autoSize: true });
            initialize();
        });
var calendarRefresh=function(){
    var eventsData = [];
            if (typeof (Storage) !== "undefined") {
                eventsData = JSON.parse(localStorage.getItem("details"));
                if (eventsData === null) {
                    eventsData = [];
                }
                else if (eventsData.length === undefined) {
                    eventsData = [eventsData];
                }
            }
            else {
                //sorry storage not supported
            }
            $('#calendar').fullCalendar( 'removeEvents');
            $('#calendar').fullCalendar( 'addEventSource', eventsData);
};
        function callingAjax(t, u, s, e) {
            $.ajax({
                type: t,
                url: u,
                success: s,
                error: e
            });
        }
        var initialize = function () {
            $('#btnAdd').click(function () {
                if (typeof (Storage) !== "undefined") {

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
                        }
                        else {
                            var ind = [obj, {
                                title: $('#txtEvents').val(),
                                start: getDate($('#txtDates').val()),
                                backgroundColor: "red"
                            }];
                            localStorage.setItem("details", JSON.stringify(ind));
                        }
                    }
                    else {
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
        var getDate = function (dt) {

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
