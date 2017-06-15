const babel = require('babel-core');
const presets = {
    'env': require('babel-preset-env'),
    'es2015': require('babel-preset-es2015'),
    'react': require('babel-preset-react'),
    'stage-0': require('babel-preset-stage-0'),
    'stage-1': require('babel-preset-stage-1'),
    'stage-2': require('babel-preset-stage-2'),
    'stage-3': require('babel-preset-stage-3')
};

module.exports = function (content, file, settings) {
    // 添加 useBabel 配置项，如果 useBabel 为 false 则不进行编译
    if (file.isES6 === false) {
        return content;
    }

    settings = Object.assign({
        presets: [
            ["env", {
                "loose": false,
                "targets": {
                    "chrome": 42,
                    "browsers": ["last 2 versions", "safari > 7"]
                }
            }],
            "react",
            "stage-0"
        ]
    }, settings);

    // 添加 jsx 的 html 语言能力处理
    if (fis.compile.partial && file.ext === '.jsx') {
        content = fis.compile.partial(content, file, {
            ext: '.html',
            isHtmlLike: true
        });
    }

    // 为了不需要在项目目录内安装 babel-presets 依赖
    if (Array.isArray(settings.presets)) {
        let presetName, i;

        for (i = 0; i < settings.presets.length; i++) {
            presetName = settings.presets[i];

            if (Array.isArray(presetName) && presets[presetName[0]]) {
                settings.presets[i][0] = presets[presetName[0]];
            } else if (presets[presetName]) {
                settings.presets[i] = presets[presetName];
            }
        }
    }

    const result = babel.transform(content, settings);

    // 添加resourcemap输出
    if (result.map) {
        const mapping = fis.file.wrap(file.dirname + '/' + file.filename + file.rExt + '.map');

        mapping.setContent(JSON.stringify(result.map, null, 4));

        let url = mapping.getUrl(fis.compile.settings.hash, fis.compile.settings.domain);

        result.code = result.code.replace(/\n?\s*\/\/#\ssourceMappingURL=.*?(?:\n|$)/g, '');
        result.code += '\n//# sourceMappingURL=' + url + '\n';
        file.extras = file.extras || {};
        file.extras.derived = file.extras.derived || [];
        file.extras.derived.push(mapping);
    }

    return result.code;
};
