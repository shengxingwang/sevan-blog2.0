
-- --------------------------------------------------------

--
-- 表的结构 `blog_list`
--

CREATE TABLE `blog_list` (
  `title` varchar(60) NOT NULL,
  `descript` text NOT NULL,
  `content` text NOT NULL,
  `editContent` text NOT NULL,
  `state` int(11) NOT NULL DEFAULT '1',
  `publish` int(11) NOT NULL DEFAULT '1',
  `type` int(11) NOT NULL DEFAULT '1',
  `create_at` timestamp NOT NULL,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `keyword` varchar(60) NOT NULL,
  `id` int(11) NOT NULL,
  `aid` varchar(200) NOT NULL,
  `hot` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `blog_list`
--

INSERT INTO `blog_list` (`title`, `descript`, `content`, `editContent`, `state`, `publish`, `type`, `create_at`, `update_at`, `keyword`, `id`, `aid`, `hot`) VALUES
('撒旦', '傲霜斗', '啊实打实大苏打', '<p>啊实打实大苏打</p>\n', 1, 1, 1, '2019-05-15 19:37:41', '2019-05-16 03:37:41', '昂书', 9, '5cdcdb0543163', 7),
('傲霜斗', '傲霜斗', '昂书大师![alt](http://lookart.gz.bcebos.com/1545806238qiu.jpg)', '<p>昂书大师<img src="http://lookart.gz.bcebos.com/1545806238qiu.jpg" alt="alt"></p>\n', 1, 1, 1, '2019-05-16 00:37:29', '2019-05-16 08:37:29', '傲霜斗', 10, '5cdd214983627', 2),
('阿萨德 ', '啊啊实打实', '啊实打实大师', '<p>啊实打实大师</p>\n', 1, 1, 1, '2019-04-08 06:15:04', '2019-04-09 01:57:17', '阿萨德', 11, '5ce35afd9a02d', 2),
('阿斯达 ', '飒飒的', '啊实打实的', '<p>啊实打实的</p>\n', 1, 1, 1, '2019-05-20 17:57:34', '2019-05-21 01:57:34', '阿萨德', 12, '5ce35b0e3d4ee', 0),
('阿斯达啊实打实的', '爱上答案是', '啊实打实的```\nkajdaskjdaks kajsdj akjsd \n```', '<p>啊实打实的<code>kajdaskjdaks kajsdj akjsd</code></p>\n', 1, 1, 1, '2019-05-20 17:58:01', '2019-05-21 01:58:01', '啊实打实大师的', 13, '5ce35b29d6462', 1),
('测试我那张', '爱的撒旦', '## vue返回顶部\n```\nlet wrap = document.querySelector(".wrap");\n        wrap.addEventListener(scroll)=>{\n            let sh = wrap.scrollTop||document.documentElement.scrollTop;\n            if(sh>200){\n                this.setState({\n                    showFlag:true\n                })\n            }else{\n                this.setState({\n                    showFlag:false\n                })\n            }\n        })\n```\n## 第二段\n```\n.scroll-box{\n    position: fixed;\n    bottom: 40px;\n    right:40px;\n    width:38px;\n    background: #fff;\n    overflow: hidden;\n    z-index: 9999;\n}\n.scroll-box .back-top{\n    cursor: pointer;\n    width: 100%;\n    height:38px;\n    background: url(./../../static/images/backTop.png) no-repeat center;\n    background-size:22px;\n}\n```', '<h2 id="vue返回顶部">vue返回顶部</h2>\n<pre><code>let wrap = document.querySelector(&quot;.wrap&quot;);\n        wrap.addEventListener(scroll)=&gt;{\n            let sh = wrap.scrollTop||document.documentElement.scrollTop;\n            if(sh&gt;200){\n                this.setState({\n                    showFlag:true\n                })\n            }else{\n                this.setState({\n                    showFlag:false\n                })\n            }\n        })</code></pre><h2 id="第二段">第二段</h2>\n<pre><code>.scroll-box{\n    position: fixed;\n    bottom: 40px;\n    right:40px;\n    width:38px;\n    background: #fff;\n    overflow: hidden;\n    z-index: 9999;\n}\n.scroll-box .back-top{\n    cursor: pointer;\n    width: 100%;\n    height:38px;\n    background: url(./../../static/images/backTop.png) no-repeat center;\n    background-size:22px;\n}</code></pre>', 1, 1, 1, '2019-05-20 18:18:42', '2019-05-21 02:18:42', '大师', 14, '5ce360020ee6b', 2),
('asd', 'asd', 'asdasads', '<p>asdasads</p>\n', 1, 1, 1, '2019-05-21 00:03:20', '2019-05-21 08:03:20', 'asd', 15, '5ce3b0c809a91', 0),
('asffa', 'asdsad ', 'adssadas## asdasd', '<p>adssadas## asdasd</p>\n', 1, 1, 1, '2019-05-21 00:14:19', '2019-05-21 08:14:19', 'ssad,asd', 16, '5ce3b35b4cf32', 0),
('啊实打实的', '大声道', '啊实打实大师阿萨德', '<p>啊实打实大师阿萨德</p>\n', 1, 1, 1, '2019-05-21 00:14:56', '2019-05-21 08:14:56', '阿萨德', 17, '5ce3b38086c4e', 0),
('啊实打实的', '按时打算', '啊实打实的', '<p>啊实打实的</p>\n', 1, 1, 1, '2019-05-21 00:15:08', '2019-05-21 08:15:08', '阿萨德 ', 18, '5ce3b38cbdb1a', 0),
('大大士大夫', '阿萨德发阿萨德飞洒地方是打发 发斯蒂芬撒旦法撒旦的', ' ## 标大声道', '<h2 id="标大声道">标大声道</h2>\n', 1, 1, 1, '2019-05-21 00:16:10', '2019-05-21 08:16:10', '是打发萨达速度发', 19, '5ce3b3ca69c62', 0),
('阿斯蒂芬', '大师傅', '按时打算阿萨德', '<p>按时打算阿萨德</p>\n', 1, 1, 1, '2019-05-21 00:16:33', '2019-05-21 08:16:33', '阿斯蒂芬 ', 20, '5ce3b3e170414', 1),
('asd', 'asd', 'asd', '<p>asd</p>\n', 1, 1, 1, '2019-05-22 00:36:50', '2019-05-22 08:36:50', 'asd', 21, '5ce50a22880bc', 0);
