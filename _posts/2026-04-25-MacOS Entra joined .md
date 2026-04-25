# 0. Overview
In this post, we will learn how to make the mac device "Microsoft Entra joined"
The result would be like:
<img width="1512" height="359" alt="image" src="https://github.com/user-attachments/assets/541d3dfc-cf7d-401f-b4bf-5841c02140e9" />

Let's crack on with the post!

[Index]

1. PSSO concept
2. Intune policy configuration
3. Deployment from the endpoint

# 1. PSSO concept
Please refer this documents:

https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on?tabs=password
https://learn.microsoft.com/en-us/entra/identity/devices/device-join-microsoft-entra-company-portal?tabs=password
https://support.apple.com/guide/deployment/platform-sso-for-macos-dep7bbb05313/web

# 2. Intune policy configuration
I just follow the configuration from the document below.
https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos

<img width="544" height="887" alt="image" src="https://github.com/user-attachments/assets/c3fc0160-9934-45e6-9623-5993f331077b" />

Plus, I also create compliance policy to meet the "Default Device Compliance Policy" which requires assigning a one compliance policy at least.
<img width="548" height="343" alt="image" src="https://github.com/user-attachments/assets/0b101af9-5ea2-4403-8b81-e6cfa158ff57" />


# 3. Deployment from the endpoint
## Install company portal
Go to this link and click "Enroll my mac" to download Company portal installer.
https://learn.microsoft.com/en-us/intune/user-help/enrollment/enroll-company-portal-macos#install-company-portal-app

Click continue to proceed.
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/8ab26b1b-575a-4c0b-92d9-7862d376f7d7" />

<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/de58b0a3-1cb1-4827-a219-63a1597e0e30" />

Done!
<img width="968" height="769" alt="image" src="https://github.com/user-attachments/assets/24cd3f44-e0d5-44ed-bc0d-3b87421e06cf" />

## Launch the company portal
Once installed, you can see the application from the finder > Applications.
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/c4bb24ca-c33a-4444-ae83-0bf0fc2d1e35" />

Launch and sign in to the poratl
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/fd12dfe1-0236-453d-a529-8c31cc5f5561" />

Sign in
<img width="968" height="769" alt="image" src="https://github.com/user-attachments/assets/6d49e216-b203-45d5-9b87-ad606052f039" />

<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/57e062a0-3de6-4cba-9fa0-21a00899595c" />

Click "Begin" to enroll the Mac
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/28f8a411-d43b-4921-a93b-1f7b119aaa72" />

Click "Continue"
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/a365bbff-5693-4437-84ca-38607141fe2e" />

Downloadd the MDM profile
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/bf757083-76d3-4f06-b19f-e3bd111fbbf6" />

The profiles installed to the Settings > General > Device management
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/ae7f5f36-ac1e-4936-9fd6-78871cbf2359" />

Double click the profile and click "Install.." at the right bottom
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/f4e0eeda-09ee-456a-972c-7209bb1379e2" />
At this point, there is no any profiles installed on the device
```shell
sudo profiles list
```
<img width="414" height="63" alt="image" src="https://github.com/user-attachments/assets/53841502-2e9d-4f2c-96f8-f956f121790d" />

Anyway install the MDM profile
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/c589115c-7244-410b-9b4c-9ff24e1939e1" />

Give it a password
<img width="968" height="769" alt="image" src="https://github.com/user-attachments/assets/ea2e6e89-54fd-4b98-b484-70a570238bc6" />

Ok it's done
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/4e8024b3-5736-4427-8da8-a73f69583403" />

After installed the profile, in few minutes, from other intune policies deployed like the MDM profiles. It depends on the MDM profiles the first one we installed
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/c9720965-e4a2-41f4-b380-85235b7d5c28" />

You can see the profiles from the terminal
<img width="674" height="122" alt="image" src="https://github.com/user-attachments/assets/b1103ee9-63fe-474e-b209-e876d79e8ce8" />


## PSSO Registration

Now this is important, this registration process can make your Mac "Entra joined"
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/00bedd1f-8f37-4f16-84b8-ba61dfb91b13" />

