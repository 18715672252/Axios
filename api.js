/**
 * 用户登录账户密码
 * @method post
 * @param {string} cipherText - 必填，服务端公钥加密的密文，内容：accountType、account、password
 * @param {string} clientPublicKey - 必填，客户端公钥，在登录成功的情况下才会存入
 */
export const login = process.env.BASE_URL + '/gobank-getway/user/login'

/**
 * 用户通过手机验证码登录
 * @method post
 * @param {string} cipherText - 必填，验证码密文
 * @param {string} clientPublicKey - 必填，客户端公钥，在登录成功的情况下才会存入
 * @param {string} zone - 必填，区号
 * @param {string} phoneNumeber - 必填，用户手机号码
 */
export const loginSmsCodeUrl = process.env.BASE_URL + '/gobank-getway/user/loginBySmsVerificationCode'

/**
 * 用户注册
 * @method post
 * @param {string} cipherText - 必填，服务端公钥加密的密文，内容：name、nickName、recommendCode、emailAddress、zone、number、password
 * @param {string} clientPublicKey - 必填，客户端公钥
 */
export const register = process.env.BASE_URL + '/gobank-getway/user/register'

/**
 * 发送手机验证码
 * @method post
 * @param {string} zone - 必填，国家区号
 * @param {string} phoneNumber - 必填，手机号
 */
export const sendSmsVerifyCode = process.env.BASE_URL + '/gobank-getway/user/sendSmsVerifyCode'

/**
 * 验证手机验证码
 * @method post
 * @param {string} zone - 必填，国家区号
 * @param {string} phoneNumber - 必填，手机号
 * @param {string} verifyCode - 必填，验证码
 */
export const verifySmsCode = process.env.BASE_URL + '/gobank-getway/user/verifySmsCode'

/**
 * 充值密码
 * @method post
 * @param {string} zone - 必填，国家区号
 * @param {string} phoneNumber - 必填，手机号
 * @param {string} newestPassword - 必填，新密码，需用服务端公钥加密
 */
export const resetPsd = process.env.BASE_URL + '/gobank-getway/user/resetPassword'

/**
 * 修改个人信息
 * @method post
 * @param {string} goId - 必选，用户标识
 * @param {number} nickName - 可选，昵称
 */
export const modifyUserInfo = process.env.BASE_URL + '/gobank-getway/user/modifyUserInfo'

/**
 * 获取个人信息
 * @method get
 * @param {string} goId - 必选，用户标识
 */
export const queryUserInfo = process.env.BASE_URL + '/gobank-getway/user/queryUserInfo'

/**
 * 获取经纬度范围内设备信息
 * @method get
 * @param {double} centerLon - 必填，中心点经度
 * @param {double} centerLat - 必填，中心点纬度
 * @param {double} edgeLon - 必填，边缘点经度
 * @param {double} edgeLat - 必填，边缘点纬度
 */
export const getDeviceList = process.env.BASE_URL + '/gobank-getway/device/queryDeviceList'

/**
 * 获取设备详细信息
 * @method get
 * @param {string} netTag - 必填，设备明文标识
 */
export const getDeviceDetails = process.env.BASE_URL + '/gobank-getway/device/queryDeviceDetails'

/**
 * 扫码借充电宝
 * @method post
 * @param {string} netTag - 必填，设备明文标识
 * @param {string} goId - 必填，用户标识
 */
export const borrowPowerBank = process.env.BASE_URL + '/gobank-getway/order/scanBorrowPowerBank'

/**
 * 获取充电宝的状态
 * @method post
 * @param {string} orderId - 必填，充电宝订单号
 */
export const queryPowerBankStatus = process.env.BASE_URL + '/gobank-getway/order/queryPowerBankStatus'

/**
 * 查询账户是否是可借状态
 * @method post
 * @param {string} orderId - 必填，充电宝订单号
 */
export const queryWhetherBorrowStatus = process.env.BASE_URL + '/gobank-getway/order/queryWhetherBorrowStatus'

/**
 * 获取QA列表信息及联系方式
 * @method get
 * @param {string} method - 选填，联系方式
 */
export const getQAList = process.env.BASE_URL + '/gobank-getway/help/queryQAList'

/**
 * 获取服务端公钥
 * @method get
 */
export const getPublic = process.env.BASE_URL + '/gobank-getway/secure/awardServerPublicKey'

/**
 * 注销
 * @method get
 */
export const logout = process.env.BASE_URL + '/gobank-getway/user/logout'

/**
 * 获取token状态
 * @method get
 */
export const validateAccessTokenStatus = process.env.BASE_URL + '/gobank-getway/secure/validateAccessTokenStatus'
/**
 * 构建充值订单
 * @method post
 * @param {string} goId - 必选，用户标识
 * @param {number} amountMoney - 必选，充值金额
 * @param {string} currency - 必选，币种
 * @param {string} platform - 必选，支付平台
 */
