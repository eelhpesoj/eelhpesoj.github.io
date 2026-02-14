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

https://github.com/eelhpesoj/Powershell/blob/master/AD/rmNewOutlook.ps1

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
![](https://github.com/user-attachments/assets/16dffc45-1a44-4f81-9c53-f0881ad7a550)

I just configured it as system context, the most high previlaged one.
![](https://github.com/user-attachments/assets/09f484f2-f807-40a8-8eda-ba3d1e7cf87e)

And here is the thing.
Go to action tab. and edit.
![](https://github.com/user-attachments/assets/a1b5e3a2-639d-4efd-a470-d609c1f10c15)


Set those two value as below.
![](https://github.com/user-attachments/assets/bc9fa470-a599-4e9d-a6ba-951b86f82608)

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