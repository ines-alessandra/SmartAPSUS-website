import dotenv from 'dotenv';
import fetch from 'node-fetch';
import express from 'express';
import querystring from 'querystring';
import cors from 'cors';

dotenv.config();    

const app = express();

const INSTA_TOKEN = process.env.INSTA_TOKEN;
const INSTA_USER_ID = process.env.INSTA_USER_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const ACCESS_CODE_FROM_STEP_1 = process.env.ACCESS_CODE_FROM_STEP_1;
let REFRESH_TOKEN = process.env.REFRESH_TOKEN;
let ACCESS_TOKEN = '';

app.use(cors());


// Função para codificar em Base64 usando o Buffer nativo do Node.js
function toBase64(str) {
    return Buffer.from(str).toString('base64');
}

// Função para obter o Refresh Token (apenas na primeira vez)
// async function getRefreshToken() {
//     try {
//         const base64authorization = toBase64(`${CLIENT_ID}:${CLIENT_SECRET}`);
//         const response = await fetch('https://api.dropbox.com/oauth2/token', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 Authorization: `Basic ${base64authorization}`,
//             },
//             body: querystring.stringify({
//                 code: ACCESS_CODE_FROM_STEP_1,
//                 grant_type: 'authorization_code',
//             }),
//         });

//         const data = await response.json();
//         if (!data.error) {
//             REFRESH_TOKEN = data.refresh_token;
//             console.log('Refresh Token Obtido:', REFRESH_TOKEN);
//         } else {
//             console.error('Erro ao obter Refresh Token:', data.error);
//         }
//     } catch (error) {
//         console.error('Erro ao obter Refresh Token:', error);
//     }
// }

async function refreshAccessToken() {
    try {
        const base64authorization = toBase64(`${CLIENT_ID}:${CLIENT_SECRET}`);
        const response = await fetch('https://api.dropbox.com/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${base64authorization}`,
            },
            body: querystring.stringify({
                refresh_token: REFRESH_TOKEN,
                grant_type: 'refresh_token',
            }),
        });

        const data = await response.json();
        ACCESS_TOKEN = data.access_token;
        console.log('Access Token Renovado:', ACCESS_TOKEN);
    } catch (error) {
        console.error('Erro ao renovar Access Token:', error);
    }
}

// Endpoint para fornecer o Access Token renovado ao frontend
app.get('/get-access-token', async (req, res) => {
    if (!REFRESH_TOKEN) {
        await getRefreshToken();
    }
    await refreshAccessToken();
    res.json({ access_token: ACCESS_TOKEN });
});

app.get('/get-insta-infos', (req, res) => {
    res.json({
        insta_token: INSTA_TOKEN,
        insta_user_id: INSTA_USER_ID
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    if (!REFRESH_TOKEN) {
        getRefreshToken();
    }
});