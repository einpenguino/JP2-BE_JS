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
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const app = (0, express_1.default)();
// const cookieParser = require('cookie-parser')
// import read from '../controllers/stations'
const stations_1 = require("../controllers/stations");
const rainfall_1 = require("../controllers/rainfall");
const humidity_1 = require("../controllers/humidity");
const airtemp_1 = require("../controllers/airtemp");
const winddir_1 = require("../controllers/winddir");
const windspeed_1 = require("../controllers/windspeed");
const combination_1 = require("../controllers/combination");
const userCreds_1 = require("../controllers/userCreds");
const authCore_1 = require("../middleware/authCore");
const user_1 = require("../controllers/user");
const authMiddleware_1 = require("../middleware/authMiddleware");
const user_2 = require("../controllers/user");
const places_1 = require("../controllers/places");
const routes_1 = require("../controllers/routes");
const corsConfig = {
    credentials: true,
    origin: true,
};
// Middleware
app.use(cors(corsConfig));
// app.use(cors())
app.use(express_1.default.json());
// app.use(cookieParser())
// ... your REST API routes will go here
app.get('/stations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, stations_1.stationsLatestReadings)();
        res.json(result);
    }
    catch (e) {
        res.sendStatus(500);
    }
}));
app.post('/rainfall', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const result = await readRainfall(req.body.datetime)
        const result = yield (0, rainfall_1.rainfallFormatted)(req.body.datetime);
        res.status(200).json(result);
    }
    catch (e) {
        res.sendStatus(500);
    }
}));
app.post('/humidity', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const result = await readRainfall(req.body.datetime)
        const result = yield (0, humidity_1.humidityFormatted)(req.body.datetime);
        res.status(200).json(result);
    }
    catch (e) {
        res.sendStatus(500);
    }
}));
app.post('/airtemp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const result = await readRainfall(req.body.datetime)
        const result = yield (0, airtemp_1.airTempFormatted)(req.body.datetime);
        res.status(200).json(result);
    }
    catch (e) {
        res.sendStatus(500);
    }
}));
app.post('/winddir', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const result = await readRainfall(req.body.datetime)
        const result = yield (0, winddir_1.windDirFormatted)(req.body.datetime);
        res.status(200).json(result);
    }
    catch (e) {
        res.sendStatus(500);
    }
}));
app.post('/windspeed', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const result = await readRainfall(req.body.datetime)
        const result = yield (0, windspeed_1.windSpeedFormatted)(req.body.datetime);
        res.status(200).json(result);
    }
    catch (e) {
        res.sendStatus(500);
    }
}));
app.get('/rainfallnow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, rainfall_1.rainfallLatest)();
        res.json(result);
    }
    catch (e) {
        res.sendStatus(500);
    }
}));
app.get('/latest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, combination_1.sendAllLatest)();
        // console.log('latest called!')
        res.json(result);
    }
    catch (e) {
        res.sendStatus(500);
    }
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body)
        const { username, password } = req.body;
        const user = yield (0, userCreds_1.challengeLogin)(username, password);
        if (user) {
            let token = (0, authCore_1.signJWT)({ username: user.username });
            // res.cookie('JP2', signJWT({username: user.username}), {maxAge:60000*60*24})
            // res.cookie('JP2', token, {httpOnly:true,maxAge:60000*60*24})
            // console.log(token)
            res.status(200).cookie('JP2', (0, authCore_1.signJWT)({ username: user.username }), { maxAge: 60000 * 60 * 24 }).json(user);
        }
        else {
            res.status(500).send('Invalid Username or Password!');
        }
    }
    catch (e) {
        res.status(500).send('Invalid Input parameters!');
    }
}));
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user;
        user = yield (0, user_1.createUser)(req.body);
        console.log(user);
        delete user.password;
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(500).send('User Creation Failed!');
        }
    }
    catch (e) {
        res.status(500).send('Invalid Input parameters!');
    }
}));
app.delete('/logout', (req, res) => {
    try {
        console.log('logout-triggered!');
        res.clearCookie('JP2');
        res.sendStatus(200);
    }
    catch (e) {
        //   console.log(e)
        res.send(500).send('Logout Failed');
    }
});
app.post('/favplace', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        // console.log(req.headers)
        console.log(req.body);
        if (req.headers.cookie) {
            let decoded = yield (0, authMiddleware_1.auth)(req, res);
            console.log(decoded);
            let user;
            user = yield (0, user_2.findUserOrThrow)(decoded.username);
            console.log(user);
            let { start, end } = req.body;
            // console.log({address : start.address, latitude : start.lat, longitude : start.lng})
            yield (0, places_1.createPlace)([{ address: start.address, latitude: start.lat, longitude: start.lng }]);
            yield (0, places_1.createPlace)([{ address: end.address, latitude: end.lat, longitude: end.lng }]);
            const start_id = yield (0, places_1.findAddress)(start.address);
            const end_id = yield (0, places_1.findAddress)(end.address);
            yield (0, routes_1.createRoute)([{ start_id: start_id === null || start_id === void 0 ? void 0 : start_id.id, end_id: end_id === null || end_id === void 0 ? void 0 : end_id.id, user_fk: user === null || user === void 0 ? void 0 : user.id }]);
            res.sendStatus(200);
        }
        else {
            res.status(401).send('Need to log in!');
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Need to log in to favourite place!');
    }
}));
app.post('/getfavroutes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let routes = yield (0, routes_1.findRoutes)(req.body.username);
        res.status(200).json(routes);
    }
    catch (e) {
        res.sendStatus(500);
    }
}));
app.post('/getuserdetails', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.listen(process.env.EXPRESS_PORT, () => console.log(`REST API server ready at: http://localhost:${process.env.EXPRESS_PORT}`));
//# sourceMappingURL=index.js.map