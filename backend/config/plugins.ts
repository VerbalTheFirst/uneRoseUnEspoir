export default ({ env }) => {
  // Use Cloudinary in production only (when env vars are set)
  // In development, Strapi uses its default local provider (files in /public/uploads)
  if (env('CLOUDINARY_NAME')) {
    return {
      upload: {
        config: {
          provider: 'cloudinary',
          providerOptions: {
            cloud_name: env('CLOUDINARY_NAME'),
            api_key: env('CLOUDINARY_KEY'),
            api_secret: env('CLOUDINARY_SECRET'),
          },
          actionOptions: {
            upload: { folder: 'urue' },
            uploadStream: { folder: 'urue' },
            delete: {},
          },
        },
      },
    };
  }

  // Local development: default provider (no config needed)
  return {};
};
