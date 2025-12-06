---
---

# Source Code
https://github.com/leeyosebi/veryFirst


# How to make the Package
First up, you need to change directory where the source exsist.
![](https://velog.velcdn.com/images/leeyosebi/post/1af8c5be-c54b-4c2d-9a19-62a593111f86/image.png)

## 1.Compile(.class file creation)

```shell
javac NumberGuessingGame.java
```
![](https://velog.velcdn.com/images/leeyosebi/post/155ffdef-2738-4f0e-a30a-f8336436f987/image.png)


## 2. Check if it's working
```shell
java NumberGuessingGame
```
![](https://velog.velcdn.com/images/leeyosebi/post/c9950181-97ac-42b8-ab8f-c458f5856a59/image.png)


## 3. Create TXT in the source directory
You should add a blank line
```shell
Main-Class: NumberGuessingGame
 
```
![](https://velog.velcdn.com/images/leeyosebi/post/cf5c96cc-ab45-410a-94a9-f7614b9fc7f6/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/3e972803-4d86-4016-929c-9de8eae22a2d/image.png)



## 4. Create .jar file using all the class files
```shell
jar cfm NumberGuessingGame.jar manifest.txt *.class
```
![](https://velog.velcdn.com/images/leeyosebi/post/f39dd3ae-9591-4d37-ab92-88708ad215b1/image.png)

## 5. Execute the .jar file to check it's working
```shell
java -jar NumberGuessingGame.jar
```
![](https://velog.velcdn.com/images/leeyosebi/post/024d68e1-3051-4f4b-9349-4c5c48859de0/image.png)

## 6. Create .dmg file(Installation package file)
```shell
jpackage --name NumberGuessingGame --input . --main-jar NumberGuessingGame.jar --main-class NumberGuessingGame
```
![](https://velog.velcdn.com/images/leeyosebi/post/a230b662-8ac4-422c-9955-d44616e702a0/image.png)
![](https://velog.velcdn.com/images/leeyosebi/post/85bd6380-1c23-433c-aceb-8188391d8c87/image.png)

## #. Whole Command
![](https://velog.velcdn.com/images/leeyosebi/post/279c05f9-aa6d-4467-bca6-82d7767bef81/image.png)

