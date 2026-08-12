import 'dotenv/config';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { chatWithGeminitemp } from "./services/geminiService.js";
import groqchat from "./services/groqService.js";
const app = express();
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import messeges from './models/messeges.js';
app.use(express.json());
app.use(cors());
async function mognoconnection() {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("connected ");
}
mognoconnection();
app.get("/", (req, res) => {
    res.send("yes i am working fine ");
});
app.get("/messege", async (req, res) => {
    const msgarr = await messeges.find({});
    console.log(msgarr);
    res.json({ msgarr });
});
app.post("/response", async (req, res) => {
    try {
        let { msgobj } = req.body;
        console.log(msgobj);
        const msgarr = await messeges.find({});
        let newmsg = new messeges({ role: msgobj.role, content: msgobj.content });
        await newmsg.save();
        let newmsgarr = (msgarr) ? msgarr.map((e) => {
            return { role: e.role, content: e.content };
        }) : { user: msgobj.role, content: msgobj.content };
        console.log(newmsgarr);
        newmsgarr = [...newmsgarr, { role: msgobj.role, content: msgobj.content }];
        // const response=await chatWithGeminitemp(newmsgarr);
        const response = await groqchat(newmsgarr);
        console.log(response);
        if (response !== undefined) {
            let newmsgai = new messeges({
                role: "assistant", content: response
            });
            console.log(response);
            await newmsgai.save();
            res.send({ res: response });
        }
        else {
            let newmsgai = new messeges({
                role: "assistant", content: "i am quite busy at the time try later"
            });
            console.log(response);
            await newmsgai.save();
            res.send({ res: "i am quite busy at the time try later" });
        }
    }
    catch (err) {
        console.log(err);
    }
});
app.listen(5000, () => {
    console.log("yes it is workign ");
});
//# sourceMappingURL=server.js.map