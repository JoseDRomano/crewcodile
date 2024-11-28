const withTM = require('next-transpile-modules')(['react-gauge-chart', 'd3']);

module.exports = withTM({
    experimental: {
        esmExternals: true,
    },
});


module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '**',
            },
        ],
    },
};
