---
title: "Event ID 1074 on WinSvr 2022 Standard Evaluation"
categories:
  - On-Premises
  - Windows Server
---


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
<img width="2872" height="2104" alt="image" src="https://github.com/user-attachments/assets/570a4d0c-fc04-4684-9615-20dee8e0ee5d" />


# 2. Event logs from Hyper-V host

From the hyper-v host's "Event Viewer → Applications and Services Logs → Microsoft → Windows → Hyper-V-Worker → Admin", the server has been terminated. But no reason can be found.
<img width="2808" height="2110" alt="image" src="https://github.com/user-attachments/assets/f35b0314-e0f0-41d0-b8b6-d58957f59920" />


# 3. Event logs from Service host

Let's moving forward to the VM's event logs. I check the event viewer of the VM's "Windows Logs > System" and filter the events 1074 which can shows me the shuting down logs.
<img width="2326" height="2022" alt="image" src="https://github.com/user-attachments/assets/402b6759-8e17-4f45-8ccd-4e4c4991da5b" />


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
<img width="920" height="844" alt="image" src="https://github.com/user-attachments/assets/41f01206-cbbb-439d-8af6-caf0d992501d" />


# 4. OS Design

In result, I found this is the originally architecture of the OS.
Referrence:
- <https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2022>
- <https://woshub.com/stop-windows-auto-shutdown-every-hour/>
<img width="1854" height="640" alt="image" src="https://github.com/user-attachments/assets/da365c90-1718-47ed-8fe4-4d45743c66fe" />


# 5. Workaround
Here is the command that you can use for the Lab environment.

Step 1:
Execute this command from the administrative cmd
```
slmgr.vbs /dli
```
You can specify the license status of the OS. It says "grace time expired".

<img width="403" height="213" alt="image" src="https://github.com/user-attachments/assets/6b2cfc61-c7dc-4110-abc5-c815a92bf6b2" />


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

<img width="403" height="212" alt="image" src="https://github.com/user-attachments/assets/b4a79036-e7c3-4233-a9e4-047a9dd12826" />

