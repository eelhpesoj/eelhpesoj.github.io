---
---

# 0. Summary
Regarding Exchange online, I was intriguied to see how mail has been sent from any other systems.
So, imagine that you are a developer and you have to integrate and implement function with a exchange online mailbox.

Here is my breif solutions.


# 1. Create NoReply mailbox(Shared mailbox)
First of all, you need to configure NoReply Mailbox from the Exchange online. Let me skip the procedure and replace the explanation with the following link.

https://www.codetwo.com/admins-blog/no-reply-mailbox-in-microsoft-365/

# 2. Enable SMTP Authentication
And you need to enable SMTP Authentication for the shared mailbox.
Please refer the MS Documentation which is how to set up this feature globally or for each mailbox.

https://learn.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission

For example:
![](https://velog.velcdn.com/images/leeyosebi/post/b3a8a1fd-1cb7-4f3c-a6d6-bb43cf10cd26/image.png)



# 3. Coding with Java
After enable SMTP Authentication for the mailbox,
You are almost there. Make your own code for a sending message through using O365 SMTP server.
Please take a look at my code from the following github URL.

https://github.com/leeyosebi/SendEmailO365Java

![](https://velog.velcdn.com/images/leeyosebi/post/f540f3a6-3789-49ec-9e61-e42c57c302fa/image.png)


## * import jar package first!
You might struggle for the import java mail package which is required for send a email.
There are several ways to import a required modules and packages but I just download the .jar files and import manually.

1. File > Porject Structure
![](https://velog.velcdn.com/images/leeyosebi/post/d378650d-331f-472c-8e88-30bc51c21e35/image.png)
2. Modules > Dependencies > Add
![](https://velog.velcdn.com/images/leeyosebi/post/c0fe568d-9a3c-4bff-a490-ca348f0813a3/image.png)
3. Click '1 JARs or Directories'
![](https://velog.velcdn.com/images/leeyosebi/post/eb0bca2c-28da-4cef-85c2-1cf824159f64/image.png)
4. Select the required .jar files and Open
![](https://velog.velcdn.com/images/leeyosebi/post/037b2f31-da0b-42f9-88e0-1188e48b4f31/image.png)

Now, You can import required module.



# 4. Result
It successfully works. Let's find the message logs on the EXO first.
![](https://velog.velcdn.com/images/leeyosebi/post/0ccc628d-339e-4dfc-aedc-faa03bafa346/image.png)

1. It says Delievered.
![](https://velog.velcdn.com/images/leeyosebi/post/b1619733-4341-4241-a455-c01b16c20d6d/image.png)
2. The messages are found on the shared mailbox as well. Even I didn't enter the mailbox.
![](https://velog.velcdn.com/images/leeyosebi/post/75abbc46-1490-46c8-aad5-f6d0f8230ef4/image.png)
3. The message are found on the recepient mailbox. The sender, subject and body content are exact same as the code we made.
![](https://velog.velcdn.com/images/leeyosebi/post/9e2fa3c3-1e5c-486c-a342-230d3dabf30b/image.png)

# 5. MS Documentation
https://learn.microsoft.com/en-us/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365
