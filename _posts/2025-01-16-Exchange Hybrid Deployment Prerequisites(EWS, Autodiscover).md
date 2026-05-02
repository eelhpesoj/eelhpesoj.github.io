---
title: "Exchange Hybrid Deployment Prerequisites(EWS, Autodiscover)"
categories:
  - On-Premises
  - Exchange Server
  - Exchange Online
  - Exchange hybrid
  - Programming
  - PowerShell
---

# 0. Summary
This post is about the required two URLs when you're planning to configure Exchange Hybrid configuration.
If your organisation is using M365, you need to open all the required ports and URLs. But the following URLs are quite important when you're deploying Exchange Hybrid.

Microsoft 365 URLs and IP address ranges:
<https://learn.microsoft.com/en-us/microsoft-365/enterprise/urls-and-ip-address-ranges?view=o365-worldwide>

# 1. Required URL
```shell
ews.example.com 
autodiscover.example.com
```
- ews URL is no need to configure. The ews services is already in use of mail.example.com(Exchange server's external URL). But it's fine if you want to configure.
- autodiscover URL is to be configured CNAME of the Exchange server's external URL.
https://learn.microsoft.com/en-us/exchange/architecture/client-access/autodiscover?view=exchserver-2019#autodiscover-in-dns

# 2. Why required?
## EWS
Primarily required for client-server data exchange and hybrid functionalities (e.g., Free/Busy, mailbox migration).
<img width="1807" height="707" alt="image" src="https://github.com/user-attachments/assets/0826b70c-61c7-4918-ba81-cbe57e7f04bd" />

<https://learn.microsoft.com/en-us/exchange/hybrid-deployment-prerequisites#hybrid-deployment-protocols-ports-and-endpoints>

## Autodiscover
Essential for clients to automatically discover server settings and configure connections
<img width="1507" height="124" alt="image" src="https://github.com/user-attachments/assets/ffb988bb-e457-4ec5-80df-bf97835abba9" />

<https://learn.microsoft.com/en-us/exchange/architecture/client-access/autodiscover?view=exchserver-2019>


# 3. Architecture Examples
The connection depends on your environment.
If your organisation using L4 or other types of the F/W, you need to open and convey the traffics properly.

### - 25/443 from Internet → FW → Exchange server
<img width="2004" height="909" alt="image" src="https://github.com/user-attachments/assets/2f052f7a-d858-43d4-a5c3-36c220914037" />

### - 25/443 from Internet → FW(Seperated) → Exchange server
<img width="2004" height="909" alt="image" src="https://github.com/user-attachments/assets/801af4e8-22b9-458a-a115-58634ce31e1d" />



# 4. Validating from external(Internet)
## 1. Nslookup
In the end, those three URLs are pointing at the Exchange server or its F/W(L4 or something)
```shell
nslookup
server 8.8.8.8

mail.example.com
ews.example.com
autodiscover.example.com
```
## 2. PowerShell
```shell
Test-NetConnection ews.example.com -Port 443 #Depends on the environment
Test-NetConnection autodiscover.example.com -Port 443
```
## 3. Telnet
```shell
Telnet ews.example.com 443 #Depends on the environment
Telnet autodiscover.example.com 443
```



# #. Reference
- <https://learn.microsoft.com/en-us/exchange/hybrid-deployment-prerequisites#hybrid-deployment-protocols-ports-and-endpoints>

