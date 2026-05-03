---
title: "Understanding PKI and Digital Certificates"
categories:
  - Security
  - PKI
---


# 0. Overview

Before we talk about code signing or HTTPS, there's a foundational layer worth understanding: the certificate ecosystem itself. Terms like PKI, X.509, Root CA, PKCS, CMS, and CSP appear constantly in security documentation, yet rarely get explained together in a way that shows how they relate to each other.

This post maps out that ecosystem — and uses the analogy of a passport to make it concrete.


# 1. The Big Picture — Think of a Passport

Before diving into acronyms, here's the analogy that ties everything together.

When you travel internationally, your identity is verified through a **passport**. That passport:

- Follows an **international standard** (ICAO Doc 9303) so every country can read it
- Is issued by an **official government authority** (e.g. Ministry of Foreign Affairs)
- Was applied for by **you**, through a formal process
- Contains your **identity information**, stamped and signed
- Is verified at **border control** before you're allowed in

Digital certificates work the same way — just for software and systems instead of people.

| Passport world | Certificate world |
|---|---|
| ICAO international standard | PKI / X.509 standard |
| Ministry of Foreign Affairs | Root CA (Certificate Authority) |
| Passport office | Intermediate CA |
| Passport application | CSR (Certificate Signing Request) |
| Issued passport | Digital certificate (.cer / .pfx) |
| Official stamp | Digital signature |
| Border control | CSP (Cryptographic Service Provider) |

With this analogy in mind, let's look at each component.

The PKI System:
<img width="1234" height="980" alt="image" src="https://github.com/user-attachments/assets/cc14555c-f5b0-4361-a0e6-462d5e99f522" />

Compare with the real world:
<img width="1234" height="1052" alt="image" src="https://github.com/user-attachments/assets/a41201d0-8701-4f9a-8e4b-a0070e259144" />

# 2. PKI — Public Key Infrastructure

PKI is the overall framework — the rules, roles, and processes that make digital trust possible. It's not a single product or protocol; it's an ecosystem.

PKI defines:
- How key pairs (public + private) are generated and managed
- Who is allowed to issue certificates and under what conditions
- How certificates are validated and revoked
- How trust is chained from a root authority down to an end entity

Think of PKI as the **international treaty** that makes passports work across borders. No single country invented it — it's a shared system of agreed rules.


# 3. X.509 — The Certificate Standard

X.509 is the specific standard that defines what a digital certificate looks like: what fields it contains, how they're encoded, and how the signature is applied.

A typical X.509 certificate includes:

- **Subject** — who the certificate belongs to (e.g. a domain, an organization, a person)
- **Issuer** — which CA signed and issued it
- **Public key** — the subject's public key
- **Validity period** — not before / not after dates
- **Serial number** — unique identifier within the issuing CA
- **Signature** — the CA's digital signature over all the above fields

This is the passport booklet itself. The format is standardized so any system — regardless of vendor or platform — can read and validate it.

Common file formats:

