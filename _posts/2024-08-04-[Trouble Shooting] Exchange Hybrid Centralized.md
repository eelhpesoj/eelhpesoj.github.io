---
title: "[Trouble Shooting] Exchange Hybrid Centralized"
---

# Issue 

In the client's environment, multiple branches were using Exchange Hybrid within a single tenant,** with all Exchange environments centralized.**

We planned to deploy another branch's Exchange Hybrid in this environment. The centralized configuration involves setting the MX record (port 25 communication) to point to the on-premises Exchange server so that all mail flow is handled by the on-premises Exchange server instead of EXO.

Typically, the MX record is set to point to a spam filter device in front of the on-premises Exchange server to avoid exposing the Exchange server directly to the internet.

However, in this branch's case, there was no spam filter device, so we designed the architecture to set the MX record to EXO to somewhat protect the on-premises Exchange server.

In this process, there was no need to stick to a centralized configuration, so we deployed without considering it when running HCW.

However, during this process, the Connector did not work properly. Although it met the conditions, it did not function as expected.

After almost 8 hours of troubleshooting, we finally redeployed HCW with a centralized configuration and only set the MX record to EXO for mail testing. This time, the Connector worked properly.

It seems that if the Exchange hybrid is initially configured with a centralized configuration, all subsequently deployed Exchange Hybrids must also be configured centrally.

Although it should have been obvious that the Connector would work, we could have opened a case with Microsoft or complained, but understanding it this way helps maintain peace of mind.

# Solution
```shell
'Problematic Configuration'
[Internet]
→ [MX Record (EXO)] 
→ [On-Premises Exchange Server (Branch)]

'Corrected Configuration'
[Internet] 
→ [MX Record (EXO)] 
→ [Centralized On-Premises Exchange Server] 
→ [Branch On-Premises Exchange Server]
```



# Reference

1. centralized mail transport enabled
<img width="690" height="532" alt="image" src="https://github.com/user-attachments/assets/74d5cc5a-c7e8-44c8-9ad7-74478a07afdd" />


2. centralized mail transport disabled (default configuration)
<img width="690" height="532" alt="image" src="https://github.com/user-attachments/assets/4c0c6ad2-e79b-4e75-a2a5-06c437375605" />


3. Document:
<https://learn.microsoft.com/en-us/exchange/transport-routing>
