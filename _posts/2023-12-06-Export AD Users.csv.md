---
---

### 1. 요약:
AD에서 모든 유저들을 CSV 형태로 내보내는 Powershell

### 2. 이 코드가 필요했던 이유:
고객사는 On-prem AD와 테넌트에서 EXO만을 사용하고 있었다.
테넌트 마이그레이션을 하려고 했는데 PHS 방식으로 테넌트에 유저를 생성하려고 했다. AD에 계정의 원본이 있는 상황.(메일은 AVE Point라는 업체를 통해서 마이그레이션을 진행했다.)

문제는 Entra ID(AzureAD)에서 사용하고 있는 계정과 On-prem AD에 있는 계정이 일치하지 않았다.

예를 들어 On-prem에 있는 계정인데 EntraID에는 없다던가, 그 반대의 상황도 있어 정리가 필요했던 상황이었다.
고객사의 반응이 너무 느려서 직접 유저를 뽑아서 비교한 문서를 전달해줬고 정리를 요청했다.

### 3. 코드의 흐름:
1. ActiveDirectory 모듈을 Import 해준다
2. $AllUsers라는 변수에 모든 유저와 속성을 담아준다
3. $AllUsers의 속성 중 특정 값만 선택하고 해당 값을 Encoding해서 csv에 저장한다


### 4. 코드:

```shell
Import-Module ActiveDirectory

$AllUsers = Get-ADUser -filter {cn -like "*"} -Properties *
$AllUsers | select displayname,UserPrincipalName,EmailAddress | export-csv -Encoding UTF8 <로컬 파일 경로>.csv 
```
[https://github.com/leeyosebi/Powershell/blob/master/ExportADUsers.ps1](https://github.com/leeyosebi/Powershell/blob/master/ExportADUsers.ps1)