const babel = require('babel-core');

module.exports = function (content, file, settings) {
    // 添加 useBabel 配置项，如果 useBabel 为 false 则不进行编译
    if (file.isES6 === false) {
        return content;
    }

    settings = Object.assign({
        presets: [
            ["latest", {
                "es2015": {
                    "loose": true
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
