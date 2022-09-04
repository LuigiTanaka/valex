import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import cardSchema from "../schemas/cardSchema";
import activeSchema from "../schemas/activeSchema";
import { createCard, activeCard } from "../controllers/cardController";

const cardRouter = Router();

cardRouter.post("/card", validateSchema(cardSchema), createCard);
cardRouter.put("/active-card", validateSchema(activeSchema), activeCard);

export default cardRouter;