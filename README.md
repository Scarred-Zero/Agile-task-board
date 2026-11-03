# Agile Task Board

A responsive task board interface built with HTML, CSS, and JavaScript.

## Features

- Task board with status columns, task cards, and sprint summary metrics
- Task creation modal and activity log drawer
- Dark/light theme toggle with the selected theme saved in the browser
- Responsive layout for different screen sizes

## Getting Started

`dist/` is the canonical application source and the directory deployed by
Netlify. This project has no separate build output or build step.

1. Clone or download this repository.
2. Serve `dist/index.html` over HTTP. ES modules require an HTTP server; in
   VS Code, open `dist/index.html` with the Live Server extension.

Run the dependency-free Node.js checks from the repository root with
`npm test`.

## Project Structure

```Agile-task-board
dist/
  index.html
  assets/
    css/     Stylesheets
    img/     Placeholder avatars
    js/
      app.js
      database/
      dom/
      utils/
tests/       Node.js tests
```
