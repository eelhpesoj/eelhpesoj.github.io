---
---

# 0. Summary
Imagine when we visit a company. At the front of the company, you will meet a security in the desk and they will check if you can enter here or not. Specifically, they will check you are on the visitor list and you are actually the same person on the visitor list.

![](https://velog.velcdn.com/images/leeyosebi/post/d481da3c-5683-4f3f-9759-39414099983e/image.png)

After they finished to check, they will give you a visitor's card to enter some places where only allowed for the visitors. You can't access some places where only allowed to the employees. You don't have any permissions for some offices and floors.

Now this same process implemented in the web services that we call authentication and authorization.

# 1. Authentication
This basically all about authenticating who you are. It's all about the point when you're entering the services.

## Methods
1. **Something You Have**
	- SMS
    - OTP
    - MFA apps
2. **Something You Know**
	- Passcode
    - PIN
    - Email code
3. **Something You Are**
	- Finger Print
    - Face ID



# 2. Authorization
This is all about what are you allowed to do. It checks your permission to execute something.

## Methods
1. **RBAC(Role-Based Access Control)**
	- Global Admin/Exchange Server Admin/Security Admin/Read-Only User
2. **ABAC(Attribute-Based Access Control)**
	- If Manager → Allowed to access finance data
    - If Working Time → Allowed to access work system
    - If Internal Network → Allowed to access
    - If Company Devices → Allowed to access
3. **ACL(Access Control List)**
	- File sharing system
    - FireWall
4. **OAuth 2.0 and OpenID Connect (OIDC)**
5. **Zero Trust**
