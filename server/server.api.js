import gameRouter from "./routes/gameRouter";

export const registerApi = (apiRoute) => {

    apiRoute.use('/game', gameRouter);

    apiRoute.get('*', (req, res)=> {
        res.json({"fuck off": "fuck"})
    });

};

export default registerApi;
