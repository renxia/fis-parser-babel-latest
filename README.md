fis-parser-babel-latest
=====================

A　Plugin to translate es2015/es2016/es2017 to es5 based on babel in fis.

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
                ["latest", {
                    "es2015": {
                        "loose": true
                    }
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
