const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/en.json'
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export'
};

// export default withNextIntl(nextConfig);
module.exports = withNextIntl(nextConfig);
