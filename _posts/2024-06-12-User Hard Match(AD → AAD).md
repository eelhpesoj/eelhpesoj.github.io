---
---

# Summary
## The reason why this task was necessary

One of the clients was using the AAD model initially but later configured AADC and then structured the Hybrid model. 

Consequently, there arose a situation where all the information from the existing AAD accounts needed to be hard-matched with AD accounts. 

This document covers the method for accomplishing that.
![](https://velog.velcdn.com/images/leeyosebi/post/51447968-4a92-4b86-8a2e-2c8284fbff20/image.png)


# Prerequisite knowledge of the task

## ImmutableId and objectGUID
The basic concept is add on-prem user's objectGUID to the AAD user's ImmutableId.

AAD user basically don't have ImmutableId.
But directory sync enabled user have ImmutableId which equals to the objectGUID.

In short,

- AAD User
	ImmutableId = None Exist
- DirSyncEnabled User(Sync from on-prem AD)
	ImmutableId = objectGUID
    
## Example
The account, whtpqUser01@whtpq.com is only exsisting on the AAD.

The other account, whtpqUser04@whtpq.com is synced from on-prem AD server.

![](https://velog.velcdn.com/images/leeyosebi/post/47b42640-60e8-4b4a-99e7-1f0062a213b9/image.png)

And if you convert from the objectGUID to the ImmutableId, you can identified it is identical.

![](https://velog.velcdn.com/images/leeyosebi/post/268974f4-bc50-4e14-bb86-8746eea178e8/image.png)

Let's see if it is true to use the code below.
```shell
$whtpqUser04ObjectGUID = "af90df93-3e95-4dcc-af6a-3f3c2da8b965"
$immutableID = [Convert]::ToBase64String([guid]::New($whtpqUser04ObjectGUID).ToByteArray())
# Print the ImmutableID
Write-Host "ImmutableID:" $immutableID
```
![](https://velog.velcdn.com/images/leeyosebi/post/2d33f3e7-5de4-4a0e-8e3a-f9ad215dcc65/image.png)
The converted objectGUID equal to ImmutableId when we checked earlier using Get-MsolUser command.

# Process of the Task
1. Get the list of the on-prem users and it's objectGUID
2. Convert objectGUID to ImmutableId and save it
3. Pause AADC Sync cycle
4. Connect-MsolService
5. Match users between AAD user and on-prem User using this code
```shell
Set-MsolUser -UserPrincipalName whtpquser01@whtpq.com -ImmutableId k9+Qr5U+zE2vaj88Lai5ZQ==
```
6. Start AADC sync cycle

In this case, whtpqUser04's immutableId will be added to whtpqUser01.
And I can say the whtpqUser01 will be merged to the whtpquser04.

All the data whtpqUser01 owned will be migrated to the whtpqUser04 including mail, ondrive and something like that.

# The viewpoint of the enduser
I was trying to show the difference between whtpqUser01 and whtpqUser04. But in the real scenario, The user of the whtpqUser01 and whtpqUser04 accounts are the same person.
Therefore, there is a less chances regarding the change of the UPN.
If so, all the endusers have to do is just logout and login.

# Reference
https://blog.limcm.kr/202
https://www.easy365manager.com/how-to-convert-immutableid-to-objectguid-and-back/