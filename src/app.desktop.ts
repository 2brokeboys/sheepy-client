import './polyfills.ts';
import './assets/index.ts';
import '@angular/material/prebuilt-themes/deeppurple-amber.css';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './components/app.desktop.module';
import { env } from './environment';

env.website = false;

export function run() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}
document.addEventListener('DOMContentLoaded', run);
