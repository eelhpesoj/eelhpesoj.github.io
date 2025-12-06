---
---

# 1. Introduction
One of my clients want to deploy screen saver files and deploy automatically using intune.
So the task is:
1. Deploy screen saver(.scr) file to the specific path using Intune
2. Configure the screen saver profile using the deployed scr file.


# 2. Packing the .scr and .cmd
See referrence 1 and the microsoft github address is:
https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool

# 3. Deploy the file using .intunewin file
![](https://velog.velcdn.com/images/leeyosebi/post/b7dfd665-43c2-4685-92d0-8f9173bd3566/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/0b9d120b-88e1-4b67-9317-879170fa4d26/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/f410fdb9-d346-4e30-8c6f-4f06bf1c02e3/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/538bed4c-438a-468e-9631-28fe42fd5390/image.png)

# 3. Configuration Profile - Activation SCR
![](https://velog.velcdn.com/images/leeyosebi/post/fe28148d-71eb-4495-af52-c3823fce712e/image.png)

# 4. Notice
The activation of the screen saver time out have to be less than the power off time.


# Referrence
1. https://petervanderwoude.nl/post/deploy-customized-win32-apps-via-microsoft-intune/