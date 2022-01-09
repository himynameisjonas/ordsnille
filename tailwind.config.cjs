const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        abril: ['"Abril Fatface"', "cursive"],
      },
    },
  },

  plugins: [require("tailwindcss-safe-area")],
};

module.exports = config;
