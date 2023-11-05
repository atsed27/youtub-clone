import express from 'express';
import { addVideo,sub,UpdateVideo,search,random, getByTags, getVideo } from '../controller/video.js';
import { VerifyToken } from '../verifyToken.js';

const router = express.Router();
//add Video 

router.post("/",VerifyToken,addVideo);

router.put("/:id",VerifyToken,UpdateVideo);
router.delete("/:id",VerifyToken,addVideo);

//get video

router.get("/find/:id",getVideo);


//get random video on the server

router.get("/random",random);

//get subscribes channel of video

router.get("/sub",VerifyToken,sub)

//get video by tags

router.get("/tags",getByTags)

//get video by title

router.get("/search",search)



export default router;