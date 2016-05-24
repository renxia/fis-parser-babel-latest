var run = require('../index');

var code = `class SinglePost {

    constructor(props) {

    }

    static propTypes = {
        name: 'linkin'
    }

    render() {
        const { post } = this.props;

        if (!post) return null;

        const { title, content, userId } = post;

        return (
            <div styleName="wrapper">
                <div styleName="title">{title}</div>
                <p>{content}</p>
                <small>written by {userId}</small>
            </div>
        );
    }
}`;

console.log(code);
console.log(run(code, null, {
    "presets": ["es2015", "react", "stage-0"]
}));
