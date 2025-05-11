# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Localization with Crowdin

This project uses `react-i18next` for internationalization and Crowdin for translation management.

### Setup (One-time)

1.  **Create a Crowdin Project**: If you haven't already, create a new project in [Crowdin](https://crowdin.com/).
2.  **Configure `crowdin.yml`**: 
    *   Open the `crowdin.yml` file in the root of this project.
    *   Replace `"YOUR_CROWDIN_PROJECT_ID"` with your actual Crowdin project ID.
3.  **Set API Token**: 
    *   Obtain a Personal Access Token from your Crowdin account settings.
    *   Set it as an environment variable named `CROWDIN_PERSONAL_TOKEN`. For example, you can add `export CROWDIN_PERSONAL_TOKEN="your_token_here"` to your shell configuration file (e.g., `.zshrc`, `.bashrc`) or use a `.env` file (ensure `.env` is in `.gitignore`).

### Workflow

1.  **Add/Update Source Strings**:
    *   When adding or changing translatable text in the application, ensure the new keys and their English default translations are added to `public/locales/en/translation.json`.
    *   Use the `t('your.key')` function from `react-i18next` in your components.

2.  **Upload Source Strings to Crowdin**:
    *   Once you have updated the English source file (`public/locales/en/translation.json`), upload it to Crowdin using the following command:
        ```bash
        npm run crowdin:upload
        ```
    *   This will make the new strings available for translation in your Crowdin project.

3.  **Download Translations from Crowdin**:
    *   After strings have been translated in Crowdin, download them into your project:
        ```bash
        npm run crowdin:download
        ```
    *   This will update/create language files (e.g., `public/locales/fr/translation.json`) in your `public/locales` directory based on your `crowdin.yml` configuration.

4.  **Commit Changes**: Commit the updated `translation.json` (if you made direct changes) and any new/updated locale files downloaded from Crowdin.
