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
exports.checkLoggedIn = exports.challengeLogin = void 0;
// import jwt from 'jsonwebtoken'
const user_1 = require("./user");
const authCore_1 = require("../middleware/authCore");
function challengeLogin(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user;
            user = yield (0, user_1.findUserOrThrow)(username);
            if (user) {
                // const checkPassword = await comparePassword(password, user.password)
                if (yield (0, authCore_1.comparePassword)(password, user.password)) {
                    delete user.password;
                    return user;
                }
                else {
                    // Wrong Password
                    return false;
                }
            }
            else {
                // User Does not exist
                return false;
            }
        }
        catch (e) {
            // any other failure (Invalid Input etc)
            console.log(e);
            return false;
        }
    });
}
exports.challengeLogin = challengeLogin;
function checkLoggedIn(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user;
            user = yield (0, user_1.findUserOrThrow)(username);
            if (user) {
                // const checkPassword = await comparePassword(password, user.password)
                if (yield (0, authCore_1.comparePassword)(password, user.password)) {
                    delete user.password;
                    return user;
                }
                else {
                    // Wrong Password
                    return false;
                }
            }
            else {
                // User Does not exist
                return false;
            }
        }
        catch (e) {
            // any other failure (Invalid Input etc)
            console.log(e);
            return false;
        }
    });
}
exports.checkLoggedIn = checkLoggedIn;
//# sourceMappingURL=userCreds.js.map