
/*
* Converts a string representing an hour in military time to AM/PM notation
* '14:00' -> '2:00 PM'
*/
function toTwelveTime(time) {
    if (!time || typeof time !== "string") {
        return null;
    }

    const parts = time.split(":");
    if (parts.length !== 2) {
        return null;
    }

    for (const part of parts) {
        if (!/^\d+$/.test(part)) {
            return null;
        }
    }

    const hour24 = Number(parts[0]);
    let hour12 = hour24 % 12;
    if (hour12 === 0) {
        hour12 = 12;
    }
    const meridiem = hour24 >= 12 ? "PM" : "AM";

    const time12 = `${hour12}:${parts[1]} ${meridiem}`;

    return time12;
}

// Converts a military (24 hour) time string into a number of minutes
function toMinutesNumber(time)  {
    if (!time || typeof time !== "string") {
        return null;
    }

    const parts = time.split(":");
    if (parts.length !== 2) {
        return null;
    }

    for (const part of parts) {
        if (!/^\d+$/.test(part)) {
            return null;
        }
    }

    const hour24 = Number(parts[0]);
    const minutes = Number(parts[1]);

    return (hour24 * 60) + minutes;
}

function getDaysBetweenDates(isoDate1, isoDate2) {
    console.log(isoDate1);
    console.log(isoDate2);

    if ((typeof isoDate1 !== "string" || typeof isoDate2 !== "string") || (!isoDate1 || !isoDate2)) {
        return null;
    }

    const ONE_DAY = 1000 * 60 * 60 * 24;
    const date1 = new Date(isoDate1);
    const date2 = new Date(isoDate2);

    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    const diff = Math.abs(utc2 - utc1); 

    return Math.floor(diff / ONE_DAY);
}