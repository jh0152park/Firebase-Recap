import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

const app = express();
app.use(cors({ origin: true }));

app.post("/kakao", async (req, res) => {
    // TODO: API 구현하기
});

exports.auth = functions.https.onRequest(app);
