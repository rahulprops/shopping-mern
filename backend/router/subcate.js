import express, { Router } from 'express'
import { createsubcate, deletesubcate, getonesubcate, getsubcate, updatesubcate } from '../Controller/SubcateController.js'
import multer from 'multer'
const upload=multer()
const router =Router()

// get router
router.get("/subcate",getsubcate)
// get one router
router.get("/subcate/query",getonesubcate)
// create router
router.post("/subcate", upload.none() , createsubcate)
// update router
router.put("/subcate/:id",updatesubcate)
// delete router
router.delete("/subcate/:id", deletesubcate)

export default router;