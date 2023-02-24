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
exports.findRoutes = exports.createRoute = void 0;
const index_1 = __importDefault(require("./index"));
function createRoute(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield index_1.default.routes.createMany({
                data: data,
                skipDuplicates: true
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.createRoute = createRoute;
function findRoutes(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield index_1.default.user.findFirstOrThrow({
                where: {
                    username: username
                },
                include: {
                    routes_rel: true
                }
            });
            //    console.log(user)
            const routes = yield index_1.default.routes.findMany({
                where: {
                    user_fk: user.id
                },
                select: {
                    start_rel: true,
                    end_rel: true,
                    //   user_rel : {
                    //     select : {
                    //       username : true,
                    //     //   routes : true
                    //     }
                    //   }
                }
            });
            return routes;
        }
        catch (e) {
            // console.log(e)
            throw (`Find routes failed : ${e}`);
        }
    });
}
exports.findRoutes = findRoutes;
//# sourceMappingURL=routes.js.map