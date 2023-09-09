const { Disabled } = require("../models")
const userIsDisabled = async (userId) => {
  const disabledStatus = await Disabled.findOne({ where: { userId } })
  return disabledStatus && disabledStatus.disabled
}
module.exports = userIsDisabled
