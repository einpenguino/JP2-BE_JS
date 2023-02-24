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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAllLatest = void 0;
const airtemp_1 = require("./airtemp");
const humidity_1 = require("./humidity");
const rainfall_1 = require("./rainfall");
const winddir_1 = require("./winddir");
const windspeed_1 = require("./windspeed");
const stations_1 = require("./stations");
function sendAllLatest() {
    return __awaiter(this, void 0, void 0, function* () {
        const station = yield (0, stations_1.stationsLatestReadings)();
        const rainfall = yield (0, rainfall_1.rainfallLatestReadings)();
        const airtemp = yield (0, airtemp_1.airTempLatestReadings)();
        const humidity = yield (0, humidity_1.humidityLatestReadings)();
        const winddir = yield (0, winddir_1.windDirLatestReadings)();
        const windspeed = yield (0, windspeed_1.windSpeedLatestReadings)();
        const a = ({
            metadata: station,
            rainfall: rainfall,
            airtemp: airtemp,
            humidity: humidity,
            winddir: winddir,
            windspeed: windspeed
        });
        // console.log(a)
        return a;
    });
}
exports.sendAllLatest = sendAllLatest;
//# sourceMappingURL=combination.js.map