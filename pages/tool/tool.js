// pages/tool/tool.js
var baseUrl ="https://chenzeze.xyz/api/v1/"
Page({

  onLoad: function (options) {

  },

  getSuperToken:function(){
    wx.request({
      url: baseUrl+'/token/app',
      data:{
        ac:'warcraft',
        sec:'777'
      },
      method:'POST',
      success:function(res){
        console.log(res.data);
        wx.setStorageSync('super_token', res.data.token);
      },
      fail:function(){

      },
      complete:function(){

      }
    })
  },


  getToken: function () {
    wx.login({
      success: function (res) {
        var code=res.code;
        console.log('code');
        console.log(code);
        wx.request({
          url: baseUrl+'/token/user',
          data:{
            code
          },
          method:'POST',
          success:function(res){
            console.log(res.data);
            wx.setStorageSync('token', res.data.token);
          },
          fail: function (res) {
            console.log(res.data);
          }
        })
      },
    })
  },

  checkSession:function(){
    wx.checkSession({
      success: function (res) {
        console.log('session success');
       },
      fail: function (res) {
        console.log('session fail');
       },
      complete: function (res) { },
    })
  },
  delivery:function(){

  },
  pay:function(){
    var token=wx.getStorageSync('token');
    var that=this;
    wx.request({
      url: baseUrl+'order',
      data: {
        products:[
          {product_id:1,count:2},
          { product_id: 2, count: 3 },
        ]
      },
      header: {
        token
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data);
        if(res.data.pass){
          wx.setStorageSync('order_id', res.data.order_id);
          that.getPreOrder(token,res.data.order_id);
        }else{
          console.log('订单未创建成功');
        }
      },
    })
  },
  getPreOrder:function(token,orderID){
    if(token){
      wx.request({
        url: baseUrl + 'pay/pre_order',
        data: {
          id:orderID
        },
        header: {
          token
        },
        method: 'POST',
        success: function(res) {
          var preData=res.data;
          console.log(preData);
          wx.requestPayment({
            timeStamp: preData.timeStamp.toString(),
            nonceStr: preData.nonceStr,
            package: preData.package,
            signType: preData.signType,
            paySign: preData.paySign,
            success:function(res){
              console.log(res.data);
            }
          });
        },
        fail: function(err) {
          console.log(err);
        },
      })
    }
  }

  

})