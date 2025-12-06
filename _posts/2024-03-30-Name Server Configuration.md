---
---

# Summary
This is an article about configuration of the name server who wants to set up not using the external domain name service.

---
# Process
1. ClientRequest domain query
2. InternetDomain query
3. Domain hosting providerQuery to domain name server(preferred name server) with port 53
4. On-premise DNS serverRespond properly

# Preparation
- On-premise name serverThis server should be connected to the internet.
- DomainYou have to purchase your specific domain from the DNS hosting provider.
- Administrative credential on network device (gateway)You have to prepare administrative credential on network device which also connecting to the On-premise name server.

# Procedure
## 1.Configure on the DNS hosting provider
Enroll your on-prem name server's name on the domain hosting service.
Most of the case, your name server would be like this:
ns1.your domain, ns2.your domain
![](https://velog.velcdn.com/images/leeyosebi/post/6bdc1913-e86e-44dc-8355-10559d8b55a3/image.png)
## 2.Configure the On-premises name server
### 1. Change your hostname
Run(Windows key + R) → type sysdm.cpl
Check your Full computer name and click the Change button in the middle.
![](https://velog.velcdn.com/images/leeyosebi/post/801a72c1-2958-412e-9224-595356b96eae/image.png)
Click more
![](https://velog.velcdn.com/images/leeyosebi/post/68df1b9d-5aeb-4eac-90b9-951d18ce412b/image.png)
You don't need to join to the any DC(AD). Just change Primary DNS suffix of your computer.
![](https://velog.velcdn.com/images/leeyosebi/post/7f8fd085-b470-4a02-a453-816712404e13/image.png)

### 2. Make your IP as a static IP address
![](https://velog.velcdn.com/images/leeyosebi/post/75e4a997-c866-43e1-a98b-4743f2400037/image.png)

### 3. Install DNS server role
![](https://velog.velcdn.com/images/leeyosebi/post/61b8d6a7-6172-446a-b486-304a300eb3b7/image.png)

### 4. Once the server role installed, create a new zone. and add IP address.
![](https://velog.velcdn.com/images/leeyosebi/post/21f4bd38-3126-4d2b-84c2-40ec9c04ebb2/image.png)

## 3. Configure the network device
You should open the port 53.
And also set NAT configuration public and private IP address so that any client can find through the internet.
![](https://velog.velcdn.com/images/leeyosebi/post/5a03d1ad-a251-42c5-9ab2-8790a9862f71/image.png)
## 4. Result
![](https://velog.velcdn.com/images/leeyosebi/post/42ddef4b-e3bb-4cd1-b1e4-40fb5da00109/image.png)
