---
---

# Overview
For the exchange server, almote every clients will need to seperate the network traffic with 443 and 25.
In this case, they need reverse proxy. I will use IIS ARR(Application request routing) service as an proxy server.
So, here is the a diagram which shows you the architecture of the LAB for this post.

![](https://velog.velcdn.com/images/leeyosebi/post/d5574dd0-1f1c-4a79-b3e2-99de7a7f8930/image.png)
Make sure those server located in DMZ have to use two NIC obviously for the internet and private.

ref) 
Configuration IIS ARR for exchange server:
- https://techcommunity.microsoft.com/blog/exchange/part-1-reverse-proxy-for-exchange-server-2013-using-iis-arr/592526
- https://www.youtube.com/watch?v=d6mqaHkGb-E


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
![](https://velog.velcdn.com/images/leeyosebi/post/022605a2-dbb7-43e4-bc4e-1f0115e69542/image.png)

Second, Go to the Home > Application Request Routing Cache.
![](https://velog.velcdn.com/images/leeyosebi/post/3fadf0f4-8371-4f52-afde-73a62a01f900/image.png)
go to server proxy settings.
![](https://velog.velcdn.com/images/leeyosebi/post/af6b625b-cfc0-4913-adc9-b72cbf3f225c/image.png)
Check "Enable proxy".
![](https://velog.velcdn.com/images/leeyosebi/post/c950b2c9-487d-4ec8-9349-53574ee0e012/image.png)

and lastly, create new server farms.

## 1.2 Server Farms
Once you created the server farms, you have few options there.
![](https://velog.velcdn.com/images/leeyosebi/post/e07244f1-e34d-4290-8f7c-e2ff7a256303/image.png)

- Caching, uncheck "Enable disk cache" and apply.
![](https://velog.velcdn.com/images/leeyosebi/post/590289e9-0f64-4dba-9092-428986797109/image.png)

- Health Test, enter your external exchange server https://FQDN/owa/healthcheck.htm
![](https://velog.velcdn.com/images/leeyosebi/post/a1a1e079-184b-4f6b-8dbb-bca632bcc861/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/18dd9014-7682-4516-92c9-f3aa516e2451/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/ba37bb41-369a-4dc0-b46e-65145223efb2/image.png)

- Monitoring and Management, once your health test have passed, your server will be available and Healthy.
![](https://velog.velcdn.com/images/leeyosebi/post/081cb61f-2423-48f6-8d53-8e89f1f6c910/image.png)

- Proxy, Set as following image.
![](https://velog.velcdn.com/images/leeyosebi/post/fce50836-6914-43b6-bc75-f8dbad8ede8f/image.png)

- Routing Rules, uncheck both options.
![](https://velog.velcdn.com/images/leeyosebi/post/0d05596d-22ec-4889-a743-f2b35258f155/image.png)



## 1.3 URL Rewrite rules
Now, this is the important part in the whole configuration.

From the Routing rules in the server farms, go to URL Rewrite.
![](https://velog.velcdn.com/images/leeyosebi/post/2bc0d813-fa66-4c5b-bc76-aa389a65b713/image.png)

I already add the URL Rewrite rule here. Let's take a look for the details.
![](https://velog.velcdn.com/images/leeyosebi/post/ccbef07d-1448-4408-b1bc-f5d74c0eb716/image.png)

If the request URL matches *(all urls), check the two conditions: is it https? and is the host matches with the pattern(*.all.run.place)?
![](https://velog.velcdn.com/images/leeyosebi/post/21a64581-95d2-43ad-a0b8-628a14e41408/image.png)

If the prerequisites meets, the requests are redirected to the server farm with the https.
![](https://velog.velcdn.com/images/leeyosebi/post/6a45ca6b-37c1-41fa-b7ce-8b6418274c09/image.png)


# 2. Logs
All the logs are in this path:
- C:\inethub\logs\LogFiles\W3SVC1

e.g.
![](https://velog.velcdn.com/images/leeyosebi/post/ddf1fb97-4ed3-4993-8bdf-62d5be0831a7/image.png)


# 3. Warning
If the inbound rule is not match exactly with the requested URL, you will encounter 500 error like below.
This is quite tricky if you address this kind of LB.

![](https://velog.velcdn.com/images/leeyosebi/post/bd29df82-0c2f-4516-81af-b3f61ca98e77/image.png)

# 4. Test

Do the test for the exchange server services.

https://testconnectivity.microsoft.com/tests/exchange

![](https://velog.velcdn.com/images/leeyosebi/post/9d8f849a-66dd-4043-99f6-7a5d99e893a5/image.png)


# Result
This is so customisable so it's too difficult to handle...
Good luck.