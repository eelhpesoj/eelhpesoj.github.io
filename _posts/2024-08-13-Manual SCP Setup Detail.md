---
title: "Manual SCP Setup Detail"
categories:
  - On-Premises
  - Entra ID Connect
  - AD
  - Microsoft Entra hybrid joined
---

To give you more specific details of:

<https://eelhpesoj.github.io/Manual-SCP-Setup/>

# 1. SCP configuration maunally
## 1. Create new container
1. Run ADSI Edit
<img width="669" height="183" alt="image" src="https://github.com/user-attachments/assets/7bd64759-b799-4194-8e40-ff85470879ff" />

2. Connect to configuration
<img width="382" height="388" alt="image" src="https://github.com/user-attachments/assets/714312f6-dda8-448b-82b7-c5a89ca7ff0b" />

3. Create New object under the Services
<img width="483" height="281" alt="image" src="https://github.com/user-attachments/assets/f0cebd2c-612d-4d91-904d-d2615e33342a" />

4. The class should be 'container'
<img width="439" height="380" alt="image" src="https://github.com/user-attachments/assets/3afe0567-c379-478c-8486-e05ab1a13d09" />

5. Set value as 'Device Registration Configuration'
<img width="439" height="378" alt="image" src="https://github.com/user-attachments/assets/ef513bef-d064-4f12-8598-b4eb905fba41" />

6. Click Finish
<img width="439" height="378" alt="image" src="https://github.com/user-attachments/assets/629ac470-12a0-49dc-a44c-9632f463c0de" />

## 2. Create Service Connection Point
1. Create new object under the 'Device Registration Configuration'
<img width="579" height="281" alt="image" src="https://github.com/user-attachments/assets/b6d17805-3121-40a4-8e0b-acbc52fac580" />

2. The class should be 'serviceConnectionPoint'
<img width="439" height="378" alt="image" src="https://github.com/user-attachments/assets/a2d03bbb-7d24-4dff-b3fd-c25958576e6a" />

3. Set value as '62a0ff2e-97b9-4513-943f-0d221bd30080'
<img width="439" height="378" alt="image" src="https://github.com/user-attachments/assets/9a0fa722-5d5e-428f-908d-e8a548a72fd7" />

6. Set more attributes
<img width="439" height="378" alt="image" src="https://github.com/user-attachments/assets/70c709a6-a5a2-478e-9d77-d76414e99b4f" />

7. Configure just like this
<img width="402" height="457" alt="image" src="https://github.com/user-attachments/assets/f931aeef-efd0-48e3-850f-cef09ed06f33" />
    > **[note]**
    > azureADName is the domain name enrolled to your tenant.
    > azureADId is the tenant GUID.

6. Click 'Finish'
<img width="439" height="378" alt="image" src="https://github.com/user-attachments/assets/4a723b13-abc2-455c-b2af-53d638972792" />


## Check using Powershell
```shell
$ConfigurationPartition = (Get-ADRootDSE).configurationNamingContext
$scp = New-Object System.DirectoryServices.DirectoryEntry
$scp.Path = "LDAP://CN=62a0ff2e-97b9-4513-943f-0d221bd30080,CN=Device Registration Configuration,CN=Services,$ConfigurationPartition"
$scp.Keywords
```
<img width="816" height="607" alt="image" src="https://github.com/user-attachments/assets/52763101-af2e-4d9c-bffb-0827b9923565" />


# 2. Intune Auto Enrollment
If you deploy service connection point, you might also need to enroll the devices to the Intune automatically.
So the steps below is to make GPO and link it to the device OU to enroll the devices into Intune using user credential.

## 1. Preparation
1. Download the latest admx
<img width="1920" height="904" alt="image" src="https://github.com/user-attachments/assets/1422a6f2-25ed-4e74-9d66-1c8ffd403803" />

2. Install it
<img width="114" height="208" alt="image" src="https://github.com/user-attachments/assets/221896c6-3222-4c49-938c-638b28c6eff6" />
<img width="573" height="448" alt="image" src="https://github.com/user-attachments/assets/516c57af-878b-4c62-b155-d085cf3eb049" />
<img width="573" height="448" alt="image" src="https://github.com/user-attachments/assets/9725aa6f-be39-46c0-b643-c6356762ef15" />
<img width="573" height="450" alt="image" src="https://github.com/user-attachments/assets/c1acc5fd-7968-429b-bef5-7972e97c7360" />
<img width="573" height="448" alt="image" src="https://github.com/user-attachments/assets/f0eec0d3-1615-4bd6-88b0-cbf8f431e717" />
<img width="573" height="448" alt="image" src="https://github.com/user-attachments/assets/6a3a92b9-7a40-4448-b73b-ca27359578d9" />

3. Go to the following path and copy all items right here.
```
C:\Program Files (x86)\Microsoft Group Policy\Windows 11 October 2023 Update (23H2)\PolicyDefinitions
```
<img width="809" height="635" alt="image" src="https://github.com/user-attachments/assets/dd3a7822-80f6-4b73-8818-4ee970c9eb40" />


4. Go to the following path and pate here.
```
C:\Windows\SYSVOL\sysvol\cake.run.local\Policies\PolicyDefinitions
```
<img width="791" height="635" alt="image" src="https://github.com/user-attachments/assets/9c1c1db6-157d-484c-91a0-bec49f9d733f" />


## 2. Create GPO
1. Run Group Policy Management and create new GPO.
<img width="413" height="181" alt="image" src="https://github.com/user-attachments/assets/cb54ac12-841b-42cf-9e01-a082e9375a10" />

2. Edit it.
<img width="280" height="95" alt="image" src="https://github.com/user-attachments/assets/28bbedc6-165a-4cae-ae60-beb45c48d1b7" />

3. Got to the following path and configure 'Enable automatic MDM enrollment using default Azure AD credentials'
```
Computer Configuration > policies > administrative templates > Windows components > MDM
```
<img width="789" height="567" alt="image" src="https://github.com/user-attachments/assets/35a4860b-447e-449d-9bf5-9c2946b1c8c5" />

4. Configure just like this
<img width="688" height="638" alt="image" src="https://github.com/user-attachments/assets/64e90c4b-cf49-4db3-a259-e96fa425d097" />

## Client side
Client might need to execute the command:
```shell
gpupdate /force
gpresult /r
```
And also restart their device as well.


