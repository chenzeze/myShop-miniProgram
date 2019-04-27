import { Config } from 'config.js';
class Base {
  constructor(){
    this.baseRestUrl=Config.restUrl;
  }
  request(params,noRefetch){
    var that=this;
    var url=this.baseRestUrl+params.url;
    if(!params.type){
      params.type='get';
    }
    wx.request({
      url: url,
      data: params.data,
      header: {
        'content-type': 'application/json'
      },
      method: params.type,
      success: function (res) {
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == '2') {
          params.sCallback && params.sCallback(res.data);
        } else {
          that._processError(res);
          params.eCallback && params.eCallback(res.data);
        }
      },
      fail: function (err) {
        that._processError(err);
      }
    })
  }
  _processError(err) {
    console.log(err);
  }


  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }
}


export {Base};