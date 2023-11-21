//Obtain calculate to previous days of actual month
function prevDaysOfMonth() {
    const firstDayIndex = new Date(actual_date.getFullYear(), actual_date.getMonth(), 1).getDay();
    const prevLastDay = new Date(actual_date.getFullYear(), actual_date.getMonth(), 0).getDate();
    return {
        firstDayIndex: (firstDayIndex - 1 === -1) ? 6 : firstDayIndex - 1,
        prevLastDay: prevLastDay
    }
}

//Obtain calculate to days of actual month
function daysOfMonth() {
    const lastDay = new Date(actual_date.getFullYear(), actual_date.getMonth() + 1, 0).getDate();
    return lastDay;
}

//Obtain calculate to next days of actual month
function nextDaysOfMonth() {
    const lastDayIndex = new Date(actual_date.getFullYear(), actual_date.getMonth() + 1, 0).getDay();
    const nextDays = (lastDayIndex === 0) ? 0 : 7 - lastDayIndex;
    return nextDays;
}

//Save the previous date day of the actual month
function saveDatePrevDayOfMonth(dayMonth, index) {
    dayMonth.dataset.day = index
    dayMonth.dataset.month = (actual_date.getMonth() === 0) ? 11 : actual_date.getMonth() - 1;
    dayMonth.dataset.year = (actual_date.getMonth() === 0) ? actual_date.getFullYear() - 1 : actual_date.getFullYear();
}

//Save the date day of the actual month
function saveDateDayOfMonth(dayMonth, index) {
    dayMonth.dataset.day = index
    dayMonth.dataset.month = actual_date.getMonth()
    dayMonth.dataset.year = actual_date.getFullYear()
}

//Save the next date day of the actual month
function saveDateNextDayOfMonth(dayMonth, index) {
    dayMonth.dataset.day = index
    dayMonth.dataset.month = (actual_date.getMonth() === 11) ? 0 : actual_date.getMonth() + 1;
    dayMonth.dataset.year = (actual_date.getMonth() === 11) ? actual_date.getFullYear() + 1 : actual_date.getFullYear();
}

//Draw the days of one weekend and month and year actual
function headerCal() {
    var dateCalendar = document.getElementsByClassName("date-calendar");
    const month = MONTHS[actual_date.getMonth()];
    for (const element of dateCalendar) {
        element.textContent = `${month} de ${actual_date.getFullYear()}`;
    }
    const weekDaysMin = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const weekDaysMax = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    for (let index = 0; index < weekDaysMin.length; index++) {
        var smallWeekDay = newElement({
            tag: 'div',
            id: '',
            clas: [],
            content: weekDaysMin[index]
        });
        var bigWeekDay = newElement({
            tag: 'div',
            id: '',
            clas: ["nameWeekDays"],
            content: weekDaysMax[index]
        });
        smallCalendar.appendChild(smallWeekDay)
        bigCalendar.appendChild(bigWeekDay)
    }
}

//Show the previous days of the actual month
function prevMonthCal() {
    let prevDays = prevDaysOfMonth();
    for (let index = prevDays.firstDayIndex; index > 0; index--) {
        var smallDayMonth = newElement({
            tag: "div",
            id: "",
            clas: ["number-days", "previousMonthColor"],
            content: prevDays.prevLastDay - index + 1
        });
        var bigDayMonth = newElement({
            tag: 'div',
            id: '',
            clas: ["boxEventsCal"],
            content: ""
        });
        var numberDiv = newElement({
            tag: "div",
            id: "",
            clas: ["number-days", "previousMonthColor"],
            content: prevDays.prevLastDay - index + 1
        });
        bigDayMonth.appendChild(numberDiv);
        saveDatePrevDayOfMonth(smallDayMonth, prevDays.prevLastDay - index + 1);
        saveDatePrevDayOfMonth(numberDiv, prevDays.prevLastDay - index + 1);
        smallCalendar.appendChild(smallDayMonth);
        bigCalendar.appendChild(bigDayMonth);
    }
}

//Show the days of the actual month
function monthActualCal() {
    let lastDay = daysOfMonth();
    for (let index = 1; index <= lastDay; index++) {
        var smallDayMonth = newElement({
            tag: "div",
            id: "",
            clas: ["number-days"],
            content: index
        });
        var bigDayMonth = newElement({
            tag: 'div',
            id: '',
            clas: ["boxEventsCal"],
            content: ""
        });
        var numberDiv = newElement({
            tag: "div",
            id: "",
            clas: ["number-days"],
            content: index
        });
        bigDayMonth.appendChild(numberDiv);
        saveDateDayOfMonth(smallDayMonth, index);
        saveDateDayOfMonth(numberDiv, index);
        smallCalendar.appendChild(smallDayMonth);
        bigCalendar.appendChild(bigDayMonth);
    }
}

