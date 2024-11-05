/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { setLibs, decorateArea } from './utils.js';

// Add project-wide style path here.
const STYLES = '';

// Use 'https://milo.adobe.com/libs' if you cannot map '/libs' to milo's origin.
const LIBS = '/libs';
// Add any config options.
const CONFIG = {
  // codeRoot: '',
  // contentRoot: '',
  imsClientId: 'newsroom-helix',
  // imsScope: 'AdobeID,openid,gnav',
  // geoRouting: 'off',
  // fallbackRouting: 'off',
  decorateArea,
  live: {
    pdfViewerClientId: '7eccb9df7f684a54abc5b28e8b0044f3',
    edgeConfigId: '72b074a6-76d2-43de-a210-124acc734f1c',
  },
  stage: {
    pdfViewerClientId: '52092f4f87194756a2f344c9849ca34a',
    edgeConfigId: '72b074a6-76d2-43de-a210-124acc734f1c',
  },
  prod: {
    pdfViewerClientId: '2247575709e1419c90edba7caeb215ad',
    edgeConfigId: '913eac4d-900b-45e8-9ee7-306216765cd2',
  },
  locales: {
    '': { ietf: 'en-US', tk: 'hah7vzn.css' },
    en: { ietf: 'en-US', tk: 'hah7vzn.css' },
    de: { ietf: 'de', tk: 'hah7vzn.css' },
    ko: { ietf: 'ko', tk: 'zfo3ouc' },
    es: { ietf: 'es', tk: 'oln4yqj.css' },
    fr: { ietf: 'fr', tk: 'vrk5vyv.css' },
    it: { ietf: 'it', tk: 'bbf5pok.css' },
    jp: { ietf: 'ja-JP', tk: 'dvg6awq' },
    kr: { ietf: 'ko', tk: 'qjs5sfm' },
    br: { ietf: 'pt-BR', tk: 'inq1xob.css' },
    'en/uk': { ietf: 'en', tk: 'hah7vzn.css' },
    'en/apac': { ietf: 'en', tk: 'hah7vzn.css' },
  },
};

// Decorate the page with site specific needs.
decorateArea();

/*
 * ------------------------------------------------------------
 * Edit below at your own risk
 * ------------------------------------------------------------
 */

const miloLibs = setLibs(LIBS);

(function loadStyles() {
  const paths = [`${miloLibs}/styles/styles.css`];
  if (STYLES) { paths.push(STYLES); }
  paths.forEach((path) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', path);
    document.head.appendChild(link);
  });
}());

(async function loadPage() {
  const { loadArea, setConfig, loadLana } = await import(`${miloLibs}/utils/utils.js`);
  // eslint-disable-next-line no-unused-vars
  const config = setConfig({ ...CONFIG, miloLibs });
  loadLana({ clientId: 'news' });
  await loadArea();
}());
