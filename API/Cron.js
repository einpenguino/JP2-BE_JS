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
const airtemp_1 = require("../controllers/airtemp");
const humidity_1 = require("../controllers/humidity");
const winddir_1 = require("../controllers/winddir");
const windspeed_1 = require("../controllers/windspeed");
const rainfall_1 = require("../controllers/rainfall");
const cron = require('node-cron');
try {
    //  Cronjob for updating rain sensor data every 5 mins
    cron.schedule("20 */5 * * * *", function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("---------------------");
                // console.log("updating rain sensors every 20th second of 5 mins");
                yield (0, rainfall_1.updateRain)(10, 100);
                // console.log(toLocaleISO(new Date()))
            }
            catch (e) {
                console.log(e);
            }
            try {
                yield (0, airtemp_1.updateAirTemp)(5, 100);
            }
            catch (e) {
                console.log(e);
            }
            try {
                yield (0, humidity_1.updateHumidity)(5, 100);
            }
            catch (e) {
                console.log(e);
            }
            try {
                yield (0, winddir_1.updateWindDir)(5, 100);
            }
            catch (e) {
                console.log(e);
            }
            try {
                yield (0, windspeed_1.updateWindSpeed)(5, 100);
            }
            catch (e) {
                console.log(e);
            }
        });
    });
    //  Cronjob for updating 1 min sensor data
    // cron.schedule("20 * * * * *", async function () {
    //     try{
    //         // console.log("---------------------");
    //         // console.log("updating 1 min sensors every 20th second");
    //         await updateAirTemp(5, 100)
    //         await updateHumidity(5, 100)
    //         await updateWindDir(5,100)
    //         await updateWindSpeed(5,100)
    //         // console.log(toLocaleISO(new Date()))
    //     }
    //     catch(e){
    //         console.log(e)
    //     }
    // });
    // Cronjob for updating daily data at end of day
    cron.schedule("20 55 23 * * *", function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("---------------------");
                // console.log("Daily update of all sensors to patch data");
                yield (0, rainfall_1.updateRainDaily)();
                yield (0, airtemp_1.updateAirTempDaily)();
                yield (0, humidity_1.updateHumidityDaily)();
                yield (0, winddir_1.updateWindDirDaily)();
                yield (0, windspeed_1.updateWindSpeedDaily)();
                // console.log(toLocaleISO(new Date()))
            }
            catch (e) {
                console.log(e);
            }
        });
    });
    console.log('cron-initialised!');
}
catch (e) {
    console.log(e);
    console.log('cron failed!');
}
//# sourceMappingURL=Cron.js.map