//Show the next days of the actual month
function nextMonthCal() {
    let nextDays = nextDaysOfMonth();
    for (let index = 1; index <= nextDays; index++) {
        var smallDayMonth = newElement({
            tag: "div",
            id: "",
            clas: ["number-days", "nextMonthColor"],
            content: index
        });
        var bigDayMonth = newElement({
            tag: 'div',
            id: '',
            clas: ["boxEventsCal"],
            content: ""
        });
        var numberDiv = newElement({
            tag: "div",
            id: "",
            clas: ["number-days", "nextMonthColor"],
            content: index
        });
        bigDayMonth.appendChild(numberDiv);
        saveDateNextDayOfMonth(smallDayMonth, index);
        saveDateNextDayOfMonth(numberDiv, index);
        smallCalendar.appendChild(smallDayMonth);
        bigCalendar.appendChild(bigDayMonth);
    }
}


//Create the  complete calendar.
function createCal() {
    dynamicCal();
    smallCalendar.innerHTML = null;
    bigCalendar.innerHTML = null;
    headerCal();
    prevMonthCal()
    monthActualCal()
    nextMonthCal()
    chooseDateCal()
    findFather()
    getPresentDay(Array.from(document.querySelectorAll(".number-days")));
    eventoDia();
}

//Events to choose all days of calendar
function chooseDateCal() {
    document.querySelectorAll(".number-days").forEach(element => {
        element.addEventListener("click", event => {
            var year = event.target.dataset.year
            var month = event.target.dataset.month
            var day = event.target.dataset.day
        })
    })
}

//Check the last day and marked
function getPresentDay(daysNumber) {
    return daysNumber.filter((element) => {
        if (element.dataset.year == new Date().getFullYear()) {
            if (element.dataset.month == new Date().getMonth()) {
                if (element.dataset.day == new Date().getDate()) {
                    element.classList.add("actualDay")
                    return element;
                }
            };
        }
    });
}

//Check is the same day
function isSameDay(date1, date2) {
    if (date1.getFullYear() == date2.getFullYear()) {
        if (date1.getMonth() == date2.getMonth()) {
            if (date1.getDay() == date2.getDay()) {
                return true;
            }
        };
    }
    return false;
}

//Create all list events
function createListEvents() {
    console.log(listEvents);
    document.getElementById('micalendar_minicalendar').innerHTML = null;
    var summary = newElement({
        tag: 'summary',
        id: '',
        clas: [],
        content: 'All Events List'
    });
    document.getElementById('micalendar_minicalendar').appendChild(summary);
    if (listEvents.length == 0) return;
    listEvents.forEach(element => {
        let hours = new Date(element.fechaInicio).getHours();
        let minutes = new Date(element.fechaInicio).getMinutes();
        let newP = newElement({
            tag: 'p',
            id: '',
            clas: [],
            content: `${hours} : ${minutes} ${element.eventTitle}`
        });
        document.getElementById('micalendar_minicalendar').appendChild(newP);
    });
}

//Change the different types of events
function changeTypeEvent() {
    detailsEventType.forEach(options => {
        console.log(listEvents);
        options.addEventListener('change', option => {
            if (option.target.checked == true) {
                getAllEventsOfDay(option.target.value);
                createListEvents();
            } else {
                listEvents = listEvents.filter(element => element.eventType !== option.target.value);
                createListEvents();
            }
        });
    });
}

//Show all events of the day
function getAllEventsOfDay(type) {
    if (localStorage.getItem(type)) var events = JSON.parse(localStorage.getItem(type));
    if (!events) return;
    let listFilter = events.filter(element => {
        let event = new Date(element.fechaInicio);
        return isSameDay(selectedTypeEvent, event);
    });
    listEvents = listEvents.concat(listFilter);
    orderListDay(listEvents);
}

//Order the day list
function orderListDay(array) {
    array.sort((a, b) => a.fechaInicio > b.fechaInicio);
}

//Create list expired events
function createListExpired() {
    document.getElementById('expiredEve_minicalendar').innerHTML = null;
    var summary = newElement({
        tag: 'summary',
        id: '',
        clas: [],
        content: 'All Expired Events List'
    });
    document.getElementById('expiredEve_minicalendar').appendChild(summary);
    let listExpired = [];
    if (localStorage.getItem('PassedEvents')) listExpired = JSON.parse(localStorage.getItem('PassedEvents'));
    if (listExpired.length == 0) return;
    listExpired.forEach(element => {
        let hours = new Date(element.fechaInicio).getHours();
        let minutes = new Date(element.fechaInicio).getMinutes();
        let newP = newElement({
            tag: 'p',
            id: '',
            clas: [],
            content: `${hours} : ${minutes} ${element.eventTitle}`
        });
        document.getElementById('expiredEve_minicalendar').appendChild(newP);
    });
}

//Do click in button previous day
document.querySelectorAll(".btn-prev-month").forEach(element => {
    element.addEventListener("click", event => {
        actual_date.setMonth((actual_date.getMonth() - 1));
        createCal();
    })
})

//Do click in button next day
document.querySelectorAll(".btn-next-month").forEach(element => {
    element.addEventListener("click", event => {
        actual_date.setMonth((actual_date.getMonth() + 1));
        createCal();
    })
})

//Produced transition of the calendar
function dynamicCal() {
    bigCalendar.style.transform = 'translate(100%)';
    setTimeout(() => {
        bigCalendar.style.transform = 'translate(0%)';
    }, 100);
}