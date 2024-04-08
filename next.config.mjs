

export default {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(mp4)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        publicPath: '/_next',
                        name: 'static/media/[name].[hash].[ext]',
                    },
                },
            ],
        });

        return config;
    },
  
};