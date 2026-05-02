---
title: "NoReply mailbox and Send mail using O365 smtp server with Java"
categories:
  - On-Premises
  - Exchange Server
  - Exchange Online
  - Exchange hybrid
  - Programming
  - PowerShell
---

# 0. Summary
Regarding Exchange online, I was intriguied to see how mail has been sent from any other systems.
So, imagine that you are a developer and you have to integrate and implement function with a exchange online mailbox.

Here is my breif solutions.


# 1. Create NoReply mailbox(Shared mailbox)
First of all, you need to configure NoReply Mailbox from the Exchange online. Let me skip the procedure and replace the explanation with the following link.

<https://www.codetwo.com/admins-blog/no-reply-mailbox-in-microsoft-365/>

# 2. Enable SMTP Authentication
And you need to enable SMTP Authentication for the shared mailbox.
Please refer the MS Documentation which is how to set up this feature globally or for each mailbox.

<https://learn.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission>

For example:
<img width="1732" height="246" alt="image" src="https://github.com/user-attachments/assets/d35d6c68-c1b6-4465-9619-89b0d787dcbc" />




# 3. Coding with Java
After enable SMTP Authentication for the mailbox,
You are almost there. Make your own code for a sending message through using O365 SMTP server.
Please take a look at my code from the following github URL.

<https://github.com/leeyosebi/SendEmailO365Java>

<img width="2612" height="2414" alt="image" src="https://github.com/user-attachments/assets/98d6220d-3d1a-4974-b2f5-3c23ccd091df" />



## * import jar package first!
You might struggle for the import java mail package which is required for send a email.
There are several ways to import a required modules and packages but I just download the .jar files and import manually.

1. File > Porject Structure
<img width="880" height="740" alt="image" src="https://github.com/user-attachments/assets/34d5c639-f05e-4546-bc32-c16c0671bd22" />

2. Modules > Dependencies > Add
<img width="1202" height="734" alt="image" src="https://github.com/user-attachments/assets/e7bfc480-2914-4575-8748-a5f0484a2793" />

3. Click '1 JARs or Directories'
<img width="514" height="284" alt="image" src="https://github.com/user-attachments/assets/2b56715a-8554-49c8-b67d-2603ffa4ee72" />

4. Select the required .jar files and Open
<img width="1824" height="1120" alt="image" src="https://github.com/user-attachments/assets/6959d46b-be8e-48b6-bc90-a3c9cb7b67dd" />


Now, You can import required module.



# 4. Result
It successfully works. Let's find the message logs on the EXO first.
<img width="1538" height="670" alt="image" src="https://github.com/user-attachments/assets/a3ef7ab1-eed5-4c33-9440-7f89cfa445e4" />


1. It says Delievered.
<img width="2634" height="480" alt="image" src="https://github.com/user-attachments/assets/23488771-8c35-47d0-9616-9a1c723a2e9b" />

2. The messages are found on the shared mailbox as well. Even I didn't enter the mailbox.
<img width="3808" height="2414" alt="image" src="https://github.com/user-attachments/assets/e3fa6949-83b0-471b-970b-30c946374a75" />

3. The message are found on the recepient mailbox. The sender, subject and body content are exact same as the code we made.
<img width="970" height="888" alt="image" src="https://github.com/user-attachments/assets/03fac7d4-d81e-443d-96e2-205f77e6016c" />


# 5. MS Documentation
<https://learn.microsoft.com/en-us/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365>
