const mysql = require('mysql');
let instance = null;


const connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Ovaizali110*",
    database: "naiki"
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
});


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getSignInDetails() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT cnic,password FROM sys_user;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

// //     async deleteAllData() {
// //         try {
// //             const response = await new Promise((resolve, reject) => {
// //                 const query = "DELETE FROM todos;";

// //                 connection.query(query, (err, results) => {
// //                     if (err) reject(new Error(err.message));
// //                     resolve(results);
// //                 })
// //             });
// //             // console.log(response);
// //             return;
// //         } catch (error) {
// //             console.log(error);
// //         }
// //     }

// //     async insertNewName(todo_item) {
// //         try {
// //             // const dateAdded = new Date();
// //             const insertId = await new Promise((resolve, reject) => {
// //                 const query = "INSERT INTO todos (todo_item) VALUES (?);";

// //                 connection.query(query, [todo_item] , (err, result) => {
// //                     if (err) reject(new Error(err.message));
// //                     resolve(result.insertId);
// //                 })
// //             });
// //             return {
// //                 todo_id : insertId,
// //                 todo_item : todo_item
// //             };
// //         } catch (error) {
// //             console.log(error);
// //         }
// //     }



// //     async deleteRowById(todo_id) {
// //         try {
// //             todo_id = parseInt(todo_id, 10); 
// //             const response = await new Promise((resolve, reject) => {
// //                 const query = "DELETE FROM todos WHERE todo_id = ?";
    
// //                 connection.query(query, [todo_id] , (err, result) => {
// //                     if (err) reject(new Error(err.message));
// //                     // resolve(result.affectedRows);
// //                 })
// //             });
    
// //             return response === 1 ? true : false;
// //         } catch (error) {
// //             console.log(error);
// //             return false;
// //         }
// //     }

//     // async checkSignin(cnic, password) {
//     //     try {
//     //         // todo_id = parseInt(todo_id, 10); 
//     //         // const response = await new Promise((resolve, reject) => {
//     //         //     const query = "UPDATE todos SET todo_item = ? WHERE todo_id = ?";
    
//     //         //     connection.query(query, [todo_item, todo_id] , (err, result) => {
//     //         //         if (err) reject(new Error(err.message));
//     //         //         resolve(result.affectedRows);
//     //         //     })
//     //         // });
    
//     //         return response === 1 ? true : false;
//     //     } catch (error) {
//     //         console.log(error);
//     //         return false;
//     //     }
//     // }

 }

module.exports = DbService;