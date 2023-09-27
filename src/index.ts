import fetch from "node-fetch";
import Randomstring from "randomstring";

export type message = {
  id: number;
  from: string;
  subject: string;
  date: string;
};

export type messageData = {
  id: number;
  from: string;
  subject: string;
  date: string;
  attachments: {
    filename: string;
    contentType: string;
    size: number;
  }[];
  body: string;
  textBody: string;
  htmlBody: string;
};

export class TempMail {
  private address: string;
  private domain: string;
  private lastMessageId: number = 0;
  constructor(address: string, domain: string) {
    try {
      this.address = address;
      this.domain = domain;
    } catch (e) {
      throw e;
    }
  }
  static init = async (
    address?: string,
    domain?: string
  ): Promise<TempMail> => {
    const res = await fetch(
      "https://www.1secmail.com/api/v1/?action=getDomainList"
    );
    const domainList: string[] = await res.json();
    if (domain && !domainList.includes(domain)) {
      throw new Error(
        `No domain ${domain} in domainlist ${JSON.stringify(domainList)}`
      );
    }
    if (!domain) {
      domain = domainList[Math.ceil(Math.random() * domainList.length)];
    }
    if (!address) {
      address = Randomstring.generate({
        length: Math.ceil(Math.random() * 10 + 10),
      }).toLocaleLowerCase();
    }
    return new TempMail(address, domain);
  };
  getAddress = () => `${this.address}@${this.domain}`;
  getMessages = async (awaitNew: boolean = false): Promise<message[]> => {
    try {
      let data: message[] = [];
      while (
        !data.length ||
        (awaitNew &&
          data.map((el) => el.id).sort((a, b) => b - a)[0] ==
            this.lastMessageId)
      ) {
        const res = await fetch(
          `https://www.1secmail.com/api/v1/?action=getMessages&login=${this.address}&domain=${this.domain}`
        );
        data = await res.json();
        await new Promise((res) => setTimeout(res, 5000));
      }
      this.lastMessageId = data.map((el) => el.id).sort((a, b) => b - a)[0];
      return data;
    } catch (e) {
      throw e;
    }
  };
  getMessageData = async (messageID: number): Promise<messageData> => {
    try {
      const res = await fetch(
        `https://www.1secmail.com/api/v1/?action=readMessage&login=${this.address}&domain=${this.domain}&id=${messageID}`
      );
      const data: messageData = await res.json();
      return data;
    } catch (e) {
      throw e;
    }
  };
  getLinksToFiles = (message: messageData): string[] =>
    message.attachments.map(
      (att) =>
        `https://www.1secmail.com/api/v1/?action=download&login=${this.address}&domain=${this.domain}&id=${message.id}&file=${att.filename}`
    );
}
