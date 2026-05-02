---
title: "[Intune] Screen saver auto deployment"
categories:
  - Intune
---

# 1. Introduction
One of my clients want to deploy screen saver files and deploy automatically using intune.
So the task is:
1. Deploy screen saver(.scr) file to the specific path using Intune
2. Configure the screen saver profile using the deployed scr file.


# 2. Packing the .scr and .cmd
See referrence 1 and the microsoft github address is:
<https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool>

# 3. Deploy the file using .intunewin file
<img width="883" height="746" alt="image" src="https://github.com/user-attachments/assets/9ff1a2ff-cba8-44f6-93ac-23cc9c0b765c" />

<img width="883" height="746" alt="image" src="https://github.com/user-attachments/assets/56a793e4-8954-4ae0-8150-d98ce1392a9d" />

<img width="883" height="746" alt="image" src="https://github.com/user-attachments/assets/a33cdc8e-b41b-468f-8b65-d4fe5dc7c4d8" />

<img width="883" height="746" alt="image" src="https://github.com/user-attachments/assets/d5bc5697-d7a7-462e-a8d3-ee21c7c540fa" />


# 3. Configuration Profile - Activation SCR
<img width="961" height="560" alt="image" src="https://github.com/user-attachments/assets/358dfee3-f6ee-4392-8ce7-8c242077675f" />


# 4. Notice
The activation of the screen saver time out have to be less than the power off time.


# Referrence
1. <https://petervanderwoude.nl/post/deploy-customized-win32-apps-via-microsoft-intune/>
