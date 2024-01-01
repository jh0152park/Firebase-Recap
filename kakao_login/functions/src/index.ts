import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {UserRecord} from "firebase-admin/lib/auth/user-record";
import * as express from "express";
import * as cors from "cors";
import axios from "axios";
import {KakaoUser} from "./@types";

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
app.use(cors({origin: true}));

const getToken = async (code: string): Promise<ITokenResponse> => {
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
};

const getKakaoUser = async (token: string): Promise<KakaoUser> => {
  const res = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {Authorization: `Bearer ${token}`},
  });
  return res.data;
};

const getAdminApp = () => {
  const serviceAccountKey = process.env.SERVICE_ACCOUNT_KEY || "";
  const app = !admin.apps.length ?
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey),
    }) :
    admin.app();
  return app;
};

const updateOrCreateUser = async (user: KakaoUser): Promise<UserRecord> => {
  const app = getAdminApp();
  const auth = admin.auth(app);

  const kakaoAccount = user.kakao_account;
  const props = {
    uid: `kakao:${user.id}`,
    provider: "KAKAO",
    displayName: kakaoAccount?.profile?.nickname,
    email: kakaoAccount?.email,
  };

  try {
    return await auth.updateUser(props.uid, props);
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      return await auth.createUser(props);
    }
    throw error;
  }
};

app.post("/kakao", async (req, res) => {
  const {code} = req.body;

  if (!code) {
    return res.status(400).json({
      code: 400,
      message: "code is a required parameter.",
    });
  }

  const response = await getToken(code);
  const token = response.access_token;
  const kakaoUser = await getKakaoUser(token);
  const authUser = await updateOrCreateUser(kakaoUser);
  const firebaseToken = await admin
    .auth()
    .createCustomToken(authUser.uid, {provider: "KAKAO"});

  return res.status(200).json({firebaseToken});
});

exports.auth = functions
  .runWith({secrets: ["SERVICE_ACCOUNT_KEY"]})
  .https.onRequest(app);
