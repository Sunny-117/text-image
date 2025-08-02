import { createServer } from 'http';
import { readFile } from 'fs';
import { extname as _extname } from 'path';

// 创建HTTP服务器
const server = createServer((req, res) => {
    // 处理SSE请求
    if (req.url === '/sse') {
        // 设置响应头
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        // 发送一个初始消息
        res.write('data: 连接已建立\n\n');

        // 每2秒发送一条消息
        const interval = setInterval(() => {
            const data = {
                message: `这是一条SSE消息 #${Math.floor(Math.random() * 1000)}`,
                timestamp: new Date().toISOString()
            };
            res.write(`data: ${JSON.stringify(data)}

`);
        }, 2000);

        // 当客户端关闭连接时
        req.on('close', () => {
            clearInterval(interval);
            res.end();
            console.log('客户端断开连接');
        });
    }
    // 处理静态文件请求
    else {
        // 获取文件路径
        let filePath = '.' + req.url;
        if (filePath === './') {
            filePath = './sse-demo.html';
        } else if (filePath.startsWith('./sse')) {
            // 允许访问sse目录下的文件
        } else {
            // 其他路径重定向到sse目录
            filePath = './sse' + req.url;
        }

        // 获取文件扩展名
        const extname = String(_extname(filePath)).toLowerCase();

        // 设置MIME类型
        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.otf': 'application/font-otf',
            '.wasm': 'application/wasm'
        };

        const contentType = mimeTypes[extname] || 'application/octet-stream';

        // 读取文件并响应
        readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    readFile('./404.html', (error, content) => {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    });
                } else {
                    res.writeHead(500);
                    res.end(`服务器错误: ${error.code}\n`);
                    res.end();
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

// 启动服务器
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log(`请访问 http://localhost:${PORT}/sse/sse-demo.html 查看SSE演示`);
});