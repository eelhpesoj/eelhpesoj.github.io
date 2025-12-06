---
---

### Summary
When you are planning to implementing a hybrid identity solution, remember that this following ports and protocols are required.
In this post, I will cover the prerequisite of the Microsoft Entra Connect(Formerly known as Azure ad connect) and On-premises AD.

---

### 1. Overview

![](https://velog.velcdn.com/images/leeyosebi/post/ba76ffdb-ee2f-4c73-abc3-5c2d7b97fa33/image.png)

This is the overal design but note that 'On-premises Active Directory and Azure AD Connect Server'
![](https://velog.velcdn.com/images/leeyosebi/post/70ee2913-a3e2-4e59-bd6b-890c2326bebf/image.png)

### 2. Microsoft Entra Connect and On-premises AD
This section describes the ports and protocols that are required for communication between the Microsoft Entra Connect server and on-premises AD.

![](https://velog.velcdn.com/images/leeyosebi/post/6c9afb07-3631-42c3-b471-f039e233c965/image.png)

### 3. If you don't allow those ports and protocols..
You will encounter following issues.
Example:
![](https://velog.velcdn.com/images/leeyosebi/post/c4dfeeaf-2314-4503-969f-fe521d3c1ae9/image.png)
389 Ports error.

Test with this powershell on the Microsoft Entra Connect server

```shell
Test-Netconnection 'Forest name' -Port 389
```
If the AD has not opened port 53, you need to use IP address.
```shell
Test-Netconnection 'IP address' -Port 389
```

### Reference
https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/reference-connect-ports