import 'babel-polyfill'
import Demand from '../models/demand'
import Router from 'koa-router'
import { baseApi } from '../config'

const api = 'demand'

const router = new Router();

router.prefix(`/${baseApi}/${api}`)

/* eslint-disable no-unused-vars, no-param-reassign, new-cap */

// GET /api/demand
router.get('/', async(ctx) => {
  const { name, testR, startDate, endDate, pageSize, currentPage } = ctx.query

  const nameReg = new RegExp(name, 'i')
  const testRReg = new RegExp(testR, 'i')

  const filter = [
    {name: { $regex: nameReg }},
    {testR: { $regex: testRReg }}
  ]

  if (startDate) {
    filter.push({actualDate: { $gte: startDate }})
    filter.push({actualDate: { $lte: endDate }})
  }

  const demand = await Demand.find({
    $and : filter
  })
  .sort({actualDate: -1})
  .skip((Number(currentPage) - 1) * Number(pageSize))
  .limit(Number(pageSize))

  const total = await Demand.count({
    $and : filter
  })

  ctx.body = {
    code: 200,
    data: demand,
    total: total,
    msg: 'success'
  }
})

// POST /api/demand/create
router.post('/create', async(ctx) => {
  try {
    const demand = await new Demand(ctx.request.body).save()
    ctx.body = {
      code: 200,
      data: demand,
      msg: 'success'
    }
  } catch (err) {
    ctx.throw(500)
  }
})

// GET /api/demand/create
router.get('/delete', async(ctx) => {
  try {
    const demand = await Demand.findByIdAndRemove(ctx.query.id)
    ctx.body = {
      code: 200,
      data: demand,
      msg: 'success'
    }
  } catch (err) {
    ctx.throw(500)
  }
})

// GET /api/demand/queryById
router.get('/queryById', async(ctx) => {
  try {
    const demand = await Demand.findById(ctx.query.id)
    ctx.body = {
      code: 200,
      data: demand,
      msg: 'success'
    }
  } catch (err) {
    ctx.throw(500)
  }
})

// GET /api/demand/update
router.post('/update', async(ctx) => {
  try {
    const demand = await Demand.findByIdAndUpdate(ctx.request.body._id, ctx.request.body)
    ctx.body = {
      code: 200,
      data: demand,
      msg: 'success'
    }
  } catch (err) {
    ctx.throw(500)
  }
})

/* eslint-enable no-unused-vars, no-param-reassign, new-cap */

export default router
