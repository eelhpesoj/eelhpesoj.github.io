---
title: "[Intune] TroubleShooting- BitLocker recovery key"
---

# Summary
One of my client request to reslove this error.
He was facing this error since he had changed his password.
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ac226527-9aa2-4723-8cc5-a83597286c16" />


---

# Procedure
1. Run 'Command Prompt' as an administrator

2. Turn off BitLocker on the target drive.
Use this command.
```
C:\WINDOWS\system32> manage-bde.exe -off C:
C:\WINDOWS\system32> manage-bde.exe -status
```
<img width="624" height="483" alt="image" src="https://github.com/user-attachments/assets/a4c4ae0f-e58e-4434-84ab-7ae989d605cc" />


3. Keep checking the Conversion Status until it Fully Decrypted
```
C:\WINDOWS\system32> manage-bde.exe -status
```
<img width="613" height="354" alt="image" src="https://github.com/user-attachments/assets/e53be495-d5c7-4fb0-97fe-f4be3300c891" />


4. Click 'Sync' button under the company account which was controlly by intune.
<img width="893" height="696" alt="image" src="https://github.com/user-attachments/assets/204f090b-fd25-4d1e-938a-71a45bac96d7" />


5. Once you click 'Sync' button, check the disk encryption status.
The encryption is starting by the intune policy.
