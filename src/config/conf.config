const mongoose =require('mongoose');

const conneceterdb =  async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connexion bien reussi")

    }catch(error){
        console.log({message: error.message});

    }

}

module.exports = conneceterdb 