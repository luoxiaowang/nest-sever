import mongoose from 'mongoose'

const Schema = mongoose.Schema

const faultSchema = new Schema({
  sysName: String, // 故障系统
  title: String, // 故障标题
  desc: String, // 故障描述
  occurDate: String, // 问题发生时间
  resolveDate: String, // 问题解决时间
  dutyR: String, // 问题责任人
  dealR: String, // 问题处理人
})

export default mongoose.model('Fault', faultSchema)  // 这里Fault代表的是名为faults的mongodb collection名称
