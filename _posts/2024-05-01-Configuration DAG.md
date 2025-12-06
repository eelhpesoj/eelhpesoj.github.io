---
---

# Summary
Configuration DAG(Database availability groups)

## Prerequisites
1. Two Exchange Machine(Domain Joined)
2. One Witness Server

---
# Design

![](https://velog.velcdn.com/images/leeyosebi/post/a5cc11ab-9a47-4365-ac1e-601de9313dab/image.png)
The public IP address is not displayed in the document.



# Procedure
## 1. On the Witness Server side
1. On the Witness Server, create new folder in the "C:\"
![](https://velog.velcdn.com/images/leeyosebi/post/a1998ec0-d23f-4d3b-a111-0e9edd226743/image.png)
2. Share the Witness folder
![](https://velog.velcdn.com/images/leeyosebi/post/ecd2f3d2-904a-485d-b126-fb7219573777/image.png)
3. Click find people
![](https://velog.velcdn.com/images/leeyosebi/post/eafac075-a31d-4d85-b87f-f397f8560c51/image.png)
4. Add 'Exchange Trusted Subsystem
![](https://velog.velcdn.com/images/leeyosebi/post/345079af-6a68-4ae4-a9b6-70e933c193a6/image.png)
5. And assign the permission level as Read/Write
![](https://velog.velcdn.com/images/leeyosebi/post/38bc2bd8-c6ba-4f52-bf8b-1b41bee84710/image.png)
6. Done
![](https://velog.velcdn.com/images/leeyosebi/post/bacd256b-7c0d-4760-aff6-a6c64256ad36/image.png)
7. Add 'Exchange Trusted Subsystem' to the local administrator group.
Use 'compmgmt.msc' in the 'run'
![](https://velog.velcdn.com/images/leeyosebi/post/2ff50ef6-b8d8-4742-8b07-7622dd56a30a/image.png)

## 2. On the ECP side
### 1. Configure database availability groups
1. Create DAG
![](https://velog.velcdn.com/images/leeyosebi/post/b2f82ed3-ae1b-486d-8cea-4f83f7e7e415/image.png)
2. Add membership
![](https://velog.velcdn.com/images/leeyosebi/post/c42db78a-bd18-4c4a-8172-40f9c7aaf4ea/image.png)
3. Add the exchange servers
![](https://velog.velcdn.com/images/leeyosebi/post/8a4e4456-5243-47ca-acb0-e19459eaf724/image.png)

4. Click save
![](https://velog.velcdn.com/images/leeyosebi/post/110fba97-2353-4f9c-81b0-2a47e8524178/image.png)
5. All member servers are added to the DAG
![](https://velog.velcdn.com/images/leeyosebi/post/e975ee4a-1744-4fce-83f8-29b4d32b6a91/image.png)
### 2. Configure databases servers with copies
1. Go databases
![](https://velog.velcdn.com/images/leeyosebi/post/1a1540a9-8fee-4caa-bd26-273fe3bca294/image.png)
2. Click 'more(three dots)' and 'Add database copy'
![](https://velog.velcdn.com/images/leeyosebi/post/37838178-e53c-4cc2-a10b-b9602cf4e566/image.png)
3. Browse and select the second Exchange server and save
![](https://velog.velcdn.com/images/leeyosebi/post/5decf41c-edb6-42ed-8d93-bcdc12139788/image.png)
4. After do the same work to the each of the Exchange server, the configuration of the DAG is done
![](https://velog.velcdn.com/images/leeyosebi/post/fc102df0-2ba6-4b66-91ae-7514fb230a73/image.png)

# Reference
https://learn.microsoft.com/en-us/exchange/high-availability/database-availability-groups/database-availability-groups?view=exchserver-2019