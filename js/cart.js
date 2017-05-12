var vm = new Vue({
  el: "#app",
  data: {
    totalMoney: 0,
    productList: [],
    checkAllFlag: false,
    delFlag: false,
    curProduct: ''
  },
  filters: {
    formatMoney: function (value) {
      return "￥" + value.toFixed(2);
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.cartView();
    });
  },
  methods: {
    cartView: function () {
      let _this = this;
      this.$http.get("data/cartData.json", { "id": 123 }).then(res => {
        _this.productList = res.data.result.list;
        // _this.totalMoney = res.data.result.totalMoney;
      });
    },
    changeQuantity: function (product, way) {
      if (way > 0) {
        product.productQuantity++;
      } else {
        product.productQuantity--;
        if (product.productQuantity < 1) {
          product.productQuantity = 1;
        }
      }
      this.calcTotalPrice();
    },
    selectedProduct: function (item) {
      if (typeof item.checked == 'undefined') {
        Vue.set(item, "checked", true);
        // this.$set(item,"checked",true);
      } else {
        item.checked = !item.checked;
      }
      this.calcTotalPrice();
    },
    checkAll: function (flag) {
      this.checkAllFlag = flag;
      var _this = this;
      this.productList.forEach(function (item, index) {
        if (typeof item.checked == 'undefined') {
          _this.$set(item, "checked", _this.checkAllFlag);
        } else {
          item.checked = _this.checkAllFlag;
        }
      })
      this.calcTotalPrice();
    },
    calcTotalPrice: function () {
      var _this = this;
      _this.totalMoney = 0;
      this.productList.forEach(function (item, index) {
        if (item.checked) {
          _this.totalMoney += item.productQuantity * item.productPrice;
        }
      })
    },
    delConfirm: function (item) {
      this.delFlag = true;
      this.curProduct = item;
    },
    delProduct: function () {
      var index = this.curProduct.indexOf(this.curProduct);
      this.productList.splice(index, 1);
      this.delFlag = false;
    }

  }
});
Vue.filter('money', function (value, type) {
  return "￥" + value.toFixed(2) + type;
});