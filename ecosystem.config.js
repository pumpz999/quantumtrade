export default {
  apps: [{
    name: "quantum-trade-platform",
    script: "./server/index.js",
    env: {
      NODE_ENV: "production",
      PORT: 3000
    }
  }]
}
