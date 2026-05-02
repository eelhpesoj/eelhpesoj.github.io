---
title: "IIS ARR Configuration with ExSvr"
---


# Overview
For the exchange server, almote every clients will need to seperate the network traffic with 443 and 25.
In this case, they need reverse proxy. I will use IIS ARR(Application request routing) service as an proxy server.
So, here is the a diagram which shows you the architecture of the LAB for this post.

<img width="975" height="498" alt="image" src="https://github.com/user-attachments/assets/a2d3050c-0e98-4752-8b43-245754a0b0e9" />

Make sure those server located in DMZ have to use two NIC obviously for the internet and private.

ref) 
Configuration IIS ARR for exchange server:
- <https://techcommunity.microsoft.com/blog/exchange/part-1-reverse-proxy-for-exchange-server-2013-using-iis-arr/592526>
- <https://www.youtube.com/watch?v=d6mqaHkGb-E>


# 0. Index
1. IIS Proxy ARR
1.1 Basic settings
1.2 Server Farms
1.3 URL Rewrite rules

2. Logs

3. Warning

4. Test

# 1. IIS Proxy ARR
I will skip the install steps..
## 1.1 Basic settings

First of all, we need to install the exchange server's public ssl certificate on the ARR server.
And go to "IIS manager > Sites > Default Web Site > Bindings > https > Edit".
From here, you should assign the public ssl certificate with https.
<img width="1024" height="728" alt="image" src="https://github.com/user-attachments/assets/8cca1b5b-8a0a-4f8c-92f1-201cab6a2696" />


Second, Go to the Home > Application Request Routing Cache.
<img width="1024" height="728" alt="image" src="https://github.com/user-attachments/assets/ec7de20f-f32a-4997-bcd4-39df3a600992" />

go to server proxy settings.
<img width="1024" height="728" alt="image" src="https://github.com/user-attachments/assets/29cf8bc2-4615-4a7a-9805-976e975c92c2" />

Check "Enable proxy".
<img width="1024" height="728" alt="image" src="https://github.com/user-attachments/assets/5aaa156c-4621-4551-992c-58729bcc6eea" />


and lastly, create new server farms.

## 1.2 Server Farms
Once you created the server farms, you have few options there.
<img width="1024" height="728" alt="image" src="https://github.com/user-attachments/assets/b5b63a82-989f-4689-bcd5-f790754a64d1" />


Caching, uncheck "Enable disk cache" and apply.
<img width="1024" height="728" alt="image" src="https://github.com/user-attachments/assets/986bf253-4093-40dc-9d29-79a7c0be0de5" />

Health Test, enter your external exchange server "https://FQDN/owa/healthcheck.htm"
<img width="620" height="146" alt="image" src="https://github.com/user-attachments/assets/73ff7131-dc33-4588-8eab-dd6e53b7cfd8" />

<img width="1024" height="728" alt="image" src="https://github.com/user-attachments/assets/3019fc66-4e91-470a-abda-d6b542170859" />

<img width="1024" height="728" alt="image" src="https://github.com/user-attachments/assets/43178f74-b016-4554-8d74-e3ef2c195141" />

Monitoring and Management, once your health test have passed, your server will be available and Healthy.
<img width="1024" height="728" alt="image" src="https://github.com/user-attachments/assets/9abad8b0-ddd7-4171-8d29-f2384a825433" />

Proxy, Set as following image.
<img width="1024" height="728" alt="image" src="https://github.com/user-attachments/assets/f8738b49-ca79-4459-a49e-a0a9652461ea" />

Routing Rules, uncheck both options.
<img width="1024" height="728" alt="image" src="https://github.com/user-attachments/assets/fcb434db-8c79-4411-8fc7-f5a127d8bb82" />


## 1.3 URL Rewrite rules
Now, this is the important part in the whole configuration.

From the Routing rules in the server farms, go to URL Rewrite.
<img width="1024" height="728" alt="image" src="https://github.com/user-attachments/assets/aca14268-e232-4398-8bda-c465b111bfe3" />

I already add the URL Rewrite rule here. Let's take a look for the details.
<img width="1024" height="728" alt="image" src="https://github.com/user-attachments/assets/f1ac30c8-6ed5-4ae3-ab1f-aa088dbd07cb" />


If the request URL matches *(all urls), check the two conditions: is it https? and is the host matches with the pattern(*.all.run.place)?
<img width="1024" height="728" alt="image" src="https://github.com/user-attachments/assets/290221be-d5df-45a0-b1c4-cc77b5788707" />

If the prerequisites meets, the requests are redirected to the server farm with the https.
<img width="1024" height="728" alt="image" src="https://github.com/user-attachments/assets/bfeac054-833a-4f52-af6e-317bd867b583" />


# 2. Logs
All the logs are in this path:
- C:\inethub\logs\LogFiles\W3SVC1

e.g.
<img width="1024" height="728" alt="image" src="https://github.com/user-attachments/assets/cfc8ef8c-4431-459f-a4db-53610d06c14d" />



# 3. Warning
If the inbound rule is not match exactly with the requested URL, you will encounter 500 error like below.
This is quite tricky if you address this kind of LB.

<img width="897" height="278" alt="image" src="https://github.com/user-attachments/assets/11e6d038-0860-4bb1-b4d7-7ff7c27504db" />


# 4. Test

Do the test for the exchange server services.

- <https://testconnectivity.microsoft.com/tests/exchange>

<img width="1920" height="911" alt="image" src="https://github.com/user-attachments/assets/cec43cf1-2d7a-4346-b214-d2740cbc816f" />


# Result
This is so customisable so it's too difficult to handle...
Good luck.
