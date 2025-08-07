#!/usr/bin/env node

// Vercel build script
import { execSync } from 'child_process';
import { mkdirSync, existsSync } from 'fs';

console.log('Starting Vercel build...');

// Ensure dist directory exists
if (!existsSync('dist')) {
  mkdirSync('dist', { recursive: true });
}

// Build frontend
console.log('Building frontend...');
execSync('vite build --outDir dist/public', { stdio: 'inherit' });

console.log('Vercel build completed!');