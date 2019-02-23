import './polyfills.ts';
import './assets/index.ts';
import '@angular/material/prebuilt-themes/deeppurple-amber.css';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './components/app.website.module';
import { env } from './environment';

env.website = true;

export function run() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}
document.addEventListener('DOMContentLoaded', run);