export const createRechargeOrder = process.env.BASE_URL + '/gobank-getway/order/createRechargeOrder'

/**
 * 信用卡充值
 * @method post
 * @param {string} goId - 必选，用户标识
 * @param {number} amountMoney - 必选，充值金额
 * @param {string} currency - 必选，币种
 * @param {string} platform - 必选，支付平台
 */
export const creditCardPayment = process.env.BASE_URL + '/gobank-getway/order/creditCardPayment'

/**
 * 充值订单支付
 * @method get
 * @param {string} orderId - 必选，充值订单标识
 * @param {number} nonce - 可选，paypal支付方式填写
 */
export const rechargeOrderPayment = process.env.BASE_URL + '/gobank-getway/order/rechargeOrderPayment'

/**
 * 获取充值金额
 * @method get
 */
export const getBalanceInfo = process.env.BASE_URL + '/gobank-getway/settlement/getBalanceInfo'

/**
 * 充值订单列表
 * @method get
 * @param {string} goId - 必选，用户标识
 * @param {number} cp - 可选，当前页码 默认1
 * @param {number} size - 可选，一页显示数量 默认10
 */
export const queryRechargeOrderList = process.env.BASE_URL + '/gobank-getway/order/queryUserRechargeOrderList'

/**
 * 充值订单列表
 * @method post
 * @param {string} goId - 必选，用户标识
 * @param {number} voucherCode - 必选，优惠码
 */
export const useVoucherCode = process.env.BASE_URL + '/gobank-getway/voucherCode/useVoucherCode'

/**
 * 历史订单
 * @method get
 * @param {string} goId - 必选，用户标识
 * @param {number} cp - 可选，当前页码，默认1
 * @param {number} size - 可选，每页显示的记录数，默认10
 */
export const getHistoryOrderList = process.env.BASE_URL + '/gobank-getway/order/queryUserPowerBankHistoryOrderList'

/**
 * 反馈
 * @method post
 * @param {string} imageFiles - 可选，图片二进制流对象，数组
 * @param {number} name - 必选，名字
 * @param {number} emailAddress - 必选邮箱地址
 * @param {string} content - 必选，内容
 * @param {number} phoneModel - 可选，手机型号
 * @param {number} phoneOs - 可选，手机系统
 * @param {number} appVersion - 可选，app版本
 */
export const sendFeedbackEmail = process.env.BASE_URL + '/gobank-getway/feedback/base64/sendFeedbackEmail'

/**
 * 反馈
 * @method post
 * @param {string} orderId - 订单号
 */
export const retrySendPopUp = process.env.BASE_URL + '/gobank-getway/order/retrySendPopUp'

/**
 * 获取是否有在借的订单
 * @method post
 * @param {string} goId - 必选，用户标识
 */
export const queryUserOrder = process.env.BASE_URL + '/gobank-getway/order/queryUserPowerBankOrderInProgress'

/**
 * 获取登录时手机验证码
 * @method post
 * @param {string} zone - 必选，区号
 * @param {string} phoneNumber - 必选，手机号
 */
export const sendLoginSmsVerifyCodeUrl = process.env.BASE_URL + '/gobank-getway/user/sendLoginVerifyCode'

/**
 * 获取注册时手机验证码
 * @method post
 * @param {string} zone - 必选，区号
 * @param {string} phoneNumber - 必选，手机号
 */
export const sendRegisterSmsVerifyCodeUrl = process.env.BASE_URL + '/gobank-getway/user/sendRegisterVerifyCode'

/**
 * 获取更换手机号时手机验证码
 * @method post
 * @param {string} zone - 必选，区号
 * @param {string} phoneNumber - 必选，手机号
 */
export const sendModifyPhoneVerifyCodeUrl = process.env.BASE_URL + '/gobank-getway/user/sendModifyPhoneVerifyCode'

/**
 * 更换手机号
 * @method post
 * @param {string} goId - 必选，用户标识(this.$store.state.userInfo.goId)
 * @param {string} verifyCode - 必选，验证码
 * @param {string} zone - 必选，区号
 * @param {string} phoneNumber - 必选，手机号
 */
export const modifyUserPhoneUrl = process.env.BASE_URL + '/gobank-getway/user/modifyUserPhone'

/**
 * 获取更换邮箱时邮箱验证码
 * @method post
 * @param {string} emailAddress - 必选，邮箱账号
 */
export const sendModifyEmailVerifyCodeUrl = process.env.BASE_URL + '/gobank-getway/user/sendModifyEmailVerifyCode'

/**
 * 更换邮箱
 * @method post
 * @param {string} goId - 必选，用户标识(this.$store.state.userInfo.goId)
 * @param {string} emailAddress - 必选，邮箱账号
 * @param {string} verifyCode - 必选，验证码
 */
export const modifyUserEmailUrl = process.env.BASE_URL + '/gobank-getway/user/modifyUserEmail'
