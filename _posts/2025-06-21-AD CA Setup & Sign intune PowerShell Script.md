---
---

# 0. Overview
One of my clients has decided to change their PowerShell execution policy to AllSigned.
As a result, any PowerShell scripts executed through Intune are now required to be digitally signed, and script signature validation must be enforced at runtime.

We initially considered signing the scripts with a public certificate, but due to the associated cost and the short renewal cycle, we decided instead to deploy an internal Active Directory Certificate Authority (AD CA) to handle the code signing ourselves.

- ref) Digital Signature Overview
<https://learn.microsoft.com/ko-kr/previous-versions/windows/internet-explorer/ie-developer/platform-apis/ms537361(v=vs.85)#digital-signatures>

- ref) <https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.5#powershell-execution-policies>
<img width="884" height="470" alt="image" src="https://github.com/user-attachments/assets/1213a6f3-d4df-4ade-b60a-bb96c65217c5" />


- ref) <https://www.digicert.com/blog/tls-certificate-lifetimes-will-officially-reduce-to-47-days>
<img width="1428" height="465" alt="image" src="https://github.com/user-attachments/assets/0e21a13d-b7d4-4058-8225-c7e4e3e53612" />

- ref) 'Enforce script signature check' from Intune
<img width="970" height="661" alt="image" src="https://github.com/user-attachments/assets/4c9a4d17-1368-425c-910f-6804d9407211" />


# 1. AD CA Configuration

## 1. Install CA feature
Check Active directory Certificate Services
<img width="880" height="751" alt="image" src="https://github.com/user-attachments/assets/081f1b68-7898-4f98-a011-8186176a24e3" />

Check 'Certificate Authority' and 'Certificate Authority Web Enrollment'
<img width="880" height="751" alt="image" src="https://github.com/user-attachments/assets/199fbcf4-e39f-48ce-8f93-8fd4bb173db7" />

<img width="880" height="751" alt="image" src="https://github.com/user-attachments/assets/3ca53cab-aeca-4831-a6b6-d8112c381309" />

<img width="880" height="751" alt="image" src="https://github.com/user-attachments/assets/9f4d009b-62e0-49b4-9f6d-dd3c3a776483" />

<img width="880" height="751" alt="image" src="https://github.com/user-attachments/assets/6c9d56ba-1215-4174-80dc-6e15ad52d8a4" />

Check 'Certificate Authority' and 'Certification Authority Web Enrollment'
<img width="880" height="751" alt="image" src="https://github.com/user-attachments/assets/80c58e7e-b393-474a-b72e-ff250bb80e4e" />

Sorry for the image but Make sure to select **Enterprise CA**!!
<img width="880" height="751" alt="image" src="https://github.com/user-attachments/assets/38442d0e-05fb-40d2-a1cb-e87d382b76b2" />

Click Next
<img width="880" height="751" alt="image" src="https://github.com/user-attachments/assets/671eb45f-99ad-4193-a2b3-8035a27ee631" />

Set CN of CA
<img width="880" height="751" alt="image" src="https://github.com/user-attachments/assets/9929f1cc-6ed1-4726-9b07-ddaccb97b7bf" />

Select the validity period of the CA.
<img width="880" height="751" alt="image" src="https://github.com/user-attachments/assets/74ef44fd-10fd-49a1-a1b9-0dec0f11d443" />

<img width="880" height="751" alt="image" src="https://github.com/user-attachments/assets/dac1a7b8-d131-43e7-b8e3-b0af5164e4b4" />

<img width="880" height="751" alt="image" src="https://github.com/user-attachments/assets/8c0342c8-15a8-4695-bb32-d5470e0814a9" />

It's finished and close the window.
<img width="880" height="751" alt="image" src="https://github.com/user-attachments/assets/153e27f7-21fb-4579-aa88-6e92b9ee5125" />


## 2. Create the code signing certificate template
Once the installation has finished successfully, go servermanager > Tools > Certificate Authority.
<img width="366" height="141" alt="image" src="https://github.com/user-attachments/assets/09494da2-bed5-418c-8193-6acfdb604cfb" />

Go Certificate Template > Manage under the CN of the CA drop down list.
<img width="1024" height="729" alt="image" src="https://github.com/user-attachments/assets/337a5593-843e-4124-a185-035f3924abb3" />

And Code Signing > (Right Click) Duplicate Template. Well, you can use this template directly but you can create your own template with duplicate from this one.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/d8dd2eac-07a0-4099-84b7-6816ee22da8d" />

In General tab, set Template name and the validity of the certificate.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/796252d1-c820-41c3-8a19-ac608e3d4de4" />

In Request Handling tab, select the options.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/54fad9bf-a2e4-4b8b-b9c7-d8afb2353388" />

In Subject Name, Select CN as Subject name format.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/b2304667-1c5e-45e4-873b-8c2b6d112139" />

