import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import cardSchema from "../schemas/cardSchema";
import activeSchema from "../schemas/activeSchema";
import { createCard, activeCard, getBalanceById } from "../controllers/cardController";

const cardRouter = Router();

cardRouter.post("/card", validateSchema(cardSchema), createCard);
cardRouter.put("/card", validateSchema(activeSchema), activeCard);
cardRouter.get("/card/:cardId", getBalanceById);

export default cardRouter;