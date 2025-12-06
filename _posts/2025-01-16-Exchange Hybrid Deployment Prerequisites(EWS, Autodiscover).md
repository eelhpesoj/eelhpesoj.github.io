---
---

# 0. Summary
This post is about the required two URLs when you're planning to configure Exchange Hybrid configuration.
If your organisation is using M365, you need to open all the required ports and URLs. But the following URLs are quite important when you're deploying Exchange Hybrid.

Microsoft 365 URLs and IP address ranges:
https://learn.microsoft.com/en-us/microsoft-365/enterprise/urls-and-ip-address-ranges?view=o365-worldwide

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
![](https://velog.velcdn.com/images/leeyosebi/post/6acfe39f-ac77-49bb-b52f-6c6693c010ed/image.png)
https://learn.microsoft.com/en-us/exchange/hybrid-deployment-prerequisites#hybrid-deployment-protocols-ports-and-endpoints

## Autodiscover
Essential for clients to automatically discover server settings and configure connections
![](https://velog.velcdn.com/images/leeyosebi/post/443fe22e-a18f-4b20-8f72-771337afe5e1/image.png)
https://learn.microsoft.com/en-us/exchange/architecture/client-access/autodiscover?view=exchserver-2019


# 3. Architecture Examples
The connection depends on your environment.
If your organisation using L4 or other types of the F/W, you need to open and convey the traffics properly.

### - 25/443 from Internet → FW → Exchange server
![](https://velog.velcdn.com/images/leeyosebi/post/37dc4002-f293-4553-993f-47cb767fc09b/image.png)
### - 25/443 from Internet → FW(Seperated) → Exchange server
![](https://velog.velcdn.com/images/leeyosebi/post/fe177900-247a-4183-9846-4ab52d33b6c9/image.png)


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
- https://learn.microsoft.com/en-us/exchange/hybrid-deployment-prerequisites#hybrid-deployment-protocols-ports-and-endpoints

