var CONST = require("./const");

module.exports = {
    title: '나상민의 TIL', // 사이트 타이틀
    description: '생각 정리',
    base: '/TIL/',
    themeConfig: {
        logo: 'https://avatars1.githubusercontent.com/u/18749057?s=460&v=4', // 로고 이미지
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Github', link: 'https://github.com/sm9171/' },
            { text: 'Blog', link: 'https://naccoon.tistory.com/' },
        ],
        sidebar: [
            {
                title: 'Monthly I Learned',
                children: CONST.MILList
            },
            {
                title: 'Books',
                children: CONST.BooksList
            },
            {
                title: 'Principle',
                children: CONST.PrincipleList
            },
        ]
        , smoothScroll: true // 부드러운 스크롤 사용 여부
    }
}