Give it a loacl account password
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/782d52ce-58b2-4600-99a2-ab9a4d7e620c" />

Give it a credential from M365 account
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/5edcdef7-60a0-415b-b2d0-95ca9c25f646" />

Registering...
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/99e5aa7f-3278-4e23-b54c-992ec36a7a93" />

Lastly, Enter the M365 account password again
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/1052926a-5b02-4c21-8022-3b6e70293c90" />

And it's done!
<img width="968" height="769" alt="image" src="https://github.com/user-attachments/assets/2b7828ab-a062-4822-999c-14aecae6bf90" />

To make sure PSSO configuration and its status, execute "app-sso platform -s"
This output will let you know the status of "Device Configuration, Login Configuration, User Configuration"
and here is a sample output
```txt
Time: 2026-04-25 09:03:41 +0000

Device Configuration:
 {
  "_deviceEncryptionKeyData" : "cOWoWq4pXq4/UaJwPK3TvHVm4OvgOEazqXXO4hsbtlA=",
  "_deviceSigningKeyData" : "6fGrW1oRRH2NYpiF8l9Jt2d7XL8r2pw5cCs9ucllfNo=",
  "allowDeviceIdentifiersInAttestation" : false,
  "authGracePeriodStart" : "2026-04-25T08:53:33Z",
  "authorizationEnabled" : false,
  "created" : "2026-04-25T09:03:41Z",
  "createUsersEnabled" : false,
  "deviceSigningCertificate" : "MIIDNzCCAh-gAwIBAgIQ9MKckfP92YVCmVKm8emb-jANBgkqhkiG9w0BAQsFADB4MXYwEQYKCZImiZPyLGQBGRYDbmV0MBUGCgmSJomT8ixkARkWB3dpbmRvd3MwHQYDVQQDExZNUy1Pcmdhbml6YXRpb24tQWNjZXNzMCsGA1UECxMkODJkYmFjYTQtM2U4MS00NmNhLTljNzMtMDk1MGMxZWFjYTk3MB4XDTI2MDQyNTA4MjQyNloXDTM2MDQyNTA4NTQyNlowLzEtMCsGA1UEAxMkNmE4MjYzN2UtNjkxMC00Y2U2LTllMjgtOTMxYWUzMmNlYjNlMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEDiJLalEIKmA55X7WFp8Yiq9ADtfiMLyCmhvp-iISgxK-fARpcWVVvBx-FUGaeAEV1WE3lZVtzpAir9zYfEnQOqOB0DCBzTAMBgNVHRMBAf8EAjAAMBYGA1UdJQEB_wQMMAoGCCsGAQUFBwMCMA4GA1UdDwEB_wQEAwIHgDAiBgsqhkiG9xQBBYIcAgQTBIEQfmOCahBp5kyeKJMa4yzrPjAiBgsqhkiG9xQBBYIcAwQTBIEQJCeb4Dr-EU-UXhPnHaEpIjAiBgsqhkiG9xQBBYIcBQQTBIEQ5nDeDTD0n0SLzvTQqeyipDAUBgsqhkiG9xQBBYIcCAQFBIECTkEwEwYLKoZIhvcUAQWCHAcEBASBATEwDQYJKoZIhvcNAQELBQADggEBAAX5_l96aeFk8nARqw7UqT7YLt4xkGU1PPp5Sg3EKYy-eG0MXZbeX5AUUYYWjo19kotutmig0HpqRNnKEZYZUkc8Ghajzoh3dHz7lrd40W-07-j97eVpDyqBRWkfBE0ZC8YQn14gETQmE5Tte2zE-RtJH1n1UJ7vfs4-aHH7E5FPncd4ewpst2YORJIbzxfUzUTpTqti2FbbkxeJgtVZgiYfA9Z_T4SiXo2ToJNGnkSFxur59QN1_2C4rTAwzHaRIeb-MwhPVhVtkqFxV4l7Ad_wIdNSI6tXMyj3bREJYGrIInbrt7yPjTcnrZmZBa7KlkxR7EkWn9Po5faXbjvXkfA",
  "encryptionAlgorithm" : "ECDHE-A256GCM",
  "extensionIdentifier" : "com.microsoft.CompanyPortalMac.ssoextension",
  "fileVaultPolicy" : "AttemptAuthentication (1)",
  "lastEncryptionKeyChange" : "2026-04-25T08:46:12Z",
  "loginFrequency" : 64800,
  "loginPolicy" : "None (0)",
  "loginType" : "POLoginTypePassword (1)",
  "newUserAuthorizationMode" : "None",
  "offlineGracePeriod" : "0 hours",
  "pendingEncryptionAlgorithm" : "none",
  "pendingSigningAlgorithm" : "none",
  "protocolVersion" : 1,
  "registrationCompleted" : true,
  "requireAuthGracePeriod" : "0 hours",
  "sdkVersionString" : 15.199999999999999,
  "sharedDeviceKeys" : true,
  "signingAlgorithm" : "ES256",
  "tokenToUserMapping" : {
    "AccountName" : "preferred_username",
    "FullName" : "name"
  },
  "unlockPolicy" : "None (0)",
  "userAuthorizationMode" : "None",
  "version" : 1
}

Login Configuration:
 {
  "accountDisplayName" : "Microsoft Entra",
  "additionalScopes" : "aza urn:aad:tb:update:prt/.default profile offline_access openid",
  "audience" : "login.microsoftonline.com",
  "clientID" : "29d9ed98-a469-4536-ade2-f981bc1d605e",
  "created" : "2026-04-25T09:03:41Z",
  "customKeyExchangeRequestBodyClaims" : {
    "aud" : "https://login.microsoftonline.com/0dde70e6-f430-449f-8bce-f4d0a9eca2a4/getkeydata"
  },
  "customKeyExchangeRequestHeaderClaims" : {
    "typ" : "JWT"
  },
  "customKeyExchangeRequestValues" : {
    "client_info" : "1",
    "prt_protocol_version" : "4.0",
    "tgt" : "true",
    "x-client-brkrver" : "3.16.2",
    "x-client-OS" : "15.6.0",
    "x-client-SKU" : "MSAL.OSX",
    "x-client-Ver" : "2.8.2"
  },
  "customKeyRequestBodyClaims" : {
    "aud" : "https://login.microsoftonline.com/0dde70e6-f430-449f-8bce-f4d0a9eca2a4/getkeydata"
  },
  "customKeyRequestHeaderClaims" : {
    "typ" : "JWT"
  },
  "customKeyRequestValues" : {
    "client_info" : "1",
    "prt_protocol_version" : "4.0",
    "tgt" : "true",
    "x-client-brkrver" : "3.16.2",
    "x-client-OS" : "15.6.0",
    "x-client-SKU" : "MSAL.OSX",
    "x-client-Ver" : "2.8.2"
  },
  "customLoginRequestHeaderClaims" : {
    "typ" : "JWT"
  },
  "customLoginRequestValues" : {
    "client_info" : "1",
    "prt_protocol_version" : "4.0",
    "tgt" : "true",
    "x-client-brkrver" : "3.16.2",
    "x-client-OS" : "15.6.0",
    "x-client-SKU" : "MSAL.OSX",
    "x-client-Ver" : "2.8.2"
  },
  "customNonceRequestValues" : {
    "client_info" : "1",
    "prt_protocol_version" : "4.0",
    "tgt" : "true",
    "x-client-brkrver" : "3.16.2",
    "x-client-OS" : "15.6.0",
    "x-client-SKU" : "MSAL.OSX",
    "x-client-Ver" : "2.8.2"
  },
  "customRequestJWTParameterName" : "request",
  "deviceContext" : "W9Hd21SqAlu7fZQo4ckJO6kB0X0RULTTgrkIpQtuoMg=",
  "federationMexURLKeypath" : "federation_metadata_url",
  "federationPredicate" : "account_type = 'Federated'",
  "federationRequestURN" : "urn:federation:MicrosoftOnline",
  "federationType" : 2,
  "federationUserPreauthenticationURL" : "https://login.windows.net/common/UserRealm?api-version=1.0&checkForMicrosoftAccount=false",
  "includePreviousRefreshTokenInLoginRequest" : true,
  "invalidCredentialPredicate" : "error = 'invalid_grant' AND suberror != 'device_authentication_failed'",
  "issuer" : "https://login.microsoftonline.com/0dde70e6-f430-449f-8bce-f4d0a9eca2a4/v2.0",
  "jwksEndpointURL" : "https://login.microsoftonline.com/0dde70e6-f430-449f-8bce-f4d0a9eca2a4/discovery/v2.0/keys",
  "kerberosTicketMappings" : [
    {
      "clientNameKeyName" : "cn",
      "encryptionKeyTypeKeyName" : "keyType",
      "messageBufferKeyName" : "messageBuffer",
      "realmKeyName" : "realm",
      "serviceNameKeyName" : "sn",
      "sessionKeyKeyName" : "clientKey",
      "ticketKeyPath" : "tgt_cloud"
    },
    {
      "clientNameKeyName" : "cn",
      "encryptionKeyTypeKeyName" : "keyType",
      "messageBufferKeyName" : "messageBuffer",
      "realmKeyName" : "realm",
      "serviceNameKeyName" : "sn",
      "sessionKeyKeyName" : "clientKey",
      "ticketKeyPath" : "tgt_ad"
    }
  ],
  "keyEndpointURL" : "https://login.microsoftonline.com/0dde70e6-f430-449f-8bce-f4d0a9eca2a4/getkeydata",
  "loginRequestEncryptionAlgorithm" : "ECDHE-A256GCM",
  "nonceResponseKeypath" : "Nonce",
  "previousRefreshTokenClaimName" : "previous_refresh_token",
  "serverNonceClaimName" : "request_nonce",
  "tokenEndpointURL" : "https://login.microsoftonline.com/0dde70e6-f430-449f-8bce-f4d0a9eca2a4/oauth2/v2.0/token",
  "uniqueIdentifierClaimName" : "oid",
  "userSEPKeyBiometricPolicy" : "None (0)"
}

User Configuration:
 {
  "_credential" : "xiGdITdgWluBQTB0DTCR+AhBmiLibf9eXwUClOoHKpQ=",
  "created" : "2026-04-25T09:03:41Z",
  "kerberosStatus" : [
    {
      "cacheName" : "F016800B-5C8B-4297-AAC5-326EE81F6067",
      "exchangeRequired" : false,
      "failedToConnect" : false,
      "importSuccessful" : true,
      "realm" : "KERBEROS.MICROSOFTONLINE.COM",
      "ticketKeyPath" : "tgt_cloud",
      "upn" : "cake1\\@cake.run.place@KERBEROS.MICROSOFTONLINE.COM"
    }
  ],
  "lastLoginDate" : "2026-04-25T09:00:16Z",
  "loginType" : "POLoginTypePassword (1)",
  "pendingSigningAlgorithm" : "none",
  "signingAlgorithm" : "ES256",
  "state" : "POUserStateNormal (0)",
  "uniqueIdentifier" : "B513CE5B-6676-415C-9710-7EBCCD28644A",
  "userDecryptionCertificate" : "MIIBljCCAT2gAwIBAgIBATAKBggqhkjOPQQDAjBBMR4wHAYDVQQDExVQbGF0Zm9ybSBTU08gLSB0ZXN0ZXIxCzAJBgNVBAYTAlVTMRIwEAYDVQQKEwlBcHBsZSBJbmMwHhcNMjYwNDI1MDkwMDE5WhcNMjcwNDI1MDkwMDE5WjBBMR4wHAYDVQQDExVQbGF0Zm9ybSBTU08gLSB0ZXN0ZXIxCzAJBgNVBAYTAlVTMRIwEAYDVQQKEwlBcHBsZSBJbmMwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAASSl1iLDFc7KBLHagULy62MRb7rvKZuqWqxm7gxC7yEjGSvlOA6yIrYDs3zc17_BSX6FYbAXNXbHK_YqB71adCNoyYwJDASBgNVHRMBAf8ECDAGAQH_AgEAMA4GA1UdDwEB_wQEAwIAADAKBggqhkjOPQQDAgNHADBEAiB3uBFpYqz6B2IXhpWDw--gcZ3pO7OGVE8U4XQVqaAW9QIgcanfXtoYbzheTYRXM_bw3PjFSKO7hnFxBsaDw9U39ws",
  "userDecryptionContext" : "5LNcPGFBScU1/ejysFLgPBMcovPmz1OL3wQhZcc7VIs=",
  "userDecryptionKeyHash" : "EC49216A179C9DBD5777CCEBC55EE7C870678A41",
  "userLoginConfiguration" : {
    "created" : "2026-04-25T09:03:41Z",
    "loginUserName" : "c***@cake.run.place"
  },
  "userUnlockCertificate" : "MIICjjCCAjOgAwIBAgIIPcTpaMrBlJgwCgYIKoZIzj0EAwIwgboxgbcwgbQGA1UEAx6BrABNAFMAIABQAGwAYQB0AGYAbwByAG0AIABLAGUAeQAgAEEAYwBjAGUAcwBzACAALQAgAGMAYQBrAGUAMQBAAGMAYQBrAGUALgByAHUAbgAuAHAAbABhAGMAZQAgAC0AIABbAGUAMAA5AGIAMgA3ADIANAAtAGYAZQAzAGEALQA0AGYAMQAxAC0AOQA0ADUAZQAtADEAMwBlADcAMQBkAGEAMQAyADkAMgAyAF0wHhcNMjYwNDI1MDkwMDE5WhcNMzYwNDI1MDkwMDE5WjCBujGBtzCBtAYDVQQDHoGsAE0AUwAgAFAAbABhAHQAZgBvAHIAbQAgAEsAZQB5ACAAQQBjAGMAZQBzAHMAIAAtACAAYwBhAGsAZQAxAEAAYwBhAGsAZQAuAHIAdQBuAC4AcABsAGEAYwBlACAALQAgAFsAZQAwADkAYgAyADcAMgA0AC0AZgBlADMAYQAtADQAZgAxADEALQA5ADQANQBlAC0AMQAzAGUANwAxAGQAYQAxADIAOQAyADIAXTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABK_LifDeVecznB-HUDGlG2c9Xaxs_fxUP2l-rld_1_57YxzHDUVuEVISH1Jr8pPsyJxzNCXplgRrArtFMf6yH_yjITAfMB0GA1UdDgQWBBTcl2HIMQ8WEsOqtcVC87JNmk10QzAKBggqhkjOPQQDAgNJADBGAiEAgcpQHMN3x1i9k-2ZOn2d7S1MVrMKQ5YJ2PbUwpKHXWcCIQDJvpJ_6NGPpwQ8imWC6noMWwwC9YO3cFLXzvbPiXW3GA",
  "userUnlockData" : "8hfvQrmU7XuAiA+UT7O8N10wG7FjDM4vWyrJSKZcSc4=",
  "userUnlockHash" : "DC9761C8310F1612C3AAB5C542F3B24D9A4D7443",
  "version" : 1
}

SSO Tokens:
Received:
2026-04-25T09:00:16Z
Expiration:
2026-05-09T09:00:15Z (Not Expired)

```

## Complete Company portal setup
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/91dd8345-4a8e-4fce-b0b1-4949084561d3" />

Note that PSSO Extension will sync both of your password of M365 account and local account
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/e77035bc-0c3f-4deb-84d8-da092b1d1b44" />

After set up, you can check the device status from the company portal.
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/e7492fb7-280d-4876-8c69-70f0253c665d" />

## TroubleShoot Checkpoint
We can use help menu from the Company portal
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/9a0f50c1-f542-4b55-8f5d-9db5cb5f1eae" />

And you can get the dianostics log let deep dive this logs another post
<img width="1012" height="813" alt="image" src="https://github.com/user-attachments/assets/638a21a8-3b24-4dab-99fd-c6c64ec0bda3" />










