---
---



```shell
openssl pkcs12 -export -certpbe PBE-SHA1-3DES -keypbe PBE-SHA1-3DES -nomac -inkey contoso.com.key -in contoso.com.crt -out contoso.com-legacy.pfx
```