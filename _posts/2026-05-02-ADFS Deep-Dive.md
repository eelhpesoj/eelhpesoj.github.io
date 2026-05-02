---
title: "ADFS Deep Dive"
---

# 0. Overview
This Post is just a introduce the techcommunity post from Microsoft.
Please refer the link below:
- <https://techcommunity.microsoft.com/blog/coreinfrastructureandsecurityblog/adfs-deep-dive-comparing-ws-fed-saml-and-oauth/257584>

[Index]

1. ADFS with Kerberos
2. Modern Web Authentication
3. How ADFS Federate Identity from DC

# 1. DC with Kerveros
If you have read the post on the very top of this page, DC(Domain Controller) typically uses Kerberos authentication method.
Kerberos is issuing TGT to the authenticated identites, obviousely accounts created from the DC.
For example, The users get the TGT from the DC when they logon their "Domain Joined PCs".

You can check the TGT from the Devices using the cmdlet below:

```shell
klist
```

Example output will be like:
<img width="826" height="478" alt="image" src="https://github.com/user-attachments/assets/6b4332a0-bd79-4eb9-932d-af90e9cc2604" />

Please refer the klist official document:
- <https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/klist>


# 2. Modern Web Authentication
Some tricky problems are comming up from here.

The Kerberos work beautifully in your domain network, right?
But almost every web services can't understand the TGT. Because modern in web services, SAML and Oauth are the standard tokens to use the web services.

So, this point is where the ADFS needed.

Let me say, the ADFS is a kind of somewhere between a interpreter and a intermediator.

If the Domain users shows their valid TGT to the ADFS, The ADFS issues SAML Tokens or JWT to the Web services on behalf DC.


# 3. How ADFS Federate Identity from DC
So if domain users access to their <https://office.com> and try to login, the process would be like:

User > trying log in to <https://office.com> > Redirected to <https://sts.ADFS_FQDN> > Enter user credentials > Check the availability with DC(TGT) > ADFS issues its pre configured token issuing rules associated with the service > ADFS present to the token to the users and the service > Service let the users allow to sign in
