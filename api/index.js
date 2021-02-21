import { App } from '@tinyhttp/app'
import { cors } from '@tinyhttp/cors'
import { logger } from '@tinyhttp/logger'
import bodyParser from 'body-parser'

const app = new App({
    onError: (err, req, res) => {
        res.status(500).send({
            message: err.message,
        })
    },
})

app
    .use(cors({ origin: 'http://localhost:8080', allowedHeaders: ['Content-Type'] }))
    .use(logger())
    .use(bodyParser.json())
    .get('/api/service-types', async (req, res) => {
        const data = {
            "data": [
                {
                    "display_name": "Benefits",
                    "id": "benefits"
                },
                {
                    "display_name": "Employment",
                    "id": "employment"
                },
                {
                    "display_name": "Healthcare",
                    "id": "healthcare"
                },
                {
                    "display_name": "Housing",
                    "id": "housing"
                },
                {
                    "display_name": "Legal",
                    "id": "legal"
                }
            ]
        };
        res.status(200).send(JSON.stringify(data));
    })
    .post("/api/assistance-requests", async (req, res) => {
        console.log(req.body);
        const responses = [
            {
                status: 201,
                echo: req.body,
                message: "Your assistance request has been successfully submitted.",
            },
            {
                status: 401,
                echo: req.body,
                message: "Sorry, you are not authorized to make this request.",
            },
            {
                status: 500,
                echo: req.body,
                message: "Oh no! Something completely unexpected happened!",
            },
            {
                status: 503,
                echo: req.body,
                message: "We're down!!!!!! Come back later.....(please)",
            },
        ];
        const randomSelection = Math.floor(Math.random() * responses.length);
        res.status(responses[randomSelection].status).send(JSON.stringify(responses[randomSelection]));
    })
    .listen(process.env.PORT || 5000)