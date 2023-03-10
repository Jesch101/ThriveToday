const bcrypt = require("bcrypt");
const pool = require("../db");
const queries = require("./queries");

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (err, db) => {
        if (err) {
            console.error(err);
            res.send("Query failed");
            return;
        }
        res.json({ users: db.rows });
    });
};

const getUserById = async (req, res) => {
    const id = parseInt(req.params.userid);
    try {
        const {rows} = await pool.query(queries.getUserById, [id]);
        res.status(200).json(rows);
    } catch (e) {
        throw e;
    }
};

//Sign up user
const addUser = async (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;
    const MIN_PASSWORD_LENGTH = 5;

    const {rows: emailRows} = await pool.query(queries.checkEmailExists, [email]);
    if (emailRows.length) {
        res.status(400).send("Email already exists.");
        return;
    } else if (password.length < MIN_PASSWORD_LENGTH) {
        res.status(400).send("Password is too short.");
        return;
    }

    const hash = await bcrypt.hash(password, 12);
    try {
        await pool.query(queries.addUser, [firstname, lastname, email, username, hash]);
        res.status(201).send("User added successfully");
    } catch (e) {
        res.status(500).send("There was a problem adding the user to the database");
    }
}

const updateUsername = async (req, res) => {

};

const updatePassword = async (req, res) => {

};

const updateEmail = async (req, res) => {

};

const deleteUser = async (req, res) => {

};

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

const addPost = (req, res) => {
    // future: userid = req.header;
    const { userid, post_title, datecreated, tags } = req.body;

    pool.query(queries.addPost, [userid, post_title, datecreated, tags], (error, results) => {
        if (error) throw error;
        res.status(201).send("Post added successfully");
        console.log("Post created");
    }
    );
};

const addTopic = (req, res) => {
    const postid = parseInt(req.params.postid);
    const { topic_title, content } = req.body;
    console.log("Adding topic.....");

    pool.query(queries.addTopic, [postid, topic_title, content], (error, results) => {
        if (error) throw error;
        res.status(201).send("Topic added successfully");
        console.log("Topic created");
    }
    );
};

const addSubtopic = (req, res) => {
    const topicid = parseInt(req.params.topicid);

    const { subtopic_title, content } = req.body;
    console.log("Adding subtopic.....");

    pool.query(queries.addSubtopic, [topicid, subtopic_title, content], (error, results) => {
            if (error) throw error;
            res.status(201).send("Subtopic added successfully");
            console.log("Subtopic created");
        }
    );
};

// Check if post is in users likes
// IF found: remove it from the users likes, decrease post like count -1
// IF NOT found: append to end of users likes, increase post like count +1
const likePost = (req, res) => {
    const postid = parseInt(req.params.postid);
    //const userid = req.body;
    pool.query(queries.getUserLiked, [userid], (error, results) => {
        console.log(results);
    });
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUsername,
    updatePassword,
    updateEmail,
    deleteUser,

    getPlans,
    getPlanById,
    addPost,
    addTopic,
    addSubtopic,

    likePost,
};
