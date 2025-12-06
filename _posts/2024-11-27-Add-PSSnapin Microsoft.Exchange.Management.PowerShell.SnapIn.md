---
---


# 0. Summary
You may use 'Exchange Management Shell' for execute powerShell command to deploy something on the Exchange server.
But it's too uncomfortable for me to use in following reasons:

1. When I forget the command options, I have to press 'Tab' repeatedly to search for them one by one.
2. Since the font size can't be adjusted, it's quite challenging to operate when accessing remotely.
3. It's inconvenient to search for, copy, and paste previously used commands.


# 1. Exchange Management Shell
![](https://velog.velcdn.com/images/leeyosebi/post/6a38f8e0-3994-4b45-a899-4a876e75d279/image.png)

It's good but too simple and basic.




# 2. Add-PSSnapin
So I do prefer to use Powershell_Ise and this is a command which makes your task way better.
You should memorise it. All you have to do is run powershell ise and execute following command.
```shell
Add-PSSnapin Microsoft.Exchange.Management.PowerShell.SnapIn
```




# 3. Example for the Usage
No comment. This is way better and you are an idiot if you don't use this snapin.

![](https://velog.velcdn.com/images/leeyosebi/post/23309ea7-2e72-4e62-9944-7fa6ece9f303/image.png)

![](https://velog.velcdn.com/images/leeyosebi/post/d4e8e0dc-fc2a-4372-b123-c0a0eb240a28/image.png)





# 4. MS Documentation
https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/add-pssnapin?view=powershell-5.1