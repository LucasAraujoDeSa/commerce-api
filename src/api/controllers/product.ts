import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { Product } from '../Entitie/Product';

export class ProductController {
  public async create(req: Request, res: Response): Promise<Response> {
    try{
      const name = await req.body.name
      const price = await req.body.price


      const repo = getRepository(Product);

      const product = repo.create({
        name,
        price
      })

      await repo.save(product)

      return res.status(201).json(product)
    }catch(err){
      return res.status(400).json(err.message)
    }
  }
  public async index(req: Request, res: Response): Promise<Response> {
    try{
      const repo = getRepository(Product);

      const products = await repo.find()

      return res.status(200).json(products)
    }catch(err){
      return res.status(400).json(err.message)
    }
  }
}
