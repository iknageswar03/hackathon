const mongoose=require('mongoose')

const historySchema = new mongoose.Schema({
  timestamp: { type: String, required: true },
  fuelLevel: { type: Number, required: true },
  oilTemp: { type: Number, required: true },
  runtimeHours: { type: Number, required: true },
});

const machineAnalyticsSchema = new mongoose.Schema({
  machineName: { type: String, required: true },
  operator: { type: mongoose.Schema.Types.ObjectId, ref: "Operator", required: true },
  issues: [{ type: String }],
  history: [historySchema],
}, {
  timestamps: true
});

const MachineAnalytics = mongoose.model("MachineAnalytics", machineAnalyticsSchema);
module.exports=MachineAnalytics;
