---
---

# Summary
One of my client request to reslove this error.
He was facing this error since he had changed his password.
![](https://velog.velcdn.com/images/leeyosebi/post/d70f42d3-3df0-4e94-b7f3-d6b1153e7e56/image.png)

---

# Procedure
1. Run 'Command Prompt' as an administrator

2. Turn off BitLocker on the target drive.
Use this command.
```
C:\WINDOWS\system32> manage-bde.exe -off C:
C:\WINDOWS\system32> manage-bde.exe -status
```
![](https://velog.velcdn.com/images/leeyosebi/post/a4d77574-3be1-46fa-9480-c3b9a06d2e3e/image.png)

3. Keep checking the Conversion Status until it Fully Decrypted
```
C:\WINDOWS\system32> manage-bde.exe -status
```
![](https://velog.velcdn.com/images/leeyosebi/post/9cfdbb4b-db56-4df0-bb44-6cc144fbc75c/image.png)

4. Click 'Sync' button under the company account which was controlly by intune.
![](https://velog.velcdn.com/images/leeyosebi/post/d6f4ef65-d99f-4804-a853-5a03e3b7bdda/image.png)

5. Once you click 'Sync' button, check the disk encryption status.
The encryption is starting by the intune policy.