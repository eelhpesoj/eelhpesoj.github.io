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
To publish this module file to PSGallery, you need to sign in https://www.powershellgallery.com/ and create your secret API Key.
![](https://velog.velcdn.com/images/leeyosebi/post/04582bd4-0a7d-439c-835b-065b6fd70716/image.png)
Move to Publish > Click here.
![](https://velog.velcdn.com/images/leeyosebi/post/91499fb3-b809-4f74-9cef-cc422b6b44e2/image.png)
Click Create
![](https://velog.velcdn.com/images/leeyosebi/post/562b726e-0355-4f89-9785-138e29e68ffc/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/d31076a8-644b-4960-ad3c-5efb4f3067ea/image.png)
Make sure to remember your key. If you forgot the key, it's totally fine. You can Regenerate the key.
![](https://velog.velcdn.com/images/leeyosebi/post/eb0c1249-83b3-4983-88a2-69345c5269f7/image.png)
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
![](https://velog.velcdn.com/images/leeyosebi/post/053e5497-a1be-45ec-a679-7c7661c5999b/image.png)


And here is my example when I execute the 'Execute 2':
(I highly recommend to user PowerShell7)

The module has been uploaded to the gallery.
![](https://velog.velcdn.com/images/leeyosebi/post/7b4a1e03-b6e1-4122-9a21-a96d499dad56/image.png)
After that, the package ID is displayed on my packages.
![](https://velog.velcdn.com/images/leeyosebi/post/7cd1830e-c65f-4f4c-8436-ad6d4ad78215/image.png)

And also can searched on the public modules.
![](https://velog.velcdn.com/images/leeyosebi/post/a28f6688-a500-4747-8736-bb74c55fd371/image.png)

# 4. Install Module and Use
Now that we publish to the public PowerShell Gallery, let's test to install module in other computers.

Open new powershell session and execute this command below.
```
Install-Module -Name DemoTenantIsValid
```
![](https://velog.velcdn.com/images/leeyosebi/post/f9414583-5795-4a6f-8ae8-1b103ae195cf/image.png)

Good the module has found in the PSGallery. Click 'Yes to All'
![](https://velog.velcdn.com/images/leeyosebi/post/cd423635-8ff6-44e1-bb49-760f48d84716/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/bdfb673c-08f3-4935-b67a-4d2643dc487f/image.png)

Once the module installed, you can check the module location on your local device with following command.
```shell
Get-Module -ListAvailable -Name DemoTenantIsValid | Select-Object ModuleBase
```
![](https://velog.velcdn.com/images/leeyosebi/post/cf669583-0c97-44df-87bd-b043a8d4ec1b/image.png)


and the funtion that I made is displayed and can be used.
![](https://velog.velcdn.com/images/leeyosebi/post/a0b48973-71b9-4342-8256-511371e2a59a/image.png)

The function works. It trys to connect mggraph which I put in the function.
![](https://velog.velcdn.com/images/leeyosebi/post/b3c78464-f233-443d-8ffa-e27d9421281f/image.png)


Once you success to log in, it says your tenant is valid or not.
![](https://velog.velcdn.com/images/leeyosebi/post/4af98b85-c6a1-4736-af34-8efc943f220a/image.png)


# 5. Ref
- https://learn.microsoft.com/en-us/powershell/gallery/how-to/publishing-packages/publishing-a-package?view=powershellget-3.x
- https://learn.microsoft.com/en-us/powershell/scripting/learn/ps101/09-functions?view=powershell-7.5
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/new-modulemanifest?view=powershell-7.5