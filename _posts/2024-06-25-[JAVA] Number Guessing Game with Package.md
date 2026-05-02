---
title: "[JAVA] Number Guessing Game with Package"
---

# Source Code
<https://github.com/leeyosebi/veryFirst>


# How to make the Package
First up, you need to change directory where the source exsist.
<img width="1956" height="1096" alt="image" src="https://github.com/user-attachments/assets/27352222-f7ff-4588-b10e-3f78a9b51ea2" />


## 1.Compile(.class file creation)

```shell
javac NumberGuessingGame.java
```
<img width="1956" height="1096" alt="image" src="https://github.com/user-attachments/assets/3507ad32-b81e-45b9-a1bd-06fa6c345cb5" />



## 2. Check if it's working
```shell
java NumberGuessingGame
```
<img width="1432" height="746" alt="image" src="https://github.com/user-attachments/assets/0908773c-d472-416a-bd4c-b2500b6d2b8e" />



## 3. Create TXT in the source directory
You should add a blank line
```shell
Main-Class: NumberGuessingGame
 
```
<img width="1372" height="534" alt="image" src="https://github.com/user-attachments/assets/9a80d42d-949e-4b08-ac47-fe950fec0af3" />

<img width="1956" height="1096" alt="image" src="https://github.com/user-attachments/assets/be71642a-e0a2-45b4-8423-bfd6da9b3a17" />




## 4. Create .jar file using all the class files
```shell
jar cfm NumberGuessingGame.jar manifest.txt *.class
```
<img width="1956" height="1096" alt="image" src="https://github.com/user-attachments/assets/05a4eb84-f720-4ecb-8dec-c391f824da8e" />


## 5. Execute the .jar file to check it's working
```shell
java -jar NumberGuessingGame.jar
```
<img width="1544" height="780" alt="image" src="https://github.com/user-attachments/assets/7bfe55e8-c686-4600-87cd-4b5898abb1f0" />


## 6. Create .dmg file(Installation package file)
```shell
jpackage --name NumberGuessingGame --input . --main-jar NumberGuessingGame.jar --main-class NumberGuessingGame
```
<img width="1460" height="998" alt="image" src="https://github.com/user-attachments/assets/8753dc3c-9b9e-405a-a8f9-a180874dc6e2" />

<img width="1384" height="818" alt="image" src="https://github.com/user-attachments/assets/29184bf5-cbcd-4304-82fb-45ec41cc20b7" />


## #. Whole Command
<img width="1454" height="386" alt="image" src="https://github.com/user-attachments/assets/a5520ee9-7e96-4d6b-a0fc-72260ea6d3fd" />


