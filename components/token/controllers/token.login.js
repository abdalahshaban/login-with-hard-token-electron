const graphene = require('graphene-pk11')
const usbDetect = require('usb-detection')
const path = require('path')
usbDetect.startMonitoring()
/**
 * @desc — login with `token`
 *
 * @return bool - success or failure
 */
module.exports = async function login(req, res) {
  let mod
  try {
    /**
     *
     * @desc — get pin from req.body
     */
    let { pin = '11112222' } = req.body
    /**
     *
     * @desc — check if token plugin or not using productId: 2055 && vendorId: 2414
     */
    let device = await usbDetect.find(2414, 2055)
    /**
     *
     * @return bool - success or failure in get device
     */
    if (device.length === 0) return res.status(400).json({ success: false })
    /**
     *
     * @desc — load dll library from lib folder
     */
    let dllPath = path.join(__dirname, `../../../lib/eps2003csp11.dll`)
    mod = graphene.Module.load(dllPath)
    /**
     *
     * @desc — initialize lib to use it after
     */
    mod.initialize()
    /**
     *
     * @desc — GET TOKEN SLOTS
     */
    const slots = mod.getSlots()
    /**
     *
     * @return List of Slots is Empty IF NO SLOTS
     */
    if (!slots.length) {
      mod.finalize()
      return res.status(400).json({ success: false })
    }
    /**
     * @desc — USING FIRST SLOT
     *
     */
    const slot = mod.getSlots(0)
    /**
     *
     * @desc — PREPARE SESSION TO OPEN && ADD PERMISSION RW_SESSION
     */
    const session = slot.open(
      graphene.SessionFlag.RW_SESSION | graphene.SessionFlag.SERIAL_SESSION,
    )
    /**
     *
     * @desc — OPEN SESSION WITH TOKEN USING PIN AND USER TYPE `USER`
     */
    session.login(pin, graphene.UserType.USER)
    /**
     *
     *@desc —get data from token using `label` & `application`
     */
    let isecSession = session
      .find({
        application: 'ISEC',
        label: 'data.address',
      })
      .items(0)
      .toType()

    if (!isecSession) {
      return res.status(400).json({ success: false })
    }
    // console.log(JSON.parse(isecSession.value.toString()), 'isecSession')
    /**
     *
     *@desc —close session btw token & application
     */
    session.close()

    mod.finalize()

    return res.status(200).json({ message: true })
  } catch (error) {

    mod.finalize()
    return res.status(400).json({ message: false })
  }
}
