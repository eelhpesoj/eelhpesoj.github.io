---

---


# 0. Overview
In this post, I will create my own custom powershell module and publish to PSGallery.
It's really easy. Let's find out.

# 1. Create function
Obviously, we need to create module.
I just created a simple function like below.
And ensure that the extension should be **.psm1** when you save this ps1 file.
As you can see, it's for the used for module.

Quick description the function below:
Check the tenant's expiration date with admin account.
Because of the Graph module is not provide the created date, I think it's reasonable to check the admin account which is bulit in account when the demo tenant is created.

```shell
function Test-DemoTenantValid {
 
    Connect-MgGraph -Scopes "User.Read.All"
 
    $adminUser = Get-MgUser -All -Property DisplayName, UserPrincipalName, CreatedDateTime |
        Where-Object { $_.DisplayName -eq "MOD Administrator" } |
        Select-Object -First 1 DisplayName, UserPrincipalName, CreatedDateTime
 
    $TenantCreatedDateTime = $adminUser.CreatedDateTime
    $TenantIsValidUntil = $TenantCreatedDateTime.AddDays(90)
    $today = Get-Date
 
    if ($today -gt $TenantIsValidUntil) {
        Write-Host "Your tenant is expired. It was valid until $TenantIsValidUntil" -ForegroundColor Red
    }
    else {
        Write-Host "Your tenant is still valid. It is valid until $TenantIsValidUntil" -ForegroundColor Green
    }
}
 
```


# 2. Create API Key
To publish this module file to PSGallery, you need to sign in <https://www.powershellgallery.com/> and create your secret API Key.
<img width="1065" height="1097" alt="image" src="https://github.com/user-attachments/assets/1e5d331f-6713-40cb-b05b-1a57b3a440e9" />

Move to Publish > Click here.
<img width="1080" height="946" alt="image" src="https://github.com/user-attachments/assets/da6504a6-989a-4c61-84da-8ae2cb53064e" />

Click Create
<img width="1080" height="1101" alt="image" src="https://github.com/user-attachments/assets/6a42cbc8-2621-4152-9611-999aaf9fc805" />

<img width="1080" height="1751" alt="image" src="https://github.com/user-attachments/assets/638bdcd3-c83f-42c4-a1b6-fc013e553508" />

Make sure to remember your key. If you forgot the key, it's totally fine. You can Regenerate the key.
<img width="1080" height="1751" alt="image" src="https://github.com/user-attachments/assets/874f1c2e-bddd-47c4-9d30-465a6a313ece" />

# 3. Publish Module
Now we are all set to publish the module.
Oh make sure that the module should be in the directory.
And you need to make module manifest first
Use this cmdlet below which is excatlly the same as on the PSGallery>Publish.

```shell
# Execute 1
New-ModuleManifest -Path ".\DemoTenantIsValid\DemoTenantIsValid.psd1" `
    -RootModule "DemoTenantIsValid.psm1" `
    -ModuleVersion "1.0.0" `
    -Author "Joseph" `
    -Description "first version."

# Execute 2    
Publish-Module -Path <filePath> -NugetAPIKey <Your API Key>
```
Your directory and files would be like this:
<img width="317" height="149" alt="image" src="https://github.com/user-attachments/assets/75392634-44b6-44b1-b363-3f7dbe927ab0" />



And here is my example when I execute the 'Execute 2':
(I highly recommend to user PowerShell7)

The module has been uploaded to the gallery.
<img width="981" height="511" alt="image" src="https://github.com/user-attachments/assets/a6c200af-d67a-4940-afd7-de407c0812b4" />

After that, the package ID is displayed on my packages.
<img width="1091" height="998" alt="image" src="https://github.com/user-attachments/assets/593ad743-b059-44c8-b4a6-f53e17412fdf" />


And also can searched on the public modules.
<img width="824" height="486" alt="image" src="https://github.com/user-attachments/assets/1f69c5c3-09eb-44a5-a776-b8083dfd94fb" />


# 4. Install Module and Use
Now that we publish to the public PowerShell Gallery, let's test to install module in other computers.

Open new powershell session and execute this command below.
```
Install-Module -Name DemoTenantIsValid
```
<img width="1766" height="1055" alt="image" src="https://github.com/user-attachments/assets/1b0ed533-b256-4908-9980-1f3a4f8bf7da" />


Good the module has found in the PSGallery. Click 'Yes to All'
<img width="1766" height="1055" alt="image" src="https://github.com/user-attachments/assets/7ae57e94-a54e-4104-b3e7-db66ec9a83c0" />

<img width="1766" height="1055" alt="image" src="https://github.com/user-attachments/assets/b8e4158b-2ddd-4fb0-8b55-312068484e04" />


Once the module installed, you can check the module location on your local device with following command.
```shell
Get-Module -ListAvailable -Name DemoTenantIsValid | Select-Object ModuleBase
```
<img width="848" height="104" alt="image" src="https://github.com/user-attachments/assets/bd3575cd-825e-4086-8cc0-3899eff1cb17" />




and the funtion that I made is displayed and can be used.
<img width="1766" height="1055" alt="image" src="https://github.com/user-attachments/assets/741cb9af-47be-40ce-a237-ef6b9c849152" />



The function works. It trys to connect mggraph which I put in the function.
<img width="1766" height="1055" alt="image" src="https://github.com/user-attachments/assets/eca6bf0c-a531-419b-83fb-075bd0b19e28" />



Once you success to log in, it says your tenant is valid or not.
<img width="1766" height="1055" alt="image" src="https://github.com/user-attachments/assets/440c5313-f876-4efa-89f9-6bd47b8943e9" />



# 5. Ref
- <https://learn.microsoft.com/en-us/powershell/gallery/how-to/publishing-packages/publishing-a-package?view=powershellget-3.x>
- <https://learn.microsoft.com/en-us/powershell/scripting/learn/ps101/09-functions?view=powershell-7.5>
- <https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/new-modulemanifest?view=powershell-7.5>
