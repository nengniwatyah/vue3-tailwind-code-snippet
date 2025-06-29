# Vue 3 + Tailwind CSS Code Snippet

This repository provides a collection of reusable UI components built with Vue 3 and styled using Tailwind CSS. It serves as a practical example for integrating these technologies, along with state management using Pinia and UI components from Element Plus.

## Features

*   **Vue 3**: Modern JavaScript framework for building user interfaces.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
*   **Pinia**: Intuitive, type-safe, and modular state management for Vue.
*   **Element Plus**: A Vue 3 based component library for designers and developers.
*   **Vite**: Fast development build tool.
*   **Vitest**: A blazing fast unit-test framework powered by Vite.
*   **Storybook**: For isolated UI component development and documentation.

## Installation

To get a local copy up and running, follow these simple steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nengniwatyah/vue3-tailwind-code-snippet.git
    cd vue3-tailwind-code-snippet
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

## Usage

*   **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5500` (or another port if 5500 is in use).

*   **Build for production:**

    ```bash
    npm run build
    ```

    This will create a `dist` directory with the production-ready build.

*   **Preview the production build:**

    ```bash
    npm run preview
    ```

*   **Run unit tests:**

    ```bash
    npm run test
    # or for watch mode
    npm run test:watch
    ```

*   **Run Storybook:**

    ```bash
    npm run storybook
    ```

    Storybook will typically open at `http://localhost:6006`.

## Project Structure

```
vue3-tailwind-code-snippet/
├── public/
├── src/
│   ├── assets/             # Static assets like CSS and icons
│   ├── components/         # Reusable Vue components
│   ├── router/             # Vue Router configuration
│   ├── stores/             # Pinia stores for state management
│   ├── stories/            # Storybook stories for components
│   └── views/              # Vue components representing different pages/views
├── .storybook/           # Storybook configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite build tool configuration
├── vitest.config.js      # Vitest test runner configuration
├── package.json          # Project dependencies and scripts
└── README.md             # This file
```

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is open-sourced under the MIT License.
