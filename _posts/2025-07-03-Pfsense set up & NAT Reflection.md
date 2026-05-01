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


<img width="1744" height="743" alt="image" src="https://github.com/user-attachments/assets/e93cec40-de41-4419-a592-5eb779c61d68" />




# 1. On-premises Pfsense and switches

## 1. Prerequsites
Based on the Pfsense article, we are getting started.
Ref) <https://docs.netgate.com/pfsense/en/latest/recipes/virtualize-hyper-v.html>

Ensure that the virtual machine for the Pfsense have to unchecked the Secure Boot.
<img width="1240" height="448" alt="image" src="https://github.com/user-attachments/assets/7c6ccbba-a6b7-42a2-9e0f-1ef3d62f46f0" />


## 2. Installation Pfsense
Ref)<https://www.youtube.com/watch?v=wUD1ZjPb4kw>

Select 1 to proceed the installation
<img width="2096" height="1568" alt="image" src="https://github.com/user-attachments/assets/3b682a15-08e8-4d64-86d8-f6761570ff17" />

Loading..
<img width="2096" height="1568" alt="image" src="https://github.com/user-attachments/assets/2596f7bb-9197-4cce-bf88-35ad0ea50908" />


Hit Enter to Accept
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/8aea93f5-ff3f-46ac-8b60-0213cbde223f" />


Select Install pfSense
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/08bddc97-5527-48ad-a6b4-dedfedfd1934" />


Select Auto(ZFS) Guided Root-on-ZFS
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/c0463024-6931-426f-8b7c-9ff1639bbde3" />


Select Install Proceed with Installation
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/e556c41c-7778-42e2-bf81-30045ab78422" />


Select Stripe
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/25071ff9-b934-46c5-91da-1490c71e2632" />


Hit 'Space' key to select the disk
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/18f16478-4e46-41f9-94c2-7a65c2f0bc97" />


In this step, it says it's the last chance. After this step, all of the content in the disk will be destroyed.
We will proceed to 'YES'
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/7d9701a5-70be-4b21-ad7c-929ad1b4c6a2" />


The installation is in progress
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/0f8c0043-d8e6-463e-84c4-6713ee1ea86c" />


<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/5e1d5638-2a81-4d40-8233-4bc8659616d5" />


Hit enter to reboot
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/41151cbc-2b1f-46a4-9c51-d2ec47c4fcd6" />

<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/7d9eb6ad-4acf-409a-a583-2c32bf8417b3" />


Enter VLANs 'N'
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/985d0a75-0a6a-4a4d-8df7-3dc2f424277d" />


Enter WAN interface name for 'hn0'
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/cb0f0de3-4633-43a0-9121-c1038e2079d3" />

Enter LAN interface name for 'hn1'
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/61f97ef7-5f7b-458b-a13d-e76db35afa25" />

Enter 'y'
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/3b340e13-1837-4bae-b98d-facbed44a0be" />

Wait for a moment
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/bb61dcbc-918c-4f4f-b108-258fd109289a" />


So, here we are, the basic setup has done
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/cf9503be-d70b-4237-9b49-e3ad2ff05162" />


## 3. Configure WAN/LAN IP address
At this phase, I will skip the configuration of the set each interfaces(WAN/LAN) IP address.
It's not hard to configure at all.
You can process enter an option with '2) Set interface(s) IP address'
<img width="1712" height="782" alt="image" src="https://github.com/user-attachments/assets/1ba426b5-869a-4f5f-88ba-3fefd8f64be0" />

Anyway,this pfsense ip address is as following
**WAN(hn0): 192.168.75.1**
**LAN(hn1): 10.1.1.1**
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/77d427ac-866d-475e-8966-6e22b5ee84b9" />





## 4. WebConfigurator access
If you try to access 10.1.1.1 from other computer which has the same network interface(hn1 from the pfsense), you might encounter this web page hosting by pfsense server.
This is the web GUI control panel of pfsense.

The default account is:
**ID: admin**
**PW: pfsense**
Please change the password..
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/5b523a17-c034-43a5-9d1a-af9b16adaa6b" />

I loged in from 10.1.1.2
<img width="2036" height="1532" alt="image" src="https://github.com/user-attachments/assets/165cf97d-179a-4760-b3fc-14ee83d96cff" />


From pfsense console, you can check the login log.
<img width="2042" height="220" alt="image" src="https://github.com/user-attachments/assets/14294ca0-13c2-4bc4-8d0c-3b97d6793c14" />


## 5. NAT Reflection to publish WebConfigurator to the internet(Not recommanded)
You can publish this web configurator to the internet whenever modify your private network. To do this, we have to enable NAT reflection(or NAT LOOP).


### From up stream pfsense:
Obviously, you have to make the internet trafic from up stream pfsense to down stream pfsense.
<img width="1444" height="53" alt="image" src="https://github.com/user-attachments/assets/2fe8a3bd-8b75-4941-8356-411003acab99" />


### From down stream pfsense:
So at this moment, it's quite tricky when you are first.
The NAT reflection needed.

You might need to disable HTTP_REFERER enforcement check first.
<img width="1420" height="129" alt="image" src="https://github.com/user-attachments/assets/d0097628-0f5c-4995-ad74-ce0cba77a09a" />



- Change webConfigurator TCP Port(System / Advanced / Admin Access)
<img width="1243" height="814" alt="image" src="https://github.com/user-attachments/assets/9777dd6a-cc80-42b0-8aab-21aeee12ec87" />


- Port Forwarding
Both of Dest and NAT should be WAN address(192.168.75.1/24).
<img width="2304" height="342" alt="image" src="https://github.com/user-attachments/assets/6ae02edc-1915-4964-92ac-c87bb5bd49f3" />


- NAT Reflection (System / Advanced / Firewall & NAT)
<img width="1446" height="310" alt="image" src="https://github.com/user-attachments/assets/cf5ea680-d6bc-4002-895d-904a1491cfd8" />



So, let's try to connect from internet.
We got the down stream pfsense web configurator.
<img width="420" height="206" alt="image" src="https://github.com/user-attachments/assets/5d63ac88-c8d6-4acd-a981-9212789af7f8" />




