// vite.config.js
import autoprefixer from "file:///C:/Users/cyber/OneDrive/Documents/GitHub/blackhawks-scouting/node_modules/autoprefixer/lib/autoprefixer.js";
import { defineConfig } from "file:///C:/Users/cyber/OneDrive/Documents/GitHub/blackhawks-scouting/node_modules/vite/dist/node/index.js";
import { fileURLToPath, URL } from "url";
import { liveReload } from "file:///C:/Users/cyber/OneDrive/Documents/GitHub/blackhawks-scouting/node_modules/vite-plugin-live-reload/dist/index.js";
import postcssPresetEnv from "file:///C:/Users/cyber/OneDrive/Documents/GitHub/blackhawks-scouting/node_modules/postcss-preset-env/dist/index.mjs";
import ReactivityTransform from "file:///C:/Users/cyber/OneDrive/Documents/GitHub/blackhawks-scouting/node_modules/@vue-macros/reactivity-transform/dist/vite.mjs";
import { VitePWA } from "file:///C:/Users/cyber/OneDrive/Documents/GitHub/blackhawks-scouting/node_modules/vite-plugin-pwa/dist/index.js";
import vue from "file:///C:/Users/cyber/OneDrive/Documents/GitHub/blackhawks-scouting/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/cyber/OneDrive/Documents/GitHub/blackhawks-scouting/vite.config.js";
var vite_config_default = defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer, postcssPresetEnv({ stage: 1 })]
    }
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version)
  },
  plugins: [
    ReactivityTransform(),
    vue(),
    VitePWA({
      includeAssets: ["assets/*", "icons/*"],
      manifest: {
        name: "Black Hawks Scouting",
        short_name: "Scouting",
        description: "A scouting app by FRC Team 2834",
        theme_color: "#292929",
        background_color: "#292929",
        icons: [
          {
            src: "icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    }),
    liveReload([
      "public/"
    ])
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxjeWJlclxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXGJsYWNraGF3a3Mtc2NvdXRpbmdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGN5YmVyXFxcXE9uZURyaXZlXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcYmxhY2toYXdrcy1zY291dGluZ1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvY3liZXIvT25lRHJpdmUvRG9jdW1lbnRzL0dpdEh1Yi9ibGFja2hhd2tzLXNjb3V0aW5nL3ZpdGUuY29uZmlnLmpzXCI7LyogZXNsaW50LWVudiBub2RlICovXHJcblxyXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gXCJhdXRvcHJlZml4ZXJcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcInVybFwiO1xyXG5pbXBvcnQgeyBsaXZlUmVsb2FkIH0gZnJvbSBcInZpdGUtcGx1Z2luLWxpdmUtcmVsb2FkXCI7XHJcbmltcG9ydCBwb3N0Y3NzUHJlc2V0RW52IGZyb20gXCJwb3N0Y3NzLXByZXNldC1lbnZcIjtcclxuaW1wb3J0IFJlYWN0aXZpdHlUcmFuc2Zvcm0gZnJvbSBcIkB2dWUtbWFjcm9zL3JlYWN0aXZpdHktdHJhbnNmb3JtL3ZpdGVcIjtcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGNzczoge1xyXG4gICAgcG9zdGNzczoge1xyXG4gICAgICBwbHVnaW5zOiBbYXV0b3ByZWZpeGVyLCBwb3N0Y3NzUHJlc2V0RW52KHsgc3RhZ2U6IDEgfSldXHJcbiAgICB9XHJcbiAgfSxcclxuICBkZWZpbmU6IHtcclxuICAgIEFQUF9WRVJTSU9OOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5ucG1fcGFja2FnZV92ZXJzaW9uKVxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgUmVhY3Rpdml0eVRyYW5zZm9ybSgpLFxyXG4gICAgdnVlKCksXHJcbiAgICBWaXRlUFdBKHtcclxuICAgICAgaW5jbHVkZUFzc2V0czogW1wiYXNzZXRzLypcIiwgXCJpY29ucy8qXCJdLFxyXG4gICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgIG5hbWU6IFwiQmxhY2sgSGF3a3MgU2NvdXRpbmdcIixcclxuICAgICAgICBzaG9ydF9uYW1lOiBcIlNjb3V0aW5nXCIsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQSBzY291dGluZyBhcHAgYnkgRlJDIFRlYW0gMjgzNFwiLFxyXG4gICAgICAgIHRoZW1lX2NvbG9yOiBcIiMyOTI5MjlcIixcclxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiBcIiMyOTI5MjlcIixcclxuICAgICAgICBpY29uczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IFwiaWNvbnMvcHdhLTE5MngxOTIucG5nXCIsXHJcbiAgICAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcclxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiBcImljb25zL3B3YS01MTJ4NTEyLnBuZ1wiLFxyXG4gICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gICAgbGl2ZVJlbG9hZChbXHJcbiAgICAgIFwicHVibGljL1wiXHJcbiAgICBdKVxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgfSxcclxuICB9XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsT0FBTyxrQkFBa0I7QUFDekIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxlQUFlLFdBQVc7QUFDbkMsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTyxzQkFBc0I7QUFDN0IsT0FBTyx5QkFBeUI7QUFDaEMsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sU0FBUztBQVQ2TixJQUFNLDJDQUEyQztBQVk5UixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTLENBQUMsY0FBYyxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQUEsSUFDeEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixhQUFhLEtBQUssVUFBVSxRQUFRLElBQUksbUJBQW1CO0FBQUEsRUFDN0Q7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLG9CQUFvQjtBQUFBLElBQ3BCLElBQUk7QUFBQSxJQUNKLFFBQVE7QUFBQSxNQUNOLGVBQWUsQ0FBQyxZQUFZLFNBQVM7QUFBQSxNQUNyQyxVQUFVO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixrQkFBa0I7QUFBQSxRQUNsQixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
