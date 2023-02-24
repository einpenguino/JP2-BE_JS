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
const client_1 = require("@prisma/client");
// import { data } from './seed_data'
const userSeed_1 = require("./seedData/userSeed");
const placesSeed_1 = require("./seedData/placesSeed");
const routesSeed_1 = require("./seedData/routesSeed");
const rainfall_raw_json_1 = __importDefault(require("./seedData/rainfall_raw.json"));
const overall_stations_json_1 = __importDefault(require("./seedData/overall_stations.json"));
const airtemp_raw_json_1 = __importDefault(require("./seedData/airtemp_raw.json"));
const humidity_raw_json_1 = __importDefault(require("./seedData/humidity_raw.json"));
const winddir_raw_json_1 = __importDefault(require("./seedData/winddir_raw.json"));
const windspeed_raw_json_1 = __importDefault(require("./seedData/windspeed_raw.json"));
const Parsers_1 = require("../API/Parsers");
const prisma = new client_1.PrismaClient();
function createOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.rainfall.create({
            data: data
        });
        console.log(user);
    });
}
let iobj;
iobj = (0, Parsers_1.parseAPI)(rainfall_raw_json_1.default);
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.user.createMany({
            data: yield (0, userSeed_1.UserSeed)(),
            skipDuplicates: true, // Skip 'Bobo'
        });
        yield prisma.places.createMany({
            data: placesSeed_1.placesSeed,
            skipDuplicates: true
        });
        yield prisma.routes.createMany({
            data: routesSeed_1.routesSeed,
            skipDuplicates: true
        });
        yield prisma.stations.createMany({
            data: overall_stations_json_1.default.stations,
            skipDuplicates: true
        });
        yield prisma.airtemp.createMany({
            data: (0, Parsers_1.parseAPI)(airtemp_raw_json_1.default),
            skipDuplicates: true
        });
        yield prisma.humidity.createMany({
            data: (0, Parsers_1.parseAPI)(humidity_raw_json_1.default),
            skipDuplicates: true
        });
        yield prisma.rainfall.createMany({
            data: (0, Parsers_1.parseAPI)(rainfall_raw_json_1.default),
            skipDuplicates: true,
        });
        yield prisma.winddir.createMany({
            data: (0, Parsers_1.parseAPI)(winddir_raw_json_1.default),
            skipDuplicates: true
        });
        yield prisma.windspeed.createMany({
            data: (0, Parsers_1.parseAPI)(windspeed_raw_json_1.default),
            skipDuplicates: true
        });
        console.log(iobj.length);
        console.log('Multiple Creation Completed!');
    });
}
seed()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
//# sourceMappingURL=seed.js.map