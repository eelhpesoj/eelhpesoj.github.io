---
---
# 0. Summary
This document contains the manual for Exchange Hybrid Configuration in environments where the Hybrid Configuration Wizard (HCW) cannot be run.

# 1. HCW log location
First up first, we need to take a look the whole HCW log so that we can check which commands are needed.

The log location is:
%UserProfile%\AppData\Roaming\microsoft\Exchange Hybrid Configuration

And open the text document.

![](https://velog.velcdn.com/images/leeyosebi/post/e3a3bb47-4e56-4589-ba3f-a20501fc996b/image.png)

https://learn.microsoft.com/en-us/exchange/hybrid-configuration-wizard#hybrid-deployment-configuration-changes

# 2. Filter the log to include only entries containing 'cmdlet'
Filter the log to show entries containing 'cmdlet'.
![](https://velog.velcdn.com/images/leeyosebi/post/7cc74a93-973a-4f44-83ec-6babee7c199e/image.png)

And separate it as Session=OnPremises and Session=tenant
![](https://velog.velcdn.com/images/leeyosebi/post/f3b17a23-9605-416e-bd81-f5b1001bd84c/image.png)

So that's all. You are good to go.
Edit the following commands properly.


# 3. PowerShell Commands
Organized the PowerShell commands in sequential order.
I create a random guid here. 
The guid is actually configured automatically by the HCW. But in this manual configuration I just assigned temporary.
https://github.com/leeyosebi/Powershell/blob/master/ExchangeServer/Exchange%20Hybrid.ps1


```shell
#Exchange Hybrid

#[Exchange Server]

Add-PSSnapin Microsoft.Exchange.Management.PowerShell.SnapIn

    # 0. Preparing Certname
        #cert
        #Get Thumbprint
        $Thumbp = Get-ExchangeCertificate | Where-Object{$_.subject -like "*cakeparty.kro.kr*"}
        $Thumbp.thumbprint

        #Set TLS CertName
        $TLSCert = Get-ExchangeCertificate -Thumbprint $Thumbp.thumbprint
        $TLSCertName = "<I>$($TLSCert.Issuer)<S>$($TLSCert.Subject)"

    # 1. Start Hybrid
    New-HybridConfiguration
    Set-HybridConfiguration -ClientAccessServers $null -ExternalIPAddresses $null -Domains 'cakeparty.kro.kr' -OnPremisesSmartHost 'mail.cakeparty.kro.kr' -TLSCertificateName $TLSCertName -SendingTransportServers CAKEPARTYEX01 -ReceivingTransportServers CAKEPARTYEX01 -EdgeTransportServers $null -Features FreeBusy,MoveMailbox,Mailtips,MessageTracking,OwaRedirection,OnlineArchive,SecureMail,CentralizedTransport,Photos

    # 2. Remote Domain
    New-RemoteDomain -Name 'Hybrid Domain - M365x66243491.mail.onmicrosoft.com' -DomainName 'M365x66243491.mail.onmicrosoft.com'
    Set-RemoteDomain -TargetDeliveryDomain: $true -Identity 'Hybrid Domain - M365x66243491.mail.onmicrosoft.com'
    New-RemoteDomain -Name 'Hybrid Domain - M365x66243491.onmicrosoft.com' -DomainName 'M365x66243491.onmicrosoft.com'
    Set-RemoteDomain -TrustedMailInboundEnabled: $true -Identity 'Hybrid Domain - M365x66243491.onmicrosoft.com'
    
    # 3. Accepted Domain & Email Addresses Policy 
    New-AcceptedDomain -DomainName 'M365x66243491.mail.onmicrosoft.com' -Name 'M365x66243491.mail.onmicrosoft.com'
    Set-EmailAddressPolicy -Identity 'Default Policy' -ForceUpgrade: $true -EnabledEmailAddressTemplates 'smtp:@cakeparty.kro.local','SMTP:%m@cakeparty.kro.kr','smtp:%m@M365x66243491.mail.onmicrosoft.com'
    Update-EmailAddressPolicy -Identity 'Default Policy' -UpdateSecondaryAddressesOnly: $true

    # 4. OrganisationRelationship
    New-OrganizationRelationship -Name 'On-premises to O365 eeebbbe0-5bab-442c-bdd6-24c37abf9f20' -TargetApplicationUri $null -TargetAutodiscoverEpr $null -Enabled: $true -DomainNames 'M365x66243491.mail.onmicrosoft.com'
    Set-OrganizationRelationship -MailboxMoveEnabled: $true -FreeBusyAccessEnabled: $true -FreeBusyAccessLevel LimitedDetails -ArchiveAccessEnabled: $true -MailTipsAccessEnabled: $true -MailTipsAccessLevel All -DeliveryReportEnabled: $true -PhotosEnabled: $true -TargetOwaURL 'https://outlook.office.com/mail' -Identity 'On-premises to O365 eeebbbe0-5bab-442c-bdd6-24c37abf9f20'
    
    # 5. Add AvailabilityAddressSpace
    Add-AvailabilityAddressSpace -ForestName 'M365x66243491.mail.onmicrosoft.com' -AccessMethod InternalProxy -UseServiceAccount: $true -ProxyUrl 'https://cakepartyex01.jose.run.local/EWS/Exchange.asmx'

    # 6. Connector Set up
    Set-HybridConfiguration -ClientAccessServers $null -ExternalIPAddresses $null
    New-SendConnector -Name 'Outbound to Office 365 - eeebbbe0-5bab-442c-bdd6-24c37abf9f20' -AddressSpaces 'smtp:M365x66243491.mail.onmicrosoft.com;1' -DNSRoutingEnabled: $true -ErrorPolicies Default -Fqdn 'cakeparty.kro.kr' -RequireTLS: $true -IgnoreSTARTTLS: $false -SourceTransportServers CAKEPARTYEX01 -SmartHosts $null -TLSAuthLevel DomainValidation -DomainSecureEnabled: $false -TLSDomain 'mail.protection.outlook.com' -CloudServicesMailEnabled: $true -TLSCertificateName $TLSCertName
    Set-ReceiveConnector -AuthMechanism 'Tls, Integrated, BasicAuth, BasicAuthRequireTLS, ExchangeServer' -Bindings '[::]:25','0.0.0.0:25' -Fqdn 'CAKEPARTYEX01.CAKEPARTY.KRO.LOCAL' -PermissionGroups 'AnonymousUsers, ExchangeServers, ExchangeLegacyServers' -RemoteIPRanges '::-ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff','0.0.0.0-255.255.255.255' -RequireTLS: $false -TLSDomainCapabilities 'mail.protection.outlook.com:AcceptCloudServicesMail' -TLSCertificateName $TLSCertName -TransportRole FrontendTransport -Identity 'CAKEPARTYEX01\Default Frontend CAKEPARTYEX01'
    New-IntraOrganizationConnector -Name 'HybridIOC - eeebbbe0-5bab-442c-bdd6-24c37abf9f20' -DiscoveryEndpoint 'https://autodiscover-s.outlook.com/autodiscover/autodiscover.svc' -TargetAddressDomains 'M365x66243491.mail.onmicrosoft.com' -Enabled: $true
    Set-PartnerApplication -Identity 'Exchange Online' -Enabled: $true
   
    # 7. AuthServer set up
    New-AuthServer -Name 'ACS - eeebbbe0-5bab-442c-bdd6-24c37abf9f20' -AuthMetadataUrl 'https://accounts.accesscontrol.windows.net/637ce511-f6a0-47ed-a892-6efb7b9b688a/metadata/json/1' -DomainName 'CAKEPARTY.KRO.KR','M365x66243491.mail.onmicrosoft.com' #Tenant GUID
    New-AuthServer -Name 'EvoSts - eeebbbe0-5bab-442c-bdd6-24c37abf9f20' -AuthMetadataUrl 'https://login.windows.net/M365x66243491.onmicrosoft.com/federationmetadata/2007-06/federationmetadata.xml' -Type AzureAD


# [Exchange Online]
    # 1. OrganisationRelationShip
    New-OrganizationRelationship -Name 'O365 to On-premises - 3f8e7a2d-1b45-4c89-a0d7-6f5b2e1c9a8d' -TargetApplicationUri $null -TargetAutodiscoverEpr $null -Enabled: $true -DomainNames 'CAKEPARTY.KRO.KR'
    Set-OrganizationRelationship -FreeBusyAccessEnabled: $true -FreeBusyAccessLevel LimitedDetails -TargetSharingEpr $null -MailTipsAccessEnabled: $true -MailTipsAccessLevel All -DeliveryReportEnabled: $true -PhotosEnabled: $true -TargetOwaURL 'https://mail.cakeparty.kro.kr/owa' -Identity 'O365 to On-premises - ManualHybrid'

    # 2. Connectors
    New-InboundConnector -Name 'Inbound from 3f8e7a2d-1b45-4c89-a0d7-6f5b2e1c9a8d' -CloudServicesMailEnabled: $true -ConnectorSource HybridWizard -ConnectorType OnPremises -RequireTLS: $true -SenderDomains '*' -SenderIPAddresses $null -RestrictDomainsToIPAddresses: $false -TLSSenderCertificateName 'cakeparty.kro.kr' -AssociatedAcceptedDomains $null
    New-OutboundConnector -Name 'Outbound to 3f8e7a2d-1b45-4c89-a0d7-6f5b2e1c9a8d' -RecipientDomains '*' -SmartHosts 'mail.cakeparty.kro.kr' -ConnectorSource HybridWizard -ConnectorType OnPremises -TLSSettings DomainValidation -TLSDomain 'cakeparty.kro.kr' -CloudServicesMailEnabled: $true -RouteAllMessagesViaOnPremises: $true -UseMxRecord: $false -IsTransportRuleScoped: $false

    # 3. Onpremisesorganization
    New-OnPremisesOrganization -HybridDomains 'CAKEPARTY.KRO.KR' -InboundConnector 'Inbound from 3f8e7a2d-1b45-4c89-a0d7-6f5b2e1c9a8d' -OutboundConnector 'Outbound to 3f8e7a2d-1b45-4c89-a0d7-6f5b2e1c9a8d' -OrganizationRelationship 'O365 to On-premises - 3f8e7a2d-1b45-4c89-a0d7-6f5b2e1c9a8d' -OrganizationName 'First Organization' -Name '3f8e7a2d-1b45-4c89-a0d7-6f5b2e1c9a8d' -OrganizationGuid '3f8e7a2d-1b45-4c89-a0d7-6f5b2e1c9a8d'
    New-IntraOrganizationConnector -Name 'HybridIOC - 3f8e7a2d-1b45-4c89-a0d7-6f5b2e1c9a8d' -DiscoveryEndpoint 'https://mail.cakeparty.kro.kr/autodiscover/autodiscover.svc' -TargetAddressDomains 'CAKEPARTY.KRO.KR' -Enabled: $true
    
    # Migration Endpoint
    Test-MigrationServerAvailability -ExchangeRemoteMove: $true -RemoteServer 'mail.cakeparty.kro.kr' -Credentials (Get-Credential -UserName CAKEPARTY\cakepartysuper)
    New-MigrationEndpoint -Name '[CAKEPARTY]Hybrid Migration Endpoint - EWS (Default Web Site)' -ExchangeRemoteMove: $true -RemoteServer 'mail.cakeparty.kro.kr' -Credentials (Get-Credential -UserName CAKEPARTY\cakepartysuper)
    Set-OnPremisesOrganization -Identity '3f8e7a2d-1b45-4c89-a0d7-6f5b2e1c9a8d' -Comment 'Weird String'
```

# Validation
1. Migration batches are working
![](https://velog.velcdn.com/images/leeyosebi/post/3f2afba8-3133-46a4-8d95-df95cef387e9/image.png)
2. ECP
![](https://velog.velcdn.com/images/leeyosebi/post/7b5eb044-3dcf-4781-96fd-276e91175c96/image.png)
3. Login
![](https://velog.velcdn.com/images/leeyosebi/post/dd0bb1d3-1d65-419a-8a18-edb5bd7dcb64/image.png)

# Mail Test
1. Internet → Exchange server(Centralised) → EXO(Onboarded mail box)
Exchange server has been recieved and send to the external
![](https://velog.velcdn.com/images/leeyosebi/post/310f37f6-d307-4ee3-9f93-b6428124949b/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/d18eab7d-b2f3-461c-86bb-07cf5b54d146/image.png)
Because of the Hybrid Centralised configuration, all emails are routed through the exchange server. Following message header indicates that the internet mail is routed by the exchange server.
![](https://velog.velcdn.com/images/leeyosebi/post/c298ce89-038a-4ca7-92b7-33d239c8b1fe/image.png)

2. EXO → Exchange server
![](https://velog.velcdn.com/images/leeyosebi/post/87e97450-7304-4381-b834-a1d0d11240f8/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/c224013a-6db8-4b69-9044-199c156f655b/image.png)

# You should match Certificate name
## EXO Inbound connector name!
At the very first, the mail actually caught in the loop at the between Exchange server and Exchange online.
I just checked and compare the configuration with the other exchange hybrid centralised server which has been configured with HCW(Hybrid configuration Wizard). But there is no difference!
Well, I've been searching on it. I feel it's a authenticating issues because the connection and the route is working.
So I take a look at the exchange online connectors, and I found the certificate name is different with the CN.
Actually, I just thought it might be working. As far as wilcard certificate concerned, there is no issues whatever I enter 'cakeparty.kro.kr' or '*.cakeparty.kro.kr'.
But as you can see below, it should be exactly same as the CN.
![](https://velog.velcdn.com/images/leeyosebi/post/67cf4acc-6144-4b5d-8081-365f500e0444/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/abed0112-4c31-4079-983d-de0b9fbe0919/image.png)

# After all..
So this is it!
But in the end, Microsoft recommands to execute the HCW.
They are not recommands these manual configuration.
![](https://velog.velcdn.com/images/leeyosebi/post/eb57a7ad-73bc-416b-9b15-11e0380089b8/image.jpeg)

