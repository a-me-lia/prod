/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: "/api/firebase/firestore/sendData", // Replace "/api/*" with your Firestore API endpoint
            headers: [
              {
                key: "Access-Control-Allow-Origin",
                value: "*", // Replace "*" with your desired origins or restrict it to specific domains
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET, POST, PUT, DELETE, OPTIONS",
              },
              {
                key: "Access-Control-Allow-Headers",
                value: "X-Requested-With, Content-Type, Authorization",
              },
            ],
          },
        ];
      },
}

module.exports = nextConfig
