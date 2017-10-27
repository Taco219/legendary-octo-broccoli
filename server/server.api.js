import gameRouter from "./routes/gameRouter";

export const registerApi = (apiRoute) => {
    apiRoute.use('/', gameRouter)
};

export default registerApi;
