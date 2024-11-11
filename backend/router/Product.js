import express, { Router } from 'express'
import { createproduct, deleteproduct, getcatebeauty, getcatfussion, getproduct, updateproduct } from '../Controller/ProductController.js';
import upload from '../utils/multer.js';
const router =Router();
router.get("/product",getproduct)
router.get("/product/fussion",getcatfussion)
router.get("/product/beauty",getcatebeauty)
router.post("/product", upload.single("image"),createproduct)
router.put("/product",updateproduct)
router.delete("/product",deleteproduct)
export default router;