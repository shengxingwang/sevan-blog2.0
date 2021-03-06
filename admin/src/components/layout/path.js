const navData = [
    {
        name:'文章管理',
        path:'art',
        icon:'book',
        children:[
           {
                name:'文章列表',
                path:'/home/artlist'
           },
           {
                name:'添加文章',
                path:'/home/addart'
           },
           {
                name:'草稿箱',
                path:'/home/skitch'
           },
           {
                name:'文章分类',
                path:'/home/classify'
           }
        ]
    },
    {
        name:'标签管理',
        path:'tag',
        icon:'tag',
        children:[
           {
                name:'全部标签',
                path:'/home/taglist'
           }
        ]
    },
    {
          name:'动态管理',
          path:'news',
          icon:'tag',
          children:[
               {
                    name:'全部动态',
                    path:'/home/newslist'
               },
               {
                    name:'添加动态',
                    path:'/home/addnews'
               }
          ]
     },
    {
        name:'留言墙',
        path:'msg',
        icon:'schedule',
        children:[
           {
                name:'留言管理',
                path:'/home/msglsit'
           }
        ]
    },
    {
        name:'项目管理',
        path:'pro',
        icon:'appstore',
        children:[
           {
                name:'全部项目',
                path:'/home/prolist'
           },
           {
                name:'新增项目',
                path:'/home/addpro'
           }
        ]
    }
]

export default navData;