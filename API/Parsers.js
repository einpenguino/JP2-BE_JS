"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMetaData = exports.parseAPI = void 0;
function parseAPI(readings) {
    let productArr;
    productArr = [];
    readings.items.map((element) => {
        element.readings.map((element1) => {
            productArr.push({
                'timestamp': element.timestamp,
                'station_id': element1.station_id,
                'value': isNaN(element1.value) ? null : element1.value
            });
        });
    });
    return productArr;
}
exports.parseAPI = parseAPI;
function parseMetaData(readings) {
    let stationsMet;
    stationsMet = [];
    readings.metadata.stations.map((ele) => {
        stationsMet.push({
            device_id: ele.device_id,
            name: ele.name,
            latitude: ele.location.latitude,
            longitude: ele.location.latitude,
            reading_type: readings.metadata.reading_type,
            reading_unit: readings.metadata.reading_unit
        });
    });
    return stationsMet;
}
exports.parseMetaData = parseMetaData;
function toLocaleISO(date) {
    let d;
    d = new Date(date);
    let dateArr;
    dateArr = d.toLocaleDateString('en-GB').split('/');
    return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}T${d.toLocaleTimeString('en-GB', { hour12: false })}`;
}
function toLocaleQueryDate(date) {
    let d;
    d = new Date(date);
    let dateArr;
    dateArr = d.toLocaleDateString('en-GB').split('/');
    return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
}
// () => {
//   let result : any
//   let d : any
//   let d1 : any
//   let locale : any
//   let option : any
//   let localeString : any
//   // locale = {
//   //   nu : ''
//   // }
//   option = {
//     'dateStyle' : 'short',
//     'timeStyle' : 'long',
//     // calendar : 'iso8601',
//     'timeZone' : "Asia/Singapore"
//   }
//   localeString = {
//     year:'numeric',
//     month:'numeric',
//     day:'numeric',
//     hour:'numeric',
//     minute:'numeric',
//     second:'numeric',
//     hour12:false
//     // fractionalSecondDigits: 3
//   }
//   result = await rainfallLatest()
//   console.log(toLocaleISO(result.timestamp))
//   console.log(toLocaleQueryDate(result.timestamp))
//   // d = new Date(result.timestamp)
//   // let dateArr : string[]
//   // dateArr = d.toLocaleDateString('en-GB').split('/')
//   // console.log(`${dateArr[2]}-${dateArr[1]}-${dateArr[0]}T${d.toLocaleTimeString('en-GB', {hour12:false})}`)
//   // console.log(d.toLocaleDateString('en-GB').split('/'))
//   // console.log(d.toLocaleTimeString('en-GB', {hour12:false}))
//   // // console.log(d.toLocaleString([], {}))
//   // console.log(new Intl.DateTimeFormat('en-GB', localeString).format(d).replaceAll('/', '-'))
//   // d1 = new Date(d)
//   // console.log(new Intl.DateTimeFormat('iso', option).format(d))
//   // console.log(new Date(d
//   //     .toLocaleString()
//   // ).toISOString())
// }
//# sourceMappingURL=Parsers.js.map