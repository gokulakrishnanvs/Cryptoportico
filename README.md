# Project Cryptoportico
Cryptoportico is a portfolio manager designed to deliver portfolio values based on the crypto transactions


This documentation includes my complete thought process on my approach towards the problem statement, design of the program and the development.

Let's get started.



---

## Approaching the problem statement: (The Define Phase)
 
Any problem statement , has facts that should be taking into account for diving into the project.
 
Facts:
 
1.	Assuming I am a *crypto investor*.
2.	My transactions , that are done over a period of time are logged in a CSV file.
 
Then, there is a demand on the type of technical solution required.
 
The solution is to write a **"Command Line Program"**  using **Node.js**. I typically ask questions to myself and find the path through the solution. Starting with , *"What should this program do?"*
 <br>
 <br>
 
 
This program must have **four functions** , that would return portfolio values for **"4 different scenarios"**. 

which leads me to two questions.
1.	What is a portfolio?
2.	What are the 4 different scenarios?
 
*"Portfolio means the balance of the token where you need to add deposits and subtract withdrawals"* - this was given as an explanation. But I needed more clarity on what is portfolio in a crypto industry, for which I surfed the internet to read at some explanations and briefs provided. 
 
 ![image](https://user-images.githubusercontent.com/131561034/233811091-25f6e10a-4a6a-4a16-a455-cd955ed60f32.png)

 
I read an article , which explained that portfolio means the current crypto assets that one owns in an exchange account. This includes different types of crypto token and not just one. Here's the link , [click here](https://nodejs.org/api/readline.html#readline) .
 
Now, that I know what a portfolio is , I moved on the next question.
 
From the explanation provided in the problem statement, I understood that scenarios could be represented in a Matrix as given below:
 
 ![image](https://user-images.githubusercontent.com/131561034/233811095-917985a1-4621-4dc8-a16f-643a89f8f12e.png)

 <br>
 <br>
 
Having defined what is required from a result perspective, I would be starting the process of designing the program. But before that, I thought this program could have a cool name, so I came up with "cryptoporto". When I surfed this in the internet, I arrived at "Cryptoportico" , this was what the romans called a gallery, served for private communications.
 
Hence, I named this program as, **Project Cryptoportico** .

---

## Approaching the design of the program: ( The Design Phase)

### Program Design

I always visualize the data flow of the whole program/ project
 
The high level design for this program is given below.

![image](https://user-images.githubusercontent.com/131561034/233811387-234d2861-5d8a-44db-865d-fe8aacd443b2.png)

To describe the above flow,
 
1.  The user gives an input to Cryptoportico , via console.
2.	The data is fetched based on the input.
3.	the portfolio value is calculated based on the exchange rates given by "Cryptocompare" API. 
4.	The portfolio value would be displayed in the console as a result.

## Understanding the entities Involved:

Since the scale of the program is small, Just one entity is involved in the whole program i.e., the transaction entity
In the form of a CSV file.

The definition of the entity , as per the problem statement is given below.

![image](https://user-images.githubusercontent.com/131561034/233811421-a6a28c2a-b36a-44ab-a52a-f66d08426651.png)

---

## Approaching the development of the program: ( The development Phase)

Since **Node.js** is required to be used  to build cryptoportico, we could use npm packages/ in-built modules to handle different part of requirements. I would break down each feature and understand what are the packages that can be used.
 
The first thing that I noticed is the usage of API. I always prefer using `axios` over `fetch`. Both are similar but axios provides us a little more functionality when compared to fetch.
 
I could use the in-built `fs` module for reading the data from CSV
 
Next task is to figure out what should I do for the user to interact in console , which is something that I had not done before. I found an in-built module `readline` said to exist , using which we could create a user interface in the console.
 
I took a tour around the node.js documentation for readline( Here's the link, [click here](https://nodejs.org/api/readline.html#readline) ). I also worked a bit around it to see how it works.
 
To sum up , we have the table below:

![image](https://user-images.githubusercontent.com/131561034/233811481-64f18f73-e1e5-490e-83cf-c3bba55a28e4.png)

### The Coding Approach
 
To have this program maintainable ,
a.	We should be splitting up the program into modules
b.	We should be defining constants and configuration files to store values
c.	Incorporate Error Handling
d.  Last but not the least, Comments should be present at various points of the program to make is understandable

Thus the program would be covered with all the points mentioned above. Having that in mind, we could design the folder structure of the application as mentioned below.

![image](https://user-images.githubusercontent.com/131561034/233811551-9a864320-888d-4f31-828e-36f15a235517.png)


There are two parts to the program. 
1.	The functionality.
2.	User Interface.

I prefer thinking through the functionalities first , then invoking them at the right places of user interface.

and find the data flow in the code which I used to code the program around ( there was a couple of change from my initial diagram, I always insist on updating the documentation at the point of updations )

![image](https://user-images.githubusercontent.com/131561034/233811683-67e0dadb-5717-464e-a053-fa09868358f7.png)



---

The development is done and the program is working as intended.
the code is committed to the branch.

Here are the steps to run the program ( only for windows users )

1. Clone the repository
2. open powershell ,go to directory and run `npm install` to fetch the required package
3. open a new powershell window, go the directory where the code is cloned, and run `node main.js`

( make sure you have your CSV file in the same folder as the code .Sample of CSV is present in the repository)

Voila! you now have access to Cryptoportico , your portfolio manager. 

Screen shots:

![image](https://user-images.githubusercontent.com/131561034/233812237-145b4c9f-7c00-49e6-8987-7b27e7fc635f.png)

![image](https://user-images.githubusercontent.com/131561034/233812246-27cfa2e1-6894-462a-8ea6-7d31c9f7fb65.png)

![image](https://user-images.githubusercontent.com/131561034/233812262-1a32d415-e65b-42d4-8548-7e0475d8ee6f.png)

---

## Thank you note:

I thank you for providing me this opportunity, it has been a very good learning experience when i solved this problem.

Happy Coding!


