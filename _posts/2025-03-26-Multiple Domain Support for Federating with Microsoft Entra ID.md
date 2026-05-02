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

<img width="1243" height="757" alt="image" src="https://github.com/user-attachments/assets/9ec5dd89-48da-45ce-ac5f-871d2ed50d96" />





# 2. Enable -SupportMultipleDomain
First, go to your ADFS server. And execute the commands below.
```shell
Connect-MsolService
Set-MsolADFSContext -Computer "thecakeadfs.thecake.kro.local"
Update-MsolFederatedDomain -DomainName thecake.kro.kr -SupportMultipleDomain
```
<img width="845" height="98" alt="image" src="https://github.com/user-attachments/assets/1fbec043-bd59-44ec-b058-ee7a877a5df8" />




# 3. Enrollment Custom Domain Name
Go to your tenant. Enroll and verify your new Top-Level Domain.
<img width="836" height="64" alt="image" src="https://github.com/user-attachments/assets/5ab4752f-451f-4064-9f52-5cc03b061f0a" />


# 4. Deployment Second Top-Level Domain with Entra ID Connect
Go to your AADC and federate your new doamin.
Click 'Manage federation'
<img width="875" height="619" alt="image" src="https://github.com/user-attachments/assets/4f0d2ab8-1b9e-44b9-8caa-914a1cd53862" />

Click 'Federate Microsoft Entra ID domain'.
<img width="875" height="619" alt="image" src="https://github.com/user-attachments/assets/7847eb03-6c86-475b-a810-d1bdb08bfd77" />

To federate your new domain, you should be identified tenant administrator and ADFS server administrator.
<img width="875" height="619" alt="image" src="https://github.com/user-attachments/assets/5f9f7b2d-26d7-4292-9972-ecb9e4e2ee30" />

<img width="875" height="619" alt="image" src="https://github.com/user-attachments/assets/79c34232-c9d3-4c0f-a4a1-3633b64afdf6" />

<img width="875" height="619" alt="image" src="https://github.com/user-attachments/assets/c2fba24b-5be8-4f20-bc13-0e0a054920fa" />

Now, select your new domain that will be federated. If the domain is not visible, you should go tenant and make your new domain verified.
<img width="875" height="619" alt="image" src="https://github.com/user-attachments/assets/ef1c62f8-9561-4b30-9a00-d0caea17d302" />

Click 'Next' to update ADFS relying party trust.
<img width="875" height="619" alt="image" src="https://github.com/user-attachments/assets/45b36fd4-d258-4d94-ad31-ad3fb4e06f78" />

<img width="875" height="619" alt="image" src="https://github.com/user-attachments/assets/51b93d42-555d-4968-a966-696cbd9a3ac2" />

<img width="875" height="619" alt="image" src="https://github.com/user-attachments/assets/4891e54f-e774-4bb4-a259-2bce40fdc619" />



Just let AADC do the work. Once it successfully deployed, you will see the original domain and your new domain displayed with check icon on the Federated collumn.
<img width="1280" height="428" alt="image" src="https://github.com/user-attachments/assets/2d3399ae-f475-4cf3-8ecf-d97eccd71704" />

And also, you can check
```shell
Get-MsolDomain
```
<img width="599" height="158" alt="image" src="https://github.com/user-attachments/assets/4c0e00ff-0a7e-41a8-9c5f-0284808ea503" />

Also use
```shell
Get-MsolDomainFederationSettings -DomainName thecake.kro.kr'
```
Note the IssuerUri.
<img width="840" height="647" alt="image" src="https://github.com/user-attachments/assets/a5948004-1a2e-47c5-813b-09787c54146b" />

Use
```shell
Get-MsolDomainFederationSettings -DomainName hotcake.kro.kr'
```
The IssuerUri is different from Original Domain. But the other URL that used for the ADFS authentication is the same.
<img width="847" height="669" alt="image" src="https://github.com/user-attachments/assets/890304e5-6355-445a-bf51-7bb5a7e6e7b3" />





# 5. '@hotcake.kro.kr' user sync
Okay, we are good to go for the @hotcake.kro.kr users to sync M365 environment.
<img width="875" height="619" alt="image" src="https://github.com/user-attachments/assets/924debde-bc4a-4511-8e1a-67df05c0d33a" />


# 6. Validation
After synchronisation, both domain users redirected to the ADFS server.
@thecake.kro.kr users.
<img width="1064" height="910" alt="image" src="https://github.com/user-attachments/assets/56e976b6-76a7-4e90-89a4-e805318a1066" />

<img width="1064" height="1031" alt="image" src="https://github.com/user-attachments/assets/96862319-3efc-44c5-806c-f1e81571b4c3" />

@hotcake.kro.kr users.
<img width="1064" height="910" alt="image" src="https://github.com/user-attachments/assets/e62fe01d-d5a7-4019-b2c1-dde0da3539c6" />

<img width="1064" height="1031" alt="image" src="https://github.com/user-attachments/assets/52d23c61-2dce-4020-a384-df2d7c6e159f" />


Obviously, they are success in authentication so that they can use M365 services.
<img width="736" height="329" alt="image" src="https://github.com/user-attachments/assets/b8d56e9b-e973-4bd4-8205-d39576bc6eb1" />



# 7. Ref
Following documents are exactly refering the same content execept the Module.
First one uses MSOnline and second one uses Graph. But graph module and its command in the document has been deprecated.
- <https://docs.azure.cn/en-us/entra/identity/hybrid/connect/how-to-connect-install-multiple-domains>
- <https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-install-multiple-domains>
- <https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-install-multiple-domains>

# 8. Issue: MSOnline Module Retirement
However, MSOnline module also will be retirement soon.
I have no idea what's going on this add new Top-Level domain scenario..
<https://techcommunity.microsoft.com/blog/microsoft-entra-blog/action-required-msonline-and-azuread-powershell-retirement---2025-info-and-resou/4364991>

<img width="859" height="502" alt="image" src="https://github.com/user-attachments/assets/e74f4149-6560-47ee-952d-f86eaf3d406a" />








