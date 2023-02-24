"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.miniScheduler = exports.getDailyScheduler = exports.toLocaleQueryDate = exports.toLocaleISO = void 0;
function toLocaleISO(date) {
    let d;
    d = new Date(date);
    let dateArr;
    dateArr = d.toLocaleDateString('en-GB').split('/');
    return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}T${d.toLocaleTimeString('en-GB', { hour12: false })}`;
}
exports.toLocaleISO = toLocaleISO;
function toLocaleQueryDate(date) {
    let d;
    d = new Date(date);
    let dateArr;
    dateArr = d.toLocaleDateString('en-GB').split('/');
    return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
}
exports.toLocaleQueryDate = toLocaleQueryDate;
function getDailyScheduler(start) {
    let currentTime = new Date();
    let endToday = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
    let startTime;
    let dateArr;
    startTime = new Date(start).getTime();
    dateArr = [];
    console.log(currentTime.getFullYear(), currentTime.getMonth(), (currentTime.getDate()));
    console.log(start);
    console.log(endToday);
    while (startTime < endToday.getTime()) {
        dateArr.push(toLocaleQueryDate(startTime));
        startTime += 24 * 60 * 60 * 1e3;
    }
    if (!dateArr.includes(toLocaleQueryDate(endToday))) {
        dateArr.push(toLocaleQueryDate(endToday));
    }
    // dateArr.push(toLocaleQueryDate(startTime))
    // console.log(dateArr)
    return dateArr;
}
exports.getDailyScheduler = getDailyScheduler;
function miniScheduler(dbstart, currentTime, step, delay) {
    // let currentTime = new Date()
    if (currentTime.getTime() - dbstart.getTime() < delay * 60 * 1e3) {
        return [];
    }
    let endTime = new Date(currentTime.getTime() - delay * 60 * 1e3).setSeconds(0);
    let iterTime;
    let dateArr;
    iterTime = new Date(dbstart).getTime();
    dateArr = [];
    while (iterTime < endTime) {
        iterTime += step * 60 * 1e3;
        if (iterTime <= endTime)
            dateArr.push(toLocaleISO(new Date(iterTime)));
    }
    return dateArr;
}
exports.miniScheduler = miniScheduler;
//# sourceMappingURL=Datetime.js.map