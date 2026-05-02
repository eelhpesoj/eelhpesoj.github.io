---
title: "Configuration Exchange Server DAG"
categories:
  - On-Premises
  - Exchange
---

# Summary
Configuration DAG(Database availability groups)

## Prerequisites
1. Two Exchange Machine(Domain Joined)
2. One Witness Server

---
# Design

<img width="1912" height="1396" alt="image" src="https://github.com/user-attachments/assets/3586d56a-e876-4112-bb76-f1663870fb83" />

The public IP address is not displayed in the document.



# Procedure
## 1. On the Witness Server side
1. On the Witness Server, create new folder in the "C:\"
<img width="842" height="674" alt="image" src="https://github.com/user-attachments/assets/14963e43-d01e-42b0-989c-32f32c9b0cc7" />

2. Share the Witness folder
<img width="728" height="966" alt="image" src="https://github.com/user-attachments/assets/931d468b-c98e-4974-aa05-f08e85123911" />

3. Click find people
<img width="1238" height="916" alt="image" src="https://github.com/user-attachments/assets/3b6ccbd8-69f6-400e-9c4a-3c552f7f2caf" />

4. Add 'Exchange Trusted Subsystem
<img width="1146" height="704" alt="image" src="https://github.com/user-attachments/assets/aef4f23b-0e9a-46ae-965a-b780fa405e4a" />

5. And assign the permission level as Read/Write
<img width="1146" height="704" alt="image" src="https://github.com/user-attachments/assets/0d943e8e-30fd-4be6-a378-6727349de1fb" />

6. Done
<img width="1230" height="910" alt="image" src="https://github.com/user-attachments/assets/b2b829c8-6224-44fc-9976-fb8ef4d87ed8" />

7. Add 'Exchange Trusted Subsystem' to the local administrator group.
Use 'compmgmt.msc' in the 'run'
<img width="1456" height="1230" alt="image" src="https://github.com/user-attachments/assets/26e316cd-5a52-4253-b2dc-482afb55e634" />


## 2. On the ECP side
### 1. Configure database availability groups
1. Create DAG
<img width="2206" height="1682" alt="image" src="https://github.com/user-attachments/assets/a848e4b6-b0e2-42fc-8c6b-b0a61bb595b4" />

2. Add membership
<img width="782" height="312" alt="image" src="https://github.com/user-attachments/assets/508b4ea6-8a46-4a7a-af9e-834b1dde2ede" />

3. Add the exchange servers
<img width="1244" height="1476" alt="image" src="https://github.com/user-attachments/assets/f8fcce5e-b878-41df-98a3-76431f30174c" />


4. Click save
<img width="1244" height="1476" alt="image" src="https://github.com/user-attachments/assets/b1c67458-8759-4d74-bba9-0e7ca7023040" />

5. All member servers are added to the DAG
<img width="1498" height="856" alt="image" src="https://github.com/user-attachments/assets/20a04561-abaa-410a-af9c-ca34e7dd5067" />

### 2. Configure databases servers with copies
1. Go databases
<img width="1416" height="476" alt="image" src="https://github.com/user-attachments/assets/7c4e9818-1284-4723-bac5-67f9b66fac43" />

2. Click 'more(three dots)' and 'Add database copy'
<img width="1416" height="476" alt="image" src="https://github.com/user-attachments/assets/366bfce4-7a27-4147-9975-90f719686522" />

3. Browse and select the second Exchange server and save
<img width="1704" height="1476" alt="image" src="https://github.com/user-attachments/assets/b695435f-8fa4-4037-9d84-4fcec6f94e45" />

4. After do the same work to the each of the Exchange server, the configuration of the DAG is done
<img width="1416" height="476" alt="image" src="https://github.com/user-attachments/assets/19dd91f4-635d-4f96-af17-3fd78efebe0d" />


# Reference
<https://learn.microsoft.com/en-us/exchange/high-availability/database-availability-groups/database-availability-groups?view=exchserver-2019>
