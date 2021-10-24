import { createRequire } from "module";
const require = createRequire(import.meta.url);
import express from "express";
import basicAuth from "express-basic-auth";
import path from "path";
import mc_util from "minecraft-server-util";
import wol from "wol";
import broadcast from "broadcast-address";
import os from "os";
const __dirname = path.resolve();
const config = require(__dirname + "/config.json");
const app = express();

app.use(
    basicAuth({
        users: {
            [config.user]: config.password,
        },
        challenge: true,
        realm: "minecraft-starter", //para que el navegador recuerde la contraseña
    })
);
app.use("/public", express.static("public")); //js de cliente, imagen y sonido

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/index.html"));
});

app.get("/start", (req, res) => {
    let f = async () => {
        for (let intf in os.networkInterfaces()) {
            await wol.wake(config.mac, { address: broadcast(intf) }); //en windows, es obligatorio intentar enviar el paquete por todas las interfaces
        }
    };
    f().then(() => res.send());
});

app.get("/info", (req, res) => {
    mc_util
        .status(config.ip, { timeout: 3000 })
        .then((mc_res) => {
            let response = {};
            response["status"] = "OK";
            response["players"] = mc_res.onlinePlayers;
            res.send(response);
        })
        .catch((err) => {
            let response = {};
            response["status"] = "FAIL";
            res.send(response);
        });
});

app.listen(config.port, "0.0.0.0", () => {
    console.log(`Listening at http://localhost:${config.port}`);
});
