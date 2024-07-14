module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
    },
  },
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  'strapi-algolia': {
    enabled: true,
    config: {
      apiKey: '336b72a5a62fc1c29cc90d6fce21a6c9',
      applicationId: '4XKHY9LF3A',
      contentTypes: [
        { name: 'api::tool.tool' },
        { name: 'api::tag.tag' },
        { name: 'api::tools-combo.tools-combo' },
        { name: 'api::playground-example.playground-example' },
      ],
    },
  }
});