import { Request, Response } from "express";
import * as cardService from "../services/cardService";
import * as companieService from "../services/companieService";

export async function createCard(req: Request, res: Response) {
    const apiKey = String(req.headers["x-api-key"]);
    const { employeeId, type } = req.body;
    
    await companieService.validateApiKey(apiKey);
    const result = await cardService.createCard(employeeId, type);

    res.status(201).send("cartão criado com sucesso");
}