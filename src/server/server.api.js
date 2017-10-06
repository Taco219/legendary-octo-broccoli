import gameRouter from "./routes/game";

export const registerApi = (apiRoute) => {
    apiRoute.use('/', gameRouter)
};

export default registerApi;