const usbDetect = require('usb-detection')
usbDetect.startMonitoring()

/**
 * @desc — check if `token` inserted or not
 *
 * @return bool - success or failure
 */

module.exports = async function checkToken(req, res) {
  let mod
  let dllPath
  try {
    /**
     *
     * @desc — check if token plugin or not using productId: 2055 && vendorId: 2414
     */
    let device = await usbDetect.find(2414, 2055)
    /**
     *
     * @return bool - success or failure in get device
     */
    if (device.length === 0)
      return res.status(400).json({ device: 'no device found' })
    /**
     *
     * @desc — load dll library from lib folder
     */
    dllPath = path.join(process.resourcesPath, 'lib', 'eps2003csp11.dll') //for production
    // dllPath = path.join(__dirname, '../../../lib/eps2003csp11.dll') // for development
    let mod = graphene.Module.load(dllPath)
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
      return res.status(400).json({ device: 'no device found' })
    }
    return res.status(200).json({ message: 'token founded' })
  } catch (error) {
    if (mod) {
      mod.finalize()
    }
    return res.status(400).json({ message: error })
  }
}
