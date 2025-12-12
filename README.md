# KNIME® Vue Headless Virtual Scroller

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=KNIME_vue-headless-virtual-scrolling&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=KNIME_vue-headless-virtual-scrolling)

This repository is maintained by the [KNIME UI Extensions Development Team](mailto:team-ui-extensions@knime.com).

Fast scrolling of large amounts of data. ⚡️

Uses a virtual grid to enable simultanous horizontal ⇢ and vertical ⇣ virtual scrolling. Based on the [Vue] JavaScript framework.

Inspired by [Vue Virtual Scroller].

## Demo

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/knime/vue-headless-virtual-scroller/tree/master/demo?file=src%2Fcomponents%2FDemoGrid.vue)

## Using it in a Vue component

Install [@knime/vue-headless-virtual-scroller] npm package as dependency:

```sh
npm i @knime/vue-headless-virtual-scroller
```

The library exposes two Vue composables which can be utilized depending on the use case:

- `useVirtualLine([...])` enables scrolling in a single direction
- `useVirtualGrid([...])` enables scrolling in both horizontal and vertical directions

A `SizeManager` is passed as prop to determine how virtual sizes are determined for scrolling. E.g. a `SameSizeManager` assumes that all contained items will have the same height (or width respectively).

See the [`DemoGrid.vue`](demo/src/components/DemoGrid.vue) for a simple integration.

## Development

### Prerequisites

- Install [Node.js][node], see version in [package.json](package.json).

Newer versions may also work, but have not been tested.

### Install dependencies

```sh
npm install
```

### Git hooks

When committing your changes, a couple of commit hooks will run via [husky].

- `pre-commit` hook to lint and format the changes in your stage zone (via [lintstaged])
- `prepare-commit-msg` hook to format your commit message to conform with the required format by KNIME. In order for this to work you must set environment variables with your Atlassian email and API token. Refer to `@knime/eslint-config/scripts/README.md` for more information.

### Launch development server with demo application

```sh
npm run dev
```

### Testing

#### Running unit tests

This project contains unit tests based on [Vitest].
They are run with

```sh
npm run test:unit
```

You can generate a coverage report with

```sh
npm run coverage
```

The output can be found in the `coverage` folder. It contains a browseable html report as well as raw coverage data in
[LCOV] and [Clover] format, which can be consumed in analysis software (Sonar, Jenkins, …).

### Running security audit

npm provides a check against known security issues of used dependencies. Run it by calling

```sh
npm run audit
```

## Building

To build the table component as [Vue library], use the following command:

```sh
npm run build
```

Results are saved to `/dist` folder.

## Maintaining changelogs & publishing to npm

Every PR must include changeset file(s) out of which the CHANGELOG file will get generated. Use the following command to create such files:

```sh
npm run changeset
```

Do merge those files with the PR to master.

### Publishing to npm

The [`release` GitHub Action](./.github/workflows/release.yml) will automatically create & update a "Version Packages" PR if it detects
changeset file(s) on master. Once a release should be published to npm, simply do merge this PR.

## Join the Community!

- [KNIME Forum](https://forum.knime.com/)

[Vue]: https://vuejs.org/
[Vue Virtual Scroller]: https://github.com/Akryum/vue-virtual-scroller
[node]: https://knime-com.atlassian.net/wiki/spaces/SPECS/pages/905281540/Node.js+Installation
[Vue library]: https://vitejs.dev/guide/build.html#library-mode
[Vitest]: https://vitest.dev/
[lcov]: https://github.com/linux-test-project/lcov
[clover]: http://openclover.org/
[husky]: https://www.npmjs.com/package/husky
[lintstaged]: https://github.com/okonet/lint-staged
[@knime/vue-headless-virtual-scroller]: https://www.npmjs.com/package/@knime/vue-headless-virtual-scroller
