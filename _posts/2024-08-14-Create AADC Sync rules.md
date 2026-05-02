---
title: "Create AADC Sync rules"
categories:
  - On-Premises
  - Entra ID Connect
---


# Summary
In the case of integration for global branches, preferred data location and usage location should be configured to optimise their services.

However, regarding the functional level of the DC, there is no value in the user properites.
To go through this, we can use msCloudExtensionAttribue.

# 1. Ref
<https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-feature-preferreddatalocation>

# 2. Preparation
- Enroll DC to the AADC application and Add Directory extensions
<img width="882" height="622" alt="image" src="https://github.com/user-attachments/assets/e8329c83-ed88-441d-9820-79e846c0321c" />

<img width="882" height="621" alt="image" src="https://github.com/user-attachments/assets/53d25dd4-a8a3-49e1-b7ca-590d4b26efb2" />

<img width="882" height="621" alt="image" src="https://github.com/user-attachments/assets/91d16a65-caf2-460b-9453-1e3fc3d8e5f1" />


# 3. Create Rule
**You should stop the sync cyle before proceed the task below**
```shell
Set-ADSyncScheduler -SyncCycleEnabled $false
```
## Inbound
1. Run Synchronisation Rules Editor
<img width="691" height="320" alt="image" src="https://github.com/user-attachments/assets/d445de3a-c365-42e7-962c-adf3597364f0" />

2. Add New rule
<img width="947" height="220" alt="image" src="https://github.com/user-attachments/assets/17f0ac5e-94d9-46ea-9831-b2e71e443439" />

3. Set value
<img width="928" height="615" alt="image" src="https://github.com/user-attachments/assets/175cd8eb-0b7a-4dc0-9c96-22f47aaedc75" />

<img width="928" height="615" alt="image" src="https://github.com/user-attachments/assets/231440da-2a81-4bba-ad89-e35480dcdd84" />

<img width="928" height="615" alt="image" src="https://github.com/user-attachments/assets/35805382-6b87-4b5e-a565-ced97b640f2d" />

<img width="928" height="615" alt="image" src="https://github.com/user-attachments/assets/25f54de0-123a-4a67-86df-8ab39666bf6d" />


So you just do the same job on the usage location.

## Outbound
**[Note]**
You don't need to create out bound rule for each Domain. But you have to create it as many as the attribues.
1. Change direction to Outbound
<img width="948" height="735" alt="image" src="https://github.com/user-attachments/assets/8759beb6-fb47-4a9e-b8aa-5f93381680a5" />

2. Set value as:
<img width="928" height="615" alt="image" src="https://github.com/user-attachments/assets/70b7806b-9d04-43f5-9a41-2d9b9ddab24a" />

<img width="928" height="615" alt="image" src="https://github.com/user-attachments/assets/7c7302fd-ccb2-4631-be35-f61e0638739d" />

<img width="928" height="615" alt="image" src="https://github.com/user-attachments/assets/6fd01b77-6bcd-40d9-92cd-24a071975d08" />

<img width="928" height="615" alt="image" src="https://github.com/user-attachments/assets/ce63a3ed-8676-4d31-8540-688d0a7696be" />


# 4. Sync Enabled
```shell
Set-ADSyncScheduler -SyncCycleEnabled $True
Start-ADSyncCyle -PolicyType Initial
```
