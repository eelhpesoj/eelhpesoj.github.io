---
---

Related post:
- https://velog.io/@leeyosebi/IIS-ARR-Configuration-with-ExSvr

Well, Since I set up the ARR on IIS and ExSvr, the VM has been shuting down almost every hours. So the mail service can't be last. and this is really annoying when I need to test. This post contains what I was trying to know what's going on this.

Mail service is unavailable:
![](https://velog.velcdn.com/images/leeyosebi/post/4eebb8ba-7e76-431d-813b-221b74d6b77b/image.png)

From the hyper-v host's "Event Viewer → Applications and Services Logs → Microsoft → Windows → Hyper-V-Worker → Admin", the server has been terminated. But no reason can be found.
![](https://velog.velcdn.com/images/leeyosebi/post/0024dbf7-86b5-4bfa-8ade-20b9c9464a00/image.png)




Let's moving forward to the VM's event logs. I check the event viewer of the VM's "Windows Logs > System" and filter the events 1074 which can shows me the shuting down logs.
![](https://velog.velcdn.com/images/leeyosebi/post/1e961fda-aa50-4ff3-bd6b-d75985d91335/image.png)

Error message:
```
The process C:\Windows\system32\wlms\wlms.exe (ALLDC01) has initiated the shutdown of computer ALLDC01 on behalf of user NT AUTHORITY\SYSTEM for the following reason: Other (Planned)
 Reason Code: 0x80000000
 Shutdown Type: shutdown
 Comment: The license period for this installation of Windows has expired. The operating system is shutting down.

```

Obviously, the message says the system has been shutdown this computer in the system context(NT AUTHORITY\SYSTEM) because of its OS license.
I've never seen this before..

Well, I have set this up with this ISO. It's Standard Evaluation.
![](https://velog.velcdn.com/images/leeyosebi/post/12d53e18-a129-40fe-8737-f25986bb765a/image.png)

In result, I found this is the originally architecture of the OS.
Referrence:
- https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2022
- https://woshub.com/stop-windows-auto-shutdown-every-hour/
![](https://velog.velcdn.com/images/leeyosebi/post/c69da4d5-bd93-49ab-adcf-a9f956d27762/image.png)