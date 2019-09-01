import mongoose from 'mongoose'

const Schema = mongoose.Schema

const demandSchema = new Schema({
  name: String, // 需求名称
  link: String, // 需求链接
  demandR: String, // 需求主R
  developR: String, // 开发主R
  testR: String, // 测试主R
  planDate: String, // 计划提测日期
  actualDate: String, // 实际提测日期
  planOnlineDate: String, // 计划上线日期
  actualOnlineDate: String, // 实际上线日期
  developPd: Number, // 开发估时
  testPd: Number, // 测试估时
  testPw: Number, // 测试人效
})

export default mongoose.model('Demand', demandSchema)  // 这里Demand代表的是名为demands的mongodb collection名称
