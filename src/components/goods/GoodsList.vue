<template>
    <ul class="goods-list">
        <li>
            <img src="../../images/xiaomi.jpg" alt="">
            <h2>这是一部国产性价比最高的手机</h2>
            <div class="info">
                <p class="price">
                    <span class="new-price">&yen;888</span>
                    <span class="old-price">&yen;999</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>还剩60件</span>
                </p>
            </div>
        </li>
         <li>
            <img src="../../images/xiaomi.jpg" alt="">
            <h2>这是一部国产性价比最高的手机</h2>
            <div class="info">
                <p class="price">
                    <span class="new-price">&yen;999</span>
                    <span class="old-price">&yen;888</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>还剩60件</span>
                </p>
            </div>
        </li>
         <li>
            <img src="../../images/xiaomi.jpg" alt="">
            <h2>这是一部国产性价比最高的手机</h2>
            <div class="info">
                <p class="price">
                    <span class="new-price">&yen;999</span>
                    <span class="old-price">&yen;888</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>还剩60件</span>
                </p>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.goods-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    >li {
        width: 49%;
        border: 1px solid #ccc;
        margin: 3px 0;
        >img {
            width: 100%;
            display: block;
        }
        >h2 {
            font-size: 14px;
        }
        .info {
            .price {
                .new-price {
                    color: red;
                }
                .old-price {
                    text-decoration: line-through;
                }
            }
            .sell {
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>

