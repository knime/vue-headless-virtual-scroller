# KNIME® Vue Headless Virtual Scroller

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=KNIME_vue-headless-virtual-scrolling&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=KNIME_vue-headless-virtual-scrolling)

Fast scrolling of large amounts of data for [Vue] ⚡️

While there is great work out there like [@vueuse/useVirtualList] and [vue-virtual-scroller], they don't meet our requirement of being able to simultaneously do horizontal ⇢ and vertical ⇣ virtual scrolling. Therefore, we took inspiration by the above and created [@knime/vue-headless-virtual-scroller].

We're using it in our open-source [KNIME Analytics Platform] and [KNIME Hub] for rendering tables with millions of rows and thousands of columns, used by 300,000+ of users worldwide. So yes, it's production-ready.

The following comparison gives an overview about the differences:

|                                      | [@knime/vue-headless-virtual-scroller] | [@vueuse/useVirtualList] | [vue-virtual-scroller] |
| :----------------------------------- | :------------------------------------: | :----------------------: | :--------------------: |
| 2D-scrolling (vertical & horizontal) |                   ✅                   |            ❌            |           ❌           |
| Different height/width of items      |                   ✅                   |            ❌            |           ✅           |
| Lazy-loading                         |                   ✅                   |            ✅            |           ❌           |
| Headless composable                  |                   ✅                   |            ✅            |           ❌           |
| Fully typed                          |                   ✅                   |            ✅            |           ❌           |
| Actively maintained                  |                   ✅                   |            ✅            |           ❌           |
| Bundle size                          |         ~7 kB (gzip: ~2.5 kB)          |           TBD            |          TBD           |

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

- Install Node.js, see version in [package.json](package.json).

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

This project contains unit tests based on [Vitest]. They are run with

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

To build as [Vue library], use the following command:

```sh
npm run build
```

Results are saved to `/dist` folder.

## Join the Community!

- [KNIME Forum](https://forum.knime.com/)

This repository is maintained by the [KNIME UI Extensions Development Team](mailto:team-ui-extensions@knime.com).

[Vue]: https://vuejs.org/
[@vueuse/useVirtualList]: https://vueuse.org/core/useVirtualList/
[vue-virtual-scroller]: https://github.com/Akryum/vue-virtual-scroller
[@knime/vue-headless-virtual-scroller]: https://www.npmjs.com/package/@knime/vue-headless-virtual-scroller
[KNIME Analytics Platform]: https://www.knime.com/knime-analytics-platform
[KNIME Hub]: https://hub.knime.com
[Vue library]: https://vitejs.dev/guide/build.html#library-mode
[Vitest]: https://vitest.dev/
[lcov]: https://github.com/linux-test-project/lcov
[clover]: http://openclover.org/
[husky]: https://www.npmjs.com/package/husky
[lintstaged]: https://github.com/okonet/lint-staged
