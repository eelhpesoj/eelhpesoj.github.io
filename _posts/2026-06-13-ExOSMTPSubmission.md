---
title: "Understanding SMTP Submission in Exchange Online"
categories:
  - Exchange Online
  - PowerShell
  - Java
---


# 0. Overview

This post is addressing the follow up of the previous post:<https://eelhpesoj.github.io/on-premises/exchange%20server/exchange%20online/exchange%20hybrid/programming/powershell/NoReply-mailbox-and-Send-mail-using-O365-smtp-server-with-Java/>
We will mainly focus on the STARTTLS and Submission feature of Exchange online SMTP server.

# 1. STARTTLS
First, we have to use STARTTLS when we try to connect smtp server which is smtp.office365.com:587.
We can use openssl command. Please refer this:<https://docs.openssl.org/3.0/man1/openssl-s_client/>
```shell
~$ openssl s_client -crlf -quiet -starttls smtp -connect smtp.office365.com:587
```
After connected, you can see the public certificate of the server and it mean the tls session has been created.
And the process would be like:
1. ehlo
2. AUTH LOGIN
3. base64 encoded UPN
4. base64 encoded PW
5. Authentication successful
6. mail from:<address>
7. rcpt to:<address>
8. data
9. subject: anything
10. anything (body)
11. type '.' to end
<img width="1717" height="1012" alt="image" src="https://github.com/user-attachments/assets/a49cb098-d079-4473-a487-e5b123af1113" />

As you can see here, SMTP Submission and the AUTH LOGIN should be placed in TLS session. You can not do this in just 25 connection with the SMTP server.
And one thing you have to know is TLS1.2 required. Not 1.0 or 1.1.
Openssl is use TLS1.2 automatically so it is working properly, but if you use customed application to submit this whole thing, you should set TLS1.2.

# 2. PowerShell Test
If TLS1.2 is not enabled, you get the error like this. and the application developed with .NET, you can exactly the same error on your console.
<img width="1876" height="899" alt="image" src="https://github.com/user-attachments/assets/43fb742d-8a9d-4fbd-855d-6d89ad234fa5" />
```shell
# Exchange Online smtp.office365.com:587

$SmtpServer = "smtp.office365.com"
$Port       = 587
$Username   = "test@abc.com"
$Password   = "testpassword"
$From       = "test@abc.com"
$To         = "test@def.com"

# TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$securePassword = ConvertTo-SecureString $Password -AsPlainText -Force
$credential = New-Object System.Net.NetworkCredential($Username, $Password)

$mail = New-Object System.Net.Mail.MailMessage
$mail.From = $From
$mail.To.Add($To)
$mail.Subject = "test"
$mail.Body = "test message."

$client = New-Object System.Net.Mail.SmtpClient($SmtpServer, $Port)
$client.EnableSsl = $false
$client.UseDefaultCredentials = $false
$client.Credentials = $credential
$client.DeliveryMethod = [System.Net.Mail.SmtpDeliveryMethod]::Network
$client.Timeout = 30000

try {
    $client.Send($mail)
    Write-Host "SUCCESS: Mail sent." -ForegroundColor Green
}
catch {
    Write-Host "FAILED" -ForegroundColor Red
    Write-Host $_.Exception.ToString()
    
    if ($_.Exception.InnerException) {
        Write-Host "`n--- InnerException ---"
        Write-Host $_.Exception.InnerException.ToString()
    }
}
finally {
    $mail.Dispose()
    $client.Dispose()
}
 
```

