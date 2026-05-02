---
title: "Hybrid Identity Required Ports and Protocols"
categories:
  - On-Premises
  - Entra ID Connect
---

### Summary
When you are planning to implementing a hybrid identity solution, remember that this following ports and protocols are required.
In this post, I will cover the prerequisite of the Microsoft Entra Connect(Formerly known as Azure ad connect) and On-premises AD.

---

### 1. Overview

<img width="1858" height="1034" alt="image" src="https://github.com/user-attachments/assets/ffc95f64-6ec4-4949-afb9-2cff7d5705be" />


This is the overal design but note that 'On-premises Active Directory and Azure AD Connect Server'
<img width="576" height="238" alt="image" src="https://github.com/user-attachments/assets/9df6aafc-9b88-40f3-886a-66665b4eebc5" />


### 2. Microsoft Entra Connect and On-premises AD
This section describes the ports and protocols that are required for communication between the Microsoft Entra Connect server and on-premises AD.

<img width="859" height="573" alt="image" src="https://github.com/user-attachments/assets/46c633bd-0ad3-4eaf-8f15-11662b02ba17" />


### 3. If you don't allow those ports and protocols..
You will encounter following issues.
Example:
<img width="970" height="690" alt="image" src="https://github.com/user-attachments/assets/db300c3f-6564-4a13-9220-58ffe6e1c9db" />

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
<https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/reference-connect-ports>
