const { withPlausibleProxy } = require('next-plausible')

/** @type {import('next').NextConfig} */
module.exports = withPlausibleProxy()({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'mintyourpfp.xyz'],
  },
})
