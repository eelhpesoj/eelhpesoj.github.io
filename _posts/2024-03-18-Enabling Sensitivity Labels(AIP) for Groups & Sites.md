---
---

### Summary
When you are trying to set up the AIP label, you can see the 'Groups & sites' checkbox is disabled.
In this posts, we will find out how to enable is feature.

![](https://velog.velcdn.com/images/leeyosebi/post/022a1a91-2599-4634-a7d5-b8b92d4a8685/image.png)


---
### 1. Prerequisites understanding
**1. What is 'Unified Group'?**
The group in this case means 'unified group'. If you don't get what it is, please refer my previous post.
→ https://velog.io/@leeyosebi/UnifiedGroup-DistributionGroup

**2. What is 'Get-AzureADDirectorySettingTemplate' command?**
→ These templates can be used when creating new directory settings or for modifying existing settings. For example, you can use Get-AzureADDirectorySettingTemplate to view a list of available password policy templates and create a new password policy based on them

**3. What is 'Get-AzureADDirectorySetting' command?**
→ Azure AD directory settings include configuration components applied at a specific directory level, such as password policies, domain settings, user, and group settings. For example, you can use Get-AzureADDirectorySetting to check the current password policy or other directory-level settings.

**4. What is 'Execute-AzureADLabelSync' command**
→ This allows the application of sensitivity labels to Microsoft Teams sites, Microsoft 365 Groups, and SharePoint sites.

### 2. The set up process
1. Set up the SharePoint
2. Set up the Unified Group
3. AzureAdLabelSync


### 3. To enable the check box, run this PowerShell codes
1. Set up the SharePoint
```shell
$grpUnifiedSetting = (Get-AzureADDirectorySetting | where -Property DisplayName -Value “Group.Unified” -EQ)
$Setting = $grpUnifiedSetting
$grpUnifiedSetting.Values
```
2. Set up the Unified Group
```shell
$TemplateId = (Get-AzureADDirectorySettingTemplate | where { $_.DisplayName -eq “Group.Unified” }).Id
$Template = Get-AzureADDirectorySettingTemplate | where -Property Id -Value $TemplateId -EQ
```
3. AzureAdLabelSync
```shell
$Setting = $Template.CreateDirectorySetting()
$Setting[“EnableMIPLabels”] = “True”
```
### 4. Reference
- https://msftcompliance.com/blog/enabling-container-level-sensitivity-labelling-in-microsoft-365/
- https://prairiedeveloper.com/2021/10/enable-sensitivity-labels-in-microsoft-365-groups-and-sharepoint-sites/
- https://myronhelgering.com/how-to-enable-sensitivity-labels-for-microsoft-365-groups-sharepoint-sites-and-microsoft-teams/

