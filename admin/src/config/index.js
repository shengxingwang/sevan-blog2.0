const IS_DEV = process.env.NODE_ENV !== 'production'

export const API_ROOT = IS_DEV ? 'http://localhost:9090/servers/sevanBlog' : 'http://websevan.club/servers/sevanBlog';
export const imgUpURL = "http://localhost:9090/servers/sevanBlog/bos/myBos.php?bucket=sevanblog";