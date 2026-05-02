---
title: "Configuration EDGE"
categories:
  - On-Premises
  - Exchange
---

# Summary
Configuration Edge Server.
In this document, we will go without Edge subscription.

---
# Overall Design

<img width="1416" height="1434" alt="image" src="https://github.com/user-attachments/assets/ea6f964f-0f16-40ff-aa89-a73c852f7fd0" />


The public IP address is not displayed in the document.



# Procedure
## 1. Edge Server preparation
### 1. Changing hostname
1. Change host name
<img width="650" height="786" alt="image" src="https://github.com/user-attachments/assets/7edee22d-6253-4528-bba9-34634e708528" />

2. Click 'More' and add domain suffix
<img width="790" height="476" alt="image" src="https://github.com/user-attachments/assets/47f0f465-d619-4296-a060-2bd932553d2e" />

3. Click 'OK' and restart
<img width="650" height="786" alt="image" src="https://github.com/user-attachments/assets/891fb7db-b9bd-4cec-a8b2-46f620058df8" />

### 2. Proceeding installation
1. Check Edge Transport role when you proceed installation
<img width="1602" height="1400" alt="image" src="https://github.com/user-attachments/assets/ec2e1654-cd5b-4155-941d-80da802e1db4" />

2. The prerequisite is '**.NET Framework 4.8**' and 
'**Visual C++ 2012 Redistributable Package**'.
<img width="1602" height="1400" alt="image" src="https://github.com/user-attachments/assets/6257cd6a-e350-4943-96ea-56c59e744ff0" />

3. Click install
<img width="1602" height="1400" alt="image" src="https://github.com/user-attachments/assets/9ae33cea-37e4-4d3e-a72f-de29d0123a61" />

4. Set up progress
<img width="1602" height="1400" alt="image" src="https://github.com/user-attachments/assets/07a4c3ca-76fc-4676-9ab8-3e3572a48e61" />

When the set up completed, you can check these two application are recented added
<img width="462" height="216" alt="image" src="https://github.com/user-attachments/assets/e2cb1b2a-4e1f-49a9-92a0-0ba8de867b38" />


### 3. Changing queue directory(Optional)
1. Stop '**Microsoft Exchange Transport**'
<img width="806" height="287" alt="image" src="https://github.com/user-attachments/assets/4ca5d847-f6f9-4487-8c22-945b4da4f9bf" />


2. Open this file using this command on the 'run'
```
Notepad %ExchangeInstallPath%Bin\EdgeTransport.exe.config 
```
<img width="830" height="462" alt="image" src="https://github.com/user-attachments/assets/652b36d6-bfdf-452f-bd40-049e9cd881ef" />

3. Change '**QueueDatabasePath**', '**QueueDatabaseLoggingPath**'
I recommend seperate this path as other drive.

3.1 Create new disk if you need.
<img width="1506" height="1194" alt="image" src="https://github.com/user-attachments/assets/b5086e77-6ca9-4f4a-b0a9-c91432effb9a" />

3.2 Enter the amount of space to shrink in MB
<img width="902" height="612" alt="image" src="https://github.com/user-attachments/assets/f9f328fd-e8e4-4be0-a1e3-047ca44f2014" />

3.3 After shrink, allocate **New Simple Volume**
<img width="478" height="356" alt="image" src="https://github.com/user-attachments/assets/b87ad801-01e4-43ed-956d-0ffe3a8cd8f1" />

3.4 Assign drive letter properly
<img width="998" height="786" alt="image" src="https://github.com/user-attachments/assets/14506d4a-6f33-4c2f-aed2-a2403eaebb07" />

3.5 The new volum has been created
<img width="442" height="184" alt="image" src="https://github.com/user-attachments/assets/e5d41bf9-50c2-44c2-9b2a-24e00fa9094e" />

4. Set the both path as '**D:\Queue\QueueDB**'
As-Is
<img width="2008" height="236" alt="image" src="https://github.com/user-attachments/assets/dce595be-4755-4ae8-8e9e-5145ed3133ac" />

