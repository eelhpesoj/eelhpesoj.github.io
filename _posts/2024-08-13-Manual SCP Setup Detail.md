---
---

To give you more specific details of:

https://velog.io/@leeyosebi/Manual-SCP-Setup

# 1. SCP configuration maunally
## 1. Create new container
1. Run ADSI Edit
![](https://velog.velcdn.com/images/leeyosebi/post/20b28f3c-c073-45c0-9922-bf8a4a060d67/image.png)
2. Connect to configuration
![](https://velog.velcdn.com/images/leeyosebi/post/374efef9-3ccd-49cd-be0c-79b14f075e31/image.png)
3. Create New object under the Services
![](https://velog.velcdn.com/images/leeyosebi/post/868aba27-bee5-465c-ba70-f91948540f87/image.png)
4. The class should be 'container'
![](https://velog.velcdn.com/images/leeyosebi/post/20480536-49e3-4160-9e5f-be938ff8d3cf/image.png)
5. Set value as 'Device Registration Configuration'
![](https://velog.velcdn.com/images/leeyosebi/post/1506cf22-8e53-4a2e-bef7-c981e6bc796b/image.png)
6. Click Finish
![](https://velog.velcdn.com/images/leeyosebi/post/db2a08b5-e2a4-407e-b50c-7a4e8576ca60/image.png)
## 2. Create Service Connection Point
1. Create new object under the 'Device Registration Configuration'
![](https://velog.velcdn.com/images/leeyosebi/post/7cfece7b-6abf-49c6-bff6-05929fa1c21e/image.png)
2. The class should be 'serviceConnectionPoint'
![](https://velog.velcdn.com/images/leeyosebi/post/50ab5941-299b-4bff-ac56-af1291e8b7c2/image.png)
3. Set value as '62a0ff2e-97b9-4513-943f-0d221bd30080'
![](https://velog.velcdn.com/images/leeyosebi/post/ff629b78-6d05-4219-81dd-c6d95655f5c8/image.png)
4. Set more attributes
![](https://velog.velcdn.com/images/leeyosebi/post/e0c5f8a6-85c3-4f19-b6ae-4e92419403bb/image.png)
5. Configure just like this
![](https://velog.velcdn.com/images/leeyosebi/post/716e214d-c1f8-4663-b06e-a0f3f770e953/image.png)
**[note]**
azureADName is the domain name enrolled to your tenant.
azureADId is the tenant GUID.
6. Click 'Finish'
![](https://velog.velcdn.com/images/leeyosebi/post/3b196c44-a695-4fc5-a2ab-0aa3d89c6fe0/image.png)

## Check using Powershell
```shell
$ConfigurationPartition = (Get-ADRootDSE).configurationNamingContext
$scp = New-Object System.DirectoryServices.DirectoryEntry
$scp.Path = "LDAP://CN=62a0ff2e-97b9-4513-943f-0d221bd30080,CN=Device Registration Configuration,CN=Services,$ConfigurationPartition"
$scp.Keywords
```
![](https://velog.velcdn.com/images/leeyosebi/post/460ade81-5722-4b84-8e1f-2396d6035188/image.png)

# 2. Intune Auto Enrollment
If you deploy service connection point, you might also need to enroll the devices to the Intune automatically.
So the steps below is to make GPO and link it to the device OU to enroll the devices into Intune using user credential.

## 1. Preparation
1. Download the latest admx
![](https://velog.velcdn.com/images/leeyosebi/post/c149ab2e-155f-4478-bae5-be70c9c5f1f6/image.png)
2. Install it
![](https://velog.velcdn.com/images/leeyosebi/post/0dbb5513-728c-46bf-b559-961d598f5b02/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/5c275f07-3406-443a-8cb1-de595b875c8d/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/54686442-1a35-4dc2-acb7-d45e98c32281/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/b686e263-e1ce-4f24-bf7a-e01ac63e2b23/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/1263fc17-bf82-4be4-bf5b-d22f7511c42a/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/26158c8e-6d42-4d67-824f-aa9735a2b23c/image.png)
3. Go to the following path and copy all items right here.
```
C:\Program Files (x86)\Microsoft Group Policy\Windows 11 October 2023 Update (23H2)\PolicyDefinitions
```
![](https://velog.velcdn.com/images/leeyosebi/post/5988a4c3-b3d1-401e-a3c2-bd0df66f1146/image.png)

4. Go to the following path and pate here.
```
C:\Windows\SYSVOL\sysvol\cake.run.local\Policies\PolicyDefinitions
```
![](https://velog.velcdn.com/images/leeyosebi/post/3fc40423-c370-49f1-888d-b2248b5e5991/image.png)

## 2. Create GPO
1. Run Group Policy Management and create new GPO.
![](https://velog.velcdn.com/images/leeyosebi/post/e79b2430-3da5-4efd-a8d4-885584255b84/image.png)
2. Edit it.
![](https://velog.velcdn.com/images/leeyosebi/post/d69b56c6-d61a-4778-9a2d-79b5e4718572/image.png)
3. Got to the following path and configure 'Enable automatic MDM enrollment using default Azure AD credentials'
```
Computer Configuration > policies > administrative templates > Windows components > MDM
```
![](https://velog.velcdn.com/images/leeyosebi/post/8e12a1d5-98cf-4d3d-923e-360c34c8c8a8/image.png)
4. Configure just like this
![](https://velog.velcdn.com/images/leeyosebi/post/41dbc52d-8920-4d8c-9dd9-0dd4113c4bcd/image.png)
## Client side
Client might need to execute the command:
```shell
gpupdate /force
gpresult /r
```
And also restart their device as well.