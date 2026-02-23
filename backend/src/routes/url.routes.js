import express from "express";
import {shortenUrl} from "../controllers/url.controller.js";
import {redirectUrl} from "../controllers/url.controller.js";


import {Router} from "express";
const router = Router();

router.post("/shorten", shortenUrl);

router.get("/:shortCode", redirectUrl);

export default router;