To-Be
<img width="1122" height="238" alt="image" src="https://github.com/user-attachments/assets/d5a02683-92a8-4a56-93ff-abd6ec108688" />

5. Start '**Microsoft Exchange Transport**' again
<img width="1082" height="410" alt="image" src="https://github.com/user-attachments/assets/2cc5ed4b-7919-4626-a31b-ff2cccb3f5b3" />

6. The Queue DB location has changed
<img width="1054" height="664" alt="image" src="https://github.com/user-attachments/assets/267b1c9f-0382-4c8d-882a-8f3370871a2c" />



### 4. Changing Log directory(Optional)
1. Changing log directory
```shell
#Exchange 메일 송수신 Log 위치 변경 
$path= "D:\ExchangeLogs"

#Transport Service
Get-Transportservice|Set-TransportService -ConnectivityLogPath "$path\edge\Connectivity" -MessageTrackingLogPath "$path\MessageTracking" -IrmLogPath "$path\IRMLogs" -ActiveUserStatisticsLogPath "$path\edge\ActiveUsersStats" -ServerStatisticsLogPath "$path\edge\ServerStats" -ReceiveProtocolLogPath "$path\edge\ProtocolLog\SmtpReceive" -RoutingTableLogPath "$path\edge\Routing"-SendProtocolLogPath "$path\edge\ProtocolLog\SmtpSend" -QueueLogPath "$path\edge\QueueViewer" -WlmLogPath "$path\edge\WLM" -PipelineTracingPath "$path\edge\PipelineTracing" -AgentLogPath "$path\edge\AgentLog" -DNSLogEnabled $true -DnsLogPath "$path\edge\DNSLog"

#암시적 송신 커넥터 로그 활성화
Get-TransportService|Set-TransportService -IntraOrgConnectorProtocolLoggingLevel Verbose
```
In the shell
<img width="3544" height="236" alt="image" src="https://github.com/user-attachments/assets/abdfc3cb-6d8e-4173-9268-db0921f16cec" />


2. After execute the command, you can check the '**ExchangeLogs**' in the 'D:\'
<img width="566" height="266" alt="image" src="https://github.com/user-attachments/assets/3eacb4c2-cb42-41c0-a5a8-e000af740549" />


### 5. Specify the internal SMTP servers
```shell
Set-TransportConfig -InternalSMTPServers @{Add="<ip address1>","<ip address2>"...}
```
<img width="1650" height="232" alt="image" src="https://github.com/user-attachments/assets/909c0fcd-97d2-40e0-bf58-89824a783ee9" />



### 6. Binding Public Certificate on the SMTP Service
If you use public ssl certificate, you should bind the certificate on the SMTP service. Use following command on the Exchange management shell.
```shell
Enable-ExchangeCertificate -Thumbprint <Thumbprint> -Services SMTP
```
<img width="1342" height="286" alt="image" src="https://github.com/user-attachments/assets/2bdd058f-d1fd-4dcf-87ee-126acaff150b" />



## 2. Set up Inbound flow on Edge
Before we start though, we will configure '**External → Edge → Exchange**'
### 1. Accepted Domain
```shell
New-AcceptedDomain -Name whtpq.com -DomainName whtpq.com
```
<img width="2428" height="176" alt="image" src="https://github.com/user-attachments/assets/b7dd60f5-6097-41d7-a65e-c5a11d455ddc" />

Now, the EDGE can receive from external mails regarding to '**whtpq.com**' domain
: Exteranl → Edge
### 2. Send Connector
```shell
New-SendConnector -Name "To whtpq.com" -AddressSpaces whtpq.com -SmartHosts 10.10.4.41
```
<img width="1780" height="168" alt="image" src="https://github.com/user-attachments/assets/1134beca-47b1-4915-b340-1ac72a93db0c" />

Now, the EDGE can send mails to the whtpq.com Exchange server(10.10.4.41)
: External → Edge → Exchange

