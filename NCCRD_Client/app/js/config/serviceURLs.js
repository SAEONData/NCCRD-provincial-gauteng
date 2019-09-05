let _apiBaseURL = ''
let _siteBaseURL = ''
let _vmsBaseURL = ''
let _ssoBaseURL = ''
let _nccisBaseURL = ''
let _ndaoBaseURL = ''
let _ndaoSiteBaseURL = ''
let _ndmcBaseURL = ''
let _mapServerBaseURL = ''


if (CONSTANTS.DEV) {
  // _apiBaseURL =  'http://app01.saeon.ac.za/nccrdtestapi/odata/' //'http://localhost:62553/odata/'
  // _siteBaseURL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`
  // _ndmcBaseURL = 'http://app01.saeon.ac.za/ndmctestsite/'
  // _ndaoBaseURL = 'http://app01.saeon.ac.za/ndaotestapi/odata/' //'https://localhost:44301/odata/'
  // _ndaoSiteBaseURL = 'http://app01.saeon.ac.za/ndaotestsite/'
  // _vmsBaseURL = 'http://app01.saeon.ac.za/vmstest/api/' //'http://localhost:64161/api/'
  // _ssoBaseURL = 'https://identity.saeon.ac.za/' //'http://localhost:44320/'
  // _mapServerBaseURL = 'https://ccis.environment.gov.za/map' //'http://app01.saeon.ac.za'
  _apiBaseURL = 'https://ccis.environment.gov.za/nccrd/api/odata/';
  _siteBaseURL = 'https://ccis.environment.gov.za/nccrd/';
  _nccisBaseURL = 'https://ccis.environment.gov.za/#/'
  _ndmcBaseURL = 'https://ccis.environment.gov.za/nhe/';
  _ndaoBaseURL = 'https://ccis.environment.gov.za/ndao/api/odata/';
  _ndaoSiteBaseURL = 'https://ccis.environment.gov.za/ndao/';
  _vmsBaseURL = 'https://ccis.environment.gov.za/vms/api/';
  _ssoBaseURL = 'https://identity.saeon.ac.za/';
  _mapServerBaseURL = 'https://ccis.environment.gov.za/map';
}
else if (CONSTANTS.TEST) {
  _apiBaseURL = 'http://app01.saeon.ac.za/nccrdtestapi/odata/'
  _siteBaseURL = 'http://app01.saeon.ac.za/nccrdtestsite/'
  _ndmcBaseURL = 'http://app01.saeon.ac.za/ndmctestsite'
  _ndaoBaseURL = 'http://app01.saeon.ac.za/ndaotestapi/odata/'
  _ndaoSiteBaseURL = 'http://app01.saeon.ac.za/ndaotestsite/'
  _vmsBaseURL = 'http://app01.saeon.ac.za/vmstest/api/'
  _ssoBaseURL = 'http://identity.saeon.ac.za/'
  _mapServerBaseURL = 'https://ccis.environment.gov.za/map' //'http://app01.saeon.ac.za'
}
else if (CONSTANTS.PROD) {
  _apiBaseURL = 'https://ccis.environment.gov.za/nccrd/api/odata/';
  _siteBaseURL = 'https://ccis.environment.gov.za/nccrd/';
  _ndmcBaseURL = 'https://ccis.environment.gov.za/nhe/';
  _ndaoBaseURL = 'https://ccis.environment.gov.za/ndao/api/odata/';
  _ndaoSiteBaseURL = 'https://ccis.environment.gov.za/ndao/';
  _vmsBaseURL = 'https://ccis.environment.gov.za/vms/api/';
  _ssoBaseURL = 'https://identity.saeon.ac.za/';
  _mapServerBaseURL = 'https://ccis.environment.gov.za/map';
}

export const apiBaseURL = _apiBaseURL
export const siteBaseURL = _siteBaseURL
export const vmsBaseURL = _vmsBaseURL
export const ssoBaseURL = _ssoBaseURL
export const nccisBaseURL = _nccisBaseURL
export const ndmcBaseURL = _ndmcBaseURL
export const ndaoBaseURL = _ndaoBaseURL
export const ndaoSiteBaseURL = _ndaoSiteBaseURL
export const mapServerBaseURL = _mapServerBaseURL
