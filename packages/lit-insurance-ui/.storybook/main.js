/** @type {import('@storybook/web-components-vite').StorybookConfig} */
module.exports = {
  stories: ['../src/**/*.stories.@(js|ts)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
};