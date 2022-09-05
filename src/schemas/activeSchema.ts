import joi from "joi";

const activeSchema = joi.object({
    cardId: joi.number().required(),
    CVC: joi.string().pattern(/^[0-9]{3}$/).required(),
    password: joi.string().pattern(/^[0-9]{4}$/).required()
});

export default activeSchema;