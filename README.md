
# Authentication-Server

## Author: Riva Davidowski

**An Express/Node.js based server using a custom “authentication” module that is designed to handle user registration and sign in using Basic, Bearer, or OAuth along with a custom “authorization” module**

### Installing

**Authentication-Server:**
** You will need to install the following on your machine:**
    - `npm init -y `
    - **The entry point for this app is: `index.js`**
    - `npm install` for the following:
        - `bcrypt`
        - base-64 for decoding headers: `npm i base-64`
        - `dotenv`
        - `cors`
        - jsonwebtoken to create a coded token: `npm i jsonwebtoken`
        -  `express`

- Start server:

```
    /* give it a port number and optionally pass a function to call when app
     starts listening on given port*/

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

```

- Install MongoDB: `npm install mongodb`
- Install mongoose: `npm install -save--dev mongoose`
- Visit [docs.mongodb.com](https://docs.mongodb.com/manual/tutorial/getting-started/) to learn How to get started using MongoDB.
- Connect to your db:

```
//Connect to Database
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...',err));

```

**Testing:**

- npm i `@code-fellows/supergoose`
- npm i `jest`


### Using Authentication-Sever:






### UML:


![Auth](AUTH.png)


