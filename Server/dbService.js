const mysql = require('mysql');
let instance = null;

const connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Ovaizali110*",
    database: "naiki",
    port: "3000"
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
    async setDonationReq(body) {
        try {
            const response = await new Promise((resolve, reject) => {
                var bind = [];
                var i = 0;
                for(i=0;i<=5;i++){
                    bind.push(body[i]);
                };
                var l;
                var s;
                var t;
                var loc = `select idLoc from location where LocName = ?`;
                connection.query(loc,bind[2],function(err,result)
                {
                    if(err) throw err;
                    l = result[0].idLoc;
                    console.log(l);
                    var type = `select type_id from donat_type where type_name = ?`;
                    connection.query(type,bind[3], function(err,result)
                    {
                        if(err) throw err;
                        t = result[0].type_id;
                        console.log(t);
                        var seeker = `select idSeeker from seeker where user_id = (select user_id from sys_user where cnic = ?)`;
                        connection.query(seeker,bind[1], function(err,result){
                            if(err) throw err;
                            s = result[0].idSeeker;
                            console.log(s);
                            let sql = `insert into donation_req (seeker_id,type_id,quantity,loc_id) values ("${s}",${t},"${bind[4]}",${l}")`;
                            connection.query(sql, function(err,result)
                            {
                                if(err) throw err;
                                resolve(result.insertId);
                            });
                        })
                    })
                })
            });
            console.log(response);
            return response;
        }catch (error) {
            console.log(error);
        }
    }
    // ZAEEM THIS FUNCTION IMPLEMENTATION CAN HELP YOU, CHECK OTHER COMMENTED TOO
    // async getDonationData() {
    //     try {
    //         const response = await new Promise((resolve, reject) => {
    //             const query = "select dt.type_id, type_name from donat_type dt Join donation_req dr on dt.type_id = dr.type_id;";

    //             connection.query(query, (err, results) => {
    //                 if (err) reject(new Error(err.message));
    //                 resolve(results);
    //             })
    //         });
    //         // console.log(response);
    //         return response;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

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