<template>
     <div ref="editor"></div>
</template>
<script>
    import  "./ueditor.config.js"
    import  "./ueditor.all.min.js"
    import "./lang/zh-cn/zh-cn.js"

    export default{
      
        data() {
            return {
             id: getRandomNum(0,100000) + 'ueditorId',
             text:""
            };
        },
        props: {
          value: {
            type: String,
            default: null
          },
          config: {
            type: Object,
            default: {}
          }
        },
        watch: {
          value: function value(val, oldVal) {
            this.editor = UE.getEditor(this.id, this.config);
            if (val !== null) {
                if(this.text != val){//值改变了，否则会光标定位到开始
                    this.editor.setContent(val);
                }
            }

          },
        },
        mounted() {
            this.$nextTick(function f1() {

                this.$refs.editor.id = this.id;
                this.editor = UE.getEditor(this.id, this.config);

                this.editor.ready(function f2() {
                this.editor.setContent(this.value);
                this.editor.addListener("contentChange", function () {
                    const wordCount = this.editor.getContentLength(true);
                    const content = this.editor.getContent();
                    const plainTxt = this.editor.getPlainTxt();
                    this.text=content;
                this.$emit('input', { wordCount: wordCount, content: content, plainTxt: plainTxt });
                  }.bind(this));
                  this.$emit('ready', this.editor);
                }.bind(this));
            });
        }     
}

</script>