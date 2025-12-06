---
---

# Summary
Configuration Edge Server.
In this document, we will go without Edge subscription.

---
# Overall Design

![](https://velog.velcdn.com/images/leeyosebi/post/556c95c1-37f9-4282-8ddd-00433fcdfd3e/image.png)

The public IP address is not displayed in the document.



# Procedure
## 1. Edge Server preparation
### 1. Changing hostname
1. Change host name
![](https://velog.velcdn.com/images/leeyosebi/post/a6168d77-dee8-4b18-a487-95f5af3faf56/image.png)
2. Click 'More' and add domain suffix
![](https://velog.velcdn.com/images/leeyosebi/post/785dd441-ff48-44c5-8589-88b62db738f8/image.png)
3. Click 'OK' and restart
![](https://velog.velcdn.com/images/leeyosebi/post/32ed25c4-ce29-4815-8796-fe36f3e076cc/image.png)
### 2. Proceeding installation
1. Check Edge Transport role when you proceed installation
![](https://velog.velcdn.com/images/leeyosebi/post/c68a5d85-2f42-45e9-a999-2d6a6e0c3817/image.png)
2. The prerequisite is '**.NET Framework 4.8**' and 
'**Visual C++ 2012 Redistributable Package**'.
![](https://velog.velcdn.com/images/leeyosebi/post/73d8d8b0-18da-4cee-bb57-d7e2a31ee795/image.png)
3. Click install
![](https://velog.velcdn.com/images/leeyosebi/post/61e9ef79-3e45-45cf-be93-c80165d3f87a/image.png)
4. Set up progress
![](https://velog.velcdn.com/images/leeyosebi/post/3632bd33-365a-4d5f-bcaa-aa36e78f91f2/image.png)
When the set up completed, you can check these two application are recented added
![](https://velog.velcdn.com/images/leeyosebi/post/da68b2f5-99b5-4678-8cad-f0bc06cb1629/image.png)

### 3. Changing queue directory(Optional)
1. Stop '**Microsoft Exchange Transport**'
![](https://velog.velcdn.com/images/leeyosebi/post/313f71e0-0e76-4a0e-b4be-c6b126352556/image.png)

2. Open this file using this command on the 'run'
```
Notepad %ExchangeInstallPath%Bin\EdgeTransport.exe.config 
```
![](https://velog.velcdn.com/images/leeyosebi/post/b801d4ec-e41f-4907-9aa7-db85d264b7c4/image.png)
3. Change '**QueueDatabasePath**', '**QueueDatabaseLoggingPath**'
I recommend seperate this path as other drive.

3.1 Create new disk if you need.
![](https://velog.velcdn.com/images/leeyosebi/post/b3e78eec-e294-434d-83cf-0e4858e6404b/image.png)
3.2 Enter the amount of space to shrink in MB
![](https://velog.velcdn.com/images/leeyosebi/post/3e7e4135-18fe-4676-bdfe-7077368585ff/image.png)
3.3 After shrink, allocate **New Simple Volume**
![](https://velog.velcdn.com/images/leeyosebi/post/e3ae6ab4-f724-4567-ae67-08b1b1e8d060/image.png)
3.4 Assign drive letter properly
![](https://velog.velcdn.com/images/leeyosebi/post/4595a332-fd7f-4760-8410-054746e79b2c/image.png)
3.5 The new volum has been created
![](https://velog.velcdn.com/images/leeyosebi/post/7fde36a3-aae4-45e0-8628-c6d12cc38697/image.png)
4. Set the both path as '**D:\Queue\QueueDB**'
As-Is
![](https://velog.velcdn.com/images/leeyosebi/post/9d4564a0-203d-4b23-9e91-1cfec0af89df/image.png)
To-Be
![](https://velog.velcdn.com/images/leeyosebi/post/0e28953f-ad33-46f8-a04f-19e98d877cae/image.png)
5. Start '**Microsoft Exchange Transport**' again
![](https://velog.velcdn.com/images/leeyosebi/post/2f60425f-0d7d-4ef9-b0d6-1f186a837952/image.png)
6. The Queue DB location has changed
![](https://velog.velcdn.com/images/leeyosebi/post/6f9d7194-5049-441d-b611-50ac0a0f51f8/image.png)


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
![](https://velog.velcdn.com/images/leeyosebi/post/c427cf72-5058-4908-a9fa-fbdbc17a8c12/image.png)
2. After execute the command, you can check the '**ExchangeLogs**' in the 'D:\'
![](https://velog.velcdn.com/images/leeyosebi/post/9dd90abf-ab90-4236-ad42-655adfdcb153/image.png)


### 5. Specify the internal SMTP servers
```shell
Set-TransportConfig -InternalSMTPServers @{Add="<ip address1>","<ip address2>"...}
```
![](https://velog.velcdn.com/images/leeyosebi/post/4cc23bae-21d2-40dc-8981-86290eb3e92c/image.png)


### 6. Binding Public Certificate on the SMTP Service
If you use public ssl certificate, you should bind the certificate on the SMTP service. Use following command on the Exchange management shell.
```shell
Enable-ExchangeCertificate -Thumbprint <Thumbprint> -Services SMTP
```
![](https://velog.velcdn.com/images/leeyosebi/post/5cf4f651-f871-4924-9938-1542aa22b2b4/image.png)


## 2. Set up Inbound flow on Edge
Before we start though, we will configure '**External → Edge → Exchange**'
### 1. Accepted Domain
```shell
New-AcceptedDomain -Name whtpq.com -DomainName whtpq.com
```
![](https://velog.velcdn.com/images/leeyosebi/post/b8888b46-1766-4403-ab1c-21165f52e683/image.png)
Now, the EDGE can receive from external mails regarding to '**whtpq.com**' domain
: Exteranl → Edge
### 2. Send Connector
```shell
New-SendConnector -Name "To whtpq.com" -AddressSpaces whtpq.com -SmartHosts 10.10.4.41
```
![](https://velog.velcdn.com/images/leeyosebi/post/7ba7a96a-e5b6-44c6-a9ee-58ed1057d366/image.png)
Now, the EDGE can send mails to the whtpq.com Exchange server(10.10.4.41)
: External → Edge → Exchange

## 3. Set up Outbound flow on Edge
We will configure this flow:
Exchange → Edge → External 
### 1. Create Send Connector on the Exchange server side(Exchange → Edge)
1. Set the name and the type would be 'Custom'
![](https://velog.velcdn.com/images/leeyosebi/post/cd0f5fdf-8cd2-4df3-b76a-a1ff12a742e7/image.png)
2. Route mail through smart hosts(edge, 10.10.4.44)
![](https://velog.velcdn.com/images/leeyosebi/post/b4ea0e79-39e6-40c9-9a95-40e1060bfc3f/image.png)
3. None for authentication
![](https://velog.velcdn.com/images/leeyosebi/post/c20f1868-2c67-4b28-b70f-421c25f220b9/image.png)
4. Set the domain as *
![](https://velog.velcdn.com/images/leeyosebi/post/4cf4236c-0df2-4dc1-8d82-1e37bd98108e/image.png)
5. Add source server
![](https://velog.velcdn.com/images/leeyosebi/post/dc46c2f6-742b-4d08-867b-af3cc18ec6f1/image.png)
6. Disable other connector which route to the internet directly
![](https://velog.velcdn.com/images/leeyosebi/post/37e7722e-26f6-4489-8b64-1ec9c8fe6e8f/image.png)
### 2. Create Receive Connector on the Edge server side(Exchange → Edge)
1. New receive connector
```shell
New-ReceiveConnector -Name "From whtpq.com" -Bindings 0.0.0.0:25  -RemoteIPRanges 10.10.4.41-10.10.4.42 
```
![](https://velog.velcdn.com/images/leeyosebi/post/dba66d5a-f6e3-448e-b540-653d14ce17cb/image.png)
2. Add permission to the new receive connector
```shell
Get-ReceiveConnector -Identity "whtpqEDGE\From whtpq.com"|Add-ADPermission -User "NT AUTHORITY\ANONYMOUS LOGON" -ExtendedRights "Ms-Exch-SMTP-Accept-Any-Recipient"
```
![](https://velog.velcdn.com/images/leeyosebi/post/52f0f8ff-cfef-4020-b9dc-b69ab5bc9f6b/image.png)
### 3. Create Send Connector on the Edge server side(Edge → External)
1. New send connector
```shell
New-SendConnector -Name "To External" -Internet -AddressSpaces *
```
![](https://velog.velcdn.com/images/leeyosebi/post/e018983c-020c-42a6-9761-1ae1a833d62b/image.png)
2. Logging send/receive connector(Oprional)
```shell
Get-ReceiveConnector|Set-ReceiveConnector -ProtocolLoggingLevel Verbose
Get-SendConnector|Set-SendConnector -ProtocolLoggingLevel Verbose
```
## 4. Check the meesage header if it's working or not
### 1. whtpqsuperuser@whtpq.com → leeyosebi@naver.com
1. MessageTrackingLog
![](https://velog.velcdn.com/images/leeyosebi/post/ac03d524-a74d-4453-964a-be825dfc60a0/image.png)
2. Queue
![](https://velog.velcdn.com/images/leeyosebi/post/26238cc5-8d71-4d44-87e6-11d5b5501291/image.png)
3. Message Header
![](https://velog.velcdn.com/images/leeyosebi/post/11d18e23-5250-44e3-bf92-55eaa306a562/image.png)

### 2. leeyosebi@naver.com → whtpqsuperuser@whtpq.com
1. 



# Reference
- https://learn.microsoft.com/en-us/exchange/architecture/edge-transport-servers/edge-transport-servers?view=exchserver-2019
- https://learn.microsoft.com/en-us/exchange/mail-flow/queues/relocate-queue-database?view=exchserver-2019
- https://learn.microsoft.com/en-us/exchange/antispam-and-antimalware/antispam-protection/antispam-on-mailbox-servers?view=exchserver-2019#step-3-specify-the-internal-smtp-servers-in-your-organization