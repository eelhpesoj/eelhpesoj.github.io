# 0. Overview
In this post, I will share how to create Custom Ribbon AddIn to Outlook Classic.
Hope this demo can help you!

Project repository: 
- <https://github.com/eelhpesoj/OutlookAddIn1>

<img width="596" height="406" alt="image" src="https://github.com/user-attachments/assets/6acc413f-9ff9-44a6-a46c-0519f5383862" />


[Index]
1. Installation Visual Studio
2. Create project and Add-in setup
3. Debug and Publish
4. Install and Results


# 1. Installation Visual Studio
First up first, you need a visual studio.
You don't need a enterprise version or something.
Community version is totaly fine.

Download installer: 
- <https://visualstudio.microsoft.com/vs/community/>

Install "Visual Studio Community 2026"
<img width="1894" height="892" alt="image" src="https://github.com/user-attachments/assets/5fc783c2-1fe8-40f6-a436-1a6c25771155" />


Select "Microsoft 365 development"
<img width="1894" height="892" alt="image" src="https://github.com/user-attachments/assets/06deee4d-441e-4451-a0ec-d3985ae62e11" />

<img width="1894" height="895" alt="image" src="https://github.com/user-attachments/assets/b66c46f0-dde7-438d-9600-89b80b9686f2" />


Launch it when it's done
<img width="1894" height="896" alt="image" src="https://github.com/user-attachments/assets/d442c48f-62da-4331-b40a-bf2598927856" />

Sign in. Recommended to use github.
<img width="1894" height="895" alt="image" src="https://github.com/user-attachments/assets/8ef3d143-9bcf-47fe-a2b6-858226177343" />

<img width="1894" height="895" alt="image" src="https://github.com/user-attachments/assets/258dd4e6-c452-4ab8-80b5-2d0b8da3b526" />



# 2. Create project and Add-in setup
Create new project
<img width="1894" height="896" alt="image" src="https://github.com/user-attachments/assets/8965948e-0286-4644-927c-53f964a6e34d" />


Search "outlook" and select "Outlook VSTO Add-ins"
<img width="1894" height="894" alt="image" src="https://github.com/user-attachments/assets/377277e2-0113-40dd-94ad-5640abe75be7" />


Create
<img width="1894" height="894" alt="image" src="https://github.com/user-attachments/assets/0ff65e67-5090-41c5-9f1e-a3b8270ab93a" />

From the top of the project name, right click and add New item.
<img width="1894" height="895" alt="image" src="https://github.com/user-attachments/assets/9bf77105-01f5-46ff-a82d-ba08483c3b42" />

Show all templates
<img width="1894" height="894" alt="image" src="https://github.com/user-attachments/assets/80edce29-8254-49a0-9d50-13cfa4c295bd" />

Find Ribbon(Visual Designer)
<img width="1894" height="894" alt="image" src="https://github.com/user-attachments/assets/83096313-9530-4bc5-a67b-822e93b7a49c" />

Once you add new item with the template, you can see the similar one with the outlook ribbon.
This is a visual editor as the template describes.
On the Ribbon1, right click and select Properties.
<img width="1894" height="894" alt="image" src="https://github.com/user-attachments/assets/71e4ddd3-daf3-4e0d-bc3a-cbc58e37b621" />

And select the Ribbon type as "Microsoft.Outlook.Explorer" which means the custom ribbon will be located in the what I called "home" in the outlook. The default ribbon when you open the outlook.
You can also set the ribbon only when you compose email or something elsewhere. Please search it from the Microsoft document.
- <https://learn.microsoft.com/en-us/visualstudio/vsto/customizing-a-ribbon-for-outlook?view=visualstudio&tabs=csharp>
<img width="1894" height="894" alt="image" src="https://github.com/user-attachments/assets/4193f0af-f0a2-44db-a271-8fe646c438ba" />

Set a tab name
<img width="1894" height="894" alt="image" src="https://github.com/user-attachments/assets/008fcab7-407f-41fb-a0dc-9a42ad4597b9" />

Set a group name
<img width="1894" height="894" alt="image" src="https://github.com/user-attachments/assets/6ea50f8c-a72f-42cf-9873-218a64d5d2ef" />

