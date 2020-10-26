const errorCode = {
  'ILLEGAL_PARAMETER': 'System error, please try again later',
  'SYSTEM_ERROR': 'System error, please try again later',
  'ACCESS_DENIED': '',
  'SESSION_ID_NOT_EXIST': '',
  'SERVICE_UNAVAILABLE': '',
  'INVALID_ACCOUNT_AND_PASSWORD': 'Your mobile number, or password were incorrect',
  'VOUCHER_CODE_NOT_EXIST': 'Invalid voucher code.',
  'VOUCHER_CODE_USED': 'Voucher code can not be reused',
  'VOUCHER_CODE_EXPIRED': 'Voucher code has expired.',
  'VOUCHER_CODE_NOT_EFFECT': 'Invalid voucher code.',
  'EMAIL_ACCOUNT_EXIST': 'Email account already exists. Please log in.',
  'PHONE_ACCOUNT_EXIST': 'Phone number already exists. Please log in.',
  'RECOMMEND_CODE_NOT_EXIST': 'Referral code does not exist.',
  'PHONE_ACCOUNT_NOT_EXIST': 'The phone number you entered does not exist. Please create an account.',
  'SMS_VERIFY_CODE_ERROR': 'Invalid verification code.',
  'SMS_VERIFY_CODE_EXPIRED': 'Recovery code expired. Please request another code.',
  'RESET_PASSWORD_OPERATE_EXPIRE': 'Password reset timeout. Please try again.',
  'DEVICE_NOT_EXIST': 'Incorrect QR code. Please try again.',
  'SEND_MQTT_FAILURE': 'Unable to communicate to server. Please try again.',
  'AN_ORDER_IN_PROGRESS': 'You have an order in progress. Please return the battery to proceed.',
  'NO_ENOUGH_BALANCE': 'Insufficient credit balance. Please top your account up.',
  'NO_EXTRA_POWER_BANK': 'No sufficiently charged batteries avaialable. Please try another station.',
  'SESSION_DISABLED_STATE': 'User is locked.',
  'USER_LOCKED': 'User is locked.'
}

export default errorCode
