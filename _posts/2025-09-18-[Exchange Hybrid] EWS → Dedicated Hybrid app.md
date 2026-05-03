---
title: "[Exchange Hybrid] EWS → Dedicated Hybrid app"
categories:
  - On-Premises
  - Exchange Server
  - Exchange Online
  - Exchange hybrid
---


# 0. Overview
Dear all, this post will provide you an idea to go through retirement of EWS from exchange online. All of this content from refer following two documents from Microsoft.

- Refer1:
<https://learn.microsoft.com/en-us/exchange/hybrid-deployment/deploy-dedicated-hybrid-app#service-principal-clean-up-mode>
- Refer2:
<https://techcommunity.microsoft.com/blog/exchange/dedicated-hybrid-app-temporary-enforcements-new-hcw-and-possible-hybrid-function/4440682>

First up first, take a look at the prerequisites
1. Classic Full or Modern Full hybrid configuration needed
2. Exchange server version required as shown in the table
<img width="943" height="693" alt="image" src="https://github.com/user-attachments/assets/99185897-ceee-4b10-ab9f-fd026f02e557" />


# 1. HU
1. Check the Exchange version
<img width="1125" height="594" alt="image" src="https://github.com/user-attachments/assets/1e35828f-2a44-47fa-a536-d824b35b373d" />


2. Update if you need. If you have already CU15, Click the link below to update with the April 2025 HU
- <https://support.microsoft.com/en-us/topic/hotfix-update-for-exchange-server-2019-cu15-april-18-2025-kb5050672-b46af510-ede4-4eab-b2ba-940d2f00e04d>
<img width="814" height="322" alt="image" src="https://github.com/user-attachments/assets/c60baea9-6405-42b9-9d11-fb8831127330" />


- Download:
<https://www.microsoft.com/en-us/download/details.aspx?id=108144>

# 2. Run HCW to create Dedicated hybrid app

1. Click the link below to install and run HCW(Hybrid Configuration Wizard) on your Exchange server.
- https://aka.ms/hybridwizard

2. Configure whatever you want but make sure to consent with the grant administrative prevelidge.
<img width="800" height="628" alt="image" src="https://github.com/user-attachments/assets/d4ba53c0-e365-4553-a195-b6c91a870789" />


3. After configuration completed, go to your enterprise application from the Entra ID to check if the application created successfully.
<img width="800" height="387" alt="image" src="https://github.com/user-attachments/assets/41014922-bd64-484b-80e3-82fc126f03ee" />


# 3. Cleanup the Service Principal Cleanup Mode

1. Go to here and download the script
- <https://microsoft.github.io/CSS-Exchange/Hybrid/ConfigureExchangeHybridApplication/>
<img width="792" height="286" alt="image" src="https://github.com/user-attachments/assets/763d1489-5c9c-4920-8b37-26ae962eea91" />


- Download Script:
<https://github.com/microsoft/CSS-Exchange/releases/latest/download/ConfigureExchangeHybridApplication.ps1>

2. To cleanup the certificate from the 1st party service principal keycredentials, execute this from your EMS(Exchange Management Shell)
```shell
.\ConfigureExchangeHybridApplication.ps1 -ResetFirstPartyServicePrincipalKeyCredentials
```

3. Result will be like:
<img width="1385" height="188" alt="image" src="https://github.com/user-attachments/assets/9d1b078d-dd6a-4b44-8542-a711fddf5b6a" />


# 4. Setting override
To enable dedicated hybrid app feature, execute this:
<img width="938" height="589" alt="image" src="https://github.com/user-attachments/assets/0da22689-4635-4153-abb2-91850434fce8" />


```shell
New-SettingOverride -Name "EnableExchangeHybrid3PAppFeature" -Component "Global" -Section "ExchangeOnpremAsThirdPartyAppId" -Parameters @("Enabled=true") -Reason "Enable dedicated Exchange hybrid app feature"
```
<img width="1474" height="742" alt="image" src="https://github.com/user-attachments/assets/a8cef1c2-f80d-4f71-bd61-e2bc06b30fbc" />

```shell
Get-ExchangeDiagnosticInfo -Process Microsoft.Exchange.Directory.TopologyService -Component VariantConfiguration -Argument Refresh | fl
```
<img width="2262" height="1578" alt="image" src="https://github.com/user-attachments/assets/ef744df5-203c-4f9f-b25b-ab55bcab0a3a" />



# 5. Verify application

## Application properties
1. From Entra ID > App registration > Certificates & Secrets, you can see the OAuth certificate which obviously from the Exchange server
<img width="3304" height="1614" alt="image" src="https://github.com/user-attachments/assets/c607194d-6d5c-4eb9-b72c-b1306d849e91" />


2. Granted to use Office 365 Exchange Online which just as we configured from HCW

<img width="3240" height="902" alt="image" src="https://github.com/user-attachments/assets/c0c0fd1f-5eed-4700-b903-5acdb03a77b2" />


## Application logs
1. Create a new schedule from onboard mailbox(Cake01@cake.run.place)
<img width="2736" height="1580" alt="image" src="https://github.com/user-attachments/assets/eb2e4469-b49c-4c85-9030-91a9cd916e51" />


2. Query the schedule from on-premises mailbox(Cake02@cake.run.place)
<img width="1966" height="1676" alt="image" src="https://github.com/user-attachments/assets/1bb97225-0adb-42b3-bc08-4ee80f2ae147" />

I just retrive the cake01's schedule arround 20:20.

3. Let's see the logs. Go 'Entra ID > Signin logs > Service Principal'
<img width="3152" height="1716" alt="image" src="https://github.com/user-attachments/assets/997fde38-d33a-4bb5-a529-c433e6b523dd" />

It shown as '2025-09-18T11:16:52Z' and it is '2025-09-18 20:16:52 (KST)'

4. Logs
- The Dedicated hybrid app was trying to access to Exchange online
<img width="1872" height="1780" alt="image" src="https://github.com/user-attachments/assets/0778d8c8-4935-4ee4-8c05-f5860dcf26a2" />

- From the exchange server IP address is shown
<img width="1872" height="1780" alt="image" src="https://github.com/user-attachments/assets/e52f81e6-0622-41f4-be9c-3c5b303e5924" />


So, the configuration looks good.

# 6. NOTICE!
You need to uncheck 'Oauth, Intra Organisation Connector and Organisation Relationship' from now on.. if not, you have to do all of this procedure again from the start..
<img width="1602" height="1262" alt="image" src="https://github.com/user-attachments/assets/3a3d94a4-e1c1-4190-bc8d-67a07cc2bf21" />

<img width="1702" height="1024" alt="image" src="https://github.com/user-attachments/assets/e3e38b60-868c-46c3-bcb5-f75ffe960fd8" />




