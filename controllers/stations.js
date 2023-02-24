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
exports.stationsLatestReadings = void 0;
const index_1 = __importDefault(require("./index"));
// const prisma = require('../app')
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
// async function find (req, res) {
//     try{
//         console.log(req.body)
//         res.send(req.body)
//     }
//     catch(e){
//         console.log(e)
//     }
// }
function stationsLatestReadings() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stations = yield index_1.default.stations.findMany({
                where: {},
                orderBy: {
                    device_id: 'asc'
                }
            });
            return stations;
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.stationsLatestReadings = stationsLatestReadings;
// export * as stationController 
//# sourceMappingURL=stations.js.map