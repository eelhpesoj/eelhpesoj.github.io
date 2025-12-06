---
---

# Summary
Increase or customise EXO mailbox size.
You should use Exchange Online PowerShell to do this.

---

# Step by Step
## 1. Check your current mailbox size
Let's increase the mailbox size from 3 GB to 10 GB.
![](https://velog.velcdn.com/images/leeyosebi/post/ee7c1d69-c162-4af4-905e-96b9af6dacd3/image.png)

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
![](https://velog.velcdn.com/images/leeyosebi/post/7273b82e-a495-4d5e-b77a-80903ae8685f/image.png)
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
![](https://velog.velcdn.com/images/leeyosebi/post/9806cc2f-d206-4830-9e2f-7608597aea8c/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/1902c053-75f3-4c20-93df-b1cacf004c11/image.png)
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
https://learn.microsoft.com/en-us/exchange/troubleshoot/user-and-shared-mailboxes/increase-or-customize-mailbox-size