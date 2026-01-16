module.exports = {
  upload: {
    config: {
      sizeLimit: 20 * 1024 * 1024,
      providerOptions: {},
      breakpoints: {},
      allowedMimeTypes: [
        'image/*',
        'video/*',
        'audio/*',
        'application/pdf',
        'application/zip',
        'text/html'
      ],
    },
  },
};
