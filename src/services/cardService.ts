import * as employeeRepository from "../repositories/employeeRepository";
import * as cardRepository from "../repositories/cardRepository";

import { TransactionTypes } from "../repositories/cardRepository";
import { CardInsertData } from "../repositories/cardRepository";
import { CardUpdateData } from "../repositories/cardRepository";

import { faker } from '@faker-js/faker';
import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Console } from "console";

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
    const encryptedSecurityCode = cryptr.encrypt(securityCode);

    //cria cartão
    const cardData: CardInsertData = {
        employeeId,
        number,
        cardholderName,
        securityCode: encryptedSecurityCode,
        expirationDate,
        password: undefined,
        isVirtual: false,
        originalCardId: undefined,
        isBlocked: false,
        type,
    }

    await cardRepository.insert(cardData)
}

export async function activeCard(cardId: number, CVC: string, password: string) {
    //verifica se cartão está cadastrado
    const card = await cardRepository.findById(cardId);
    if(!card) {
        throw { code: "Not found", message: "cartão não cadastrado" }
    }

    //verifica se cartão já está expirado
    const now = dayjs().format("MM/YY");
    const monthNow: number = Number(now.split("/")[0]);
    const yearNow: number = Number(now.split("/")[1]);
    const monthExpiration: number = Number(card.expirationDate.split("/")[0]);
    const yearExpiration: number = Number(card.expirationDate.split("/")[1]);

    const expiredCard = yearNow > yearExpiration || yearNow === yearExpiration && monthNow > monthExpiration

    if(expiredCard) {
        throw { code: "Bad request", message: "cartão expirado" }
    }

    //verifica se cartão já está ativado
    if(card.password) {
        throw { code: "Conflit", message: "cartão já ativado" }
    }

    //verifica CVC
    const secretKey = process.env.SECRET_KEY || "secret"
    const cryptr = new Cryptr(secretKey);
    const decryptedSecurityCode = cryptr.decrypt(card.securityCode);
    console.log(decryptedSecurityCode);
    if(decryptedSecurityCode !== CVC) {
        throw { code: "Unauthorized", message: "CVC incorreto" }
    }

    //criptografa senha
    const SALT = 10;
    const passwordHash = bcrypt.hashSync(password, SALT);

    //ativa cartão
    const cardData: CardUpdateData = {
        password: passwordHash
    }

    await cardRepository.update(cardId, cardData);
}