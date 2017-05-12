// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })

new Vue({
  el: ".container",
  data: {
    limitNum: 3,
    addressList: [],
    currentIndex: 0,
    shippingMethods: 1,
     delFlag: false,
    curAddress:''
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getAddressList();
    })
  },
  computed: {
    filterAddress: function () {
      return this.addressList.slice(0, this.limitNum);
    }
  },
  methods: {
    getAddressList: function () {
      var _this = this;
      this.$http.get("data/address.json").then(function (response) {
        var res = response.data;
        if (res.status == "0") {
          _this.addressList = res.result;
        }
      });
    },
    setDefault: function (addressId) {
      this.addressList.forEach(function (address, index) {
        if (address.addressId == addressId) {
          address.isDefault = true;
        } else {
          address.isDefault = false;
        }
      })
    },
    delConfirm: function (item) {
      this.delFlag = true;
      this.curAddress = item;
    },
    delAddress: function () {
      var index = this.curAddress.indexOf(this.curAddress);
      this.addressList.splice(index, 1);
      this.delFlag = false;
    }

  }
});