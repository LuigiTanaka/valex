import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import cardSchema from "../schemas/cardSchema";
import { createCard } from "../controllers/cardController";

const cardRouter = Router();

cardRouter.post("/card", validateSchema(cardSchema), createCard);

export default cardRouter;