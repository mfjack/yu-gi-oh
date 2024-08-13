import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "images.ygoprodeck.com" }],
    }
};

export default nextConfig;
