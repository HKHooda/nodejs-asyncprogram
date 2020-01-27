const fs = require("fs");
const express = require("express");
const axios = require("axios").default

const app = express();
const port = 3000;

var obj = {}

app.get('/', (req, res)=>{
    res.send('<h1> Welcome to express server </h1>')
})

app.get("/employee/:id", (req, res)=>{
    const id = req.params.id;
    fs.readFile('./data/employee.json', (err, data)=>{
        if (err){
            throw err;
        }else{
            parsed_data = JSON.parse(data);
            for (let emp of parsed_data){
                if (emp.emp_id == id){
                    res.send(emp)
                }
            }
        }
    })
})

app.get("/project/:id", (req, res)=>{
    const id = req.params.id;
    fs.readFile('./data/project.json', (err, data)=>{
        if (err){
            throw err;
        }else{
            parsed_data = JSON.parse(data);
            for (let project of parsed_data){
                if (project.project_id == id){
                    res.send(project)
                }
            }
        }
    })
})

app.get("/getemployeedetails/:id", (req, res)=>{
    const id = req.params.id;
    axios
    .get("http://localhost:3000/employee/" + id)
    .then((response)=>{
        //console.log(response.data);
        //res.send(response.data);
        obj =  {
            emp_id: response.data.emp_id,
            name: response.data.name,
            project_id: response.data.project_id,
            email: response.data.email
        };
    })

    axios
    .get("http://localhost:3000/project/" + obj.project_id)
    .then((response)=>{
        obj["lang"] = response.data.lang;
        console.log(obj)
        res.send(obj);
    
    })
    .catch((err)=>{
        console.log(err);
    })

})

app.listen(port, (err)=>{
    console.log('Server is running on port ' + port)
})

