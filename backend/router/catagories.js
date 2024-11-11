import express from 'express';
import { Router } from "express";
import category from '../modal/categorymodal.js';
import mongoose from 'mongoose';
import { createcate, deletecategroy, getCategory, getonecate, updatecategory } from '../Controller/CategoryContoller.js';

const router = Router();

// GET /category route
router.get("/category", getCategory);
// get one router
router.get("/category/:id",getonecate)
// create category 
router.post("/category",createcate )
// update category
router.put("/category/:id", updatecategory)
// delete category
router.delete("/category/:id", deletecategroy)
export default router;
