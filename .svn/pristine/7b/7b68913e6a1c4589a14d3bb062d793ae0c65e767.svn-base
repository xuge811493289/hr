<template>
    <div class="jp-grad-box">
        <div class="jp-header-left" v-if="$slots.headerLeft" :style="{'border-right': border ? '1px solid #ddd' : 0 ,'border-bottom': border ? '1px solid #ddd' : 0 ,width: $slots.headerLeft && $slots.headerLeft ? leftWidth*100+'%' : '100%',height: headerH,'line-height': headerH}">
            <slot name="headerLeft"></slot>
        </div>
        <div class="jp-header-right" v-if="$slots.headerRight" :style="{'border-bottom': border ? '1px solid #ddd' : 0 ,width: $slots.headerRight && $slots.headerLeft ? (1-leftWidth)*100+'%' : '100%',height: headerH}">
            <slot name="headerRight"></slot>
        </div>
        <div class="jp-body-left" v-if="$slots.bodyLeft" :style="{'border-right': border ? '1px solid #ddd' : 0 ,width: $slots.bodyLeft && $slots.bodyRight ? leftWidth*100+'%' : '100%',top: '40px', bottom: $slots.footer ? footerH : '0px',top: $slots.headerLeft && $slots.bodyLeft ? headerH : '0px', }">
            <slot name="bodyLeft"></slot>
        </div>
        <div class="jp-body-right" v-if="$slots.bodyRight" :style="{width: $slots.bodyRight && $slots.bodyLeft ? (1-leftWidth)*100+'%' : '100%',top: $slots.bodyRight && $slots.headerRight ? headerH : '0px', bottom: $slots.footer ? footerH : '0px'}">
            <slot name="bodyRight"></slot>
        </div>
        <div class="jp-grad-footer" v-if="$slots.footer" :style="{height: footerH,'border-top': border ? '1px solid #ddd' : 0 ,'line-height': footerH}">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>

export default {
    name: 'jp-grad-4',
    props: {
        border: {
            type:Boolean,
            default: true
        },
        leftWidth: {
            type:String,
            default: '0.20'
        },
        headerH: {
            type:String,
            default: '40px'
        },
        footerH: {
            type:String,
            default: '40px'
        },
        themes: {
            type: Object,
            default:()=>{
                return {
                    color: '#333'
                }
            }
        }
    },
    data () {
        return {

        }
    },
    beforeCreate(){

    },
    created(){

    },
    methods:{

    }
}
</script>

<style scoped>
    div{
        box-sizing: border-box;
    }
</style>
