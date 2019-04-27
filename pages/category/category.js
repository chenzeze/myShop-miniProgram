// pages/category/category.js
import { Category } from 'category-model.js';
var category = new Category();  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this._loadData();
  },

  /*加载所有数据*/
  _loadData: function (callback) {
    var that = this;
    category.getCategoryType((categoryData) => {

      that.setData({
        categoryTypeArr: categoryData,
        loadingHidden: true
      });

      that.getProductsByCategory(categoryData[0].id, (data) => {
        var dataObj = {
          procucts: data,
          topImgUrl: categoryData[0].img.url,
          title: categoryData[0].name
        };
        that.setData({
          loadingHidden: true,
          categoryInfo0: dataObj
        });
        callback && callback();
      });
    });
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})