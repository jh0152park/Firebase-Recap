import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import axios from "axios";
import { config } from "dotenv";
import { KakaoUser } from "./@types";

interface ITokenResponse {
    token_type: string;
    access_token: string;
    id_token?: string;
    expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: number;
    scope?: string;
}

const app = express();
app.use(cors({ origin: true }));

async function getToken(code: string): Promise<ITokenResponse> {
    const body = {
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_KAKAO_REST_API_KEY as "",
        redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI as "",
        code: code,
    };

    const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        new URLSearchParams(body)
    );
    return res.data;
}

async function getKakaoUser(token: string): Promise<KakaoUser> {
    const res = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

app.post("/kakao", async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({
            code: 400,
            message: "code is a required parameter.",
        });
    }

    const response = await getToken(code);
    const token = response.access_token;
    const kakaoUser = await getKakaoUser(token);
});

exports.auth = functions.https.onRequest(app);
