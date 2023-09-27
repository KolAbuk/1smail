# node-1smail

Async Node.js API for https://www.1secmail.com/

## Installation

```javascript
npm i node-1smail
```

- Importing

```javascript
import { TempMail } from "node-1smail";
```

## Usage

### Create temporary e-mail

Create e-mail

```javascript
const mail = await TempMail.init("myownlogin", "laafd.com");

//Create random e-mail address
await TempMail.init();
//Create e-mail address with your username and random domain
await TempMail.init("username");
//Create e-mail address with your username and domain
await TempMail.init("username", "1secmail.org");
//Full domain list you can see there: https://www.1secmail.com/api/v1/?action=getDomainList
```

### Get e-mail address

Return full e-mail address

```javascript
mail.getAddress(); // => username@1secmail.org
```

### Get messages

Return JSON-object with messages

```javascript
await mail.getMessages();
//return message list or wait for any message if there no one
await mail.getMessages(true);
//wait for new message with id > lastMessageId
```

Messages list example

```javascript
[
  {
    id: 639,
    from: "someone@example.com",
    subject: "Some subject",
    date: "2018-06-08 14:33:55",
  },
  {
    id: 640,
    from: "someoneelse@example.com",
    subject: "Other subject",
    date: "2018-06-08 14:40:55",
  },
];
```

### Get message data

Return JSON-object with one message

```javascript
const msgID = 639; //message ID for this e-mail
await await mail.getMessageData(msgID);
```

Returns

```javascript
    {
        "id": 639,
        "from": "someone@example.com",
        "subject": "Some subject",
        "date": "2018-06-08 14:33:55",
        "attachments": [{
            "filename": "iometer.pdf",
            "contentType": "application\/pdf",
            "size": 47412
        }],
        "body": "Some message body\n\n",
        "textBody": "Some message body\n\n",
        "htmlBody": ""
    }
```

### Get links to attached files

Returns links for attached files

```javascript
const msg = await mail.getMessageData(639);
mail.getLinksToFiles(msg);
```

Example

```javascript
[
  "https://www.1secmail.com/api/v1/?action=download&login=username&domain=1secmail.org&id=639&file=iometer.pdf",
];
```
