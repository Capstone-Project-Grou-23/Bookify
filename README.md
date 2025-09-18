# Bookify
Capstone Project!!!
<br>
<p> Till 17-sept</p>
<h6> Check the Db schema</h6>
<p>I have added DB schema in code/db/db.sql 
<br>
Check it and update it in your local system (I am currently seraching methods to host the entire DB online)</p>
<h6>Note</h6>
<p>I haven't give the secret keys of google and facebook client id in code/server/proecess.env 
<br> Due to securtiy isseus I didn't upload it on github <br>
  So didn't cry and beg me if any related error occur <H3>Be Sigma Here and try to solve the Error!!</H3></p>

<p> Till 13-sept</p>
<h1>To the other team members !!! </h1>
<p> I have created and connected DB to the login and signup page </p>
<p> You have to follow certain steps to create DB to test in your laptop</p>

<h6>Step 1 : if you didn't have node.js in your backend  </h6>
<pre> 
cd server
npm init -y
npm install express mysql2 cors body-parser bcrypt jsonwebtoken
</pre>

<h6> Setp 2 : Create Database</h6>
<p>open mysql in cmd or terminal </p>

<pre> CREATE DATABASE bookify;</pre>
<pre>USE bookify;</pre>
<pre> CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)  -- store hashed password
);</pre>
<p> then</p>

<pre>INSERT INTO users (name, email, password)
VALUES ("Test User", "test@example.com", "PASTE_HASH_HERE");
</pre>



<h6> Step 3: change the index.js in server folder </h6>
<p>change the username and password to your own mysql user/password </p>
like mine: 
<pre>const db = mysql.createConnection({
  host: "localhost",  // change if remote
  user: "shivam",       // your MySQL username
  password: "root", // your MySQL password
  database: "bookify"   // your DB name
});</pre>


<h6> Run both frontend and backend in diff terminal</h6>

<p> In main folder run frontend</p>
<pre> npm start</pre>

<p> In server folder run Backend and you will see 

Server running on port 5000
✅ MySQL Connected...
like this</p>
<pre> node index.js</pre>

<h6> Step 4: Test </h6>
<p> Before testing the signup or login check the conectivity is established or not</p>
<p>In server directory open another terminal(It may be 3rd terminal you open simultaneously)</p>
<pre> //run this code 
curl -X POST http://localhost:5000/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"123456"}'
</pre>

<p>👉 Does it print { "success": true, "message": "User registered successfully!" } ?</p>

<h3> OR</h3>
<p>you can also test by runing test.js in serer directory</p>
<pre> node test.js</pre>
<p>see ✅ MySQL Connected... like this</p>
<p> then run </p>
<pre> curl http://localhost:5000/
</pre>
<p>👉 Do you get ✅ Test server is working?</p>
