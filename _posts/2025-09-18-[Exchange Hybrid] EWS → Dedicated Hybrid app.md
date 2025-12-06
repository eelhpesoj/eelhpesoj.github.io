---
---


# Overview
Dear all, this post will provide you an idea to go through retirement of EWS from exchange online. All of this content from refer following two documents from Microsoft.

- Refer1:
https://learn.microsoft.com/en-us/exchange/hybrid-deployment/deploy-dedicated-hybrid-app#service-principal-clean-up-mode
- Refer2:
https://techcommunity.microsoft.com/blog/exchange/dedicated-hybrid-app-temporary-enforcements-new-hcw-and-possible-hybrid-function/4440682

First up first, take a look at the prerequisites
1. Classic Full or Modern Full hybrid configuration needed
2. Exchange server version required as shown in the table
![](https://velog.velcdn.com/images/leeyosebi/post/4724fb2e-d607-4c26-b546-78f354b87c04/image.png)

# 0. Index
1. HU
2. Run HCW to create Dedicated hybrid app
3. Cleanup the Service Principal Cleanup Mode
4. Setting override
5. Verify application
6. NOTICE!

# 1. HU
1. Check the Exchange version
![](https://velog.velcdn.com/images/leeyosebi/post/fde8500b-c818-4d7d-aa9d-5aec0418d7be/image.png)

2. Update if you need. If you have already CU15, Click the link below to update with the April 2025 HU
- https://support.microsoft.com/en-us/topic/hotfix-update-for-exchange-server-2019-cu15-april-18-2025-kb5050672-b46af510-ede4-4eab-b2ba-940d2f00e04d
![](https://velog.velcdn.com/images/leeyosebi/post/95cb6053-ce7b-4be1-8d72-234f06c4965a/image.png)

- Download:
https://www.microsoft.com/en-us/download/details.aspx?id=108144

# 2. Run HCW to create Dedicated hybrid app

1. Click the link below to install and run HCW(Hybrid Configuration Wizard) on your Exchange server.
- https://aka.ms/hybridwizard

2. Configure whatever you want but make sure to consent with the grant administrative prevelidge.
![](https://velog.velcdn.com/images/leeyosebi/post/c8a926bc-14b1-45c8-8c96-81af36d77a1a/image.png)

3. After configuration completed, go to your enterprise application from the Entra ID to check if the application created successfully.
![](https://velog.velcdn.com/images/leeyosebi/post/8da06e82-551d-47ba-8f6c-9ce82d006e1b/image.png)

# 3. Cleanup the Service Principal Cleanup Mode

1. Go to here and download the script
- https://microsoft.github.io/CSS-Exchange/Hybrid/ConfigureExchangeHybridApplication/
![](https://velog.velcdn.com/images/leeyosebi/post/ea30dc96-eb33-4ac5-bf58-ea22a26f710a/image.png)

- Download Script:
https://github.com/microsoft/CSS-Exchange/releases/latest/download/ConfigureExchangeHybridApplication.ps1

2. To cleanup the certificate from the 1st party service principal keycredentials, execute this from your EMS(Exchange Management Shell)
```shell
.\ConfigureExchangeHybridApplication.ps1 -ResetFirstPartyServicePrincipalKeyCredentials
```

3. Result will be like:
![](https://velog.velcdn.com/images/leeyosebi/post/183ed5a7-b04b-4887-bd52-ca39650923b2/image.png)

# 4. Setting override
To enable dedicated hybrid app feature, execute this:
![](https://velog.velcdn.com/images/leeyosebi/post/eb9415c3-757d-44ed-9240-56280c1a054f/image.png)

```shell
New-SettingOverride -Name "EnableExchangeHybrid3PAppFeature" -Component "Global" -Section "ExchangeOnpremAsThirdPartyAppId" -Parameters @("Enabled=true") -Reason "Enable dedicated Exchange hybrid app feature"
```
![](https://velog.velcdn.com/images/leeyosebi/post/e774bed0-d99c-4e48-a40f-fd06f7863c5f/image.png)
```shell
Get-ExchangeDiagnosticInfo -Process Microsoft.Exchange.Directory.TopologyService -Component VariantConfiguration -Argument Refresh | fl
```
![](https://velog.velcdn.com/images/leeyosebi/post/0cc454b2-1a14-4c0f-842a-abcc71b9faa4/image.png)


# 5. Verify application

## Application properties
1. From Entra ID > App registration > Certificates & Secrets, you can see the OAuth certificate which obviously from the Exchange server
![](https://velog.velcdn.com/images/leeyosebi/post/fc5c23ec-ca6d-4808-b8bb-e3fdbe81932a/image.png)

2. Granted to use Office 365 Exchange Online which just as we configured from HCW
![](https://velog.velcdn.com/images/leeyosebi/post/645da288-2eb1-40b9-8f36-0414479188d5/image.png)

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



