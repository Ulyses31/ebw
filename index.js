var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import axios from "axios";
import cheerio from "cheerio";
const url_base = "https://www.ebooksworld.ir";
const app = express();
function getTags() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield axios(url_base);
        let html = yield response.data;
        let lis = scrapearTags(html);
        return lis;
    });
}
//Devuelve la lista de Tags de ebooksworld
function scrapearTags(html) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
function extraerIdTag(url) {
    return url === null || url === void 0 ? void 0 : url.split("/")[3];
}
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const m = yield getTags();
    return res.status(200).json({ msg: m.map(x => { return x.idEbw; }) });
}));
app.listen(5500, () => { console.log("Chuscando 5500"); });
