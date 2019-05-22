
-- --------------------------------------------------------

--
-- 表的结构 `blog_tag`
--

CREATE TABLE `blog_tag` (
  `tid` varchar(200) NOT NULL,
  `tag` varchar(100) NOT NULL,
  `descript` text NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `blog_tag`
--

INSERT INTO `blog_tag` (`tid`, `tag`, `descript`, `create_at`, `update_at`, `id`) VALUES
('5cda58d6b7c6b', 'node', 'node', '2019-05-14 05:57:42', '2019-05-14 05:57:42', 8),
('5cde523cdb7f0', 'php', 'php', '2019-05-17 06:18:36', '2019-05-17 06:18:36', 9),
('5ce3538bc5806', 'vue', 'vue', '2019-05-21 01:25:31', '2019-05-21 01:25:31', 10),
('5ce3b11146490', 'mysql', 'sql语法', '2019-05-21 08:04:33', '2019-05-21 08:04:33', 11);
