
import app from "./src/app.js";
import pool from "./src/config/db.js";

const port = process.env.PORT || 3001;

app.get("/", (req,res)=>{
    res.send({message: "Hey"});
});

async function startServer() {
    try{
        let result;
        result = await pool.query("SELECT 1");
        console.log("DB CONNECTED");
    }
    catch(error){
        console.error(error);
    }
};

startServer().then(() => {
    app.listen(port, ()=>{
        console.log(`http://localhost:${port}`);
        console.log(`Server running on port ${port}`);
    }).on('error', (err) => {
        console.error('Server error:', err);
        process.exit(1);
    });
}).catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});


