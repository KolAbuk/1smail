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
const _1 = require(".");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mail = yield _1.TempMail.init("myownlogin", "laafd.com");
        console.log(mail.getAddress());
        console.log(yield mail.getMessages());
        const msg = yield mail.getMessageData(430094479);
        console.log(mail.getLinksToFiles(msg));
    }
    catch (e) {
        console.error(e.message);
    }
}))();
