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
exports.findAddress = exports.createPlace = void 0;
const index_1 = __importDefault(require("./index"));
// async function assignFavPlaceToUser(placeData : any, username : string) => {
//     try{
//       const places = await prisma.places.findFirstOrThrow({
//         where : {
//           id: 1
//         },
//         include:{
//           user_fk: {
//             select:{
//               username:true
//             }
//           }
//         }
//       })
//       console.log(places)
//     }catch(e) {
//         console.log(e)
// }
function createPlace(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield index_1.default.places.createMany({
                data: data,
                skipDuplicates: true
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.createPlace = createPlace;
function findAddress(address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield index_1.default.places.findFirst({
                where: {
                    address: address
                }
            });
            return user;
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.findAddress = findAddress;
//# sourceMappingURL=places.js.map