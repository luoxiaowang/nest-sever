import 'babel-polyfill'
import Schedule from '../models/schedule'
import Router from 'koa-router'
import { baseApi } from '../config'

const api = 'schedule'

const router = new Router();

router.prefix(`/${baseApi}/${api}`)

/* eslint-disable no-unused-vars, no-param-reassign, new-cap */

// GET /api/schedule
router.get('/', async(ctx) => {

  const { startDate, endDate } = ctx.query

  const filter = [
    {planDate: { $gte: startDate }},
    {planDate: { $lte: endDate }}
  ]

  const schedule = await Schedule.find({
    $and : filter
  })
  .sort({planDate: -1})

  ctx.body = {
    code: 200,
    data: schedule,
    msg: 'success'
  }
})

// POST /api/schedule/create
router.post('/create', async(ctx) => {
  const { planR, planDate } = ctx.request.body
  try {
    const scheduleResult = await queryScheduleByName(planR, planDate)
    if (scheduleResult && scheduleResult.length > 0) {
      ctx.body = {
        code: 500,
        data: scheduleResult,
        msg: ''
      }
    } else {
      const schedule = await new Schedule(ctx.request.body).save()
      ctx.body = {
        code: 200,
        data: schedule,
        msg: 'success'
      }
    }
  } catch (err) {
    ctx.throw(500)
  }
})

async function queryScheduleByName(planR, planDate) {
  const planRReg = new RegExp(planR, 'i')

  const filter = [
    {planR: { $regex: planRReg }},
    {planDate: planDate}
  ]
  const schedule = await Schedule.find({
    $and : filter
  })
  // console.log(schedule)
  return schedule
}

/* eslint-enable no-unused-vars, no-param-reassign, new-cap */

export default router
