---
---

# 0. Summary
I'm currently planning to test Azure VPN configuration.
To do so, I'm setting up my own pfSense environment.
In this post, I’ll walk you through the pfSense installation process and briefly share my on-premises network setup.
In the next post, I’ll go over the Azure VPN configuration I applied.


## Architecture
For now, I've set up the environment as shown in the architecture below.
The configuration might change as I proceed with the Azure VPN setup, but this is the initial setup for now.


![](https://velog.velcdn.com/images/leeyosebi/post/157ce5fc-03ea-4f8a-bb15-b7735939203e/image.png)



# 1. On-premises Pfsense and switches

## 1. Prerequsites
Based on the Pfsense article, we are getting started.
Ref) https://docs.netgate.com/pfsense/en/latest/recipes/virtualize-hyper-v.html

Ensure that the virtual machine for the Pfsense have to unchecked the Secure Boot.
![](https://velog.velcdn.com/images/leeyosebi/post/f281864e-caec-4188-b3c0-b2f4b49f0c4a/image.png)

## 2. Installation Pfsense
Ref)https://www.youtube.com/watch?v=wUD1ZjPb4kw

Select 1 to proceed the installation
![](https://velog.velcdn.com/images/leeyosebi/post/47b67a42-f16c-4cf7-8f94-ca564356263e/image.png)
Loading..
![](https://velog.velcdn.com/images/leeyosebi/post/84b3e675-16fc-474e-81bd-b4f30fcf7b47/image.png)

Hit Enter to Accept
![](https://velog.velcdn.com/images/leeyosebi/post/00fb5c75-4445-46cb-8d0f-1fd1f2477c10/image.png)

Select Install pfSense
![](https://velog.velcdn.com/images/leeyosebi/post/5142a57f-ace2-4b43-af82-a3ef41262d01/image.png)

Select Auto(ZFS) Guided Root-on-ZFS
![](https://velog.velcdn.com/images/leeyosebi/post/90280244-1754-4f55-8317-90bdb9943a6d/image.png)

Select Install Proceed with Installation
![](https://velog.velcdn.com/images/leeyosebi/post/46907c57-48ed-40d9-9d35-4df1c28e4204/image.png)

Select Stripe
![](https://velog.velcdn.com/images/leeyosebi/post/e55bc8df-2736-428d-b4f7-f783bcf1093f/image.png)

Hit 'Space' key to select the disk
![](https://velog.velcdn.com/images/leeyosebi/post/00b5f60a-7f39-4d69-ae40-dda3a258c01d/image.png)

In this step, it says it's the last chance. After this step, all of the content in the disk will be destroyed.
We will proceed to 'YES'
![](https://velog.velcdn.com/images/leeyosebi/post/a9e631f7-027e-49ff-9790-d1f4b2a70bfe/image.png)

The installation is in progress
![](https://velog.velcdn.com/images/leeyosebi/post/1624775a-8de4-4360-8c5d-f4fc3fea10db/image.png)

![](https://velog.velcdn.com/images/leeyosebi/post/955d167a-1e12-4def-ba53-660198138338/image.png)

Hit enter to reboot
![](https://velog.velcdn.com/images/leeyosebi/post/8c2c4010-5e75-4554-8cbb-f8ff25724086/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/29f0b0b8-6878-47ae-b4db-b2076c4bf7b6/image.png)
Enter VLANs 'N'
![](https://velog.velcdn.com/images/leeyosebi/post/6a095255-5915-473b-bca5-9c2df9012f10/image.png)

Enter WAN interface name for 'hn0'
![](https://velog.velcdn.com/images/leeyosebi/post/e9aeae92-463f-4ccb-836e-6e620aa6eb2d/image.png)
Enter LAN interface name for 'hn1'
![](https://velog.velcdn.com/images/leeyosebi/post/079fe828-94d6-4b43-862a-f0fef6face6f/image.png)
Enter 'y'
![](https://velog.velcdn.com/images/leeyosebi/post/62543719-5bb1-43af-a699-007a65dafab6/image.png)
Wait for a moment
![](https://velog.velcdn.com/images/leeyosebi/post/85bb7a45-9994-41c3-915b-aa48195f3950/image.png)

So, here we are, the basic setup has done
![](https://velog.velcdn.com/images/leeyosebi/post/f7e6e1ee-f8a5-4d55-9c7e-e74d96c447bc/image.png)

## 3. Configure WAN/LAN IP address
At this phase, I will skip the configuration of the set each interfaces(WAN/LAN) IP address.
It's not hard to configure at all.
You can process enter an option with '2) Set interface(s) IP address'
![](https://velog.velcdn.com/images/leeyosebi/post/5b8f31f2-1812-4b1c-b30b-c1df868b6287/image.png)
Anyway,this pfsense ip address is as following
**WAN(hn0): 192.168.75.1**
**LAN(hn1): 10.1.1.1**
![](https://velog.velcdn.com/images/leeyosebi/post/e53e0340-78d0-4876-8506-fb07d8e095da/image.png)



## 4. WebConfigurator access
If you try to access 10.1.1.1 from other computer which has the same network interface(hn1 from the pfsense), you might encounter this web page hosting by pfsense server.
This is the web GUI control panel of pfsense.

The default account is:
**ID: admin**
**PW: pfsense**
Please change the password..
![](https://velog.velcdn.com/images/leeyosebi/post/426b3251-a19c-47d6-90cc-090324ef18eb/image.png)
I loged in from 10.1.1.2
![](https://velog.velcdn.com/images/leeyosebi/post/d2f87f45-0fdc-4dcf-b121-2919e068537a/image.png)

From pfsense console, you can check the login log.
![](https://velog.velcdn.com/images/leeyosebi/post/69206248-4baf-4832-9b51-2fe31d735ce3/image.png)

## 5. NAT Reflection to publish WebConfigurator to the internet(Not recommanded)
You can publish this web configurator to the internet whenever modify your private network. To do this, we have to enable NAT reflection(or NAT LOOP).


### From up stream pfsense:
Obviously, you have to make the internet trafic from up stream pfsense to down stream pfsense.
![](https://velog.velcdn.com/images/leeyosebi/post/3e24882c-bb99-4875-9f21-e3b10d16e009/image.png)

### From down stream pfsense:
So at this moment, it's quite tricky when you are first.
The NAT reflection needed.

You might need to disable HTTP_REFERER enforcement check first.
![](https://velog.velcdn.com/images/leeyosebi/post/398aff96-c9e9-4785-9cfe-0de3c929ccb6/image.png)


- Change webConfigurator TCP Port(System / Advanced / Admin Access)
![](https://velog.velcdn.com/images/leeyosebi/post/73583eb1-ace1-4085-bdc6-41cb9fe1840f/image.png)

- Port Forwarding
Both of Dest and NAT should be WAN address(192.168.75.1/24).
![](https://velog.velcdn.com/images/leeyosebi/post/2ea3bba8-25c4-4412-8cc1-4fdc2baa58bd/image.png)

- NAT Reflection (System / Advanced / Firewall & NAT)
![](https://velog.velcdn.com/images/leeyosebi/post/68148184-daae-4c4f-b576-c8e7af88bfaa/image.png)


So, let's try to connect from internet.
We got the down stream pfsense web configurator.
![](https://velog.velcdn.com/images/leeyosebi/post/dae3b84f-1486-4d25-8a34-d666e9d4d9cb/image.png)



