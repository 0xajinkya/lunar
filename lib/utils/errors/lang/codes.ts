import { countBy } from "../../count-by";

export const ErrorsList = [
  /**
   * 100 - 999
   *
   * Common Errors
   */
  {
    status: '400',
    code: 'common.request.BAD_REQUEST',
    title: 'Bad Request',
    description: 'The request is malformed or contains invalid parameters.'
  },
  {
    status: '401',
    code: 'common.request.UNAUTHORIZED',
    title: 'Unauthorized',
    description: 'You are not authorized to access this resource.'
  },
  {
    status: '404',
    code: 'common.request.NOT_FOUND',
    title: 'Resource Not Found',
    description: 'The requested resource could not be found.'
  },
  {
    status: '500',
    code: 'common.request.INTERNAL_SERVER_ERROR',
    title: 'Internal Server Error',
    description:
      'The server encountered an unexpected condition that prevented it from fulfilling the request.'
  },
  /**
   * 1001 - 1199
   *
   * Identity Errors
   */
  {
    status: '1001',
    code: 'identity.user.NOT_FOUND',
    title: 'User not found',
    description: 'The provided credentials does not belong to any user.'
  },
  {
    status: '1002',
    code: 'identity.user.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '1003',
    code: 'identity.user.INVALID_CREDENTIALS',
    title: 'Invalid Credentials',
    description: 'The provided credentials are invalid.'
  },
  {
    status: '1004',
    code: 'identity.user.ALREADY_EXISTS',
    title: 'User already exists',
    description: 'The user already exists with the provided credentials.'
  },
  {
    status: '1005',
    code: 'identity.user.PASSWORD_NOT_SET',
    title: 'Password not set',
    description:
      'The user has not set the password yet. Please reset the password using the magic link in the email.'
  },
  {
    status: '1006',
    code: 'identity.user.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },

  /**
   * 1601 - 1649
   *
   * OTP Errors
   */
  {
    status: '1601',
    code: 'identity.otp.INVALID',
    title: 'Invalid OTP',
    description: 'The OTP is invalid.'
  },
  {
    status: '1602',
    code: 'identity.otp.EXPIRED',
    title: 'OTP Expired',
    description: 'The OTP has expired.'
  },
  {
    status: '1603',
    code: 'identity.otp.TOO_MANY_ATTEMPTS',
    title: 'Too Many Attempts',
    description: 'Too many attempts have been made.'
  },
  /**
   * 1701 - 1749
   *
   * Media Errors
   */
  {
    status: '1701',
    code: 'media.upload.NOT_FOUND',
    title: 'File Not found',
    description: 'The file is not found.'
  },
  {
    status: '1702',
    code: 'media.upload.FILE_NOT_ALLOWED',
    title: 'File Not Allowed',
    description: 'The file type is not allowed to be uploaded.'
  },
  {
    status: '1703',
    code: 'media.upload.FILE_SIZE_EXCEEDED',
    title: 'File Size Exceeded',
    description: 'The file size exceeds the maximum limit.'
  },
  {
    status: '1704',
    code: 'media.upload.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '1705',
    code: 'media.upload.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  /**
   * 1801 - 1900
   *
   * Company Errors
   */
  {
    status: '1801',
    code: 'company.company.NOT_FOUND',
    title: 'Company not found',
    description: 'The company was not found.'
  },
  {
    status: '1802',
    code: 'company.company.ALREADY_EXISTS',
    title: 'Company already exists',
    description: 'The company already exists with the provided credentials.'
  },
  {
    status: '1803',
    code: 'company.company.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '1804',
    code: 'company.company.INVALID_EMAIL',
    title: 'Invalid Email',
    description: 'The provided email is invalid.'
  },
  {
    status: '1807',
    code: 'company.company.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  /**
   * 1901 - 2000
   *
   * Fund Errors
   */
  {
    status: '1901',
    code: 'fund.fund.NOT_FOUND',
    title: 'Fund not found',
    description: 'The fund was not found.'
  },
  {
    status: '1902',
    code: 'fund.fund.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '1903',
    code: 'fund.fund.ALREADY_EXISTS',
    title: 'Fund already exists',
    description: 'The fund already exists with the provided credentials.'
  },
  {
    status: '1904',
    code: 'fund.fund.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  {
    status: '1905',
    code: 'fund.fund.DELETION_NOT_ALLOWED',
    title: 'Deletion Not Allowed',
    description:
      'There are users associated with this fund. Deletion not allowed.'
  },
  /**
   * 2001 - 2100
   *
   * Fund User Errors
   */
  {
    status: '2001',
    code: 'fund.user.NOT_FOUND',
    title: 'Fund User not found',
    description: 'The fund user was not found.'
  },
  {
    status: '2002',
    code: 'fund.user.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '2003',
    code: 'fund.user.ALREADY_EXISTS',
    title: 'Fund User already exists',
    description: 'The fund user already exists with the provided credentials.'
  },
  {
    status: '2004',
    code: 'fund.user.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  /**
   * 2101 - 2200
   *
   * Commitment Errors
   */
  {
    status: '2101',
    code: 'fund.commitment.NOT_FOUND',
    title: 'Commitment not found',
    description: 'The commitment was not found.'
  },
  {
    status: '2102',
    code: 'fund.commitment.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '2103',
    code: 'fund.commitment.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  {
    status: '2104',
    code: 'fund.commitment.NO_COMMITMENT',
    title: 'No Commitment Found',
    description: 'There is no commitment found under the fund.'
  },
  /**
   * 2201 - 2300
   *
   * Drawdown Errors
   */
  {
    status: '2201',
    code: 'fund.drawdown_request.NOT_FOUND',
    title: 'Drawdown Request not found',
    description: 'The drawdown request was not found.'
  },
  {
    status: '2202',
    code: 'fund.drawdown_request.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '2203',
    code: 'fund.drawdown_request.REQUEST_AMOUNT_EXCEEDS_COMMITMENT',
    title: 'Request Amount Exceeds Commitment',
    description: 'The request amount exceeds the commitment amount.'
  },
  {
    status: '2204',
    code: 'fund.drawdown_request.REQUEST_PERCENT_REQUIRED',
    title: 'Request Percent Required',
    description:
      'The request percent is required for the request basis percentage.'
  },
  {
    status: '2205',
    code: 'fund.drawdown_request.REQUEST_AMOUNT_REQUIRED',
    title: 'Request Amount Required',
    description: 'The request amount is required for the request basis amount.'
  },
  {
    status: '2206',
    code: 'fund.drawdown_request.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  /**
   * 2301 - 2400
   *
   * Remittance Errors
   */
  {
    status: '2301',
    code: 'fund.remittance.NOT_FOUND',
    title: 'Remittance not found',
    description: 'The remittance was not found.'
  },
  {
    status: '2302',
    code: 'fund.remittance.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '2303',
    code: 'fund.remittance.AMOUNT_EXCEEDS',
    title: 'Remittance Amount Exceeds Drawdown Request',
    description: 'The remittance amount exceeds the drawdown request amount.'
  },
  {
    status: '2304',
    code: 'fund.remittance.INVALID_AMOUNT',
    title: 'Invalid Amount',
    description: 'The amount is invalid.'
  },
  /**
   * 2401 - 2500
   *
   * Folder Errors
   */
  {
    status: '2401',
    code: 'media.folder.NOT_FOUND',
    title: 'Folder not found',
    description: 'The folder was not found.'
  },
  {
    status: '2402',
    code: 'media.folder.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '2403',
    code: 'media.folder.ALREADY_EXISTS',
    title: 'Folder already exists',
    description: 'The folder already exists with the provided credentials.'
  },
  {
    status: '2404',
    code: 'media.folder.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  /**
   * 2501 - 2600
   *
   * Investor Errors
   */
  {
    status: '2501',
    code: 'investor.investor.NOT_FOUND',
    title: 'Investor not found',
    description: 'The investor was not found.'
  },
  {
    status: '2502',
    code: 'investor.investor.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '2503',
    code: 'investor.investor.ALREADY_EXISTS',
    title: 'Investor already exists',
    description: 'The investor already exists with the provided credentials.'
  },
  {
    status: '2504',
    code: 'investor.investor.INVALID_EMAIL',
    title: 'Invalid Email',
    description: 'The provided email is invalid.'
  },
  {
    status: '2505',
    code: 'investor.investor.INVALID_PAN',
    title: 'Invalid PAN',
    description: 'The provided PAN is invalid.'
  },
  {
    status: '2506',
    code: 'investor.investor.PAN_ALREADY_EXISTS',
    title: 'PAN already exists',
    description: 'The PAN already exists with the provided credentials.'
  },
  {
    status: '2507',
    code: 'investor.investor.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  /**
   * 2601 - 2700
   *
   * Investor User Errors
   */
  {
    status: '2601',
    code: 'investor.user.NOT_FOUND',
    title: 'Investor User not found',
    description: 'The investor user was not found.'
  },
  {
    status: '2602',
    code: 'investor.user.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '2603',
    code: 'investor.user.ALREADY_EXISTS',
    title: 'Investor User already exists',
    description:
      'The investor user already exists with the provided credentials.'
  },
  {
    status: '2604',
    code: 'investor.user.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  /**
   * 2701 - 2800
   *
   * KYC Errors
   */
  {
    status: '2701',
    code: 'investor.kyc.NOT_FOUND',
    title: 'KYC not found',
    description: 'The KYC was not found.'
  },
  {
    status: '2702',
    code: 'investor.kyc.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '2703',
    code: 'investor.kyc.ALREADY_EXISTS',
    title: 'KYC already exists',
    description: 'The KYC already exists with the provided credentials.'
  },
  {
    status: '2704',
    code: 'investor.kyc.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  /**
   * 2801 - 2900
   *
   * Investor Group Errors
   */
  {
    status: '2801',
    code: 'investor.group.NOT_FOUND',
    title: 'Investor Group not found',
    description: 'The investor group was not found.'
  },
  {
    status: '2802',
    code: 'investor.group.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '2803',
    code: 'investor.group.ALREADY_EXISTS',
    title: 'Investor Group already exists',
    description:
      'The investor group already exists with the provided credentials.'
  },
  {
    status: '2804',
    code: 'investor.group.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  {
    status: '2805',
    code: 'investor.group.DELETION_NOT_ALLOWED',
    title: 'Deletion Not Allowed',
    description:
      'There are users associated with this group. Deletion not allowed.'
  },
  /**
   * 2901 - 3000
   *
   * Investor Group User Errors
   */
  {
    status: '2901',
    code: 'investor.group.user.NOT_FOUND',
    title: 'Investor Group User not found',
    description: 'The investor group user was not found.'
  },
  {
    status: '2902',
    code: 'investor.group.user.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '2903',
    code: 'investor.group.user.ALREADY_EXISTS',
    title: 'Investor Group User already exists',
    description:
      'The investor group user already exists with the provided credentials.'
  },
  {
    status: '2904',
    code: 'investor.group.user.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  /**
   * 3001 - 3100
   *
   * Fund Config Errors
   */
  {
    status: '3001',
    code: 'fund.config.NOT_FOUND',
    title: 'Fund Config not found',
    description: 'The fund config was not found.'
  },
  {
    status: '3002',
    code: 'fund.config.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '3003',
    code: 'fund.config.ALREADY_EXISTS',
    title: 'Fund Config already exists',
    description: 'The fund config already exists with the provided credentials.'
  },
  {
    status: '3004',
    code: 'fund.config.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  {
    status: '3005',
    code: 'fund.config.CREATE_MANY_FAILED',
    title: 'Create Many Failed',
    description:
      'The create many operation failed. Please check the input and try again.'
  },
  /**
   * 3101 - 3200
   *
   * Investor Settings Errors
   */
  {
    status: '3101',
    code: 'investor.settings.NOT_FOUND',
    title: 'Investor Settings not found',
    description: 'The investor settings was not found.'
  },
  {
    status: '3102',
    code: 'investor.settings.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '3103',
    code: 'investor.settings.ALREADY_EXISTS',
    title: 'Investor Settings already exists',
    description:
      'The investor settings already exists with the provided credentials.'
  },
  {
    status: '3104',
    code: 'investor.settings.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  /**
   *  3201 - 3300
   *
   * Company Valuation Errors
   */
  {
    status: '3201',
    code: 'company.valuation.NOT_FOUND',
    title: 'Company Valuation not found',
    description: 'The company valuation was not found.'
  },
  {
    status: '3202',
    code: 'company.valuation.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '3203',
    code: 'company.valuation.ALREADY_EXISTS',
    title: 'Company Valuation already exists',
    description:
      'The company valuation already exists with the provided credentials.'
  },
  {
    status: '3204',
    code: 'company.valuation.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  {
    status: '3205',
    code: 'company.valuation.COMPANY_NOT_FOUND',
    title: 'Company not found',
    description: 'The company was not found.'
  },
  {
    status: '3206',
    code: 'company.valuation.FOLDER_NOT_FOUND',
    title: 'Folder not found',
    description: 'The folder was not found.'
  },
  {
    status: '3207',
    code: 'company.valuation.INVALID_DOCUMENT_TYPE',
    title: 'Invalid Document Type',
    description: 'The document type is invalid.'
  },
  {
    status: '3208',
    code: 'company.valuation.INVALID_VALUATION_AT',
    title: 'Invalid Valuation At',
    description: 'Valuation date cannot be in the past.'
  },
  /**
   * 3301 - 3400
   *
   * Scheme Errors
   */
  {
    status: '3301',
    code: 'scheme.scheme.NOT_FOUND',
    title: 'Scheme not found',
    description: 'The scheme was not found.'
  },
  {
    status: '3302',
    code: 'scheme.scheme.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '3303',
    code: 'scheme.scheme.ALREADY_EXISTS',
    title: 'Scheme already exists',
    description: 'The scheme already exists with the provided credentials.'
  },
  {
    status: '3304',
    code: 'scheme.scheme.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  {
    status: '3305',
    code: 'scheme.scheme.COMPANY_VALUATION_NOT_FOUND',
    title: 'Company Valuation not found',
    description:
      'The company valuation was not found. Please create a company valuation before creating a scheme.'
  },
  {
    status: '3306',
    code: 'scheme.scheme.TOTAL_SHARES_EXCEEDS_COMPANY_VALUATION',
    title: 'Total Shares Exceeds Company Valuation',
    description: 'The total shares exceeds the company valuation total shares.'
  },
  {
    status: '3307',
    code: 'scheme.scheme.SCHEME_CLOSED',
    title: 'Scheme Closed',
    description: 'The scheme is closed. No further actions can be performed.'
  },
  {
    status: '3308',
    code: 'scheme.scheme.SCHEME_USER_EXCEEDS',
    title: 'Scheme User Exceeds',
    description: 'The scheme user exceeds the maximum limit of 200.'
  },
  {
    status: '3309',
    code: 'scheme.scheme.INVALID_ROUND_DOWN_UNIT',
    title: 'Invalid Round Down Unit',
    description: 'The round down unit is invalid.'
  },
  {
    status: '3310',
    code: 'scheme.scheme.INSUFFICIENT_GROUP_USERS',
    title: 'Insufficient Group Users',
    description:
      'The group users are insufficient to create a scheme. Minimum 1 group user is required.'
  },
  /**
   * 3401 - 3500
   *
   * Scheme User Errors
   */
  {
    status: '3401',
    code: 'scheme.user.NOT_FOUND',
    title: 'Scheme User not found',
    description: 'The scheme user was not found.'
  },
  {
    status: '3402',
    code: 'scheme.user.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '3403',
    code: 'scheme.user.ALREADY_EXISTS',
    title: 'Scheme User already exists',
    description: 'The scheme user already exists with the provided credentials.'
  },
  {
    status: '3404',
    code: 'scheme.user.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  {
    status: '3405',
    code: 'scheme.user.ALREADY_SUGGESTED',
    title: 'Already Suggested',
    description:
      'The scheme user has already suggested the amount for the scheme.'
  },
  {
    status: '3406',
    code: 'scheme.user.ALREADY_APPROVED',
    title: 'Already Approved',
    description:
      'The scheme user has already approved the amount for the scheme.'
  },
  {
    status: '3407',
    code: 'scheme.user.ALREADY_REJECTED',
    title: 'Already Rejected',
    description:
      'The scheme user has already rejected the amount for the scheme.'
  },
  {
    status: '3408',
    code: 'scheme.user.INVALID_SUGGESTED_AMOUNT',
    title: 'Invalid Suggested Amount',
    description: 'The suggested amount is invalid.'
  },
  {
    status: '3409',
    code: 'scheme.user.INVALID_APPROVED_AMOUNT',
    title: 'Invalid Approved Amount',
    description: 'The approved amount is invalid.'
  },
  {
    status: '3410',
    code: 'scheme.user.TOTAL_APPROVED_AMOUNT_EXCEEDS',
    title: 'Approved Amount Exceeds',
    description: 'The approved amount exceeds the requested amount.'
  },
  {
    status: '3411',
    code: 'scheme.user.INVALID_SCHEME_ID',
    title: 'Invalid Scheme ID',
    description: 'The provided scheme is invalid.'
  },
  {
    status: '3412',
    code: 'scheme.user.CONSENT_NOT_PROVIDED',
    title: 'Consent Not Provided',
    description: 'The user has not provided the consent.'
  },
  {
    status: '3413',
    code: 'scheme.user.INSUFFICIENT_BALANCE',
    title: 'Insufficient Balance',
    description:
      'Action required: Please add the consent amount before performing the allocation'
  },
  /**
   * 3501 - 3600
   *
   * Scheme User Unit Errors
   */
  {
    status: '3501',
    code: 'scheme.user.unit.NOT_FOUND',
    title: 'Scheme User Unit not found',
    description: 'The scheme user unit was not found.'
  },
  {
    status: '3502',
    code: 'scheme.user.unit.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '3503',
    code: 'scheme.user.unit.ALREADY_EXISTS',
    title: 'Scheme User Unit already exists',
    description:
      'The scheme user unit already exists with the provided credentials.'
  },
  {
    status: '3504',
    code: 'scheme.user.unit.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  /**
   * 3601 - 3700
   *
   * Scheme Document Unit Errors
   */
  {
    status: '3601',
    code: 'scheme.scheme_document.NOT_FOUND',
    title: 'Scheme Document not found',
    description: 'The scheme document was not found.'
  },
  {
    status: '3602',
    code: 'scheme.scheme_document.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '3603',
    code: 'scheme.scheme_document.ALREADY_EXISTS',
    title: 'Scheme DOcument already exists',
    description:
      'The scheme user unit already exists with the provided credentials.'
  },
  {
    status: '3604',
    code: 'scheme.scheme_document.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  /**
   * 3701 - 3800
   *
   * Company Document Errors
   */
  {
    status: '3701',
    code: 'company.document.NOT_FOUND',
    title: 'Company Document not found',
    description: 'The company document was not found.'
  },
  {
    status: '3702',
    code: 'company.document.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '3703',
    code: 'company.document.ALREADY_EXISTS',
    title: 'Company Document already exists',
    description:
      'The company document already exists with the provided credentials.'
  },
  {
    status: '3704',
    code: 'company.document.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  {
    status: '3706',
    code: 'company.document.COMPANY_NOT_FOUND',
    title: 'Company not found',
    description: 'The company was not found.'
  },
  /**
   * 3801 - 3900
   *
   * Scheme Valuation Errors
   */
  {
    status: '3801',
    code: 'scheme.valuation.NOT_FOUND',
    title: 'Scheme Valuation not found',
    description: 'The scheme valuation was not found.'
  },
  {
    status: '3802',
    code: 'scheme.valuation.INVALID_INPUT',
    title: 'Invalid Input',
    description: 'The input was not passed in the proper format.'
  },
  {
    status: '3803',
    code: 'scheme.valuation.ALREADY_EXISTS',
    title: 'Scheme Valuation already exists',
    description:
      'The scheme valuation already exists with the provided credentials.'
  },
  {
    status: '3804',
    code: 'scheme.valuation.INVALID_QUERY',
    title: 'Invalid Query',
    description: 'The query was not passed in the proper format.'
  },
  {
    status: '3805',
    code: 'scheme.valuation.SCHEME_NOT_FOUND',
    title: 'Scheme not found',
    description: 'The scheme was not found.'
  },
  {
    status: '3806',
    code: 'scheme.valuation.INVALID_DOCUMENT_TYPE',
    title: 'Invalid Document Type',
    description: 'The document type is invalid.'
  }
] as const;

if (
  ErrorsList.map(({ code }) => code).length !==
  new Set(ErrorsList.map(({ code }) => code)).size
) {
  console.error("Duplicate error 'code' found in the list.");
  console.error(
    Object.entries(countBy(ErrorsList, 'code')).filter(([_, v]) => v > 1)
  );
  process.exit(1);
}

if (
  ErrorsList.map(({ status }) => status).length !==
  new Set(ErrorsList.map(({ status }) => status)).size
) {
  console.error("Duplicate error 'status' found in the list.");
  console.error(
    Object.entries(countBy(ErrorsList, 'status')).filter(([_, v]) => v > 1)
  );
  process.exit(1);
}
export type IErrorCode =
  | (typeof ErrorsList)[number]['code']
  | (typeof ErrorsList)[number]['status'];

export const ERROR_CODES = ErrorsList.reduce(
  (acc, error) => {
    acc[error.code] = error;
    acc[error.status] = error;
    return acc;
  },
  {} as Record<IErrorCode, (typeof ErrorsList)[number]>
);

export const ErrorCodesList = ErrorsList.reduce<IErrorCode[]>(
  (previousValue, currentValue) => {
    previousValue.push(currentValue.code);
    previousValue.push(currentValue.status);
    return previousValue;
  },
  [] as IErrorCode[]
);
