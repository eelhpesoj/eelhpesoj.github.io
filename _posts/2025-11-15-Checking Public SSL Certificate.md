---
title: "Checking Public SSL Certificate"
categories:
  - Security
  - Network
---

# 0. Overview
Most of the cases, we need to check the ssl stream if the connection is funtioning properly or not.
To do this, I suggest the two options below.
In this post, I will use my exchange server certificate issued to "mail.cake.run.place"


# 1. Using browser
## 1.1 Chrome
<img width="387" height="319" alt="image" src="https://github.com/user-attachments/assets/e13c2ec6-4c21-4cb6-b746-4e74e373e6a7" />


<img width="358" height="296" alt="image" src="https://github.com/user-attachments/assets/e03077ef-0374-4b71-bdf4-202e3a02e1ff" />


<img width="540" height="666" alt="image" src="https://github.com/user-attachments/assets/962ec4b5-7c03-4786-8353-9b458b9dff1d" />



## 1.2 Edge

<img width="412" height="284" alt="image" src="https://github.com/user-attachments/assets/c4a0b5dc-8b3b-4882-8051-2f45afe2ebca" />


<img width="425" height="285" alt="image" src="https://github.com/user-attachments/assets/5f0188fc-db77-4462-98f7-e81db31098ac" />


<img width="549" height="676" alt="image" src="https://github.com/user-attachments/assets/b42bdb96-4e0c-49f8-8146-7f9a6d4ea84c" />


# 2. Using command
## 2.1 Curl
Just simply execute this command from the terminal.
```shell
curl -v https://mail.cake.run.place
```
e.g.,
<img width="981" height="1062" alt="image" src="https://github.com/user-attachments/assets/46e96bf9-9120-45df-97da-e76a8c68b090" />



## 2.2 OpenSSL

```shell
openssl s_client -connect mail.cake.run.place:443 </dev/null 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates -fingerprint
```

e.g.,
<img width="911" height="160" alt="image" src="https://github.com/user-attachments/assets/6f6df760-6e85-4ec8-8a6f-d7671ad6581b" />


## 2.3 PowerShell

1. More simple way


```shell
$request = [System.Net.HttpWebRequest]::Create("https://mail.cake.run.place")
$request.GetResponse()
$request.ServicePoint.Certificate.Issuer
```

e.g.,
<img width="1602" height="467" alt="image" src="https://github.com/user-attachments/assets/31474c62-f501-4c16-9848-614182609809" />


- Ref: Requirements for AIP
<https://learn.microsoft.com/en-us/purview/rights-management-requirements#firewalls-and-network-infrastructure>
- Ref: HttpWebRequest Class
<https://learn.microsoft.com/en-us/dotnet/api/system.net.httpwebrequest?view=net-9.0>


2. More Classic way

```shell
$url = "mail.cake.run.place"
$port = 443

$tcp = [System.Net.Sockets.TcpClient]::new($url,$port)
$ssl = [System.Net.Security.SslStream]::new($tcp.GetStream(), $false, ({$true}))
$ssl.AuthenticateAsClient($url)

$cert = [System.Security.Cryptography.X509Certificates.X509Certificate2]::new($ssl.RemoteCertificate)
$cert | fl

$tcp.Close()
$ssl.Close()
```

e.g.,
<img width="1774" height="626" alt="image" src="https://github.com/user-attachments/assets/0fcfb69b-fa72-414c-b267-d84f8bcf857b" />


- Ref: TcpClient Class
<https://learn.microsoft.com/en-us/dotnet/api/system.net.sockets.tcpclient?view=net-9.0>
- Ref: SslStream Class
<https://learn.microsoft.com/en-us/dotnet/api/system.net.security.sslstream?view=net-9.0>
- Ref:SslStream.AuthenticateAsClient Method
<https://learn.microsoft.com/en-us/dotnet/api/system.net.security.sslstream.authenticateasclient?view=net-8.0>
- Ref: X509Certificate2 Class
<https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.x509certificates.x509certificate2?view=net-9.0>

# Result
For the AIP or entra id hybrid joined devices, you should bypass some urls from the ssl inspection. Or you might struggle to troubleshoot to resolve it.
I hope you guys can debug using the options I suggest in this post.
