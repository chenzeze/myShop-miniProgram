// pages/home/home.js
import { Home } from 'home-model.js';
var home = new Home();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  _loadData(callback) {
    var that = this;
    home.getBannerData((data) => {
      that.setData({
        bannerArr: data
      })
    })
    home.getThemeData((data) => {
      that.setData({
        themeArr: data,
        loadingHidden: true
      })
    })
    home.getProductData((data) => {
      that.setData({
        productArr: data
      })
      callback && callback();
    })
  },
  onProductsItemTap: function (event) {
    var id = home.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },
  onThemesItemTap: function (event) {
    var id = home.getDataSet(event, 'id');
    var name = home.getDataSet(event, 'name');
    wx.navigateTo({
      url: '../theme/theme?id=' + id + "&name=" + name
    })
  },

})