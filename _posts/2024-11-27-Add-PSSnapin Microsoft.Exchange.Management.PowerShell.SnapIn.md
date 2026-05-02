---
title: "Add-PSSnapin Microsoft.Exchange.Management.PowerShell.SnapIn"
categories:
  - On-Premises
  - Exchange Server
  - Exchange Online
  - Exchange hybrid
  - Programming
  - PowerShell
---


# 0. Summary
You may use 'Exchange Management Shell' for execute powerShell command to deploy something on the Exchange server.
But it's too uncomfortable for me to use in following reasons:

1. When I forget the command options, I have to press 'Tab' repeatedly to search for them one by one.
2. Since the font size can't be adjusted, it's quite challenging to operate when accessing remotely.
3. It's inconvenient to search for, copy, and paste previously used commands.


# 1. Exchange Management Shell
<img width="980" height="513" alt="image" src="https://github.com/user-attachments/assets/b540eb4f-6127-412c-a9f7-aa804782932e" />


It's good but too simple and basic.




# 2. Add-PSSnapin
So I do prefer to use Powershell_Ise and this is a command which makes your task way better.
You should memorise it. All you have to do is run powershell ise and execute following command.
```shell
Add-PSSnapin Microsoft.Exchange.Management.PowerShell.SnapIn
```




# 3. Example for the Usage
No comment. This is way better and you are an idiot if you don't use this snapin.

<img width="1567" height="886" alt="image" src="https://github.com/user-attachments/assets/9562777f-2ccd-4f55-b33d-bfc0e4a9d350" />


<img width="1567" height="886" alt="image" src="https://github.com/user-attachments/assets/0409d8a5-007e-4610-ae18-c56f80803c5c" />






# 4. MS Documentation
<https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/add-pssnapin?view=powershell-5.1>
