<template>
    <div class="otherhotel">
        <el-select @change="selectChange" v-model="otherchoice" :placeholder="title">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                <!--:disabled="item.value == currHotelRankCompared"-->
            </el-option>
        </el-select>
    </div>
</template>
<script>
    export default {
        name: "selectOtherHotel",
        props: {
            currHotelNameCompared: {
                type: String,
                default: ''
            },
            currHotelRankCompared: {
                type: String,
                default: ''
            },
            options: {
                type: Array,
                default: []
            },
            title: {
                type: String,
                default: ''
            }
        },
        data: function(){
            return {
                otherchoice: '',
            }
        },
        methods: {
            selectChange(value) {
                this.$emit('changeFunc', value);
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>