In Security tab, I allow read and write permissions to Authenticated Users. 
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/01e56ddb-c79b-433b-a34c-321e6fd7d71c" />

Lastly, In Cryptography tab, I just let them as default. Click 'Apply' and 'OK' for save.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/04fd3412-7ec6-4850-9c29-20704c9af796" />

So here is the our customed certificate for the Code Signing.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/ca3e1e68-b7a2-4188-b539-e7820b011faf" />


## 3. Adding to the Certificate Templates

Now we have created the customed template, we have to issue the template to issue.
Go Certificate Template > (Right Click) New > Certificate Template to Issue.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/29e1bb0c-5428-4fca-b90f-a159f1bdb817" />

Find the 'ForIntune' from the list and click 'OK' to add the Certificate Templates.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/4c202b6f-19ca-4cd7-8ca7-0b1b0e302be7" />

<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/9aac5498-c7d6-4853-9f8f-5270652447c1" />


# 2. From AD DC, Request Certificate
Go to AD DC, and add snap in certificate with Current User. Go (Right Click) Personal > All Tasks > Request new Certificate.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/fdd23cc7-5454-4a87-adbd-a0b14b5a7654" />

Next
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/2dae8623-2e96-41f1-86a6-8a3af21c7cc6" />

Select 'ForIntune' and Click 'Enroll'
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/0c039589-3cc7-48e2-8f77-5d6dda40217f" />

Certificate installation Enrollment has been succeed from AD CA.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/e01ec1ca-90de-4c5c-8d80-e58fddbd3e3e" />

So, we got a new directory under the 'Personal' and the Cod Signing certificate as well.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/62e61ec3-9fb3-4cbb-95f8-7d8f8a0df2ce" />

I just add friendly name to the certificate.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/344798f3-fa99-4409-b746-63fa8fa26153" />



# 3. Signing the script
## 1. Signing
Now let's sign the script. First of all, we must identify the script. Use this command.
'Cert:\CurrentUser\My" is the path in the command where we issed the certificate under the personal.
```shell
Get-ChildItem "Cert:\CurrentUser\My" | fl
```
<img width="988" height="234" alt="image" src="https://github.com/user-attachments/assets/6d242113-b92a-484d-9b4d-5d0a7a6e81a1" />


Assign the certificate to a variable. Refer following command.
```shell
$certificate = Get-ChildItem "Cert:\CurrentUser\My" | Where-Object {$_.Thumbprint -eq "Thumbprint"}
```
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/17f1c6b1-36b3-4ec3-ae1b-50ba3c50bc0e" />


We are ready to go. Execute following command to sign the PowerShell script.
```shell
Set-AuthenticodeSignature -FilePath "C:\IntunePowerShell\CustomCompliance.ps1 -Certificate $certificate
```
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/f93447b0-23af-457f-9f3c-976445d5ccec" />


## 2. Validating
Once the script is signed, you will see the signature information as a commented section within the script.
The script will only run if this information and the certificate details on the device match exactly. If even a single character in the script is modified, it must be signed again.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/f363dcce-a7b3-4f6f-92fe-ea062cf5c64d" />




# 3. Deploying the Certificate with GPO
## 1. Current PowerShell Policy
From Group policy, MachinePolicy is Allsign which means only allow to execute digitally signed script.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/03ce3a21-4484-4786-8504-2103afdb631f" />

<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/b187087f-5910-4dff-9bd7-b710b5fc57a9" />

<img width="406" height="154" alt="image" src="https://github.com/user-attachments/assets/41f6269d-f6c1-46db-b1ea-7c68e106766f" />


ref) <https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-7.5>
<img width="832" height="225" alt="image" src="https://github.com/user-attachments/assets/f33eff71-d752-486e-8263-a968c22a5e08" />



## 2. if not signed script..
So at the moment, if the script is not digitally signed, it can't be executed.
Here is the test.ps1 which is not signed.
<img width="647" height="332" alt="image" src="https://github.com/user-attachments/assets/bd38428b-e667-48c2-8212-3699ec30d812" />


If I execute the test.ps1 in the AD joined device used user cake1, the execution is blocked.
<img width="879" height="162" alt="image" src="https://github.com/user-attachments/assets/f3971fae-552d-4639-9941-ed41eec369ab" />


## 3. if signed script but the certificate is not installed in the device..
The script is signed but the device can't identify the signature in the script. This is why we have to install the certificate to the devices. From intune, we selected that we will run the script as a system context which means automatically executed without any prompt. Let's deployment the certificate from AD GPO.

<img width="850" height="116" alt="image" src="https://github.com/user-attachments/assets/58f71ec7-1188-4426-b2f1-aa0225f25a45" />


## 4. Create GPO
### Before create GPO, we need to export the certificate
From mmc, export the certificate.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/cb9704c9-0784-493a-b0c1-844b8aa7412e" />

Next
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/cf12bdea-a375-47ec-8cd6-c06b146f6d5b" />

