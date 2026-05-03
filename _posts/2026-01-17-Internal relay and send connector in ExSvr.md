---
title: "Internal relay and send connector in ExSvr"
categories:
  - On-Premises
  - Exchange Server
---

# 0. Overview

In many business cases, the company has two mail organisation with the same domain.
In this case, how can we route the messages?

There are so many architect for solutions. But I want to focus on the simple feature of the ExSvr.

Here is a As-is and To-be:
<img width="1006" height="1040" alt="image" src="https://github.com/user-attachments/assets/05be9cba-6977-4cdf-87f6-f53a2d23760f" />

<img width="2532" height="1548" alt="image" src="https://github.com/user-attachments/assets/c33bba7f-8d00-48e2-b0dd-9f53ec753c3a" />



So, the point here is you have to change the domain type from authoritative to Internal relay.
Let's find out what's should be done.


# 1. Domain types in Accepted domain
ref)
- <https://learn.microsoft.com/en-us/exchange/mail-flow/accepted-domains/accepted-domains#recipient-lookup-in-accepted-domains>
- <https://learn.microsoft.com/en-us/exchange/mail-flow/accepted-domains/accepted-domain-procedures>

We can create the domain name space which define how the exchange server transport message delivery.

The default type is Authoritative which means the recipient using this domain only exist in this mail organisation.

But the case we address now is quite different.
We have to go with Internal relay at this time.

If we set the domain as internal relay, this means, "Some recipients in the internal relay domain might exist in the Exchange organization."

<img width="1644" height="1482" alt="image" src="https://github.com/user-attachments/assets/ee88f251-50c6-408a-b458-510fe27f7cc7" />




# 2. Send connector
From the microsoft document, the internal relay domain can be used with sedn connector to source the recipients.
<img width="1584" height="718" alt="image" src="https://github.com/user-attachments/assets/6f44b0b5-7356-4eb1-8dbd-690a80e9629d" />



<img width="1744" height="1514" alt="image" src="https://github.com/user-attachments/assets/6744b4ad-35ac-4bc3-905d-f8d76b2b5706" />

<img width="1262" height="804" alt="image" src="https://github.com/user-attachments/assets/1e395e1a-cc6b-499a-b21d-0e7577db95d6" />



# 3. Result
Cakeadmin sends a message to cake3@all.run.place and alladmin@all.run.place.
We can check from the message header from each delivered messages.

<img width="1648" height="290" alt="image" src="https://github.com/user-attachments/assets/69f5cc81-1ac5-434c-a7b6-4ebece8fadae" />


from cake3@all.run.place:
<img width="1648" height="290" alt="image" src="https://github.com/user-attachments/assets/8f0ec950-de6b-46e7-bbd8-994d4df89852" />


from alladmin@all.run.place:
<img width="1654" height="490" alt="image" src="https://github.com/user-attachments/assets/c9853dcf-bec7-4f12-8dc0-a094c05f1fb2" />



Hope this can help you guys!
