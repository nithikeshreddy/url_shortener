import {nanoid} from "nanoid";
import { createShortUrl } from "../models/url.model.js";
import {findUrlByShortCode} from "../models/url.model.js";
import {incrementClickCount} from "../models/url.model.js";

export async function shortenUrl(req, res) {

    try{

        const {originalUrl} = req.body;

        if(!originalUrl) return res.status(400).json({message: "..."});

        const shortCode = nanoid(7);

        const newUrl = await createShortUrl(originalUrl, shortCode);

        
        const shortUrl = `${process.env.BASE_URL}/${newUrl.short_code}`;
        return res.status(201).json({
        shortUrl: shortUrl
        
});
    } catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
    

};

export async function redirectUrl(req,res) {
    try{
        const {shortCode} = req.params;

        if(!shortCode) return res.status(400).json({message: "URL not found"});


        const url = await findUrlByShortCode(shortCode);

        if(!url) return res.status(404).json({message: "URL not found"});
        await incrementClickCount(shortCode);

        return res.redirect(url.original_url);
    } catch(error){
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};