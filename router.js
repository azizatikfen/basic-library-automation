const path      = require('path');
const mongoose  = require('mongoose');
const Users     = mongoose.model('Users');
const Books     = mongoose.model('Books');

module.exports = function(app){


    app.get('/login',(req,res) =>{

        res.sendFile(path.join(__dirname+'/pages/login/select/main.html'));
    
    });

    app.get('/login/user',(req,res) =>{
    
        res.sendFile(path.join(__dirname+'/pages/login/user/main.html'));
    
    });
    
    app.post('/login/api/user',(req,res)=>{
        const { body: { user } } = req;


        if(!user.username) {
      
          return res.status(422).json({
            errors: "KAH"
          });
        
        }
      
        if(!user.password) {

          return res.status(422).json({
            errors: "SH"
          });

        }
        
        Users.findOne({ username: user.username, password: user.password })
        .then((user)=>{
            if(user === null){ 
                return res.status(422).json({
                    errors: "SKH"
                  });
            }
            if(user.admin){
                return res.status(422).json({
                    errors: "ADH"
                  });
            }
            return res.send(user);
        }).catch(err => {
            if (err) throw err;            
        });

    })
    
    app.get('/login/admin',(req,res) =>{
    
        res.sendFile(path.join(__dirname+'/pages/login/admin/main.html'));
    
    });
    
    app.post('/login/api/admin',(req,res)=>{
        const { body: { user } } = req;

        if(!user.username) {
      
          return res.status(422).json({
            errors: "KAH"
          });
        
        }
      
        if(!user.password) {

          return res.status(422).json({
            errors: "SH"
          });

        }
        
        Users.findOne({ username: user.username, password: user.password })
        .then((user)=>{
            if(user === null){ 
                return res.status(422).json({
                    errors: "SKH"
                  });
            }
            if(!user.admin){
                return res.status(422).json({
                    errors: "ADH"
                  });
            }
            return res.send(user);
        }).catch(err => {
            if (err) throw err;
        });


    
    })
    
    app.get('/main/user',(req,res)=>{
        res.sendFile(path.join(__dirname+'/pages/main/user/main.html'));
    });
    app.get('/main/admin',(req,res)=>{
        res.sendFile(path.join(__dirname+'/pages/main/admin/main.html'));
    });
   app.post('/api/user',(req,res)=>{
        const { body } = req;
        if(body.auth !== 10293847566){
            return res.status(422).json({
                errors: "SKH"
              });
        }
        if(!body._id){
            return res.status(422).json({
                errors: "SKH"
              });
        }
        Users.findOne({_id:body._id})
        .then((user)=>{
            return res.send(user);
        }).catch(err => {
            if (err) throw err;
        });
   });
   app.post('/api/books',(req,res)=>{
    const { body } = req;
    if(body.auth !== 10293847566){
        return res.status(422).json({
            errors: "SKH"
          });
    }
    if(!body._id){
        return res.status(422).json({
            errors: "SKH"
          });
    }
    Books.findOne({_id:body._id})
    .then((user)=>{
        return res.send(user);
    }).catch(err => {
        if (err) throw err;
    });
   });
   app.get('/all/user',(req,res)=>{
       Users.find()
       .then((user)=>{
           res.send(user)
    }).catch((err)=>{if (err) throw err;})

   }); //Kapatilacak
   app.get('/all/book',(req,res)=>{
    Books.find()
    .then((user)=>{
        res.send(user)
  }).catch((err)=>{if (err) throw err;})

   }); //Kapatilacak 
   app.post('/api/serach/book',(req,res)=>{
       const {body} = req;
       if(!body.type){
        return res.status(422).json({
            errors: "TH"
          });
       }
       if(!body.serach){
        Books.find({})
        .then((data)=>{
            return res.send(data)
        })
        return 0;
       }
       if(body.type === 1 ){
        Books.find({name:body.serach})
        .then((data)=>{
            return res.send(data)
        }).catch((err)=>{if (err) throw err;});
       }
       else if(body.type === 2 ){
        Books.find({publishinghouse:body.serach})
        .then((data)=>{
            return res.send(data)
        }).catch((err)=>{if (err) throw err;})
       }
       else if(body.type === 3 ){
        Books.find({printedyear:body.serach})
        .then((data)=>{
            return res.send(data)
        }).catch((err)=>{if (err) throw err;})
       }
       else if(body.type === 4 ){
        Books.find({no:body.serach})
        .then((data)=>{
            return res.send(data)
        }).catch((err)=>{if (err) throw err;})
       }
       else if(body.type === 5 ){
        Books.find({author:body.serach})
        .then((data)=>{
            return res.send(data)
        }).catch((err)=>{if (err) throw err;})
       }
       
   })
   app.post('/api/create/book',(req,res)=>{
    const {body} = req;
    if(body.auth !== 10293847566){
        return res.status(422).json({
            errors: "AH"
          });
    }
    Books.findOne({no:body.no})
    .then((data)=>{
        if(data !== null){
            return res.status(422).json({
                errors: "KH"
              });
        }else{
            Books.create({
                name:body.name,
                user: null,
                timeleft: null,
                author:body.author,
                printedyear:body.printedyear,
                publishinghouse:body.publishinghouse,
                no:body.no
            }).then((book)=>{
                return res.send(book)
            }).catch((err)=>{if (err) throw err;})
        }
        
    })
    
    
   })
   app.post("/api/create/user",(req,res)=>{
       const {body} = req;
       if(body.auth !== 10293847566){
        return res.status(422).json({
            errors: "AH"
          });
        }
        if(!body.admin){
            body.admin = false
        }
        Users.findOne({no:body.no})
        .then((user)=>{
            if(user !== null){
              return res.status(422).json({
                    errors: "KH"
                });
            }else{
                Users.create({
                    password:body.password,
                    username:body.username,
                    name:body.name,
                    books:[],
                    teslim:[],
                    admin:body.admin,
                    no:body.no
                })
                .then((user)=>{
                    return res.send(user)
                })
                .catch((err)=>{if (err) throw err;})
            }
        })
        .catch((err)=>{if (err) throw err;})
    
    
   }) 
   app.post('/api/serach/user',(req,res)=>{
       const {body} = req;
       if (!body.serach){
        Users.find({admin:false})
        .then((data)=>{
            let user = data
            for (i in user){
                try{
                user[i].password = null;
                user[i].username = null;
                }catch{
                    null;
                }
            }
            return res.send(user)
        })
        return 0;
       }
       if (!body.type){
        return res.status(422).json({
            errors: "H"
          });
       }
       if(body.type === 1){
           Users.find({name:body.serach,admin:false})
           .then((data)=>{
            let user = data
            for (i in user){
                try{
                user[i].password = null;
                user[i].username = null;
                }catch{

                }
            }
            return res.send(user)
           })
           .catch((err)=>{if (err) throw err;})
           return 0;
       }
       if(body.type === 2){
        Users.find({no:body.serach,admin:false})
        .then((data)=>{
            let user = data
            for (i in user){
                try{
                user[i].password = null;
                user[i].username = null;
                }catch{

                }
            }
            return res.send(user)
        })
        .catch((err)=>{if (err) throw err;})
        return 0;
    }
   })
   app.post('/api/serach/book/id',(req,res)=>{
       const {body} = req;
       if(body.auth !== 10293847566){
        return res.status(422).json({
            errors: "H"
          });
       }
       Books.findOne({_id:body.id})
       .then((book)=>{
           if (!book){
            return res.status(422).json({
                errors: "BH"
              });
           }
           res.send({name:book.name})
       })
   })
   app.post('/api/serach/user/id',(req,res)=>{
    const {body} = req;
    if(body.auth !== 10293847566){
     return res.status(422).json({
         errors: "H"
       });
    }
    Users.findOne({_id:body.id})
    .then((book)=>{
        if (!book){
         return res.status(422).json({
             errors: "BH"
           });
        }
        res.send({name:book.name})
    })
})
   app.post('/api/ver',(req,res)=>{
       const {body} = req;
       if(!body.book){
        return res.status(422).json({
            errors: "H"
          });
        }
        if(!body.user){
            return res.status(422).json({
                errors: "H"
              });
            }
        if(!body.book){
            return res.status(422).json({
                errors: "H"
            });
        }
        if(body.auth !== 10293847566){
            return res.status(422).json({
                errors: "H"
            });       
        }
        Users.findOne({no:body.user,admin:false})
            .then((data)=>{
                if(!data){
                    return res.status(422).json({
                        errors: "U"
                    });
                }    
                Books.findOne({no:body.book})
                    .then((book)=>{
                        if(!book){
                            return res.status(422).json({
                                errors: "K"
                            });
                        }
                        var a = false
                        for (i in data.teslim){
                            let t1 = JSON.stringify(data.teslim[i])
                            if(t1 === JSON.stringify(book._id)){
                                a = true
                            }
                        }
                        if (a){
                            return res.status(422).json({
                                errors: "KKY"
                            });                  
                          }
                        data.teslim.push(book._id)
                        book.user = data._id
                        data.save()
                        book.save()
                        res.status(200).json({
                            errors:"B"
                        })
                    })
                })
            
        
   })
   app.post('/api/al',(req,res)=>{
    const {body} = req;
    if(!body.book){
     return res.status(422).json({
         errors: "H"
       });
     }
     if(!body.user){
         return res.status(422).json({
             errors: "H"
           });
         }
     if(!body.book){
         return res.status(422).json({
             errors: "H"
         });
     }
     if(body.auth !== 10293847566){
         return res.status(422).json({
             errors: "H"
         });       
     }
     Users.findOne({no:body.user,admin:false})
            .then((data)=>{
                if(!data){
                    return res.status(422).json({
                        errors: "U"
                    });
                }    
                
                Books.findOne({no:body.book})
                    .then((book)=>{
                        if(!book){
                            return res.status(422).json({
                                errors: "K"
                            });
                        }
                        var a = false
                        for (i in data.teslim){
                            let t1 = JSON.stringify(data.teslim[i])
                            if(t1 === JSON.stringify(book._id)){
                                a = true
                            }
                        }
                        if (!a){
                            return res.status(422).json({
                                errors: "KKY"
                            });                  
                          }
                        try {
                            book.user = null
                            for(i in data.teslim){
                                if (parseInt(i+1)){
                                    let t1 = JSON.stringify(data.teslim[i]);
                                    if(t1 === JSON.stringify(book._id)){
                                        data.teslim.splice(i,i+1)
                                    }
                                }
                            }
                            data.books.push(book._id)
                            book.save()
                            data.save()
                        } catch {
                            return res.status(422).json({
                                errors: "D"
                            });
                        }

                        res.status(200).json({
                            errors:"B"
                        })
                    }).catch((err)=>{if (err) throw err;})
                })

   })
   app.get('/image',(req,res)=>{
    res.sendFile(path.join(__dirname+'/images/logo.png'));
    })
    
}