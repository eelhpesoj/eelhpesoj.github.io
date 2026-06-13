---
title: "Understanding SMTP Submission in Exchange Online"
categories:
  - Exchange Online
  - PowerShell
  - Java
---


# 0. Overview

This post is addressing the follow up of the previous post:
<https://eelhpesoj.github.io/on-premises/exchange%20server/exchange%20online/exchange%20hybrid/programming/powershell/NoReply-mailbox-and-Send-mail-using-O365-smtp-server-with-Java/>

We will mainly focus on the STARTTLS and Submission feature of Exchange online SMTP server.

# 1. STARTTLS procedure check with openssl
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

To encode base64, use this powershell:
```shell
[Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("email address or password"))
```

and the whole output would be like:
```shell
~$ openssl s_client -crlf -quiet -starttls smtp -connect smtp.office365.com:587
Connecting to 52.97.118.18
depth=2 C=US, O=DigiCert Inc, OU=www.digicert.com, CN=DigiCert Global Root G2
verify return:1
depth=1 C=US, O=DigiCert Inc, CN=DigiCert Global G2 TLS RSA SHA256 2020 CA1
verify return:1
depth=0 C=US, ST=Washington, L=Redmond, O=Microsoft Corporation, CN=outlook.com
verify return:1
250 SMTPUTF8
ehlo
250-SEWP216CA0010.outlook.office365.com Hello [1.225.156.177]
250-SIZE 157286400
250-PIPELINING
250-DSN
250-ENHANCEDSTATUSCODES
250-AUTH LOGIN XOAUTH2
250-8BITMIME
250-BINARYMIME
250-CHUNKING
250 SMTPUTF8
AUTH LOGIN
334 VXNlcm5hbWU6
c2hhcmVkMUBjYWtlLnJ1bi5wbGFjZQ==
334 UGFzc3dvcmQ6
c2hhcmVkUEBzc3cwcmQ=
235 2.7.0 Authentication successful
mail from:<shared1@cake.run.place>
250 2.1.0 Sender OK
rcpt to:<admin@m365x40633190.onmicrosoft.com>
250 2.1.5 Recipient OK
data
354 Start mail input; end with <CRLF>.<CRLF>
subject: the message from wsl
test message
.
250 2.0.0 OK <BYAPR17MB292020A5FA913E69A3A1C26BDC192@BYAPR17MB2920.namprd17.prod.outlook.com> [Hostname=BYAPR17MB2920.namprd17.prod.outlook.com]
```

As you can see here, SMTP Submission just happended after and the TLS session established. and then we can good to go AUTH LOGIN. You can not do this in just 25 connection with the SMTP server.
And one thing you have to know is TLS1.2 required. Not 1.0 or 1.1.
Openssl is use TLS1.2 automatically so it is working properly, but if you use customed application to submit this whole thing, you should set TLS1.2.

# 2. TLS error check with PowerShell(.NET application)
If TLS1.2 is not enabled, you get the error like this. and the application developed with .NET, you can exactly the same error on your console.
<img width="1920" height="1152" alt="image" src="https://github.com/user-attachments/assets/32c654b6-0913-40e4-ba32-d7a43e516abf" />
You should use TLS1.2 or higher.
<img width="1920" height="1152" alt="image" src="https://github.com/user-attachments/assets/4a5a7b33-59f5-4280-a930-5971e9de2844" />
<img width="1548" height="767" alt="image" src="https://github.com/user-attachments/assets/38e5aca9-33b9-4303-b97a-9c5aa8678aca" />

Here is the whole script:
```shell
# Exchange Online smtp.office365.com:587

$SmtpServer = "smtp.office365.com"
$Port       = 587
$Username   = "shared1@cake.run.place"
$Password   = "sharedP@ssw0rd"
$From       = "shared1@cake.run.place"
$To         = "admin@m365x40633190.onmicrosoft.com"

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
$client.EnableSsl = $true
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

# 3. TLS error check with Java

