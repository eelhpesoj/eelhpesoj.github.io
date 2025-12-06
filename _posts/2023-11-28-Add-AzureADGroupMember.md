---
---

### 1. 요약:
M365 그룹의 멤버를 ObjectID 기준으로 추출하여 다른 그룹의 멤버로 추가한다.

### 2. 이 코드가 필요했던 이유:
TargetGroup은 assign으로 전사 유저를 추가해야했는데,
refGroup은 UPN suffix 기준으로 유저를 할당하는 Dynamic Group이었다.
따라서 refGroup은 전사 유저가 할당되어 있었기 때문에 유저를 그대로 가져와서 추가할 수 있으면 작업이 편해지는 상황이었다.


### 3. 코드의 흐름:
1. Connect-AzureAD 모듈로 테넌트에 접속(관리자 계정으로 로그인)
2. Get-AzureADGroup 을 통해 refGroup을 특정함 
(이때 -All $true을 통해서 유저를 다 가져온다)
3. 이후 ObjectID를 통해 TargetGoup을 특정하고 refGroup의 멤버를 ObjectID로 추가한다

### 4. 코드:

```shell
# Connect to Azure AD
Connect-AzureAD

# Get the group by display name
# This group's member will be added to the 'Target Group'
$refGroupName = "regGroupName"
$refGroup = Get-AzureADGroup -All $true | Where-Object {$_.DisplayName -eq $refGroupName}

if ($refGroup) {
    $refGroupID = $refGroup.ObjectId

    # Get members of the group
    $refGroupMembers = Get-AzureADGroupMember -ObjectId $refGroupID

    # Iterate through each member and add them to the group
    foreach ($Member in $refGroupMembers) {
        Add-AzureADGroupMember -ObjectId "Target Group ObjectID" -RefObjectId $Member.ObjectId
    }

    Write-Host "Members added successfully to the group"
} else {
    Write-Host "Group TargetGroup not found."
}

# Disconnect from Azure AD
Disconnect-AzureAD
```
### 5. GitHub:
https://github.com/leeyosebi/Powershell/blob/master/add-azureadGroup.ps1