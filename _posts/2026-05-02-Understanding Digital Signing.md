---
title: "Understanding Digital Signing"
categories:
  - Security
  - PKI
---

# 0. Overview
You've probably seen a message like "This software is from a trusted publisher" — or the opposite, a Windows Defender warning that says "This file has no digital signature." The mechanism behind both of those is **code signing**.
The fastest way to understand code signing is to compare it with HTTPS, which most developers are already familiar with. Both use a public/private key pair, but they use those keys in opposite directions — and that difference is everything.

- Related post: <https://eelhpesoj.github.io/AD-CA-Setup-&-Sign-intune-PowerShell-Script/>
- Ref: <https://learn.microsoft.com/ko-kr/previous-versions/windows/internet-explorer/ie-developer/platform-apis/ms537361(v=vs.85)>



# 1. HTTPS — "Only You Should Be Able to Read This"

The goal of HTTPS is **confidentiality**. It prevents a third party from reading data in transit between a client and a server.

<img width="1234" height="536" alt="image" src="https://github.com/user-attachments/assets/12e3d31c-0718-4d46-b37a-2ce5e3403545" />


Here's how it works:

1. The server obtains a certificate from a CA (Certificate Authority). That certificate contains the server's **public key**.
2. During the TLS handshake, the server sends this certificate to the client.
3. The client **encrypts** data using the public key and sends it.
4. Only the server, which holds the **private key**, can decrypt it.

The direction is: `public key → encrypt`, `private key → decrypt`. Anyone can encrypt with a public key, but only the server can decrypt.

---

# 2. Code Signing — "This Code Is Mine, and It Hasn't Been Touched"

The goal of code signing is **integrity + authenticity** — not confidentiality. It doesn't hide the contents of the code. It proves that the code is exactly what the publisher originally distributed, with nothing changed.

The direction is the reverse of HTTPS. The publisher **signs with a private key**, and the recipient **verifies with a public key**.

<img width="1234" height="798" alt="image" src="https://github.com/user-attachments/assets/cea36e1c-cb12-45c4-a2a2-1cedfa9b00c2" />


Here's the full flow:

**Publisher side (signing)**

1. Run the code (binary or script) through a hash function such as SHA-256, producing a fixed-length digest.
2. **Encrypt that hash with the private key.** This encrypted hash is the digital signature.
3. Distribute the code, the certificate, and the signature together.

**Client side (verification)**

1. Run the received code through the same hash function (SHA-256). → **Hash B**
2. **Decrypt the signature using the public key** from the certificate. This recovers the original hash. → **Hash A**
3. If `Hash A == Hash B`, the check passes. The code has not been modified — not even a single bit — and it was signed by the claimed publisher.

Note that the code itself is never encrypted. Anyone can read it. What matters is proving it hasn't been tampered with.

---

# 3. HTTPS vs Code Signing — Side by Side

| | HTTPS | Code Signing |
|---|---|---|
| Goal | Confidentiality (hide the content) | Integrity + authenticity (detect tampering) |
| Who encrypts | Client (with public key) | Publisher (with private key) |
| Who decrypts | Server (with private key) | Client (with public key) |
| Key direction | public → private | private → public |

---

# 4. PowerShell Script Signing

This mechanism isn't limited to compiled software. The same PKI-based approach applies directly to PowerShell scripts on Windows.

When PowerShell's execution policy is set to `AllSigned` or `RemoteSigned`, any unsigned script will be blocked before it runs. In enterprise environments, this policy is typically enforced to ensure that only scripts from trusted publishers can execute — a meaningful defense against supply chain attacks.

Signing a script is straightforward:

```powershell
# Retrieve a code-signing certificate from the current user's certificate store
$cert = Get-ChildItem -Path Cert:\CurrentUser\My -CodeSigningCert

# Sign the script
Set-AuthenticodeSignature -FilePath ".\deploy.ps1" -Certificate $cert
```

Once signed, PowerShell automatically appends a signature block to the end of the script file:

```
# SIG # Begin signature block
# MIIFxAYJKoZIhvcNAQcCoIIFtTCCBbECAQExDzANBglghkgBZQMEAgEFADB5Bgor
# ...
# SIG # End signature block
```

This block is the digital signature. Before executing the script, the PowerShell runtime decrypts it using the public key from the certificate and compares the result against a fresh hash of the script body. If even a single character has been changed — whether accidentally or maliciously — the hashes won't match, and execution is blocked.

---

# 5. Summary

- HTTPS: **encrypt with public key** → decrypt with private key (confidentiality)
- Code signing: **sign with private key** → verify with public key (integrity)
- The code itself is not encrypted — only the **hash of the code** is signed
- PowerShell scripts follow the same PKI-based signing and verification model
- A signed script is blocked the moment a single character is modified

Code signing is a foundational layer of software supply chain security. Every time you run a program or a script, this mechanism is quietly working in the background — making sure what you're running is exactly what the publisher intended.
