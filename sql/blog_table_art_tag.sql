
-- --------------------------------------------------------

--
-- 表的结构 `art_tag`
--

CREATE TABLE `art_tag` (
  `id` int(11) NOT NULL,
  `aid` varchar(200) NOT NULL,
  `tid` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `art_tag`
--

INSERT INTO `art_tag` (`id`, `aid`, `tid`) VALUES
(56, '5cdcdb0543163', '5cda56e236c47'),
(57, '5cdcdb0543163', '5cda58d6b7c6b'),
(58, '5cdd214983627', '5cda56e236c47'),
(59, '5ce35afd9a02d', '5cde523cdb7f0'),
(60, '5ce35afd9a02d', '5ce3538bc5806'),
(61, '5ce35b0e3d4ee', '5ce3538bc5806'),
(62, '5ce35b29d6462', '5cde523cdb7f0'),
(67, '5ce360020ee6b', '5ce3538bc5806'),
(69, '5ce3b0c809a91', '5cda58d6b7c6b'),
(70, '5ce3b35b4cf32', '5cda58d6b7c6b'),
(71, '5ce3b38086c4e', '5cde523cdb7f0'),
(72, '5ce3b38cbdb1a', '5cde523cdb7f0'),
(73, '5ce3b3ca69c62', '5cde523cdb7f0'),
(74, '5ce3b3e170414', '5cde523cdb7f0'),
(75, '5ce3b3e170414', '5ce3b11146490'),
(76, '5ce50a22880bc', '5cda58d6b7c6b');