From the "veiw", open the "tool box"
<img width="1894" height="894" alt="image" src="https://github.com/user-attachments/assets/6c0a3fe6-ac3d-40ee-b399-8fd2f148bfea" />

Drag "button" and drop to the "Help?(group)"
<img width="1894" height="893" alt="image" src="https://github.com/user-attachments/assets/45cbf620-21e5-4c8b-9275-58a7ea3282db" />

Customize the button. Set the image and button name.
<img width="1894" height="893" alt="image" src="https://github.com/user-attachments/assets/ed48c668-5414-4db3-8792-2cc9c210a498" />

If you double click the button, you can define the action.
In this case, I will just open the website using the system default browser.
<img width="1894" height="893" alt="image" src="https://github.com/user-attachments/assets/09871a42-62d0-489a-bd1a-ab21407973f8" />

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
<img width="1894" height="895" alt="image" src="https://github.com/user-attachments/assets/4059f8a9-6e63-4c6b-a9aa-5e359b16e383" />

You can see the addin we created. If the button works nomally and looks fine, close the outlook. and the debug mode will be terminated automatically as well.
<img width="1894" height="894" alt="image" src="https://github.com/user-attachments/assets/354ee90c-f145-41f3-9d53-953c3163a060" />

And go back to the Visual Studio. From the top of the project name, right click and select "Publish".
<img width="1894" height="895" alt="image" src="https://github.com/user-attachments/assets/735c1ce5-42aa-46f8-9987-d1f17c0913bd" />

Browse where you want to pulish the installation file.
<img width="1894" height="893" alt="image" src="https://github.com/user-attachments/assets/75380a45-cee6-4228-b4c4-13cea6b1ac85" />

Select the last option
<img width="1894" height="895" alt="image" src="https://github.com/user-attachments/assets/683d288e-5c2a-4447-ba81-afd25b12fffb" />

Click finish 
<img width="1894" height="893" alt="image" src="https://github.com/user-attachments/assets/49c9c57f-c1c8-456d-89ef-ab0d76c0ecbc" />

# 4. Install and Results
When you finisth the publish, you can get the three things as shown in the image.
To install the custom addin, those three files has to located in the same directory.
And execute the "setup.exe".
<img width="615" height="108" alt="image" src="https://github.com/user-attachments/assets/f0649285-0392-47d9-94ab-8916b908c002" />

We didn't sign the installation file, you may encounter that this is not a trusted publisher. But still you can proceed.
<img width="1894" height="893" alt="image" src="https://github.com/user-attachments/assets/38eeddd5-a737-45f2-9e1a-e6e8ce9a1ab7" />

<img width="1894" height="894" alt="image" src="https://github.com/user-attachments/assets/34445dc6-3822-4fbd-a0c0-fddb635c0675" />

After the installation has done successfully, you can check from the "Programm and features".
<img width="1894" height="893" alt="image" src="https://github.com/user-attachments/assets/717a5b50-b4b4-492c-bdd4-1ac30e625da7" />

Now, open the outlook classic.
<img width="1894" height="895" alt="image" src="https://github.com/user-attachments/assets/babf1201-9593-4186-b7af-52aed9da0200" />

You can see the addin

<img width="401" height="249" alt="image" src="https://github.com/user-attachments/assets/f1e5354f-4cd0-47a6-bf83-e830fcc681da" />

<img width="1894" height="893" alt="image" src="https://github.com/user-attachments/assets/e351ef4e-7078-41cb-bf0e-be2813a8cc54" />

And you can see the addin list from "Files > Options"
<img width="1894" height="896" alt="image" src="https://github.com/user-attachments/assets/b2e7bd35-12c2-4fac-bab7-8273e25db6f5" />

Customize Ribbon as well
<img width="1894" height="893" alt="image" src="https://github.com/user-attachments/assets/2b9cecd4-83b3-434f-8d71-898520a5ce40" />


So, this is it.
This whole process is just a demo, maybe you can set the URL as you want like internal private website like or anything.
Maybe you can set the link and set the cname where you want to forwarding to a specific link using internal dns obvisouly.
