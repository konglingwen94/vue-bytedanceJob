const path=require('path')
module.exports={
    lintOnSave:'warning',
    pluginOptions:{
        'style-resources-loader':{

            preProcessor:'less',
            patterns:path.resolve(__dirname,'src/assets/variable.less')
        }
    }
}