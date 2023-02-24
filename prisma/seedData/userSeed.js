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
exports.UserSeed = void 0;
const authCore_1 = require("../../middleware/authCore");
function UserSeed() {
    return __awaiter(this, void 0, void 0, function* () {
        return [
            { name: 'a', username: 'a', email: 'a', password: yield (0, authCore_1.genPassword)('a'), routes: [], isAdmin: true },
            { name: 'Yewande', username: 'yewande', email: 'yewande@prisma.io', password: yield (0, authCore_1.genPassword)('1'), routes: [] },
            { name: 'Angelique', username: 'angelique', email: 'angelique@prisma.io', password: yield (0, authCore_1.genPassword)('1'), routes: [] },
            { name: 'Michel', username: 'michel', email: 'menion@here.com', password: yield (0, authCore_1.genPassword)('1'), routes: [] },
            { name: 'admin', username: 'admin', email: 'admin', password: yield (0, authCore_1.genPassword)('admin'), routes: [], isAdmin: true },
        ];
    });
}
exports.UserSeed = UserSeed;
//# sourceMappingURL=userSeed.js.map