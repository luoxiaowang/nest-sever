import 'babel-polyfill'
import _ from 'lodash'
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
    filter.push({actualOnlineDate: { $gte: startDate }})
    filter.push({actualOnlineDate: { $lte: endDate }})
  }

  let demand = []

  if (pageSize) {
    demand = await Demand.find({
      $and : filter
    })
    .sort({actualOnlineDate: -1})
    .skip((Number(currentPage) - 1) * Number(pageSize))
    .limit(Number(pageSize))
  } else {
    demand = await Demand.find({
      $and : filter
    })
    .sort({actualOnlineDate: -1})
  }

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

// GET  /api/demand/summary/
router.get('/summary', async(ctx) => {
  const { testR, startDate, endDate } = ctx.query
  const testRReg = new RegExp(testR, 'i')

  const filter = [
    {testR: { $regex: testRReg }}
  ]

  if (startDate) {
    filter.push({actualOnlineDate: { $gte: startDate }})
    filter.push({actualOnlineDate: { $lte: endDate }})
  }

  const demand = await Demand.find({
    $and : filter
  })
  .sort({actualOnlineDate: -1})

  let result = []
  const obj = _.groupBy(demand, 'testR')
  if (Object.keys(obj) && Object.keys(obj).length > 0) {
    Object.keys(obj).forEach(item => {
      const list = obj[item] || []
      const versionCount = list.length
      const testR = item
      let bugCount = 0
      let developPd = 0
      let testPd = 0
      let caseCount = 0
      list.forEach(o => {
        bugCount += (o.bugCount || 0)
        developPd += (o.developPd || 0)
        testPd += (o.testPd || 0)
        caseCount += (o.caseCount || 0)
      })
      result.push({
        testR,
        versionCount,
        bugCount,
        developPd: developPd.toFixed(1),
        testPd: testPd.toFixed(1),
        caseCount,
      })
    })
  }


  ctx.body = {
    code: 200,
    data: result,
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

// GET /api/demand/delete
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
