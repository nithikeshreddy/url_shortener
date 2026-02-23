import pool from "../config/db.js";

export async function createShortUrl(originalUrl, shortCode){
    try{
        let result;
        result = await pool.query({
            text: "INSERT INTO urls (original_url, short_code) VALUES ($1, $2) RETURNING *",
            values: [originalUrl, shortCode] 
        });
        return result.rows[0];
    }
    catch(error){
        console.error(error);
        throw error;
    }
};

export async function findUrlByShortCode(shortCode) {
    try{
        let result;
        result = await pool.query({
            text: "SELECT * FROM urls WHERE short_code = $1",
            values: [shortCode]
        });

        return result.rows[0];
    }

    catch(error){
        console.error(error);
        throw error;
    }
};


export async function incrementClickCount(shortCode){
    try{
        let result;
        result = await pool.query({
            text: "UPDATE urls SET click_count = click_count + 1 WHERE short_code = $1",
            values: [shortCode]
        });

        return ;
    }
    catch(error){
        console.error(error);
        throw error;
    }
};