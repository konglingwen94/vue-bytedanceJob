const path=require('path')
module.exports={
    lintOnSave:'warning',
    pluginOptions:{
        'style-resources-loader':{

            preProcessor:'less',
            patterns:[path.resolve(__dirname,'src/assets/style/variable.less'),path.resolve(__dirname,'src/assets/style/mixin.less')]
        }
    },
    devServer:{
        proxy:'http://localhost:3000'
    }
}