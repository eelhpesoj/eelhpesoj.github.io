---
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
![](https://velog.velcdn.com/images/leeyosebi/post/c9485f6d-dbd0-478e-9bcb-88c7e695b77f/image.png)

참고로 Kerberos Ticket에는 다음과 같은 정보들이 포함되어 있다.
![](https://velog.velcdn.com/images/leeyosebi/post/3a4c293c-8230-4def-8436-03ebf3a0a69f/image.png)

하지만 이 Traditional Methods는 각 Application이 필요한 속성만 주는 Customised가 되지 않는 문제가 있다. 
Application이 필요한 정보 외에 너무 많은 정보를 제공하게 되는 문제가 있다.
![](https://velog.velcdn.com/images/leeyosebi/post/3e9a542b-bab4-4939-b5c0-01bc356ab814/image.png)


### 2. Claims
이 방식은 **Claim based identity model**이라고 불리는 방식이다.
우선 이 방식에 대해서 GPT에게 물어봤다.
![](https://velog.velcdn.com/images/leeyosebi/post/911e8892-756e-4381-bb12-059a19a9837f/image.png)
GPT한테 초등학생에게 설명하듯이 말해달라고 했다
Claim이란 Application이 유저의 속성을 AD에 요청하는 것이다.
이 방식이 Traditional Methods 보다 나은 점은 유저의 모든 정보를 요청하는 것이 아니라 Application에 필요한 특정 속성만 AD에 토큰으로 받아온다는 점이다.
이 model을 기반으로 ADFS가 동작한다. 
![](https://velog.velcdn.com/images/leeyosebi/post/aad56f01-151b-409c-9f38-8b5f4e499a60/image.png)

### 3. Why ADFS?
ADFS는 Application이 요청하는 Claim들을 AD에 적절히 처리해주는 역할을 한다.
유저의 특정 속성을 요청하기 위해 받아온 정보를 각각 Token 형태로 전달해준다.
Application이 필요한 정보를 ADFS가 AD에 받아오는 것이다.
(인증 흐름 : Application → ADFS → AD → ADFS → Application)
![](https://velog.velcdn.com/images/leeyosebi/post/362ccbb3-e2b7-4a7a-b74c-9908e981687b/image.png)
각 Application별로 요청하는 정보가 다른데 이를 처리해주는 역할이다.
![](https://velog.velcdn.com/images/leeyosebi/post/c2de9369-87f9-4114-9f97-372e08c1e5a8/image.png)

마지막으로 전통적 방식과의 차이점이다.
가장 큰 차이점은 AD에 다이렉트로 연결되는 여부, 토큰 형태로 발급되는 여부, 필요한 속성만 변형이 가능한 여부 가 있다.
![](https://velog.velcdn.com/images/leeyosebi/post/f6b5ec22-a443-468d-8736-312b3b5ea54c/image.png)


### 4. 참고자료
https://www.youtube.com/watch?v=mIPqdPyfuNw&list=PL8wOlV8Hv3o9uHl0XFfI6_katp6BXNVjb