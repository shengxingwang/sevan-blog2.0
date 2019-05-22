
-- --------------------------------------------------------

--
-- 表的结构 `blog_news`
--

CREATE TABLE `blog_news` (
  `nid` int(11) NOT NULL,
  `ptime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ndesc` text NOT NULL,
  `imgurl` varchar(600) DEFAULT NULL,
  `turnUrl` varchar(100) DEFAULT NULL,
  `isshow` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `blog_news`
--

INSERT INTO `blog_news` (`nid`, `ptime`, `ndesc`, `imgurl`, `turnUrl`, `isshow`) VALUES
(15, '2019-05-20 15:43:48', 'sdfs', 'http://sevanblog.gz.bcebos.com/1558338226car.png', 'sdfsd.club', 1),
(17, '2019-05-22 10:18:23', '阿大声道阿打算', 'http://sevanblog.gz.bcebos.com/1558491500bg.jpg', '阿萨是是是撒啊啊', 2),
(18, '2019-05-22 10:21:19', '大声道阿阿斯顿', 'http://sevanblog.gz.bcebos.com/1558491678h.jpg', 'www.websevan.club', 1),
(19, '2019-05-22 10:22:38', 'weqw', 'http://sevanblog.gz.bcebos.com/1558491752CgBKa1sPbXSAGs52AAJMwxB8Enw985.jpg|http://sevanblog.gz.bcebos.com/1558491757bg.jpg', 'asdsad.club', 1),
(20, '2019-05-22 10:23:08', 'asdas', '', 'adas', 1),
(21, '2019-05-22 10:23:12', 'adsasd', '', 'adas.club', 1),
(22, '2019-05-22 10:23:15', 'sadasd', '', 'adas.club.com', 1),
(23, '2019-05-22 10:23:19', 'dasdasd', '', 'asd.com', 1),
(24, '2019-05-22 10:23:23', 'sadsad', '', 'asd.club', 1);
