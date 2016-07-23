<template>
    <footer>
        <ul>
            <li :class="{active:acts[0]}" @click="show(0)"><i class="iconfont">&#xe62d;</i><br>微信</li>
            <li :class="{active:acts[1]}" @click="show(1)"><i class="iconfont">&#xe673;</i><br>通讯录</li>
            <li :class="{active:acts[2]}" @click="show(2)"><i class="iconfont">&#xe607;</i><br>发现</li>
            <li :class="{active:acts[3]}" @click="show(3)"><i class="iconfont">&#xe60d;</i><br>我</li>
        </ul>
    </footer>
</template>
<script>
    export default {
        data: function () {
            return {acts: [true, false, false, false], curIdx: 0};
        },
        methods: {
            show: function (idx) {
                let curIdx = this.curIdx;
                if (curIdx !== idx) {
                    this.acts.$set(curIdx, false);
                    this.acts.$set(idx, true);
                    this.curIdx = idx;

                    switch (idx) {
                        case 0:
                            break;
                            this.$router.go('/');
                        case 1:
                            this.$router.go('/addressbook');
                            break;
                    }
                }
            }
        }

    }
</script>