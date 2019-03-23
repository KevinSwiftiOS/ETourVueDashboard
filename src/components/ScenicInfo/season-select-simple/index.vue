<template>
    <el-row :gutter="20" class="year-select">
        <!-- 月份 -->
        <el-col class="item" :xs="12" :sm="8" :md="8">
            <el-date-picker @change="yearSelectChange"
                    v-model="currYearOption"
                    type="year"
                    value-format="yyyy"
                    placeholder="选择年份"
                    :picker-options="dateOption"
                    style="width:100%"
            >
            </el-date-picker>
        </el-col>
        <el-col class="item" :xs="12" :sm="8" :md="6">
            <el-select v-model="firstSeasonOption" placeholder="Select">
                <el-option
                        v-for="item in seasons"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                </el-option>
            </el-select>
        </el-col>
        <el-col class="item button-box" :xs="12" :sm="8" :md="8">
            <el-button type="primary" style="float:right" @click="search()"
            >确定</el-button
            >
        </el-col>
    </el-row>
</template>
<script>
    const moment = require("moment");
    export default {
        name: "season-select-simple",
        props: {
            start: {
                type: String,
                default: ""
            },
            end: {
                type: String,
                default: ""
            }
        },
        data() {
            const that = this;
            return {
                dateOption: {
                    disabledDate(time) {
                        return (
                            time.getTime() > new Date(that.end.split('-')[0]) ||
                            time.getTime() < new Date(that.start.split('-')[0])
                        );
                    }
                },
                currYearOption: "",
                currDate: new Date(),
                seasons : [
                    { label: "第一季度", value: "1" , disabled: false },
                    { label: "第二季度", value: "2" , disabled: false },
                    { label: "第三季度", value: "3" , disabled: false },
                    { label: "第四季度", value: "4" , disabled: false }
                ],
                firstSeasonOption: '第一季度',
                currSeason: "",

            };
        },
        created() {},
        methods: {
            yearSelectChange: function () {
                this.firstSeasonOption = '1'
                this.seasons[2].disabled = true;
                if(this.currYearOption == this.currDate.getFullYear().toString()) {
                    var currSeason = parseInt(this.currSeason);
                    for(var i = 3; i >= currSeason; i--) {
                        this.seasons[i].disabled = true;
                    }
                }else{
                    for(var i = 0; i < 4; i++) {
                        this.seasons[i].disabled = false;
                    }
                }
            },
            search() {
                this.$emit("search", {
                    date: this.currYearOption+'-'+this.firstSeasonOption
                });
            }
        },
        watch: {
            end(value) {
                var currYear = value.split('-');
                this.currYearOption = currYear[0];
                this.currSeason = currYear[1];
                this.firstSeasonOption = this.currSeason

                var currSeason = parseInt(this.currSeason) ;
                for(var i = 3; i >= currSeason; i--) {
                    this.seasons[i].disabled = true;
                }
            }
        }
    };
</script>

<style lang="scss">
    .year-select {
        .item {
            margin-bottom: 10px;
        }
    }
</style>
