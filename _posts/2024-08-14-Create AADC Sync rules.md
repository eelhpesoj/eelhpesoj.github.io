---
---


# Summary
In the case of integration for global branches, preferred data location and usage location should be configured to optimise their services.

However, regarding the functional level of the DC, there is no value in the user properites.
To go through this, we can use msCloudExtensionAttribue.

# 1. Ref
https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-feature-preferreddatalocation

# 2. Preparation
- Enroll DC to the AADC application and Add Directory extensions
![](https://velog.velcdn.com/images/leeyosebi/post/d01df777-444d-4705-b502-573b23198cf5/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/351fc936-90c4-4028-a1bb-7b009cfcb5b2/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/4824bd6f-1bcd-42c1-acd4-00ba14cda76a/image.png)

# 3. Create Rule
**You should stop the sync cyle before proceed the task below**
```shell
Set-ADSyncScheduler -SyncCycleEnabled $false
```
## Inbound
1. Run Synchronisation Rules Editor
![](https://velog.velcdn.com/images/leeyosebi/post/c31d2d58-03a0-4d23-9034-84e5fad4a95b/image.png)
2. Add New rule
![](https://velog.velcdn.com/images/leeyosebi/post/9079dada-1b92-4719-a29b-e38bbd8845bd/image.png)
3. Set value
![](https://velog.velcdn.com/images/leeyosebi/post/2449ac7c-423e-4b8a-a9d5-95ccd11ab55f/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/e5be9fec-a6f6-4685-9381-278daa7b42df/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/29ac7d97-c552-4787-8e6a-37369071be78/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/9a6e040f-a07d-481c-b087-4e055d138389/image.png)

So you just do the same job on the usage location.

## Outbound
**[Note]**
You don't need to create out bound rule for each Domain. But you have to create it as many as the attribues.
1. Change direction to Outbound
![](https://velog.velcdn.com/images/leeyosebi/post/89827e91-5e34-4977-bd74-9a331ff1afb6/image.png)
2. Set value as:
![](https://velog.velcdn.com/images/leeyosebi/post/d5da3f54-227f-4fcb-887c-fbba1ddb6d90/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/d29186d6-bd89-4abb-96fc-35698e8b3ed8/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/787dc90f-de24-496c-8b1c-29b2affc8d82/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/58f74e4e-31ec-4555-a396-33be47cf4651/image.png)

# 4. Sync Enabled
```shell
Set-ADSyncScheduler -SyncCycleEnabled $True
Start-ADSyncCyle -PolicyType Initial
```