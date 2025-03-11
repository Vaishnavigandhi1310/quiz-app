const express = require("express");
const cors = require('cors')
const app  = express();
const PORT = 8080;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())
const dbConnection = require("./Database/DbConnection");

const userRoutes = require('./Routes/userRoutes')
dbConnection();

app.use("/user",userRoutes);

app.listen(PORT,()=>{
    console.log((`listening on Port:${PORT}`));

})

// const mongoose = require('mongoose');


// const mongoURI = 'mongodb://127.0.0.1:27017/quiz';





// const sampleQuestions = [
//     { "que": "CSS ka full form kya hai?", "a": "Cascading Style Sheets", "b": "Colorful Style Sheets", "c": "Computer Style Sheets", "d": "Creative Style Sheets", "ans": "a" },
//     { "que": "JavaScript mein data types kaun se nahi hote?", "a": "Number", "b": "String", "c": "Boolean", "d": "Float", "ans": "d" },
//     { "que": "HTML mein kaunsa tag unordered list define karta hai?", "a": "<ul>", "b": "<ol>", "c": "<li>", "d": "<list>", "ans": "a" },
//     { "que": "CSS mein background color change karne ke liye kaunsi property use hoti hai?", "a": "color", "b": "background-color", "c": "bgcolor", "d": "background", "ans": "b" },
//     { "que": "JavaScript mein console par output display karne ke liye kaunsi function use hoti hai?", "a": "print()", "b": "echo()", "c": "console.log()", "d": "log()", "ans": "c" },
//     { "que": "HTML mein kaunsa tag internal style sheet define karta hai?", "a": "<script>", "b": "<link>", "c": "<style>", "d": "<css>", "ans": "c" },
//     { "que": "CSS mein text color change karne ke liye kaunsi property use hoti hai?", "a": "font-color", "b": "text-color", "c": "color", "d": "text-style", "ans": "c" },
//     { "que": "JavaScript mein array ke end mein element add karne ke liye kaunsi method use hoti hai?", "a": "push()", "b": "pop()", "c": "shift()", "d": "unshift()", "ans": "a" },
//     { "que": "HTML mein kaunsa tag paragraph define karta hai?", "a": "<p>", "b": "<para>", "c": "<paragraph>", "d": "<pg>", "ans": "a" },
//     { "que": "CSS mein margin set karne ke liye kaunsi property use hoti hai?", "a": "padding", "b": "margin", "c": "border", "d": "spacing", "ans": "b" },
//     { "que": "JavaScript mein kaunsa operator strict equality check karta hai?", "a": "==", "b": "===", "c": "!==", "d": "=", "ans": "b" },
//     { "que": "HTML mein kaunsa attribute image ka source specify karta hai?", "a": "href", "b": "src", "c": "alt", "d": "link", "ans": "b" },
//     { "que": "CSS mein font size set karne ke liye kaunsi property use hoti hai?", "a": "font-weight", "b": "font-style", "c": "font-size", "d": "font-family", "ans": "c" },
//     { "que": "JavaScript mein function ko call karne ke liye kaunsa syntax sahi hai?", "a": "functionName;", "b": "functionName[];", "c": "functionName();", "d": "functionName{};", "ans": "c" },
//     { "que": "HTML mein kaunsa tag line break insert karta hai?", "a": "<br>", "b": "<lb>", "c": "<break>", "d": "<newline>", "ans": "a" },
//     { "que": "CSS mein border style set karne ke liye kaunsi property use hoti hai?", "a": "border-color", "b": "border-style", "c": "border-width", "d": "border-height", "ans": "b" },
//     { "que": "JavaScript mein null kis cheez ko represent karta hai?", "a": "Undefined value", "b": "No value", "c": "Zero", "d": "Empty string", "ans": "b" },
//     { "que": "HTML mein kaunsa tag table row define karta hai?", "a": "<tr>", "b": "<td>", "c": "<th>", "d": "<table>", "ans": "a" },
//     { "que": "CSS mein kaunsi property text ko center align karti hai?", "a": "text-align: left;", "b": "text-align: right;", "c": "text-align: center;", "d": "text-align: justify;", "ans": "c" },
//     { "que": "JavaScript mein kaunsa method string ki length return karta hai?", "a": "length()", "b": "size()", "c": "len()", "d": "length", "ans": "d" },
//     { "que": "HTML mein kaunsa tag hyperlink create karta hai?", "a": "<a>", "b": "<link>", "c": "<href>", "d": "<hyperlink>", "ans": "a" },
//     { "que": "CSS mein padding set karne ke liye kaunsi property use hoti hai?", "a": "padding", "b": "margin", "c": "border", "d": "spacing", "ans": "a" },
//     { "que": "JavaScript mein kaunsa method array se last element remove karta hai?", "a": "pop()", "b": "push()", "c": "shift()", "d": "unshift()", "ans": "a" },
//     { "que": "HTML mein kaunsa tag image define karta hai?", "a": "<img>", "b": "<image>", "c": "<pic>", "d": "<figure>", "ans": "a" },
//     { "que": "CSS mein text ko italic banane ke liye kaunsi property use hoti hai?", "a": "font-weight", "b": "font-style", "c": "text-decoration", "d": "font-variant", "ans": "b" },
//     { "que": "JavaScript mein kaunsa method string ko uppercase mein convert karta hai?", "a": "toUpperCase()", "b": "toUpper()", "c": "upperCase()", "d": "uppercase()", "ans": "a" },
//     { "que": "HTML mein kaunsa tag ordered list define karta hai?", "a": "<ul>", "b": "<ol>", "c": "<li>", "d": "<list>", "ans": "b" },
//     { "que": "HTML stands for __", "a": "HyperText Markup Language", "b": "HyperText Machine Language", "c": "HyperText Marking Language", "d": "HyperText Maiup Language", "ans": "a" },
//     { "que": "Who is the father of HTML?", "a": "Rasmus Lerdorf", "b": "Tim Berners-Lee", "c": "Brendan Eich", "d": "Sergey Brin", "ans": "b" },
//     { "que": "How is document type initialized in HTML5?", "a": "DOCTYPE HTML>", "b": "DOCTYPE>", "c": "DOCTYPE HTML", "d": "DOCTYPE html", "ans": "c" },
//     { "que": "Which of the following is used to read an HTML page and render it?", "a": "Web server", "b": "Web network", "c": "Web browser", "d": "Web matrix", "ans": "c" },
//     { "que": "In which part of the HTML metadata is contained?", "a": "head tag", "b": "title tag", "c": "html tag", "d": "body tag", "ans": "a" },
//     { "que": "What is Title tag?", "a": "head tag", "b": "title tag", "c": "html tag", "d": "body tag", "ans": "b" },
//     { "que": "Which of the following is not a semantic HTML element?", "a": "<article>", "b": "<div>", "c": "<section>", "d": "<header>", "ans": "b" },
//     { "que": "What does the 'alt' attribute in an <img> tag specify?", "a": "Image width", "b": "Image height", "c": "Alternate text", "d": "Image source", "ans": "c" },
//     { "que": "Which CSS property is used to create space between elements?", "a": "padding", "b": "margin", "c": "spacing", "d": "border", "ans": "b" },
//         { "que": "What is the default position property in CSS?", "a": "absolute", "b": "relative", "c": "static", "d": "fixed", "ans": "c" },
//         { "que": "Which CSS property controls the transparency of an element?", "a": "opacity", "b": "visibility", "c": "filter", "d": "display", "ans": "a" },
//         { "que": "Which function is used to parse a JSON string in JavaScript?", "a": "JSON.parse()", "b": "JSON.stringify()", "c": "parseJSON()", "d": "stringifyJSON()", "ans": "a" },
//         { "que": "Which keyword is used to declare a constant variable in JavaScript?", "a": "var", "b": "let", "c": "const", "d": "static", "ans": "c" },
//         { "que": "Which JavaScript method is used to add an element at the beginning of an array?", "a": "push()", "b": "unshift()", "c": "shift()", "d": "concat()", "ans": "b" },
//         { "que": "What is the purpose of the 'use strict' directive in JavaScript?", "a": "Enable strict mode", "b": "Declare a function", "c": "Create a variable", "d": "Define an object", "ans": "a" },
//         { "que": "Which built-in method removes the last element from an array in JavaScript?", "a": "push()", "b": "pop()", "c": "shift()", "d": "splice()", "ans": "b" },
//         { "que": "Which of the following is used to create a new collection in MongoDB?", "a": "db.createCollection()", "b": "db.newCollection()", "c": "db.addCollection()", "d": "db.makeCollection()", "ans": "a" },
//         { "que": "Which data format does MongoDB use to store data?", "a": "XML", "b": "JSON", "c": "BSON", "d": "YAML", "ans": "c" },
//         { "que": "Which method is used to delete a document in MongoDB?", "a": "remove()", "b": "deleteOne()", "c": "erase()", "d": "drop()", "ans": "b" },
//         { "que": "Which command lists all databases in MongoDB?", "a": "show databases", "b": "list dbs", "c": "display databases", "d": "get dbs", "ans": "a" },
//         { "que": "Which framework is commonly used to build RESTful APIs in Node.js?", "a": "Django", "b": "Express.js", "c": "Flask", "d": "Spring Boot", "ans": "b" },
//         { "que": "Which of the following is not a built-in Node.js module?", "a": "fs", "b": "http", "c": "url", "d": "requests", "ans": "d" },
//         { "que": "Which method is used to read a file in Node.js?", "a": "readFile()", "b": "openFile()", "c": "getFile()", "d": "loadFile()", "ans": "a" },
//         { "que": "Which function is used to handle asynchronous operations in Node.js?", "a": "await", "b": "callback", "c": "promise", "d": "async", "ans": "b" },
//         { "que": "What does JSX stand for in React?", "a": "JavaScript XML", "b": "JavaScript Extension", "c": "Java Syntax Extension", "d": "JavaScript Execution", "ans": "a" },
//         { "que": "Which hook is used to manage state in a functional React component?", "a": "useEffect", "b": "useContext", "c": "useState", "d": "useRef", "ans": "c" },
//         { "que": "Which method is used to render a React component?", "a": "ReactDOM.render()", "b": "React.render()", "c": "component.render()", "d": "React.createElement()", "ans": "a" },
//         { "que": "Which of the following is not a lifecycle method in React?", "a": "componentDidMount", "b": "componentWillUnmount", "c": "componentWillUpdate", "d": "componentRender", "ans": "d" },
//         { "que": "Which React feature allows sharing state between components?", "a": "Props", "b": "State", "c": "Context API", "d": "Hooks", "ans": "c" },
//         { "que": "Which package is used to manage routing in a React app?", "a": "react-router-dom", "b": "react-routing", "c": "react-path", "d": "react-navigator", "ans": "a" },
        
