import { Base } from '../../utils/base.js';

class Home extends Base {
  constructor() {
    super();
  }


  getBannerData(callback) {
    var param = {
      url: 'banner/1',
      sCallback: function (data) {
        data = data.items;
        callback && callback(data);
      }
    }
    this.request(param);
  }

  getThemeData(callback) {
    var param = {
      url: 'theme?ids=1,2,3',
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(param);
  }

  getProductData(callback) {
    var param = {
      url: 'product/recent',
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(param);
  }
}
export { Home };