import { DataService } from './../services/dataService';
import express from "express";
import db from '../db'
import { validationResult } from 'express-validator';

class _dataController {
    async index(req: express.Request, res: express.Response){
       let result = await DataService.getData()
       res.status(200).json(result)

    }

    async addData(req: express.Request, res: express.Response){
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) {
            res.status(400).json({
              errors: errors.array({ onlyFirstError: true })
            });
            return;
          }

       let result = await DataService.setData(req.body)
       res.status(200).json({data: result})
    }
}

export const dataController = new _dataController()