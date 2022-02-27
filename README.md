
# node-1smail

Async Node.js API for https://www.1secmail.com/

## Installation

```javascript
npm i node-1smail
```

- Importing

```javascript
const TempMail = require("node-1smail");
```

## Usage

### Create temporary e-mail

Create e-mail

```javascript
    const address = new TempMail();

    //Create random e-mail address
    await address.createAddress();
    //Create e-mail address with your username and random domain
    await address.createAddress("username");
    //Create e-mail address with your username and domain
    await address.createAddress("username", "1secmail.org");
    //Full domain list you can see [there](https://www.1secmail.com/api/v1/?action=getDomainList)
```

### Get e-mail address

Return full e-mail address

```javascript
    address.getAddress(); // => username@1secmail.org
```

### Get messages

Return JSON-object with messages

```javascript
    await address.getMessages();
    //15 attempts to receive messages with a 5 second delay
    await address.getMessages(3000);
    //15 attempts to receive messages with a 3 second delay
    await address.getMessages(3000,20);
    //20 attempts to receive messages with a 3 second delay
```

If there are no messages
```javascript
    {
        address: "username@1secmail.org",
        messageCount: 0,
        messages: []
    }
```
Else
```javascript
    {
        address: "username@1secmail.org",
        messageCount: 2,
        messages: [
            {
	            "id": 639,
	            "from": "someone@example.com",
	            "subject": "Some subject",
	            "date": "2018-06-08 14:33:55"
            }, {
	            "id": 640,
	            "from": "someoneelse@example.com",
	            "subject": "Other subject",
	            "date": "2018-06-08 14:40:55"
            }]
    }
```

### Get messages

Waiting for new message and return JSON-object
Syntax is similar to the getMessages()

```javascript
    await address.getNewMessages();
    await address.getMessages(3000);
    await address.getMessages(3000,20);
```

### Get one message

Return JSON-object with one message

```javascript
    const msgID = 639;  //message ID for this e-mail
    await address.getOneMessage(msgID);
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

### Download file

Download attached file

```javascript
    const msgID = 639;                          //message ID for this e-mail
    const filename = "iometer.pdf";             //atteched file name 
    const path = "./data/downloaded_file.pdf";  //path where file will be created
    await address.download(msgId, filename, path);
```