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
exports.getWindDir = exports.getWindSpeed = exports.getHumidity = exports.getAirTemp = exports.getRainfall = void 0;
const axios_1 = __importDefault(require("axios"));
const baseURI = 'https://api.data.gov.sg/v1/environment/';
function getRainfall(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield axios_1.default.get(`${baseURI}rainfall?${query}`);
            return res;
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.getRainfall = getRainfall;
function getAirTemp(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield axios_1.default.get(`${baseURI}air-temperature?${query}`);
            return res;
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.getAirTemp = getAirTemp;
function getHumidity(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield axios_1.default.get(`${baseURI}relative-humidity?${query}`);
            return res;
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.getHumidity = getHumidity;
function getWindDir(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield axios_1.default.get(`${baseURI}wind-direction?${query}`);
            return res;
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.getWindDir = getWindDir;
function getWindSpeed(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield axios_1.default.get(`${baseURI}wind-speed?${query}`);
            return res;
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.getWindSpeed = getWindSpeed;
//# sourceMappingURL=Queries.js.map