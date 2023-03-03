const pool = require("../../db");
const queries = require('./queries');


const getUsers = (req, res) => {
    pool.query(queries.getUsers, (err, db) => {
        if (err) {
            console.error(err);
            res.send("Query failed");
            return;
        }
        res.json({users: db.rows});
    });
}; 

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows); 
    });
}; 

const addUser = (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;

    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.send("Email already exists.");
        }
        else if(password.length < 5){
            console.log("Password = " + password);
            res.send("Password is too short.");
        }
        else{
            pool.query(queries.addUser, [firstname, lastname, email, username, password], (error, results) => {
                if (error) throw error; 
                res.status(201).send("User added successfully"); 
                console.log("User created");
        })}
    });
}

const getPlans = (req, res) => {
    pool.query(queries.getPlans, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows); 
    });
}; 


const getPlanById = (req, res) => {
    const id = parseInt(req.params.postid);
    pool.query(queries.getPlanById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows); 
    });
}; 

module.exports = {
    getUsers,
    getUserById,
    addUser,
    getPlans,
    getPlanById,
   
};