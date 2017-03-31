fis-parser-babel-latest
=====================

A　Plugin to translate es2015/es2016/es2017 to es5 based on babel in fis/fis3.

[![NPM version][npm-image]][npm-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[stars-img]: https://img.shields.io/github/stars/renxia/fis-parser-babel-latest.svg
[stars-url]: https://github.com/renxia/fis-parser-babel-latest/stargazers
[forks-img]: https://img.shields.io/github/forks/renxia/fis-parser-babel-latest.svg
[forks-url]: https://github.com/renxia/fis-parser-babel-latest/network
[issues-img]: https://img.shields.io/github/issues/renxia/fis-parser-babel-latest.svg
[issues-url]: https://github.com/renxia/fis-parser-babel-latest/issues
[npm-image]: https://img.shields.io/npm/v/fis-parser-babel-latest.svg?style=flat-square
[npm-url]: https://npmjs.org/package/fis-parser-babel-latest
[gemnasium-image]: https://img.shields.io/gemnasium/renxia/fis-parser-babel-latest.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/renxia/fis-parser-babel-latest
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: https://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/fis-parser-babel-latest.svg?style=flat-square
[download-url]: https://npmjs.org/package/fis-parser-babel-latest

### INSTALL

```bash
npm install -g fis-parser-babel-latest
```

### USE

- in fis3

    ```js
	fis3.match('js/**.js', {
        parser: fis.plugin('babel-latest')
    })
	```

	```js
	fis3.match('js/**.js', {
        parser: fis.plugin('babel-latest', {
            "presets": [
                ["env", {
                    "loose": true
                }],
                "react",
                "stage-0"
            ]
        })
    })
	```

- in fis

	```js
	fis.config.set('modules.parser.js', 'babel-latest');
	fis.config.set('settings.parser.babel-latest', {
		// options
	});

	fis.config.set('roadmap.path', [
		{
			reg: '/es6/**.js',
			isES6: true
		},
		{
			reg: '**.js',
			isES6: false // 排除其他
		}
	].concat(fis.config.get('roadmap.path', []));
	```

更多配置项参考：[http://babeljs.io/docs/usage/options/](http://babeljs.io/docs/usage/options/)
