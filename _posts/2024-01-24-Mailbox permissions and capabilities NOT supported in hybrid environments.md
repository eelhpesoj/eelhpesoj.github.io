---
---


### 요약
Exchange Hybird 환경에서 SendAS 권한은 동기화 구성에서 빠져있기 때문에 수동으로 구성해야한다.

---

### 1. 구성 

다음은 EXO로 동기화된 Onprem그룹에 EXO사서함에 대해 SendAS 권한을 추가하는 작업이다.

‘A Group’이라는 동기화된 그룹에 EXO사서함인 ‘TEST02’ 계정에 대해 SendAS권한을 부여해준다.
#### 1. Exchange Online Powershell: 그룹에 특정 사서함에 대해 SendAS 권한을 부여

```shell
Add-RecipientPermission -Identity <그룹> -Trustee <EXO사서함> -AccessRights SendAs
```
 ![](https://velog.velcdn.com/images/leeyosebi/post/6a0edd64-c29f-4d31-8dd4-96d0c3907b5f/image.png)

#### 2. Exchange Management Shell: 그룹에 특정 사서함에 대해 SendAS권한을 부여

```shell
Add-ADPermission -Identity <그룹> -User <EXO사서함> -AccessRights ExtendedRight -ExtendedRights "Send As"
```
![](https://velog.velcdn.com/images/leeyosebi/post/a998fd98-e398-4b69-88c4-d89fe4e19032/image.png)

#### 3. AADC 동기화를 진행합니다.
```shell
Start-ADSyncSyncCycle -PolicyType Delta
```
![](https://velog.velcdn.com/images/leeyosebi/post/26c72bf2-cb4d-4dca-a4ec-ff53119b48fe/image.png)

#### 4. EXO사서함에서 SendAS권한으로 메일을 발송합니다.
![](https://velog.velcdn.com/images/leeyosebi/post/f2290d18-f899-40c9-bba0-8981258ad703/image.png)

### 2. 구성2(?): 변수 사용

위 명령어가 잘 안될 수도 있는데 변수를 사용하면 좀 더 깔끔하게 적용할 수 도 있다.

EXO
```shell
$TargetDL = Get-DistributionGroup -Identity A@domain.name

$TargetAADUser = $AADUsers | where {$_.UserprincipalName -eq user@domain.name}

Add-RecipientPermission -Identity $TargetDL.Identity -Trustee $TargetAADUser.UserPrincipalName -AccessRights SendAs
```

Exchange On-prem
```shell
$TargetDL = Get-DistributionGroup -Identity A@domain.name

$TargetADUser = $ADUsers | where {$_.UserprincipalName -eq user@domain.name}

Add-ADPermission -Identity $TargetDL.Identity -User $TargetADUser.UserPrincipalName -AccessRights ExtendedRight -ExtendedRights "Send As"
```

### 3. 참고 자료

https://learn.microsoft.com/en-us/exchange/permissions