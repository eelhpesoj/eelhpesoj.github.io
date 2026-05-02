---
title: "[STUDY] ADFS 2 - Configuration"
---

### 요약
ADFS 서버를 간단히 구성해보기(내용 많음 주의)

---

### 1. Overview
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/d4eb7884-2af8-4467-a4ef-4ebeb2126f3b" />

먼저,Lab 환경이므로 AD의 CA(Certificate Authority) 기능을 통해 Internal SSL Certificate(or Private SSL Certificate)을 발급 받고 ADFS 서버에 등록한다.
Production environment에서는 반드시 Public SSL Certificate을 사용해야한다.

<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/0ddd9848-b739-4d92-abd5-22b230da528a" />

ADFS 서버에 인증서가 설치되고 나면 ADFS에서 사용되는 endpoints 중 Idinitiatedsignonpage URL을 활성화 시켜주어, Application 단에서 User Authentication이 정상적으로 작동하는지 확인한다.



### 2. Setup and Configuration
#### 1. Issuing Certificate: AD CA
1. 우선 AD에 CA 기능을 추가해준다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/3f06788e-0371-4ab5-aa9b-44f09933fa1c" />

2. 설치 완료 후 CA 실행
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/08b06c99-428d-43b1-a859-653da6a4187f" />

3. Right click on 'Template' -> Click 'Manage'
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/bb63c2a7-c797-464c-bc52-ce71e28fd35e" />

4. Right click on 'Computer' -> Click 'Duplicate'
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/b34260e5-f877-4b64-8789-281565e34937" />

5. General Tab에서 이름 설정 -> Check 'Publish certificate in Active Directory'
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/d73772e4-5b47-415b-866d-33f9516f9598" />

6. Request Handling Tab -> Check 'Allow private key to be exported' 
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/366e3c74-be7d-4ded-9b5d-266544516cd4" />

7. Secutiry Tab에서 Click 'Add'
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/63ea2edf-1ac5-47e5-92dc-7088a52765ea" />

8. Click 'Object Types'
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/351454cc-5031-4320-9ef3-b2f0edf2a846" />

9. Check 'Computers'
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/4d40f957-5735-4265-ad29-d191073f1c8a" />

10. ADFS 서버 역할을 할 PC의 hostname을 찾아 선택해준다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/f5aa69f0-f132-4ab5-831f-d298bf9ecfd2" />

11. 'Group or user names'리스트에 ADFS 서버가 입력되었는지 확인하고 하단에 Permission을 적당히 부여한다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/9376eae4-e459-49d0-89b0-55e253373acc" />

12. 'Build from this Active Directory information에서 'Subject name format'을 Common name으로 설정해준다. 그리고 하단에 DNS name으로 AD에서 조회가 가능하도록 설정해준다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/ed249a88-a8c5-49ba-8490-2966de6a78c1" />



이 외에 Template에서 다른 부분은 설정하지 않고 넘어간다.

13. Certificate Template Consoles 에서 CA로 넘어와서,
Right click on 'Certificate Templates' -> New -> Click 'Certificate Templates to Issue'
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/4e54010e-c7e6-4d83-89a4-bf147302942a" />

14. 방금 생성한 Template을 선택하고 CA에 추가해준다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/13b2a102-e002-496c-af9c-61a3f6f2d8be" />




#### 2. Enroll Certificate
1. Open Run -> enter 'mmc' -> File -> 'Add snap in' -> Certificate -> Computer account -> Local computer -> finish
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/949213c6-9f52-4691-9b4d-36589c337d3d" />

2. Right click on 'Personal' -> All Tasks -> Click 'Request New Certificate'
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/410e3f70-f95c-4b61-b82c-218aef2de50a" />

3. Next를 클릭하다 보면 AD CA에서 ADFS 서버에 할당한 Certificate을 확인할 수 있다. Check 후 Enroll.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/97794e2e-d34e-45b5-a69a-ec8c5ef9cb8d" />


#### 3. ADFS Server setup
1. 해당 Farm에 첫번째 ADFS 서버가 되니 Next
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/6d293b45-fd46-4941-ad8e-7407c558c133" />

2. AD의 administrator permission(Credential) 입력
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/f2c7959a-477b-4d31-8c33-1be3e1e25815" />

3. SSL Certificate 선택, 서버 이름 확인, 마지막으로 로그인 페이지에 표시될 서비스 이름 입력
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/ae738c23-5c95-455d-913f-f51fa52decc6" />

