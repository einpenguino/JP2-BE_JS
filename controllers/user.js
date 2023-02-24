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
exports.createUser = exports.findUserOrThrow = void 0;
const index_1 = __importDefault(require("./index"));
const authCore_1 = require("../middleware/authCore");
function findUserOrThrow(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield index_1.default.user.findFirstOrThrow({
                where: {
                    username: username
                },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    password: true,
                    routes: true,
                    isAdmin: true
                }
            });
            // console.log(user)
            return user;
        }
        catch (e) {
            // console.log(e)
            return false;
        }
    });
}
exports.findUserOrThrow = findUserOrThrow;
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, username, password } = data;
            const user = yield index_1.default.user.create({
                data: {
                    name: name,
                    email: email,
                    username: username,
                    password: yield (0, authCore_1.genPassword)(password)
                }
            });
            return user;
        }
        catch (e) {
            return false;
        }
    });
}
exports.createUser = createUser;
//# sourceMappingURL=user.js.map