| Format | Contents |
|---|---|
| `.cer` / `.crt` / `.pem` | Certificate only (public key) |
| `.key` | Private key |
| `.pfx` / `.p12` | Certificate + private key bundled (PKCS#12) |


# 4. Root CA and the Chain of Trust

A **Certificate Authority (CA)** is the organization that verifies identities and issues certificates. But not all CAs are equal — they're organized into a hierarchy.

**Root CA** sits at the top. It is unconditionally trusted because operating systems and browsers ship with a pre-installed list of trusted Root CAs (called a **trust store**). A Root CA's certificate is self-signed — it vouches for itself.

**Intermediate CA** sits between the Root CA and the end entity. In practice, Root CAs almost never issue certificates directly. Instead, they sign Intermediate CA certificates, and those Intermediate CAs do the day-to-day work of issuing certificates. This limits the exposure of the Root CA's private key.

**End-entity certificate** is the certificate issued to a specific domain, organization, or person.

This structure is the **chain of trust**:

```
Root CA
  └── Intermediate CA
        └── End-entity certificate (your website, your app, your script)
```

Returning to the passport analogy: the Root CA is the Ministry of Foreign Affairs — the ultimate authority. The Intermediate CA is the passport office that processes applications on its behalf. The end-entity certificate is the passport issued to you.

When a browser or OS validates a certificate, it walks up this chain until it reaches a trusted Root CA. If the chain is intact and the Root CA is trusted, the certificate is trusted.


# 5. PKCS — Public Key Cryptography Standards

PKCS is a family of standards published by RSA Security (now maintained by industry) that define the technical formats and protocols used within PKI. There are numbered from PKCS#1 through PKCS#15, each covering a different aspect.

The ones you'll encounter most often:

| Standard | What it defines |
|---|---|
| **PKCS#1** | RSA encryption and signature format |
| **PKCS#7** | Syntax for signed and encrypted messages (superseded by CMS) |
| **PKCS#10** | Format of a Certificate Signing Request (CSR) |
| **PKCS#11** | API for hardware cryptographic tokens (HSMs, smart cards) |
| **PKCS#12** | Bundle format for certificate + private key (the `.pfx` / `.p12` file) |

PKCS#10 is what you create when you apply for a certificate — you generate a key pair, put your identity information into a CSR (formatted per PKCS#10), and submit it to a CA. The CA verifies it and issues an X.509 certificate in return.

PKCS#12 is what you get at the end of the process if you need to carry both the certificate and the private key together — useful for installing on a web server or deploying a code-signing certificate.

Back to the passport analogy: PKCS is the **set of official forms and procedures** — the application form (PKCS#10), the booklet format (PKCS#12), the stamping protocol (PKCS#1).


# 6. CMS — Cryptographic Message Syntax

CMS (defined in RFC 5652) is the standard that describes how to **package data along with its cryptographic information** — signatures, encrypted content, and certificates — into a single structured object.

When you sign a PowerShell script or a software binary, the resulting signature block is formatted as CMS. It contains:

- The signed content (or a reference to it)
- The signer's certificate
- The digital signature itself
- Optionally, the certificates needed to build the chain of trust

CMS evolved from PKCS#7, and the two terms are sometimes used interchangeably, though CMS is the more current standard.

Think of CMS as the **diplomatic envelope** — a standardized container that carries the passport (certificate), the stamp (signature), and the document (content) all together in a way that any recipient can verify.


# 7. CSP — Cryptographic Service Provider

A CSP is an OS-level module that performs the actual cryptographic operations: generating key pairs, storing private keys securely, signing data, and verifying signatures.

On Windows, the classic CSP model is exposed through the **CryptoAPI**. Modern Windows also supports the **CNG (Cryptography API: Next Generation)** model, which uses Key Storage Providers (KSPs) instead of CSPs — but the concept is the same.

When you run `Set-AuthenticodeSignature` in PowerShell, you're not writing the cryptographic logic yourself. The PowerShell runtime calls Windows, which delegates to the appropriate CSP or KSP. The CSP accesses the private key (which may be stored in the Windows certificate store, or on a hardware token like a YubiKey or HSM), performs the signing operation, and returns the signature.

The private key itself never leaves the CSP. You hand the CSP data to sign, and it hands back a signature — the key stays protected inside.

In the passport analogy: the CSP is **border control**. It's the system that performs the actual verification at the point of use — checking that the document is valid, that the signature matches, and that the key used to produce it is trusted.


# 8. How It All Fits Together

Here's the full lifecycle of a certificate, mapped to both the technical terms and the passport analogy:

1. **Generate a key pair** — you create a public/private key pair locally (you apply for a passport)
2. **Create a CSR (PKCS#10)** — you package your public key and identity info into a signing request (you fill out the application form)
3. **Submit to a CA** — the CA verifies your identity (the passport office checks your documents)
4. **CA issues an X.509 certificate** — signed with the CA's private key, chained to a Root CA (the Ministry issues your stamped passport)
5. **Distribute the certificate** — bundled with your software, website, or script (you carry your passport when you travel)
6. **Client verifies at runtime via CSP** — the OS validates the chain of trust and checks the signature (border control scans your passport and checks it against the database)


# 9. Summary

| Term | Role | Passport equivalent |
|---|---|---|
| **PKI** | Overall trust framework | International passport treaty |
| **X.509** | Certificate format standard | Passport booklet format |
| **Root CA** | Top-level trust anchor | Ministry of Foreign Affairs |
| **Intermediate CA** | Day-to-day certificate issuer | Passport office |
| **CSR (PKCS#10)** | Certificate application | Passport application form |
| **PKCS#12** | Certificate + key bundle | Passport + visa in one wallet |
| **CMS** | Signed/encrypted message container | Diplomatic envelope |
| **CSP** | OS crypto engine | Border control |

These components don't operate in isolation — they form a chain. PKI sets the rules, X.509 defines the format, Root CA anchors the trust, CAs issue the certificates, PKCS defines the data formats along the way, CMS packages the signed output, and CSP performs the verification at the point of use.

Understanding this chain is what makes code signing, HTTPS, and PowerShell script signing feel like variations on the same theme — because they are.
