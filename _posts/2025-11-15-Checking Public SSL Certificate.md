---
---

# Overview
Most of the cases, we need to check the ssl stream if the connection is funtioning properly or not.
To do this, I suggest the two options below.
In this post, I will use my exchange server certificate issued to "mail.cake.run.place"



# 0. Index
1. Using browser
1.1. Chrome
1.2 Edge
2. Using command
2.1 Curl
2.2 OpenSSL
2.3 PowerShell

# 1. Using browser
## 1.1 Chrome
![](https://velog.velcdn.com/images/leeyosebi/post/2f2f5e16-121e-4de6-bfef-0f199b22b943/image.png)

![](https://velog.velcdn.com/images/leeyosebi/post/9f4367e0-d2eb-4ac2-99fd-27c0ab136e0b/image.png)

![](https://velog.velcdn.com/images/leeyosebi/post/2808e04e-34a6-4a80-b025-91a633de2860/image.png)


## 1.2 Edge

![](https://velog.velcdn.com/images/leeyosebi/post/5d8cb3f1-2ae7-415f-ae63-92021630ac62/image.png)

![](https://velog.velcdn.com/images/leeyosebi/post/92a840bd-98e9-405e-93ec-ea6b8b157199/image.png)

![](https://velog.velcdn.com/images/leeyosebi/post/d8e0aaec-84ab-4a14-bf02-67968173b32e/image.png)

# 2. Using command
## 2.1 Curl
Just simply execute this command from the terminal.
```shell
curl -v https://mail.cake.run.place
```
e.g.,
![](https://velog.velcdn.com/images/leeyosebi/post/f958e431-a437-418f-921b-df99355f72a5/image.png)


## 2.2 OpenSSL

```shell
openssl s_client -connect mail.cake.run.place:443 </dev/null 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates -fingerprint
```

e.g.,
![](https://velog.velcdn.com/images/leeyosebi/post/824e6d88-b6ba-4389-a8ec-bd87300324fa/image.png)

## 2.3 PowerShell

1. More simple way


```shell
$request = [System.Net.HttpWebRequest]::Create("https://mail.cake.run.place")
$request.GetResponse()
$request.ServicePoint.Certificate.Issuer
```

e.g.,
![](https://velog.velcdn.com/images/leeyosebi/post/1b726dc8-e043-4d61-a9bd-942bc15b0d4b/image.png)

- Ref: Requirements for AIP
https://learn.microsoft.com/en-us/purview/rights-management-requirements#firewalls-and-network-infrastructure
- Ref: HttpWebRequest Class
https://learn.microsoft.com/en-us/dotnet/api/system.net.httpwebrequest?view=net-9.0


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
![](https://velog.velcdn.com/images/leeyosebi/post/f2b311ab-92ed-40ad-bddb-3a24589977f3/image.png)

- Ref: TcpClient Class
https://learn.microsoft.com/en-us/dotnet/api/system.net.sockets.tcpclient?view=net-9.0
- Ref: SslStream Class
https://learn.microsoft.com/en-us/dotnet/api/system.net.security.sslstream?view=net-9.0
- Ref:SslStream.AuthenticateAsClient Method
https://learn.microsoft.com/en-us/dotnet/api/system.net.security.sslstream.authenticateasclient?view=net-8.0
- Ref: X509Certificate2 Class
https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.x509certificates.x509certificate2?view=net-9.0

# Result
For the AIP or entra id hybrid joined devices, you should bypass some urls from the ssl inspection. Or you might struggle to troubleshoot to resolve it.
I hope you guys can debug using the options I suggest in this post.