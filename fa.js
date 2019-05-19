var CancelToken = axios.CancelToken;
var cancel;

axios.get('/user/12345', {
    cancelToken: new CancelToken(function executor(c) { // executor 函数接收一个 cancel 函数作为参数
        cancel = c;
    })
}); // 取消请求cancel();


// main.js
Vue.$httpRequestList = [];
POST(url, data, errMsg) {
    const CancelToken = axios.CancelToken
    return axios.post(url, data, {
        timeout: 30000,
        cancelToken: new CancelToken(function executor(c) {
            Vue.$httpRequestList.push(c)
        })
    }).then(checkStatus).then(res => checkCode(res, errMsg))
};
GET(url, params, errMsg) {
    const CancelToken = axios.CancelToken
    return axios.get(url, {
        params: {
            _t: +(new Date()),
            ...params
        },
        timeout: 30000,
        cancelToken: new CancelToken(function executor(c) {
            Vue.$httpRequestList.push(c)
        })
    }).then(checkStatus).then(res => checkCode(res, errMsg))
}
import Vue from 'vue'
export const clearHttpRequestingList = () => {
    if (Vue.$httpRequestList.length > 0) {
        Vue.$httpRequestList.forEach((item) => {
            item()
        })
        Vue.$httpRequestList = []
    }
}
router.beforeEach((to, from, next) => {
    clearHttpRequestingList()

})

//官网方法一：
var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios.get('/user/12345', {
    cancelToken: source.token
}).catch(function (thrown) {
    if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
    } else { // 处理错误
    }
}); // 取消请求（message 参数是可选的）source.cancel('Operation canceled by the user.');

// 查看是否授权
wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success(res) {
                            // console.log(res.userInfo)
                            that.setData({
                                userInfo: res.userInfo,
                                loadingHidden: true
                            });
                        }
                    })
                }
            }