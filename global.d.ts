// This file tells TypeScript to treat CSS files as valid modules
// Without this, TypeScript throws a warning when importing .css files
// because it doesn't know what a CSS import returns
declare module '*.css'