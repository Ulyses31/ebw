import express,{ Request, Response } from 'express';
import TagModel, { Tag } from "../../models/tag.js";
import axios from "axios";
const router = express.Router();

router.get("/tag/:tagId", async (req:Request, res: Response) => {
    const {tagId} = req.params;
    const tag: Tag|null = await TagModel.findOne({idEbw: tagId});
    console.log("TAG", tag);
    res.json(tag);
})

//POST a https://www.ebooksworld.ir/label/bookslist?labelId=id {page:}

async function getResourcesInTag(idTag: string, p: number) {
    let page = p || 0;
    let recursos = [];
    let data = null;
    let url = `https://www.ebooksworld.ir/label/bookslist?labelId=${idTag}`;
    do {
      console.log("Llamada", page);
      let response = await axios.post(url, { page });
      //console.log("despuesde linea 47")
      page+=1;
      let html = response.data;  
      data = await parsearRecursos(html);
      if (data.length>0) {      
        recursos.push(...data);      
      }
      //console.log("data", data);
    } while (data && data.length > 0);
    console.log("saliendo ");
    return recursos;
  }

export default router;