import 'babel-polyfill'
import Fault from '../models/fault'
import Router from 'koa-router'
import { baseApi } from '../config'

const api = 'fault'

const router = new Router();

router.prefix(`/${baseApi}/${api}`)

/* eslint-disable no-unused-vars, no-param-reassign, new-cap */

// GET /api/fault
router.get('/', async(ctx) => {
  const { dutyR, startDate, endDate, pageSize, currentPage } = ctx.query

  const dutyRReg = new RegExp(dutyR, 'i')

  const filter = [
    {dutyR: { $regex: dutyRReg }}
  ]

  if (startDate) {
    filter.push({occurDate: { $gte: startDate }})
    filter.push({occurDate: { $lte: endDate }})
  }

  const fault = await Fault.find({
    $and : filter
  })
  .sort({occurDate: -1})
  .skip((Number(currentPage) - 1) * Number(pageSize))
  .limit(Number(pageSize))

  const total = await Fault.count({
    $and : filter
  })

  ctx.body = {
    code: 200,
    data: fault,
    total: total,
    msg: 'success'
  }
})

// POST /api/fault/create
router.post('/create', async(ctx) => {
  try {
    const fault = await new Fault(ctx.request.body).save()
    ctx.body = {
      code: 200,
      data: fault,
      msg: 'success'
    }
  } catch (err) {
    ctx.throw(500)
  }
})

// GET /api/fault/create
router.get('/delete', async(ctx) => {
  try {
    const fault = await Fault.findByIdAndRemove(ctx.query.id)
    ctx.body = {
      code: 200,
      data: fault,
      msg: 'success'
    }
  } catch (err) {
    ctx.throw(500)
  }
})

// GET /api/fault/queryById
router.get('/queryById', async(ctx) => {
  try {
    const fault = await Fault.findById(ctx.query.id)
    ctx.body = {
      code: 200,
      data: fault,
      msg: 'success'
    }
  } catch (err) {
    ctx.throw(500)
  }
})

// GET /api/fault/update
router.post('/update', async(ctx) => {
  try {
    const fault = await Fault.findByIdAndUpdate(ctx.request.body._id, ctx.request.body)
    ctx.body = {
      code: 200,
      data: fault,
      msg: 'success'
    }
  } catch (err) {
    ctx.throw(500)
  }
})

/* eslint-enable no-unused-vars, no-param-reassign, new-cap */

export default router
