const axios = require("axios");
const fs = require("fs");

class TempMail {
    static msgsCount = 0;
    async createAddress(mailAddress = null, domain = null) {
        try {
            if (mailAddress) {
                this._mailAddress = mailAddress;
                if (domain) {
                    this._domain = domain;
                } else {
                    const data = ["1secmail.com", "1secmail.org", "1secmail.net", "xojxe.com", "yoggm.com", "wwjmp.com", "esiix.com", "oosln.com", "vddaz.com"];
                    this._domain = data[Math.floor(Math.random() * data.length)];
                }
            } else {
                const {
                    data
                } = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox");
                const addr = data[0].split("@");
                this._mailAddress = addr[0];
                this._domain = addr[1];
            }
        } catch (e) {
            throw (e);
        }
    }
    async getMessages(ms) {
        try {
            for (let i = 0; i < 15; i++) {
                await new Promise(resolve => setTimeout(resolve, ms));
                const {
                    data
                } = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${this._mailAddress}&domain=${this._domain}`);
                if (data.length) {
                    msgsCount = data.length;
                    return {
                        address: this.getAddress,
                        messageCount: data.length,
                        messages: data
                    };
                }
            }
            return {
                address: this.getAddress,
                messageCount: 0,
                messages: []
            };
        } catch (e) {
            throw (e);
        }
    }
    async getNewMessages(ms) {
        try {
            for (let i = 0; i < 15; i++) {
                await new Promise(resolve => setTimeout(resolve, ms));
                const {
                    data
                } = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${this._mailAddress}&domain=${this._domain}`);
                if (data.length > msgsCount) {
                    return {
                        address: this.getAddress,
                        messageCount: data.length,
                        messages: data
                    };
                }
            }
            return {
                address: this.getAddress,
                messageCount: 0,
                messages: []
            };
        } catch (e) {
            throw (e);
        }
    }
    async getOneMessage(msgId) {
        try {
            const {
                data
            } = await axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${this._mailAddress}&domain=${this._domain}&id=${msgId}`);
            return data;
        } catch (e) {
            throw (e);
        }
    }
    async download(msgId, filename, path) {
        try {
            const {
                data
            } = await axios.get(`https://www.1secmail.com/api/v1/?action=download&login=${this._mailAddress}&domain=${this._domain}&id=${msgId}&file=${filename}`, {
                responseType: 'stream',
            });
            data.pipe(fs.createWriteStream(path));
        } catch (e) {
            throw (e);
        }
    }
    getAddress() {
        return this._mailAddress + "@" + this._domain;
    }
}



module.exports = TempMail;