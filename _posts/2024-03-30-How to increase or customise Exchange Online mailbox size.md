---
title: "How to increase or customise Exchange Online mailbox size"
categories:
  - On-Premises
  - Exchange Online
---

# Summary
Increase or customise EXO mailbox size.
You should use Exchange Online PowerShell to do this.

---

# Step by Step
## 1. Check your current mailbox size
Let's increase the mailbox size from 3 GB to 10 GB.
<img width="1872" height="921" alt="image" src="https://github.com/user-attachments/assets/a0d28e33-ae96-4be4-8271-59418bbdabd8" />


## 2. Connect to the Exchange Online Management
Execute your PowerShell ISE as a administrative permission.
And execute this code.
Once you execute this, a little screen will pop-up there and log in with the global administrator account in your tenant.
```shell
Install-Module ExchangeOnlineManagement
Connect-ExchangeOnline
```
## 3. Check the current mailbox size
```shell
Get-Mailbox testuser02@m365x51911478.onmicrosoft.com | Select *quota*
```
The result will be like this.
<img width="1367" height="363" alt="image" src="https://github.com/user-attachments/assets/decab377-2fdd-41c2-a07b-4059c32f5442" />

## 4. Change the mailbox size
Ensure that the UPN and execute this code.
```shell
Set-Mailbox testuser02@m365x51911478.onmicrosoft.com -ProhibitSendQuota 10GB -ProhibitSendReceiveQuota 10GB -IssueWarningQuota 2GB
```
and check agian with this code.
```shell
Get-Mailbox testuser02@m365x51911478.onmicrosoft.com | Select *quota*
```
The results:
<img width="1358" height="374" alt="image" src="https://github.com/user-attachments/assets/f1a504d4-b717-40f7-adc8-caa2d38fc415" />

<img width="1872" height="921" alt="image" src="https://github.com/user-attachments/assets/35726b7b-e303-43ee-a477-51ab1b929dba" />

## 5. Regardinig the group and the group members
You might be want to change the mailbox size of the specific group member.
In this case, you need to identify your group type and select the code you need to execute. There are Unified group and Distribution group in the tenant.

1. Unified group(M365 group)
```shell
Get-UnifiedGroupLinks -Identity "tester" -LinkType Members | Set-Mailbox -ProhibitSendQuota 10GB -ProhibitSendReceiveQuota 10GB -IssueWarningQuota 2GB

```
2. Distribution group(Mail group)
```shell
Get-DistributionGroupMember -Identity "tester2" | Set-Mailbox -ProhibitSendQuota 10GB -ProhibitSendReceiveQuota 10GB -IssueWarningQuota 2GB
```
# Notice
- **ProhibitSenQuota** should be less or equal to the **ProhibitSendReceiveQuota**
- **ProhibitSenQuota** should be more or equal to the **IssueWarningQuota**

# Reference
<https://learn.microsoft.com/en-us/exchange/troubleshoot/user-and-shared-mailboxes/increase-or-customize-mailbox-size>