4. ADFS에서 사용할 서비스 계정을 AD에서 생성하고 입력
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/babac576-0bbe-482b-9eaa-98bd6da84f28" />

5. 사용하는 DB가 따로 없으면 'Next'
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/ee6883ff-20f0-43df-816a-6f1c51d23841" />


이후 설정은 따로 없기 때문에 Next 및 Install로 설정을 진행한다.

#### 4. Service URL Configuration
1. Open Powershell as administrator and Type jusk like this:
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/94e8b39b-6d44-4d2f-9a54-67a6795cd451" />

```shell
Get-AdfsEndpoint
```
2. FullUrl 확인
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/b72e3ae9-a1e1-413d-941b-9932ce023ec9" />

```shell
# 1번에서 표시된 URL의 속성 중, FullUrl 속성만을 클립보드에 복사한다.
Get-AdfsEndpoint | Select FullUrl | Clip
```
3. 메모장에 붙여 넣으면 다음과 같이 나온다. 이중 두번째 URL 주목. ADFS 서비스 이름이다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/35d47561-db81-4545-b4e0-ddac001c0514" />

4. 브라우저에서 아래 링크로 접속해본다.
https:// adfs.conceptswork.com/adfs/ls/idpinitiatedsignon.aspx

5. 아마 화면이 이렇게 나올텐데 에러코드를 보면 리소스 사용 불가하다고 나온다.
"The resource you are trying to access is not available"
이는 서버 OS 2016 버전에서 ADFS를 설치할 경우, 기본적으로 EnableIdpInitiatedSignonPage가 False이기 때문이다. Powershell로 켜줘야 한다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/7180e50f-fb2a-422a-b9c5-dae2ef60c44e" />


6. 우선 진짜인지 확인해본다
  ```shell
  Get-AdfsProperties
  ```
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/b7ae7530-9905-4fa8-ad52-45167237fdb7" />

7. True로 바꿔준다
  ```shell
Set-AdfsProperties -EnableIdpInitiatedSignonPage $True
  ```
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/eb55cde2-f11e-447e-9f26-61afe7f28f7a" />


#### 5. Authentication method Configuration
1. 'https:// adfs.conceptswork.com/adfs/ls/idpinitiatedsignon.aspx' 이 페이지를 다시 Refresh하면, 이제는 서비스가 활성화 되어 Sign in 버튼이 보일것이다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/3397c250-f850-42cb-81b1-5246205d2324" />

2. 하지만 Window OS에서 제공하는 AD Authentication prompt가 표시된다. 우리는 Web Application을 통해 From based Authentication을 사용하려고 하니, ADFS서버에서 특정 값을 변경해준다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/0db2e7c6-2ef0-4e98-b7d0-9ed427d23b89" />

3. ADFS 관리자에서 Service -> Authentication Methods -> Primary Authentication Methods -> External -> Click 'Edit'
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/2297e599-ee20-4000-ad37-3c0e5248f845" />

4. Uncheck 'Windows Authentication' -> Apply
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/15322eef-c2ad-4a3f-a01d-ab56dffae909" />

5. 다시 'https:// adfs.conceptswork.com/adfs/ls/idpinitiatedsignon.aspx' 이 페이지에 돌아와서 Sign in 버튼을 클릭하면 로그인 Form이 표시될 것이다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/a7522102-58ec-45f7-899c-33c75d676d86" />

6. 정상 로그인 되었다는 표시가 뜨면 성공이다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/c75051d6-ed87-4b7a-895e-49ada6c5b8b5" />






### 3. Other Feature
#### 서비스 명 변경하기
1. ADFS 관리자에서 Right click on 'ADFS' -> Click 'Edit Federation Service Properties'
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/e293d4d3-bde2-4843-b24b-ee2a34e2c518" />

2. Federation Service display name을 변경하고 적용하면
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/fa6c0c69-c849-478d-b3b8-07ea9061d5f9" />

3. 서비스 URL을 Refresh하면 서비스 명이 변경되어 표시된다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/e974f9e4-ca72-40f8-9b50-a12848e84a75" />




### 4. 참고자료
- <https://www.youtube.com/watch?v=9eq3IeDAkvA&list=PL8wOlV8Hv3o9uHl0XFfI6_katp6BXNVjb&index=3>
- ADFS 배포 관련
<https://blog.limcm.kr/73>
