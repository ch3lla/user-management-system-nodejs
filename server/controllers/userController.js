const mysql2 = require('mysql2');

const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((error) => {
    if (error) {
        console.log("MySQL failed to connect: ", error);
    } else {
        console.log("MySQL is up and running");
    }
})

exports.view = (req, res) => {
    db.query("SELECT * FROM user WHERE status = 'active'", (err, rows) => {
        if (!err) {
            let removedUSer = req.query.removed;
            res.render('home', {rows, removedUSer});
        } else {
            console.log("Error: ", err);
        }
        console.log("The data from user table: \n", rows);
    });
}

// Find users by search
exports.find = (req, res) => {
    let searchTerm = req.body.search;
    db.query("SELECT *  FROM user WHERE first_name LIKE ? OR last_name LIKE ?", ['%' + searchTerm
+ '%', '%' + searchTerm +'%'], (err, rows) => {
    if (err) { 
        console.log("Error: ", err) 
    } else {
    res.render('home', {rows});
    }
    console.log("The data from user table: \n", rows);
});
}

exports.form = (req, res) => {
    res.render('add-user');
}

// Add new user
exports.create = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;
    let searchTerm = req.body.search;

    db.query("INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?", 
    [first_name, last_name, email, phone, comments], (err, rows) => {
        if (err) {
            console.log('Error: ', err);
        }else {
            res.render('add-user', { alert: "User added successfully!"});
        }
        console.log("The data from user table: \n", rows);
    });
}

// Edit user
exports.edit = (req, res) => {
    db.query("SELECT * FROM user WHERE id = ?", [req.params.id], (err, rows) => {
        if (err) {
            console.log("Error: ", err);
        } else {
            res.render('edit-user', { rows });
        }
        console.log("The data from the table: \n", rows);
    });
}

// Update user
exports.update = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;
    db.query("UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?", 
    [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {
        if (!err) {
            db.query("SELECT * FROM user WHERE id = ? ", [req.params.id], (err, rows) => {
                if (!err) {
                    res.render('edit-user', { rows, alert: `${first_name} has been updated.`});
                } else {
                    console.log("Error: ", err);
                }
                console.log('The data from user table: \n', rows);
            });
        } else {
            console.log("Error: ", err);
        }
        console.log("The data from user table: \n", rows);
    });
} 

// Delete user
exports.delete = (req, res) => {
    db.query("DELETE FROM user WHERE id = ?", [req.params.id], (err, rows) => {
        if (!err) {
            res.redirect('/');
        } else {
            console.log ("Error: ", err);
        }
        console.log("The data from user table: \n", rows);
    });
}

// Hide a record 
exports.hide = (req, res) => {
    db.query("UPDATE user SET status = ? WHERE id = ?", ['removed', req.params.id], (err, rows) => {
        if (err) {
            console.log("Error: ", err);
        } else {
            let removedUSer = encodeURIComponent('User successfully removed.');
            res.redirect('?/removed=' + removedUSer);
        }
        console.log("The data from this table is : \n", rows);
    });
}

// View Users
exports.viewall = (req, res) => {
    db.query("SELECT * FROM user WHERE id = ?", [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render('view-user', {rows});
        }
        console.log("The dat form user table: \n", rows);
    })
}