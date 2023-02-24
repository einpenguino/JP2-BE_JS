"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.humidityFormatted = exports.updateHumidity = exports.updateHumidityMini = exports.updateHumidityDaily = exports.humidityLatest = exports.readHumidity = exports.humidityLatestReadings = void 0;
const Parsers_1 = require("../API/Parsers");
const Queries_1 = require("../API/Queries");
const Datetime_1 = require("../API/Datetime");
const index_1 = __importDefault(require("./index"));
function humidityLatestReadings() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const humidity = yield index_1.default.humidity.findMany({
                where: {},
                orderBy: { timestamp: 'desc' },
                distinct: ['station_id'],
                select: {
                    timestamp: true,
                    station_id: true,
                    value: true
                }
            });
            return humidity;
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.humidityLatestReadings = humidityLatestReadings;
function readHumidity(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield index_1.default.humidity.findMany({
                where: params,
                select: {
                    'timestamp': true,
                    'station_id': true,
                    'value': true
                }
            });
            return result;
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.readHumidity = readHumidity;
function humidityLatest() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield index_1.default.humidity.findFirst({
                where: {},
                select: {
                    'timestamp': true,
                },
                orderBy: { 'timestamp': 'desc' },
                take: 1
            });
            return result;
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.humidityLatest = humidityLatest;
function updateHumidityDaily() {
    return __awaiter(this, void 0, void 0, function* () {
        let a = new Date();
        let b;
        let c;
        b = yield humidityLatest();
        c = yield (0, Datetime_1.getDailyScheduler)(b.timestamp);
        // console.log(c)
        for (let d of c) {
            try {
                let res;
                res = yield (0, Queries_1.getHumidity)(`date=${d}`);
                let json = yield (0, Parsers_1.parseAPI)(res.data);
                let stations = yield (0, Parsers_1.parseMetaData)(res.data);
                yield index_1.default.humidity.createMany({
                    data: json,
                    skipDuplicates: true,
                });
                yield index_1.default.stations.createMany({
                    data: stations,
                    skipDuplicates: true
                });
            }
            catch (e) {
                console.log(e);
            }
        }
    });
}
exports.updateHumidityDaily = updateHumidityDaily;
function updateHumidityMini() {
    return __awaiter(this, void 0, void 0, function* () {
        let a = new Date();
        let b;
        let c;
        b = yield humidityLatest();
        c = (0, Datetime_1.miniScheduler)(b.timestamp, new Date(), 1, 10);
        // console.log(c)
        for (let d of c) {
            try {
                let res;
                res = yield (0, Queries_1.getHumidity)(`date_time=${d}`);
                let json = yield (0, Parsers_1.parseAPI)(res.data);
                let stations = yield (0, Parsers_1.parseMetaData)(res.data);
                yield index_1.default.humidity.createMany({
                    data: json,
                    skipDuplicates: true,
                });
                yield index_1.default.stations.createMany({
                    data: stations,
                    skipDuplicates: true
                });
            }
            catch (e) {
                console.log(e);
            }
        }
    });
}
exports.updateHumidityMini = updateHumidityMini;
function updateHumidity(delay, threshold) {
    return __awaiter(this, void 0, void 0, function* () {
        let a = new Date();
        let b;
        let c;
        b = yield humidityLatest();
        if (a.getTime() - b.timestamp.getTime() > delay * 60 * 1e3 * threshold) {
            // Initiate Daily seeding instead of instantaneous
            c = (0, Datetime_1.getDailyScheduler)(b.timestamp);
            // console.log(c)
            for (let d of c) {
                try {
                    let res;
                    res = yield (0, Queries_1.getHumidity)(`date=${d}`);
                    let json = yield (0, Parsers_1.parseAPI)(res.data);
                    let stations = yield (0, Parsers_1.parseMetaData)(res.data);
                    yield index_1.default.humidity.createMany({
                        data: json,
                        skipDuplicates: true,
                    });
                    yield index_1.default.stations.createMany({
                        data: stations,
                        skipDuplicates: true
                    });
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
        else {
            // Use Mini updating
            c = (0, Datetime_1.miniScheduler)(b.timestamp, new Date(), 1, 10);
            // console.log(c)
            for (let d of c) {
                try {
                    let res;
                    res = yield (0, Queries_1.getHumidity)(`date_time=${d}`);
                    let json = yield (0, Parsers_1.parseAPI)(res.data);
                    let stations = yield (0, Parsers_1.parseMetaData)(res.data);
                    yield index_1.default.humidity.createMany({
                        data: json,
                        skipDuplicates: true,
                    });
                    yield index_1.default.stations.createMany({
                        data: stations,
                        skipDuplicates: true
                    });
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
    });
}
exports.updateHumidity = updateHumidity;
function humidityFormatted(inputDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const stations = yield index_1.default.stations.findMany({
            where: {
                reading_unit: 'percentage'
            },
            orderBy: {
                device_id: 'asc'
            },
            select: {
                device_id: true
            }
        });
        // console.log(stations)
        let stationsReformat;
        stationsReformat = {};
        stations.map(ele => {
            stationsReformat[parseInt(ele.device_id.slice(1))] = ele.device_id;
        });
        // console.log(stationsReformat)
        let columns;
        let colStation;
        let stationCol;
        let iter = 2;
        columns = [{ field: 'col1', headerName: 'Datetime', width: 180 }];
        colStation = {};
        stationCol = {};
        for (let i in stationsReformat) {
            columns.push({
                field: `col${iter}`,
                headerName: stationsReformat[i],
                width: 15
            });
            colStation[`col${iter}`] = stationsReformat[i];
            stationCol[stationsReformat[i]] = `col${iter}`;
            iter += 1;
        }
        // console.log(columns)
        const result = yield index_1.default.humidity.findMany({
            where: {
                timestamp: {
                    gte: new Date(inputDate)
                },
            },
            select: {
                timestamp: true,
                station_id: true,
                value: true
            },
            orderBy: {
                // station_id:'asc'
                timestamp: 'desc'
            },
            // take : 10000
        });
        // console.log(result)
        let resultReformat;
        resultReformat = {};
        iter = 1;
        result.map((ele) => {
            let localTime = (0, Datetime_1.toLocaleISO)(ele.timestamp);
            if (!(localTime in resultReformat)) {
                resultReformat[localTime] = {};
            }
            resultReformat[localTime][ele.station_id] = ele.value;
        });
        // console.log(resultReformat)
        let resultReformat1;
        resultReformat1 = [];
        let tempObj;
        iter = 1;
        for (let time in resultReformat) {
            tempObj = { id: iter };
            tempObj['col1'] = time;
            for (let s in resultReformat[time]) {
                tempObj[stationCol[s]] = resultReformat[time][s];
            }
            resultReformat1.push(tempObj);
            iter += 1;
        }
        return { rows: resultReformat1, columns: columns };
    });
}
exports.humidityFormatted = humidityFormatted;
//# sourceMappingURL=humidity.js.map