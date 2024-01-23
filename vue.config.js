const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    allowedHosts: ['https://unit2-project-frontend-production.up.railway.app/']
  }
})


