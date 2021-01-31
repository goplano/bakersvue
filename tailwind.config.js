// tailwind.config.js
module.exports = {
    purge: [
        './src/**/*.html',
        './src/**/*.js',
        './src/**/*.vue',
    ],
    theme: {
        extend: {
            screens: {
                'print': {'raw': 'print'},
                'screen': {'raw': 'screen'},
                // => @media print { ... }
            }
        }
    }
}