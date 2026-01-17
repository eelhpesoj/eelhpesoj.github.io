# 0. Overview

In many business cases, the company has two mail organisation with the same domain.
In this case, how can we route the messages?

There are so many architect for solutions. But I want to focus on the simple feature of the ExSvr.

Here is a As-is and To-be:
![](https://velog.velcdn.com/images/leeyosebi/post/8b4353ea-d307-4c1d-81be-769e2212459b/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/6d854180-72d8-4928-9525-ed8fbe588833/image.png)


So, the point here is you have to change the domain type from authoritative to Internal relay.
Let's find out what's should be done.


[Index]
1. Domain types in Accepted domain
2. Send connector
3. Result


# 1. Domain types in Accepted domain
ref)
- https://learn.microsoft.com/en-us/exchange/mail-flow/accepted-domains/accepted-domains#recipient-lookup-in-accepted-domains
- https://learn.microsoft.com/en-us/exchange/mail-flow/accepted-domains/accepted-domain-procedures

We can create the domain name space which define how the exchange server transport message delivery.

The default type is Authoritative which means the recipient using this domain only exist in this mail organisation.

But the case we address now is quite different.
We have to go with Internal relay at this time.

If we set the domain as internal relay, this means, "Some recipients in the internal relay domain might exist in the Exchange organization."

![](https://velog.velcdn.com/images/leeyosebi/post/c21f5181-0bf3-40ac-9488-59cd44489b8c/image.png)



# 2. Send connector
From the microsoft document, the internal relay domain can be used with sedn connector to source the recipients.
![](https://velog.velcdn.com/images/leeyosebi/post/157b1bcf-7ddb-4382-a89b-0dd101fa25b9/image.png)


![](https://velog.velcdn.com/images/leeyosebi/post/537796c2-a71d-4552-af31-73610118ef3e/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/5a869e23-a0e4-442d-8efa-3f6b2f088a02/image.png)


# 3. Result
Cakeadmin sends a message to cake3@all.run.place and alladmin@all.run.place.
We can check from the message header from each delivered messages.

![](https://velog.velcdn.com/images/leeyosebi/post/b575ff1b-ea90-4ce0-b395-9285e85efde7/image.png)

from cake3@all.run.place:
![](https://velog.velcdn.com/images/leeyosebi/post/62de8b4d-a4ef-40b8-bbe3-46bce74c441f/image.png)

from alladmin@all.run.place:
![](https://velog.velcdn.com/images/leeyosebi/post/aa37073b-9dae-48c7-8351-dccd35170b70/image.png)


Hope this can help you guys!