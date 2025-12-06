---
---

# 0. Overview
One of my clients has decided to change their PowerShell execution policy to AllSigned.
As a result, any PowerShell scripts executed through Intune are now required to be digitally signed, and script signature validation must be enforced at runtime.

We initially considered signing the scripts with a public certificate, but due to the associated cost and the short renewal cycle, we decided instead to deploy an internal Active Directory Certificate Authority (AD CA) to handle the code signing ourselves.

- ref) https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.5#powershell-execution-policies
![](https://velog.velcdn.com/images/leeyosebi/post/27f0a547-a172-4972-8ddd-2b4cf84d7e0a/image.png)

- ref) https://www.digicert.com/blog/tls-certificate-lifetimes-will-officially-reduce-to-47-days
![](https://velog.velcdn.com/images/leeyosebi/post/4ff73a60-a9f0-42e4-a4c9-4d9a3107a1e9/image.png)
- ref) 'Enforce script signature check' from Intune
![](https://velog.velcdn.com/images/leeyosebi/post/18105e4f-c6df-4cf5-ab9d-1410ddc79c22/image.png)

# 1. AD CA Configuration

## 1. Install CA feature
Check Active directory Certificate Services
![](https://velog.velcdn.com/images/leeyosebi/post/90fd44fa-424c-482f-8e7a-7cec77314b11/image.png)
Check 'Certificate Authority' and 'Certificate Authority Web Enrollment'
![](https://velog.velcdn.com/images/leeyosebi/post/b2a80983-f3fa-4716-850b-35d439741b76/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/2a2c783a-d253-4af2-9052-c512007ad51a/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/e3a3d7e9-d9fe-48d2-88f0-9523bf127637/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/96965f7e-7839-4ee9-8563-33145d0c22c0/image.png)
Check 'Certificate Authority' and 'Certification Authority Web Enrollment'
![](https://velog.velcdn.com/images/leeyosebi/post/b36437a1-8522-455d-bc67-c6ee4a848457/image.png)
Make sure to select Enterprise CA!!
![](https://velog.velcdn.com/images/leeyosebi/post/df161956-e5ca-4592-bd77-f1ab736aa1d8/image.png)
Click Next
![](https://velog.velcdn.com/images/leeyosebi/post/7001dbe9-d546-4f86-9b1c-2f8c3e688388/image.png)
Set CN of CA
![](https://velog.velcdn.com/images/leeyosebi/post/8127601a-fed2-4258-b127-7a19a3a44947/image.png)
Select the validity period of the CA.
![](https://velog.velcdn.com/images/leeyosebi/post/b2f7246c-e243-46bf-8733-0a0624432e7d/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/4fd0f753-16e7-4925-90d0-834e3ba3cf30/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/ce679add-fc39-4446-9504-9163845e2f44/image.png)
It's finished and close the window.
![](https://velog.velcdn.com/images/leeyosebi/post/e98823f9-06c8-46c8-b9ea-ca03bfabc073/image.png)

## 2. Create the code signing certificate template
Once the installation has finished successfully, go servermanager > Tools > Certificate Authority.
![](https://velog.velcdn.com/images/leeyosebi/post/a9fbd7da-b8d5-49c2-ac7b-cc36cf244945/image.png)
Go Certificate Template > Manage under the CN of the CA drop down list.
![](https://velog.velcdn.com/images/leeyosebi/post/0cf697fc-7361-40b5-8090-2143c38a3df1/image.png)
And Code Signing > (Right Click) Duplicate Template. Well, you can use this template directly but you can create your own template with duplicate from this one.
![](https://velog.velcdn.com/images/leeyosebi/post/3cbc709a-32c2-41b9-8304-40dc6fd13df1/image.png)
In General tab, set Template name and the validity of the certificate.
![](https://velog.velcdn.com/images/leeyosebi/post/6d7b88b7-654b-41ff-99fd-b774ce12b23f/image.png)
In Request Handling tab, select the options.
![](https://velog.velcdn.com/images/leeyosebi/post/9994e2af-c05e-49a8-a126-59b152ee2b08/image.png)
In Subject Name, Select CN as Subject name format.
![](https://velog.velcdn.com/images/leeyosebi/post/e88e81e0-4e57-4300-b0d9-ddf62f9b6344/image.png)
In Security tab, I allow read and write permissions to Authenticated Users. 
![](https://velog.velcdn.com/images/leeyosebi/post/2b2ec432-ec4e-4e5a-866d-48e76824d027/image.png)
Lastly, In Cryptography tab, I just let them as default. Click 'Apply' and 'OK' for save.
![](https://velog.velcdn.com/images/leeyosebi/post/0974fbb9-1770-4fde-a975-d8aa02607d4f/image.png)
So here is the our customed certificate for the Code Signing.
![](https://velog.velcdn.com/images/leeyosebi/post/b6edd4ec-d502-406e-8fed-cda347386136/image.png)

## 3. Adding to the Certificate Templates

Now we have created the customed template, we have to issue the template to issue.
Go Certificate Template > (Right Click) New > Certificate Template to Issue.
![](https://velog.velcdn.com/images/leeyosebi/post/e2b9bc17-0cf4-4664-9448-c66f6fb815ec/image.png)
Find the 'ForIntune' from the list and click 'OK' to add the Certificate Templates.
![](https://velog.velcdn.com/images/leeyosebi/post/9740bc08-31eb-4271-ada1-c69670aee9c7/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/7dcf335f-2729-4c32-9e50-680c0c6f7965/image.png)

# 2. From AD DC, Request Certificate
Go to AD DC, and add snap in certificate with Current User. Go (Right Click) Personal > All Tasks > Request new Certificate.
![](https://velog.velcdn.com/images/leeyosebi/post/0497accf-2451-40e7-aabb-8da5a4d451a6/image.png)
Next
![](https://velog.velcdn.com/images/leeyosebi/post/46cce8e2-8349-4380-9209-adef896f801b/image.png)
Select 'ForIntune' and Click 'Enroll'
![](https://velog.velcdn.com/images/leeyosebi/post/9c9c179f-6b37-4771-97b0-f64b1bf95481/image.png)
Certificate installation Enrollment has been succeed from AD CA.
![](https://velog.velcdn.com/images/leeyosebi/post/0242eec6-d57d-49f1-9369-1fee522d55ca/image.png)
So, we got a new directory under the 'Personal' and the Cod Signing certificate as well.
![](https://velog.velcdn.com/images/leeyosebi/post/191b1098-080c-47d6-848d-96826da3c6f6/image.png)
I just add friendly name to the certificate.
![](https://velog.velcdn.com/images/leeyosebi/post/2197d933-9924-4177-ad89-c91d8e0814db/image.png)


# 3. Signing the script
## 1. Signing
Now let's sign the script. First of all, we must identify the script. Use this command.
'Cert:\CurrentUser\My" is the path in the command where we issed the certificate under the personal.
```shell
Get-ChildItem "Cert:\CurrentUser\My" | fl
```
![](https://velog.velcdn.com/images/leeyosebi/post/38b26147-2677-409d-a926-164b89b81acd/image.png)

Assign the certificate to a variable. Refer following command.
```shell
$certificate = Get-ChildItem "Cert:\CurrentUser\My" | Where-Object {$_.Thumbprint -eq "Thumbprint"}
```
![](https://velog.velcdn.com/images/leeyosebi/post/f2d57e5a-bcf7-4772-ad98-4617e3d343ef/image.png)

We are ready to go. Execute following command to sign the PowerShell script.
```shell
Set-AuthenticodeSignature -FilePath "C:\IntunePowerShell\CustomCompliance.ps1 -Certificate $certificate
```
![](https://velog.velcdn.com/images/leeyosebi/post/00f6cee6-e5dc-4197-90eb-b399caa5f6d5/image.png)

## 2. Validating
Once the script is signed, you will see the signature information as a commented section within the script.
The script will only run if this information and the certificate details on the device match exactly. If even a single character in the script is modified, it must be signed again.
![](https://velog.velcdn.com/images/leeyosebi/post/e420d746-ba63-46a8-97b1-3a5b2f9185c3/image.png)



# 3. Deploying the Certificate with GPO
## 1. Current PowerShell Policy
From Group policy, MachinePolicy is Allsign which means only allow to execute digitally signed script.
![](https://velog.velcdn.com/images/leeyosebi/post/dd0d583a-04a4-4b03-8441-0f0a6c64515c/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/66405586-16a0-4053-b4f6-153cc9a62719/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/3008b71d-b38b-473d-ad84-108001ac5dea/image.png)

ref) https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-7.5
![](https://velog.velcdn.com/images/leeyosebi/post/b6dbf72a-b56c-491a-ac40-23ec1084251c/image.png)


## 2. if not signed script..
So at the moment, if the script is not digitally signed, it can't be executed.
Here is the test.ps1 which is not signed.
![](https://velog.velcdn.com/images/leeyosebi/post/56b6ec4f-351d-48bf-b09f-1e96e6f571c9/image.png)

If I execute the test.ps1 in the AD joined device used user cake1, the execution is blocked.
![](https://velog.velcdn.com/images/leeyosebi/post/eef869f8-0de0-4630-8c44-dd2b4048c857/image.png)

## 3. if signed script but the certificate is not installed in the device..
The script is signed but the device can't identify the signature in the script. This is why we have to install the certificate to the devices. From intune, we selected that we will run the script as a system context which means automatically executed without any prompt. Let's deployment the certificate from AD GPO.

![](https://velog.velcdn.com/images/leeyosebi/post/5ba9e474-3a8c-421f-8631-1053d57f84bb/image.png)

## 4. Create GPO
### Before create GPO, we need to export the certificate
From mmc, export the certificate.
![](https://velog.velcdn.com/images/leeyosebi/post/9bedd705-e6bc-4cb9-b62e-46ba5484f37e/image.png)
Next
![](https://velog.velcdn.com/images/leeyosebi/post/567164ea-25f7-4a0d-b9ed-6a9ba37f1ab6/image.png)
Select export PK or not. Next.
![](https://velog.velcdn.com/images/leeyosebi/post/af0db212-0b2b-403b-bb94-abbaf6412400/image.png)
Select the options you want. Next.
![](https://velog.velcdn.com/images/leeyosebi/post/f4925058-a481-4e22-aa56-7ea3dc47655e/image.png)
Select the security principals. Next.
![](https://velog.velcdn.com/images/leeyosebi/post/b95319c6-831f-49a2-94b7-0f9834a9f881/image.png)
Browse and select where you want to export.
![](https://velog.velcdn.com/images/leeyosebi/post/30be9744-c4bc-4336-8b56-bb77c382fbf2/image.png)
Finish.
![](https://velog.velcdn.com/images/leeyosebi/post/63f2047d-ba22-4327-8529-a4f7d7c73698/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/5ad40b16-df7b-4d68-b78a-0a8ae62e0bd7/image.png)
This is it.
![](https://velog.velcdn.com/images/leeyosebi/post/428c6f8c-d4a3-4bef-9203-f877601c75fe/image.png)



### Create GPO(Trusted Root Certificate Authorities & Trusted Publishers!!)
So, we will create a new Group Policy Object to deploy our certificate.
(Right Click)Group Policy Objects > New
![](https://velog.velcdn.com/images/leeyosebi/post/7a031b40-7c26-40c8-85c1-d3e0699e798e/image.png)
Give it a name.
![](https://velog.velcdn.com/images/leeyosebi/post/490eef54-7937-4880-94c4-23b6bcac6168/image.png)
Right click and edit.
![](https://velog.velcdn.com/images/leeyosebi/post/94db8ccb-7ef3-4f3d-893e-0fe244f22e1c/image.png)
Go to the 'Public Key Policies' and import the certificate.
YOU SHOULD DO THE SAME PROCESS TO **TRUSTED PUBLISHERS!!!!**
![](https://velog.velcdn.com/images/leeyosebi/post/5c596a42-2e0a-4369-8d66-6d955fbefba7/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/3b5198e6-1009-4e7e-8586-358db4cbb449/image.png)
Browse the location where we export the certificate.
![](https://velog.velcdn.com/images/leeyosebi/post/c895be81-ecb2-4342-a4f5-fb7e5b4210d1/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/2c42092c-439b-45c3-b3d7-c217e11a3dc8/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/f7d94731-f2a2-434c-961d-2c7adcafc4f6/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/b287f1c3-ab2f-49e4-b79f-c043cb9efd41/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/5cd24d1e-f42d-40e5-9ad6-6f8e337125d2/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/5cc1a6d3-8176-42c9-8b9e-912e2db9be02/image.png)
The certificate is imported to the GPO.
![](https://velog.velcdn.com/images/leeyosebi/post/572241ac-b63e-4755-989c-7388d7a9ad99/image.png)
Link the GPO to the OU where the domain joined devices exist.
![](https://velog.velcdn.com/images/leeyosebi/post/2fa96ab0-694e-46b4-87e5-be7d1deb5662/image.png)
Click OK.
![](https://velog.velcdn.com/images/leeyosebi/post/cb460522-2acd-44bb-8e91-b22c2d17dc1d/image.png)


## 5. Validating
Moving on one of the domain joined devices. Run cmd as administrator and execute the command 'gpupdate /force' or you can take some time, the certificate will be installed automatically.

Trusted Root Certification Authorities and Trusted Publishers.
![](https://velog.velcdn.com/images/leeyosebi/post/edf591f2-57bb-42d7-9ecc-d4e979e66f65/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/874b49bc-5130-4890-8d2f-18d517b65b4d/image.png)
After that, the script will be executed very well without any prompt.
So, we are good to go to move on Intune for the last step.
![](https://velog.velcdn.com/images/leeyosebi/post/b829affa-0e57-45b5-ae93-04f8d6f9ba7c/image.png)




# 4. Intune Configuration
All you have to do in intune is update the script and select 'Yes' to 'Enforce script signature check'.
![](https://velog.velcdn.com/images/leeyosebi/post/29392b40-37e4-41a1-a573-31989b98e972/image.png)

# 5. Result
Here is the result. Only domain joined device which is CAKE1PC is marked as 'Compliant'.
![](https://velog.velcdn.com/images/leeyosebi/post/6cfaa229-5bc5-43cc-858b-87b126990a56/image.png)
Let's check in azure portal. The CAKE1PC is Compliant which means the signed intune script is well executed.
![](https://velog.velcdn.com/images/leeyosebi/post/b094712c-d6fd-4601-9f84-a30a40772260/image.png)
But the other devices which is not domain joined PC and only registered in intune so that the device is not installed certificate from the GPO.

We configured Intune to allow scripts to run only if they are signed. However, when the signed script was executed on the device, it failed to run properly because the required certificate was not installed on the device. As a result, the script couldn't return JSON data, which led Intune to throw the following error.

![](https://velog.velcdn.com/images/leeyosebi/post/e095bd7f-8017-4d5c-9c39-a0eca0adb604/image.png)

# 6. Ref)
If you are planning to implement CA to your production environment, It's highly recommaneded to select the 3-tier certificate authorities. Please refer following document.

![](https://velog.velcdn.com/images/leeyosebi/post/0f2e748e-a9eb-4328-a424-84114a87b07d/image.png)
https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/dn786436(v=ws.11)#ca-hierarchy-options

# 7. Note

In this post, I select web enrollment but it's not recommended. Please check the following link.

https://support.microsoft.com/en-us/topic/kb5005413-mitigating-ntlm-relay-attacks-on-active-directory-certificate-services-ad-cs-3612b773-4043-4aa9-b23d-b87910cd3429