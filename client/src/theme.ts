// src/theme.ts
import { createSystem, defaultConfig } from "@chakra-ui/react"

export const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50:  { value: "#e3f2f9" },
          100: { value: "#c5e4f3" },
          200: { value: "#a2d4ec" },
          300: { value: "#7ac1e4" },
          400: { value: "#47a9da" },
          500: { value: "#0088cc" },  // הצבע הראשי
          600: { value: "#007ab8" },
          700: { value: "#006ba1" },
          800: { value: "#005885" },
          900: { value: "#003f5e" },
        },
      },
      radii: {
        sm: { value: "6px" },
        md: { value: "12px" },
        lg: { value: "20px" }, // פינות יותר עגולות
      },
    },
    semanticTokens: {
      colors: {
        primary: { value: "{colors.brand.500}" }, // אפשר להשתמש ב־colorPalette="primary"
      },
    },
  },
})