## 3. Set up Outbound flow on Edge
We will configure this flow:
Exchange → Edge → External 
### 1. Create Send Connector on the Exchange server side(Exchange → Edge)
1. Set the name and the type would be 'Custom'
<img width="1400" height="1224" alt="image" src="https://github.com/user-attachments/assets/ce7f38a3-a39e-4dfb-aca8-69ab5c457b62" />

2. Route mail through smart hosts(edge, 10.10.4.44)
<img width="1400" height="1224" alt="image" src="https://github.com/user-attachments/assets/0964ddda-9f73-4322-9908-2e1b021367b4" />

3. None for authentication
<img width="1400" height="1224" alt="image" src="https://github.com/user-attachments/assets/5bd94a86-0c56-426e-aeb1-573ac74e4b53" />

4. Set the domain as *
<img width="1400" height="1224" alt="image" src="https://github.com/user-attachments/assets/1d0c7d0d-1c48-4e48-90ac-4abd0c53b0fe" />

5. Add source server
<img width="1400" height="1224" alt="image" src="https://github.com/user-attachments/assets/27c0b044-2b5c-4899-8723-7b58df97b205" />

6. Disable other connector which route to the internet directly
<img width="688" height="188" alt="image" src="https://github.com/user-attachments/assets/b890d2c7-356c-42b1-a1ca-cebfa6e2808b" />

### 2. Create Receive Connector on the Edge server side(Exchange → Edge)
1. New receive connector
```shell
New-ReceiveConnector -Name "From whtpq.com" -Bindings 0.0.0.0:25  -RemoteIPRanges 10.10.4.41-10.10.4.42 
```
<img width="2060" height="176" alt="image" src="https://github.com/user-attachments/assets/f0e38807-927c-4cbf-8dc3-24a4a6ae8c71" />

2. Add permission to the new receive connector
```shell
Get-ReceiveConnector -Identity "whtpqEDGE\From whtpq.com"|Add-ADPermission -User "NT AUTHORITY\ANONYMOUS LOGON" -ExtendedRights "Ms-Exch-SMTP-Accept-Any-Recipient"
```
<img width="3014" height="166" alt="image" src="https://github.com/user-attachments/assets/f42fc790-9160-4d82-9a4d-3db143a10cbb" />

### 3. Create Send Connector on the Edge server side(Edge → External)
1. New send connector
```shell
New-SendConnector -Name "To External" -Internet -AddressSpaces *
```
<img width="1436" height="170" alt="image" src="https://github.com/user-attachments/assets/853953fe-f790-45c2-a93b-ef06acaf58c8" />

2. Logging send/receive connector(Oprional)
```shell
Get-ReceiveConnector|Set-ReceiveConnector -ProtocolLoggingLevel Verbose
Get-SendConnector|Set-SendConnector -ProtocolLoggingLevel Verbose
```
## 4. Check the meesage header if it's working or not
### 1. whtpqsuperuser@whtpq.com → leeyosebi@naver.com
1. MessageTrackingLog
<img width="1724" height="1088" alt="image" src="https://github.com/user-attachments/assets/efc95997-af3a-48a4-b8ba-810193fa528d" />

2. Queue
<img width="1768" height="214" alt="image" src="https://github.com/user-attachments/assets/cf0eb7bb-d0dc-43f3-8869-087744f3a1d4" />


3. Message Header
<img width="2136" height="978" alt="image" src="https://github.com/user-attachments/assets/64de2f63-b050-49b0-b09c-070298a23cc5" />


### 2. leeyosebi@naver.com → whtpqsuperuser@whtpq.com
1. /*image is missing*/



# Reference
- <https://learn.microsoft.com/en-us/exchange/architecture/edge-transport-servers/edge-transport-servers?view=exchserver-2019>
- <https://learn.microsoft.com/en-us/exchange/mail-flow/queues/relocate-queue-database?view=exchserver-2019>
- <https://learn.microsoft.com/en-us/exchange/antispam-and-antimalware/antispam-protection/antispam-on-mailbox-servers?view=exchserver-2019#step-3-specify-the-internal-smtp-servers-in-your-organization>
