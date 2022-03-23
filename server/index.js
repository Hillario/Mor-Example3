//call express
const express=require("express");
//initialize our app
const app=express();
//body-parser
const bodyParser=require("body-parser");
//MySQL
const mysql=require("mysql2");
//cors-used to access our backend api
const cors=require("cors");

//establish db connection
const db=mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_contact"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

//API to get data from MariaDB
app.get("/api/get", (req,res)=>{
    const sqlGet="SELECT * FROM contact_db";
    db.query(sqlGet, (error,result)=>{
        res.send(result);
    });
});

//API to get data from client and POST to MariaDB
app.post("/api/post", (req,res)=>{
    const {name, email, contact}=req.body;
    const sqlInsert="INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});

//API to delete data
app.delete("/api/remove/:id", (req,res)=>{
    const {id}=req.params;
    const sqlRemove="DELETE FROM contact_db WHERE id=?";
    db.query(sqlRemove, id, (error, result)=>{
        if(error){
            console.log(error);
        }
    });
});

//API to get data for UPDATE
app.get("/api/get/:id", (req,res)=>{
    const {id}=req.params;
    const sqlGet="SELECT * FROM contact_db WHERE id=?";
    db.query(sqlGet, id, (error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

//API to update data
app.put("/api/update/:id", (req,res)=>{
    const {id}=req.params;
    const {name, email, contact}=req.body;
    const sqlUpdate="UPDATE contact_db SET name=?, email=?, contact=? WHERE id=?";
    db.query(sqlUpdate, [name, email, contact, id], (error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/",(req,res)=>{
    /*//validate connection
    const sqlInsert="INSERT INTO contact_db (name, email, contact) VALUES ('hillary', 'hillary@gmail.com', '0707690456')";
    db.query(sqlInsert, (error, result)=>{
        console.log("error",error);
        console.log("result",result);
        res.send("Hello Express!");//define route to remove error "Cannot GET/ in browser"-->"/" means home route
    });*/   
});

app.listen(5000, ()=>{
    console.log("Server is running on port 5000!");
});