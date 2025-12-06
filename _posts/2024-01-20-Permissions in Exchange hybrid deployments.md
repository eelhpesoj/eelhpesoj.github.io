---
---


### 1. 요약:
SendAs 권한을 통해서 한 유저가 다른 유저의 이름으로 메일을 보내는 기능을 구현

### 2. 이 작업이 필요했던 이유:
Exchange Hybrid 구성 이후 A@test.com 이라는 유저를 온보딩(On-prem mailBox를 EXO로 옮기는 작업)시켰다.
그런데 기존에 사용하고 있던 IT@test.com에 대한 SendAs 권한이 작동하지 않는 이슈가 있었다.
따라서 MS Document를 찾아본 결과 해당 구성은 지원되지 않으니, 직접 수동으로 구성해야한다고 했다.

### 3. 작업 흐름:
1. Exchange Management Shell에서 Command 입력
```shell
# EX01 이라는 그룹에 OnPREM1 이라는 유저의 권한을 Send As 로 추가해준다
Add-ADPermission -Identity EXO1 -User ONPREM1 -AccessRights ExtendedRight -ExtendedRights "Send As"
```
2. Exchange Online Powershell에서 Command 입력
```shell
# EX01이라는 그룹에 ONPREM1 이라는 유저의 권한을 SendAs 로 추가해준다
Add-RecipientPermission -Identity EXO1 -Trustee ONPREM1 -AccessRights SendAs
```
3. AADC 서버에서 동기화
```shell
Start-ADSyncCycle -PolicyType Delta
```

### 4. 참고:
https://learn.microsoft.com/en-us/exchange/permissions
![](https://velog.velcdn.com/images/leeyosebi/post/0a45b411-582b-409b-91a5-23530a819f6c/image.png)
