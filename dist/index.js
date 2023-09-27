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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempMail = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const randomstring_1 = __importDefault(require("randomstring"));
class TempMail {
    constructor(address, domain) {
        this.lastMessageId = 0;
        this.getAddress = () => `${this.address}@${this.domain}`;
        this.getMessages = (awaitNew = false) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = [];
                while (!data.length ||
                    (awaitNew &&
                        data.map((el) => el.id).sort((a, b) => b - a)[0] ==
                            this.lastMessageId)) {
                    const res = yield (0, node_fetch_1.default)(`https://www.1secmail.com/api/v1/?action=getMessages&login=${this.address}&domain=${this.domain}`);
                    data = yield res.json();
                    yield new Promise((res) => setTimeout(res, 5000));
                }
                this.lastMessageId = data.map((el) => el.id).sort((a, b) => b - a)[0];
                return data;
            }
            catch (e) {
                throw e;
            }
        });
        this.getMessageData = (messageID) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield (0, node_fetch_1.default)(`https://www.1secmail.com/api/v1/?action=readMessage&login=${this.address}&domain=${this.domain}&id=${messageID}`);
                const data = yield res.json();
                return data;
            }
            catch (e) {
                throw e;
            }
        });
        this.getLinksToFiles = (message) => message.attachments.map((att) => `https://www.1secmail.com/api/v1/?action=download&login=${this.address}&domain=${this.domain}&id=${message.id}&file=${att.filename}`);
        try {
            this.address = address;
            this.domain = domain;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.TempMail = TempMail;
_a = TempMail;
TempMail.init = (address, domain) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, node_fetch_1.default)("https://www.1secmail.com/api/v1/?action=getDomainList");
    const domainList = yield res.json();
    if (domain && !domainList.includes(domain)) {
        throw new Error(`No domain ${domain} in domainlist ${JSON.stringify(domainList)}`);
    }
    if (!domain) {
        domain = domainList[Math.ceil(Math.random() * domainList.length)];
    }
    if (!address) {
        address = randomstring_1.default.generate({
            length: Math.ceil(Math.random() * 10 + 10),
        }).toLocaleLowerCase();
    }
    return new _a(address, domain);
});
