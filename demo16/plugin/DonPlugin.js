class DonePlugin {
    constructor(config) {
        this.config = config;
    }

    apply(compiler) {
        compiler.hooks.emit.tap('DonePlugin', (compilation) => {

            let fileList = '##File Name         Size\n\n';

            Object.entries(compilation.assets).forEach(([key, value])=> {
                fileList += '.[FILE NAME]     [FILE SIZE]\n'
                    .replace('[FILE NAME]', key)
                    .replace('[FILE SIZE]', value.size());
            });

            compilation.assets[this.config && this.config.filename ? this.config.filename : 'file.md'] = {
                source() {
                    return fileList;
                },
                size() {
                    return fileList.length;
                }
            };
        });
    }
}

module.exports = DonePlugin;