Related post:
- https://velog.io/@leeyosebi/IIS-ARR-Configuration-with-ExSvr

# 0. Overview

Well, Since I set up the ARR on IIS and ExSvr, the VM has been shuting down almost every hours. So the mail service can't be last. and this is really annoying when I need to test. This post contains what I was trying to know what's going on this.

[Index]
1. What I encounter
2. Event logs from Hyper-V host
3. Event logs from Service host
4. OS Design
5. Workaround



# 1. What I encounter
Mail service is unavailable:
![](https://velog.velcdn.com/images/leeyosebi/post/4eebb8ba-7e76-431d-813b-221b74d6b77b/image.png)

# 2. Event logs from Hyper-V host

From the hyper-v host's "Event Viewer → Applications and Services Logs → Microsoft → Windows → Hyper-V-Worker → Admin", the server has been terminated. But no reason can be found.
![](https://velog.velcdn.com/images/leeyosebi/post/0024dbf7-86b5-4bfa-8ade-20b9c9464a00/image.png)

# 3. Event logs from Service host

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

# 4. OS Design

In result, I found this is the originally architecture of the OS.
Referrence:
- https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2022
- https://woshub.com/stop-windows-auto-shutdown-every-hour/
![](https://velog.velcdn.com/images/leeyosebi/post/c69da4d5-bd93-49ab-adcf-a9f956d27762/image.png)

# 5. Workaround
Here is the command that you can use for the Lab environment.

Step 1:
Execute this command from the administrative cmd
```
slmgr.vbs /dli
```
You can specify the license status of the OS. It says "grace time expired".

![](https://velog.velcdn.com/images/leeyosebi/post/2244e754-2d18-44f1-951b-3bbfeb6f005f/image.png)

Step 2:
Execute this command to extend the license status.
```
slmgr.vbs /rearm
```

Step 3:
Restart the machine.

Step 4:
Check the license status using the first command.
```
slmgr.vbs /dli
```
Now, we have 10 days remaining.

![](https://velog.velcdn.com/images/leeyosebi/post/4b9cb719-be5b-46e2-8baf-5376b47f7c2a/image.png)
