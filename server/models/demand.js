import mongoose from 'mongoose'

const Schema = mongoose.Schema

const demandSchema = new Schema({
  name: String, // 需求名称
  link: String, // 需求链接
  demandR: String, // 产品人员
  developR: String, // 开发人员
  testR: String, // 测试人员
  // planDate: String, // 计划提测日期
  actualDate: String, // 提测日期
  // planOnlineDate: String, // 计划上线日期
  uatDate: String, // UAT日期
  actualOnlineDate: String, // 上线日期
  testStartDate: String, // 测试开始时间
  testEndDate: String, // 测试结束时间
  developPd: Number, // 开发时长
  testPd: Number, // 测试时长
  subDemand: Number, // 子需求数
  caseCount: Number, // 用例数
  bugCount: Number, // bug数量
  remark: String, // 备注
})

export default mongoose.model('Demand', demandSchema)  // 这里Demand代表的是名为demands的mongodb collection名称
