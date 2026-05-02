---
title: "[STUDY] ADFS 1 - Architecture"
categories:
  - On-Premises
  - ADFS
---

### 개요

- Traditional Methods with Active Directory
- Claims based Identity
- How it workss in ADFS?
- Difference between ADFS Token and Kerberos Ticket

---

### 1. Traditional Methods
우선, AD의 어떤 Resource Owner(유저)가 AD와 연동된 Application에 로그인을 하려고 한다고 가정해본다.
이때 Application은 AD에 이 Resource Owner가 실제로 존재하는지, 이 계정이 유효한지를 판단한다.
판단 후 정상적이면 AD는 Application에 Kerberos Tichet을 발급해준다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/4da82476-1a6c-4b18-a28c-9ad33b2d1afa" />


참고로 Kerberos Ticket에는 다음과 같은 정보들이 포함되어 있다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/00d5330f-81a0-43d4-8adb-b7e35a46fe58" />


하지만 이 Traditional Methods는 각 Application이 필요한 속성만 주는 Customised가 되지 않는 문제가 있다. 
Application이 필요한 정보 외에 너무 많은 정보를 제공하게 되는 문제가 있다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/78d52a27-9f94-40ea-8014-7a36522e6e63" />



### 2. Claims
이 방식은 **Claim based identity model**이라고 불리는 방식이다.
우선 이 방식에 대해서 GPT에게 물어봤다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/1434f05c-cace-4ed2-a36a-ddc6cadd5333" />

GPT한테 초등학생에게 설명하듯이 말해달라고 했다
Claim이란 Application이 유저의 속성을 AD에 요청하는 것이다.
이 방식이 Traditional Methods 보다 나은 점은 유저의 모든 정보를 요청하는 것이 아니라 Application에 필요한 특정 속성만 AD에 토큰으로 받아온다는 점이다.
이 model을 기반으로 ADFS가 동작한다. 
<img width="1346" height="398" alt="image" src="https://github.com/user-attachments/assets/95769247-ee81-4953-a959-8131ab650533" />


### 3. Why ADFS?
ADFS는 Application이 요청하는 Claim들을 AD에 적절히 처리해주는 역할을 한다.
유저의 특정 속성을 요청하기 위해 받아온 정보를 각각 Token 형태로 전달해준다.
Application이 필요한 정보를 ADFS가 AD에 받아오는 것이다.
(인증 흐름 : Application → ADFS → AD → ADFS → Application)
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/8fe7f610-19ab-40e2-8d7e-a1e0de25be87" />

각 Application별로 요청하는 정보가 다른데 이를 처리해주는 역할이다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/a6034249-b4cb-49ef-b8d8-fe82a218fdf9" />


마지막으로 전통적 방식과의 차이점이다.
가장 큰 차이점은 AD에 다이렉트로 연결되는 여부, 토큰 형태로 발급되는 여부, 필요한 속성만 변형이 가능한 여부 가 있다.
<img width="2524" height="1422" alt="image" src="https://github.com/user-attachments/assets/47103987-1e75-4968-854a-0dee395898c9" />



### 4. 참고자료
<https://www.youtube.com/watch?v=mIPqdPyfuNw&list=PL8wOlV8Hv3o9uHl0XFfI6_katp6BXNVjb>