Select export PK or not. Next.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/2193fe56-51d7-49c5-9989-e5d0358e7709" />

Select the options you want. Next.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/ef27d9ec-9ef9-4db0-a983-71e12643e3c0" />

Select the security principals. Next.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/d7e8770f-4571-478a-a9ac-765b1804cd2a" />

Browse and select where you want to export.

<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/88116a30-12ae-4d25-87c9-d37cf3ed8717" />

Finish.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/5dc076bf-d3bf-4072-8eb1-d4a5c5dfc80f" />

<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/0ee6ffb0-f75a-48aa-a741-03fd902afe43" />


This is it.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/d1c6828e-0cb8-477a-97d3-be00786cf89e" />




### Create GPO(Trusted Root Certificate Authorities & Trusted Publishers!!)
So, we will create a new Group Policy Object to deploy our certificate.
(Right Click)Group Policy Objects > New
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/e2ab7287-cad3-4b16-bec5-967e4a8fea1e" />

Give it a name.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/df0654e6-31b7-41d3-a614-75d3b029b145" />

Right click and edit.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/f7e88ce3-b070-4b9e-a6c9-e87f6b1f06b0" />

Go to the 'Public Key Policies' and import the certificate.
YOU SHOULD DO THE SAME PROCESS TO **TRUSTED PUBLISHERS!!!!**
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/2673983e-d2d4-4d5b-b4aa-fcd8ee4afbfc" />

<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/4ab8c439-c980-434f-b50e-80ccbe88029b" />

Browse the location where we export the certificate.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/0e9704c5-a6a6-43be-a2d1-f7230bc32b10" />

<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/5bf1abde-62c0-4d05-b4b8-0f9aeac591a7" />

<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/9261c455-e90d-4dc2-8499-f7672366b774" />

<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/1ac5fed1-5736-4af7-8a4d-35e13e04e7b8" />

<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/b18c1daf-02cb-49ca-95db-9200f3d79906" />

<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/07c8bee1-82ab-4562-8154-092e004d9752" />

The certificate is imported to the GPO.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/7da9e11b-005a-4ae0-87db-f3b86940e1f6" />

Link the GPO to the OU where the domain joined devices exist.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/5ccdc807-9579-4404-8410-4027605c54ef" />

Click OK.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/96110fff-24c9-4ecf-86cb-48b4cd5e60e0" />



## 5. Validating
Moving on one of the domain joined devices. Run cmd as administrator and execute the command 'gpupdate /force' or you can take some time, the certificate will be installed automatically.

Trusted Root Certification Authorities and Trusted Publishers.
<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/c034161c-b905-45a8-85ca-7429afc994b0" />

<img width="1025" height="730" alt="image" src="https://github.com/user-attachments/assets/ede84b61-3af4-45fa-8b43-d48fa1cd79e6" />

After that, the script will be executed very well without any prompt.
So, we are good to go to move on Intune for the last step.
<img width="405" height="132" alt="image" src="https://github.com/user-attachments/assets/060a15ed-7377-46cd-bfe4-b92801d4e818" />





# 4. Intune Configuration
All you have to do in intune is update the script and select 'Yes' to 'Enforce script signature check'.
<img width="1005" height="655" alt="image" src="https://github.com/user-attachments/assets/5781ecbe-6054-40da-9f2e-5a05578c72c1" />


# 5. Result
Here is the result. Only domain joined device which is CAKE1PC is marked as 'Compliant'.
<img width="976" height="546" alt="image" src="https://github.com/user-attachments/assets/11877fde-3176-4821-95bb-cf54d7e9d9d1" />

Let's check in azure portal. The CAKE1PC is Compliant which means the signed intune script is well executed.
<img width="937" height="397" alt="image" src="https://github.com/user-attachments/assets/7825afc6-475a-4d0b-a6c2-38577f103679" />

But the other devices which is not domain joined PC and only registered in intune so that the device is not installed certificate from the GPO.

We configured Intune to allow scripts to run only if they are signed. However, when the signed script was executed on the device, it failed to run properly because the required certificate was not installed on the device. As a result, the script couldn't return JSON data, which led Intune to throw the following error.

<img width="1085" height="408" alt="image" src="https://github.com/user-attachments/assets/c23a08d4-973b-4b85-851b-3307ece0ba31" />


# 6. Ref)
If you are planning to implement CA to your production environment, It's highly recommaneded to select the 3-tier certificate authorities. Please refer following document.

<img width="566" height="298" alt="image" src="https://github.com/user-attachments/assets/4aea4eec-d202-4ee6-8ee9-7af3bff3727b" />

<https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/dn786436(v=ws.11)#ca-hierarchy-options>

# 7. Note

In this post, I select web enrollment but it's not recommended. Please check the following link.

<https://support.microsoft.com/en-us/topic/kb5005413-mitigating-ntlm-relay-attacks-on-active-directory-certificate-services-ad-cs-3612b773-4043-4aa9-b23d-b87910cd3429>
