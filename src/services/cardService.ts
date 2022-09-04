import * as employeeRepository from "../repositories/employeeRepository";
import * as cardRepository from "../repositories/cardRepository";

import { TransactionTypes } from "../repositories/cardRepository";

import { faker } from '@faker-js/faker';
import dayjs from "dayjs";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

export async function createCard(employeeId: number, type: TransactionTypes) {
    //verifica se empregado está cadastrado
    const employee = await employeeRepository.findById(employeeId);
    if(!employee) {
        throw { code: "Not found", message: "empregado não cadastrado" }
    }

    //verifica se empregado já possui cartão deste tipo
    const verifyType = await cardRepository.findByTypeAndEmployeeId(type, employeeId)
    if(verifyType) {
        throw { code: "Conflict", message: "empregado já possui cartão deste tipo" }
    }

    //gera numero do cartão
    const number: string = String(faker.random.numeric(16));

    //gera nome no cartão
    const fullName = employee.fullName;
    const names = fullName.split(" ");
    let cardholderName = "";
    for(let i = 0; i < names.length; i++) {
        if(i === 0) {
            cardholderName += names[i].toUpperCase() + " ";
        } else if (i === names.length-1) {
            cardholderName += names[i].toUpperCase();
        } else if (names[i].length < 3) {
            continue;
        } else {
            cardholderName += names[i][0].toUpperCase() + " ";
        }
    }
    
    //gera data de expiração
    const expirationDate = dayjs().add(5, "year").format("MM/YY");

    //gera CVC
    const securityCode: string = String(faker.random.numeric(3));
    const secretKey = process.env.SECRET_KEY || "secret"
    const cryptr = new Cryptr(secretKey);

    //const encryptedString = cryptr.encrypt(securityCode);
    //const decryptedString = cryptr.decrypt(encryptedString);
}