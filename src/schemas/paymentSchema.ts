import joi from "joi";

const paymentSchema = joi.object({
    cardId: joi.number().integer().required(),
    password: joi.string().pattern(/^[0-9]{4}$/).required(),
    businessId: joi.number().integer().required(),
    amount: joi.number().integer().min(1).required()
});

export default paymentSchema;