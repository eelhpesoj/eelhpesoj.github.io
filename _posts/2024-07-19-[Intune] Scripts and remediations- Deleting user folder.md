---
---

# Summary
This task is intended to delete the user folder from the public PC, and the login account is a public account as well.

# Prerequisite
You should turn on the Windows license verification in the intune.microsoft.com
![](https://velog.velcdn.com/images/leeyosebi/post/2447f10c-f221-4f56-b6ab-aed78fe4956d/image.png)

Ref)
https://learn.microsoft.com/en-us/mem/intune/protect/data-enable-windows-data#manage-windows-data-configurations


# Process
## 1. Create Remediations
Go 'intune.microsoft.com' > Devices > Scripts and remediations
![](https://velog.velcdn.com/images/leeyosebi/post/15926a0a-06b6-46ff-9f44-e0f08b2ef447/image.png)

## 2. Set name properly
![](https://velog.velcdn.com/images/leeyosebi/post/d45e48be-55b4-46e1-bc8f-8758a90c49b6/image.png)

## 3. Upload the Detection scripts and Remediation scripts
![](https://velog.velcdn.com/images/leeyosebi/post/f2fb24ca-ca76-401c-9ab7-b20d26df7e5c/image.png)

### [ Detection script]

```shell
# Detection script
$usersDirectory = "C:\\Users"
$specificUserFolders = @("cakeTest", "Public")

# Get a list of all user folders under C:\Users
$userFolders = Get-ChildItem -Path $usersDirectory | Where-Object { $_.PSIsContainer }

# Exclude the specific user folders
$userFoldersToDelete = $userFolders | Where-Object { $specificUserFolders -notcontains $_.Name } | Select-Object -ExpandProperty Name

# Print the list of user folders to be deleted
Write-Host "User profiles to be deleted:" $userFoldersToDelete -ForegroundColor Red

# Check if there are any user folders to be deleted and set exit code accordingly
if ($userFoldersToDelete.Count -gt 0) {
    Exit 1
} else {
    Exit 0
}
```
If you excute the 'Remediation script', you should throw the exit code as '1'.

### [ Remediation script]
```shell
# Detection script
$usersDirectory = "C:\\Users"
$specificUserFolders = @("cakeTest", "Public")

# Get a list of all user folders under C:\Users
$userFolders = Get-ChildItem -Path $usersDirectory | Where-Object { $_.PSIsContainer }

# Exclude the specific user folders
$userFoldersToDelete = $userFolders | Where-Object { $specificUserFolders -notcontains $_.Name } | Select-Object -ExpandProperty Name

# Print the list of user folders to be deleted
Write-Host "User profiles to be deleted:" $userFoldersToDelete -ForegroundColor Red

# Remediation script
function Delete-UserProfiles {
    param (
        [ValidateNotNullOrEmpty()]
        [string[]]$userFolders,

        [ValidateNotNullOrEmpty()]
        [string]$directory
    )
    foreach ($userFolder in $userFolders) {
        $userFolderPath = Join-Path $directory $userFolder
        try {
            Remove-Item -Path $userFolderPath -Recurse -Force
            Write-Host "User profile folder deleted: $userFolderPath"
        } catch {
            Write-Host "Error deleting user profile folder ${userFolderPath}: $($_.Exception.Message)"
        }
    }
}

# Call the remediation function
Delete-UserProfiles -userFolders $userFoldersToDelete -directory $usersDirectory

# Print a success message
Write-Host "User profiles under C:\\Users (except for the specific user folders) have been deleted." -ForegroundColor Red
```

## 6. Assign Group
![](https://velog.velcdn.com/images/leeyosebi/post/2399aaf3-b618-4077-a3b0-6e5aacc88518/image.png)

## 7. Scheduling
![](https://velog.velcdn.com/images/leeyosebi/post/ede637d2-3131-415e-b780-6b901920e09e/image.png)

## 8. Checking the Devices status 
![](https://velog.velcdn.com/images/leeyosebi/post/b3904ba9-7ede-42b1-881f-ddce509ee4fc/image.png)

## Notice
Once you delete the user folder and log on again with the user account, you will encounter this error message. You can click the 'Close' button to continue, and you will log on to this computer with a temporary user profile. This happens because even though you deleted the user folder, the Windows OS still remembers your account. To fix this or to restore the default user profile, some registry modifications are required.
![](https://velog.velcdn.com/images/leeyosebi/post/24d5994e-008e-45c7-81a3-45ca84ad2c9f/image.png)

## Reference
https://learn.microsoft.com/en-us/mem/intune/fundamentals/remediations#prerequisites
https://scloud.work/user-profile-clean-up-intune/