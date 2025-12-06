---
---

# 0. Index

When configuring a hybrid environment, the authentication method for users is also set up through AADC. However, only one authentication method (PHS, PTA, or ADFS) can be selected per forest.  

Now, my customer has configured ADFS authentication to allow their headquarters employees to access the M365 environment. However, their branch employees are also in the same forest, and they need access to M365 as well. Since they are in the same forest, they must also authenticate via ADFS.  

Is this possible? Let's find out.

# 1. LAB Configuration
First up first, I have two domains here.
- thecake.kro.kr(Federated)
- hotcake.kro.kr

The users whose upn suffix is thecake.kro.kr and hotcake.kro.kr is in the DC(the cake.kro.local). And I synced @thecake.kro.kr users with ADFS authentication in AADC.

And I'm gonna deploy @hotcake.kro.kr users to current ADFS authentication process.

![](https://velog.velcdn.com/images/leeyosebi/post/7bdd0a06-fee7-4224-8212-17a0d9af2eba/image.png)




# 2. Enable -SupportMultipleDomain
First, go to your ADFS server. And execute the commands below.
```shell
Connect-MsolService
Set-MsolADFSContext -Computer "thecakeadfs.thecake.kro.local"
Update-MsolFederatedDomain -DomainName thecake.kro.kr -SupportMultipleDomain
```
![](https://velog.velcdn.com/images/leeyosebi/post/d72129c8-e4df-407a-88f9-dcd0df10ba02/image.png)



# 3. Enrollment Custom Domain Name
Go to your tenant. Enroll and verify your new Top-Level Domain.
![](https://velog.velcdn.com/images/leeyosebi/post/c60ba582-cad5-4dba-9dbe-ea90be49ab72/image.png)

# 4. Deployment Second Top-Level Domain with Entra ID Connect
Go to your AADC and federate your new doamin.
Click 'Manage federation'
![](https://velog.velcdn.com/images/leeyosebi/post/c66332be-e37e-4510-8b10-58ac370b615c/image.png)
Click 'Federate Microsoft Entra ID domain'.
![](https://velog.velcdn.com/images/leeyosebi/post/7caa414f-b126-4e97-8586-03d14c27f09e/image.png)
To federate your new domain, you should be identified tenant administrator and ADFS server administrator.
![](https://velog.velcdn.com/images/leeyosebi/post/6ad3be70-6d41-4ef6-a1f3-55994b015823/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/1ad26f03-e284-44f8-b62c-33a48438ade5/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/afa18f49-a46e-40d3-a4e3-00851aacaa39/image.png)
Now, select your new domain that will be federated. If the domain is not visible, you should go tenant and make your new domain verified.
![](https://velog.velcdn.com/images/leeyosebi/post/2f7044e9-9aaa-4447-9284-7cbc127a2635/image.png)
Click 'Next' to update ADFS relying party trust.
![](https://velog.velcdn.com/images/leeyosebi/post/c3277ea6-b7f4-4f37-a16b-5c03c7f08cd2/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/2713d9cc-e676-4f22-9447-0f411edca29c/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/b4ca2ed5-480b-4a1d-8489-7e80c200609d/image.png)


Just let AADC do the work. Once it successfully deployed, you will see the original domain and your new domain displayed with check icon on the Federated collumn.
![](https://velog.velcdn.com/images/leeyosebi/post/5bec3da6-44c2-408c-9cf9-cf04c7df4df8/image.png)
And also, you can check
```shell
Get-MsolDomain
```
![](https://velog.velcdn.com/images/leeyosebi/post/ee295ee8-5242-43d0-8c23-cc2a577c892e/image.png)
Also use
```shell
Get-MsolDomainFederationSettings -DomainName thecake.kro.kr'
```
Note the IssuerUri.
![](https://velog.velcdn.com/images/leeyosebi/post/790bcb6a-1880-4c0a-b395-4ca4fa4ac5ae/image.png)
Use
```shell
Get-MsolDomainFederationSettings -DomainName hotcake.kro.kr'
```
The IssuerUri is different from Original Domain. But the other URL that used for the ADFS authentication is the same.
![](https://velog.velcdn.com/images/leeyosebi/post/50810448-e7dc-4a68-ae77-dd2f88286c68/image.png)




# 5. '@hotcake.kro.kr' user sync
Okay, we are good to go for the @hotcake.kro.kr users to sync M365 environment.
![](https://velog.velcdn.com/images/leeyosebi/post/0679f5ab-4eed-466d-9a08-49822701bd9a/image.png)

# 6. Validation
After synchronisation, both domain users redirected to the ADFS server.
@thecake.kro.kr users.
![](https://velog.velcdn.com/images/leeyosebi/post/50d0d3c8-ae30-426c-9825-febef77dda4c/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/49372d62-3db7-47d1-aff2-afa91dff9968/image.png)
@hotcake.kro.kr users.
![](https://velog.velcdn.com/images/leeyosebi/post/e08e3bb7-ba25-44f2-8412-9e2099828dc1/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/b7b71cac-492e-40ef-948c-1d85d010281e/image.png)

Obviously, they are success in authentication so that they can use M365 services.
![](https://velog.velcdn.com/images/leeyosebi/post/a7b416ac-2238-4550-92f4-7a045a49fd70/image.png)


# 7. Ref
Following documents are exactly refering the same content execept the Module.
First one uses MSOnline and second one uses Graph. But graph module and its command in the document has been deprecated.
- https://docs.azure.cn/en-us/entra/identity/hybrid/connect/how-to-connect-install-multiple-domains
- https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-install-multiple-domains
- https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-install-multiple-domains

# 8. Issue: MSOnline Module Retirement
However, MSOnline module also will be retirement soon.
I have no idea what's going on this add new Top-Level domain scenario..
https://techcommunity.microsoft.com/blog/microsoft-entra-blog/action-required-msonline-and-azuread-powershell-retirement---2025-info-and-resou/4364991

![](https://velog.velcdn.com/images/leeyosebi/post/62ae3adf-f8c0-4001-bfdb-913f1d7aba82/image.png)







