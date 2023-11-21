document.addEventListener('DOMContentLoaded', () => {
    console.log('Actual_date', actual_date);
    createCal();
    getPresentDay(Array.from(document.querySelectorAll(".number-days")));
    getAllEventsOfDay('PassedEvents');
    changeTypeEvent();
    createListEvents();
    createListExpired();
    startSetTimeOut();
});