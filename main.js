import express from 'express';
import cors from 'cors';
import axios from 'axios';
// import * as crypto from 'crypto';

// const apiKey = 'R5NJ7KG3-MZSXB1P9-FM9HN3DZ-K1COW4KF';
// const apiSecret = 'e3b6ede1e642765b8fd503302ad436c363beaf2b55b11e36dfc50e0a9ff3ea3e980684fd0b6a551e0fb403685e7b21a02ca11d474a373a7b908bdc051007780e';


// const apiKey = 'mq14Eu1ul5BmqMbyIT';
// const apiSecret = 'RRAKc7EXC0iPkgK31cvPPYIOjEZKhVNAUGJc';


// const baseUrl = 'https://poloniex.com/markets/BTS_BTC';
// const tradingUrl = 'https://poloniex.com/tradingApi';

// Пример запроса к общедоступному методу API
// axios.get('https://api.poloniex.com/markets/BTC_USDT/price')
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error(error);
//     });



const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/copart-proxy', async (req, res) => {
    const url = 'https://www.copart.com/public/lots/vehicle-finder-search-results';
    try {
        const response = await axios.post(url, req.body,{
            backUrl: "",
            defaultSort: false,
            displayName: "",
            filter: {
                FETI: ["lot_features_code:LOTFEATURE_X"],
                ENGN: [
                    "engine:\"0\"",
                    "engine:\"0.7L  2\"",
                    "engine:\"1.0L  3\"",
                    "engine:\"1.2L  3\"",
                    "engine:\"1.2L  4\"",
                    "engine:\"1.2L  R\"",
                    "engine:\"1.3L  3\"",
                    "engine:\"1.3L  4\"",
                    "engine:\"1.4L  4\"",
                    "engine:\"1.5L  3\"",
                    "engine:\"1.5L  4\"",
                    "engine:\"1.6L  4\"",
                    "engine:\"1.7L  4\"",
                    "engine:\"1.8L  4\"",
                    "engine:\"1.9L  4\"",
                    "engine:\"2  L  4\"",
                    "engine:\"2.0L  4\"",
                ],
                PRID: [
                    "damage_type_code:DAMAGECODE_HL",
                    "damage_type_code:DAMAGECODE_MN",
                    "damage_type_code:DAMAGECODE_NW",
                ],
                VEHT: ["vehicle_type_code:VEHTYPE_V"],
                YEAR: ["lot_year:[2019 TO 2024]"],
            },
            freeFormSearch: false,
            hideImages: false,
            includeTagByField: {},
            page: 0,
            query: ["*"],
            rawParams: {},
            searchName: "",
            size: 20,
            sort: ["salelight_priority asc", "member_damage_group_priority asc", "auction_date_type desc", "auction_date_utc asc"],
            specificRowProvided: false,
            start: 0,
            watchListOnly: false
        }, {
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "Access-Control-Allow-Headers": "Content-Type, X-XSRF-TOKEN",
                "Content-Type": "application/json",
                "Cookie": "visid_incap_242093=Q0hbJdiGRYivO/P4/KDYYTh7W2UAAAAAQUIPAAAAAAAzF+KZfv+RYSVe7hBNxTTU; _gcl_au=1.1.272840808.1700494139; _fbp=fb.1.1700494139607.1893972782; _tt_enable_cookie=1; _ttp=gD0okgNNLXrGhHLFEpLonyEjqrN; userCategory=RPU; _gid=GA1.2.1029332582.1700677344; g2app.search-table-rows=20; g2usersessionid=7d90a88ea25ffafd5ad77a7459772725; G2JSESSIONID=E7D86E933733217FCE802C0C5F89EF6A-n1; userLang=ru; nlbi_242093=Fi2WQ14AZljikipcJDHybgAAAAAQ1qx8z24Poy+ljyBjFsXS; _clck=1dccwzs%7C2%7Cfgy%7C0%7C1419; incap_ses_474_242093=BOEuV0Dz2QZyZ1fOuf2TBrwYX2UAAAAAHIszuCgO8Giz0qNbG5evMw==; usersessionid=a464acc53ef4b4804afa8864eaa2ad5e; OAID=ca385b97b16384191ba4fcf7838df812; g2app.hide-sale-light-tour=true; granify.session.JUFHS=-1; granify.new_user.JUFHS=false; reese84=3:mgKIV/kTXOSmuXJsUjf7kQ==:SxsR4nDM3kPMWHe34/VMpT++h7SuakkfkOGMbzbqXzYHReowo15EkiWTAFfQ9OdWN9XwA+M8bHVBXl/GR9QnawMUVq3lj2rc+gpdlwVNRxdGOqnz4OPJlffkja9t3I07QH4AVXHjX5WqIMEyR4SZjqkYTqliITp7V/OBpvUo6I93q3JL+t3oC7w5aCJ4QQKva7oci5fKZ5p1qnV6baScCxejTttXAkZVTRrrJvcl1TZsPwHoCgo7LyxIMXSU9Xi/jknoAMJSllRlU5ybz03exI+9g+hpIfroL1sTIXcwpdwV0WsnE1BHkpBRY6ipj3bu2m4N9hObeV5jAtpIL4aenhdAUvmtEOXun16oPabfB32L+y6LHAlwrNIYM5hwL1zVuZ9oiA5R8Zb+G4ByxWeKOCto5DDj94gAbOhXZgv0ulgl2tGbHFLFsTqL1jObi9ohltM0tipssfccGX3qWzCRHw13smaMKIF5mWjW8t/b2EA=:9RonXKUvrI06vjspdAtXMubvxdgD+lcm+n6/5I2RAog=; _clsk=1gyytnd%7C1700735920254%7C1%7C0%7Cz.clarity.ms%2Fcollect; nlbi_242093_2147483392=OT+SEMn9OTpD8EDNJDHybgAAAAA0CjsqOLl+AWtbnWjdES1j; _gat=1; _gat_UA-90930613-6=1; _ga_34B604LFFQ=GS1.1.1700735928.10.1.1700735928.60.0.0; _ga=GA1.1.1466728345.1700494139; _ga_VMJJLGQLHF=GS1.1.1700735928.9.1.1700735928.0.0.0; _uetsid=15641720896411eeb1f4712b5801198d; _uetvid=86da5e5087b911eea38eafff2f6220af; granify.uuid=ed43a8b8-8c00-469f-ad08-cc248b961fda",
                "Origin": "https://www.copart.com",
                "Referer": "https://www.copart.com/ru/vehicle-search-featured/hotitems?displayStr=Hot%20Items&from=%2FvehicleFinder&searchCriteria=%7B%22query%22:%5B%22*%22%5D,%22filter%22:%7B%22FETI%22:%5B%22lot_features_code:LOTFEATURE_X%22%5D,%22PRID%22:%5B%22damage_type_code:DAMAGECODE_HL%22,%22damage_type_code:DAMAGECODE_MN%22,%22damage_type_code:DAMAGECODE_NW%22%5D,%22VEHT%22:%5B%22vehicle_type_code:VEHTYPE_V%22%5D,%22ENGN%22:%5B%22engine:%5C%220%5C%22%22,%22engine:%5C%220.7L%20%202%5C%22%22,%22engine:%5C%221.0L%20%203%5C%22%22,%22engine:%5C%221.2L%20%203%5C%22%22,%22engine:%5C%221.2L%20%204%5C%22%22,%22engine:%5C%221.2L%20%20R%5C%22%22,%22engine:%5C%221.3L%20%203%5C%22%22,%22engine:%5C%221.3L%20%204%5C%22%22,%22engine:%5C%221.4L%20%204%5C%22%22,%22engine:%5C%221.5L%20%203%5C%22%22,%22engine:%5C%221.5L%20%204%5C%22%22,%22engine:%5C%221.6L%20%204%5C%22%22,%22engine:%5C%221.7L%20%204%5C%22%22,%22engine:%5C%221.8L%20%204%5C%22%22,%22engine:%5C%221.9L%20%204%5C%22%22,%22engine:%5C%222%20%20L%20%204%5C%22%22,%22engine:%5C%222.0L%20%204%5C%22%22%5D,%22YEAR%22:%5B%22lot_year:%5B2019%20TO%202024%5D%22%5D%7D,%22searchName%22:%22%22,%22watchListOnly%22:false,%22freeFormSearch%22:false%7D",
                "Sec-Ch-Ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                "Sec-Ch-Ua-Mobile": "?0",
                "Sec-Ch-Ua-Platform": "\"macOS\"",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
                "X-Requested-With": "XMLHttpRequest",
                "X-Xsrf-Token": "fd9de464-a4ef-4b43-b6b2-ffdc3229c5ff"
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(error.response ? error.response.status : 500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});




