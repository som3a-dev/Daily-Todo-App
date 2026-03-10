function getNextResetTime(day_start_hour) {
    const now = new Date();
    const reset = new Date();
/*  const reset = now;
    reset.setSeconds(now.getSeconds() + 10);*/

    reset.setHours(day_start_hour, 0, 0, 0);

    if (now >= reset) {
        reset.setDate(now.getDate() + 1);
    }

    return reset;
}

function scheduleReset() {
    const reset = getNextResetTime(0);
    const wait = reset - new Date();

    console.log(reset);

    setTimeout(() => {
        doDailyReset();
        scheduleReset();
    }, wait);
}

function doDailyReset() {
    clearTasks();
}

function doMissedReset() {
    const current_date = new Date().toISOString().slice(0, 10);
    const last_date = localStorage.getItem("last-date");
    const days_passed = getDaysBetweenDates(current_date, last_date);

    if ((days_passed >= 1) || (days_passed == null)) {
        doDailyReset();
    }

    localStorage.setItem("last-date", current_date);
}
