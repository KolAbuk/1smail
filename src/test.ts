import { TempMail } from ".";

(async () => {
  try {
    const mail = await TempMail.init("myownlogin", "laafd.com");
    console.log(mail.getAddress());

    console.log(await mail.getMessages());
    const msg = await mail.getMessageData(430094479);
    console.log(mail.getLinksToFiles(msg));
  } catch (e: any) {
    console.error(e.message);
  }
})();
