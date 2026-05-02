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
<img width="1920" height="904" alt="image" src="https://github.com/user-attachments/assets/1e25a35e-1280-40cf-ad30-739c6c0ff79b" />

## 2.Configure the On-premises name server
### 1. Change your hostname
Run(Windows key + R) → type sysdm.cpl
Check your Full computer name and click the Change button in the middle.
<img width="408" height="470" alt="image" src="https://github.com/user-attachments/assets/036c120c-b641-4626-b41b-db7c9cde81d2" />

Click more
<img width="324" height="393" alt="image" src="https://github.com/user-attachments/assets/cf7bf116-f78d-4d1c-b185-81e87ecc5c61" />

You don't need to join to the any DC(AD). Just change Primary DNS suffix of your computer.
<img width="394" height="237" alt="image" src="https://github.com/user-attachments/assets/d280f15d-779b-4357-8902-b34bdc6b4878" />


### 2. Make your IP as a static IP address
<img width="402" height="454" alt="image" src="https://github.com/user-attachments/assets/4b49c14e-db68-49b2-a721-0a8607bca5a5" />


### 3. Install DNS server role
<img width="589" height="560" alt="image" src="https://github.com/user-attachments/assets/5fbb1cae-ec11-425d-9f48-4c2abcf93f8f" />


### 4. Once the server role installed, create a new zone. and add IP address.
<img width="755" height="530" alt="image" src="https://github.com/user-attachments/assets/7e38f533-ada9-416d-8800-149eb86a17fa" />


## 3. Configure the network device
You should open the port 53.
And also set NAT configuration public and private IP address so that any client can find through the internet.
<img width="797" height="429" alt="image" src="https://github.com/user-attachments/assets/809ef5cc-4865-42b1-991a-c170e397c5d6" />

## 4. Result
<img width="753" height="816" alt="image" src="https://github.com/user-attachments/assets/9b43b390-7f82-4506-b7e6-88a1ebcd8a3c" />

