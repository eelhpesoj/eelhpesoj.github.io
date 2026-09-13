---
title: "Deployment BOYK in Azure Storage Account"
categories:
  - Security
---


# 0. Overview
Previous post: <https://eelhpesoj.github.io/security/AIPBOYK/>

There are lots of services that we can use our BYOK scenarios.
Please refer: <https://learn.microsoft.com/en-us/azure/security/fundamentals/encryption-customer-managed-keys-support>

In this post, we will briefly take a look how to set the BYOK in Azure Storage.
This is just a LAB, so I will not address the HSM here.

# 1. Create Storage Account
1. From the resource group, create a new storage account. 
<img width="853" height="803" alt="image" src="https://github.com/user-attachments/assets/d3ce72f1-f405-4a9d-aaa9-b826e16f9695" />

# 2. Use a user-assigned managed identity to authorize access
1. From the AZ powershell
```powershell
Register-AzResourceProvider -ProviderNamespace "Microsoft.ManagedIdentity"
```
<img width="987" height="104" alt="image" src="https://github.com/user-attachments/assets/02fc218b-cf30-49d2-95aa-fa3a99077303" />

2. Check the provider
```powershell
$rgName = "azure-signup-rg"
$location = "eastus"
$userIdentity = New-AzUserAssignedIdentity -ResourceGroupName $rgName -Name "nullaccount-cmk-mi" -Location $location

Get-AzResourceProvider -ProviderNamespace "Microsoft.ManagedIdentity" | Select-Object ProviderNamespace, RegistrationState
```
<img width="987" height="270" alt="image" src="https://github.com/user-attachments/assets/f92b90b7-444a-43e4-9ad0-63531aca9df3" />

3. Check identity
```powershell
Get-AzUserAssignedIdentity
```
<img width="1342" height="317" alt="image" src="https://github.com/user-attachments/assets/95fe678f-0edd-4663-8200-60b1fd6424b0" />

4. Assign role to the identity
```powershell
$userIdentity = Get-AzUserAssignedIdentity -Name <user-assigned-identity> `
    -ResourceGroupName $rgName

$principalId = $userIdentity.PrincipalId

New-AzRoleAssignment -ObjectId $principalId `
    -RoleDefinitionName "Key Vault Crypto Service Encryption User" `
    -Scope $keyVault.ResourceId
```
<img width="1342" height="329" alt="image" src="https://github.com/user-attachments/assets/e7c51e50-d53e-48a6-85bb-5e81b24e83e4" />

5. Configure encryption for automatic updating of key versions
```powershell
$accountName = "<storage-account>"

# Use this form of the command with a user-assigned managed identity.
Set-AzStorageAccount -ResourceGroupName $rgName `
    -AccountName $accountName `
    -IdentityType SystemAssignedUserAssigned `
    -UserAssignedIdentityId $userIdentity.Id `
    -KeyvaultEncryption `
    -KeyVaultUri $keyVault.VaultUri `
    -KeyName $key.Name `
    -KeyVersion "" `
    -KeyVaultUserAssignedIdentityId $userIdentity.Id
```
<img width="1342" height="270" alt="image" src="https://github.com/user-attachments/assets/973e7d4d-3636-4b59-937f-2ec316442759" />

# 3. Check validation
1. KeySource
```powershell
$account = Get-AzStorageAccount `
    -ResourceGroupName "azure-signup-rg" `
    -Name "nullaccount"

$account.Encryption.KeySource
```
<img width="785" height="167" alt="image" src="https://github.com/user-attachments/assets/76f7d98f-e4a8-4f11-8096-40d7af0f7010" />

2. Storage account properties and assigned identity role
ref) <https://learn.microsoft.com/en-us/azure/storage/common/storage-encryption-key-model-get?utm_source=chatgpt.com&tabs=portal>

<img width="1920" height="1152" alt="image" src="https://github.com/user-attachments/assets/a30a75e5-d01d-465e-bdae-2d53a93de3d9" />

```powershell
$account = Get-AzStorageAccount `
    -ResourceGroupName "azure-signup-rg" `
    -Name "nullaccount"

$account | Select-Object `
    StorageAccountName,
    @{N="KeySource";E={$_.Encryption.KeySource}},
    @{N="KeyVaultUri";E={$_.Encryption.KeyVaultProperties.KeyVaultUri}},
    @{N="KeyName";E={$_.Encryption.KeyVaultProperties.KeyName}},
    @{N="KeyVersion";E={$_.Encryption.KeyVaultProperties.KeyVersion}}


$mi = Get-AzUserAssignedIdentity `
    -ResourceGroupName "azure-signup-rg" `
    -Name "nullaccount-cmk-mi"

$mi | Format-List Name, Id, PrincipalId, ClientId


Get-AzRoleAssignment `
    -ObjectId $mi.PrincipalId |
    Where-Object {
        $_.RoleDefinitionName -eq "Key Vault Crypto Service Encryption User"
    } |
    Format-Table RoleDefinitionName, Scope


```
<img width="1350" height="623" alt="image" src="https://github.com/user-attachments/assets/1eac8925-8aab-48ef-a1a3-72bd39633e9b" />

