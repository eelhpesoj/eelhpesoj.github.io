---

---

### 요약
ADFS 서버를 간단히 구성해보기(내용 많음 주의)

---

### 1. Overview
![](https://velog.velcdn.com/images/leeyosebi/post/2f86cbf6-5a60-40ea-8f21-8b8d54902ac7/image.png)
먼저,Lab 환경이므로 AD의 CA(Certificate Authority) 기능을 통해 Internal SSL Certificate(or Private SSL Certificate)을 발급 받고 ADFS 서버에 등록한다.
Production environment에서는 반드시 Public SSL Certificate을 사용해야한다.

![](https://velog.velcdn.com/images/leeyosebi/post/fb0f506f-d7d2-490b-8470-d46eac8fd9f0/image.png)
ADFS 서버에 인증서가 설치되고 나면 ADFS에서 사용되는 endpoints 중 Idinitiatedsignonpage URL을 활성화 시켜주어, Application 단에서 User Authentication이 정상적으로 작동하는지 확인한다.



### 2. Setup and Configuration
#### 1. Issuing Certificate: AD CA
1. 우선 AD에 CA 기능을 추가해준다.
![](https://velog.velcdn.com/images/leeyosebi/post/b923eea1-223e-4825-b009-7d42e0835bb4/image.png)
2. 설치 완료 후 CA 실행
![](https://velog.velcdn.com/images/leeyosebi/post/9caf1d55-e755-4114-9d6a-a842007aa7bf/image.png)
3. Right click on 'Template' -> Click 'Manage'
![](https://velog.velcdn.com/images/leeyosebi/post/300e4e1d-a527-4e63-af79-a375b8b64db9/image.png)
4. Right click on 'Computer' -> Click 'Duplicate'
![](https://velog.velcdn.com/images/leeyosebi/post/8bd18fa3-5fff-4016-8cf7-6008297e485f/image.png)
5. General Tab에서 이름 설정 -> Check 'Publish certificate in Active Directory'
![](https://velog.velcdn.com/images/leeyosebi/post/55bd59b7-ba24-4ce0-802d-1f23787146cd/image.png)
6. Request Handling Tab -> Check 'Allow private key to be exported' 
![](https://velog.velcdn.com/images/leeyosebi/post/53bcdc8b-f50e-4047-acb3-66ea1eb26bc8/image.png)
7. Secutiry Tab에서 Click 'Add'
![](https://velog.velcdn.com/images/leeyosebi/post/6a6840fd-15dc-4278-8a36-296b232cbe2c/image.png)
8. Click 'Object Types'
![](https://velog.velcdn.com/images/leeyosebi/post/a20b48ad-5275-4e65-b82e-4ebc8930176f/image.png)
9. Check 'Computers'
![](https://velog.velcdn.com/images/leeyosebi/post/b42405bb-c40f-44d5-b3ca-d0a090ed1057/image.png)
10. ADFS 서버 역할을 할 PC의 hostname을 찾아 선택해준다.
![](https://velog.velcdn.com/images/leeyosebi/post/efeab2bb-405d-4f02-bf81-030a7a09356a/image.png)
11. 'Group or user names'리스트에 ADFS 서버가 입력되었는지 확인하고 하단에 Permission을 적당히 부여한다.
![](https://velog.velcdn.com/images/leeyosebi/post/015ebf37-ef32-4123-b37c-9bace3fca6b5/image.png)
12. 'Build from this Active Directory information에서 'Subject name format'을 Common name으로 설정해준다. 그리고 하단에 DNS name으로 AD에서 조회가 가능하도록 설정해준다.
![](https://velog.velcdn.com/images/leeyosebi/post/86268753-ffb7-450d-8487-22074dbeb583/image.png)


이 외에 Template에서 다른 부분은 설정하지 않고 넘어간다.

13. Certificate Template Consoles 에서 CA로 넘어와서,
Right click on 'Certificate Templates' -> New -> Click 'Certificate Templates to Issue'
![](https://velog.velcdn.com/images/leeyosebi/post/4a3e275c-98a3-45d0-bfd3-9149ad5d8a7c/image.png)
14. 방금 생성한 Template을 선택하고 CA에 추가해준다.
![](https://velog.velcdn.com/images/leeyosebi/post/2f28cfe0-a74b-406a-9c95-0d759bfdb3cf/image.png)



#### 2. Enroll Certificate
1. Open Run -> enter 'mmc' -> File -> 'Add snap in' -> Certificate -> Computer account -> Local computer -> finish
![](https://velog.velcdn.com/images/leeyosebi/post/49fc86ef-81f1-4570-b1b0-7c530b8be1cd/image.png)
2. Right click on 'Personal' -> All Tasks -> Click 'Request New Certificate'
![](https://velog.velcdn.com/images/leeyosebi/post/70c945f6-45d5-4aed-8a1a-5480814d32a6/image.png)
3. Next를 클릭하다 보면 AD CA에서 ADFS 서버에 할당한 Certificate을 확인할 수 있다. Check 후 Enroll.
![](https://velog.velcdn.com/images/leeyosebi/post/5522777e-3152-45d5-ad27-29cdb411b1e8/image.png)

#### 3. ADFS Server setup
1. 해당 Farm에 첫번째 ADFS 서버가 되니 Next
![](https://velog.velcdn.com/images/leeyosebi/post/78e1a40a-556d-42c7-90e9-5f3020d06f7c/image.png)
2. AD의 administrator permission(Credential) 입력
![](https://velog.velcdn.com/images/leeyosebi/post/dfc190ea-f2ef-4895-b1cf-e9565178a472/image.png)
3. SSL Certificate 선택, 서버 이름 확인, 마지막으로 로그인 페이지에 표시될 서비스 이름 입력
![](https://velog.velcdn.com/images/leeyosebi/post/cf7151de-3ed9-4e83-b31c-7c9d55d0a3d4/image.png)
4. ADFS에서 사용할 서비스 계정을 AD에서 생성하고 입력
![](https://velog.velcdn.com/images/leeyosebi/post/5437d369-f3b1-49c6-ad83-d4ed290e5a84/image.png)
5. 사용하는 DB가 따로 없으면 'Next'
![](https://velog.velcdn.com/images/leeyosebi/post/e68c7bf2-3229-4286-95ad-db545ebb8f1c/image.png)

이후 설정은 따로 없기 때문에 Next 및 Install로 설정을 진행한다.

#### 4. Service URL Configuration
1. Open Powershell as administrator and Type jusk like this:
![](https://velog.velcdn.com/images/leeyosebi/post/9fd7a399-afe9-4664-903a-0c4660d06fa6/image.png)
```shell
Get-AdfsEndpoint
```
2. FullUrl 확인
![](https://velog.velcdn.com/images/leeyosebi/post/8b841b3a-b92a-4e1a-b6d8-8cb9b3c9e398/image.png)
```shell
# 1번에서 표시된 URL의 속성 중, FullUrl 속성만을 클립보드에 복사한다.
Get-AdfsEndpoint | Select FullUrl | Clip
```
3. 메모장에 붙여 넣으면 다음과 같이 나온다. 이중 두번째 URL 주목. ADFS 서비스 이름이다.
![](https://velog.velcdn.com/images/leeyosebi/post/0765e760-9a45-473e-bbd1-c65b44e62948/image.png)
4. 브라우저에서 아래 링크로 접속해본다.
https:// adfs.conceptswork.com/adfs/ls/idpinitiatedsignon.aspx
5. 아마 화면이 이렇게 나올텐데 에러코드를 보면 리소스 사용 불가하다고 나온다.
"The resource you are trying to access is not available"
이는 서버 OS 2016 버전에서 ADFS를 설치할 경우, 기본적으로 EnableIdpInitiatedSignonPage가 False이기 때문이다. Powershell로 켜줘야 한다.
![](https://velog.velcdn.com/images/leeyosebi/post/73b056a0-d45f-4615-862c-8057c0330037/image.png)

6. 우선 진짜인지 확인해본다
  ```shell
  Get-AdfsProperties
  ```
![](https://velog.velcdn.com/images/leeyosebi/post/8735462c-dd96-4882-bbd0-b948f0be978b/image.png)
7. True로 바꿔준다
  ```shell
Set-AdfsProperties -EnableIdpInitiatedSignonPage $True
  ```
![](https://velog.velcdn.com/images/leeyosebi/post/ef97ad99-9262-4864-9d3d-28f3bfc4598e/image.png)

#### 5. Authentication method Configuration
1. 'https:// adfs.conceptswork.com/adfs/ls/idpinitiatedsignon.aspx' 이 페이지를 다시 Refresh하면, 이제는 서비스가 활성화 되어 Sign in 버튼이 보일것이다.
![](https://velog.velcdn.com/images/leeyosebi/post/c6ac5d7d-a546-43d6-a80d-60b0cf8116ea/image.png)
2. 하지만 Window OS에서 제공하는 AD Authentication prompt가 표시된다. 우리는 Web Application을 통해 From based Authentication을 사용하려고 하니, ADFS서버에서 특정 값을 변경해준다.
![](https://velog.velcdn.com/images/leeyosebi/post/a78a2664-daf9-42cb-a085-8d3f131f4a92/image.png)
3. ADFS 관리자에서 Service -> Authentication Methods -> Primary Authentication Methods -> External -> Click 'Edit'
![](https://velog.velcdn.com/images/leeyosebi/post/7905b956-ca1d-41c2-aa0f-9bd09ee5acd5/image.png)
4. Uncheck 'Windows Authentication' -> Apply
![](https://velog.velcdn.com/images/leeyosebi/post/29f52533-2a22-4b47-9b85-eac8152d537b/image.png)
5. 다시 'https:// adfs.conceptswork.com/adfs/ls/idpinitiatedsignon.aspx' 이 페이지에 돌아와서 Sign in 버튼을 클릭하면 로그인 Form이 표시될 것이다.
![](https://velog.velcdn.com/images/leeyosebi/post/04ced557-f5d1-45be-8c0d-fb70353eca8f/image.png)
6. 정상 로그인 되었다는 표시가 뜨면 성공이다.
![](https://velog.velcdn.com/images/leeyosebi/post/4fddc1ad-0af5-4f4f-a6fc-f5ef9fdd631b/image.png)





### 3. Other Feature
#### 서비스 명 변경하기
1. ADFS 관리자에서 Right click on 'ADFS' -> Click 'Edit Federation Service Properties'
![](https://velog.velcdn.com/images/leeyosebi/post/40d4a710-9431-47a9-ac2c-4c10381a07e3/image.png)
2. Federation Service display name을 변경하고 적용하면
![](https://velog.velcdn.com/images/leeyosebi/post/b386094a-4bc7-4da9-81f6-3fbb7661ccd8/image.png)
3. 서비스 URL을 Refresh하면 서비스 명이 변경되어 표시된다.
![](https://velog.velcdn.com/images/leeyosebi/post/2bc733a8-4582-4714-93a1-a157f40ef994/image.png)



### 4. 참고자료
- https://www.youtube.com/watch?v=9eq3IeDAkvA&list=PL8wOlV8Hv3o9uHl0XFfI6_katp6BXNVjb&index=3
- ADFS 배포 관련
https://blog.limcm.kr/73