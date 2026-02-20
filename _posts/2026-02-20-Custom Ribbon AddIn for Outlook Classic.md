# 0. Overview
In this post, I will share how to create Custom Ribbon AddIn to Outlook Classic.
Hope this demo can help you!

Project repository: https://github.com/eelhpesoj/OutlookAddIn1

[Index]
1. Installation Visual Studio
2. Create project and Add-in setup
3. Debug and Publish
4. Install and Results


# 1. Installation Visual Studio
First up first, you need a visual studio.
You don't need a enterprise version or something.
Community version is totaly fine.

Download installer: https://visualstudio.microsoft.com/vs/community/

Install "Visual Studio Community 2026"
![](https://velog.velcdn.com/images/leeyosebi/post/70971819-dd02-476e-b2cf-7d0647c1c48b/image.png)

Select "Microsoft 365 development"
![](https://velog.velcdn.com/images/leeyosebi/post/cfcdfb8c-483f-4b03-bfe2-387e7c7b5ff7/image.png)

![](https://velog.velcdn.com/images/leeyosebi/post/c54fe2a0-408d-4edb-ae5f-073d08241ec5/image.png)

Launch it when it's done
![](https://velog.velcdn.com/images/leeyosebi/post/f7dd8254-fec5-4229-9a56-0696816ac8c7/image.png)

Sign in. Recommended to use github.
![](https://velog.velcdn.com/images/leeyosebi/post/b2402ba9-65f1-4a67-b300-d9f231110720/image.png)

![](https://velog.velcdn.com/images/leeyosebi/post/e2121ccd-9272-455e-ac5e-1686697b8824/image.png)



# 2. Create project and Add-in setup
Create new project
![](https://velog.velcdn.com/images/leeyosebi/post/553a7424-5414-467b-ba54-dcb666f51c8b/image.png)

Search "outlook" and select "Outlook VSTO Add-ins"
![](https://velog.velcdn.com/images/leeyosebi/post/7f8ddb9d-c031-4b89-80ee-31c2d963ddaa/image.png)

Create
![](https://velog.velcdn.com/images/leeyosebi/post/d058bf51-edad-4778-9f5a-da66e73bab0a/image.png)

From the top of the project name, right click and add New item.
![](https://velog.velcdn.com/images/leeyosebi/post/6f88b7f5-462f-4abf-9992-296759290d2e/image.png)

Show all templates
![](https://velog.velcdn.com/images/leeyosebi/post/2f705e11-e321-4d07-a444-5534633065b9/image.png)

Find Ribbon(Visual Designer)
![](https://velog.velcdn.com/images/leeyosebi/post/607fdb42-8b99-4056-a211-507b6478ce32/image.png)

Once you add new item with the template, you can see the similar one with the outlook ribbon.
This is a visual editor as the template describes.
On the Ribbon1, right click and select Properties.
![](https://velog.velcdn.com/images/leeyosebi/post/6203f086-2285-4c63-b447-e41d81f4af5d/image.png)

And select the Ribbon type as "Microsoft.Outlook.Explorer" which means the custom ribbon will be located in the what I called "home" in the outlook. The default ribbon when you open the outlook.
You can also set the ribbon only when you compose email or something elsewhere. Please search it from the Microsoft document.
https://learn.microsoft.com/en-us/visualstudio/vsto/customizing-a-ribbon-for-outlook?view=visualstudio&tabs=csharp
![](https://velog.velcdn.com/images/leeyosebi/post/7c4127f9-2409-41b6-b893-612825ade414/image.png)

Set a tab name
![](https://velog.velcdn.com/images/leeyosebi/post/65ab6c29-b013-4471-9be2-0d37427d01c6/image.png)

Set a group name
![](https://velog.velcdn.com/images/leeyosebi/post/2e650606-4358-4cf4-94c4-0819760dfdd0/image.png)

From the "veiw", open the "tool box"
![](https://velog.velcdn.com/images/leeyosebi/post/e2609aa2-d46d-45cb-897f-d35b1356ff2d/image.png)

Drag "button" and drop to the "Help?(group)"
![](https://velog.velcdn.com/images/leeyosebi/post/d465cf50-72ae-4cad-8b3b-fad3b6ce337e/image.png)

Customize the button. Set the image and button name.
![](https://velog.velcdn.com/images/leeyosebi/post/c5ced9c5-58d7-441e-b80b-7d0fb4fbac89/image.png)

If you double click the button, you can define the action.
In this case, I will just open the website using the system default browser.
![](https://velog.velcdn.com/images/leeyosebi/post/fd0f872b-a776-49bd-884e-c0436d6a7114/image.png)
Here is the whole code:
````csharp
//Ribbon1.cs
using Microsoft.Office.Tools.Ribbon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OutlookAddIn1
{
    public partial class Ribbon1
    {
        private void Ribbon1_Load(object sender, RibbonUIEventArgs e)
        {

        }

        private void button1_Click(object sender, RibbonControlEventArgs e)
        {
            // URL
            string url = "https://www.google.com";

            try
            {
                // SYSTEM DEFAULT BROWSER
                System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo
                {
                    FileName = url,
                    UseShellExecute = true
                });
            }
            catch (Exception ex)
            {
                System.Windows.Forms.MessageBox.Show("ERROR: " + ex.Message);
            }
        }
    }
}
````
And you can start a debug if this ribbon is ready to publish or not. Press F5 or the Start button.

# 3. Debug and Publish
The classic outlook will be launched automatically and the temp .dll file addin.
![](https://velog.velcdn.com/images/leeyosebi/post/3b125f31-5451-4a09-9bf7-617af7f14a9a/image.png)

You can see the addin we created. If the button works nomally and looks fine, close the outlook. and the debug mode will be terminated automatically as well.
![](https://velog.velcdn.com/images/leeyosebi/post/613ffe05-d759-4c19-a659-095c7e7cf604/image.png)

And go back to the Visual Studio. From the top of the project name, right click and select "Publish".
![](https://velog.velcdn.com/images/leeyosebi/post/000e925e-7c36-4762-af59-d7df6f0b35a6/image.png)

Browse where you want to pulish the installation file.
![](https://velog.velcdn.com/images/leeyosebi/post/4f0cf75a-e92b-4385-9495-3f6557ffe389/image.png)

Select the last option
![](https://velog.velcdn.com/images/leeyosebi/post/67c60561-6ce3-46f3-a644-6d4682a1bf94/image.png)

Click finish 
![](https://velog.velcdn.com/images/leeyosebi/post/a8e1af5f-0a10-4ce1-880a-6c76c3a35976/image.png)

# 4. Install and Results
When you finisth the publish, you can get the three things as shown in the image.
To install the custom addin, those three files has to located in the same directory.
And execute the "setup.exe".
![](https://velog.velcdn.com/images/leeyosebi/post/e2bf980c-77af-481e-86f2-70d56f7d5fa5/image.png)

We didn't sign the installation file, you may encounter that this is not a trusted publisher. But still you can proceed.
![](https://velog.velcdn.com/images/leeyosebi/post/4312e4fa-7338-4b79-b590-9eb89fb5e3b7/image.png)

![](https://velog.velcdn.com/images/leeyosebi/post/838371c0-713f-49d1-a963-66837c8096e3/image.png)

After the installation has done successfully, you can check from the "Programm and features".
![](https://velog.velcdn.com/images/leeyosebi/post/8eba50f0-5f65-48b4-9dfa-7d6419be3adb/image.png)

Now, open the outlook classic.
![](https://velog.velcdn.com/images/leeyosebi/post/81d07b92-fc30-4911-b81a-f53f25f589bf/image.png)

You can see the addin
![](https://velog.velcdn.com/images/leeyosebi/post/7bafe08d-60f9-4ef8-9e54-5e063579b2cb/image.png)

And you can see the addin list from "Files > Options"
![](https://velog.velcdn.com/images/leeyosebi/post/981b2fc2-ee09-415a-b269-9c5aac0bc4d8/image.png)

Customize Ribbon as well
![](https://velog.velcdn.com/images/leeyosebi/post/eb8909d8-47f8-4055-a2f0-f99749ce05d5/image.png)

So, this is it.
This whole process is just a demo, maybe you can set the URL as you want like internal private website like or anything.
Maybe you can set the link and set the cname where you want to forwarding to a specific link using internal dns obvisouly.
