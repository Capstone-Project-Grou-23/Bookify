Of course. Here’s how you can create and use a .env file to securely store your Google Client ID and Secret in your server directory.

Step 1: Create the .env File
In your code/server/ directory, create a new file named exactly .env.

Step 2: Add Your Google Credentials
Open the new .env file and add your credentials in the following format. Replace the placeholder text with the actual Client ID and Client Secret you received from the Google Cloud Console.

Code snippet
<pre>GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_FROM_GOOGLE_GOES_HERE
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET_FROM_GOOGLE_GOES_HERE</pre>

Step 3: Load the .env File in Your Server
For your application to read these variables, you need to use the dotenv package you already have installed.

Add the following line to the very top of your code/server/index.js file:

JavaScript

<pre> require('dotenv').config();

const express = require("express");
// ... rest of the file</pre>

This line loads the variables from your .env file and makes them available throughout your server application via process.env.

Step 4: Add .env to .gitignore (Crucial Security Step)
To prevent your secret keys from being accidentally committed to a public repository, you must add the .env file to your .gitignore file.

If you don't already have a .gitignore file in the root of your code directory, create one.

Add the following line to your .gitignore file:
<pre> # Secret environment variables
.env</pre>

This ensures your sensitive credentials remain safe and are not exposed in your source code.
