var store = [{
        "title": "Add Azureadgroupmember",
        "excerpt":"1. 요약: M365 그룹의 멤버를 ObjectID 기준으로 추출하여 다른 그룹의 멤버로 추가한다. 2. 이 코드가 필요했던 이유: TargetGroup은 assign으로 전사 유저를 추가해야했는데, refGroup은 UPN suffix 기준으로 유저를 할당하는 Dynamic Group이었다. 따라서 refGroup은 전사 유저가 할당되어 있었기 때문에 유저를 그대로 가져와서 추가할 수 있으면 작업이 편해지는 상황이었다. 3. 코드의 흐름: Connect-AzureAD...","categories": [],
        "tags": [],
        "url": "/Add-AzureADGroupMember/",
        "teaser": null
      },{
        "title": "Export ad users.csv",
        "excerpt":"1. 요약: AD에서 모든 유저들을 CSV 형태로 내보내는 Powershell 2. 이 코드가 필요했던 이유: 고객사는 On-prem AD와 테넌트에서 EXO만을 사용하고 있었다. 테넌트 마이그레이션을 하려고 했는데 PHS 방식으로 테넌트에 유저를 생성하려고 했다. AD에 계정의 원본이 있는 상황.(메일은 AVE Point라는 업체를 통해서 마이그레이션을 진행했다.) 문제는 Entra ID(AzureAD)에서 사용하고 있는 계정과 On-prem AD에...","categories": [],
        "tags": [],
        "url": "/Export-AD-Users.csv/",
        "teaser": null
      },{
        "title": "Manual scp setup",
        "excerpt":"1. 요약 AADC에서 디바이스를 Entra Hybrid Join으로 올릴 수 없어서 관련 값을 수동으로 조정했다. ref: 2. 이 작업이 필요했던 이유 이슈 발생 이 고객사는 여러 도메인을 AADC에서 하나의 테넌트로 올리려고 했던 고객사이다. 하지만 기존에 ADFS 구성되어있던 곳에 다른 지사들은 PHS 방식으로 동기화를 한 상태였는데, 문제는 나머지 지사들의 디바이스를 구성하려고 하니...","categories": [],
        "tags": [],
        "url": "/Manual-SCP-Setup/",
        "teaser": null
      },{
        "title": "Transferring a domain from another tenant",
        "excerpt":"다른 테넌트에 등록된 도메인을 새 테넌트로 가져오려면 몇가지 확인 후 작업이 필요하다.      도메인 가져오기            기존에 사용중인 테넌트 확인       UPN 변경       Samll SMTP주소 삭제       유저 및 그룹 삭제           AADC에 도메인 추가            가져온 도메인을 AADC가 조인된 AD에 조건부 전달자로 추가           ","categories": [],
        "tags": [],
        "url": "/Transferring-a-Domain-from-Another-Tenant/",
        "teaser": null
      },{
        "title": "[openssl] crt → pfx",
        "excerpt":"openssl pkcs12 -export -certpbe PBE-SHA1-3DES -keypbe PBE-SHA1-3DES -nomac -inkey contoso.com.key -in contoso.com.crt -out contoso.com-legacy.pfx  ","categories": [],
        "tags": [],
        "url": "/OpenSSL-CRT-PFX/",
        "teaser": null
      },{
        "title": "Deletecloudcustomdomainname",
        "excerpt":"https://github.com/leeyosebi/Powershell/blob/master/deleteCloudCustomDomainName.ps1 # Tenant 에서 로그인 계정의 UPN 도메인을 tenantname.onmicrosoft.com 으로 변경 Connect-AzureAD $tenantUsers = Get-AzureADUser -All $true | Where-Object {$_.UserPrincipalName -like \"*@customdomain\"} $tenantUsers | foreach {$newUpn = $_.UserPrincipalName.Replace(\"customdomain\",\"tenantname.onmicrosoft.com\"); $_ | Set-AzureADUser -UserPrincipalName $newUpn} #Tenant 에서 MailUser 계정의 PrimarySmtpAddress 를 tenantname.onmicrosoft.com 으로 변경 Connect-ExchangeOnline $tenantMailUsers = Get-MailUser -ResultSize Unlimited | Where-Object...","categories": [],
        "tags": [],
        "url": "/deleteCloudCustomDomainName/",
        "teaser": null
      },{
        "title": "Unifiedgroup, distributiongroup",
        "excerpt":"Azure AD(Active Directory)에서 Distribution Group과 Unified Group(또는 Office 365 그룹)은 다른 목적과 기능을 가지고 있다. Distribution Group (DG): 목적: 주로 이메일 주소의 그룹을 만들어 메일을 한 번에 여러 사용자에게 전송하기 위한 목적으로 사용된다. 프로토콜: 주로 전자 메일 관련 작업에 사용되며, Exchange Online 및 다른 이메일 시스템과 통합된다. 보안: 보안 그룹이...","categories": [],
        "tags": [],
        "url": "/UnifiedGroup,-DistributionGroup/",
        "teaser": null
      },{
        "title": "Permissions in exchange hybrid deployments",
        "excerpt":"1. 요약: SendAs 권한을 통해서 한 유저가 다른 유저의 이름으로 메일을 보내는 기능을 구현 2. 이 작업이 필요했던 이유: Exchange Hybrid 구성 이후 A@test.com 이라는 유저를 온보딩(On-prem mailBox를 EXO로 옮기는 작업)시켰다. 그런데 기존에 사용하고 있던 IT@test.com에 대한 SendAs 권한이 작동하지 않는 이슈가 있었다. 따라서 MS Document를 찾아본 결과 해당 구성은...","categories": [],
        "tags": [],
        "url": "/Permissions-in-Exchange-hybrid-deployments/",
        "teaser": null
      },{
        "title": "[study] adfs 1   architecture",
        "excerpt":"개요 Traditional Methods with Active Directory Claims based Identity How it workss in ADFS? Difference between ADFS Token and Kerberos Ticket 1. Traditional Methods 우선, AD의 어떤 Resource Owner(유저)가 AD와 연동된 Application에 로그인을 하려고 한다고 가정해본다. 이때 Application은 AD에 이 Resource Owner가 실제로 존재하는지, 이 계정이 유효한지를 판단한다. 판단 후...","categories": [],
        "tags": [],
        "url": "/STUDY-ADFS-1-Architecture/",
        "teaser": null
      },{
        "title": "[study] adfs 2   configuration",
        "excerpt":"요약 ADFS 서버를 간단히 구성해보기(내용 많음 주의) 1. Overview 먼저,Lab 환경이므로 AD의 CA(Certificate Authority) 기능을 통해 Internal SSL Certificate(or Private SSL Certificate)을 발급 받고 ADFS 서버에 등록한다. Production environment에서는 반드시 Public SSL Certificate을 사용해야한다. ADFS 서버에 인증서가 설치되고 나면 ADFS에서 사용되는 endpoints 중 Idinitiatedsignonpage URL을 활성화 시켜주어, Application 단에서 User...","categories": [],
        "tags": [],
        "url": "/STUDY-ADFS-2-Configuration/",
        "teaser": null
      },{
        "title": "Mailbox permissions and capabilities not supported in hybrid environments",
        "excerpt":"요약 Exchange Hybird 환경에서 SendAS 권한은 동기화 구성에서 빠져있기 때문에 수동으로 구성해야한다. 1. 구성 다음은 EXO로 동기화된 Onprem그룹에 EXO사서함에 대해 SendAS 권한을 추가하는 작업이다. ‘A Group’이라는 동기화된 그룹에 EXO사서함인 ‘TEST02’ 계정에 대해 SendAS권한을 부여해준다. 1. Exchange Online Powershell: 그룹에 특정 사서함에 대해 SendAS 권한을 부여 Add-RecipientPermission -Identity &lt;그룹&gt; -Trustee &lt;EXO사서함&gt;...","categories": [],
        "tags": [],
        "url": "/Mailbox-permissions-and-capabilities-NOT-supported-in-hybrid-environments/",
        "teaser": null
      },{
        "title": "Configure microsoft entra hybrid join",
        "excerpt":"Summary This is a attempt to understand one of the concepts of device deployment on M365. Especially Microsoft Entra hybrid joined devices. 1. Concept Microsoft Entra hybrid join means Joined to on-premises AD and Microsoft Entra ID requiring organizational account to sign in to the device. In short, This device...","categories": [],
        "tags": [],
        "url": "/Configure-Microsoft-Entra-hybrid-join/",
        "teaser": null
      },{
        "title": "Hybrid identity required ports and protocols",
        "excerpt":"Summary When you are planning to implementing a hybrid identity solution, remember that this following ports and protocols are required. In this post, I will cover the prerequisite of the Microsoft Entra Connect(Formerly known as Azure ad connect) and On-premises AD. 1. Overview This is the overal design but note...","categories": [],
        "tags": [],
        "url": "/Hybrid-Identity-Required-Ports-and-Protocols/",
        "teaser": null
      },{
        "title": "Enabling sensitivity labels(aip) for groups & sites",
        "excerpt":"Summary When you are trying to set up the AIP label, you can see the ‘Groups &amp; sites’ checkbox is disabled. In this posts, we will find out how to enable is feature. 1. Prerequisites understanding 1. What is ‘Unified Group’? The group in this case means ‘unified group’. If...","categories": [],
        "tags": [],
        "url": "/Enabling-Sensitivity-Labels(AIP)-for-Groups-&-Sites/",
        "teaser": null
      },{
        "title": "How to increase or customise exchange online mailbox size",
        "excerpt":"Summary Increase or customise EXO mailbox size. You should use Exchange Online PowerShell to do this. Step by Step 1. Check your current mailbox size Let’s increase the mailbox size from 3 GB to 10 GB. 2. Connect to the Exchange Online Management Execute your PowerShell ISE as a administrative...","categories": [],
        "tags": [],
        "url": "/How-to-increase-or-customise-Exchange-Online-mailbox-size/",
        "teaser": null
      },{
        "title": "Name server configuration",
        "excerpt":"Summary This is an article about configuration of the name server who wants to set up not using the external domain name service. Process ClientRequest domain query InternetDomain query Domain hosting providerQuery to domain name server(preferred name server) with port 53 On-premise DNS serverRespond properly Preparation On-premise name serverThis server...","categories": [],
        "tags": [],
        "url": "/Name-Server-Configuration/",
        "teaser": null
      },{
        "title": "[aip] the label bug of the outlook for mac",
        "excerpt":"[AIP] The label bug of the Outlook for Mac Summary I just found this issue when I were supporting one of my client. I recommended you that you should not use the legacy version of the outlook app if you are using Mac OS. If you select file label and...","categories": [],
        "tags": [],
        "url": "/AIP-The-label-bug-of-the-Outlook-for-Mac/",
        "teaser": null
      },{
        "title": "[intune] troubleshooting  bitlocker recovery key",
        "excerpt":"Summary One of my client request to reslove this error. He was facing this error since he had changed his password. Procedure Run ‘Command Prompt’ as an administrator Turn off BitLocker on the target drive. Use this command. C:\\WINDOWS\\system32&gt; manage-bde.exe -off C: C:\\WINDOWS\\system32&gt; manage-bde.exe -status Keep checking the Conversion Status...","categories": [],
        "tags": [],
        "url": "/Intune-TroubleShooting-BitLocker-recovery-key/",
        "teaser": null
      },{
        "title": "Configuration dag",
        "excerpt":"Summary Configuration DAG(Database availability groups) Prerequisites Two Exchange Machine(Domain Joined) One Witness Server Design The public IP address is not displayed in the document. Procedure 1. On the Witness Server side On the Witness Server, create new folder in the “C:\" Share the Witness folder Click find people Add ‘Exchange...","categories": [],
        "tags": [],
        "url": "/Configuration-DAG/",
        "teaser": null
      },{
        "title": "Configuration edge",
        "excerpt":"Summary Configuration Edge Server. In this document, we will go without Edge subscription. Overall Design The public IP address is not displayed in the document. Procedure 1. Edge Server preparation 1. Changing hostname Change host name Click ‘More’ and add domain suffix Click ‘OK’ and restart 2. Proceeding installation Check...","categories": [],
        "tags": [],
        "url": "/Configuration-EDGE/",
        "teaser": null
      },{
        "title": "User hard match(ad → aad)",
        "excerpt":"Summary The reason why this task was necessary One of the clients was using the AAD model initially but later configured AADC and then structured the Hybrid model. Consequently, there arose a situation where all the information from the existing AAD accounts needed to be hard-matched with AD accounts. This...","categories": [],
        "tags": [],
        "url": "/User-Hard-Match(AD-AAD)/",
        "teaser": null
      },{
        "title": "[java] number guessing game with package",
        "excerpt":"Source Code https://github.com/leeyosebi/veryFirst How to make the Package First up, you need to change directory where the source exsist. 1.Compile(.class file creation) javac NumberGuessingGame.java 2. Check if it’s working java NumberGuessingGame 3. Create TXT in the source directory You should add a blank line Main-Class: NumberGuessingGame 4. Create .jar file...","categories": [],
        "tags": [],
        "url": "/JAVA-Number-Guessing-Game-with-Package/",
        "teaser": null
      },{
        "title": "[intune] scripts and remediations  deleting user folder",
        "excerpt":"Summary This task is intended to delete the user folder from the public PC, and the login account is a public account as well. Prerequisite You should turn on the Windows license verification in the intune.microsoft.com Ref) https://learn.microsoft.com/en-us/mem/intune/protect/data-enable-windows-data#manage-windows-data-configurations Process 1. Create Remediations Go ‘intune.microsoft.com’ &gt; Devices &gt; Scripts and remediations...","categories": [],
        "tags": [],
        "url": "/Intune-Scripts-and-remediations-Deleting-user-folder/",
        "teaser": null
      },{
        "title": "[trouble shooting] exchange hybrid centralized",
        "excerpt":"Issue In the client’s environment, multiple branches were using Exchange Hybrid within a single tenant,** with all Exchange environments centralized.** We planned to deploy another branch’s Exchange Hybrid in this environment. The centralized configuration involves setting the MX record (port 25 communication) to point to the on-premises Exchange server so...","categories": [],
        "tags": [],
        "url": "/Trouble-Shooting-Exchange-Hybrid-Centralized/",
        "teaser": null
      },{
        "title": "Manual scp setup detail",
        "excerpt":"To give you more specific details of: https://velog.io/@leeyosebi/Manual-SCP-Setup 1. SCP configuration maunally 1. Create new container Run ADSI Edit Connect to configuration Create New object under the Services The class should be ‘container’ Set value as ‘Device Registration Configuration’ Click Finish 2. Create Service Connection Point Create new object under...","categories": [],
        "tags": [],
        "url": "/Manual-SCP-Setup-Detail/",
        "teaser": null
      },{
        "title": "Create aadc sync rules",
        "excerpt":"Summary In the case of integration for global branches, preferred data location and usage location should be configured to optimise their services. However, regarding the functional level of the DC, there is no value in the user properites. To go through this, we can use msCloudExtensionAttribue. 1. Ref https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-feature-preferreddatalocation 2....","categories": [],
        "tags": [],
        "url": "/Create-AADC-Sync-rules/",
        "teaser": null
      },{
        "title": "[intune] screen saver auto deployment",
        "excerpt":"1. Introduction One of my clients want to deploy screen saver files and deploy automatically using intune. So the task is: Deploy screen saver(.scr) file to the specific path using Intune Configure the screen saver profile using the deployed scr file. 2. Packing the .scr and .cmd See referrence 1...","categories": [],
        "tags": [],
        "url": "/Intune-Screen-saver-auto-deployment/",
        "teaser": null
      },{
        "title": "Noreply mailbox and send mail using o365 smtp server with java",
        "excerpt":"0. Summary Regarding Exchange online, I was intriguied to see how mail has been sent from any other systems. So, imagine that you are a developer and you have to integrate and implement function with a exchange online mailbox. Here is my breif solutions. 1. Create NoReply mailbox(Shared mailbox) First...","categories": [],
        "tags": [],
        "url": "/NoReply-mailbox-and-Send-mail-using-O365-smtp-server-with-Java/",
        "teaser": null
      },{
        "title": "Add Pssnapin microsoft.exchange.management.powershell.snapin",
        "excerpt":"0. Summary You may use ‘Exchange Management Shell’ for execute powerShell command to deploy something on the Exchange server. But it’s too uncomfortable for me to use in following reasons: When I forget the command options, I have to press ‘Tab’ repeatedly to search for them one by one. Since...","categories": [],
        "tags": [],
        "url": "/Add-PSSnapin-Microsoft.Exchange.Management.PowerShell.SnapIn/",
        "teaser": null
      },{
        "title": "Exchange hybrid deployment prerequisites(ews, autodiscover)",
        "excerpt":"0. Summary This post is about the required two URLs when you’re planning to configure Exchange Hybrid configuration. If your organisation is using M365, you need to open all the required ports and URLs. But the following URLs are quite important when you’re deploying Exchange Hybrid. Microsoft 365 URLs and...","categories": [],
        "tags": [],
        "url": "/Exchange-Hybrid-Deployment-Prerequisites(EWS,-Autodiscover)/",
        "teaser": null
      },{
        "title": "Manual exchange hybrid configuration",
        "excerpt":"0. Summary This document contains the manual for Exchange Hybrid Configuration in environments where the Hybrid Configuration Wizard (HCW) cannot be run. 1. HCW log location First up first, we need to take a look the whole HCW log so that we can check which commands are needed. The log...","categories": [],
        "tags": [],
        "url": "/Manual-Exchange-Hybrid-Configuration/",
        "teaser": null
      },{
        "title": "Authentication:authorization",
        "excerpt":"0. Summary Imagine when we visit a company. At the front of the company, you will meet a security in the desk and they will check if you can enter here or not. Specifically, they will check you are on the visitor list and you are actually the same person...","categories": [],
        "tags": [],
        "url": "/Authentication-Authorization/",
        "teaser": null
      },{
        "title": "Hybrid authentication methods adfs:pta:phs saml:oauth2.0",
        "excerpt":"0. Summary     1. PHS  https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/whatis-phs    Hash Value Location  C:\\Windows\\NTDS\\NTDS.DIT  ⚠️DO NOT DELETE THIS FILE⚠️    2. PTA  https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta    3. ADFS  https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/whatis-fed    4. Others   4-1. SAML  https://learn.microsoft.com/en-us/entra/architecture/auth-saml    4-2. OAuth 2.0  https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api    ","categories": [],
        "tags": [],
        "url": "/Hybrid-Authentication-Methods-ADFS-PTA-PHS-SAML-OAuth2.0/",
        "teaser": null
      },{
        "title": "Registration java app in entra id",
        "excerpt":"0. Introduction I’ve recently become curious about Entra ID’s app registration and authentication system. Basically, a service queries an identity provider (IdP) to verify a person’s identity. For example, it’s similar to how we prove our nationality when going through immigration in another country. We present our passport, which is...","categories": [],
        "tags": [],
        "url": "/Registration-Java-App-in-Entra-ID/",
        "teaser": null
      },{
        "title": "Multiple domain support for federating with microsoft entra id",
        "excerpt":"0. Index When configuring a hybrid environment, the authentication method for users is also set up through AADC. However, only one authentication method (PHS, PTA, or ADFS) can be selected per forest. Now, my customer has configured ADFS authentication to allow their headquarters employees to access the M365 environment. However,...","categories": [],
        "tags": [],
        "url": "/Multiple-Domain-Support-for-Federating-with-Microsoft-Entra-ID/",
        "teaser": null
      },{
        "title": "Create and publish powershell module",
        "excerpt":"0. Overview In this post, I will create my own custom powershell module and publish to PSGallery. It’s really easy. Let’s find out. 1. Create function Obviously, we need to create module. I just created a simple function like below. And ensure that the extension should be .psm1 when you...","categories": [],
        "tags": [],
        "url": "/Create-and-Publish-PowerShell-Module/",
        "teaser": null
      },{
        "title": "Ad ca setup & sign intune powershell script",
        "excerpt":"0. Overview One of my clients has decided to change their PowerShell execution policy to AllSigned. As a result, any PowerShell scripts executed through Intune are now required to be digitally signed, and script signature validation must be enforced at runtime. We initially considered signing the scripts with a public...","categories": [],
        "tags": [],
        "url": "/AD-CA-Setup-&-Sign-intune-PowerShell-Script/",
        "teaser": null
      },{
        "title": "Pfsense set up & nat reflection",
        "excerpt":"0. Summary I’m currently planning to test Azure VPN configuration. To do so, I’m setting up my own pfSense environment. In this post, I’ll walk you through the pfSense installation process and briefly share my on-premises network setup. In the next post, I’ll go over the Azure VPN configuration I...","categories": [],
        "tags": [],
        "url": "/Pfsense-set-up-&-NAT-Reflection/",
        "teaser": null
      },{
        "title": "Quantum cryptography communication  rsa → qkd?",
        "excerpt":"0. Summary I think the most trending keywords in the IT industry right now are AI and quantum computing. Obviously, AI feels much closer to us today—there are many LLM services, and multi-cloud platforms (MCPs) make them more extensible. Multimodal AI is even enabling machines to better recognize and understand...","categories": [],
        "tags": [],
        "url": "/Quantum-cryptography-Communication-RSA-QKD/",
        "teaser": null
      },{
        "title": "Copilot agent with iot",
        "excerpt":"Overview I have deciede to apply for a hackathon from Microsoft Korea. The main theme is copilot agent. I think MS really wants to get a chance of the copilot from this Hackerthon. As I am a engineer in a partner company of Microsoft, this is a good chance to...","categories": [],
        "tags": [],
        "url": "/Copilot-Agent-with-IoT/",
        "teaser": null
      },{
        "title": "[exchange hybrid] ews → dedicated hybrid app",
        "excerpt":"Overview Dear all, this post will provide you an idea to go through retirement of EWS from exchange online. All of this content from refer following two documents from Microsoft. Refer1: https://learn.microsoft.com/en-us/exchange/hybrid-deployment/deploy-dedicated-hybrid-app#service-principal-clean-up-mode Refer2: https://techcommunity.microsoft.com/blog/exchange/dedicated-hybrid-app-temporary-enforcements-new-hcw-and-possible-hybrid-function/4440682 First up first, take a look at the prerequisites Classic Full or Modern Full hybrid configuration...","categories": [],
        "tags": [],
        "url": "/Exchange-Hybrid-EWS-Dedicated-Hybrid-app/",
        "teaser": null
      },{
        "title": "Checking public ssl certificate",
        "excerpt":"Overview Most of the cases, we need to check the ssl stream if the connection is funtioning properly or not. To do this, I suggest the two options below. In this post, I will use my exchange server certificate issued to “mail.cake.run.place” 0. Index Using browser 1.1. Chrome 1.2 Edge...","categories": [],
        "tags": [],
        "url": "/Checking-Public-SSL-Certificate/",
        "teaser": null
      },{
        "title": "Iis arr configuration with exsvr",
        "excerpt":"Overview For the exchange server, almote every clients will need to seperate the network traffic with 443 and 25. In this case, they need reverse proxy. I will use IIS ARR(Application request routing) service as an proxy server. So, here is the a diagram which shows you the architecture of...","categories": [],
        "tags": [],
        "url": "/IIS-ARR-Configuration-with-ExSvr/",
        "teaser": null
      },{
        "title": "Event id 1074 on winsvr 2022 standard evaluation",
        "excerpt":"Related post: https://velog.io/@leeyosebi/IIS-ARR-Configuration-with-ExSvr 0. Overview Well, Since I set up the ARR on IIS and ExSvr, the VM has been shuting down almost every hours. So the mail service can’t be last. and this is really annoying when I need to test. This post contains what I was trying to...","categories": [],
        "tags": [],
        "url": "/Event-ID-1074-on-WinSvr-2022-Standard-Evaluation/",
        "teaser": null
      },]
