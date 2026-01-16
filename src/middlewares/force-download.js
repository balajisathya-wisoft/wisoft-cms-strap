'use strict';

/**
 * Middleware: Force download when ?download is present
 * Works for .html (and other) files in /uploads
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next(); // let Strapi serve the file first

    try {
      // Check if the request is for an uploaded file and includes ?download
      const isUpload = ctx.path.startsWith('/uploads/');
      const hasDownloadParam = ctx.query && 'download' in ctx.query;

      if (isUpload && hasDownloadParam) {
        const filename = ctx.path.split('/').pop() || 'file.html';

        // Set response headers for forced download
        ctx.set('Content-Disposition', `attachment; filename="${filename}"`);

        // Infer MIME type based on extension
        if (filename.endsWith('.html')) ctx.set('Content-Type', 'text/html; charset=utf-8');
        else if (filename.endsWith('.pdf')) ctx.set('Content-Type', 'application/pdf');
        else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) ctx.set('Content-Type', 'image/jpeg');
        else if (filename.endsWith('.png')) ctx.set('Content-Type', 'image/png');
        else ctx.set('Content-Type', 'application/octet-stream');
      }
    } catch (err) {
      strapi.log.error('Force download middleware error:', err);
    }
  };
};
