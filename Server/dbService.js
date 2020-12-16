const mysql = require('mysql');
const config = require('./config.js')
let instance = null;

const connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "ma325ksa",
    database: "naiki",
    //port: "3000"
});
const confconnection = mysql.createConnection(config);
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
                const query = "call login()";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response[0]);
            return response[0];
        } catch (error) {
            console.log(error);
        }
    }

    async getDonationData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "select dt.type_id, type_name from donat_type dt Join donation_req dr on dt.type_id = dr.type_id;";

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

    async getDonationType() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "select type_name from donat_type";
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

    async getSignUpDetails() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM sys_user;";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertUser(name,cnic,gender,contact,email,city,password){
        try{
            const response = await new Promise((resolve, reject)=>{
                var l;
                var loc = `select idLoc from location where LocName = ?`;
                connection.query(loc,city, function(err, result)
                {
                    if(err) throw err;
                    l = result[0].idLoc;
                    console.log(l);
                    let sql = `insert into sys_user (name,cnic,gender,contact,email,loc_id,password) values ("${name}",${cnic},"${gender}",${contact},"${email}",${l},"${password}")`;
                    connection.query(sql, function(err,result)
                    {
                        if(err) throw err;
                        var uid;
                        var id = `select user_id from sys_user where cnic = ?`;
                        connection.query(id,cnic, function(err, result)
                        {
                            if(err) throw err;
                            uid = result[0].user_id;
                            console.log("uid"+uid);
                            let sql = `call new_donor_seeker(?)`;
                            connection.query(sql,uid, function(err,result)
                            {
                                    if(err) throw err;
                                    resolve(result.insertId);
                                    console.log(result.insertId);
                                    return result.insertId;
                            });
                         })
                    });
                })
            });
        }catch (error) {
            console.log(error);
        }
    }

    async checkseeker(){
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT cnic from sys_user where user_id in (select user_id from seeker);";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // async createseekerdonor(cnic){
    //     try{
    //         const response = await new Promise((resolve, reject)=>{
    //             var uid;
    //             var id = `select user_id from sys_user where cnic = ?`;
    //             connection.query(id,cnic, function(err, result)
    //             {
    //                 if(err) throw err;
    //                 uid = result[0].user_id;
    //                 console.log("uid"+uid);
    //                 let sql = `insert into seeker (user_id) value (${uid})`;
    //                 connection.query(sql, function(err,result)
    //                 {
    //                     if(err) throw err;
    //                     resolve(result.insertId);
    //                     sql = `insert into donor (user_id) value (${uid})`;
    //                     connection.query(sql, function(err,result)
    //                     {
    //                         if(err) throw err;
    //                         resolve(result.insertId);
    //                         return result.insertId;
    //                     });
    //                 });
    //             })
    //         });
    //     }catch (error) {
    //         console.log(error);
    //     }
    // }

    async setDonationReq(Name, cnic, city, type, quantity) {
        try {
            const response = await new Promise((resolve, reject) => {
                var l;
                var s;
                var t;
                var loc = `select idLoc from location where LocName = ?`;
                connection.query(loc,city,function(err,result)
                {
                    if(err) throw err;
                    l = result[0].idLoc;
                    console.log(l);
                    var typ = `select type_id from donat_type where type_name = ?`;
                    connection.query(typ,type, function(err,result)
                    {
                        if(err) throw err;
                        t = result[0].type_id;
                        console.log(t);
                        var seeker = `select idSeeker from seeker where user_id in (select user_id from sys_user where cnic = ?)`;
                        connection.query(seeker,cnic, function(err,result){
                            if(err) throw err;
                            s = result[0].idSeeker;
                            console.log(s);
                            let sql = `insert into donation_req (seeker_id,type_id,quantity,loc_id) values (${s},${t},"${quantity}",${l})`;
                            connection.query(sql, function(err,result)
                            {
                                if(err) throw err;
                                resolve(result.insertId);
                                return result.insertId;
                            });
                        })
                    })
                })
            });
        }catch (error) {
            console.log(error);
        }
    }

    async setDonation(Name, cnic, city, type, quantity) {
        try {
            const response = await new Promise((resolve, reject) => {
                var l;
                var d;
                var t;
                var loc = `select idLoc from location where LocName = ?`;
                connection.query(loc,city,function(err,result)
                {
                    if(err) throw err;
                    l = result[0].idLoc;
                    console.log(l);
                    var typ = `select type_id from donat_type where type_name = ?`;
                    connection.query(typ,type, function(err,result)
                    {
                        if(err) throw err;
                        t = result[0].type_id;
                        console.log(t);
                        var donor = `select idDonor from donor where user_id in (select user_id from sys_user where cnic = ?)`;
                        connection.query(donor,cnic, function(err,result){
                            if(err) throw err;
                            d = result[0].idDonor;
                            console.log(d);
                            let sql = `insert into donation (donor_id,type_id,quantity,loc_id) values (${d},${t},"${quantity}",${l})`;
                            connection.query(sql, function(err,result)
                            {
                                if(err) throw err;
                                resolve(result.insertId);
                                return result.insertId;
                            });
                        })
                    })
                })
            });
        }catch (error) {
            console.log(error);
        }
    }

async getNgoEmpDetails() {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "sselect u.cnic from sys_user u Join ngo_emp e on e.user_id = u.user_id;";
            connection.query(query, (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
         });
        // console.log(response);
        return response;
    }catch (error) {
        console.log(error);
    }    
}
async getAllReqData() {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "select req.don_id, u.name, t.type_name, req.quantity, u.contact from donation_req req join sys_user u join donat_type t join seeker s where s.idSeeker = req.seeker_id and t.type_id = req.type_id and s.user_id = u.user_id;";

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

async getAllDonatData() {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "select don.donat_id, u.name, t.type_name, don.quantity, u.contact from donation don join sys_user u join donat_type t join donor d where d.idDonor = don.donor_id and t.type_id = don.type_id and d.user_id = u.user_id; ";

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

async getAllTypeData() {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "select type_name from donat_type;";

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

async getAllCityData() {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "select LocName from location;";

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

async dispDonor(type) {
    try {
        const response = await new Promise((resolve, reject) => {
            const sql = 'select type_id from donat_type where type_name = ?'
            connection.query(sql, type,(err, results)=> {
                if(err) throw err;
                var typ = results[0].type_id;
                // console.log(typ);
                const query = `select distinct u.cnic from sys_user u join donor d join donation don where u.user_id = d.user_id and d.idDonor = don.donor_id and don.type_id = ${typ};`;
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })            
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

async dispSeeker(type,dcnic) {
    try {
        const response = await new Promise((resolve, reject) => {
            var typ;
            const sql = 'select type_id from donat_type where type_name = ?'
            connection.query(sql, type,(err, results)=> {
                if(err) throw err;
                typ = results[0].type_id;
                console.log(typ);
                const query = `select  distinct u.cnic from sys_user u join seeker s join donation_req req where u.user_id = s.user_id and s.idSeeker = req.seeker_id and req.type_id = ${typ} and u.cnic <> ${dcnic};`;
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })            
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

async dispAmount(cnic) {
    try {
        const response = await new Promise((resolve, reject) => {
        const query = `select don.quantity from sys_user u join donation don join donor d 
        where don.donor_id = d.idDonor and d.user_id = u.user_id and u.cnic = ${cnic} and don.quantity>0 limit 1;`;
        connection.query(query, (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
            })           
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

async disp_Req_Amount(cnic) {
    try {
        // console.log(cnic);
        const response = await new Promise((resolve, reject) => {
        const query = `select req.quantity from sys_user u join donation_req req join seeker s 
        where req.seeker_id = s.idSeeker and s.user_id = u.user_id and u.cnic = ${cnic} and req.quantity>0 limit 1;`;
        connection.query(query, (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
            })           
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

async insertMatch(type, don_cnic, seek_cnic, don_amount, req_amount){
    try{
        const response = await new Promise((resolve, reject) => {
            var s_id;
            var d_id;
            var dona_id;
            let query = `select don_id from donation_req req where req.seeker_id in (select s.idSeeker from seeker s where s.user_id = ( select u.user_id from sys_user u where u.cnic = ${seek_cnic})) and req.type_id = (select t.type_id from donat_type t where t.type_name = "${type}") and quantity = ${req_amount};`;
            connection.query(query,(err,results)=> {
                if(err) throw err;
                s_id = results[0].don_id;
                console.log(s_id+"sid");
                query = `select donor_id, donat_id from donation where type_id = (select type_id from donat_type where type_name = "${type}") and quantity = ${don_amount} limit 1;`;
                connection.query(query,(err,results)=>{
                    if(err) throw err;
                    d_id = results[0].donor_id;
                    dona_id = results[0].donat_id;
                    console.log(d_id+"did");
                    console.log(dona_id+"dona_id");
                    var rem_s = req_amount - don_amount;
                    if(rem_s<0)
                        rem_s = 0;
                    var rem_d = don_amount - req_amount;
                    if(rem_d<0)
                        rem_d = 0;
                    console.log(rem_s+"rem_s");
                    console.log(rem_d+"rem_d");
                    let sql = `insert into don_details(don_id, donor_id, donat_amount, rem_amount) values(${s_id}, ${d_id}, ${don_amount}, ${rem_s});`;
                    connection.query(sql, (err,results)=>{
                        if(err) throw err;
                        sql = `update donation set quantity = ${rem_d} where donat_id = ${dona_id};`;
                        connection.query(sql, function(err,result)
                        {
                            if(err) throw err;
                            sql = `update donation_req set quantity = ${rem_s} where don_id = ${s_id};`;
                            connection.query(sql, function(err,result)
                            {
                                if(err) throw err;
                                resolve(result.insertId);
                                return result.insertId;
                            });
                    
                        });
                    })
                })
            })
        });
    } catch (error){
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