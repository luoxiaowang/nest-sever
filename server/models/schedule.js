import mongoose from 'mongoose'

const Schema = mongoose.Schema

const scheduleSchema = new Schema({
  name: String, // 需求名称
  planR: String, // 排期人
  planDate: String, // 日期
})

export default mongoose.model('Schedule', scheduleSchema)  // 这里Schedule代表的是名为schedules的mongodb collection名称
