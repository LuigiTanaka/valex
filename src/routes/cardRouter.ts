import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import cardSchema from "../schemas/cardSchema";
import activeSchema from "../schemas/activeSchema";
import blockSchema from "../schemas/blockSchema";
import { createCard, activeCard, getBalanceById, blockCard } from "../controllers/cardController";

const cardRouter = Router();

cardRouter.post("/card", validateSchema(cardSchema), createCard);
cardRouter.put("/card", validateSchema(activeSchema), activeCard);
cardRouter.put("/card/block", validateSchema(blockSchema), blockCard)
cardRouter.get("/card/:cardId", getBalanceById);

export default cardRouter;