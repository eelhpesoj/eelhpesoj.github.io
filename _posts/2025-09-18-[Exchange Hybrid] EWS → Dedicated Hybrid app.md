---
---


# Overview
Dear all, this post will provide you an idea to go through retirement of EWS from exchange online. All of this content from refer following two documents from Microsoft.

- Refer1:
<https://learn.microsoft.com/en-us/exchange/hybrid-deployment/deploy-dedicated-hybrid-app#service-principal-clean-up-mode>
- Refer2:
<https://techcommunity.microsoft.com/blog/exchange/dedicated-hybrid-app-temporary-enforcements-new-hcw-and-possible-hybrid-function/4440682>

First up first, take a look at the prerequisites
1. Classic Full or Modern Full hybrid configuration needed
2. Exchange server version required as shown in the table
<img width="943" height="693" alt="image" src="https://github.com/user-attachments/assets/99185897-ceee-4b10-ab9f-fd026f02e557" />


# 0. Index
1. HU
2. Run HCW to create Dedicated hybrid app
3. Cleanup the Service Principal Cleanup Mode
4. Setting override
5. Verify application
6. NOTICE!

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





## Application logs
1. Create a new schedule from onboard mailbox(Cake01@cake.run.place)
![](https://velog.velcdn.com/images/leeyosebi/post/52f43024-4de6-4dfe-83d9-3c1739551d20/image.png)

2. Query the schedule from on-premises mailbox(Cake02@cake.run.place)
![](https://velog.velcdn.com/images/leeyosebi/post/b81e10eb-8a50-4356-97b0-b1b367affb16/image.png)
I just retrive the cake01's schedule arround 20:20.

3. Let's see the logs. Go 'Entra ID > Signin logs > Service Principal'
![](https://velog.velcdn.com/images/leeyosebi/post/4a0e77bd-0343-45b2-98af-d739e14db905/image.png)
It shown as '2025-09-18T11:16:52Z' and it is '2025-09-18 20:16:52 (KST)'

4. Logs
- The Dedicated hybrid app was trying to access to Exchange online
![](https://velog.velcdn.com/images/leeyosebi/post/091f77e4-2e0f-4721-84eb-fb403381054d/image.png)
- From the exchange server IP address is shown
![](https://velog.velcdn.com/images/leeyosebi/post/6d80c9cf-5d8b-4bb1-8248-c1bf97ffaecb/image.png)

So, the configuration looks good.

# 6. NOTICE!
You need to uncheck 'Oauth, Intra Organisation Connector and Organisation Relationship' from now on.. if not, you have to do all of this procedure again from the start..
![](https://velog.velcdn.com/images/leeyosebi/post/0ce1129e-488f-488f-8058-d119a4eae84c/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/f3add643-ea37-4653-b44b-733226d4d283/image.png)



