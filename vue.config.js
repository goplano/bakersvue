module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Sourdough Hydration Calculator',
                args[0].description = 'Sourdough Hydration Calculator - vue3 edition'
                return args
            })
        if (process.env.NODE_ENV === 'production') {
            // mutate config for production...
        } else {
            // mutate for development...
        }
    }
};

