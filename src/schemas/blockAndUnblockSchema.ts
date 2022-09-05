import joi from "joi";

const blockAndUnblockSchema = joi.object({
    cardId: joi.number().required(),
    password: joi.string().pattern(/^[0-9]{4}$/).required()
});

export default blockAndUnblockSchema;