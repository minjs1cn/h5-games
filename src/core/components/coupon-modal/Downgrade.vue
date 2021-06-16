<template>
  <div class="downgrade-cm J_modalShowPrize">
    <div class="downgrade-cm-dialog">
      <div class="downgrade-cm-title">恭喜你获得</div>

      <div
        class="downgrade-cm-coupon"
        :style="{ backgroundImage: `url(${couponImage})` }"
      ></div>

      <div class="downgrade-cm-name">{{ couponName }}</div>

      <div class="downgrade-cm-btn J_btnCoupon">立即领取</div>
    </div>

    <div class="downgrade-cm-close coupon-modal-close"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DowngradeCouponModal',

  props: {
    couponName: String,
    couponImage: String
  }
}
</script>

<style lang="less">
.MHCenter() {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.WH(@width, @height) {
  width: unit(@width, px);
  height: unit(@height, px);
}

.downgrade-cm {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.85);

  &-dialog {
    .MHCenter();
    .WH(640, 580);

    top: 260px;
    border-radius: 24px;
    // 为了兼容性写两个
    background: #ff0000;
    background: linear-gradient(0deg, #ff0000, #ff8950);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-title {
    font-size: 50px;
    text-align: center;
    font-weight: bold;
    color: #fff;
    height: 100px;
    line-height: $height;
  }

  &-coupon {
    position: relative;
    width: 598px;
    height: 280px;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 6px;
    border: 6px #fff solid;
  }

  &-name {
    background-color: #e10909;
    padding: 6px 24px;
    text-align: center;
    font-size: 24px;
    line-height: 30px;
    color: #fff;
    margin-top: 20px;
    border-radius: 12px;
  }

  &-btn {
    .MHCenter();
    .WH(200, 200);

    font-size: 68px;
    text-align: center;
    bottom: -($height / 2);
    font-weight: bold;
    line-height: 1;
    color: #522507;
    border-radius: 50%;
    background: #ffeb79;
    background: linear-gradient(118deg, #fe8e26, #feec6e 86%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-close {
    .WH(50, 50);

    position: absolute;
    top: 120px;
    right: 44px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAM1BMVEX///8AAAD///////////////////////////////////////////////////////////+Q8lQ3AAAAEHRSTlMaABJ6Cm6GZiaOUUQv6N45tbIMcQAAATdJREFUSMe111FugzAQBNDxYqcUSOr7n7ZWZYI0g0ZyrcwPP3nasIj1gnSfHBFoaZec7oNbBsrFLe1OtKEMFVuaYZOJmpK+MFxJXxhOegsnvYWT3sJIZy8aGMlFRyXiohmDyW+K4Zw0xmn8US56lB2SraxSFlz0eNa6sPyu9bVyWXDRUmuzLFs2Lgtu7167JVkPbjKkSUu3JL+kUUiAt48uOUTJkmSaYayRDQaM7bIAmiBKlqRQY41kqFalUrUiNZ4u/5LO+jaRHXw4/TJC38TYQIamnMDZjGSktYkoSbJMw0hjQwfMz/lDtjvdqo61rbY8uOH6zuowxfrqkuxThqmO8LVskOyFBuL8wZHG6cQhOX80j//l2TVkfvlR6+X8ojdm8/xSO79Kzy/wHscnPlaUtzRjPpF+AW+VE1OIhD8CAAAAAElFTkSuQmCC);
  }
}
</style>