//             { "que": "What is Node.js primarily used for?", "a": "Frontend development", "b": "Backend development", "c": "Database management", "d": "Operating system development", "ans": "b" },
//             { "que": "Which of the following is a core module in Node.js?", "a": "http", "b": "express", "c": "mongodb", "d": "mongoose", "ans": "a" },
//             { "que": "Which engine does Node.js use to execute JavaScript?", "a": "SpiderMonkey", "b": "Java Virtual Machine", "c": "V8", "d": "Chakra", "ans": "c" },
//             { "que": "Which module in Node.js is used to create a server?", "a": "net", "b": "http", "c": "url", "d": "querystring", "ans": "b" },
//             { "que": "Which command is used to initialize a new Node.js project?", "a": "node init", "b": "npm install", "c": "npm init", "d": "node start", "ans": "c" },
//             { "que": "How do you import a module in Node.js?", "a": "import module from 'module'", "b": "include('module')", "c": "require('module')", "d": "load('module')", "ans": "c" },
//             { "que": "Which method is used to read a file asynchronously in Node.js?", "a": "fs.read()", "b": "fs.readFile()", "c": "fs.open()", "d": "fs.getFile()", "ans": "b" },
//             { "que": "Which of the following is an asynchronous method in Node.js?", "a": "fs.readFileSync()", "b": "fs.writeFileSync()", "c": "fs.readFile()", "d": "fs.existsSync()", "ans": "c" },
//             { "que": "Which module is used to work with file paths in Node.js?", "a": "path", "b": "fs", "c": "http", "d": "os", "ans": "a" },
//             { "que": "Which method is used to create a new event listener in Node.js?", "a": "on()", "b": "emit()", "c": "listen()", "d": "subscribe()", "ans": "a" },
//             { "que": "Which Node.js module allows interaction with the operating system?", "a": "os", "b": "sys", "c": "system", "d": "hardware", "ans": "a" },
//             { "que": "Which method is used to send data to the client in an HTTP response?", "a": "res.send()", "b": "res.end()", "c": "res.write()", "d": "res.emit()", "ans": "c" },
//             { "que": "What is the default package manager for Node.js?", "a": "Yarn", "b": "NPM", "c": "Bower", "d": "Composer", "ans": "b" },
//             { "que": "Which statement about Node.js is true?", "a": "Node.js is a multi-threaded framework", "b": "Node.js is synchronous by default", "c": "Node.js is single-threaded but supports asynchronous operations", "d": "Node.js runs only in the browser", "ans": "c" },
//             { "que": "What is the purpose of middleware in Express.js?", "a": "To handle HTTP requests", "b": "To process incoming requests before they reach the route handler", "c": "To define database schemas", "d": "To create front-end components", "ans": "b" },
//             { "que": "Which of the following is not an HTTP method?", "a": "GET", "b": "POST", "c": "PUSH", "d": "DELETE", "ans": "c" },
//             { "que": "Which module is commonly used for handling routes in a Node.js application?", "a": "http", "b": "fs", "c": "express", "d": "path", "ans": "c" },
//             { "que": "Which database is often used with Node.js in full-stack development?", "a": "MySQL", "b": "MongoDB", "c": "Oracle", "d": "PostgreSQL", "ans": "b" },
//             { "que": "Which method is used to serve static files in Express.js?", "a": "app.static()", "b": "express.static()", "c": "app.useStatic()", "d": "express.serve()", "ans": "b" },
//             { "que": "What is an event emitter in Node.js?", "a": "A module that handles user authentication", "b": "A module that allows asynchronous event-driven programming", "c": "A built-in function to manage HTTP requests", "d": "A package that helps with frontend rendering", "ans": "b" },
//             { "que": "How do you handle errors in a Node.js application?", "a": "By using try-catch blocks", "b": "By ignoring them", "c": "By restarting the server", "d": "By logging them in a database", "ans": "a" },
//             { "que": "What is the purpose of 'nodemon' in Node.js?", "a": "To restart the server automatically on file changes", "b": "To serve static files", "c": "To manage database connections", "d": "To run unit tests", "ans": "a" },
//             { "que": "Which of the following best describes Node.js?", "a": "A JavaScript framework", "b": "A JavaScript runtime environment", "c": "A frontend library", "d": "A database system", "ans": "b" },
//             { "que": "Which of the following can be used to schedule tasks in Node.js?", "a": "setInterval()", "b": "setTimeout()", "c": "cron jobs", "d": "All of the above", "ans": "d" }
   
        
    
// ]

 





// const insertQuestions = async () => {
//     try {
//         await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log('Connected to MongoDB');

//         const questions = generateRandomQuestions(100);
//         await Question.insertMany(questions);
//         console.log('100 Random Questions Inserted');
//     } catch (error) {
//         console.error('Error inserting questions:', error);
//     } finally {
//         mongoose.connection.close();
//     }
// };

// insertQuestions();

