import express, {Express, Request, Response} from "express";
import axios from "axios";
import cheerio from "cheerio";

const url_base = "https://www.ebooksworld.ir";
const app = express();

async function getTags() {
    let response = await axios(url_base);
    let html = await response.data;
    let lis = scrapearTags(html);
    return lis;
  }
  
  //Devuelve la lista de Tags de ebooksworld
  async function scrapearTags(html: string) {
    const $ = cheerio.load(html);
    const liHeader = $("li.nav-header>i.icon-tags").parent();
    let aux = liHeader.next("li");
    const lis = [];
    do {
      let link = aux.find("a").attr("href");
      lis.push({
        name: aux.text(),
        href: `${url_base}${link}`,
        idEbw: extraerIdTag(link),
      });
      aux = aux.next("li");
      let clase = $(aux).attr("class");
      if ((clase || "").includes("nav-header")) {
        break;
      }
    } while (aux && aux.get(0).tagName === "li");
    return lis;
  }
  
  function extraerIdTag(url: string|undefined) {
    return url?.split("/")[3];
  }


app.get("/", async (req: Request, res: Response) => {
    const m = await getTags();
    return res.status(200).json({msg:m.map(x=>{return x.idEbw})});
})

app.listen(5500,()=>{console.log("Chuscando 5500")});