---
title: "Remove New outlook through GPO"
---

# 0. Overview

One of my clients, obviously IT admin, wants to remove New Outlook from the domain joined computers.
So, I suggest to use GPO which removes it by scheduled powershell script.
Let's figure it out together.


[Index]
1. Script
2. Create GPO
3. Result


# 1. Script
First up first, you need to create the script.
The script should be located in "C:\Windows\SYSVOL\sysvol\{domain name}\scripts"
The script should be accessed from \\{domain name}\netlogon
 
In this case, I create the script in "C:\Windows\SYSVOL\sysvol\all.run.local\scripts".
and the script name is rmNewOutlook.ps1.

- <https://github.com/eelhpesoj/Powershell/blob/master/AD/rmNewOutlook.ps1>

```shell
$getNewOutlook = Get-AppPackage Microsoft.OutlookForWindows -AllUsers -ErrorAction SilentlyContinue

if($getNewOutlook){

$getNewOutlook | Remove-AppPackage -AllUsers

    exit

}

else {

    exit

}
```

# 2. Create GPO

Find "scheduled task" from computer configuration. and create the task.
<img width="874" height="564" alt="image" src="https://github.com/user-attachments/assets/8101223e-458f-4d7e-90ae-8d86dbfdd473" />


I just configured it as system context, the most high previlaged one.
<img width="631" height="486" alt="image" src="https://github.com/user-attachments/assets/e65c4bb5-952c-40a0-8a63-7a0cfdb3b10b" />


And here is the thing.
Go to action tab. and edit.
<img width="631" height="486" alt="image" src="https://github.com/user-attachments/assets/22a36ff8-affa-4b32-b194-007e98f5d538" />



Set those two value as below.

<img width="403" height="422" alt="image" src="https://github.com/user-attachments/assets/407979c3-223b-4ac6-b1be-bfb0b9ca2176" />


Program/script:
```
C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe
```

Add arguments(optional):
```
-ExecutionPolicy Bypass -NoProfile -File "\\ALL.run.local\netlogon\rmNewOutlook.ps1"
```

# 3. Result
After the GPO setup has done, You can pull the policy from the domain joined computers by executing command "gpupdate /force".
And once the policy has updated, you can see the task from task scheduler library. 


Hope this can help you guys!
